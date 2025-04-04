import * as THREE from 'three';
export default class Sphere {
  private sphere: THREE.Mesh;
  constructor(size: number, texture: THREE.Material) {
    this.sphere = new THREE.Mesh(
      new THREE.SphereGeometry(size, 32, 32),
      texture
    );
  }

  public setPosition(positionX: number, postionY: number, postionZ: number): void {
    this.sphere.position.set(positionX, postionY, postionZ);
  }

  public setRotation(positionX: number, positionY: number, positionZ: number): void {
    this.sphere.rotation.set(positionX, positionY, positionZ);
  }

  public Move(positionX: number, positionY: number, positionZ: number): void {   
    this.sphere.position.x += positionX;
    this.sphere.position.y += positionY;
    this.sphere.position.z += positionZ;
  }

  public getSphere(): THREE.Mesh {
    return this.sphere;
  }
}