import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 10);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight, false); 
renderer.domElement.classList.add('canvas');

const link: HTMLElement = document.querySelector('a')!;
document.body.insertBefore(renderer.domElement, link);

// Asegurar que el canvas respete CSS
renderer.domElement.style.height = "100vh";
renderer.domElement.style.width = "97vw";

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Grid Helper
const gridHelper = new THREE.GridHelper(20, 20);
gridHelper.position.y = -0.1; 
scene.add(gridHelper);

// Plane
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -0.1; 
scene.add(plane);

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Simple Primitives
const primitives = [
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.ConeGeometry(0.5, 1, 32),
  new THREE.CylinderGeometry(0.5, 0.5, 1, 32),
  new THREE.TorusGeometry(0.5, 0.2, 16, 100),
  new THREE.TetrahedronGeometry(0.5),
  new THREE.OctahedronGeometry(0.5),
  new THREE.IcosahedronGeometry(0.5),
  new THREE.DodecahedronGeometry(0.5),
  new THREE.PlaneGeometry(1, 1),
  new THREE.CircleGeometry(0.5, 32),
];

const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });

primitives.forEach((geometry, index) => {
  const mesh = new THREE.Mesh(geometry, material);
  const row = Math.floor(index / 3);
  const col = index % 3;
  mesh.position.set(col * 2 - 2, 0.5, row * 2 - 2);
  scene.add(mesh);
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});