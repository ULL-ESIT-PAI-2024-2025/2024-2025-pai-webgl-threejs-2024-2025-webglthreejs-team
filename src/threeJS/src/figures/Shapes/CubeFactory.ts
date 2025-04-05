import ShapesFactory from "./ShapesFacotry";
import * as THREE from "three";

export default class CubeFactory implements ShapesFactory {
  public createShape(size: number, texture: THREE.Material): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const cube = new THREE.Mesh(geometry, texture);
    return cube;
  }
}