import { Network, Search } from "lucide-react";

function Header({ searchValue, onSearchChange }) {
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-icon">
          <Network size={21} />
        </div>

        <div>
          <h1>SkillGraph</h1>
          <p>Career Skill Explorer</p>
        </div>
      </div>

      <div className="header-search">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search skills..."
          value={searchValue}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
        />
      </div>
    </header>
  );
}

export default Header;