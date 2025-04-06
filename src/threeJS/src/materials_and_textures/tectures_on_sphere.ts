/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script creates a Three.js scene with a sphere and a plane, applying textures
 * to the sphere and enabling shadows. 
 * 
 * @since Sat 05 Apr 2025 
 * @author Aarón Jano Barreto
 * @author Roberto Padrón Castañeda
 * @author Samuel Montoya Diaz
 * 
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-webgl-threejs-2024-2025-webglthreejs-team.git}
 */


import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

// Cámara
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 2, 5);

// Renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Habilitar sombras
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const link: HTMLElement = document.querySelector('a')!;
document.body.insertBefore(renderer.domElement, link);

// Asegurar que el canvas respete CSS
renderer.domElement.style.height = '100vh';
renderer.domElement.style.width = '97vw';

// Control de órbita
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Luz
const light = new THREE.PointLight(0xffffff, 10, 10);
light.position.set(2, 3, 2);
light.castShadow = true; // Habilitar sombras en la luz
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// Texturas
const textureLoader = new THREE.TextureLoader();

// Cargar texturas
const colorTexture = textureLoader.load('./TilesMosaicPennyround001/TilesMosaicPennyround001_COL_2K.png'); // Textura de color
const normalTexture = textureLoader.load('./TilesMosaicPennyround001/TilesMosaicPennyround001_NRM_2K.png'); // Textura normal
const roughnessTexture = textureLoader.load('./TilesMosaicPennyround001/TilesMosaicPennyround001_REFL_2K.png'); // Textura de rugosidad
const displacementTexture = textureLoader.load('./TilesMosaicPennyround001/TilesMosaicPennyround001_DISP_2K.png'); // Textura de desplazamiento
const clearcoatTexture = textureLoader.load('./TilesMosaicPennyround001/TilesMosaicPennyround001_GLOSS_2K.png'); // Textura de recubrimiento

// Crear material con texturas
const material = new THREE.MeshPhysicalMaterial({
    map: colorTexture, // Textura de color
    normalMap: normalTexture, // Textura normal
    roughnessMap: roughnessTexture, // Textura de rugosidad
    displacementMap: displacementTexture, // Textura de desplazamiento
    displacementScale: 0.1, // Escala de desplazamiento
    clearcoatMap: clearcoatTexture, // Textura de recubrimiento
    metalness: 0,
    flatShading: false,
});

// Crear geometría y aplicar material
const sphereGeometry = new THREE.SphereGeometry(1, 200, 200);
const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.set(0, 0, 0);
sphere.castShadow = true; // La esfera proyecta sombra
scene.add(sphere);

// Suelo
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
plane.receiveShadow = true; // El suelo recibe sombras
scene.add(plane);

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
