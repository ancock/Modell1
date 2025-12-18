/* Smooth Scroll */
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({
      behavior: "smooth"
    });
  });
});

/* Parallax Hero */
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  heroBg.style.transform = `translateY(${window.scrollY * 0.25}px) scale(1.1)`;
});

/* Karten Animation */
const cards = document.querySelectorAll('.glass-card');
function revealCards() {
  const trigger = window.innerHeight * 0.85;
  cards.forEach(card => {
    if (card.getBoundingClientRect().top < trigger) {
      card.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealCards);
revealCards();

/* Temperatur Slider */
const slider = document.getElementById('tempSlider');
const futureImg = document.getElementById('futureImg');

slider.addEventListener('input', () => {
  futureImg.style.clipPath = `inset(0 ${100 - slider.value}% 0 0)`;
});

/* 3D Globus */
const container = document.getElementById('globe-container');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  container.offsetWidth / container.offsetHeight,
  0.1,
  1000
);
camera.position.z = 2.2;

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement);

// Erde
const loader = new THREE.TextureLoader();
const earthTexture = loader.load("bilder/erde.jpg");

const globe = new THREE.Mesh(
  new THREE.SphereGeometry(1, 64, 64),
  new THREE.MeshStandardMaterial({ map: earthTexture })
);
scene.add(globe);

// Licht
const light = new THREE.PointLight(0xffffff, 1.3);
light.position.set(3, 3, 3);
scene.add(light);

// Animation
function animate() {
  requestAnimationFrame(animate);
  globe.rotation.y += 0.0008;
  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();
});
