/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script demonstrates the different parameters of the Physical Material.
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
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';

function addPhysicalMaterial(scene: THREE.Scene, gui: GUI): void {
  const geometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  const material: THREE.MeshPhysicalMaterial = new THREE.MeshPhysicalMaterial({ color: 0x00ff00, metalness: 0.5, roughness: 0.5, 
    clearcoat: 0.5, clearcoatRoughness: 0.1, reflectivity: 0.5, transmission: 0.5, opacity: 1, transparent: true,
    emissive: 0, emissiveIntensity: 1, sheen: 0.5, sheenColor: 0x00ff00, sheenRoughness: 0.5,
    thickness: 1, ior: 1.5
  });
  const mesh: THREE.Mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  scene.add(mesh);
  const materialFolder = gui.addFolder('Physical Material');
  const materialParams = {
    color: 0x00ff00,
    metalness: 0.5,
    roughness: 0.5,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1,
    reflectivity: 0.5,
    transmission: 0.5,
    emissive: 0,
    emissiveIntensity: 1,
    ior: 1.5,
    sheen: 0.5,
    sheenColor: 0x00ff00,
    sheenRoughness: 0.5,
    thickness: 1,
  };
  materialFolder.addColor(materialParams, 'color').onChange((value) => {
    material.color.set(value);
  });
  materialFolder.add(materialParams, 'metalness', 0, 1, 0.01).onChange((value) => {
    material.metalness = value;
  });
  materialFolder.add(materialParams, 'roughness', 0, 1, 0.01).onChange((value) => {
    material.roughness = value;
  });
  materialFolder.add(materialParams, 'clearcoat', 0, 1, 0.01).onChange((value) => {
    material.clearcoat = value;
  });
  materialFolder.add(materialParams, 'clearcoatRoughness', 0, 1, 0.01).onChange((value) => {
    material.clearcoatRoughness = value;
  });
  materialFolder.add(materialParams, 'reflectivity', 0, 1, 0.01).onChange((value) => {
    material.reflectivity = value;
  });
  materialFolder.add(materialParams, 'transmission', 0, 1, 0.01).onChange((value) => {
    material.transmission = value;
  });
  materialFolder.add(materialParams, 'emissive', 0, 100, 0.01).onChange((value) => {
    material.emissive.set(value);
  });
  materialFolder.add(materialParams, 'emissiveIntensity', 0, 1, 0.01).onChange((value) => {
    material.emissiveIntensity = value;
  });
  materialFolder.add(materialParams, 'ior', 1, 10, 0.01).onChange((value) => {
    material.ior = value;
  });
  materialFolder.add(materialParams, 'sheen', 0, 1, 0.01).onChange((value) => {
    material.sheen = value;
  });
  materialFolder.addColor(materialParams, 'sheenColor').onChange((value) => {
    material.sheenColor.set(value);
  });
  materialFolder.add(materialParams, 'sheenRoughness', 0, 1, 0.01).onChange((value) => {
    material.sheenRoughness = value;
  });
  materialFolder.add(materialParams, 'thickness', 0, 10, 0.01).onChange((value) => {
    material.thickness = value;
  });
  materialFolder.open();
}

function createOrbitControls(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): OrbitControls {
  const controls: OrbitControls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  return controls;
}

function animate(controls: OrbitControls, scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): void {
  requestAnimationFrame(() => (animate(controls, scene, camera, renderer)));
  controls.update();
  renderer.render(scene, camera);
}

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

function addGridHelper(scene: THREE.Scene): void {
  const gridHelper: THREE.GridHelper = new THREE.GridHelper(20, 20);
  gridHelper.position.y = -1.1; 
  scene.add(gridHelper);
}

function addPlane(scene: THREE.Scene): void {
  const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(20, 20);
  const planeMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide });
  const plane: THREE.Mesh = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -1.1; 
  scene.add(plane);
}

function addLighting(scene: THREE.Scene): void {
  const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);
}

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
  const gui = new GUI();
  addPhysicalMaterial(SCENE, gui);
  animate(CONTROLS, SCENE, CAMERA, RENDERER);
}

main();
