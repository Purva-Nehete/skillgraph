const GET_ALL_ROLES = `
  MATCH (r:Role)
  RETURN r
  ORDER BY r.name
`;

const GET_ROLE_BY_ID = `
  MATCH (r:Role {id: $roleId})
  RETURN r
`;

const GET_ROLE_SKILLS = `
  MATCH (r:Role {id: $roleId})
        -[:REQUIRES]->
        (s:Skill)
  RETURN s
  ORDER BY s.name
`;

const GET_LEARNING_PATH = `
  MATCH (r:Role {id: $roleId})
        -[:REQUIRES]->
        (s:Skill)
        -[:REQUIRES*1..2]->
        (p:Skill)
  RETURN DISTINCT p
  ORDER BY p.name
`;

const GET_ROLE_PROJECTS = `
  MATCH (r:Role {id: $roleId})
        -[:REQUIRES]->
        (s:Skill)
        <-[:REQUIRES]-
        (p:Project)
  RETURN DISTINCT p
  ORDER BY p.name
`;

const GET_ROLE_RESOURCES = `
  MATCH (r:Role {id: $roleId})
        -[:REQUIRES]->
        (s:Skill)
        -[:LEARNED_THROUGH]->
        (resource:Resource)
  RETURN DISTINCT resource
  ORDER BY resource.title
`;

const SEARCH_SKILLS = `
  MATCH (s:Skill)
  WHERE toLower(s.name) CONTAINS toLower($search)
  RETURN s
  ORDER BY s.name
`;

const GET_ROLE_GRAPH = `
  MATCH (r:Role {id: $roleId})
  OPTIONAL MATCH path =
    (r)-[:REQUIRES]->(s:Skill)
    -[:REQUIRES*0..2]->(related:Skill)

  RETURN r, collect(path) AS paths
`;

module.exports = {
  GET_ALL_ROLES,
  GET_ROLE_BY_ID,
  GET_ROLE_SKILLS,
  GET_LEARNING_PATH,
  GET_ROLE_PROJECTS,
  GET_ROLE_RESOURCES,
  SEARCH_SKILLS,
  GET_ROLE_GRAPH
};