FROM node:lts-buster AS build

RUN mkdir /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app
USER node

# Install backend dependencies
COPY --chown=node:node ./package*.json ./
RUN npm ci --loglevel=warn

# Install frontend dependencies
COPY --chown=node:node ./frontend/package*.json ./frontend/
WORKDIR /home/node/app/frontend
RUN npm ci --loglevel=warn

# Copy frontend files and run build
COPY --chown=node:node ./frontend .
RUN npm run build

# Copy backend files, run build and generate docs
WORKDIR /home/node/app
COPY --chown=node:node . ./
RUN npm run backend:build

# Build step 2
FROM node:lts-buster-slim

RUN mkdir /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app
USER node

# Copy build output and docs from first step and install prod dependencies only
COPY --from=build --chown=node:node /home/node/app/build ./build
WORKDIR /home/node/app/build
RUN npm ci --loglevel=warn --only=production

# Copy API docs
WORKDIR /home/node/app
COPY --from=build --chown=node:node /home/node/app/docs ./docs

# Expose HTTP port
EXPOSE $PORT

WORKDIR /home/node/app/build

CMD ["node", "server.js"]
