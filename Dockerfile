FROM node:20 as install
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --silent
COPY . ./

FROM install as builder
RUN npm run build

FROM node:20-alpine as prod
ENV NODE_ENV production
WORKDIR /usr
COPY package*.json ./
RUN npm ci --silent
COPY --from=builder /usr/src/app/dist   ./dist

EXPOSE 3001
CMD ["node", "dist/index.js"]
