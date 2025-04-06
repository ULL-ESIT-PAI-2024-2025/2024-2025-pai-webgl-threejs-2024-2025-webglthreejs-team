/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script defines a class that creates a clock face.
 * 
 * @since  01 Apr 2025 
 * @author Aarón Jano Barreto
 * @author Roberto Padrón Castañeda
 * @author Samuel Montoya Diaz
 * 
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-webgl-threejs-2024-2025-webglthreejs-team.git}
 */


import ClockMarks from './ColckMarks';
import * as THREE from 'three';

/**
 * Represents the clock face, including the circular face and the hour marks.
 * Handles rendering the clock face and its marks onto the scene.
 */
export default class ClockFace {
  /**
   * The mesh representing the clock face.
   * @private
   * @readonly
   */
  private readonly clockFace: THREE.Mesh;

  /**
   * Creates a clock face with hour marks and a circular background.
   * @param clockMarks - The ClockMarks object which adds the hour marks to the clock face.
   * @param radius - The radius of the clock face.
   * @param color - The color of the clock face.
   */
  constructor(private clockMarks: ClockMarks, radius: number, color: string) {
    const clockGeometry = new THREE.CircleGeometry(radius, 100);
    const clockMaterial = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
    this.clockFace = new THREE.Mesh(clockGeometry, clockMaterial);
  }

  /**
   * Renders the clock face and the clock marks to the provided Three.js scene.
   * Adds the clock face and marks into the scene.
   * @param scene - The Three.js scene where the clock face and marks will be rendered.
   */
  public renderClockFace(scene: THREE.Scene): void {
    scene.add(this.clockFace);
    this.clockMarks.renderMarks(scene);
  }
}
