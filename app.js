// Clean, Modern Interactive Logic for SolarSaathi Hero Section

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const brandToggleBtn = document.getElementById('brand-toggle-btn');
  const brandNameEl = document.getElementById('brand-name');
  const brandLabelText = document.getElementById('brand-label-text');
  
  const frameToggleBtn = document.getElementById('frame-toggle-btn');
  const heroFrame = document.getElementById('hero-frame');
  const canvasWrapper = document.querySelector('.canvas-wrapper');

  const statCard = document.getElementById('interactive-stat-card');
  const statLabel = document.getElementById('stat-label');
  const statValue = document.getElementById('stat-value');
  const statSub = document.getElementById('stat-sub');
  const statIconContainer = document.getElementById('stat-icon-container');

  // Modals
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const estimatorModal = document.getElementById('estimator-modal');
  const modalClose = document.getElementById('modal-close');

  const watchDemoBtn = document.getElementById('watch-demo-btn');
  const videoModal = document.getElementById('video-demo-modal');
  const videoModalClose = document.getElementById('video-modal-close');

  // Calculator inputs
  const billSlider = document.getElementById('bill-slider');
  const roofSlider = document.getElementById('roof-slider');
  const billDisplay = document.getElementById('bill-display');
  const roofDisplay = document.getElementById('roof-display');
  const resCapacity = document.getElementById('res-capacity');
  const resSavings = document.getElementById('res-savings');
  const confirmBtn = document.getElementById('confirm-consultation-btn');

  // 1. Brand Toggle between "SunEco" (Mockup) and "SolarSaathi" (Workspace project)
  let currentBrand = 'SunEco';
  if (brandToggleBtn && brandNameEl) {
    brandToggleBtn.addEventListener('click', () => {
      if (currentBrand === 'SunEco') {
        currentBrand = 'SolarSaathi';
        brandNameEl.textContent = 'SolarSaathi';
        brandLabelText.textContent = 'Brand: SolarSaathi';
      } else {
        currentBrand = 'SunEco';
        brandNameEl.textContent = 'SunEco';
        brandLabelText.textContent = 'Brand: SunEco';
      }
    });
  }

  // 2. Framed View vs Full-width View Toggle
  let isFullView = false;
  if (frameToggleBtn && heroFrame) {
    frameToggleBtn.addEventListener('click', () => {
      isFullView = !isFullView;
      if (isFullView) {
        canvasWrapper.style.maxWidth = '100%';
        heroFrame.style.borderRadius = '0px';
        heroFrame.style.boxShadow = 'none';
        frameToggleBtn.querySelector('span').textContent = 'Framed View';
      } else {
        canvasWrapper.style.maxWidth = '1220px';
        heroFrame.style.borderRadius = 'var(--radius-frame)';
        heroFrame.style.boxShadow = 'var(--shadow-mockup)';
        frameToggleBtn.querySelector('span').textContent = 'Fit View';
      }
    });
  }

  // 3. Interactive Floating Metric Cycle
  const metrics = [
    {
      label: 'Energy Generated',
      value: '1.4 MW',
      sub: '+18% this month',
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>`
    },
    {
      label: 'Annual Cost Saved',
      value: '₹64,200',
      sub: '-82% grid bills',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 10h8M8 14h6"/></svg>`
    },
    {
      label: 'CO₂ Footprint Offset',
      value: '9.8 Tons',
      sub: '≈ 154 trees planted',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a9 9 0 0 1 9 9c0 5-4 9-9 9s-9-4-9-9a9 9 0 0 1 9-9z"/><path d="M12 12v6"/><path d="M12 12c-2-2-4-2-6 0"/></svg>`
    }
  ];
  let metricIndex = 0;

  if (statCard) {
    statCard.addEventListener('click', () => {
      metricIndex = (metricIndex + 1) % metrics.length;
      const current = metrics[metricIndex];
      
      // Gentle fade transition
      statCard.style.transform = 'scale(0.96)';
      setTimeout(() => {
        statLabel.textContent = current.label;
        statValue.textContent = current.value;
        statSub.textContent = current.sub;
        statIconContainer.innerHTML = current.icon;
        statCard.style.transform = '';
      }, 150);
    });
  }

  // 4. Modals Handler
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      estimatorModal.classList.add('active');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      estimatorModal.classList.remove('active');
    });
  }

  if (watchDemoBtn && videoModal) {
    watchDemoBtn.addEventListener('click', () => {
      videoModal.classList.add('active');
    });
  }

  if (videoModalClose) {
    videoModalClose.addEventListener('click', () => {
      videoModal.classList.remove('active');
    });
  }

  // Backdrop click & Escape key close
  [estimatorModal, videoModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      estimatorModal.classList.remove('active');
      videoModal.classList.remove('active');
    }
  });

  // 5. Rooftop Solar Calculator Math
  function updateCalculator() {
    if (!billSlider || !roofSlider) return;

    const bill = parseInt(billSlider.value, 10);
    const roof = parseInt(roofSlider.value, 10);

    billDisplay.textContent = `₹${bill.toLocaleString('en-IN')}/mo`;
    roofDisplay.textContent = `${roof.toLocaleString('en-IN')} sq ft`;

    // 1 kW requires ~100 sq ft and offsets approx ₹1,200/month
    const maxKwByRoof = roof / 100;
    const neededKwByBill = bill / 1200;
    const optimalKw = Math.min(maxKwByRoof, neededKwByBill);
    const capacityRounded = Math.max(1, Math.round(optimalKw * 10) / 10);

    const annualSavings = Math.round(capacityRounded * 1200 * 12 * 0.9);

    resCapacity.textContent = `${capacityRounded} kW`;
    resSavings.textContent = `₹${annualSavings.toLocaleString('en-IN')}`;
  }

  if (billSlider && roofSlider) {
    billSlider.addEventListener('input', updateCalculator);
    roofSlider.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      confirmBtn.textContent = '✓ Survey Request Received!';
      confirmBtn.style.backgroundColor = 'var(--brand-green)';
      setTimeout(() => {
        estimatorModal.classList.remove('active');
        confirmBtn.textContent = 'Get Customized Free Quote ↗';
        confirmBtn.style.backgroundColor = '';
      }, 1400);
    });
  }

  const demoActionBtn = document.getElementById('demo-action-btn');
  if (demoActionBtn) {
    demoActionBtn.addEventListener('click', () => {
      videoModal.classList.remove('active');
      estimatorModal.classList.add('active');
    });
  }
});
