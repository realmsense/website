# Stage 1: Build website

FROM node:lts as build
ENV NODE_ENV="production webpack"

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build


# Stage 2: Serve with nginx
FROM nginx:latest
COPY --from=build /usr/src/app/dist/realmsense-website /usr/share/nginx/html
EXPOSE 80
