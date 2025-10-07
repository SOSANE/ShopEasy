FROM python:3.13.7-slim

ENV TZ America/Toronto
ENV PYTHONDONTWRITEBYTECODE 1 
ENV PYTHONUNBUFFERED 1
WORKDIR /app/

RUN apt-get update \
    && apt-get install -y --no-install-recommends libpq5 libpq-dev build-essential curl \
    && rm -rf /var/lib/apt/lists/*

# Installer les dépendances du backend
ADD requirements.txt /app/
RUN pip3 install -r requirements.txt


ADD . /app/
EXPOSE 8000

ENTRYPOINT ["/bin/sh", "entrypoint.sh"]