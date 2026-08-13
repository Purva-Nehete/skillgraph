import {
  ArrowUpRight,
  BookOpen
} from "lucide-react";

function ResourcesSection({ resources }) {
  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <div className="section-title">
            <BookOpen size={19} />
            <h3>Learning Resources</h3>
          </div>

          <p>
            Resources connected to the skills in this path.
          </p>
        </div>
      </div>

      {resources.length === 0 ? (
        <div className="empty-state">
          No learning resources found.
        </div>
      ) : (
        <div className="resource-list">
          {resources.map((resource) => (
            <a
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="resource-item"
              key={resource.id}
            >
              <div className="resource-icon">
                <BookOpen size={17} />
              </div>

              <div className="resource-info">
                <h4>{resource.title}</h4>
                <span>{resource.type}</span>
              </div>

              <ArrowUpRight size={18} />
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

export default ResourcesSection;