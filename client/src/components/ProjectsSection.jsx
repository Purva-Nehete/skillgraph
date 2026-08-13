import {
  FolderKanban,
  ArrowUpRight
} from "lucide-react";

function ProjectsSection({ projects }) {
  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <div className="section-title">
            <FolderKanban size={19} />
            <h3>Recommended Projects</h3>
          </div>

          <p>
            Projects connected to the skills required
            for this role.
          </p>
        </div>

        <span className="path-label">
          {projects.length} projects
        </span>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state">
          No connected projects found.
        </div>
      ) : (
        <div className="project-grid">
          {projects.map((project) => (
            <article
              className="project-card"
              key={project.id}
            >
              <div className="project-top">
                <span className="difficulty">
                  {project.difficulty}
                </span>
              </div>

              <h4>{project.name}</h4>

              <p>{project.description}</p>

              <div className="project-footer">
                <span>Graph-connected project</span>

                <ArrowUpRight size={15} />
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProjectsSection;