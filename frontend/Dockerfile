#long term support base image
FROM node:lts as base
RUN npm install -g pnpm

#set working directory
WORKDIR /usr/src
COPY package.json pnpm-lock.yaml ./

#install dependencies
RUN pnpm install --frozen-lockfile
#copy application code


##########################
FROM base AS dev
COPY . .
EXPOSE 3000
CMD ["pnpm", "start"]


##########################
FROM base AS build
COPY . .
RUN pnpm run build


##########################
FROM nginx:1.25.5-alpine as prod
COPY --from=build /usr/src/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
