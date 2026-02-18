from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/about")
async def about(request: Request):
    return templates.TemplateResponse("about.html", {"request": request})


@app.get("/blog")
async def blog(request: Request):
    return templates.TemplateResponse("blog.html", {"request": request})


@app.get("/education")
async def education(request: Request):
    return templates.TemplateResponse("education.html", {"request": request})


@app.get("/prompts")
async def prompts(request: Request):
    prompts_file = Path("PROMPTS.md")
    prompt_list = []
    if prompts_file.exists():
        for line in prompts_file.read_text().splitlines():
            if line.startswith("- "):
                prompt_list.append(line[2:])
            elif line.startswith("  ") and prompt_list:
                prompt_list[-1] += " " + line.strip()
    return templates.TemplateResponse(
        "prompts.html", {"request": request, "prompts": prompt_list}
    )
