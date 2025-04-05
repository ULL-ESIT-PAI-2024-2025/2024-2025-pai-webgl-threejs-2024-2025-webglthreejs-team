/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script creates a Three.js scene with a sphere and a plane, both of which cast and receive shadows. 
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
import Sphere from '../figures/Shapes/Sphere';
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

  const directionalLight = new THREE.DirectionalLight('white', 5);
  directionalLight.position.set(5, 5, 5);

  // Sombras para la luz direccional
  directionalLight.castShadow = true;

  scene.add(directionalLight);
  let sphere: Sphere = new Sphere(1, new THREE.MeshLambertMaterial({ color: 'white' }));
  
  // Sombras para la esfera
  sphere.getShape().castShadow = true;

  scene.add(sphere.getShape());
  let plane: BasePlane = new BasePlane(10, new THREE.MeshLambertMaterial({ color: 'grey' }));

  // Sombras para el plano
  plane.getShape().receiveShadow = true;

  plane.setPosition(0, -2, 0);
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


