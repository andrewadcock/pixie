# Pixie

Pixie is an online list creator and picker service. By default, it tracks movies with genre(s).


## Setup
1. Clone repo
2. Create /backend/.env
   1. Sample locahost contents below
      1. Change `SECRET_KEY`
3. Create /db/.env
   1. Sample localhost contents below
4. Create /frontend/.env
   1. Sample file context below
5. Run `docker-compose up`
   1. View backend at http://localhost:8000
6. In New Terminal: `cd /frontend/`
7. Run command `npm install`
8. Run command `npm dev:ts`
   1. View frontend at http://localhost:3000

### /backend/.env
```dotenv
DEBUG=True
SECRET_KEY='sdflkjfartyBlartFastIthinkIsHowItsspelled'
ALLOWED_HOSTS=*

# postgres
DATABASE_URL=postgres://
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
```

### /db/.env
```dotenv
DATABASE_URL=postgres://
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
```

### /fronted/.env
```dotenv
NEXT_PUBLIC_API_URL = 'http://localhost:8000/'
NEXT_PUBLIC_LOCAL_URL = 'http://localhost:3000/'
NEXT_PUBLIC_API_VERSION = 'v1'
NEXT_PUBLIC_IS_HTTPS = true
```

## Notes & Reminders
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
`
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
