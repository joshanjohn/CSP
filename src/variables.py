import os 
from dotenv import load_dotenv

load_dotenv()

mongo_user = os.getenv("MONGODB_USER", "")
mongo_pass = os.getenv("MONGO_DB_PASSWORD", "")
mongo_url = os.getenv("MONGO_DB_URI", "")

print(mongo_user)
print(mongo_pass)
print(mongo_url)