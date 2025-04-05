/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script defines a class that creates an orthographic camera using Three.js. 
 * 
 * @since  01 Apr 2025 
 * @author Aarón Jano Barreto
 * @author Roberto Padrón Castañeda
 * @author Samuel Montoya Diaz
 * 
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-webgl-threejs-2024-2025-webglthreejs-team.git}
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