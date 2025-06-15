ARG NODE_VERSION=22.11.0
FROM node:22.11.0-alpine AS base

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

FROM base AS final
RUN npm run build

EXPOSE 3001
CMD ["npm", "run", "start:prod"]
