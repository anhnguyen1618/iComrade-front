FROM node:8.6-alpine

FROM catchdigital/node-sass

EXPOSE 8080

WORKDIR /iComrade/src/icomrade-front

COPY package.json .

COPY yarn.lock .

RUN yarn && npm cache clean --force

COPY . .

RUN chmod +x ./script/entrypoint.sh

CMD ["script/entrypoint.sh"]
