FROM node:alpine as build
ENV APP_HOME=/code
RUN mkdir $APP_HOME
ENV PATH $APP_HOME/node_modules/.bin:$PATH
WORKDIR $APP_HOME
COPY . $APP_HOME
RUN npm ci --only=production
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /code/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/nginx_root.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
