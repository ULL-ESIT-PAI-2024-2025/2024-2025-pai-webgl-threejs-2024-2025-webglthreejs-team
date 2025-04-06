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

export default class Hand {
  private readonly hand: THREE.Mesh;
  private readonly handGroup: THREE.Group = new THREE.Group();
  constructor(width: number, height: number, color: string) {
    const geometry = new THREE.BoxGeometry(width, height, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: color });
    this.hand = new THREE.Mesh(geometry, material);
    this.hand.position.y = height / 2;
    this.handGroup.add(this.hand); // Para que giren sobre el centro del reloj y no sobre si mismas
  }

  public rotateHand(angle: number): void {
    this.handGroup.rotation.z = angle;
  }

  public renderHand(scene: THREE.Scene): void {
    scene.add(this.handGroup);
  }
}