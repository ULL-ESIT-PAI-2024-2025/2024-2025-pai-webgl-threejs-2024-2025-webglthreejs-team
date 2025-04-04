import * as THREE from 'three';
import Clock from './Colck';
import ClockBuilder from './ClockBuilder';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class ClockView {
  private readonly scene: THREE.Scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly clock: Clock;
  private readonly renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ alpha: true });
  constructor() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.clock = ClockBuilder.buildClock('black', 'white', 2);
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 500);
    this.camera.position.z = 5;
    this.clock.render(this.scene);    
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
  }

  public getRenderer(): THREE.WebGLRenderer { return this.renderer; }

  public render(): void {
    this.clock.updateClock();
    this.renderer.render(this.scene, this.camera);
  }
}