from fastapi import FastAPI

from fastapi.middleware.cors import (
    CORSMiddleware
)

# =========================================
# DATABASE
# =========================================

from backend.database.db import (
    engine,
    Base
)

from backend.models.telemetry_db_model import (
    TelemetryRecord
)

# =========================================
# ROUTES
# =========================================

from backend.routes.telemetry import (
    router as telemetry_router
)

from backend.routes.websocket import (
    router as websocket_router
)

# =========================================
# CREATE DATABASE TABLES
# =========================================

Base.metadata.create_all(
    bind=engine
)

# =========================================
# FASTAPI APP
# =========================================

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
# ROOT ENDPOINT
# =========================================

@app.get("/")
async def root():

    return {

        "message":
        "AI Embedded Diagnostic System Backend Running",

        "status":
        "operational"

    }