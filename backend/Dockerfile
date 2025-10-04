FROM astral/uv:python3.13-bookworm-slim

ENV TZ=America/Toronto
WORKDIR /app

# Install system deps
RUN apt-get update \
    && apt-get install -y --no-install-recommends libpq5 libpq-dev build-essential curl \
    && rm -rf /var/lib/apt/lists/*

# Set uv environment variables
ENV UV_COMPILE_BYTECODE=1
ENV UV_LINK_MODE=copy
ENV UV_PROJECT_ENVIRONMENT=/app/.venv  # Explicitly set the venv path
ENV PATH="/app/.venv/bin:$PATH"  # Set PATH early

COPY pyproject.toml uv.lock /app/

# Sync dependencies; the environment will be created at /app/.venv
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --locked --no-install-project --no-dev

COPY . /app
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --locked --no-dev

# By now, PATH is already set to use the virtual environment's Python
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

# Check which Python is being used
RUN which python
RUN python --version

# Verify the virtual environment exists and has the expected structure
RUN ls -la /app/.venv/bin/python*

# Check if the module is installed in the active environment
RUN python -c "import sys; print(sys.path)"
RUN uv pip list | grep <your_missing_module>

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"] # Use `python` from PATH