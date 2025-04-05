/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script defines a main function that creates a Three.js scene with a 
 * perspective camera and a row of cubes.
 * 
 * @since  01 Apr 2025 
 * @author Aarón Jano Barreto
 * @author Roberto Padrón Castañeda
 * @author Samuel Montoya Diaz
 * 
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-webgl-threejs-2024-2025-webglthreejs-team.git}
 */

import * as THREE from 'three';
import CamerasView from './View';
import PerspectiveFactory from './CamerasFactory/PersepctiveFacotry';
import CubesRowFactory from '../figures/Shapes/CubesRowFactory';

function main(): void {
  const camerasFactory: PerspectiveFactory = new PerspectiveFactory();
  const camera: THREE.Camera = camerasFactory.createCameras();
  const cubesRowFactory: CubesRowFactory = new CubesRowFactory();
  const cubesRow: THREE.Object3D = cubesRowFactory.createShape();
  const view: CamerasView = new CamerasView(camera, cubesRow);
  view.render();
}

main();