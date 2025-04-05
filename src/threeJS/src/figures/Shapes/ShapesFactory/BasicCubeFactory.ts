import ShapesFactory from "./ShapesFacotry";
import Shape from "../Shapes";
import * as THREE from "three";
import Cube from "../Cube";

export default class BasicCubeFactory implements ShapesFactory {
  public createShape(): Shape {
    const material = new THREE.MeshBasicMaterial({ color: 'white' });
    const cube = new Cube(1, material);
    return cube
  }
}