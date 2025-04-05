/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script loads a 3D model of a Mercedes car using Three.js and displays it in a scene. 
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
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

function main(): void {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth /window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2, 5);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  const ambientLight = new THREE.AmbientLight('white', 5); // Color gris suave
  scene.add(ambientLight);

  // Fbx loader, mercedes con texturas
  const loader = new FBXLoader();
  loader.load('Mercedes-model/Mercedes.fbx', (fbx) => {
    fbx.scale.set(0.05, 0.05, 0.05); 
    fbx.position.set(-7, 0, 0); // Ajusta la posición del modelo
    scene.add(fbx);
  });

  // OBJ loader, mercedes sin texturas
  const objLoader = new OBJLoader();
  objLoader.load('./Mercedes-model/Mercedes.obj', (obj) => {
    scene.add(obj); 
  });
  
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
}

main();
