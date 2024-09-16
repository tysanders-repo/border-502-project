#long term support base image
FROM node:lts as base

#set working directory
WORKDIR /usr/src
COPY package.json ./

#install dependencies
RUN npm install

##########################
FROM base AS dev
COPY . .
EXPOSE 3000
CMD ["npm", "start"]


##########################
FROM base AS build
COPY . .
RUN pnpm run build


##########################
FROM nginx:1.25.5-alpine as prod
COPY --from=build /usr/src/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
