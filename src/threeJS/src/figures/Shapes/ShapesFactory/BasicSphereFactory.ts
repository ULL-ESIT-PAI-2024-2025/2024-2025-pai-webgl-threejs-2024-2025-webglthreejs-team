import ShapesFactory from "./ShapesFacotry";
import Shape from "../Shapes";
import * as THREE from "three";
import Sphere from "../Sphere";
import { all } from "axios";

export default class BasicSphereFactory implements ShapesFactory {
  public createShape(): Shape {
    const material = new THREE.MeshBasicMaterial({ color: 'white' });
    const sphere = new Sphere(1, material);
    return sphere
  }
}