import * as THREE from 'three';
import Shape from '../../figures/Shapes/Shapes';
import MultipleCamerasView from './MultipleView';
import MultipleCamerasFactory from '../CamerasFactory/MultipleCameraFactory';
import CubesRowFactory from '../../figures/Shapes/ShapesFactory/CubesRowFactory';

function main(): void {
  const camerasFactory: MultipleCamerasFactory = new MultipleCamerasFactory();
  const cameras: THREE.Camera[] = camerasFactory.createCameras();
  const cubesRowFactory: CubesRowFactory = new CubesRowFactory();
  const cubesRow: Shape[] = cubesRowFactory.createShape();
  const view: MultipleCamerasView = new MultipleCamerasView(cameras, cubesRow);
  view.render();
}

main();