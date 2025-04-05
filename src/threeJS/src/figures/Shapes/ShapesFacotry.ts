import * as THREE from 'three';

export default interface ShapesFactory {
  createShape(size: number, material: THREE.Material): THREE.Object3D;
}
