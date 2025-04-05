/**
 * Universidad de La Laguna  
 * Escuela Superior de Ingeniería y Tecnología  
 * Grado en Ingeniería Informática  
 * Programación de Aplicaciones Interactivas  
 *
 * @authors  
 * Roberto Padrón Castañeda, Samuel Montoya Diaz, Aarón Janno Barreto
 * @since April 1, 2025
 * @description Factory interface
 */

import * as THREE from 'three';

export default interface CamerasFactory {
  createCameras(): THREE.Camera[] | THREE.Camera;
}