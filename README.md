# SkillGraph — Career Skill Explorer

SkillGraph is a graph-powered career skill exploration application.

It allows users to select a career role and explore the skills, prerequisite learning path, projects, and learning resources connected to that role.

The application uses a graph database to represent relationships between career roles, skills, projects, and learning resources.

---

## Live Demo

Frontend:

https://skillgraph-1-teiz.onrender.com

Backend API:

https://skillgraph-5za4.onrender.com

Health Check:

https://skillgraph-5za4.onrender.com/api/health

---

## Problem Statement

Career learning paths are often presented as disconnected lists of technologies and courses.

SkillGraph represents career development as a connected graph.

For example:

Career Role
↓
Required Skills
↓
Prerequisite Skills
↓
Projects
↓
Learning Resources

This allows users to explore not only what skills are required for a role, but also how those skills are connected.

---

## Why a Graph Database?

A graph database is suitable for SkillGraph because the application is relationship-heavy.

The important information is not only the individual entities, but also the relationships between them.

Examples:

- Role REQUIRES Skill
- Skill PREREQUISITE_OF Skill
- Skill ENABLES Project
- Resource TEACHES Skill

These relationships can be traversed using Cypher queries.

A relational database could represent the same data using multiple junction tables, but graph traversal makes relationship-oriented queries more natural and easier to express.

---

## Data Model

The main graph entities are:

### Nodes

- Role
- Skill
- Project
- Resource

### Relationships

- REQUIRES
- PREREQUISITE_OF
- ENABLES
- TEACHES

Conceptually:

Role
|
| REQUIRES
↓
Skill
|
| PREREQUISITE_OF
↓
Skill

Skill
|
| ENABLES
↓
Project

Skill
|
| TEACHES
↓
Resource

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS
- Lucide React

### Backend

- Node.js
- Express
- JavaScript

### Database

- CognoDB
- Cypher
- Neo4j JavaScript Driver

### Deployment

- Render

---

## Project Structure

```text
skillgraph/
│
├── client/
│   └── React frontend
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── queries/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   │
│   └── seed/
│
└── README.md