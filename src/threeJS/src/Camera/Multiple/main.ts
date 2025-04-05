/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script defines the main function for the MultipleCamerasView application.
 * 
 * @since  01 Apr 2025 
 * @author Aarón Jano Barreto
 * @author Roberto Padrón Castañeda
 * @author Samuel Montoya Diaz
 * 
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-webgl-threejs-2024-2025-webglthreejs-team.git}
 */

import * as THREE from 'three';
import MultipleCamerasView from './MultipleView';
import MultipleCamerasFactory from '../CamerasFactory/MultipleCameraFactory';
import CubesRowFactory from '../../figures/Shapes/CubesRowFactory';

function main(): void {
  const camerasFactory: MultipleCamerasFactory = new MultipleCamerasFactory();
  const cameras: THREE.Camera[] = camerasFactory.createCameras();
  const cubesRowFactory: CubesRowFactory = new CubesRowFactory();
  const cubesRow: THREE.Object3D = cubesRowFactory.createShape();
  const view: MultipleCamerasView = new MultipleCamerasView(cameras, cubesRow);
  view.render();
}

main();