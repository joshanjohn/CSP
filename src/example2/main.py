from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pathlib import Path


app  = FastAPI()

BASE_DIR = Path(__file__).resolve().parent

app.mount('/static', StaticFiles(directory=BASE_DIR/'static'), name='static')
templates = Jinja2Templates(directory=BASE_DIR/"templates")

@app.get("/", response_class=HTMLResponse)
async def root(request: Request): 
    return templates.TemplateResponse("main.html", {'request': request, 'name':'Joshan', 'number': '34343434'})
