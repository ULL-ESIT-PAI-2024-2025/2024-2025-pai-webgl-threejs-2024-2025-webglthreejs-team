/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script creates a scene with a cube and a plane using Three.js. 
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

  // Luz ambiental
  const ambientLight = new THREE.AmbientLight('blue', 5);
  scene.add(ambientLight);

  let cube: Cube = new Cube(1, new THREE.MeshPhongMaterial({ color: 'white' }));
  scene.add(cube.getShape());
  let plane: BasePlane = new BasePlane(10, new THREE.MeshPhongMaterial({ color: 'grey' }));
  plane.setPosition(0, -1, 0);
  scene.add(plane.getShape());

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
}

main();
