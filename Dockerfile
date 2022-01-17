FROM nginx:alpine

RUN rm -f /usr/share/nginx/html/*
COPY dist/frontend /usr/share/nginx/html
COPY nginx.conf /etcnginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "deamon off;"]