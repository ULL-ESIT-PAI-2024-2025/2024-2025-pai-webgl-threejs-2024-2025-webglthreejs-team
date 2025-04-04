import * as THREE from 'three';
export default class BasePlane {
  private plane: THREE.Mesh;
  constructor(size: number, texture: THREE.Material) {
    this.plane = new THREE.Mesh(
      new THREE.PlaneGeometry(size, size),
      texture
    );
    // Rotar el plano para que esté horizontal
    this.plane.rotation.x = -Math.PI / 2; 
  }

  public setPosition(positionX: number, postionY: number, postionZ: number): void {
    this.plane.position.set(positionX, postionY, postionZ);
  }

  public setRotation(positionX: number, positionY: number, positionZ: number): void {
    this.plane.rotation.set(positionX, positionY, positionZ);
  }

  public Move(positionX: number, positionY: number, positionZ: number): void {   
    this.plane.position.x += positionX;
    this.plane.position.y += positionY;
    this.plane.position.z += positionZ;
  }

  public getPlane(): THREE.Mesh {
    return this.plane;
  }
}