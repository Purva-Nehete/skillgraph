require("dotenv").config();

const { driver } = require("../src/config/database");

const roles = [
  {
    id: "frontend-developer",
    name: "Frontend Developer",
    description:
      "Builds responsive and interactive user interfaces for web applications."
  },
  {
    id: "backend-developer",
    name: "Backend Developer",
    description:
      "Builds APIs, business logic and server-side applications."
  },
  {
    id: "fullstack-developer",
    name: "Full Stack Developer",
    description:
      "Works across frontend and backend parts of a web application."
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    description:
      "Uses data, statistics and visualization to generate business insights."
  },
  {
    id: "data-engineer",
    name: "Data Engineer",
    description:
      "Builds systems and pipelines for collecting and processing data."
  },
  {
    id: "devops-engineer",
    name: "DevOps Engineer",
    description:
      "Automates software delivery, infrastructure and deployment processes."
  }
];

const skills = [
  {
    id: "html",
    name: "HTML",
    category: "Frontend",
    description: "Structures content on the web."
  },
  {
    id: "css",
    name: "CSS",
    category: "Frontend",
    description: "Styles and lays out web interfaces."
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Programming",
    description: "Programming language used for interactive web applications."
  },
  {
    id: "react",
    name: "React",
    category: "Frontend",
    description: "Library for building component-based user interfaces."
  },
  {
    id: "redux",
    name: "Redux",
    category: "Frontend",
    description: "State management library commonly used with React."
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    description: "JavaScript runtime for server-side applications."
  },
  {
    id: "express",
    name: "Express",
    category: "Backend",
    description: "Web framework for building Node.js APIs."
  },
  {
    id: "rest-api",
    name: "REST APIs",
    category: "Backend",
    description: "HTTP-based interface for communication between applications."
  },
  {
    id: "sql",
    name: "SQL",
    category: "Database",
    description: "Language for querying relational databases."
  },
  {
    id: "python",
    name: "Python",
    category: "Programming",
    description: "General-purpose programming language widely used in data work."
  },
  {
    id: "git",
    name: "Git",
    category: "Tools",
    description: "Distributed version control system."
  },
  {
    id: "docker",
    name: "Docker",
    category: "DevOps",
    description: "Platform for packaging applications into containers."
  }
];

const resources = [
  {
    id: "html-css-basics",
    title: "HTML & CSS Fundamentals",
    type: "Course",
    url: "https://developer.mozilla.org/en-US/docs/Learn"
  },
  {
    id: "javascript-guide",
    title: "JavaScript Guide",
    type: "Documentation",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
  },
  {
    id: "react-docs",
    title: "React Documentation",
    type: "Documentation",
    url: "https://react.dev/learn"
  },
  {
    id: "redux-docs",
    title: "Redux Documentation",
    type: "Documentation",
    url: "https://redux.js.org/introduction/getting-started"
  },
  {
    id: "node-docs",
    title: "Node.js Documentation",
    type: "Documentation",
    url: "https://nodejs.org/docs/latest/api/"
  },
  {
    id: "sql-tutorial",
    title: "SQL Tutorial",
    type: "Tutorial",
    url: "https://www.w3schools.com/sql/"
  },
  {
    id: "python-docs",
    title: "Python Documentation",
    type: "Documentation",
    url: "https://docs.python.org/3/"
  },
  {
    id: "git-book",
    title: "Pro Git",
    type: "Book",
    url: "https://git-scm.com/book/en/v2"
  },
  {
    id: "docker-getting-started",
    title: "Docker Get Started",
    type: "Tutorial",
    url: "https://docs.docker.com/get-started/"
  }
];

const projects = [
  {
    id: "portfolio-website",
    name: "Portfolio Website",
    description: "Responsive personal portfolio website.",
    difficulty: "Beginner"
  },
  {
    id: "ecommerce-dashboard",
    name: "E-Commerce Dashboard",
    description: "Dashboard for managing products and orders.",
    difficulty: "Intermediate"
  },
  {
    id: "task-management-api",
    name: "Task Management API",
    description: "REST API for managing users and tasks.",
    difficulty: "Intermediate"
  },
  {
    id: "analytics-dashboard",
    name: "Analytics Dashboard",
    description: "Interactive dashboard for exploring business data.",
    difficulty: "Intermediate"
  },
  {
    id: "job-tracker",
    name: "Job Application Tracker",
    description: "Application for tracking job applications and statuses.",
    difficulty: "Intermediate"
  },
  {
    id: "data-pipeline",
    name: "Data Processing Pipeline",
    description: "Pipeline that collects and transforms structured data.",
    difficulty: "Advanced"
  },
  {
    id: "containerized-api",
    name: "Containerized API",
    description: "REST API packaged and deployed using Docker.",
    difficulty: "Advanced"
  }
];

