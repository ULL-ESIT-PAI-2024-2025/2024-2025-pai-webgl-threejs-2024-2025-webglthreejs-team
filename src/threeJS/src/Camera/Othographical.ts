import * as THREE from 'three';
import Shape from '../figures/Shapes/Shapes';
import CamerasView from './View';
import OrthographicFactory from './CamerasFactory/OrthographicFactory';
import CubesRowFactory from '../figures/Shapes/ShapesFactory/CubesRowFactory';

function main(): void {
  const camerasFactory: OrthographicFactory = new OrthographicFactory();
  const camera: THREE.Camera = camerasFactory.createCameras();
  const cubesRowFactory: CubesRowFactory = new CubesRowFactory();
  const cubesRow: Shape[] = cubesRowFactory.createShape();
  const view: CamerasView = new CamerasView(camera, cubesRow);
  view.render();
}

main();