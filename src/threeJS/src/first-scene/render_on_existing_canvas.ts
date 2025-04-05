import * as THREE from "three";

function createScene(): void {
  const scene = new THREE.Scene();

  const FOV: number = 75;
  const ASPECT_RATIO: number = window.innerWidth / window.innerHeight;
  const NEAR: number = 0.1;
  const FAR: number = 1000;
  const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);

  const miCanvas = document.getElementById("miCanvas")!;
  const renderer = new THREE.WebGLRenderer({ canvas: miCanvas });

  renderer.domElement.classList.add("fullscreen");
  const RIGHT_MARGIN: number = 35;
  const CANVAS_WIDTH: number = window.innerWidth - RIGHT_MARGIN;
  renderer.setSize(CANVAS_WIDTH, window.innerHeight); 

  const ELEMENT_TO_ADD_AFTER: string = "h1";
  const title: HTMLElement = document.querySelector(ELEMENT_TO_ADD_AFTER)!;
  title.after(renderer.domElement);
  renderer.render(scene, camera); 
}

function main(): void {
  createScene();
}

main();
