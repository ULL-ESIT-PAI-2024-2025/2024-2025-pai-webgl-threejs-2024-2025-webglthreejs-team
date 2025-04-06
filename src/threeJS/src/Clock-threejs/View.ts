/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script defines a class that creates a clock view.
 * 
 * @since  01 Apr 2025 
 * @author Aarón Jano Barreto
 * @author Roberto Padrón Castañeda
 * @author Samuel Montoya Diaz
 * 
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-webgl-threejs-2024-2025-webglthreejs-team.git}
 */

import * as THREE from 'three';
import Clock from './Colck';
import ClockBuilder from './ClockBuilder';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Class responsible for rendering and animating a 3D clock in a Three.js scene.
 */
export default class ClockView {
  /**
   * The Three.js scene where the clock will be rendered.
   * @private
   * @readonly
   */
  private readonly scene: THREE.Scene = new THREE.Scene();

  /**
   * The camera used to view the scene.
   * @private
   * @readonly
   */
  private readonly camera: THREE.PerspectiveCamera;

  /**
   * The clock object that will be displayed and animated.
   * @private
   * @readonly
   */
  private readonly clock: Clock;

  /**
   * The renderer used to display the scene.
   * @private
   * @readonly
   */
  private readonly renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ alpha: true });

  /**
   * Creates an instance of ClockView, initializes the scene, camera, controls, and clock.
   */
  constructor() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.clock = ClockBuilder.buildClock('black', 'white', 2);
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      500
    );
    this.camera.position.z = 5;
    document.body.appendChild(this.renderer.domElement);
    this.clock.render(this.scene);
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
  }

  /**
   * Private method that runs the animation loop.
   * Continuously updates the clock and renders the scene.
   * @private
   */
  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.clock.updateClock();
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Starts the rendering and animation loop.
   */
  public render(): void {
    this.animate();
  }
}