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
import PerspectiveFactory from '../Camera/CamerasFactory/PersepctiveFacotry';
import View from '../Lights/View';
import BasePlaneFactory from '../figures/Shapes/BasePlaneFactory';
import SphereFactory from '../figures/Shapes/SphereFactory';

function main(): void {
  const camerasFactory: PerspectiveFactory = new PerspectiveFactory();
  const sphereFactroy: SphereFactory = new SphereFactory();
  const basePlaneFactory: BasePlaneFactory = new BasePlaneFactory();
  const shapes: THREE.Object3D = new THREE.Object3D();
  const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight('white', 5);
  directionalLight.position.set(5, 5, 5);
  shapes.add(sphereFactroy.createShape(1, new THREE.MeshPhongMaterial({ color: 'white'})));
  shapes.add(basePlaneFactory.createShape(10, new THREE.MeshPhongMaterial({ color: 'grey'})));
  const view: View = new View(
    camerasFactory.createCameras(), 
    new THREE.Object3D().add(
      sphereFactroy.createShape(1, new THREE.MeshPhongMaterial({ color: 'white'})),
      basePlaneFactory.createShape(10, new THREE.MeshPhongMaterial({ color: 'grey'}))
    ),
    new THREE.Group().add(directionalLight)
  );
  view.enableShadows();
  view.render((light) => {light.rotation.y += 0.01});
}

main();