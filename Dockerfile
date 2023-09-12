FROM nginx:1.16

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY dist/yuuvis-form-model-validator/ /usr/share/nginx/html/