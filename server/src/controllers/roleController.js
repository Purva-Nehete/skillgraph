const roleService = require("../services/roleService");

async function getRoles(req, res) {
  try {
    const roles = await roleService.getAllRoles();

    res.json({
      success: true,
      data: roles
    });
  } catch (error) {
    console.error("Failed to fetch roles:", error);

    res.status(503).json({
      success: false,
      message: "Unable to load roles right now."
    });
  }
}

async function getRole(req, res) {
  try {
    const { id } = req.params;

    const role = await roleService.getRoleById(id);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found."
      });
    }

    res.json({
      success: true,
      data: role
    });
  } catch (error) {
    console.error("Failed to fetch role:", error);

    res.status(503).json({
      success: false,
      message: "Unable to load role."
    });
  }
}

async function getRoleSkills(req, res) {
  try {
    const skills = await roleService.getRoleSkills(
      req.params.id
    );

    res.json({
      success: true,
      data: skills
    });
  } catch (error) {
    console.error(error);

    res.status(503).json({
      success: false,
      message: "Unable to load skills."
    });
  }
}

async function getLearningPath(req, res) {
  try {
    const path = await roleService.getLearningPath(
      req.params.id
    );

    res.json({
      success: true,
      data: path
    });
  } catch (error) {
    console.error(error);

    res.status(503).json({
      success: false,
      message: "Unable to load learning path."
    });
  }
}

async function getProjects(req, res) {
  try {
    const projects = await roleService.getRoleProjects(
      req.params.id
    );

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error(error);

    res.status(503).json({
      success: false,
      message: "Unable to load projects."
    });
  }
}

async function getResources(req, res) {
  try {
    const resources = await roleService.getRoleResources(
      req.params.id
    );

    res.json({
      success: true,
      data: resources
    });
  } catch (error) {
    console.error(error);

    res.status(503).json({
      success: false,
      message: "Unable to load resources."
    });
  }
}

async function searchSkills(req, res) {
  try {
    const search = req.query.q || "";

    if (!search.trim()) {
      return res.json({
        success: true,
        data: []
      });
    }

    const skills = await roleService.searchSkills(search);

    res.json({
      success: true,
      data: skills
    });
  } catch (error) {
    console.error(error);

    res.status(503).json({
      success: false,
      message: "Unable to search skills."
    });
  }
}

module.exports = {
  getRoles,
  getRole,
  getRoleSkills,
  getLearningPath,
  getProjects,
  getResources,
  searchSkills
};