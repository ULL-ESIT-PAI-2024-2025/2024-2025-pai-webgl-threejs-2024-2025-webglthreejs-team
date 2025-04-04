import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Cube from '../figures/Shapes/Cube';

function main(): void {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  // Movemos la cmara hacia detras y arriba
  camera.position.z = 5;
  camera.position.y = 2;
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  const COLORS = ['blue', 'red', 'green', 'yellow', 'purple'];
  let initialPosition = 0;
  for (let i = 0; i < 5; i++) {
    const cube: Cube = new Cube(1, new THREE.MeshBasicMaterial({ color: COLORS[i] }));
    cube.setPosition(0, 0, -initialPosition);
    initialPosition += 2;
    scene.add(cube.getCube());
  }
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
}

main();