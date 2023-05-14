FROM nginx

RUN npm run build

COPY dist/ /usr/share/nginx/html/
COPY nginx/transport.conf /etc/nginx/conf.d/default.conf

