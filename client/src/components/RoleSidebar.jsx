import { Briefcase } from "lucide-react";

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

      {loading ? (
        <div className="sidebar-loading">
          Loading roles...
        </div>
      ) : roles.length === 0 ? (
        <div className="empty-small">
          No roles available.
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
            >
              <span>{role.name}</span>

              <span className="role-arrow">→</span>
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}

export default RoleSidebar;