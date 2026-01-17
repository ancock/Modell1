/* =========================
   Smooth Scroll Navigation
========================= */
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* =========================
   Parallax Hero Effekt
========================= */
const heroBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
  if (heroBg) {
    heroBg.style.transform = `translateY(${window.scrollY * 0.25}px) scale(1.1)`;
  }
});

/* =========================
   Karten Reveal Animation
========================= */
const cards = document.querySelectorAll('.glass-card');

function revealCards() {
  const trigger = window.innerHeight * 0.85;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < trigger) {
      card.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealCards);
revealCards();

/* =========================
   Temperatur Slider
========================= */
const slider = document.getElementById('tempSlider');
const futureImg = document.getElementById('futureImg');

if (slider && futureImg) {
  slider.addEventListener('input', () => {
    futureImg.style.width = slider.value + "%";
  });
}

/* =========================
   3D Globus (Three.js)
========================= */
const container = document.getElementById('globe-container');

if (container) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 2.5;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });

  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Textur laden
  const loader = new THREE.TextureLoader();
  const earthTexture = loader.load("bilder/erde.jpg");

  // Erde
  const globe = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 64),
    new THREE.MeshStandardMaterial({ map: earthTexture })
  );
  scene.add(globe);

  // Licht
  const light = new THREE.PointLight(0xffffff, 1.2);
  light.position.set(3, 3, 3);
  scene.add(light);

  // Animation
  function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.001;
    renderer.render(scene, camera);
  }
  animate();

  // Responsive Resize
  window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
}
