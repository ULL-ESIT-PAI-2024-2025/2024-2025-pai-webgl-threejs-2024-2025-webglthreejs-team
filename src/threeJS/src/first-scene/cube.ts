import * as THREE from "three";

function createCamera(): THREE.PerspectiveCamera {
  const FOV: number = 75;
  const ASPECT_RATIO: number = window.innerWidth / window.innerHeight;
  const NEAR: number = 0.1;
  const FAR: number = 1000;
  return new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);
}

function createRenderer(): THREE.WebGLRenderer {
  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  renderer.domElement.classList.add("fullscreen");
  const RIGHT_MARGIN: number = 35;
  const CANVAS_WIDTH: number = window.innerWidth - RIGHT_MARGIN;
  renderer.setSize(CANVAS_WIDTH, window.innerHeight); 
  return renderer;
}

function addRendererToDOM(renderer: THREE.WebGLRenderer): void {
  const ELEMENT_TO_ADD_AFTER: string = "h1";
  const title: HTMLElement = document.querySelector(ELEMENT_TO_ADD_AFTER)!;
  title.after(renderer.domElement);
}

function createCube(): THREE.Mesh {
  const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1); 
  const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "red" }); 
  const cube: THREE.Mesh = new THREE.Mesh(geometry, material); 
  cube.position.set(3, 3, 3);
  return cube;
}

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


