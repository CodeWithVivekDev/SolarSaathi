# SolarSaathi Backend (AWS Lambda & Python Engine)

This directory houses the serverless Python 3.12 backend planned for **Phase 3** of SolarSaathi.

## Planned Endpoints
- `GET /api/health`: Health diagnostics and PVGIS connectivity check.
- `GET /api/config`: State-level default tariffs, solar loss factors, and CEA emission constants.
- `POST /api/solar/estimate`: Validates user inputs, calls PVGIS API with bounded retry and timeout, executes the calculation engine, and returns explainable estimation payloads.

## Architecture
- Python 3.12 runtime with type hints and Pydantic validation.
- Amazon API Gateway with CORS and rate-limiting.
- DynamoDB for caching PVGIS radiation responses (30-day TTL).
- CloudWatch for structured telemetry.
