/**
 * Universidad de La Laguna  
 * Escuela Superior de Ingeniería y Tecnología  
 * Grado en Ingeniería Informática  
 * Programación de Aplicaciones Interactivas  
 *
 * @authors  
 * Roberto Padrón Castañeda, Samuel Montoya Diaz, Aarón Janno Barreto
 * @since April 1, 2025
 * @description example of perspective camera
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