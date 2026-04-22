#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

NO_PULL=0
SEED=0

for arg in "$@"; do
  case "$arg" in
    --no-pull)
      NO_PULL=1
      ;;
    --seed)
      SEED=1
      ;;
    -h|--help)
      cat <<'EOF'
Usage: ./scripts/deploy.sh [--no-pull] [--seed]

Options:
  --no-pull  Skip git fetch/pull before deploy
  --seed     Run bun run seed:lumen after the containers are up
EOF
      exit 0
      ;;
    *)
      echo "Unknown option: $arg" >&2
      exit 1
      ;;
  esac
done

if [[ ! -f .env.production ]]; then
  echo "Missing .env.production in $ROOT_DIR" >&2
  exit 1
fi

if ! command -v git >/dev/null 2>&1; then
  echo "git is required" >&2
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "docker is required" >&2
  exit 1
fi

if (( NO_PULL == 0 )); then
  CURRENT_BRANCH="$(git branch --show-current 2>/dev/null || true)"
  CURRENT_BRANCH="${CURRENT_BRANCH:-master}"

  echo ">>> Fetching latest code"
  git fetch origin
  git pull --ff-only origin "$CURRENT_BRANCH"
fi

COMPOSE=(docker compose --env-file .env.production)

echo ">>> Building and starting containers"
"${COMPOSE[@]}" up -d --build

if (( SEED == 1 )); then
  echo ">>> Seeding Payload content"
  "${COMPOSE[@]}" exec -T app bun run seed:lumen
fi

echo ">>> Container status"
"${COMPOSE[@]}" ps

echo

echo ">>> Recent app logs"
"${COMPOSE[@]}" logs --tail=60 app
