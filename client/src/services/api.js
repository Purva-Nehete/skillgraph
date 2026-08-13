const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

async function request(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(
      `API request failed with status ${response.status}`
    );
  }

  return response.json();
}

export async function getRoles() {
  return request("/roles");
}

export async function getRole(roleId) {
  return request(`/roles/${roleId}`);
}

export async function getRoleSkills(roleId) {
  return request(`/roles/${roleId}/skills`);
}

export async function getLearningPath(roleId) {
  return request(`/roles/${roleId}/learning-path`);
}

export async function getProjects(roleId) {
  return request(`/roles/${roleId}/projects`);
}

export async function getResources(roleId) {
  return request(`/roles/${roleId}/resources`);
}

export async function searchSkills(query) {
  return request(
    `/roles/search?q=${encodeURIComponent(query)}`
  );
}