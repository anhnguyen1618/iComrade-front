FROM node:6.11.3-alpine

FROM catchdigital/node-sass

EXPOSE 8080

WORKDIR /iComrade/src/icomrade-front

COPY package.json .

COPY yarn.lock .

RUN yarn && npm cache clean --force

COPY . .

# ENTRYPOINT ["/sbin/tini", "--"]

CMD ["npm", "start"]
