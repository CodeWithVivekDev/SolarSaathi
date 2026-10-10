# SolarSaathi Acceptance Checklist

This checklist defines the verification criteria for each milestone. An item may only be marked complete once manually verified or covered by automated tests.

---

## 1. Design & Aesthetic Standards (Ref: `docs/design-reference.jpg`)
- [ ] **Canvas Composition:** Cool grey outer framing (`#eaedf0` / `#e2e8f0`) with elevated, warm-white rounded content container.
- [ ] **Hero Layout:** Two-column grid with bold headline, concise subtext, primary CTA, and illustrative 3D solar eco-villa diorama on the right.
- [ ] **Floating Stat Badge:** Subtle glassmorphic card over visual with live metrics, micro-animation, and interactive state.
- [ ] **Typography & Tokens:** Clean modern typography (`Plus Jakarta Sans` / `Outfit`), consistent emerald green brand accents, subtle sage surfaces, and restrained gold touches.
- [ ] **Truth in Advertising:**
  - [ ] No fake 10,000+ installation counts.
  - [ ] No fabricated 5-star customer reviews or testimonials.
  - [ ] No unauthorized partner logos (Tesla, LG, etc.).
  - [ ] All illustrative metrics explicitly marked as *"Illustrative Example"*.

---

## 2. Functional & Route Completeness
- [ ] **Landing Page (Phase 1):**
  - [ ] Headline: *"Know Your Roof. Own Your Energy Future."*
  - [ ] Primary CTA: *"Check My Roof"* (navigates to estimator).
  - [ ] Complete below-the-fold content:
    - [ ] How It Works (4 explainable steps).
    - [ ] Why Solar Assessment Matters (common pitfalls, contractor bias, DISCOM rules).
    - [ ] Sample Estimate (clearly marked illustrative interactive card).
    - [ ] Interactive FAQs (net metering, roof ownership, subsidies, maintenance).
    - [ ] Methodology Disclosure & Link to official sources (MNRE, PVGIS, CEA).
    - [ ] Clean accessible footer with legal disclaimers.
- [ ] **Multi-Step Guided Estimator (Phase 2):**
  - [ ] Step 1: Location selection (Indian states & major solar cities with lat/long).
  - [ ] Step 2: Consumption entry (Monthly bill or units in kWh).
  - [ ] Step 3: Usable roof area entry (sq ft or sq meters).
  - [ ] Step 4: Technical assumptions (Tilt, azimuth, shading, tariff override).
  - [ ] Zero dead buttons or broken transitions.
- [ ] **Results Report & Visualization (Phase 4):**
  - [ ] Suggested capacity (kWp) respecting both roof size and demand.
  - [ ] Monthly generation curve (Recharts visualization).
  - [ ] Financial breakdown: Self-consumption savings vs. export credits.
  - [ ] Avoided grid emissions based on CEA factor.
  - [ ] Print / PDF report download.

---

## 3. Accessibility & Responsiveness (WCAG 2.1 AA)
- [ ] Contrast ratios meet minimum 4.5:1 for normal text and 3:1 for large headings.
- [ ] Full keyboard navigability (visible `:focus-visible` rings on all interactive elements).
- [ ] `prefers-reduced-motion` media queries respected for all CSS animations.
- [ ] Touch targets at least 44x44px on mobile viewports.
- [ ] Tested and verified across desktop (1440px), tablet (768px), and mobile (375px).

---

## 4. Engineering Quality & Numerical Correctness
- [ ] Pure, deterministic calculation modules with unit tests:
  - [ ] Roof-area sizing constraint logic.
  - [ ] Annual demand calculation.
  - [ ] Self-consumption vs. export tariff split.
  - [ ] CEA emissions factor calculation ($0.716\text{ kg CO}_2/\text{kWh}$).
- [ ] PVGIS API client with bounded timeout, retry, and offline fallback.
- [ ] No hardcoded cloud secrets or privileged credentials in client code.
- [ ] Clear error boundaries and empty/loading/error states.

---

## 5. Cloud & Deployment
- [ ] AWS SAM template (`template.yaml`) for API Gateway, Lambda, and DynamoDB.
- [ ] AWS Amplify hosting configuration.
- [ ] `.env.example` documenting all configuration variables.
- [ ] Complete deployment and cleanup instructions in README.
