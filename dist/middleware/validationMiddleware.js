"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const validationMiddleware = (request, response, next) => {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        response.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};
exports.validationMiddleware = validationMiddleware;
