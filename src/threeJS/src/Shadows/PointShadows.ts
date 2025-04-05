/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script demonstrates how to create a scene with shadows using Three.js. 
 * 
 * @since Sat 05 Apr 2025 
 * @author Aarón Jano Barreto
 * @author Roberto Padrón Castañeda
 * @author Samuel Montoya Diaz
 * 
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-webgl-threejs-2024-2025-webglthreejs-team.git}
 */


import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Cube from '../figures/Shapes/Cube';
import BasePlane from '../figures/Shapes/BasePlane';

function main(): void {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth /window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2, 5);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Sombras para el renderizador
  renderer.shadowMap.enabled = true;

  const pointLight = new THREE.PointLight('white', 150, 7);
  pointLight.position.set(0, 5, 1);

  // Sombras para la luz puntual
  pointLight.castShadow = true;

  scene.add(pointLight);
  let cube: Cube = new Cube(1, new THREE.MeshPhongMaterial({ color: 'white' }));
  

  // Sombras para el cubo
  cube.getCube().castShadow = true;

  scene.add(cube.getCube());
  let plane: BasePlane = new BasePlane(10, new THREE.MeshPhongMaterial({ color: 'grey' }));

  // Sombras para el plano
  plane.getPlane().receiveShadow = true;

  plane.setPosition(0, -1, 0);
  scene.add(plane.getPlane());
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
}

main();
