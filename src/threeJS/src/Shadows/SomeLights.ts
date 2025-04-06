/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script creates a Three.js scene with a cube, sphere, and plane, and adds shadows to them. 
 * 
 * @since Sat 05 Apr 2025 
 * @author Aarón Jano Barreto
 * @author Roberto Padrón Castañeda
 * @author Samuel Montoya Diaz
 * 
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-webgl-threejs-2024-2025-webglthreejs-team.git}
 */


// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// function main(): void {
//   const scene = new THREE.Scene();
//   const camera = new THREE.PerspectiveCamera(75, window.innerWidth /window.innerHeight, 0.1, 1000);
//   camera.position.set(0, 2, 5);
//   const renderer = new THREE.WebGLRenderer();
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   document.body.appendChild(renderer.domElement);

//   // Sombras para el renderizador
//   renderer.shadowMap.enabled = true;

//   const directionalLeftLight = new THREE.DirectionalLight('white', 2);
//   directionalLeftLight.position.set(-6, 5, 5);

//   // Sombras para la luz puntual
//   directionalLeftLight.castShadow = true;

//   const directionalRightLight = new THREE.DirectionalLight('white', 5);
//   directionalRightLight.position.set(6, 5, 5);

//   // Sombras para la luz direccional
//   directionalRightLight.castShadow = true;
  
//   // Cambiamos el suavizado de la sombra
//   directionalRightLight.shadow.bias = -0.001;
//   scene.add(directionalRightLight);

//   scene.add(directionalLeftLight);
//   let cube: Cube = new Cube(1, new THREE.MeshPhongMaterial({ color: 'white' }));

//   // Sombras para el cubo
//   cube.getCube().castShadow = true;

//   cube.setPosition(0, 0, 2);


//   sphere.setPosition(0, 0.5, 0);
//   scene.add(sphere.getSphere());
//   let plane: BasePlane = new BasePlane(10, new THREE.MeshPhongMaterial({ color: 'grey' }));

//   // Sombras para el plano
//   plane.getPlane().receiveShadow = true;

//   plane.setPosition(0, -1, 0);
//   scene.add(plane.getPlane());
//   function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
//   }
//   animate();
//   const controls = new OrbitControls(camera, renderer.domElement);
//   controls.enableDamping = true;
// }

// main();

import * as THREE from 'three';
import PerspectiveFactory from '../Camera/CamerasFactory/PersepctiveFacotry';
import View from '../Lights/View';
import CubeFactory from '../figures/Shapes/CubeFactory';
import BasePlaneFactory from '../figures/Shapes/BasePlaneFactory';
import SphereFactory from '../figures/Shapes/SphereFactory';

function main(): void {
  const camerasFactory: PerspectiveFactory = new PerspectiveFactory();
  const sphereFactroy: SphereFactory = new SphereFactory();
  const cubeFactory: CubeFactory = new CubeFactory();
  const basePlaneFactory: BasePlaneFactory = new BasePlaneFactory();

  const directionalRightLight = new THREE.DirectionalLight('white', 5);
  directionalRightLight.position.set(6, 5, 5);
  const directionalLeftLight = new THREE.DirectionalLight('white', 2);
  directionalLeftLight.position.set(-6, 5, 5);

  const cube: THREE.Mesh = cubeFactory.createShape(1, new THREE.MeshPhongMaterial({ color: 'white' }));
  const sphere: THREE.Mesh = sphereFactroy.createShape(1, new THREE.MeshPhongMaterial({ color: 'white' }));
  cube.position.set(0, 0, 2);
  sphere.position.set(0, 0.5, 0);
  const shapes: THREE.Object3D = new THREE.Object3D();
  shapes.add(cube, sphere);
  shapes.add(basePlaneFactory.createShape(10, new THREE.MeshPhongMaterial({ color: 'grey'})));
  const view: View = new View(
    camerasFactory.createCameras(), 
    shapes,
    new THREE.Group().add(directionalRightLight, directionalLeftLight)
  );
  view.enableShadows();
  view.render((light) => {light.rotation.y += 0.01});
}

main();



