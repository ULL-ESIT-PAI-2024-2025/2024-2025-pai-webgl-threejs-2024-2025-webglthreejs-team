import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';
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


// Floor
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -3;
scene.add(floor);

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Radial Form (Lathe Geometry)
const radialPoints: THREE.Vector2[] = [];
for (let i = 0; i < 10; i++) {
  radialPoints.push(new THREE.Vector2(Math.sin(i * 0.2) * 2 + 2, (i - 5) * 0.5));
}
let latheGeometry = new THREE.LatheGeometry(radialPoints, 32);
let latheMaterial = new THREE.MeshStandardMaterial({ color: 0xff5733 });
latheMaterial.side = THREE.DoubleSide;
let latheMesh = new THREE.Mesh(latheGeometry, latheMaterial);
latheMesh.scale.set(0.5, 0.5, 0.5);
scene.add(latheMesh);

// Extrusion
const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(1, 0);
shape.lineTo(1, 1);
shape.lineTo(0, 1);
shape.lineTo(0, 0);

const extrudeSettings = { depth: 1, bevelEnabled: true, bevelThickness: 0.2, bevelSize: 0.2, bevelSegments: 1 };
let extrudeGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
let extrudeMaterial = new THREE.MeshStandardMaterial({ color: 0x33ff57 });
let extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
extrudeMesh.position.set(3, 0, 0);
scene.add(extrudeMesh);

// GUI for sliders
const gui = new GUI();

// Radial Form Controls
const radialFolder = gui.addFolder('Radial Form');
const radialParams = { segments: 32, scale: 2, phiLength: 2 * Math.PI };
radialFolder.add(radialParams, 'segments', 3, 64, 1).onChange((value) => {
  scene.remove(latheMesh);
  latheGeometry = new THREE.LatheGeometry(radialPoints, value);
  latheMesh = new THREE.Mesh(latheGeometry, latheMaterial);
  scene.add(latheMesh);
});
radialFolder.add(radialParams, 'scale', 1, 5, 0.1).onChange((value) => {
  radialPoints.forEach((point) => (point.x = Math.sin(point.y * 0.2) * value + value));
  scene.remove(latheMesh);
  latheGeometry = new THREE.LatheGeometry(radialPoints, radialParams.segments);
  latheMesh = new THREE.Mesh(latheGeometry, latheMaterial);
  scene.add(latheMesh);
});
radialFolder.add(radialParams, 'phiLength', 0, 2 * Math.PI, 0.1).onChange((value) => {
  scene.remove(latheMesh);
  latheGeometry = new THREE.LatheGeometry(radialPoints, radialParams.segments, 0, value);
  latheMesh = new THREE.Mesh(latheGeometry, latheMaterial);
  scene.add(latheMesh);
});

radialFolder.open();

// Extrusion Controls
const extrudeFolder = gui.addFolder('Extrusion');
const extrudeParams = { depth: 1, bevelThickness: 0.2, bevelSize: 0.2, bevelSegments: 1 };
extrudeFolder.add(extrudeParams, 'bevelSegments', 1, 10, 1).onChange((value) => {
  scene.remove(extrudeMesh);
  extrudeSettings.bevelSegments = value;
  extrudeGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
  extrudeMesh.position.set(3, 0, 0);
  scene.add(extrudeMesh);
});

extrudeFolder.add(extrudeParams, 'depth', 0.1, 5, 0.1).onChange((value) => {
  scene.remove(extrudeMesh);
  extrudeSettings.depth = value;
  extrudeGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
  extrudeMesh.position.set(3, 0, 0);
  scene.add(extrudeMesh);
});
extrudeFolder.add(extrudeParams, 'bevelThickness', 0, 1, 0.1).onChange((value) => {
  scene.remove(extrudeMesh);
  extrudeSettings.bevelThickness = value;
  extrudeGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
  extrudeMesh.position.set(3, 0, 0);
  scene.add(extrudeMesh);
});
extrudeFolder.add(extrudeParams, 'bevelSize', 0, 1, 0.1).onChange((value) => {
  scene.remove(extrudeMesh);
  extrudeSettings.bevelSize = value;
  extrudeGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
  extrudeMesh.position.set(3, 0, 0);
  scene.add(extrudeMesh);
});
extrudeFolder.open();

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