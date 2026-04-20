FROM oven/bun:1.3.9-alpine

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

ENV NODE_ENV=production
ENV SKIP_ENV_VALIDATION=1

RUN bun run payload:generate-importmap \
  && bun run payload:generate-types \
  && bun run build

EXPOSE 3000

CMD ["sh", "-c", "bun run payload migrate && bun run start"]
