## Getting Started

- **TLDR**
  - Install Docker
  - Run `make setup`
  - `cd frontend` then `yarn && yarn dev`
  - Access the website at `http://localhost:3000`
  - Login with the provided credentials

## Explanation of the above steps

1. **Install Docker**: Make sure docker is installed on your machine.

2. **Database and backend Setup**: Run `make setup` to set up the database, perform migrations, scrape urhouse.com and seed the database with initial data.

3. **Frontend Setup**: `cd frontend && yarn && yarn dev`. The reason the frontend is not dockerized is because i found out the hard way that getting nextjs to run in docker is a real pain.

4. **Access the Website**: After setting up, the website should be accessible at `http://localhost:3000`.

5. **Login**: Use the provided user credentials to log in to the application. There are two types of users:
   - ADMIN: `hk.admin / uT8fFJATo8irUTaD`
   - USER: `hk.user / Qp7M3e2NDavnR7J`

## Cleanup

Run `make cleanup` to remove all docker containers, images and volumes. It does the opposite of `make setup`.
