/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script defines a main function that creates an orthographic camera and a cubes row shape using Three.js.
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
import OrthographicFactory from './CamerasFactory/OrthographicFactory';
import CubesRowFactory from '../figures/Shapes/CubesRowFactory';

function main(): void {
  const camerasFactory: OrthographicFactory = new OrthographicFactory();
  const camera: THREE.Camera = camerasFactory.createCameras();
  const cubesRowFactory: CubesRowFactory = new CubesRowFactory();
  const cubesRow: THREE.Object3D = cubesRowFactory.createShape();
  const view: CamerasView = new CamerasView(camera, cubesRow);
  view.render();
}

main();