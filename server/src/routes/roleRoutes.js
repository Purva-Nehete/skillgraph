const express = require("express");

const controller = require("../controllers/roleController");

const router = express.Router();

router.get("/", controller.getRoles);

router.get("/search", controller.searchSkills);

router.get("/:id", controller.getRole);

router.get("/:id/skills", controller.getRoleSkills);

router.get("/:id/learning-path", controller.getLearningPath);

router.get("/:id/projects", controller.getProjects);

router.get("/:id/resources", controller.getResources);

module.exports = router;