/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script defines a class that creates a row of cubes using Three.js.
 * 
 * @since Sat 05 Apr 2025 
 * @author Aarón Jano Barreto
 * @author Roberto Padrón Castañeda
 * @author Samuel Montoya Diaz
 * 
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-webgl-threejs-2024-2025-webglthreejs-team.git}
 */

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