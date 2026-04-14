# Myra's Nail Academy - Backend Development Guide

## 🎯 Project Overview

Backend project for Myra's Nail Academy using a modular architecture approach with modern backend best practices.

**Tech Stack:**
- Language: Node.js / JavaScript
- Runtime: Express.js
- Database: Mongo Atlas
- Architecture: Modular (Module-based)

---

## 🏗️ Architecture & Development Phases

### Phase 1: Architectural Design (SENIOR-ARCHITECT)
**When:** Starting new projects or major features  
**Actions:**
- Use `project_architect.py` to analyze structure
- Review `architecture_patterns.md` for appropriate patterns
- Generate architecture diagrams with `architecture_diagram_generator.py`
- Use `tech_decision_guide.md` for technology decisions

### Phase 2: API Scaffolding (SENIOR-BACKEND)
**When:** Creating new endpoints or services  
**Actions:**
- Use `api_scaffolder.py` to generate structure
- Review `api_design_patterns.md` for REST/GraphQL patterns
- Implement following best practices
- Ensure proper module structure

### Phase 3: Database Optimization (SENIOR-BACKEND)
**When:** Before production or if performance issues arise  
**Actions:**
- Use `database_migration_tool.py` for analysis
- Review `database_optimization_guide.md`
- Apply indexes, optimized queries, migrations
- Create migrations for schema changes

### Phase 4: Load Testing (SENIOR-BACKEND)
**When:** Validating capacity before deployment  
**Actions:**
- Use `api_load_tester.py` to simulate load
- Review `backend_security_practices.md`
- Validate authentication, rate limiting, timeouts
- Document performance metrics

---

## 📁 Modular Architecture

### Structure Convention

```
src/
├── modules/
│   ├── users/
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   └── update-user.dto.ts
│   │   ├── controllers/
│   │   │   └── users.controller.ts
│   │   ├── services/
│   │   │   └── users.service.ts
│   │   ├── repositories/
│   │   │   └── users.repository.ts
│   │   ├── models/
│   │   │   └── user.model.ts
│   │   ├── routes/
│   │   │   └── users.routes.ts
│   │   ├── middleware/
│   │   │   └── validate-user.middleware.ts
│   │   └── index.ts (module export)
│   │
│   ├── appointments/
│   │   ├── dto/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── index.ts
│   │
│   └── [other-modules]/
│
├── shared/
│   ├── middleware/
│   │   └── auth.middleware.ts
│   ├── utils/
│   │   └── validators.ts
│   ├── constants/
│   │   └── errors.ts
│   └── index.ts
│
├── config/
│   └── database.ts
│
├── app.ts (Express app setup)
└── server.ts (Entry point)
```

### Module Structure Rules

Each module (`users/`, `appointments/`, etc.) must include:

1. **index.ts** - Single entry point exporting module resources
2. **Controllers** - Handle HTTP requests
3. **Services** - Business logic
4. **Repositories** - Data access layer
5. **Models** - Data structures/types
6. **Routes** - Route definitions
7. **Middleware** - Module-specific middleware (optional)
8. **DTOs** - Data transfer objects for validation

---

## 💾 Export Convention

### End-of-File Exports

**All modules MUST export at the end of their files** following this pattern:

#### Module Index (index.ts)
```typescript
// src/modules/users/index.ts

export * from './controllers/users.controller';
export * from './services/users.service';
export * from './repositories/users.repository';
export * from './models/user.model';
export * from './routes/users.routes';
export { default as UsersRouter } from './routes/users.routes';
```

#### Controllers
```typescript
// src/modules/users/controllers/users.controller.ts

class UsersController {
  // ... implementation
}

export { UsersController };
export default UsersController;
```

#### Services
```typescript
// src/modules/users/services/users.service.ts

class UsersService {
  // ... implementation
}

export { UsersService };
export default UsersService;
```

#### Repositories
```typescript
// src/modules/users/repositories/users.repository.ts

class UsersRepository {
  // ... implementation
}

export { UsersRepository };
export default UsersRepository;
```

#### Models
```typescript
// src/modules/users/models/user.model.ts

export interface User {
  id: string;
  name: string;
  email: string;
}

export type CreateUserInput = Omit<User, 'id'>;
```

#### Routes
```typescript
// src/modules/users/routes/users.routes.ts

const router = express.Router();

// ... route definitions

export { router };
export default router;
```

#### Middleware
```typescript
// src/modules/users/middleware/validate-user.middleware.ts

const validateUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // ... validation logic
};

export { validateUserMiddleware };
export default validateUserMiddleware;
```

