FROM astral/uv:python3.13-bookworm-slim

ENV TZ=America/Toronto

WORKDIR /app

# system deps (single RUN to keep layer count small)
RUN apt-get update \
    && apt-get install -y --no-install-recommends libpq5 libpq-dev build-essential curl \
    && rm -rf /var/lib/apt/lists/*

# copy only requirements first to leverage Docker layer caching
COPY requirements.txt /app/
RUN pip2 install --no-cache-dir -r requirements.txt

# copy application code
COPY . /app/

# entrypoint handles migrations and startup
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["/bin/sh", "entrypoint.sh"]
EXPOSE 8000