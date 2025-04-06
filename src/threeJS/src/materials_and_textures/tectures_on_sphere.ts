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

/**
 * 
 * @param camera - The camera to be controlled
 * @param renderer - The renderer to be used
 * @returns The created OrbitControls instance
 */
function createOrbitControls(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): OrbitControls {
  const controls: OrbitControls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  return controls;
}

/**
 * 
 * @param controls - The OrbitControls instance to be updated
 * @param scene - The scene to be rendered
 * @param camera - The camera to be used
 * @param renderer - The renderer to be used
 * @description This function animates the scene by updating the controls and rendering the scene.
 */
function animate(controls: OrbitControls, scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): void {
  requestAnimationFrame(() => (animate(controls, scene, camera, renderer)));
  controls.update();
  renderer.render(scene, camera);
}

/**
 * Function to create a PerspectiveCamera
 * @returns A new PerspectiveCamera instance
 */
function createCamera(): THREE.PerspectiveCamera {
  const FOV: number = 75;
  const ASPECT_RATIO: number = window.innerWidth / window.innerHeight;
  const NEAR: number = 0.1;
  const FAR: number = 1000;
  return new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);
}

/**
 * Function to create a WebGLRenderer
 * @description This function creates a WebGLRenderer instance, sets its size, and enables shadows.
 * @returns A new WebGLRenderer instance
 */
function createRenderer(): THREE.WebGLRenderer {
  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  renderer.domElement.classList.add('fullscreen');
  const RIGHT_MARGIN: number = 35;
  const CANVAS_WIDTH: number = window.innerWidth - RIGHT_MARGIN;
  renderer.setSize(CANVAS_WIDTH, window.innerHeight);
  renderer.shadowMap.enabled = true; // Enable shadows
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Set shadow map type
  return renderer;
}

/**
 * Function to add the renderer to the DOM
 * @description This function adds the WebGLRenderer instance to the DOM after a specified element.
 * @param renderer - The WebGLRenderer instance to be added to the DOM
 */
function addRendererToDOM(renderer: THREE.WebGLRenderer): void {
  const ELEMENT_TO_ADD_AFTER: string = 'h1';
  const title: HTMLElement = document.querySelector(ELEMENT_TO_ADD_AFTER)!;
  title.after(renderer.domElement);
}

/**
 * 
 * @param scene - The scene to which the lighting will be added
 * @description This function adds lighting to the scene, including a directional light.
 * The directional light is positioned and configured to cast shadows.
 */
function addLighting(scene: THREE.Scene): void {
  // const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
  // scene.add(ambientLight);

  const directionalLight: THREE.PointLight = new THREE.PointLight('white', 20, 10);
  directionalLight.position.set(2, 3, 2);
  directionalLight.castShadow = true; 
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  scene.add(directionalLight);
}

/**
 * 
 * @param scene - The scene to which the plane will be added
 * @description This function creates a plane geometry and adds it to the scene.
 * The plane is positioned and configured to receive shadows.
 */
function addPlane(scene: THREE.Scene): void {
  const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(10, 10);
  const planeMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({ color: 'gray', side: THREE.DoubleSide });
  const plane: THREE.Mesh = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -1.1;
  plane.receiveShadow = true; 
  scene.add(plane);
}

/**
 * 
 * @param scene - The scene to which the grid helper will be added
 * @description This function creates a grid helper and adds it to the scene.
 * The grid helper is positioned to provide a visual reference for the scene.
 */
function addGridHelper(scene: THREE.Scene): void {
  const gridHelper: THREE.GridHelper = new THREE.GridHelper(20, 20);
  gridHelper.position.y = -1.1;
  scene.add(gridHelper);
}

/**
 * 
 * @returns A new MeshPhysicalMaterial instance with textures applied
 * @description This function creates a MeshPhysicalMaterial with various textures applied.
 * The textures include color, normal, roughness, displacement, and clearcoat maps.
 */
function createMaterialWithTextures(): THREE.MeshPhysicalMaterial {
  const textureLoader = new THREE.TextureLoader();

  const colorTexture = textureLoader.load('./TilesMosaicPennyround001/TilesMosaicPennyround001_COL_2K.png'); // Textura de color
  const normalTexture = textureLoader.load('./TilesMosaicPennyround001/TilesMosaicPennyround001_NRM_2K.png'); // Textura normal
  const roughnessTexture = textureLoader.load('./TilesMosaicPennyround001/TilesMosaicPennyround001_REFL_2K.png'); // Textura de rugosidad
  const displacementTexture = textureLoader.load('./TilesMosaicPennyround001/TilesMosaicPennyround001_DISP_2K.png'); // Textura de desplazamiento
  const clearcoatTexture = textureLoader.load('./TilesMosaicPennyround001/TilesMosaicPennyround001_GLOSS_2K.png'); // Textura de recubrimiento

  const material = new THREE.MeshPhysicalMaterial({
    map: colorTexture, 
    normalMap: normalTexture, 
    roughnessMap: roughnessTexture, 
    displacementMap: displacementTexture, 
    displacementScale: 0.1, 
    clearcoatMap: clearcoatTexture, 
    metalness: 0,
    flatShading: false,
  });

  return material;
}

/**
 * Main function to initialize the scene, camera, renderer, and controls.
 */
function main(): void {
  const SCENE: THREE.Scene = new THREE.Scene();
  SCENE.background = new THREE.Color('gray');
  addLighting(SCENE);
  addPlane(SCENE);
  addGridHelper(SCENE);
  const GEOMETRY = new THREE.SphereGeometry(1, 200, 200);
  const MATERIAL = createMaterialWithTextures();
  const SPHERE = new THREE.Mesh(GEOMETRY, MATERIAL);
  SPHERE.castShadow = true;
  SCENE.add(SPHERE);
  const CAMERA: THREE.PerspectiveCamera = createCamera();
  CAMERA.position.set(0, 2, 5);
  const RENDERER: THREE.WebGLRenderer = createRenderer();
  addRendererToDOM(RENDERER);
  const CONTROLS: OrbitControls = createOrbitControls(CAMERA, RENDERER);
  animate(CONTROLS, SCENE, CAMERA, RENDERER);
}

main();
