import * as THREE from 'three';
import Shape from './Shapes';

export default class BasePlane extends Shape {
  constructor(size: number, texture: THREE.Material) {
    super(size, texture);
  }

  protected override buildShape(size: number, texture: THREE.Material): THREE.Mesh {
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(size, size), texture);
    // Rotar el plano para que esté horizontal
    plane.rotation.x = -Math.PI / 2; 
    return plane;
  }
}


