const connection = require("../db/dbConfig");
const passwordValidator = require('password-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function check(req, res) {
    res.json({ message: "Welcome to your dashboard!", user: req.user });
}

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const [users] = await connection.execute("SELECT * FROM Users WHERE email = ?", [email]);

        if (users.length === 0) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const user = users[0];

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const token = jwt.sign(
            { userId: user.user_id, email: user.email, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                id: user.user_id,
                firstName: user.first_name,
                lastName: user.last_name,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
}

async function register(req, res) {
    const { firstName, lastName, username, email, password } = req.body;

    if (!firstName || !lastName || !username || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const schema = new passwordValidator();
    schema
        .is().min(8)
        .is().max(100)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().not().spaces()
        .is().not().oneOf(['password', '12345678']);

    const passwordValidationResult = schema.validate(password);
    if (!passwordValidationResult) {
        const errors = schema.validate(password, { list: true });
        const errorMessages = [];

        if (errors.includes('min')) errorMessages.push("Password must be at least 8 characters long.");
        if (errors.includes('max')) errorMessages.push("Password cannot exceed 100 characters.");
        if (errors.includes('uppercase')) errorMessages.push("Password must contain at least one uppercase letter.");
        if (errors.includes('lowercase')) errorMessages.push("Password must contain at least one lowercase letter.");
        if (errors.includes('digits')) errorMessages.push("Password must contain at least one digit.");
        if (errors.includes('spaces')) errorMessages.push("Password should not contain spaces.");
        if (errors.includes('oneOf')) errorMessages.push("You cannot use 'password' or '12345678' as your password.");

        return res.status(400).json({ message: "Password is not strong enough.", errors: errorMessages });
    }

    try {
        const [existingUsers] = await connection.execute("SELECT * FROM Users WHERE username = ? OR email = ?", [username, email]);

        if (existingUsers.length > 0) {
            return res.status(409).json({ message: "Username or email already exists." });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await connection.execute("INSERT INTO Users (first_name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?)", [firstName, lastName, username, email, hashedPassword]);

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
}

module.exports = { check, login, register };