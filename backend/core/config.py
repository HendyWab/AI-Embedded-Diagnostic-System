# ==============================================================
#
#  Intelligent Embedded Diagnostic System (IEDS)
#  Backend Configuration
#
#  File: config.py
#
# ==============================================================

# ==============================================================
#                      SERVER CONFIGURATION
# ==============================================================

API_HOST = "0.0.0.0"

API_PORT = 8000

DEBUG_MODE = True

# ==============================================================
#                      MQTT CONFIGURATION
# ==============================================================

MQTT_BROKER = "localhost"

MQTT_PORT = 1883

MQTT_TOPIC_TELEMETRY = "ieds/diagnostics"

MQTT_TOPIC_ALERTS = "ieds/alerts"

# ==============================================================
#                      DATABASE CONFIGURATION
# ==============================================================

DATABASE_URL = "sqlite:///ieds.db"

# ==============================================================
#                      SECURITY CONFIGURATION
# ==============================================================

JWT_SECRET = "ieds_secure_token"

JWT_ALGORITHM = "HS256"
