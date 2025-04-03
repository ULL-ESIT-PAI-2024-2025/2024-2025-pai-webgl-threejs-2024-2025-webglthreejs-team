import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';


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

const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
// Font Loader
const loader = new FontLoader();
loader.load('http://localhost:3000/src/figures/Hefana_Regular.json', (font) => {
  const textGeometry = new TextGeometry('Hello 3D!', {
    font: font,
    size: 1,
    depth: 0.5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelSegments: 5,
  });

  const textMesh = new THREE.Mesh(textGeometry, material);
  textMesh.position.set(0, 1, 0);
  scene.add(textMesh);
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