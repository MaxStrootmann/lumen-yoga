FROM node:20-alpine

WORKDIR /app

RUN npm install -g bun@1.3.9

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

ENV NODE_ENV=production
ENV SKIP_ENV_VALIDATION=1

RUN ./node_modules/.bin/payload generate:importmap \
  && ./node_modules/.bin/payload generate:types \
  && bun run build

EXPOSE 3000

CMD ["sh", "-c", "./node_modules/.bin/payload migrate && bun run start"]
