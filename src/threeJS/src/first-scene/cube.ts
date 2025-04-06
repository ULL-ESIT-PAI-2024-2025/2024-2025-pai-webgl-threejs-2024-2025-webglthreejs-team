/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script sets up a basic Three.js scene with a camera, renderer, and a red cube,
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

/**
 * Function to create a perspective camera.
 * @returns {THREE.PerspectiveCamera} A perspective camera with a field of view of 75 degrees,
 * an aspect ratio based on the window size, and a near and far clipping plane of 0.1 and 1000 units, respectively.
 */
function createCamera(): THREE.PerspectiveCamera {
  const FOV: number = 75;
  const ASPECT_RATIO: number = window.innerWidth / window.innerHeight;
  const NEAR: number = 0.1;
  const FAR: number = 1000;
  return new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);
}

/**
 * Function to create a WebGL renderer.
 * @returns {THREE.WebGLRenderer} A WebGL renderer with a size based on the window dimensions.
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
 * Function to add the WebGL renderer to the DOM.
 * @param renderer - The WebGL renderer to be added to the DOM.
 */
function addRendererToDOM(renderer: THREE.WebGLRenderer): void {
  const ELEMENT_TO_ADD_AFTER: string = 'h1';
  const title: HTMLElement = document.querySelector(ELEMENT_TO_ADD_AFTER)!;
  title.after(renderer.domElement);
}

/**
 * Function to create a red cube mesh.
 * @returns {THREE.Mesh} A red cube mesh with a size of 1x1x1 units and positioned at (3, 3, 3).
 */
function createCube(): THREE.Mesh {
  const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1); 
  const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 'red' }); 
  const cube: THREE.Mesh = new THREE.Mesh(geometry, material); 
  cube.position.set(3, 3, 3);
  return cube;
}

/**
 * Main function to set up the scene, camera, renderer, and cube.
 */
function main(): void {
  const SCENE: THREE.Scene = new THREE.Scene();
  const CAMERA: THREE.PerspectiveCamera = createCamera();
  const RENDERER: THREE.WebGLRenderer = createRenderer();
  addRendererToDOM(RENDERER);
  CAMERA.position.set(5, 5, 5); 
  CAMERA.lookAt(0, 0, 0);
  const CUBE: THREE.Mesh = createCube();
  SCENE.add(CUBE);
  RENDERER.render(SCENE, CAMERA); 
}

main();