### Shared Utilities Export
```typescript
// src/shared/utils/validators.ts

export const validateEmail = (email: string): boolean => { /* ... */ };
export const validatePhone = (phone: string): boolean => { /* ... */ };
export const validateDate = (date: string): boolean => { /* ... */ };
```

### App Entry Point
```typescript
// src/app.ts

import express from 'express';
import { UsersRouter } from './modules/users';
import { AppointmentsRouter } from './modules/appointments';

const app = express();

// Middleware setup
app.use(express.json());

// Routes
app.use('/api/users', UsersRouter);
app.use('/api/appointments', AppointmentsRouter);

export { app };
export default app;
```

---

## 🔧 Code Quality Rules

### Naming Conventions
- **Files:** kebab-case (e.g., `users.controller.ts`, `create-user.dto.ts`)
- **Classes:** PascalCase (e.g., `UsersService`, `UsersRepository`)
- **Functions:** camelCase (e.g., `getUserById`, `createUser`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`, `DEFAULT_TIMEOUT`)
- **Interfaces:** PascalCase starting with `I` or just PascalCase (e.g., `User` or `IUser`)

### TypeScript
- Always use explicit types
- No `any` types unless absolutely necessary
- Use interfaces for data structures
- Use DTOs for API inputs/outputs

### API Design
- Use REST conventions (GET, POST, PUT, DELETE, PATCH)
- Consistent endpoint naming: `/api/resource` or `/api/resource/:id`
- Always return status codes (200, 201, 400, 404, 500, etc.)
- Use proper HTTP methods for operations

### Database
- All queries must be parameterized (use Prisma/ORM)
- Always use migrations for schema changes
- Add database indexes for frequently queried fields
- Document complex queries with comments

### Security
- Validate all inputs (use DTOs)
- Sanitize user inputs
- Use authentication middleware for protected routes
- Hash passwords (never store plaintext)
- Use environment variables for secrets
- No sensitive data in logs

### Error Handling
- Create custom error classes for different scenarios
- Use try-catch blocks appropriately
- Always provide meaningful error messages
- Log errors properly (avoid sensitive data)

### Testing
- Write tests for critical business logic
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Aim for >80% code coverage on core modules

---

## 📋 Skills Usage Checklist

When starting a new feature or fixing a bug:

- [ ] **Phase 1:** Run SENIOR-ARCHITECT to review/update architecture
- [ ] **Phase 2:** Run SENIOR-BACKEND `api_scaffolder.py` for new APIs
- [ ] **Phase 3:** Run SENIOR-BACKEND `database_migration_tool.py` before production
- [ ] **Phase 4:** Run SENIOR-BACKEND `api_load_tester.py` for performance validation
- [ ] **Code Review:** Follow all conventions above
- [ ] **Testing:** Create tests for new features
- [ ] **Documentation:** Update this guide if adding new patterns

---

## 🚀 Quick Commands

```bash
# Development
npm run dev           # Start development server
npm run build         # Build for production
npm run test          # Run tests
npm run lint          # Lint code

# Architecture & Analysis
python scripts/project_architect.py .
python scripts/dependency_analyzer.py .

# Database
npm run db:migrate    # Run migrations
npm run db:seed       # Seed database

# API Scaffolding
python scripts/api_scaffolder.py <project-path>

# Load Testing
python scripts/api_load_tester.py
```

---

## 📞 When to Use Which Skill

| Task | Skill | Script |
|------|-------|--------|
| Start new project/major feature | senior-architect | project_architect.py |
| Create new API endpoints | senior-backend | api_scaffolder.py |
| Optimize database queries | senior-backend | database_migration_tool.py |
| Analyze dependencies | senior-architect | dependency_analyzer.py |
| Load test APIs | senior-backend | api_load_tester.py |
| Generate architecture docs | senior-architect | architecture_diagram_generator.py |

---

## 📚 Reference Documentation

Access skill references for detailed guidance:

- **API Design:** `.claude/skills/senior-backend/references/api_design_patterns.md`
- **Database Optimization:** `.claude/skills/senior-backend/references/database_optimization_guide.md`
- **Security Practices:** `.claude/skills/senior-backend/references/backend_security_practices.md`
- **Architecture Patterns:** `.claude/skills/senior-architect/references/architecture_patterns.md`
- **System Design:** `.claude/skills/senior-architect/references/system_design_workflows.md`
- **Tech Decisions:** `.claude/skills/senior-architect/references/tech_decision_guide.md`

---

## ✅ Last Updated

2026-04-13 - Initial setup with senior-backend and senior-architect skills
