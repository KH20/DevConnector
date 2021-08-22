const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");

//@router   GET api/users
//@desc     Register User
//@access   Public
router.post("/", [
    check("name", "Name is required")
        .not()
        .isEmpty(),
    check("email", "Please include a valid email")
        .isEmail(),
    check("password", "Please enter a password with 6 or more characters")
        .isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        //See if user exists
        let user = await User.findOne({ email })

        if (user) {
            //Error. User exists. Cannot register with this email.
            return res
                .status(400)
                .json({ errors: [{ msg: "User already exists" }] });
        }

        //Get User Gravatar
        const avatar = gravatar.url(email, {
            s: "200",
            r: "pg",
            d: "mm"
        });

        user = new User({
            name,
            email,
            avatar,
            password
        });
        //Encrypt Pass
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        //Set Payload
        const payload = {
            user: {
                id: user.id
            }
        }

        //Return jsonwebtoken
        const token = jwt.sign(
            payload,
            config
                .get("jwtSecret"),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                return res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        return res
            .status(500)
            .send("Server Error");
    }
});

module.exports = router;