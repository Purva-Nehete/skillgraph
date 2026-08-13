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
          <p>Explore career paths through connected skills</p>
        </div>
      </div>

      <div className="header-search">
        <Search size={18} />

        <input
          type="search"
          placeholder="Search career roles..."
          value={searchValue}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          aria-label="Search career roles"
        />
      </div>
    </header>
  );
}

export default Header;