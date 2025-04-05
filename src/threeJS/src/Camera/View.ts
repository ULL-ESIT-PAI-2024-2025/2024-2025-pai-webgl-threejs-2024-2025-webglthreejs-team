import * as THREE from 'three';
import Shapes from '../figures/Shapes/Shapes';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class CamerasView {
  private readonly scene: THREE.Scene = new THREE.Scene();
  private readonly renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ alpha: true });
  constructor(private readonly camera: THREE.Camera, private shapes: Shapes[] | Shapes) {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.camera.position.z = 5;
    camera.position.y = 2;
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
  }

  public getRenderer(): THREE.WebGLRenderer { return this.renderer; }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    if (this.shapes instanceof Array) {
      for (const shape of this.shapes) {
        this.scene.add(shape.getShape());
      }
    } else {
      this.scene.add(this.shapes.getShape());
    }
    this.renderer.render(this.scene, this.camera);
  }

  public render(): void {
    this.animate();
  }
}