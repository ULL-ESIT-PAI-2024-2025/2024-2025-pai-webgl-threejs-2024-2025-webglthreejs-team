import ShapesFactory from "./ShapesFacotry";
import * as THREE from "three";

export default class SphereFactory implements ShapesFactory {
  private static readonly segments: number = 32;
  public createShape(size: number, texture: THREE.Material): THREE.Object3D {
    const geometry = new THREE.SphereGeometry(size, SphereFactory.segments, SphereFactory.segments);
    const sphere = new THREE.Mesh(geometry, texture);
    return sphere;
  }
}