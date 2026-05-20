# =========================================================
#
# Intelligent Embedded Diagnostic System (IEDS)
# FastAPI Main Application
#
# File: main.py
#
# Description:
# Initializes the FastAPI backend application,
# configures middleware, database initialization,
# MQTT telemetry ingestion, WebSocket routing,
# and REST telemetry endpoints.
#
# =========================================================


# =========================================================
# FASTAPI IMPORTS
# =========================================================

from fastapi import FastAPI

from fastapi.middleware.cors import (
    CORSMiddleware
)


# =========================================================
# DATABASE IMPORTS
# =========================================================

from backend.database.db import (
    engine,
    Base
)

from backend.models.telemetry_db_model import (
    TelemetryRecord
)


# =========================================================
# ROUTE IMPORTS
# =========================================================

from backend.routes.telemetry import (
    router as telemetry_router
)

from backend.routes.websocket import (
    router as websocket_router
)


# =========================================================
# MQTT IMPORTS
# =========================================================

from backend.mqtt.mqtt_client import (
    start_mqtt
)


# =========================================================
# DATABASE INITIALIZATION
# =========================================================
#
# Automatically creates database tables
# if they do not already exist.
#
# =========================================================

Base.metadata.create_all(
    bind=engine
)


# =========================================================
# FASTAPI APPLICATION
# =========================================================

app = FastAPI(

    title=
    "Intelligent Embedded Diagnostic System",

    description=
    "Real-Time AI-Assisted Embedded Telemetry "
    "and EMI Diagnostic Platform",

    version=
    "1.0.0"
)


# =========================================================
# CORS CONFIGURATION
# =========================================================
#
# Allows frontend applications
# (React/Vite dashboard)
# to communicate with the backend.
#
# =========================================================

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# =========================================================
# MQTT INITIALIZATION
# =========================================================
#
# Starts MQTT telemetry subscriber.
#
# Backend listens for incoming telemetry
# published by embedded devices or simulators.
#
# =========================================================

start_mqtt()


# =========================================================
# API ROUTES
# =========================================================

app.include_router(
    telemetry_router
)

app.include_router(
    websocket_router
)


# =========================================================
# ROOT ENDPOINT
# =========================================================
#
# Simple backend health/status endpoint.
#
# =========================================================

@app.get("/")

async def root():

    return {

        "system":
        "Intelligent Embedded Diagnostic System",

        "status":
        "operational",

        "telemetry":
        "active",

        "mqtt":
        "connected"
    }


# =========================================================
# HEALTH CHECK ENDPOINT
# =========================================================
#
# Useful for monitoring,
# deployment validation,
# Docker healthchecks later,
# and observability infrastructure.
#
# =========================================================

@app.get("/health")

async def health_check():

    return {

        "backend":
        "healthy",

        "database":
        "connected",

        "websocket":
        "active",

        "mqtt":
        "running"
    }