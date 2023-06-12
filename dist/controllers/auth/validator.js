"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameValidation = exports.authValidation = void 0;
const express_validator_1 = require("express-validator");
exports.authValidation = [
    (0, express_validator_1.check)("email")
        .exists()
        .withMessage("email is required")
        .bail()
        .isLength({ min: 3 })
        .withMessage("wrong email length")
        .bail()
        .isEmail()
        .withMessage("email not valid"),
    (0, express_validator_1.check)("password").exists().withMessage("password is required"),
];
exports.nameValidation = (0, express_validator_1.check)("name")
    .exists()
    .withMessage("name is required");
