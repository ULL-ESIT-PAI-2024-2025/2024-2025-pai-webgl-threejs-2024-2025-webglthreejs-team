import * as THREE from 'three';
import Shape from '../../figures/Shapes/Shapes';

export default class MultipleCamerasView {
  private readonly scene: THREE.Scene = new THREE.Scene();
  private readonly renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ alpha: true });
  constructor(private readonly  cameras: THREE.Camera[], private shapes: Shape[] | Shape) {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  private setDividedView(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.setScissorTest(true);
  
    // Cámara izquierda 
    this.renderer.setViewport(0, 0, width / 2, height);
    this.renderer.setScissor(0, 0, width / 2, height);
    this.renderer.render(this.scene, this.cameras[0]);

    // Cámara derecha 
    this.renderer.setViewport(width / 2, 0, width / 2, height);
    this.renderer.setScissor(width / 2, 0, width / 2, height);
    this.renderer.render(this.scene, this.cameras[1]);
  
    this.renderer.setScissorTest(false)
    this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
  }

  private eventHandler(): void {
    const camerasEvents = [
      document.getElementById('camera1') as HTMLButtonElement,
      document.getElementById('camera2') as HTMLButtonElement,
      document.getElementById('camera3') as HTMLButtonElement,
      document.getElementById('camera4') as HTMLButtonElement,
      document.getElementById('camera5') as HTMLButtonElement,
    ];
    const DiviededView = document.getElementById('DiviededView') as HTMLButtonElement;

    for (let i = 0; i < camerasEvents.length; i++) {
      camerasEvents[i].addEventListener('click', () => {
        this.renderer.setScissorTest(false);
        this.renderer.render(this.scene, this.cameras[i]);
      });
    }

    DiviededView.addEventListener('click', () => {
      this.setDividedView();
    });
  }

  public getRenderer(): THREE.WebGLRenderer { return this.renderer; }

  public render(): void {
    if (this.shapes instanceof Array) {
      for (const shape of this.shapes) {
        this.scene.add(shape.getShape());
      }
    } else {
      this.scene.add(this.shapes.getShape());
    }
    this.renderer.render(this.scene, this.cameras[0]);
    this.eventHandler();
  }
}
