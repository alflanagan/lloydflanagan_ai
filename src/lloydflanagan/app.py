import json
import re
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.middleware.trustedhost import TrustedHostMiddleware
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
app.mount("/content", StaticFiles(directory="content"), name="content")
templates = Jinja2Templates(directory="templates")


@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/about")
async def about(request: Request):
    return templates.TemplateResponse("about.html", {"request": request})


@app.get("/blog")
async def blog(request: Request):
    blog_posts = list(Path("content/blog").walk())[0][2]
    return templates.TemplateResponse(
        "blog.html", {"request": request, "blogfiles": blog_posts}
    )


@app.get("/blogs")
async def blogs(request: Request):
    """Return a list of blog entries as a JSON list, where each entry is of the
    form "/content/blog/YYMMDD[-YYMMDD]-Blog_Post_Title.md"."""
    blog_posts = list(Path("content/blog").walk())[0][2]
    return json.dumps(blog_posts)


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
