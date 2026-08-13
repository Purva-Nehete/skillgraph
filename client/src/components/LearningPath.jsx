import {
  ArrowDown,
  GitBranch
} from "lucide-react";

function LearningPath({ learningPath }) {
  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <div className="section-title">
            <GitBranch size={19} />
            <h3>Learning Path</h3>
          </div>

          <p>
            Prerequisite skills discovered through
            multi-hop graph traversal.
          </p>
        </div>

        <span className="path-label">
          {learningPath.length} connected nodes
        </span>
      </div>

      {learningPath.length === 0 ? (
        <div className="empty-state">
          No prerequisite skills were found for this role.
        </div>
      ) : (
        <div className="learning-path">
          {learningPath.map((skill, index) => (
            <div
              className="path-item"
              key={`${skill.id}-${index}`}
            >
              <div className="path-number">
                {index + 1}
              </div>

              <div className="path-content">
                <div className="path-skill-header">
                  <h4>{skill.name}</h4>

                  <span>{skill.category}</span>
                </div>

                <p>{skill.description}</p>
              </div>

              {index < learningPath.length - 1 && (
                <ArrowDown
                  className="path-arrow"
                  size={18}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default LearningPath;