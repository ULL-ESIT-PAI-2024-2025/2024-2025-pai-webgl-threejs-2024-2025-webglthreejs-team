/**
 * Universidad de La Laguna  
 * Escuela Superior de Ingeniería y Tecnología  
 * Grado en Ingeniería Informática  
 * Programación de Aplicaciones Interactivas  
 *
 * @authors  
 * Roberto Padrón Castañeda, Samuel Montoya Diaz, Aarón Janno Barreto
 * @since April 1, 2025 
 * @file MultipleView.ts
 * @description This file defines the `MultipleCamerasView` class, which manages rendering a 3D scene
 * using multiple cameras in a Three.js environment. It provides functionality to switch between 
 * different camera views and render a divided view with two cameras simultaneously.
 * 
 * @module MultipleCamerasView
 */

import * as THREE from 'three';
import Shape from '../../figures/Shapes/Shapes';

/**
 * Class representing a view with multiple cameras in a Three.js scene.
 */
export default class MultipleCamerasView {
  private readonly scene: THREE.Scene = new THREE.Scene();
  private readonly renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ alpha: true });

  /**
   * Creates an instance of `MultipleCamerasView`.
   * 
   * @param cameras - An array of `THREE.Camera` objects to be used for rendering the scene.
   * @param shapes - A single `Shape` or an array of `Shape` objects to be added to the scene.
   */
  constructor(private readonly cameras: THREE.Camera[], private shapes: Shape[] | Shape) {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  /**
   * Configures the renderer to display a divided view using two cameras.
   * The left half of the screen displays the view from the first camera,
   * and the right half displays the view from the second camera.
   */
  private setDividedView(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.setScissorTest(true);

    this.renderer.setViewport(0, 0, width / 2, height);
    this.renderer.setScissor(0, 0, width / 2, height);
    this.renderer.render(this.scene, this.cameras[0]);
    
    this.renderer.setViewport(width / 2, 0, width / 2, height);
    this.renderer.setScissor(width / 2, 0, width / 2, height);
    this.renderer.render(this.scene, this.cameras[1]);

    this.renderer.setScissorTest(false);
    this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
  }

  /**
   * Sets up event listeners for camera selection buttons and the divided view button.
   * Allows users to switch between different camera views or activate the divided view.
   */
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

  /**
   * Retrieves the WebGL renderer used for rendering the scene.
   * 
   * @returns The `THREE.WebGLRenderer` instance.
   */
  public getRenderer(): THREE.WebGLRenderer {
    return this.renderer;
  }

  /**
   * Renders the scene using the first camera by default and sets up the event handlers.
   * Adds the provided shapes to the scene before rendering.
   */
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
