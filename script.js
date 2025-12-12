/* Smooth Scroll Navigation */
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({
      behavior: "smooth"
    });
  });
});

/* Parallax Effekt im Hero */
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  const sc = window.scrollY * 0.25;
  heroBg.style.transform = `translateY(${sc}px) scale(1.1)`;
});

/* Scroll Animation der Cards */
const cards = document.querySelectorAll('.glass-card');
function checkCards() {
  const trigger = window.innerHeight * 0.85;
  cards.forEach(card => {
    if (card.getBoundingClientRect().top < trigger) {
      card.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', checkCards);
checkCards();

/* Temperatur-Slider */
const slider = document.getElementById('tempSlider');
const futureImg = document.getElementById('futureImg');

slider.addEventListener('input', () => {
  const v = slider.value; /* 0 - 100 */
  futureImg.style.clipPath = `inset(0 ${100 - v}% 0 0)`;
});

/* 3D Globus */
const container = document.getElementById('globe-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 0.1, 1000);
camera.position.set(0, 0, 2.2);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement);

// Textur (kannst du ersetzen: BILDER/erde.jpg)
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load("BILDER/erde.jpg");

const geo = new THREE.SphereGeometry(1, 64, 64);
const mat = new THREE.MeshStandardMaterial({ map: earthTexture });
const globe = new THREE.Mesh(geo, mat);
scene.add(globe);

// Licht
const light = new THREE.PointLight(0xffffff, 1.3);
light.position.set(3, 3, 3);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);
  globe.rotation.y += 0.0008;
  renderer.render(scene, camera);
}
animate();

// Resize Handler
window.addEventListener('resize', () => {
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();
});
