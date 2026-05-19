# INTELLIGENT-EMBEDDED-DIAGNOSTIC-SYSTEM

<p align="center">
  <img src="https://img.shields.io/badge/Embedded-AI%20Diagnostics-0A192F?style=for-the-badge" />
  <img src="https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi" />
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Telemetry-RealTime-FF6B6B?style=for-the-badge" />
</p>

---

## AI-Assisted Electronic Diagnostics, Intelligent Signal Analysis and Wireless Telemetry Platform

The **Intelligent Embedded Diagnostic System (IEDS)** is an AI-assisted embedded observability and telemetry platform designed for real-time electronic diagnostics, anomaly detection, signal monitoring, EMI analysis, and intelligent telemetry visualization.

The project combines:

- Embedded telemetry acquisition
- Real-time backend processing
- AI-assisted anomaly detection
- Signal observability
- Wireless telemetry workflows
- Interactive engineering dashboards

The system is designed as a scalable architecture for:
- embedded diagnostics
- intelligent instrumentation
- electronic fault analysis
- EMI monitoring
- predictive observability workflows

---

# System Architecture

<p align="center">
  <img src="./assets/architecure/ieds_architecture_v2.png" width="100%" />
</p>

---

# Features

- Real-time telemetry dashboard
- EMI anomaly detection alerts
- AI-assisted anomaly scoring
- Live telemetry visualization
- FastAPI backend architecture
- React frontend interface
- Embedded telemetry simulator
- Dynamic telemetry charts
- Diagnostic observability workflows
- Modular embedded diagnostic architecture

---

# Technology Stack

## Backend
- FastAPI
- Python
- Uvicorn
- REST API Architecture

## Frontend
- React
- Vite
- Recharts
- Axios

## Embedded & Telemetry
- ESP32 / STM32 / PIC
- UART / SPI / I2C
- MQTT-ready architecture
- Telemetry simulation engine

## AI & Diagnostics
- Anomaly Scoring
- Signal Analysis
- EMI Detection
- Intelligent Observability

---

# Project Structure

```text
AI-Embedded-Diagnostic-System/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── simulator/
│   ├── services/
│   └── main.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── assets/
├── README.md
└── requirements.txt
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/HendyWab/AI-Embedded-Diagnostic-System.git
cd AI-Embedded-Diagnostic-System
```

---

# Backend Setup

Create and activate a virtual environment.

## Windows

```bash
python -m venv venv
venv\Scripts\activate
```

## Linux/macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

---

# Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

---

# Running the Backend

From the project root:

```bash
uvicorn backend.main:app --reload
```

Backend API:

```text
http://localhost:8000
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

---

# Running the Frontend

From the frontend directory:

```bash
npm run dev
```

Frontend Dashboard:

```text
http://localhost:5173
```

---

# Running the Telemetry Simulator

The telemetry simulator generates synthetic embedded telemetry and diagnostic events in real time.

Run the simulator:

```bash
python backend/simulator/telemetry_simulator.py
```

The simulator continuously generates:
- anomaly scores
- EMI detection states
- signal quality metrics
- telemetry packets
- diagnostic events

---

# Current Development Status

## Implemented

- FastAPI backend
- React telemetry dashboard
- Real-time telemetry ingestion
- Embedded telemetry simulator
- Live anomaly visualization
- EMI alert system
- Dynamic telemetry charts
- Real-time dashboard updates

## In Progress

- WebSocket telemetry streaming
- Persistent telemetry storage
- MQTT integration
- ESP32 hardware integration
- AI anomaly engine improvements
- Multi-device telemetry support

---

# Engineering Objectives

The platform aims to provide:

- Real-time electronic observability
- Intelligent anomaly diagnostics
- Embedded telemetry acquisition
- Wireless diagnostic communication
- Predictive electronic analysis
- AI-assisted engineering workflows

---

# Future Roadmap

- WebSocket telemetry infrastructure
- Persistent telemetry database
- MQTT broker integration
- ESP32 firmware deployment
- Advanced waveform visualization
- TinyML anomaly inference
- Multi-device observability
- Cloud telemetry synchronization
- Predictive maintenance analytics

---

# Screenshots

## Real-Time Telemetry Dashboard

<p align="center">
  <img src="./assets/dashboard_preview.png" width="100%" />
</p>

---

# GitHub Project Management

This repository uses:
- GitHub Projects
- Engineering milestones
- Issue tracking
- Observability roadmap management

Project workflow includes:
- telemetry infrastructure
- embedded integration
- AI diagnostic systems
- frontend/backend evolution
- observability engineering

---

# Repository Topics

```text
embedded-systems
telemetry
fastapi
react
ai-diagnostics
observability
iot
electronics
signal-processing
mqtt
esp32
dashboard
anomaly-detection
wireless-telemetry
real-time-systems
```

---

# Author

**Hendy Wabede**

Embedded Systems • AI Diagnostics • Telemetry Engineering • Intelligent Electronic Systems

---

# License

This project is intended for:
- research
- engineering experimentation
- educational purposes
- embedded observability development