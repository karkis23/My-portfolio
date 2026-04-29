# 🗝️ Docker — Key Notes (Cheat Sheet)

## Core Concepts in 30 Seconds

- **Image** = Blueprint (read-only template) → like a `.iso` file
- **Container** = Running instance of an image → like a running VM (but lighter)
- **Dockerfile** = Recipe to build an image → list of instructions
- **Volume** = Persistent storage → data survives container deletion
- **Network** = Communication between containers → containers talk by name
- **Registry** = Image storage (Docker Hub) → like GitHub for images

---

## Essential Commands Cheat Sheet

### Images
```bash
docker pull IMAGE:TAG        # Download image
docker build -t NAME:TAG .   # Build from Dockerfile
docker images                # List local images
docker rmi IMAGE             # Remove image
docker tag OLD NEW           # Tag/rename image
docker push NAME:TAG         # Push to registry
```

### Containers
```bash
docker run -d -p 8000:8000 --name myapp IMAGE    # Run detached with port
docker ps                                         # List running
docker ps -a                                      # List ALL
docker stop CONTAINER                              # Stop gracefully
docker start CONTAINER                             # Start stopped
docker rm CONTAINER                                # Remove
docker logs -f CONTAINER                           # Follow logs
docker exec -it CONTAINER bash                     # Enter shell
docker stats                                       # Resource usage
```

### Volumes
```bash
docker volume create VOLNAME           # Create named volume
docker run -v VOLNAME:/data IMAGE      # Mount named volume
docker run -v ./local:/app IMAGE       # Mount bind (local folder)
docker volume ls                       # List volumes
docker volume prune                    # Remove unused
```

### Docker Compose
```bash
docker compose up                # Start all services
docker compose up -d             # Start detached
docker compose up --build        # Rebuild + start
docker compose down              # Stop + remove
docker compose down -v           # Stop + remove + delete volumes
docker compose logs -f SERVICE   # Follow service logs
docker compose exec SERVICE bash # Enter service shell
docker compose ps                # List services
```

---

## Dockerfile Best Practices

```dockerfile
# 1. Use specific tags (not :latest)
FROM python:3.12-slim

# 2. Set working directory
WORKDIR /app

# 3. Copy dependency files FIRST (layer caching!)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Copy code LAST (changes most often)
COPY . .

# 5. Use non-root user for security
RUN adduser --disabled-password appuser
USER appuser

# 6. Document the port
EXPOSE 8000

# 7. Use exec form for CMD
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Layer Caching Rule
```
Changes RARELY  → Put at TOP      (base image, dependencies)
Changes OFTEN   → Put at BOTTOM   (source code)
```

---

## Docker Compose Template

```yaml
version: '3.9'
services:
  app:
    build: .
    ports: ["8000:8000"]
    environment:
      - DB_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_PASSWORD=secret
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready"]
      interval: 5s
      retries: 5

volumes:
  pgdata:
```

---

## Top Interview Questions — Quick Answers

| Question | Key Answer |
|---|---|
| Image vs Container? | Image = blueprint (read-only), Container = running instance |
| CMD vs ENTRYPOINT? | CMD = default args (overridable), ENTRYPOINT = main command (fixed) |
| COPY vs ADD? | COPY = simple copy, ADD = can extract tar + fetch URLs. Use COPY. |
| How to reduce image size? | Alpine base, multi-stage builds, .dockerignore, combine RUN layers |
| How containers communicate? | Same Docker network → refer by service name (built-in DNS) |
| What are layers? | Each Dockerfile instruction = a cached layer. Unchanged layers are reused |
| Restart policies? | `no`, `always`, `unless-stopped`, `on-failure` |
