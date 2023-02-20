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
8. Run command `npm dev`
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
```
