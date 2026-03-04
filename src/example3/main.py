from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from google.oauth2.id_token import verify_firebase_token
from google.auth.transport import requests
from pathlib import Path

app = FastAPI()

BASE_DIR = Path(__file__).resolve().parent

firebase_request_adapter = requests.Request()

# Static + Templates
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")
templates = Jinja2Templates(directory=BASE_DIR / "templates")


@app.get("/", response_class=HTMLResponse)
async def root(request: Request):

    id_token = request.cookies.get("token")
    error_message = None
    user_token = None

    if id_token:
        try:
            user_token = verify_firebase_token(
                id_token,
                firebase_request_adapter
            )
        except ValueError as err:
            error_message = str(err)

    return templates.TemplateResponse(
        "main.html",
        {
            "request": request,
            "user_token": user_token,
            "error_message": error_message
        }
    )