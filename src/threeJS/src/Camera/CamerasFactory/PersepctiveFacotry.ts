/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script defines a class that creates a perspective camera using Three.js.
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

export default class PerspectiveFactory implements CamerasFactory {
  private static readonly fov: number = 75;
  private static readonly aspect: number = window.innerWidth / window.innerHeight;
  private static readonly near: number = 0.1;
  private static readonly far: number = 500;

  /**
   * Creates and returns a new perspective camera with predefined settings.
   *
   * @returns {THREE.Camera} A perspective camera instance configured with the
   * specified field of view, aspect ratio, near clipping plane, and far clipping plane.
   * The camera's position is set to z = 5 and y = 2.
   */
  public createCameras(): THREE.Camera {
    const camera = new THREE.PerspectiveCamera(
      PerspectiveFactory.fov, 
      PerspectiveFactory.aspect, 
      PerspectiveFactory.near, 
      PerspectiveFactory.far
    );
    camera.position.x = 5;
    camera.position.y = 2;
    camera.lookAt(0, 0, 0);
    return camera;
  }
}