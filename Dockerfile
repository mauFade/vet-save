FROM node:16-alpine

WORKDIR /home/node/app

COPY . .

COPY ./.docker/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

RUN yarn

EXPOSE 33333

CMD [ "/entrypoint.sh" ]
