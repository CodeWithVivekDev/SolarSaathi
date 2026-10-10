# SolarSaathi (सोलर साथी)

> **Know Your Roof. Own Your Energy Future.**  
> An explainable, independent rooftop solar sizing and feasibility platform for Indian households, RWAs, and small businesses.

---

## 1. Product Mission & Objectives

Commercial solar installers frequently mislead property owners with over-sized systems, assuming 100% retail net-metering offsets and exaggerating financial returns. **SolarSaathi** provides objective, transparent, physics-based solar calculations before homeowners engage commercial contractors or submit DISCOM net-metering applications.

- **No Fabricated Data:** Zero fake testimonials, inflated installation statistics, or deceptive affiliate partnerships.
- **European Commission PVGIS 5.2:** Radiation curves derived from high-resolution satellite meteorological models.
- **Realistic Economic Valuation:** Strict mathematical separation of daytime self-consumption savings from lower-tier grid export credits.
- **CEA Baseline Emissions:** Avoided grid carbon displacement calculated using the Central Electricity Authority’s official factor of **0.716 kg CO₂/kWh**.
- **PM Surya Ghar Ready:** Explicit integration with the central residential subsidy tiers (up to ₹78,000 for ≥3 kWp).

---

## 2. Visual Design Reference & Aesthetic

SolarSaathi’s interface is built directly upon the visual standards established in [`docs/design-reference.jpg`](docs/design-reference.jpg):
- **Elevated Canvas Presentation:** Cool-grey canvas background (`#eaedf0`) with a large, elevated warm-white content surface (`#ffffff`, `border-radius: 28px`).
- **Two-Column Hero:** Impactful left-aligned typography (`Outfit` / `Plus Jakarta Sans`) paired with an emerald-accented headline (*“Know Your Roof. Own Your Energy Future.”*).
- **3D Solar Eco-Villa Showcase:** High-resolution 3D isometric diorama of a modern solar-equipped villa with wind turbines on an island plinth.
- **Interactive Glassmorphic Stat Badge:** Subtle floating card with micro-animations and interactive metric toggle.
- **Full Below-the-Fold Suite:** How It Works, Why Assessment Matters, Illustrative Estimate, Frequently Asked Questions, Methodology Disclosures, and Accessible Footer.

---

## 3. Repository Architecture

```
SolarSaathi/
├── docs/
│   ├── design-reference.jpg        # Design mockup specification
│   ├── implementation-plan.md      # Roadmap and technical risk mitigations
│   ├── architecture.md             # System architecture & AWS cloud diagram
│   ├── methodology.md              # Engineering formulas & physical constants
│   └── acceptance-checklist.md    # Verification criteria for all milestones
├── frontend/                       # React 18 + TypeScript + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/             # Reusable UI components (Navbar, Hero, Modals, etc.)
│   │   ├── tokens/                 # Shared design tokens & color constants
│   │   ├── utils/                  # Pure solar calculation engine & unit tests
│   │   ├── App.tsx                 # Main layout & composition
│   │   └── main.tsx
│   ├── public/assets/              # High-definition visual assets
│   ├── package.json
│   └── tailwind.config.js
├── backend/                        # AWS Lambda handlers (Python 3.12) [Phase 3]
├── infrastructure/                 # AWS SAM infrastructure templates [Phase 6]
├── tests/                          # Automated integration tests
├── .env.example                    # Environment schema without sensitive secrets
├── .gitignore
├── LICENSE                         # Open-source MIT License
└── README.md                       # Product documentation
```

---

## 4. Engineering Verification & Pure Calculations

The core mathematical engine is implemented as pure, side-effect-free functions in [`frontend/src/utils/solar-calculations.ts`](frontend/src/utils/solar-calculations.ts) and fully verified with Vitest:

| Calculation Module | Formula / Standard | Test Status |
| :--- | :--- | :--- |
| **Roof Area Sizing** | $P_{\text{roof}} = \text{Area}_{\text{usable}} / 100 \text{ sq ft}$ | Passed (100% coverage) |
| **Demand-Based Sizing** | $P_{\text{demand}} = E_{\text{annual}} / Y_{\text{specific}}$ | Passed (100% coverage) |
| **Balanced Capacity** | $\min(P_{\text{roof}}, P_{\text{demand}})$, 0.5 kW intervals | Passed (100% coverage) |
| **PM Surya Ghar Subsidy** | ₹30k (1 kWp), ₹60k (2 kWp), ₹78k (≥3 kWp) | Passed (100% coverage) |
| **Net-Metering Economics** | $(E_{\text{self}} \times T_{\text{retail}}) + (E_{\text{export}} \times T_{\text{export}})$ | Passed (100% coverage) |
| **CEA Grid Emissions** | $E_{\text{annual}} \times 0.716 \text{ kg CO}_2/\text{kWh}$ | Passed (100% coverage) |

Run automated test suite:
```bash
cd frontend
npm run test
```

---

## 5. Local Development Quickstart

### Prerequisites
- Node.js LTS (v20+ or v22+)
- npm v10+

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Launch Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in any modern browser.

### Step 3: Production Build
```bash
npm run build
```
Creates an optimized production bundle in `frontend/dist/`.

---

## 6. Attribution & Sources

- **Solar Radiation Data:** European Commission Photovoltaic Geographical Information System (PVGIS 5.2).
- **National Grid Emissions:** Central Electricity Authority (CEA) CO₂ Baseline Database for the Indian Power Sector (User Guide Version 19.0).
- **Subsidy Benchmarks:** Ministry of New and Renewable Energy (MNRE) - PM Surya Ghar: Muft Bijli Yojana.
- **Tooling:** React, TypeScript, Vite, Tailwind CSS, Lucide Icons, Vitest.
