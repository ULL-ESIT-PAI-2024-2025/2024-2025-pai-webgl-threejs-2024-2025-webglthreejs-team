/**
 * Universidad de La Laguna  
 * Escuela Superior de Ingeniería y Tecnología  
 * Grado en Ingeniería Informática  
 * Programación de Aplicaciones Interactivas  
 *
 * @authors  
 * Roberto Padrón Castañeda, Samuel Montoya Diaz, Aarón Janno Barreto
 * @since April 1, 2025
 * @description 
 */

import * as THREE from 'three';
import CamerasFactory from './CamerasFactory';

export default class MultipleCamerasFactory implements CamerasFactory {
  private static readonly fov: number = 75;
  private static readonly aspect: number = window.innerWidth / window.innerHeight;
  private static readonly near: number = 0.1;
  private static readonly far: number = 500;

  /**
   * Creates and returns an array of five perspective cameras with predefined settings.
   * Each camera is positioned differently in the scene to provide various viewpoints.
   *
   * @returns {THREE.Camera[]} An array of `THREE.Camera` instances configured with the specified parameters.
   */
  public createCameras(): THREE.Camera[] {
    let cameras: THREE.Camera[] = [];
    for (let i = 0; i < 5; i++) {
      const camera = new THREE.PerspectiveCamera(
        MultipleCamerasFactory.fov,
        MultipleCamerasFactory.aspect,
        MultipleCamerasFactory.near,
        MultipleCamerasFactory.far
      );
      camera.position.x = 0;
      camera.position.y = 2;
      camera.position.z = 0;
      cameras.push(camera);
      
    }
    cameras[0].position.z = 5;
    cameras[1].position.z = -12;
    cameras[1].lookAt(0, 1, 0);
    cameras[2].position.x = 6;
    cameras[2].lookAt(0, 0, -2);
    cameras[3].position.x = -5;
    cameras[3].lookAt(0, 0, -2);
    cameras[4].position.y = 10;
    cameras[4].lookAt(0, 0, -4);
    return cameras;
  }
}