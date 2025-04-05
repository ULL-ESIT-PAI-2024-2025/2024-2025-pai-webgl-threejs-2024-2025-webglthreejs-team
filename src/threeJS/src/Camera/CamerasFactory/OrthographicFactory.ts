import * as THREE from 'three';
import CamerasFactory from './CamerasFactory';

export default class OrthographicFactory implements CamerasFactory {
  private static readonly left: number = 6;
  private static readonly right: number = -6;
  private static readonly top: number = 6;
  private static readonly bottom: number = -6;
  private static readonly near: number = 0.1;
  private static readonly far: number = 500;

  public createCameras(): THREE.Camera {
    const camera = new THREE.OrthographicCamera(
      OrthographicFactory.left, 
      OrthographicFactory.right, 
      OrthographicFactory.top, 
      OrthographicFactory.bottom, 
      OrthographicFactory.near, 
      OrthographicFactory.far
    );
    camera.position.z = 5;
    camera.position.y = 2;
    return camera;
  }
}