# ==============================================================
#
#  Intelligent Embedded Diagnostic System (IEDS)
#  FastAPI Backend Entry Point
#
# ==============================================================

from fastapi import FastAPI

from fastapi.middleware.cors import (
    CORSMiddleware
)

from backend.routes.telemetry import (
    router as telemetry_router
)

from backend.routes.websocket import (
    router as websocket_router
)

app = FastAPI(
    title=
    "AI-Embedded-Diagnostic-System"
)

# =========================================
# CORS
# =========================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# =========================================
# ROUTES
# =========================================

app.include_router(
    telemetry_router
)

app.include_router(
    websocket_router
)

# =========================================
# ROOT
# =========================================

@app.get("/")
async def root():

    return {

        "message":
        "AI Embedded Diagnostic System Backend Running",

        "status":
        "operational"

    }