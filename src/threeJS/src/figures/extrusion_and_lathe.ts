/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script initializes a Three.js scene with interactive 3D objects, 
 * including extrusion and lathe geometries, and provides GUI controls 
 * for customization. It also sets up lighting, a grid helper, and a plane 
 * for better visualization, along with orbit controls for navigation.
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

function addExtrusionWithGUI(scene: THREE.Scene, gui: GUI): void {
  const SHAPE: THREE.Shape  = new THREE.Shape();
  SHAPE.moveTo(0, 0);
  SHAPE.lineTo(1, 0);
  SHAPE.lineTo(1, 1);
  SHAPE.lineTo(0, 1);
  SHAPE.lineTo(0, 0);

  let extrudeSettings = { depth: 1, bevelEnabled: true, bevelThickness: 0.2, bevelSize: 0.2, bevelSegments: 1 };
  let extrudeGeometry: THREE.ExtrudeGeometry = new THREE.ExtrudeGeometry(SHAPE, extrudeSettings);
  let extrudeMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({ color: 0x33ff57 });
  let extrudeMesh: THREE.Mesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
  extrudeMesh.position.set(3, 0, 0);
  scene.add(extrudeMesh);

  const extrudeFolder = gui.addFolder('Extrusion');
  const extrudeParams = { depth: 1, bevelThickness: 0.2, bevelSize: 0.2, bevelSegments: 1 };
  extrudeFolder.add(extrudeParams, 'bevelSegments', 1, 10, 1).onChange((value) => {
    scene.remove(extrudeMesh);
    extrudeSettings.bevelSegments = value;
    extrudeGeometry = new THREE.ExtrudeGeometry(SHAPE, extrudeSettings);
    extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
    extrudeMesh.position.set(3, 0, 0);
    scene.add(extrudeMesh);
  });

  extrudeFolder.add(extrudeParams, 'depth', 0.1, 5, 0.1).onChange((value) => {
    scene.remove(extrudeMesh);
    extrudeSettings.depth = value;
    extrudeGeometry = new THREE.ExtrudeGeometry(SHAPE, extrudeSettings);
    extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
    extrudeMesh.position.set(3, 0, 0);
    scene.add(extrudeMesh);
  });
  extrudeFolder.add(extrudeParams, 'bevelThickness', 0, 1, 0.1).onChange((value) => {
    scene.remove(extrudeMesh);
    extrudeSettings.bevelThickness = value;
    extrudeGeometry = new THREE.ExtrudeGeometry(SHAPE, extrudeSettings);
    extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
    extrudeMesh.position.set(3, 0, 0);
    scene.add(extrudeMesh);
  });
  extrudeFolder.add(extrudeParams, 'bevelSize', 0, 1, 0.1).onChange((value) => {
    scene.remove(extrudeMesh);
    extrudeSettings.bevelSize = value;
    extrudeGeometry = new THREE.ExtrudeGeometry(SHAPE, extrudeSettings);
    extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
    extrudeMesh.position.set(3, 0, 0);
    scene.add(extrudeMesh);
  });
  extrudeFolder.open();
}

function addLatheWithGUI(scene: THREE.Scene, gui: GUI): void {
  const radialPoints: THREE.Vector2[] = [];
  for (let i = 0; i < 10; i++) {
    radialPoints.push(new THREE.Vector2(Math.sin(i * 0.2) * 2 + 2, (i - 5) * 0.5));
  }
  let latheGeometry: THREE.LatheGeometry = new THREE.LatheGeometry(radialPoints, 32);
  let latheMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({ color: 0xff5733 });
  latheMaterial.side = THREE.DoubleSide;
  let latheMesh = new THREE.Mesh(latheGeometry, latheMaterial);
  latheMesh.position.set(-3, 0, 0);
  latheMesh.scale.set(0.5, 0.5, 0.5);
  scene.add(latheMesh);

  // Radial Form Controls
  const radialFolder = gui.addFolder('Radial Form');
  const radialParams = { segments: 32, scale: 0.5, phiLength: 2 * Math.PI };
  radialFolder.add(radialParams, 'segments', 3, 64, 1).onChange((value) => {
    scene.remove(latheMesh);
    latheGeometry = new THREE.LatheGeometry(radialPoints, value);
    latheMesh = new THREE.Mesh(latheGeometry, latheMaterial);
    latheMesh.position.set(-3, 0, 0);
    latheMesh.scale.set(0.5, 0.5, 0.5);
    scene.add(latheMesh);
  });
  radialFolder.add(radialParams, 'scale', 0.5, 5, 0.1).onChange((value) => {
    radialPoints.forEach((point) => (point.x = Math.sin(point.y * 0.2) * value + value));
    scene.remove(latheMesh);
    latheGeometry = new THREE.LatheGeometry(radialPoints, radialParams.segments);
    latheMesh = new THREE.Mesh(latheGeometry, latheMaterial);
    latheMesh.position.set(-3, 0, 0);
    latheMesh.scale.set(0.5, 0.5, 0.5);
    scene.add(latheMesh);
  });
  radialFolder.add(radialParams, 'phiLength', 0, 2 * Math.PI, 0.1).onChange((value) => {
    scene.remove(latheMesh);
    latheGeometry = new THREE.LatheGeometry(radialPoints, radialParams.segments, 0, value);
    latheMesh = new THREE.Mesh(latheGeometry, latheMaterial);
    latheMesh.position.set(-3, 0, 0);
    latheMesh.scale.set(0.5, 0.5, 0.5);
    scene.add(latheMesh);
  });

  radialFolder.open();
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
  addExtrusionWithGUI(SCENE, gui);
  addLatheWithGUI(SCENE, gui);
  animate(CONTROLS, SCENE, CAMERA, RENDERER);
}

main();
