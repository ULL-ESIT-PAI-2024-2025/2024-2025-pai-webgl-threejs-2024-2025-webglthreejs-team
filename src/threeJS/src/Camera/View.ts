/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary Represents the graphical view in a `<canvas>` element.  
 * Responsible for handling user input events and  
 * drawing mathematical functions within a coordinate system.
 * 
 * @since  01 Apr 2025 
 * @author Aarón Jano Barreto
 * @author Roberto Padrón Castañeda
 * @author Samuel Montoya Diaz
 * 
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-webgl-threejs-2024-2025-webglthreejs-team.git}
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Class representing a camera view in a Three.js scene.
 * This class is responsible for rendering a scene with a camera and shapes,
 * and provides basic orbit controls for user interaction.
 */
export default class CamerasView {
  private readonly scene: THREE.Scene = new THREE.Scene();
  private readonly renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ alpha: true });

  /**
   * Creates an instance of CamerasView.
   * @param camera - The camera used to view the scene.
   * @param shapes - A single shape or an array of shapes to be added to the scene.
   */
  constructor(private readonly camera: THREE.Camera, private shapes: THREE.Object3D) {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.camera.position.z = 5;
    camera.position.y = 2;
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
  }
  /**
   * Animates the scene by rendering it continuously.
   * Adds the shapes to the scene and renders the scene with the camera.
   * @private
   */
  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.scene.add(this.shapes);
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Starts the rendering process by initiating the animation loop.
   */
  public render(): void {
    this.animate();
  }
}