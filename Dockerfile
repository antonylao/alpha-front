# docker build -t alpha_front . 
# if cache issues: docker build --no-cache -t alpha_front . 
# docker run -p 8090:8090 --name alpha_front_container alpha_front
# docker run -p 8090:80 --name alpha_front_container alpha_front
FROM node:20.11.0-alpine3.19 AS build_stage

LABEL maintainer="alpha"

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine AS production_stage

COPY --from=build_stage /app/dist /usr/share/nginx/html 

EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]

# FROM build_stage AS production_stage

# COPY --from=build_stage /app/node_modules ./node_modules
# COPY --from=build_stage /app/package.json ./package.json
# COPY --from=build_stage /app/dist ./dist


# CMD [ "npm", "run", "preview" ]