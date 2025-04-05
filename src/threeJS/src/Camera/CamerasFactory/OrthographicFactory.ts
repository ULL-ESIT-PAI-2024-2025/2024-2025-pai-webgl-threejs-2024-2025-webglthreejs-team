/**
 * Universidad de La Laguna  
 * Escuela Superior de Ingeniería y Tecnología  
 * Grado en Ingeniería Informática  
 * Programación de Aplicaciones Interactivas  
 *
 * @authors  
 * Roberto Padrón Castañeda, Samuel Montoya Diaz, Aarón Janno Barreto
 * @since April 1, 2025
 * @description Create a preestablished orthographic camera
 */

import * as THREE from 'three';
import CamerasFactory from './CamerasFactory';

export default class OrthographicFactory implements CamerasFactory {
  private static readonly left: number = 6;
  private static readonly right: number = -6;
  private static readonly top: number = 6;
  private static readonly bottom: number = -6;
  private static readonly near: number = 0.1;
  private static readonly far: number = 500;
  
  /**
   * Creates and returns an orthographic camera with predefined boundaries and position.   *
   * @returns {THREE.Camera} An instance of `THREE.OrthographicCamera` configured with the specified parameters.
   */
  public createCameras(): THREE.Camera {
    const camera = new THREE.OrthographicCamera(
      OrthographicFactory.left, 
      OrthographicFactory.right, 
      OrthographicFactory.top, 
      OrthographicFactory.bottom, 
      OrthographicFactory.near, 
      OrthographicFactory.far
    );
    camera.position.x = 5;
    camera.position.y = 2;
    camera.lookAt(0, 0, 0);
    return camera;
  }
}