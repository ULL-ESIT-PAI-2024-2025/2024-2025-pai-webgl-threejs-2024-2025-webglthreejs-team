/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script sets up a basic Three.js scene with a camera and renderer,
 * and renders a blank scene to the browser window.
 * 
 * @since Sat 05 Apr 2025 
 * @author Aarón Jano Barreto
 * @author Roberto Padrón Castañeda
 * @author Samuel Montoya Diaz
 * 
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-webgl-threejs-2024-2025-webglthreejs-team.git}
 */


import * as THREE from 'three';

function createCamera(): THREE.PerspectiveCamera {
  const FOV: number = 75;
  const ASPECT_RATIO: number = window.innerWidth / window.innerHeight;
  const NEAR: number = 0.1;
  const FAR: number = 1000;
  return new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);
}

function createRenderer(): THREE.WebGLRenderer {
  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  renderer.domElement.classList.add('fullscreen');
  const RIGHT_MARGIN: number = 35;
  const CANVAS_WIDTH: number = window.innerWidth - RIGHT_MARGIN;
  renderer.setSize(CANVAS_WIDTH, window.innerHeight); 
  return renderer;
}

function addRendererToDOM(renderer: THREE.WebGLRenderer): void {
  const ELEMENT_TO_ADD_AFTER: string = 'h1';
  const title: HTMLElement = document.querySelector(ELEMENT_TO_ADD_AFTER)!;
  title.after(renderer.domElement);
}

function main(): void {
  const SCENE: THREE.Scene = new THREE.Scene();
  const CAMERA: THREE.PerspectiveCamera = createCamera();
  const RENDERER: THREE.WebGLRenderer = createRenderer();
  addRendererToDOM(RENDERER);
  RENDERER.render(SCENE, CAMERA); 
}

main();


