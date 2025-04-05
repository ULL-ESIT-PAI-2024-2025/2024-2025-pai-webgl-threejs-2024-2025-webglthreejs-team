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


import ClockMarks from "./ColckMarks";
import * as THREE from 'three';

export default class ClockFace {
  private readonly clockFace: THREE.Mesh;
  constructor(private clockMarks: ClockMarks, radius: number, color: string) {
    const clockGeometry = new THREE.CircleGeometry(radius, 100);
    const clockMaterial = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
    this.clockFace = new THREE.Mesh(clockGeometry, clockMaterial);
  }
  
  public renderClockFace(scene: THREE.Scene): void {
    scene.add(this.clockFace);
    this.clockMarks.renderMarks(scene);
  }
}