import * as THREE from 'three';
import Shape from '../figures/Shapes/Shapes';
import CamerasView from './View';
import PerspectiveFactory from './CamerasFactory/PersepctiveFacotry';
import CubesRowFactory from '../figures/Shapes/ShapesFactory/CubesRowFactory';

function main(): void {
  const camerasFactory: PerspectiveFactory = new PerspectiveFactory();
  const camera: THREE.Camera = camerasFactory.createCameras();
  const cubesRowFactory: CubesRowFactory = new CubesRowFactory();
  const cubesRow: Shape[] = cubesRowFactory.createShape();
  const view: CamerasView = new CamerasView(camera, cubesRow);
  view.render();
}

main();