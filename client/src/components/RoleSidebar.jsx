import { Briefcase, ChevronRight } from "lucide-react";

function RoleSidebar({
  roles,
  selectedRole,
  onSelectRole,
  loading
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-heading">
        <Briefcase size={17} />
        <span>Career Roles</span>
      </div>

      <p className="sidebar-description">
        Select a role to explore its connected skills,
        projects and resources.
      </p>

      {loading ? (
        <div className="sidebar-loading">
          <div className="mini-spinner" />
          Loading roles...
        </div>
      ) : roles.length === 0 ? (
        <div className="empty-small">
          No matching career roles found.
        </div>
      ) : (
        <div className="role-list">
          {roles.map((role) => (
            <button
              key={role.id}
              className={
                selectedRole?.id === role.id
                  ? "role-button active"
                  : "role-button"
              }
              onClick={() => onSelectRole(role)}
              aria-pressed={selectedRole?.id === role.id}
            >
              <span>{role.name}</span>

              <ChevronRight
                size={16}
                className="role-arrow"
              />
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}

export default RoleSidebar;