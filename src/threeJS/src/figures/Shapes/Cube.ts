import * as THREE from 'three';
import Shape from './Shapes';

export default class Cube extends Shape {
  constructor(size: number, texture: THREE.Material) {
    super(size, texture);
  }

  protected override buildShape(size: number, texture: THREE.Material): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const cube = new THREE.Mesh(geometry, texture);
    return cube;
  }
}