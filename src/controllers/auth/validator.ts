import { oneOf, check } from "express-validator";

export const authValidation = [
  check("email")
    .exists()
    .withMessage("email is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("wrong email length")
    .bail()
    .isEmail()
    .withMessage("email not valid"),
  check("password").exists().withMessage("password is required"),
];

export const nameValidation = check("name")
  .exists()
  .withMessage("name is required");
