/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script defines a class that creates clock hands.
 * 
 * @since  01 Apr 2025 
 * @author Aarón Jano Barreto
 * @author Roberto Padrón Castañeda
 * @author Samuel Montoya Diaz
 * 
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-webgl-threejs-2024-2025-webglthreejs-team.git}
 */

import * as THREE from 'three';

/**
 * Represents a single clock hand with rotation and rendering functionality.
 */
export default class Hand {
  /**
   * The mesh representing the visual hand.
   * @private
   * @readonly
   */
  private readonly hand: THREE.Mesh;

  /**
   * Group used to rotate the hand around the origin (0, 0, 0).
   * @private
   * @readonly
   */
  private readonly handGroup: THREE.Group = new THREE.Group();

  /**
   * Creates a new Hand instance with specified size and color.
   * @param width - The width of the hand.
   * @param height - The height (length) of the hand.
   * @param color - The color of the hand.
   */
  constructor(width: number, height: number, color: string) {
    const geometry = new THREE.BoxGeometry(width, height, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: color });
    this.hand = new THREE.Mesh(geometry, material);
    this.hand.position.y = height / 2;

    // Adding the hand to a group to allow rotation around (0, 0, 0)
    // and not around its own center.
    this.handGroup.add(this.hand);
  }

  /**
   * Rotates the hand around the Z-axis.
   * @param angle - The angle in radians to rotate the hand.
   */
  public rotateHand(angle: number): void {
    this.handGroup.rotation.z = angle;
  }

  /**
   * Adds the hand group to the provided Three.js scene.
   * @param scene - The Three.js scene where the hand will be added.
   */
  public renderHand(scene: THREE.Scene): void {
    scene.add(this.handGroup);
  }
}
