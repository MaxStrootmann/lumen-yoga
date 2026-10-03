#!/usr/bin/env python3
"""Momentopname van de nieuwste Instagram-posts van @lumen.yoga.

De site toont deze posts zolang er geen Instagram-token is (of als de API
faalt). Bron is een Apify-export van de actor apify~instagram-post-scraper
(JSON-lijst). Gebruik:

    python3 scripts/instagram-snapshot.py posts.json

Schrijft public/instagram/snapshot.json en public/instagram/<id>.webp.
"""
import io
import json
import sys
import urllib.request
from pathlib import Path

from PIL import Image

LIMIT = 12
WIDTH = 720
ROOT = Path(__file__).resolve().parent.parent / "public" / "instagram"

MEDIA_TYPES = {"Image": "IMAGE", "Sidecar": "CAROUSEL_ALBUM", "Video": "VIDEO"}


def main(source: str) -> None:
    posts = json.loads(Path(source).read_text())
    posts = [p for p in posts if p.get("displayUrl") and p.get("ownerUsername") == "lumen.yoga"]
    posts.sort(key=lambda p: p.get("timestamp", ""), reverse=True)

    ROOT.mkdir(parents=True, exist_ok=True)
    for old in ROOT.glob("*.webp"):
        old.unlink()

    snapshot = []
    for post in posts[:LIMIT]:
        request = urllib.request.Request(post["displayUrl"], headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(request, timeout=30) as response:
            image = Image.open(io.BytesIO(response.read())).convert("RGB")
        if image.width > WIDTH:
            image = image.resize((WIDTH, round(image.height * WIDTH / image.width)), Image.LANCZOS)
        name = f"{post['id']}.webp"
        image.save(ROOT / name, "WEBP", quality=78, method=6)
        snapshot.append(
            {
                "id": post["id"],
                "permalink": post["url"],
                "imageUrl": f"/instagram/{name}",
                "caption": post.get("caption") or "",
                "mediaType": MEDIA_TYPES.get(post.get("type"), "IMAGE"),
                "timestamp": post.get("timestamp"),
            }
        )

    (ROOT / "snapshot.json").write_text(json.dumps({"posts": snapshot}, ensure_ascii=False, indent=2) + "\n")
    print(f"{len(snapshot)} posts naar {ROOT}")


if __name__ == "__main__":
    main(sys.argv[1])
