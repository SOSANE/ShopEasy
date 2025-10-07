FROM ghcr.io/astral-sh/uv:python3.12-bookworm-slim

ENV TZ America/Toronto

RUN apt-get update \
    && apt-get install -y --no-install-recommends libpq5 libpq-dev build-essential curl \
    && rm -rf /var/lib/apt/lists/*

ENV UV_COMPILE_BYTECODE=1
ENV UV_LINK_MODE=copy
ENV UV_TOOL_BIN_DIR=/usr/local/bin

WORKDIR /app/


ADD pyproject.toml /app/
ADD uv.lock /app/

RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --locked --no-install-project --no-dev


ADD . /app/
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --locked --no-dev
ENV PATH="/app/.venv/bin:$PATH"

EXPOSE 8000

ENTRYPOINT ["/bin/sh", "entrypoint.sh"]