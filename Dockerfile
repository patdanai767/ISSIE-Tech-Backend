FROM node:20-alpine AS base
WORKDIR /app

COPY ./package.json ./package-lock.json ./
COPY ./prisma prisma

RUN npm cache clean --force
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app

COPY . .
COPY --from=base /app/node_modules ./node_modules

RUN npx prisma generate
RUN npm run build

FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY .env .env

EXPOSE 3000

CMD ["node", "dist/main"]