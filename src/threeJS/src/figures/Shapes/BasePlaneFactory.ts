import ShapesFactory from "./ShapesFacotry";
import * as THREE from "three";

export default class BasePlaneFactory implements ShapesFactory {
  public createShape(size: number, texture: THREE.Material): THREE.Mesh {
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(size, size), texture);
    plane.rotation.x = -Math.PI / 2; 
    return plane;
  }
}