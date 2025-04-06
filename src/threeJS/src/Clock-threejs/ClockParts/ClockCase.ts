/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script defines a class that creates a clock case.
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
 * Represents the outer and inner cylindrical structure of the clock case.
 * Creates a 3D case using Two.js cylinders to enclose the clock face and hands.
 */
export default class ClockCase {
  /**
   * The outer cylindrical mesh of the clock case.
   * @private
   * @readonly
   */
  private readonly clockInCase: THREE.Mesh;

  /**
   * The inner cylindrical mesh of the clock case.
   * @private
   * @readonly
   */
  private readonly clockOutCase: THREE.Mesh;

  /**
   * Constructs a new clock case using two cylinders (outer and inner).
   *
   * @param radius - The outer radius of the clock case.
   * @param width - The width (depth) of the clock case.
   * @param color - The color of the clock case material.
   */
  constructor(radius: number, width: number, color: string) { 
    const caseGeometry = new THREE.CylinderGeometry(radius, radius, width, 100, 1, true);
    const caseMaterial = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });

    this.clockOutCase = new THREE.Mesh(caseGeometry, caseMaterial);
    this.clockOutCase.position.z = -0.2; 
    this.clockOutCase.rotation.x = Math.PI / 2; 

    const inCaseGeometry = new THREE.CylinderGeometry(radius - 0.01, radius - 0.01, width, 100, 1, false);
    this.clockInCase = new THREE.Mesh(inCaseGeometry, caseMaterial);
    this.clockInCase.position.z = -0.3; 
    this.clockInCase.rotation.x = Math.PI / 2;
  }

  /**
   * Adds the clock case meshes (inner and outer) to the provided Three.js scene.
   *
   * @param scene - The scene to which the clock case will be added.
   */
  public renderClockCase(scene: THREE.Scene): void {
    scene.add(this.clockOutCase);
    scene.add(this.clockInCase);
  }
}
