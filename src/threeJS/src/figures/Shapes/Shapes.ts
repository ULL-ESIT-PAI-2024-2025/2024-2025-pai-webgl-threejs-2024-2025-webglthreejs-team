import * as THREE from 'three';

export default abstract class Shape {
  private shape: THREE.Mesh;
    constructor(size: number, material: THREE.Material) {
      this.shape = this.buildShape(size, material);
    }
  
    protected abstract buildShape(size: number, material: THREE.Material): THREE.Mesh;

    public setPosition(positionX: number, postionY: number, postionZ: number): void {
      this.shape.position.set(positionX, postionY, postionZ);
    }
  
    public setRotation(positionX: number, positionY: number, positionZ: number): void {
      this.shape.rotation.set(positionX, positionY, positionZ);
    }
  
    public Move(positionX: number, positionY: number, positionZ: number): void {   
      this.shape.position.x += positionX;
      this.shape.position.y += positionY;
      this.shape.position.z += positionZ;
    }
  
    public getShape(): THREE.Mesh {
      return this.shape;
    }
  
}