import * as THREE from 'three';
export default class Cube {
  private cube: THREE.Mesh;
  constructor(size: number, texture: THREE.Material) {
    this.cube = new THREE.Mesh(
      new THREE.BoxGeometry(size, size, size),
      texture
    );
  }

  public setPosition(positionX: number, postionY: number, postionZ: number): void {
    this.cube.position.set(positionX, postionY, postionZ);
  }

  public setRotation(positionX: number, positionY: number, positionZ: number): void {
    this.cube.rotation.set(positionX, positionY, positionZ);
  }

  public Move(positionX: number, positionY: number, positionZ: number): void {   
    this.cube.position.x += positionX;
    this.cube.position.y += positionY;
    this.cube.position.z += positionZ;
  }

  public getCube(): THREE.Mesh {
    return this.cube;
  }
}