from fastapi import FastAPI, UploadFile
import uvicorn
from llm import get_sub_species_info_from_LLM
from getinfo2 import func1

app = FastAPI()

# routes
@app.get("/hello")
def hello(name: str = ""):
    return {"message": f"Hello, this is our civic tech project"}

@app.post("/getInfo/")
async def getInfo(stateProvince: list[str] = [], 
                  county: list[str] = [],
                  locality: list[str] = [],
                  municipality: list[str] = []):
    return func1(stateProvince, county, locality, municipality)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)