import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Cube from '../figures/Shapes/Cube';
import BasePlane from '../figures/Shapes/BasePlane';
import Sphere from '../figures/Shapes/Sphere';

function main(): void {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth /window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2, 5);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Sombras para el renderizador
  renderer.shadowMap.enabled = true;

  const directionalLeftLight = new THREE.DirectionalLight('white', 2);
  directionalLeftLight.position.set(-6, 5, 5);

  // Sombras para la luz puntual
  directionalLeftLight.castShadow = true;

  const directionalRightLight = new THREE.DirectionalLight('white', 5);
  directionalRightLight.position.set(6, 5, 5);

  // Sombras para la luz direccional
  directionalRightLight.castShadow = true;
  
  // Cambiamos el suavizado de la sombra
  directionalRightLight.shadow.bias = -0.001;
  scene.add(directionalRightLight);

  scene.add(directionalLeftLight);
  let cube: Cube = new Cube(1, new THREE.MeshPhongMaterial({ color: 'white' }));

  // Sombras para el cubo
  cube.getCube().castShadow = true;

  cube.setPosition(0, 0, 2);
  scene.add(cube.getCube());
  let sphere: Sphere = new Sphere(1, new THREE.MeshLambertMaterial({ color: 'white' }));
  
  // Sombras para la esfera
  sphere.getSphere().castShadow = true;

  sphere.setPosition(0, 0.5, 0);
  scene.add(sphere.getSphere());
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