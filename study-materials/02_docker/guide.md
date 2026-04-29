# 📘 Complete Docker & Containerization Guide
## From Installation to Production Deployment

---

## Chapter 1: Why Docker?

### The Problem Docker Solves

Without Docker:
```
Developer: "It works on MY machine!"
Tester:    "It doesn't work on mine."
DevOps:    "It doesn't work in production either."
```

With Docker:
```
Developer: "It works in Docker."
Tester:    "It works in the same Docker image."
DevOps:    "It runs the exact same Docker image in production."
```

Docker packages your application AND its entire environment (OS, libraries, dependencies) into a portable container that runs identically everywhere.

### Docker vs Virtual Machines

```
Virtual Machine:                    Docker Container:
┌─────────────────────┐             ┌─────────────────────┐
│   App A   │  App B  │             │   App A   │  App B  │
├───────────┼─────────┤             ├───────────┼─────────┤
│  Guest OS │Guest OS │             │  Libs/Deps│Libs/Deps│
├───────────┴─────────┤             ├─────────────────────┤
│     Hypervisor      │             │    Docker Engine     │
├─────────────────────┤             ├─────────────────────┤
│      Host OS        │             │      Host OS        │
├─────────────────────┤             ├─────────────────────┤
│     Hardware        │             │     Hardware        │
└─────────────────────┘             └─────────────────────┘

VM: Heavy (GBs), slow start         Docker: Light (MBs), instant start
```

---

## Chapter 2: Core Concepts

### Key Terminology

| Term | Definition | Analogy |
|---|---|---|
| **Image** | A blueprint/template for creating containers | A recipe |
| **Container** | A running instance of an image | A meal made from the recipe |
| **Dockerfile** | Instructions to build an image | The recipe steps |
| **Registry** | Storage for images (Docker Hub) | A cookbook library |
| **Volume** | Persistent storage attached to containers | External hard drive |
| **Network** | Communication channel between containers | Phone line between rooms |

### Installation (Windows)

1. Download **Docker Desktop** from [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/)
2. Run the installer (requires WSL 2)
3. Restart your computer
4. Open terminal and verify:
```bash
docker --version
# Docker version 27.x.x

docker compose version
# Docker Compose version v2.x.x
```

---

## Chapter 3: Docker Commands Cheatsheet

### Images

```bash
# Pull an image from Docker Hub
docker pull python:3.12-slim
docker pull postgres:16
docker pull node:20-alpine

# List all local images
docker images

# Remove an image
docker rmi python:3.12-slim

# Build an image from Dockerfile
docker build -t my-app:1.0 .

# Tag an image
docker tag my-app:1.0 username/my-app:1.0

# Push to Docker Hub
docker push username/my-app:1.0
```

### Containers

```bash
# Run a container
docker run python:3.12-slim python -c "print('Hello Docker!')"

# Run interactively (-it = interactive terminal)
docker run -it python:3.12-slim bash

# Run in background (-d = detached)
docker run -d --name my-postgres -p 5432:5432 \
  -e POSTGRES_PASSWORD=secret postgres:16

# List running containers
docker ps

# List ALL containers (including stopped)
docker ps -a

# Stop a container
docker stop my-postgres

# Start a stopped container
docker start my-postgres

# Remove a container
docker rm my-postgres

# View container logs
docker logs my-postgres
docker logs -f my-postgres  # follow (like tail -f)

# Execute a command inside a running container
docker exec -it my-postgres psql -U postgres

# View container resource usage
docker stats
```

### Port Mapping

```bash
# -p HOST_PORT:CONTAINER_PORT
docker run -d -p 8000:8000 my-fastapi-app     # localhost:8000 → container:8000
docker run -d -p 3000:80 my-react-app         # localhost:3000 → container:80
docker run -d -p 5433:5432 postgres:16        # localhost:5433 → container:5432
```

---

## Chapter 4: Writing Dockerfiles

### 4.1 Dockerfile for Python FastAPI

