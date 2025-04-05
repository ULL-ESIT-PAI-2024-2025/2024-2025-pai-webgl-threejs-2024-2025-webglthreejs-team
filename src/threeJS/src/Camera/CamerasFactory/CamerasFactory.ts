import * as THREE from 'three';

export default interface CamerasFactory {
  createCameras(): THREE.Camera[] | THREE.Camera;
}