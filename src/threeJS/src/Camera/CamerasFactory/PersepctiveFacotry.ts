import * as THREE from 'three';
import CamerasFactory from './CamerasFactory';

export default class PerspectiveFactory implements CamerasFactory {
  private static readonly fov: number = 75;
  private static readonly aspect: number = window.innerWidth / window.innerHeight;
  private static readonly near: number = 0.1;
  private static readonly far: number = 500;

  public createCameras(): THREE.Camera {
    const camera = new THREE.PerspectiveCamera(
      PerspectiveFactory.fov, 
      PerspectiveFactory.aspect, 
      PerspectiveFactory.near, 
      PerspectiveFactory.far
    );
    camera.position.z = 5;
    camera.position.y = 2;
    return camera;
  }
}