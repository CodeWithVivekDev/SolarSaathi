# SolarSaathi Implementation Plan

## 1. Product Mission & Objectives

**SolarSaathi** is an explainable, data-backed rooftop solar potential assessment platform designed specifically for Indian homeowners, resident welfare associations (RWAs), and small commercial enterprises. 

The primary objective is to empower property owners to evaluate their solar feasibility with genuine transparency before engaging commercial installers or submitting applications to local electricity distribution companies (DISCOMs).

### Core Ethical & Analytical Principles
- **No Fabricated Claims:** Zero fake customer reviews, fabricated installation tallies, or misleading vendor partnerships.
- **Explainable Calculations:** Every figure—from capacity selection to avoided grid emissions—is accompanied by explicit formulas, data sources, and user-adjustable assumptions.
- **Separation of Self-Consumption & Export Value:** Realistic valuation of solar units based on state net-metering / net-billing regulations rather than assuming 100% retail rate offset for exports.
- **Authoritative Data Sources:** European Commission Photovoltaic Geographical Information System (PVGIS) solar irradiance data, combined with Central Electricity Authority (CEA) CO₂ baseline factors and MNRE (Ministry of New and Renewable Energy) benchmark metrics.

---

## 2. Technical Risk Analysis & Mitigation Strategies

| Technical Risk | Impact | Mitigation Strategy |
| :--- | :--- | :--- |
| **PVGIS API CORS Restriction** | High | PVGIS does not permit browser AJAX requests. Implemented backend Python AWS Lambda proxy (`POST /api/solar/estimate`) with configurable timeout, retry logic, and fallback demo adapter. |
| **DISCOM Tariff Diversity** | Medium | India has over 50 state and private DISCOMs with distinct slab structures. Provided smart state-level baseline default tariffs with clear overrides allowing users to input exact bill rates and exported unit rates. |
| **Over-sizing vs. Under-sizing** | High | Solar system sizing logic strictly caps capacity by both physical usable roof area (configurable ~100–110 sq ft/kWp) and historical annual demand, preventing unrealistic sizing recommendations. |
| **Unsubstantiated Payback Estimates** | Medium | Simple financial payback is only rendered when system installation costs are explicitly provided or user-selected from benchmark MNRE price brackets. |
| **Network & Service Downtime** | Medium | Robust caching (DynamoDB/in-memory) for queried coordinates, bounded exponential backoff, and transparent client-side error states with offline fallback mode. |

---

## 3. Smallest Complete MVP Definition

The Minimal Viable Product consists of:
1. **Interactive Responsive Landing Page (Phase 1):**
   - Premium aesthetic based on `docs/design-reference.jpg`: warm-white elevated content container, cool-grey outer canvas, emerald brand accents.
   - High-fidelity 3D solar eco-villa hero illustration with floating interactive metric indicator.
   - Hero headline: *"Know Your Roof. Own Your Energy Future."*
   - Direct CTA: *"Check My Roof"* navigating seamlessly to the estimator.
   - Comprehensive below-the-fold content: How It Works, Why Assessment Matters, Illustrative Sample Estimate, Interactive Solar FAQs, Methodology Disclosures, and Trustworthy Footer.
2. **Multi-Step Solar Estimator (Phase 2):**
   - 4-step guided form with real-time Zod validation: Location (Indian cities/states), Monthly Energy Usage / Bill, Usable Roof Area, and Orientation / Shading assumptions.
3. **Backend Solar Estimator API (Phase 3 & 4):**
   - AWS Lambda handlers (`/api/health`, `/api/config`, `/api/solar/estimate`) interfacing with PVGIS API.
   - Pure, deterministic calculation modules with 100% test coverage for sizing, generation, financial returns, and CEA emissions.
4. **Interactive Results Report (Phase 4):**
   - Monthly generation breakdown visualizer (Recharts), financial savings breakdown, environmental impact, and printable/downloadable summary.

---

## 4. Phase-by-Phase Roadmap

```
[Phase 1: Design System & Landing Page] (CURRENT)
  ├── Design tokens, typography, responsive framework
  ├── Hero section with 3D diorama & floating metric card
  ├── Below-the-fold education, sample estimate & FAQ
  └── Rigorous desktop & mobile accessibility verification

[Phase 2: Estimator Form & Client Validation]
  ├── Multi-step guided wizard (React Hook Form + Zod)
  ├── Location presets (Major Indian metros + tier-2 solar hubs)
  └── Roof area & orientation interactive controls

[Phase 3: Backend API & Solar Data Client]
  ├── AWS SAM template & Python Lambda handlers
  ├── Resilient PVGIS client with timeout & bounded retry
  └── Health, config, and estimation endpoints

[Phase 4: Calculation Engine & Results Visualization]
  ├── Pure Python calculation engine & unit tests
  ├── Monthly generation bar charts & seasonal curves
  ├── Self-consumption vs. grid export financial modeling
  └── Print / PDF report export

[Phase 5: Error Handling & Automated Test Suite]
  ├── Vitest/Jest frontend tests & Pytest backend suites
  ├── Edge cases (zero usage, extreme roof sizes, zero export tariff)
  └── Accessible WCAG 2.1 AA keyboard & screen-reader audits

[Phase 6: AWS Deployment Architecture]
  ├── AWS SAM deployment pipeline
  ├── Amplify Hosting setup guide & environment config
  └── Least-privilege IAM policies & CloudWatch monitoring

[Phase 7: End-to-End QA & Documentation]
  ├── Cross-browser validation, mobile touch responsiveness
  ├── Deployment guide, API documentation, and architecture diagrams
```
