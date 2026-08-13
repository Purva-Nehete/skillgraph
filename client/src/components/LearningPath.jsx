import { ArrowDown, GitBranch } from "lucide-react";

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
            Follow connected prerequisite skills to build
            toward this role.
          </p>
        </div>
      </div>

      {learningPath.length === 0 ? (
        <div className="empty-state">
          No learning path is available yet.
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
                <h4>{skill.name}</h4>
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