FROM node:lts-alpine3.15 as dist
COPY . /chiblog
WORKDIR /chiblog
RUN cd /chiblog && npm install pnpm -g && pnpm i && pnpm build

FROM node:lts-alpine3.15 as production
WORKDIR /chiblog
COPY --from=dist /chiblog/.output /chiblog
CMD node /chiblog/server/index.mjs

EXPOSE 3000