const { driver } = require("../config/database");

const {
  GET_ALL_ROLES,
  GET_ROLE_BY_ID,
  GET_ROLE_SKILLS,
  GET_LEARNING_PATH,
  GET_ROLE_PROJECTS,
  GET_ROLE_RESOURCES,
  SEARCH_SKILLS
} = require("../queries/roleQueries");

function nodeToObject(record, key) {
  const node = record.get(key);

  return node
    ? {
        ...node.properties
      }
    : null;
}

async function getAllRoles() {
  const session = driver.session();

  try {
    const result = await session.run(GET_ALL_ROLES);

    return result.records.map((record) =>
      nodeToObject(record, "r")
    );
  } finally {
    await session.close();
  }
}

async function getRoleById(roleId) {
  const session = driver.session();

  try {
    const result = await session.run(GET_ROLE_BY_ID, {
      roleId
    });

    if (result.records.length === 0) {
      return null;
    }

    return nodeToObject(result.records[0], "r");
  } finally {
    await session.close();
  }
}

async function getRoleSkills(roleId) {
  const session = driver.session();

  try {
    const result = await session.run(GET_ROLE_SKILLS, {
      roleId
    });

    return result.records.map((record) =>
      nodeToObject(record, "s")
    );
  } finally {
    await session.close();
  }
}

async function getLearningPath(roleId) {
  const session = driver.session();

  try {
    const result = await session.run(GET_LEARNING_PATH, {
      roleId
    });

    return result.records.map((record) =>
      nodeToObject(record, "p")
    );
  } finally {
    await session.close();
  }
}

async function getRoleProjects(roleId) {
  const session = driver.session();

  try {
    const result = await session.run(GET_ROLE_PROJECTS, {
      roleId
    });

    return result.records.map((record) =>
      nodeToObject(record, "p")
    );
  } finally {
    await session.close();
  }
}

async function getRoleResources(roleId) {
  const session = driver.session();

  try {
    const result = await session.run(GET_ROLE_RESOURCES, {
      roleId
    });

    return result.records.map((record) =>
      nodeToObject(record, "resource")
    );
  } finally {
    await session.close();
  }
}

async function searchSkills(search) {
  const session = driver.session();

  try {
    const result = await session.run(SEARCH_SKILLS, {
      search
    });

    return result.records.map((record) =>
      nodeToObject(record, "s")
    );
  } finally {
    await session.close();
  }
}

module.exports = {
  getAllRoles,
  getRoleById,
  getRoleSkills,
  getLearningPath,
  getRoleProjects,
  getRoleResources,
  searchSkills
};