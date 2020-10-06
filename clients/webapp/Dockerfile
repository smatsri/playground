FROM node:12-alpine AS BUILD_IMAGE

COPY package.json /usr/src/pg-ui/package.json
COPY yarn.lock /usr/src/pg-ui/yarn.lock
WORKDIR /usr/src/pg-ui
RUN ["yarn", "install"]

COPY . .

RUN ["yarn", "build"]

WORKDIR /usr/src/pg-ui/server

RUN npm install
RUN npm prune --production



FROM node:12-alpine

WORKDIR /usr/src/app

# copy from build image
COPY --from=BUILD_IMAGE /usr/src/pg-ui/server.js .
COPY --from=BUILD_IMAGE /usr/src/pg-ui/build ./build
COPY --from=BUILD_IMAGE /usr/src/pg-ui/server/node_modules ./node_modules

EXPOSE 2000
CMD [ "node", "./server.js" ]