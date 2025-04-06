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
import PerspectiveFactory from '../Camera/CamerasFactory/PersepctiveFacotry';
import View from './View';
import CubeFactory from '../figures/Shapes/CubeFactory';
import BasePlaneFactory from '../figures/Shapes/BasePlaneFactory';

function main(): void {
  const camerasFactory: PerspectiveFactory = new PerspectiveFactory();
  const cubesFactory: CubeFactory = new CubeFactory();
  const basePlaneFactory: BasePlaneFactory = new BasePlaneFactory();
  const pointLight: THREE.PointLight = new THREE.PointLight('white', 25, 7);
  pointLight.position.set(1, 2, 1);
  const view: View = new View(
    camerasFactory.createCameras(), 
    new THREE.Object3D().add(
      cubesFactory.createShape(1, new THREE.MeshPhongMaterial({ color: 'white'})),
      basePlaneFactory.createShape(10, new THREE.MeshPhongMaterial({ color: 'grey'}))
    ), 
    new THREE.Group().add(pointLight)
  );
  view.render(() => {});
}

main();
