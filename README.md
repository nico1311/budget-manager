# BudgetManager
A simple webapp for personal budget management.

Built with:
- Node + TypeScript + [AdonisJS](https://adonisjs.com/) (API server)
- React + TypeScript + [Chakra UI](https://chakra-ui.com/) (frontend)

Browser compatibility: any browser that [supports ES6 modules](https://caniuse.com/?search=modules) (recent versions of Chromium-based browsers, Firefox and Safari).

### Running locally
#### Requirements
- Node >= 14
- A MySQL or MySQL-compatible database server (tested with MariaDB 10.4)

#### Setup
1. Clone this repository.
2. Install API server dependencies: `npm install`
3. Install frontend dependencies: `cd frontend && npm install`
4. Create the `.env` file:
   ```
    PORT=3333
    HOST=0.0.0.0
    NODE_ENV=development
    APP_KEY=<key used for encrypting session cookies>
    DB_CONNECTION=mysql
    MYSQL_HOST=localhost
    MYSQL_PORT=3306
    MYSQL_USER=<mysql username>
    MYSQL_PASSWORD=<mysql password>
    MYSQL_DB_NAME=<mysql database name>
    SESSION_DRIVER=cookie
   ```
5. Run migrations (to create the necessary database tables): `node ace migration:run`

#### Run in development mode
- Run `npm run dev` to start the servers (both backend and frontend) in development mode. By default, API server listens on port `3333` (if changed, also needs to be changed in frontend `vite.config.js`) and frontend server listens on port 3000.
- Visit http://localhost:3000/

#### Build for production
- Run `npm run build`; this will create a production build of frontend and backend applications.
- Set the required environment variables or copy the `.env` file to the `build` directory.
- Run `node server.js` to start the server
- App will be available at http://localhost:3333/
- API docs will be available at http://localhost:3333/docs

### Run with Docker
1. Build Docker image: `docker build -t budgetmanager:latest .`
2. Run migrations: `docker run --env-file .env -it budgetmanager:latest  "node" "ace" "migration:run"`
3. Start the server: `docker run --env-file .env -p 3333:3333 -it budgetmanager:latest`
