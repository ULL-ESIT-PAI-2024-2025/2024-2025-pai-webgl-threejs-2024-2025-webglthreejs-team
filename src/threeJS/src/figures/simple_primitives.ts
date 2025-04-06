/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script sets up a Three.js scene with a camera, renderer, lighting, grid helper, 
 * plane, and various 3D primitives. It also includes orbit controls for interactive navigation 
 * and renders the scene to the browser window.
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

/**
 * Creates and configures OrbitControls for the given camera and renderer.
 * OrbitControls allow users to interact with the camera via mouse or touch.
 * 
 * @param {THREE.PerspectiveCamera} camera - The camera to apply the controls to.
 * @param {THREE.WebGLRenderer} renderer - The renderer that will receive events from the controls.
 * 
 * @returns {OrbitControls} The configured OrbitControls instance.
 */
function createOrbitControls(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): OrbitControls {
  const controls: OrbitControls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  return controls;
}

/**
 * The `animate` function is responsible for creating an animation loop for the scene.
 * It continuously renders the scene, updating the camera controls on each frame.
 * 
 * @param {OrbitControls} controls - The orbit controls instance that allows interaction with the camera.
 * @param {THREE.Scene} scene - The scene to render.
 * @param {THREE.PerspectiveCamera} camera - The camera used to view the scene.
 * @param {THREE.WebGLRenderer} renderer - The renderer used to display the scene.
 */
function animate(controls: OrbitControls, scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): void {
  requestAnimationFrame(() => (animate(controls, scene, camera, renderer)));
  controls.update();
  renderer.render(scene, camera);
}

/**
 * Creates and returns a new perspective camera for viewing the scene.
 * 
 * @returns {THREE.PerspectiveCamera} A new perspective camera with default settings.
 */
function createCamera(): THREE.PerspectiveCamera {
  const FOV: number = 75;
  const ASPECT_RATIO: number = window.innerWidth / window.innerHeight;
  const NEAR: number = 0.1;
  const FAR: number = 1000;
  return new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);
}

/**
 * Creates and returns a WebGLRenderer with a specific size and class.
 * 
 * @returns {THREE.WebGLRenderer} A WebGLRenderer instance with a customized size.
 */
function createRenderer(): THREE.WebGLRenderer {
  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  renderer.domElement.classList.add('fullscreen');
  const RIGHT_MARGIN: number = 35;
  const CANVAS_WIDTH: number = window.innerWidth - RIGHT_MARGIN;
  renderer.setSize(CANVAS_WIDTH, window.innerHeight); 
  return renderer;
}

/**
 * Adds the renderer's DOM element to the webpage after a specific title element.
 * 
 * @param {THREE.WebGLRenderer} renderer - The renderer whose DOM element will be added to the document.
 */
function addRendererToDOM(renderer: THREE.WebGLRenderer): void {
  const ELEMENT_TO_ADD_AFTER: string = 'h1';
  const title: HTMLElement = document.querySelector(ELEMENT_TO_ADD_AFTER)!;
  title.after(renderer.domElement);
}

/**
 * Adds a grid helper to the scene to assist with visualizing the scene's scale.
 * 
 * @param {THREE.Scene} scene - The scene to add the grid helper to.
 */
function addGridHelper(scene: THREE.Scene): void {
  const gridHelper: THREE.GridHelper = new THREE.GridHelper(20, 20);
  gridHelper.position.y = -0.1; 
  scene.add(gridHelper);
}

/**
 * Adds a plane to the scene. The plane is positioned horizontally and can serve as a base for objects.
 * 
 * @param {THREE.Scene} scene - The scene to add the plane to.
 */
function addPlane(scene: THREE.Scene): void {
  const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(20, 20);
  const planeMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide });
  const plane: THREE.Mesh = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -0.1; 
  scene.add(plane);
}

/**
 * Adds ambient and directional lighting to the scene to illuminate the objects.
 * 
 * @param {THREE.Scene} scene - The scene to add the lights to.
 */
function addLighting(scene: THREE.Scene): void {
  const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);
}

/**
 * Adds a variety of 3D geometric primitives to the scene. The primitives include:
 * - Box
 * - Sphere
 * - Cone
 * - Cylinder
 * - Torus
 * - Tetrahedron
 * - Octahedron
 * - Icosahedron
 * - Dodecahedron
 * - Plane
 * - Circle
 * 
 * The primitives are arranged in a 3x3 grid.
 * 
 * @param {THREE.Scene} scene - The scene to add the primitives to.
 */
function addPrimitives(scene: THREE.Scene): void {
  const primitives: THREE.BufferGeometry[] = [
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

  const material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });

  primitives.forEach((geometry, index) => {
    const mesh = new THREE.Mesh(geometry, material);
    const row = Math.floor(index / 3);
    const col = index % 3;
    mesh.position.set(col * 2 - 2, 0.5, row * 2 - 2);
    scene.add(mesh);
  });
}

/**
 * The main function initializes the scene, camera, renderer, controls, lighting, grid helper, plane, and 3D primitives.
 * It also sets up the animation loop to render the scene continuously.
 */
function main(): void {
  const SCENE: THREE.Scene = new THREE.Scene();
  const CAMERA: THREE.PerspectiveCamera = createCamera();
  const RENDERER: THREE.WebGLRenderer = createRenderer();
  const CONTROLS: OrbitControls = createOrbitControls(CAMERA, RENDERER);
  addRendererToDOM(RENDERER);
  CAMERA.position.set(5, 5, 5);
  CAMERA.lookAt(0, 0, 0);
  addGridHelper(SCENE);
  addPlane(SCENE);
  addLighting(SCENE);
  addPrimitives(SCENE);
  animate(CONTROLS, SCENE, CAMERA, RENDERER);
}

main();
