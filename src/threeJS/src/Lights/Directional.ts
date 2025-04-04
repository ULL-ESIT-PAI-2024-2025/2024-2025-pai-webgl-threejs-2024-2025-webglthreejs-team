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

  const directionalLight = new THREE.DirectionalLight('white', 5);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);
  let sphere: Sphere = new Sphere(1, new THREE.MeshLambertMaterial({ color: 'white' })); 
  scene.add(sphere.getSphere());
  let plane: BasePlane = new BasePlane(10, new THREE.MeshLambertMaterial({ color: 'grey' }));
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


