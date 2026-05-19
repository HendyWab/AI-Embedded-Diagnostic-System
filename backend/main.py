# ==============================================================
#
#  Intelligent Embedded Diagnostic System (IEDS)
#  FastAPI Backend Entry Point
#
# ==============================================================

from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from backend.routes.telemetry import \
    router as telemetry_router

from backend.routes.device import \
    router as device_router

# ==============================================================
#                      APPLICATION INSTANCE
# ==============================================================

app = FastAPI(
    title="IEDS Backend Platform",
    description="AI-assisted embedded diagnostic backend",
    version="0.1.0"
)

# ==============================================================
#                      CORS CONFIGURATION
# ==============================================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# ==============================================================
#                      ROUTE REGISTRATION
# ==============================================================

app.include_router(
    telemetry_router,
    prefix="/telemetry",
    tags=["Telemetry"]
)

app.include_router(
    device_router,
    prefix="/device",
    tags=["Device"]
)

# ==============================================================
#                      ROOT ENDPOINT
# ==============================================================

@app.get("/")
async def root():

    return {
        "platform": "IEDS Backend",
        "status": "running",
        "version": "0.1.0"
    }