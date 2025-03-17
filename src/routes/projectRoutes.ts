import express from "express";
import { body, param } from "express-validator";
import * as projectController from "../controllers/projectController";
import { handleValidation } from "../middleware/validationRequest";

const router = express.Router();

router.get("/get", projectController.getAllProjects);

router.get(
  "/getBy/:id",
  param("id").notEmpty().withMessage("Project id is required"),
  handleValidation,
  projectController.getProjectById
);

router.post(
  "/create",
  body("name").notEmpty().withMessage("Project name is required"),
  body("status").notEmpty().withMessage("Project status is required"),
  body("startDate").isISO8601().withMessage("Start date must be a valid date"),
  body("endDate").isISO8601().withMessage("End date must be a valid date"),
  body("createdBy").isInt().withMessage("Created by must be an integer"),
  body("startDate").custom((value, { req }) => {
    const startDate = new Date(value);
    const endDate = new Date(req.body.endDate);
    if (startDate >= endDate) {
      throw new Error("Start date must be earlier than end date");
    }
    return true;
  }),
  handleValidation,
  projectController.createProject
);

router.patch(
  "/update/:id",
  param("id").notEmpty().withMessage("Project id is required"),
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Project name is required if provided"),
  body("status")
    .optional()
    .notEmpty()
    .withMessage("Project status is required if provided"),
  body("startDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be a valid date if provided"),
  body("endDate")
    .optional()
    .isISO8601()
    .withMessage("End date must be a valid date if provided"),
  body("createdBy")
    .optional()
    .isInt()
    .withMessage("Created by must be an integer if provided"),
  body("startDate").custom((value, { req }) => {
    const startDate = new Date(value);
    const endDate = new Date(req.body.endDate);
    if (startDate >= endDate) {
      throw new Error("Start date must be earlier than end date");
    }
    return true;
  }),
  handleValidation,
  projectController.updateProject
);

router.patch(
  "/delete/:id",
  param("id").notEmpty().withMessage("Project id is required"),
  handleValidation,
  projectController.deleteProject
);

export default router;
