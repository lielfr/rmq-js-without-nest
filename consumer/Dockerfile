FROM node:lts-alpine
RUN mkdir -p /app
RUN chown -R node:node /app
USER node
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
EXPOSE 3000
CMD [ "npm", "run", "dev" ]