const validateSignup = (req, res, next) => {
    const { name, email, password } = req.body;

    const errors = {};

    if (!name || name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters.";
    }

    if (!email) {
        errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Please provide a valid email.";
    }

    if (!password) {
        errors.password = "Password is required.";
    } else if (password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation failed.",
            errors,
        });
    }

    next();
};


const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    const errors = {};

    if (!email) {
        errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Please provide a valid email.";
    }

    if (!password) {
        errors.password = "Password is required.";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation failed.",
            errors,
        });
    }

    next();
};

const validateForgotPassword = (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required",
        });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email address",
        });
    }

    req.body.email = normalizedEmail;

    next();
};

export { validateSignup, validateLogin, validateForgotPassword };