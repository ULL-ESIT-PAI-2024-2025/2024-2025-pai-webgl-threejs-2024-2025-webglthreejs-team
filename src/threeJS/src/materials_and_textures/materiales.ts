import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color('lightblue');

// Cámara
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 2, 5);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight, false); 
renderer.domElement.classList.add('canvas');

const link: HTMLElement = document.querySelector('a')!;
document.body.insertBefore(renderer.domElement, link);

// Asegurar que el canvas respete CSS
renderer.domElement.style.height = "100vh";
renderer.domElement.style.width = "97vw";
// Control de órbita
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Luz
const light = new THREE.PointLight(0xffffff, 20, 10);
light.position.set(2, 3, 2);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// Suelo
const planeGeometry = new THREE.PlaneGeometry(12, 10);
const planeMaterial = new THREE.MeshPhongMaterial({ color: 'white', shininess: 100 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.translateX(1);
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
scene.add(plane);

// Materiales
const materials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    new THREE.MeshStandardMaterial({ color: 0x00ff00, roughness: 0.5, metalness: 0.5, }),
    new THREE.MeshPhongMaterial({ color: 0x0000ff, shininess: 100 }),
    new THREE.MeshLambertMaterial({ color: 0xffff00 }),
    new THREE.MeshToonMaterial({ color: 0xff00ff }),
    new THREE.MeshPhysicalMaterial({ color: 0x00ffff, clearcoat: 1, clearcoatRoughness: 0 }),
    new THREE.ShadowMaterial({ opacity: 0.5 }),
    new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 }),
    new THREE.LineBasicMaterial({ color: 0xffa500 }),
    new THREE.LineDashedMaterial({ color: 0x00ff00, dashSize: 0.2, gapSize: 0.1 }),
    new THREE.MeshNormalMaterial(),
    new THREE.MeshDepthMaterial(),
    new THREE.MeshDistanceMaterial({ referencePosition: new THREE.Vector3(0, 0, 0) }),
  ];

// Crear objetos con diferentes materiales
materials.forEach((material, index) => {
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    let object;
    if (material instanceof THREE.PointsMaterial) {
        object = new THREE.Points(sphereGeometry, material);
    } else if (material instanceof THREE.LineBasicMaterial || material instanceof THREE.LineDashedMaterial) {
        object = new THREE.LineSegments(new THREE.EdgesGeometry(sphereGeometry), material);
        if (material instanceof THREE.LineDashedMaterial) {
            object.computeLineDistances();
        }
    } else {
        object = new THREE.Mesh(sphereGeometry, material);
    }
    object.position.set(index - 4.5, 0, 0);
    scene.add(object);
});

// Animación
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

// Ajuste de tamaño de ventana
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
