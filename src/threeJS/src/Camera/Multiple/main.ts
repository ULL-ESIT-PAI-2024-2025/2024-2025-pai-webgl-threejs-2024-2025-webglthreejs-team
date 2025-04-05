/**
 * Universidad de La Laguna  
 * Escuela Superior de Ingeniería y Tecnología  
 * Grado en Ingeniería Informática  
 * Programación de Aplicaciones Interactivas  
 *
 * @authors  
 * Roberto Padrón Castañeda, Samuel Montoya Diaz, Aarón Janno Barreto
 * @since April 1, 2025
 * @description example of multiple cameras
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