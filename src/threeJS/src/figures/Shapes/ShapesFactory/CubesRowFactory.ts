import ShapesFactory from './ShapesFacotry';
import Shape from '../Shapes';
import * as THREE from 'three';
import Cube from '../Cube';

export default class CubesRowFactory implements ShapesFactory {
  private static readonly colors: string[] = ['blue', 'red', 'green', 'yellow', 'purple'];
  public createShape(): Shape[] {
    const cubes: Shape[] = [];
    let initialPosition: number = 0;
    for (let i = 0; i < 5; i++) {
      const cube: Cube = new Cube(
        1, 
        new THREE.MeshBasicMaterial({ color: CubesRowFactory.colors[i] })
      );
      cube.setPosition(0, 0, initialPosition);
      initialPosition -= 2;
      cubes.push(cube);
    }
    return cubes;
  }
}