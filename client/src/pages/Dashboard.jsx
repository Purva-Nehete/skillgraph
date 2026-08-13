import {
  useEffect,
  useState
} from "react";

import {
  getRoles,
  getRoleSkills,
  getLearningPath,
  getProjects,
  getResources
} from "../services/api";

import Header from "../components/Header";
import RoleSidebar from "../components/RoleSidebar";
import SkillsSection from "../components/SkillsSection";
import LearningPath from "../components/LearningPath";
import ProjectsSection from "../components/ProjectsSection";
import ResourcesSection from "../components/ResourcesSection";

function Dashboard() {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] =
    useState(null);

  const [skills, setSkills] = useState([]);
  const [learningPath, setLearningPath] =
    useState([]);
  const [projects, setProjects] = useState([]);
  const [resources, setResources] = useState([]);

  const [loadingRoles, setLoadingRoles] =
    useState(true);

  const [loadingDetails, setLoadingDetails] =
    useState(false);

  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  const [searchValue, setSearchValue] =
    useState("");

  useEffect(() => {
    async function loadRoles() {
      try {
        setLoadingRoles(true);
        setError("");

        const response = await getRoles();

        setRoles(response.data);

        if (response.data.length > 0) {
          setSelectedRole(response.data[0]);
        }
      } catch (error) {
        console.error(error);

        setError(
          "Unable to connect to the SkillGraph API."
        );
      } finally {
        setLoadingRoles(false);
      }
    }

    loadRoles();
  }, [retryKey]);

  useEffect(() => {
    if (!selectedRole) {
      return;
    }

    async function loadRoleDetails() {
      try {
        setLoadingDetails(true);
        setError("");

        const [
          skillsResponse,
          pathResponse,
          projectsResponse,
          resourcesResponse
        ] = await Promise.all([
          getRoleSkills(selectedRole.id),
          getLearningPath(selectedRole.id),
          getProjects(selectedRole.id),
          getResources(selectedRole.id)
        ]);

        setSkills(skillsResponse.data);
        setLearningPath(pathResponse.data);
        setProjects(projectsResponse.data);
        setResources(resourcesResponse.data);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load the connected graph data."
        );
      } finally {
        setLoadingDetails(false);
      }
    }

    loadRoleDetails();
  }, [selectedRole]);

  const filteredRoles = roles.filter((role) =>
    role.name
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    if (
      searchValue &&
      filteredRoles.length > 0 &&
      !filteredRoles.some(
        (role) => role.id === selectedRole?.id
      )
    ) {
      setSelectedRole(filteredRoles[0]);
    }
  }, [searchValue]);

  return (
    <div className="app">
      <Header
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

      <div className="app-layout">
        <RoleSidebar
          roles={filteredRoles}
          selectedRole={selectedRole}
          onSelectRole={setSelectedRole}
          loading={loadingRoles}
        />

        <main className="main-content">
          {error && (
            <div className="error-banner">
              <strong>Something went wrong</strong>

              <span>{error}</span>

              <button
                className="retry-button"
                onClick={() =>
                  setRetryKey((current) => current + 1)
                }
              >
                Try again
              </button>
            </div>
          )}

          {!selectedRole && !loadingRoles ? (
            <div className="empty-main">
              <h2>No career role selected</h2>
              <p>
                Select a career role from the sidebar
                to explore its connected skills.
              </p>
            </div>
          ) : selectedRole ? (
            <>
              <section className="role-hero">
                <div className="hero-top">
                  <div>
                    <span className="role-label">
                      CAREER ROLE
                    </span>

                    <h2>{selectedRole.name}</h2>

                    <p>{selectedRole.description}</p>
                  </div>

                  <div className="role-node">
                    <span className="node-dot" />
                    <span>Graph Node</span>
                  </div>
                </div>

                <div className="graph-indicator">
                  <span className="indicator-dot" />
                  Connected graph data
                </div>
              </section>

              {loadingDetails ? (
                <div className="details-loading">
                  <div className="loading-spinner" />
                  <h3>Exploring the graph...</h3>
                  <p>
                    Finding connected skills, projects
                    and resources.
                  </p>
                </div>
              ) : (
                <>
                  <section className="graph-summary">
                    <div className="summary-item">
                      <span className="summary-value">
                        {skills.length}
                      </span>

                      <span className="summary-label">
                        Required skills
                      </span>
                    </div>

                    <div className="summary-divider" />

                    <div className="summary-item">
                      <span className="summary-value">
                        {learningPath.length}
                      </span>

                      <span className="summary-label">
                        Prerequisite nodes
                      </span>
                    </div>

                    <div className="summary-divider" />

                    <div className="summary-item">
                      <span className="summary-value">
                        {projects.length}
                      </span>

                      <span className="summary-label">
                        Connected projects
                      </span>
                    </div>

                    <div className="summary-divider" />

                    <div className="summary-item">
                      <span className="summary-value">
                        {resources.length}
                      </span>

                      <span className="summary-label">
                        Learning resources
                      </span>
                    </div>
                  </section>

                  <SkillsSection skills={skills} />

                  <LearningPath
                    learningPath={learningPath}
                  />

                  <ProjectsSection
                    projects={projects}
                  />

                  <ResourcesSection
                    resources={resources}
                  />
                </>
              )}
            </>
          ) : null}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;