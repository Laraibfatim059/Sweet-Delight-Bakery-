/* ===================================================================
   SWEET DELIGHT BAKERY - THREE.JS 3D CAKE SHOWCASE
   A luxurious procedural 3D multi-tier bakery dessert with 
   interactive lighting, gold leaf particles, mouse rotation & flavor styles.
   =================================================================== */

(function () {
  'use strict';

  let scene, camera, renderer, cakeGroup, particles;
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let targetRotationY = 0;
  let targetRotationX = 0.2;
  let currentRotationY = 0;
  let currentRotationX = 0.2;
  let autoRotateSpeed = 0.004;
  let mouseParallax = { x: 0, y: 0 };
  let animationFrameId = null;
  let isVisible = true;

  // Material references for style switching
  let tierMaterials = [];
  let creamMaterials = [];
  let berryMaterials = [];
  let goldMaterials = [];

  let container = null;
  let canvas = null;

  function initThree() {
    container = document.getElementById('hero-3d-stage');
    canvas = document.getElementById('hero-3d-canvas');

    if (!container || !canvas) return;

    if (typeof THREE === 'undefined') {
      setTimeout(initThree, 100);
      return;
    }
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // 1. Scene
    scene = new THREE.Scene();

    // 2. Camera
    camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 3.8, 8.5);
    camera.lookAt(0, 0.8, 0);

    // 3. Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 4. Lights
    setupLights();

    // 5. Cake Hierarchy
    cakeGroup = new THREE.Group();
    scene.add(cakeGroup);

    buildLuxuryCake();
    buildGoldParticles();

    // 6. Event Listeners
    setupEvents();

    // 7. Render Loop
    animate();
  }

  function setupLights() {
    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xfff3e6, 0.9);
    scene.add(ambientLight);

    // Warm Golden Key Light
    const keyLight = new THREE.DirectionalLight(0xffdfa9, 2.4);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Warm Amber Fill Light
    const fillLight = new THREE.DirectionalLight(0xd6a45b, 1.2);
    fillLight.position.set(-5, 4, 3);
    scene.add(fillLight);

    // Back / Rim Light for golden glow edge
    const rimLight = new THREE.DirectionalLight(0xe4b56f, 1.8);
    rimLight.position.set(0, 5, -6);
    scene.add(rimLight);

    // Point Light directly above cake for ganache specular glint
    const pointLight = new THREE.PointLight(0xffeedd, 1.5, 12);
    pointLight.position.set(0, 4.5, 1.5);
    scene.add(pointLight);
  }

  function buildLuxuryCake() {
    // Shared Gold Material
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xD6A45B,
      metalness: 0.88,
      roughness: 0.22,
      envMapIntensity: 1.5
    });
    goldMaterials.push(goldMat);

    // Chocolate Ganache Tier Material
    const chocTierMat = new THREE.MeshStandardMaterial({
      color: 0x24150F,
      roughness: 0.38,
      metalness: 0.12
    });
    tierMaterials.push(chocTierMat);

    // Cream / Frosting Rosette Material
    const creamMat = new THREE.MeshStandardMaterial({
      color: 0xF5EBDD,
      roughness: 0.45,
      metalness: 0.05
    });
    creamMaterials.push(creamMat);

    // Strawberry Gloss Material
    const berryMat = new THREE.MeshStandardMaterial({
      color: 0xb51e36,
      roughness: 0.2,
      metalness: 0.1
    });
    berryMaterials.push(berryMat);

    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x2d5a27,
      roughness: 0.6
    });

    // --- A. LUXURY PEDESTAL / STAND ---
    const standGroup = new THREE.Group();

    // Base foot
    const footGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.15, 48);
    const footMesh = new THREE.Mesh(footGeo, goldMat);
    footMesh.position.y = -1.35;
    footMesh.receiveShadow = true;
    standGroup.add(footMesh);

    // Stem
    const stemGeo = new THREE.CylinderGeometry(0.35, 0.5, 0.7, 32);
    const stemMesh = new THREE.Mesh(stemGeo, goldMat);
    stemMesh.position.y = -0.95;
    stemMesh.castShadow = true;
    standGroup.add(stemMesh);

    // Plate
    const plateGeo = new THREE.CylinderGeometry(2.35, 2.2, 0.18, 48);
    const plateMesh = new THREE.Mesh(plateGeo, goldMat);
    plateMesh.position.y = -0.55;
    plateMesh.receiveShadow = true;
    standGroup.add(plateMesh);

    // Gold beaded rim around the plate
    const rimCount = 36;
    const rimRadius = 2.3;
    const beadGeo = new THREE.SphereGeometry(0.06, 12, 12);
    for (let i = 0; i < rimCount; i++) {
      const angle = (i / rimCount) * Math.PI * 2;
      const bead = new THREE.Mesh(beadGeo, goldMat);
      bead.position.set(Math.cos(angle) * rimRadius, -0.48, Math.sin(angle) * rimRadius);
      standGroup.add(bead);
    }

    cakeGroup.add(standGroup);

    // --- B. TIER 1 (BOTTOM - 1.9 radius, 0.9 height) ---
    const tier1Y = -0.05;
    const tier1Geo = new THREE.CylinderGeometry(1.9, 1.9, 0.9, 48);
    const tier1Mesh = new THREE.Mesh(tier1Geo, chocTierMat);
    tier1Mesh.position.y = tier1Y;
    tier1Mesh.castShadow = true;
    tier1Mesh.receiveShadow = true;
    cakeGroup.add(tier1Mesh);

    // Gold ribbon band around bottom of tier 1
    const band1Geo = new THREE.TorusGeometry(1.92, 0.045, 16, 64);
    const band1Mesh = new THREE.Mesh(band1Geo, goldMat);
    band1Mesh.rotation.x = Math.PI / 2;
    band1Mesh.position.y = tier1Y - 0.4;
    cakeGroup.add(band1Mesh);

    // Gold pearls around base
    for (let i = 0; i < 28; i++) {
      const angle = (i / 28) * Math.PI * 2;
      const pearl = new THREE.Mesh(beadGeo, goldMat);
      pearl.position.set(Math.cos(angle) * 1.93, tier1Y + 0.42, Math.sin(angle) * 1.93);
      cakeGroup.add(pearl);
    }

    // --- C. TIER 2 (MIDDLE - 1.4 radius, 0.85 height) ---
    const tier2Y = tier1Y + 0.45 + 0.425;
    const tier2Geo = new THREE.CylinderGeometry(1.38, 1.4, 0.85, 48);
    const tier2Mesh = new THREE.Mesh(tier2Geo, chocTierMat);
    tier2Mesh.position.y = tier2Y;
    tier2Mesh.castShadow = true;
    tier2Mesh.receiveShadow = true;
    cakeGroup.add(tier2Mesh);

    // Cream piping rosettes around tier 2 base
    const rosetteGeo = new THREE.ConeGeometry(0.12, 0.16, 8);
    const rosetteCount = 20;
    for (let i = 0; i < rosetteCount; i++) {
      const angle = (i / rosetteCount) * Math.PI * 2;
      const rosette = new THREE.Mesh(rosetteGeo, creamMat);
      rosette.position.set(Math.cos(angle) * 1.42, tier2Y - 0.38, Math.sin(angle) * 1.42);
      rosette.rotation.y = -angle;
      rosette.rotation.z = -0.3;
      cakeGroup.add(rosette);
    }

    // Middle Gold geometric ring
    const band2Geo = new THREE.TorusGeometry(1.41, 0.04, 16, 64);
    const band2Mesh = new THREE.Mesh(band2Geo, goldMat);
    band2Mesh.rotation.x = Math.PI / 2;
    band2Mesh.position.y = tier2Y;
    cakeGroup.add(band2Mesh);

    // --- D. TIER 3 (TOP - 0.95 radius, 0.75 height) ---
    const tier3Y = tier2Y + 0.425 + 0.375;
    const tier3Geo = new THREE.CylinderGeometry(0.92, 0.95, 0.75, 48);
    const tier3Mesh = new THREE.Mesh(tier3Geo, chocTierMat);
    tier3Mesh.position.y = tier3Y;
    tier3Mesh.castShadow = true;
    tier3Mesh.receiveShadow = true;
    cakeGroup.add(tier3Mesh);

    // Gold ring on top tier edge
    const band3Geo = new THREE.TorusGeometry(0.94, 0.035, 16, 64);
    const band3Mesh = new THREE.Mesh(band3Geo, goldMat);
    band3Mesh.rotation.x = Math.PI / 2;
    band3Mesh.position.y = tier3Y + 0.36;
    cakeGroup.add(band3Mesh);

    // --- E. TOPPER: FRESH STRAWBERRIES & CHOCOLATE ACCENTS ---
    const topperGroup = new THREE.Group();
    topperGroup.position.y = tier3Y + 0.38;

    // Helper to create a single stylized strawberry
    function createBerry(x, y, z, scale, rotY) {
      const bGroup = new THREE.Group();
      bGroup.position.set(x, y, z);
      bGroup.scale.set(scale, scale, scale);
      bGroup.rotation.y = rotY;

      // Berry body (elongated cone with rounded base)
      const berryBodyGeo = new THREE.ConeGeometry(0.18, 0.35, 16);
      const berryMesh = new THREE.Mesh(berryBodyGeo, berryMat);
      berryMesh.rotation.x = Math.PI;
      berryMesh.position.y = 0.16;
      berryMesh.castShadow = true;
      bGroup.add(berryMesh);

      // Berry top calyx leaf
      const calyxGeo = new THREE.ConeGeometry(0.12, 0.06, 5);
      const calyxMesh = new THREE.Mesh(calyxGeo, leafMat);
      calyxMesh.position.y = 0.34;
      bGroup.add(calyxMesh);

      // Little gold leaf speck on berry
      const speckGeo = new THREE.SphereGeometry(0.03, 6, 6);
      const speck = new THREE.Mesh(speckGeo, goldMat);
      speck.position.set(0.08, 0.18, 0.08);
      bGroup.add(speck);

      return bGroup;
    }

    // Cluster of 4 strawberries on top
    topperGroup.add(createBerry(0, 0, 0, 1.25, 0));
    topperGroup.add(createBerry(0.3, 0, 0.2, 0.95, 0.8));
    topperGroup.add(createBerry(-0.28, 0, 0.22, 0.9, -0.6));
    topperGroup.add(createBerry(0.05, 0, -0.32, 1.0, 2.1));

    // Curled chocolate sails / wafers
    const waferMat = new THREE.MeshStandardMaterial({
      color: 0x1a0f0a,
      roughness: 0.3,
      metalness: 0.2
    });
    const waferGeo = new THREE.BoxGeometry(0.04, 0.65, 0.35);

    const wafer1 = new THREE.Mesh(waferGeo, waferMat);
    wafer1.position.set(-0.15, 0.35, -0.1);
    wafer1.rotation.set(0.2, 0.6, 0.35);
    wafer1.castShadow = true;
    topperGroup.add(wafer1);

    const wafer2 = new THREE.Mesh(waferGeo, goldMat);
    wafer2.position.set(0.18, 0.32, -0.15);
    wafer2.rotation.set(-0.15, -0.7, -0.3);
    wafer2.scale.set(0.8, 0.8, 0.8);
    wafer2.castShadow = true;
    topperGroup.add(wafer2);

    // Cream dollops surrounding topper
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const dollop = new THREE.Mesh(rosetteGeo, creamMat);
      dollop.position.set(Math.cos(angle) * 0.65, 0.08, Math.sin(angle) * 0.65);
      dollop.rotation.y = -angle;
      topperGroup.add(dollop);
    }

    cakeGroup.add(topperGroup);

    // Set initial position & orientation of whole cake
    cakeGroup.position.y = -0.2;
    cakeGroup.rotation.x = 0.18;
  }

  function buildGoldParticles() {
    const particleCount = 220;
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Golden dust orbiting around the cake
      const radius = 2.2 + Math.random() * 2.8;
      const angle = Math.random() * Math.PI * 2;
      const height = -1.5 + Math.random() * 4.5;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      scales[i] = Math.random() * 0.06 + 0.02;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle texture canvas for soft glowing gold circle
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 235, 185, 1)');
    grad.addColorStop(0.4, 'rgba(214, 164, 91, 0.8)');
    grad.addColorStop(1, 'rgba(214, 164, 91, 0)');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(pCanvas);

    const material = new THREE.PointsMaterial({
      color: 0xffd988,
      size: 0.16,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
  }

  function setupEvents() {
    // Mouse / Pointer Drag Interaction
    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Window Resize
    window.addEventListener('resize', onWindowResize);

    // Style switcher buttons
    const styleBtns = document.querySelectorAll('.cake-style-btn');
    styleBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        styleBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const style = this.getAttribute('data-style');
        changeCakeStyle(style);
      });
    });

    // IntersectionObserver to pause rendering when out of viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.1 });
    observer.observe(container);
  }

  function onPointerDown(e) {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  }

  function onPointerMove(e) {
    // Parallax tilt tracking
    const rect = container.getBoundingClientRect();
    const nx = (e.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2);
    const ny = (e.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2);
    mouseParallax.x = nx * 0.35;
    mouseParallax.y = ny * 0.2;

    if (!isDragging) return;

    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    targetRotationY += deltaX * 0.008;
    targetRotationX = Math.max(-0.2, Math.min(0.6, targetRotationX + deltaY * 0.006));

    previousMousePosition = { x: e.clientX, y: e.clientY };
  }

  function onPointerUp() {
    isDragging = false;
  }

  function onTouchStart(e) {
    if (e.touches.length === 1) {
      isDragging = true;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }

  function onTouchMove(e) {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - previousMousePosition.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.y;

    targetRotationY += deltaX * 0.008;
    targetRotationX = Math.max(-0.2, Math.min(0.6, targetRotationX + deltaY * 0.006));

    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }

  function onTouchEnd() {
    isDragging = false;
  }

  function onWindowResize() {
    if (!container || !renderer || !camera) return;
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  // Interactive Style Switcher (morphs colors)
  function changeCakeStyle(style) {
    if (!cakeGroup) return;

    if (style === 'chocolate') {
      // Belgian Dark Chocolate Royale
      tierMaterials.forEach(mat => {
        mat.color.setHex(0x24150F);
        mat.roughness = 0.38;
      });
      creamMaterials.forEach(mat => mat.color.setHex(0xF5EBDD));
      berryMaterials.forEach(mat => mat.color.setHex(0xb51e36));
    } else if (style === 'strawberry') {
      // Ruby Strawberry Velvet
      tierMaterials.forEach(mat => {
        mat.color.setHex(0xa63d52);
        mat.roughness = 0.45;
      });
      creamMaterials.forEach(mat => mat.color.setHex(0xfff2f5));
      berryMaterials.forEach(mat => mat.color.setHex(0xd12447));
    } else if (style === 'caramel') {
      // Salted Caramel & Hazelnut Gold
      tierMaterials.forEach(mat => {
        mat.color.setHex(0x543216);
        mat.roughness = 0.28;
      });
      creamMaterials.forEach(mat => mat.color.setHex(0xf7e2be));
      berryMaterials.forEach(mat => mat.color.setHex(0x8a4f1d));
    }
  }

  function animate(timestamp) {
    animationFrameId = requestAnimationFrame(animate);

    if (!isVisible) return;

    // Automatic slow rotation when not dragging
    if (!isDragging) {
      targetRotationY += autoRotateSpeed;
    }

    // Smooth lerp for rotations
    currentRotationY += (targetRotationY - currentRotationY) * 0.08;
    currentRotationX += (targetRotationX - currentRotationX) * 0.08;

    if (cakeGroup) {
      cakeGroup.rotation.y = currentRotationY;
      cakeGroup.rotation.x = currentRotationX + mouseParallax.y * 0.4;
      cakeGroup.rotation.z = -mouseParallax.x * 0.2;
    }

    // Gentle particle swirl
    if (particles) {
      particles.rotation.y += 0.0018;
      const positions = particles.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin((timestamp || 0) * 0.0015 + i) * 0.0015;
      }
      particles.geometry.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
  }

  // Initialize on DOMContentLoaded or immediate if ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThree);
  } else {
    initThree();
  }

  // Expose global controller if needed
  window.SweetDelight3D = {
    setStyle: changeCakeStyle
  };

})();