async function seedDatabase() {
  const session = driver.session();

  try {
    console.log("🌱 Starting database seed...");

    // Clear existing data
    await session.run(`
      MATCH (n)
      DETACH DELETE n
    `);

    // Create roles
    for (const role of roles) {
      await session.run(
        `
        CREATE (r:Role {
          id: $id,
          name: $name,
          description: $description
        })
        `,
        role
      );
    }

    // Create skills
    for (const skill of skills) {
      await session.run(
        `
        CREATE (s:Skill {
          id: $id,
          name: $name,
          category: $category,
          description: $description
        })
        `,
        skill
      );
    }

    // Create resources
    for (const resource of resources) {
      await session.run(
        `
        CREATE (r:Resource {
          id: $id,
          title: $title,
          type: $type,
          url: $url
        })
        `,
        resource
      );
    }

    // Create projects
    for (const project of projects) {
      await session.run(
        `
        CREATE (p:Project {
          id: $id,
          name: $name,
          description: $description,
          difficulty: $difficulty
        })
        `,
        project
      );
    }

    // Role → Skill relationships
    const roleSkills = [
      ["frontend-developer", "html"],
      ["frontend-developer", "css"],
      ["frontend-developer", "javascript"],
      ["frontend-developer", "react"],
      ["frontend-developer", "redux"],
      ["frontend-developer", "git"],

      ["backend-developer", "javascript"],
      ["backend-developer", "nodejs"],
      ["backend-developer", "express"],
      ["backend-developer", "rest-api"],
      ["backend-developer", "sql"],
      ["backend-developer", "git"],

      ["fullstack-developer", "html"],
      ["fullstack-developer", "css"],
      ["fullstack-developer", "javascript"],
      ["fullstack-developer", "react"],
      ["fullstack-developer", "nodejs"],
      ["fullstack-developer", "express"],
      ["fullstack-developer", "sql"],
      ["fullstack-developer", "git"],

      ["data-analyst", "python"],
      ["data-analyst", "sql"],
      ["data-analyst", "git"],

      ["data-engineer", "python"],
      ["data-engineer", "sql"],
      ["data-engineer", "docker"],
      ["data-engineer", "git"],

      ["devops-engineer", "git"],
      ["devops-engineer", "docker"],
      ["devops-engineer", "python"]
    ];

    for (const [roleId, skillId] of roleSkills) {
      await session.run(
        `
        MATCH (r:Role {id: $roleId})
        MATCH (s:Skill {id: $skillId})
        CREATE (r)-[:REQUIRES]->(s)
        `,
        { roleId, skillId }
      );
    }

    // Skill → prerequisite skill
    const prerequisites = [
      ["css", "html"],
      ["javascript", "html"],
      ["react", "javascript"],
      ["redux", "react"],
      ["nodejs", "javascript"],
      ["express", "nodejs"],
      ["rest-api", "nodejs"],
      ["sql", "database-basics"],
      ["python", "programming-basics"],
      ["docker", "git"]
    ];

    // Only create prerequisite relationships where both nodes exist.
    // We'll add database-basics and programming-basics below.
    await session.run(`
      CREATE (:Skill {
        id: "database-basics",
        name: "Database Fundamentals",
        category: "Database",
        description: "Core concepts of databases and data storage."
      })
    `);

    await session.run(`
      CREATE (:Skill {
        id: "programming-basics",
        name: "Programming Fundamentals",
        category: "Programming",
        description: "Core programming concepts and problem solving."
      })
    `);

    for (const [skillId, prerequisiteId] of prerequisites) {
      await session.run(
        `
        MATCH (s:Skill {id: $skillId})
        MATCH (p:Skill {id: $prerequisiteId})
        CREATE (s)-[:REQUIRES]->(p)
        `,
        { skillId, prerequisiteId }
      );
    }

    // Skill → Resource
    const skillResources = [
      ["html", "html-css-basics"],
      ["css", "html-css-basics"],
      ["javascript", "javascript-guide"],
      ["react", "react-docs"],
      ["redux", "redux-docs"],
      ["nodejs", "node-docs"],
      ["sql", "sql-tutorial"],
      ["python", "python-docs"],
      ["git", "git-book"],
      ["docker", "docker-getting-started"]
    ];

    for (const [skillId, resourceId] of skillResources) {
      await session.run(
        `
        MATCH (s:Skill {id: $skillId})
        MATCH (r:Resource {id: $resourceId})
        CREATE (s)-[:LEARNED_THROUGH]->(r)
        `,
        { skillId, resourceId }
      );
    }

    // Project → Skill
    const projectSkills = [
      ["portfolio-website", "html"],
      ["portfolio-website", "css"],
      ["portfolio-website", "javascript"],
      ["ecommerce-dashboard", "react"],
      ["ecommerce-dashboard", "redux"],
      ["ecommerce-dashboard", "javascript"],
      ["task-management-api", "nodejs"],
      ["task-management-api", "express"],
      ["task-management-api", "rest-api"],
      ["task-management-api", "sql"],
      ["analytics-dashboard", "react"],
      ["analytics-dashboard", "javascript"],
      ["analytics-dashboard", "sql"],
      ["job-tracker", "react"],
      ["job-tracker", "nodejs"],
      ["job-tracker", "sql"],
      ["data-pipeline", "python"],
      ["data-pipeline", "sql"],
      ["data-pipeline", "docker"],
      ["containerized-api", "nodejs"],
      ["containerized-api", "docker"],
      ["containerized-api", "rest-api"]
    ];

    for (const [projectId, skillId] of projectSkills) {
      await session.run(
        `
        MATCH (p:Project {id: $projectId})
        MATCH (s:Skill {id: $skillId})
        CREATE (p)-[:REQUIRES]->(s)
        `,
        { projectId, skillId }
      );
    }

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await session.close();
    await driver.close();
  }
}

seedDatabase();