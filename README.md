# Backstage Developer Portal

A self-hosted developer portal running entirely in Docker — no Node.js or Yarn required on the host. It includes a template that creates a GitHub repository with a Dockerfile and GitHub Actions CI/CD pipeline in one click.

## Setup

Requires Docker Desktop only.

```bash
cp .env.example .env
# Add your GitHub Personal Access Token to .env
# Token scopes needed: repo, workflow, read:org

docker compose up --build
```

First build takes ~5 minutes. Open http://localhost:7007 when done.

```bash
docker compose down      # stop, keep data
docker compose down -v   # stop and wipe database
```

## What was changed

The Backstage app was generated with `npx @backstage/create-app` and then modified:

- `app/app-config.yaml` — switched from SQLite to PostgreSQL, added GitHub integration, enabled guest login, pointed catalog at the local template
- `app/packages/app/src/App.tsx` — registered the scaffolder, notifications, and signals plugins (required for the Create page to work)
- `Dockerfile.backstage` — custom two-stage build since the generated Dockerfile expects pre-built artifacts; build stage runs `yarn install` + `tsc` + `build:backend`, production stage copies the result
- `docker-compose.yml` — runs Backstage and PostgreSQL together

## How the template works

Navigate to **Create → Mini Service**, fill in the form (name, description, GitHub owner, port), and submit. Backstage then:

1. Renders the skeleton files (`Dockerfile`, `src/index.js`, `package.json`, `.github/workflows/ci.yml`) with your inputs
2. Creates a new GitHub repository and pushes the files
3. Registers the new service in the portal catalog

The GitHub Actions workflow builds and tests the service on every push to `main`.
