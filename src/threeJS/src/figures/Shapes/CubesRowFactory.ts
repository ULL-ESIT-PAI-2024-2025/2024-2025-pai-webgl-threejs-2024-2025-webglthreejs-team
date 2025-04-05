import ShapesFactory from './ShapesFacotry';
import BasicCubeFactory from './CubeFactory';
import * as THREE from 'three';

export default class CubesRowFactory implements ShapesFactory {
  private static readonly colors: string[] = ['blue', 'red', 'green', 'yellow', 'purple'];
  public createShape(): THREE.Object3D {
    const cubes: THREE.Object3D = new THREE.Object3D();
    const factory: BasicCubeFactory = new BasicCubeFactory();
    let initialPosition: number = 0;
    for (let i = 0; i < 5; i++) {
      const cube: THREE.Mesh = factory.createShape(1, new THREE.MeshBasicMaterial({ color: CubesRowFactory.colors[i] }));
      cube.position.set(initialPosition, 0, 0);
      initialPosition -= 2;
      cubes.add(cube);
    }
    return cubes;
  }
}