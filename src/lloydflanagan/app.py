import re
from pathlib import Path

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=[
        "alloydflanagan.com",
        "www.alloydflanagan.com",
        "lloydflanagan.fly.dev",
        "localhost",
        "127.0.0.1",
    ],
)

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


# Serve content files but refuse access to draft markdowns.
CONTENT_ROOT = Path("content").resolve()


@app.get("/content/{full_path:path}")
async def content_file(full_path: str):
    """Serve files from the content/ directory but block draft markdowns.

    This replaces mounting content/ with StaticFiles to avoid accidentally
    exposing draft posts named "*-draft.md" via /content/ while still
    serving published content.
    """
    # Resolve and ensure the requested path stays inside the content root
    file_path = (CONTENT_ROOT / full_path).resolve()
    if not file_path.is_relative_to(CONTENT_ROOT):
        raise HTTPException(status_code=404)

    # Explicitly block draft-marked markdown files in the blog directory.
    if file_path.suffix == ".md" and file_path.name.endswith("-draft.md"):
        raise HTTPException(status_code=404)

    if not file_path.exists() or not file_path.is_file():
        raise HTTPException(status_code=404)

    return FileResponse(file_path)


@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/about")
async def about(request: Request):
    return templates.TemplateResponse("about.html", {"request": request})


def _published_posts() -> list[str]:
    """Return blog post filenames, excluding drafts (filename ends in -draft.md)."""
    all_posts = list(Path("content/blog").walk())[0][2]
    return [p for p in all_posts if not p.endswith("-draft.md")]


@app.get("/blog")
async def blog(request: Request):
    blog_posts = _published_posts()
    return templates.TemplateResponse(
        "blog.html", {"request": request, "blogfiles": blog_posts}
    )


@app.get("/blogs")
async def blogs(request: Request):
    """Return a list of blog entry filenames (top-level names in content/blog).

    Each entry is a filename like "YYMMDD[-YYMMDD]-Blog_Post_Title.md".
    """
    blog_posts = _published_posts()
    # Return a raw list; FastAPI will serialize this to application/json.
    return blog_posts


@app.get("/education")
async def education(request: Request):
    return templates.TemplateResponse("education.html", {"request": request})


@app.get("/design")
async def design(request: Request):
    return templates.TemplateResponse("design.html", {"request": request})


@app.get("/prompts")
async def prompts(request: Request):
    prompts_file = Path("PROMPTS.md")
    prompt_list = []
    if prompts_file.exists():
        for line in prompts_file.read_text().splitlines():
            m = re.match(r"^\d+\.\s+(.+)", line)
            if m:
                prompt_list.append(m.group(1))
            elif line.startswith("   ") and prompt_list:
                prompt_list[-1] += " " + line.strip()
    return templates.TemplateResponse(
        "prompts.html", {"request": request, "prompts": prompt_list}
    )
