FROM node:12-alpine AS BUILD_IMAGE

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build-ts
RUN npm prune --production

FROM node:12-alpine

WORKDIR /usr/src/app

# copy from build image
COPY --from=BUILD_IMAGE /usr/src/app/dist ./dist
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules

EXPOSE 2001
CMD [ "node", "./dist/server.js" ]