```dockerfile
# ---- Stage 1: Base Image ----
FROM python:3.12-slim

# Set working directory inside container
WORKDIR /app

# Copy requirements first (for Docker layer caching)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port FastAPI runs on
EXPOSE 8000

# Command to run the app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Build and run:**
```bash
docker build -t zenith-engine:1.0 .
docker run -d -p 8000:8000 --name zenith zenith-engine:1.0
# Visit http://localhost:8000/docs to see Swagger UI
```

### 4.2 Dockerfile for React (Vite)

```dockerfile
# ---- Stage 1: Build ----
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (layer caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the production bundle
RUN npm run build

# ---- Stage 2: Serve ----
FROM nginx:alpine

# Copy built files to nginx serve directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (for React Router SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf for React SPA:**
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Handle React Router - serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 4.3 Dockerfile Instruction Reference

| Instruction | Purpose | Example |
|---|---|---|
| `FROM` | Base image | `FROM python:3.12-slim` |
| `WORKDIR` | Set working directory | `WORKDIR /app` |
| `COPY` | Copy files from host to container | `COPY . .` |
| `RUN` | Execute a command during BUILD | `RUN pip install -r requirements.txt` |
| `CMD` | Default command when container STARTS | `CMD ["uvicorn", "main:app"]` |
| `EXPOSE` | Document which port the app uses | `EXPOSE 8000` |
| `ENV` | Set environment variables | `ENV NODE_ENV=production` |
| `ARG` | Build-time variables | `ARG VERSION=1.0` |
| `ENTRYPOINT` | Like CMD but not easily overridden | `ENTRYPOINT ["python"]` |
| `VOLUME` | Mark a directory for persistent storage | `VOLUME /data` |
| `HEALTHCHECK` | Container health monitoring | `HEALTHCHECK CMD curl -f http://localhost/` |

### 4.4 The .dockerignore File

Create `.dockerignore` (like `.gitignore`) to exclude files from the build context:

```
node_modules
dist
.git
.env
__pycache__
*.pyc
.vscode
.DS_Store
```

> [!TIP]
> **Layer Caching Trick:** Docker caches each instruction as a layer. Put things that change RARELY (like `COPY requirements.txt` + `RUN pip install`) BEFORE things that change OFTEN (like `COPY . .`). This way, Docker reuses cached layers and builds faster.

---

## Chapter 5: Docker Volumes

Containers are **ephemeral** — when you remove a container, all data inside it is lost. Volumes solve this.

```bash
# Named volume (managed by Docker)
docker volume create pgdata
docker run -d --name my-postgres \
  -v pgdata:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=secret \
  postgres:16

# Bind mount (directory from your host machine)
docker run -d --name my-app \
  -v ./src:/app/src \
  my-app:1.0

# Anonymous volume
docker run -d -v /app/data my-app:1.0
```

```bash
# List volumes
docker volume ls

# Inspect a volume
docker volume inspect pgdata

# Remove a volume
docker volume rm pgdata

# Remove all unused volumes
docker volume prune
```

---

## Chapter 6: Docker Compose

Docker Compose lets you define and run multi-container applications with a single YAML file.

### 6.1 Complete docker-compose.yml for Zenith Project

```yaml
# docker-compose.yml
version: '3.9'

services:
  # ---- FastAPI Backend ----
  api:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: zenith-api
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:secret@db:5432/zenith
      - REDIS_URL=redis://cache:6379/0
      - JWT_SECRET=your-super-secret-key
      - ENV=development
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_started
    volumes:
      - ./backend:/app  # Hot reload during development
    restart: unless-stopped

  # ---- PostgreSQL Database ----
  db:
    image: postgres:16-alpine
    container_name: zenith-db
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=zenith
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql  # Auto-run SQL on first start
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  # ---- Redis Cache ----
  cache:
    image: redis:7-alpine
    container_name: zenith-cache
    ports:
      - "6379:6379"
    volumes:
      - redisdata:/data
    restart: unless-stopped

  # ---- React Frontend ----
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: zenith-frontend
    ports:
      - "3000:80"
    depends_on:
      - api
    restart: unless-stopped

volumes:
  pgdata:
  redisdata:
```

### 6.2 Docker Compose Commands

```bash
# Start all services
docker compose up

# Start in background
docker compose up -d

# Start specific service
docker compose up api db

# Stop all services
docker compose down

# Stop and remove volumes (DELETES DATA)
docker compose down -v

# Rebuild images
docker compose up --build

# View logs
docker compose logs
docker compose logs -f api    # follow specific service

# Execute command in a service
docker compose exec api bash
docker compose exec db psql -U postgres

# Scale a service (run multiple instances)
docker compose up --scale api=3
```

---

## Chapter 7: Multi-Stage Builds (Production Optimization)

Multi-stage builds keep your production image small by only including what's needed to RUN the app, not what's needed to BUILD it.

```dockerfile
# ---- Stage 1: Build Stage ----
FROM python:3.12-slim AS builder

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

COPY . .

# ---- Stage 2: Production Stage ----
FROM python:3.12-slim

WORKDIR /app

# Copy ONLY the installed packages (not build tools)
COPY --from=builder /install /usr/local
COPY --from=builder /app .

# Non-root user for security
RUN adduser --disabled-password appuser
USER appuser

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Result:** Builder stage might be 800MB. Production stage is only ~150MB.

---

## Chapter 8: Docker Networking

```bash
# List networks
docker network ls

# Create a custom network
docker network create mynet

# Run containers on the same network (they can talk to each other by name)
docker run -d --name api --network mynet my-api
docker run -d --name db --network mynet postgres:16

# Now 'api' can connect to 'db' using hostname 'db'
# DATABASE_URL=postgresql://postgres:secret@db:5432/zenith
```

> [!NOTE]
> Docker Compose automatically creates a network for your services. Services refer to each other by their service name (e.g., `db`, `cache`, `api`).

---

## Chapter 9: Common Docker Interview Questions

### Q1: What is the difference between CMD and ENTRYPOINT?
> **CMD** provides default arguments and can be overridden at runtime.
> **ENTRYPOINT** sets the main command and is NOT easily overridden.
> Best practice: Use ENTRYPOINT for the executable, CMD for default arguments.

### Q2: What is the difference between COPY and ADD?
> **COPY** simply copies files. **ADD** can also extract tar archives and fetch URLs.
> Best practice: Use COPY unless you specifically need ADD's features.

### Q3: How do you reduce Docker image size?
> 1. Use slim/alpine base images
> 2. Multi-stage builds
> 3. Combine RUN commands to reduce layers
> 4. Use .dockerignore
> 5. Clean up package manager cache in the same RUN layer

### Q4: What happens when a container crashes?
> The `restart` policy controls this:
> - `no` — don't restart (default)
> - `always` — always restart
> - `unless-stopped` — restart unless manually stopped
> - `on-failure` — restart only on non-zero exit code

### Q5: How do containers communicate?
> Containers on the same Docker network can communicate by service/container name. Docker provides built-in DNS resolution within networks.

---

*Practice by Dockerizing your Zenith Engine. Once you can do it from memory, you've mastered Docker.* 🐳
