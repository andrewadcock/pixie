# Pixie

Pixie is an online list creator and picker service. By default, it tracks movies with genre(s).

## 1. Setup

1. Clone repo
2. Create /backend/.env
   1. Sample contents below
      1. Change `SECRET_KEY`
3. Create /db/.env
   1. Sample contents below
4. Create /db/secrets/cloudsql.json
   1. Sample contents below
5. Create /frontend/.env
   1. Sample contents below
6. Run `docker-compose up`
   1. View backend at http://localhost:8080/admin
7. Create backend user
   1. Run `docker ps` to get backend container name (e.g. pixie-backend-1)
   2. Create super user
      1. Run `docker exec -it [CONTAINER NAME]> python manage.py createsuperuser` (e.g. `docker exec -it pixie-backend-1 python manage.py createsuperuser`)
8. In New Terminal: `cd /frontend/`
9. Run command `npm install`
10. Run command `npm dev:ts`
11. View frontend at http://localhost:3000

### /backend/.env

```dotenv
DEBUG=True
SECRET_KEY='xxxREPLACE_MExxx'
ALLOWED_HOSTS=*

# postgres for cloud-proxy
# POSTGRES_USER=''
# POSTGRES_PASSWORD=''
# POSTGRES_DB='pixie-django'
# POSTGRES_HOST='cloudsql-proxy'



# postgres for docker postgres
POSTGRES_USER='postgres'
POSTGRES_PASSWORD='postgres'
POSTGRES_DB='postgres'
POSTGRES_HOST='postgres'
```

### /db/.env

```dotenv
POSTGRES_HOST=postgres://
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
```

### /db/secrets/cloudsql.json

```dotenv
{
"type": "service_account",
"project_id": "pixie-438313",
"private_key_id": "{PRIVATE KEY ID}",
"private_key": "{PRIVATE KEY}",
"client_email": "pixie-sql@pixie-438313.iam.gserviceaccount.com",
"client_id": "100964363540086579360",
"auth_uri": "https://accounts.google.com/o/oauth2/auth",
"token_uri": "https://oauth2.googleapis.com/token",
"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/pixie-sql%40pixie-438313.iam.gserviceaccount.com",
"universe_domain": "googleapis.com"
}
```

### /fronted/.env

```dotenv
NEXT_PUBLIC_API_URL = 'http://localhost:8080/'
NEXT_PUBLIC_LOCAL_URL = 'http://localhost:3000/'
NEXT_PUBLIC_API_VERSION = 'v1'
NEXT_PUBLIC_IS_HTTPS = true
```

## 2. Notes & Reminders

### Toggling Between Local Postgres and CloudSQL Proxy

1. Update `/backend/.env`
   1. Set `USE_CLOUD_PROXY='true'` to use cloudSQL
2. Update `/docker-compose.yml`
   1. Comment out service `postgres` to use CloudSQL
   2. Uncomment service `cloudsql-proxy`
   3. Swap `depends_on` for `backend` service

### Pre-commit

This project uses pre-commit ([https://github.com/pre-commit/pre-commit](https://github.com/pre-commit/pre-commit)).
When committing to the repo several checks will run

1. Install pre-commit
   1. `sudo apt install pre-commit`
2. Install for the project
   1. `pre-commit install`

Having an issue running `pre-commit`? Something about python not being found? Start a virtual environment to fix this
issue.

### Adding PIP requirements

Add all required packages to `/backend/requirements.txt`. Remember to restart docker for installation.

### Run Flake 8 Locally

1. Install flake8
   1. `sudo apt install flake8`
2. Run command (can be found in `/backend/Dockerfile`)
   1. ` flake8 --ignore=E501,F401 .`

### Django Migrations

To make migrations enter the backend containers bash interface.

1. List running containers to get backend name
   1. `docker ps`
2. Enter bash
   1. `docker exec -it <CONTAINER_NAME> /bin/bash`
   2. example: `docker exec -it pixie_backend_1 /bin/bash`
3. Run migration
   1. `python manage.py makemigrations && python manage.py migrate`

### API Information

Uses the Movie of the Night API for program details and availability
https://www.movieofthenight.com/about/api
https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability/
