/**
 * Universidad de La Laguna  
 * Escuela Superior de Ingeniería y Tecnología  
 * Grado en Ingeniería Informática  
 * Programación de Aplicaciones Interactivas  
 *
 * @authors  
 * Roberto Padrón Castañeda, Samuel Montoya Diaz, Aarón Janno Barreto
 * @since April 1, 2025
 * @file Othographical.ts
 * @description Ejemplo para la camra ortografica
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