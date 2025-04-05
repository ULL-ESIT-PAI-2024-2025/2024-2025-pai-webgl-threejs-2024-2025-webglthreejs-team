import * as THREE from 'three';
import Shape from './Shapes';

export default class Sphere extends Shape {
  private static readonly segments: number = 32;
  constructor(size: number, texture: THREE.Material) {
    super(size, texture);
  }

  protected override buildShape(size: number, texture: THREE.Material): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(size, Sphere.segments, Sphere.segments);
    const sphere = new THREE.Mesh(geometry, texture);
    return sphere;
  }
}