import { Code2 } from "lucide-react";

function SkillsSection({ skills }) {
  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <div className="section-title">
            <Code2 size={19} />
            <h3>Required Skills</h3>
          </div>

          <p>
            Skills directly connected to this career role.
          </p>
        </div>

        <span className="count-badge">
          {skills.length}
        </span>
      </div>

      {skills.length === 0 ? (
        <div className="empty-state">
          No skills are connected to this role yet.
        </div>
      ) : (
        <div className="skill-grid">
          {skills.map((skill) => (
            <article className="skill-card" key={skill.id}>
              <span className="skill-category">
                {skill.category}
              </span>

              <h4>{skill.name}</h4>

              <p>{skill.description}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default SkillsSection;