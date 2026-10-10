# SolarSaathi Calculation Methodology & Standards

This document specifies the exact engineering formulas, physics approximations, and economic principles used by SolarSaathi. Every number presented to a user is explainable by the formulas below.

---

## 1. System Capacity Sizing Logic

A realistic rooftop solar recommendation must balance physical roof space against the building's electrical load.

### A. Roof-Area Constraint ($P_{\text{roof}}$)
The maximum solar capacity physically installable on a roof is constrained by the usable shadow-free area:
$$P_{\text{roof}} = \frac{A_{\text{usable}}}{A_{\text{per\_kWp}}}$$

Where:
- $A_{\text{usable}}$: Usable shadow-free rooftop area in square feet.
- $A_{\text{per\_kWp}}$: Nominal area required per kWp of high-efficiency monocrystalline solar panels. Default benchmark = **$100 \text{ sq ft/kWp}$** ($\approx 9.29 \text{ m}^2/\text{kWp}$), accounting for inter-row spacing, maintenance access walkways, and edge clearance. Configurable in range $90 - 130 \text{ sq ft/kWp}$.

### B. Demand-Based Sizing ($P_{\text{demand}}$)
The optimal system capacity needed to meet 100% of the household's annual electrical consumption:
$$E_{\text{annual\_kWh}} = \frac{\text{Monthly Electricity Bill (₹)}}{\text{Average Retail Tariff (₹/kWh)}} \times 12$$
$$P_{\text{demand}} = \frac{E_{\text{annual\_kWh}}}{Y_{\text{specific}}}$$

Where:
- $Y_{\text{specific}}$: Specific annual yield in kWh/kWp/year for the given location (derived from PVGIS, typically $1,400 - 1,650 \text{ kWh/kWp/year}$ across India).

### C. Recommended Capacity ($P_{\text{suggested}}$)
$$P_{\text{suggested}} = \min(P_{\text{roof}}, P_{\text{demand}})$$

*Note:* If $P_{\text{roof}} < P_{\text{demand}}$, the system is space-constrained. If $P_{\text{demand}} < P_{\text{roof}}$, the system is sized to demand to avoid excessive low-value grid export. Recommended capacity is rounded to 0.5 kW intervals to match standard inverter ratings.

---

## 2. Solar Generation Calculation (PVGIS Integration)

Solar generation estimates are derived directly from the European Commission PVGIS API:
- **Solar Radiation Database:** PVGIS-SARAH2 / PVGIS-ERA5.
- **PV Technology:** Crystalline Silicon (c-Si).
- **System Losses:** Default **14.0%** (soiling, module temperature coefficients, wiring ohmic losses, inverter conversion efficiency, and dust derating for Indian climatic conditions).
- **Mounting Configuration:** Fixed tilt at local latitude (or user-customized), optimized azimuth ($180^\circ$ South in the Northern Hemisphere).
- **Monthly Generation Series ($E_{m}$):**
  $$E_{m} = P_{\text{suggested}} \times H_{m} \times \eta_{\text{system}}$$
  Where $H_{m}$ is the effective monthly plane-of-array irradiation.

---

## 3. Financial Savings & Net-Metering Economics

Unlike simplistic calculators that value all solar generation at full retail price, SolarSaathi separates **self-consumed energy** from **exported surplus energy**.

### A. Energy Split
- $E_{\text{self}} = E_{\text{annual}} \times r_{\text{self}}$
- $E_{\text{export}} = E_{\text{annual}} \times (1 - r_{\text{self}})$

Where $r_{\text{self}}$ is the self-consumption ratio (default **65%** for residential homes with daytime occupancy, **80%** for commercial daytime businesses, or user-adjustable).

### B. Annual Financial Benefit ($S_{\text{annual}}$)
$$S_{\text{annual}} = (E_{\text{self}} \times T_{\text{retail}}) + (E_{\text{export}} \times T_{\text{export}})$$

Where:
- $T_{\text{retail}}$: State DISCOM average retail tariff (default ₹7.00/kWh for residential tier 2/3 slabs; editable).
- $T_{\text{export}}$: Feed-in / Net-billing export credit rate (default ₹2.75/kWh based on national average APPC - Average Pooled Power Purchase Cost; editable).

### C. Capital Investment & Payback Period
Simple payback is only calculated when the user chooses to input their capex quote or opts into benchmark MNRE pricing:
$$\text{Gross Capex} = P_{\text{suggested}} \times C_{\text{benchmark}}$$
(Benchmark: approx ₹55,000–₹65,000 per kWp for residential systems $\le 3\text{ kWp}$, ₹50,000–₹58,000 for $>3\text{ kWp}$).

$$\text{Net Capex} = \text{Gross Capex} - \text{CFA Subsidy (PM Surya Ghar)}$$
*Subsidies applied only where explicitly opted in by user (₹30,000 for 1 kWp, ₹60,000 for 2 kWp, ₹78,000 for $\ge 3\text{ kWp}$).*

$$\text{Payback Period (Years)} = \frac{\text{Net Capex}}{S_{\text{annual}} - O\&M_{\text{annual}}}$$
Where $O\&M_{\text{annual}}$ is annual maintenance & cleaning allowance (default 1% of capex).

---

## 4. Environmental Impact (Emissions Avoided)

Solar generation displaces thermal generation from the regional grid. The avoided emissions are calculated using the official Central Electricity Authority (CEA) CO₂ Baseline Database for the Indian Power Sector (User Guide Version 19.0 / latest):

$$\text{Avoided }\text{CO}_2 \text{ (kg/year)} = E_{\text{annual}} \times EF_{\text{grid}}$$

Where:
- $EF_{\text{grid}}$ = **$0.716 \text{ kg CO}_2/\text{kWh}$** (CEA Weighted Average Emission Rate for the Indian National Grid).
- Avoided emissions are explicitly described as **"Potential Avoided Grid Emissions"**, never as measured or certified carbon credits.
- Tree equivalent equivalent metric: 1 mature tree absorbs approximately $21.77 \text{ kg CO}_2/\text{year}$ ($0.0218 \text{ metric tonnes}$).
