import ShapesFactory from "./ShapesFacotry";
import Shape from "../Shapes";
import * as THREE from "three";
import BasePlane from "../BasePlane";

export default class BasicBasePlaneFactory implements ShapesFactory {
  public createShape(): Shape {
    const material = new THREE.MeshBasicMaterial({ color: 'grey' });
    const basePlane = new BasePlane(10, material);
    return basePlane
  }
}