/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script defines a class that creates a clock.
 * 
 * @since  01 Apr 2025 
 * @author Aarón Jano Barreto
 * @author Roberto Padrón Castañeda
 * @author Samuel Montoya Diaz
 * 
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-webgl-threejs-2024-2025-webglthreejs-team.git}
 */

import ClockHands from "./ClockParts/ClockHands";
import ClockFace from "./ClockParts/ClockFace";
import ClockCase from "./ClockParts/ClockCase";
import * as THREE from 'three';

/**
 * Class representing a complete clock composed of hands, face, and case.
 */
export default class Clock {
  /**
   * Creates a new Clock instance.
   * @param clockHands - The ClockHands component responsible for showing and updating time.
   * @param clockFace - The ClockFace component responsible for the clock's visual face.
   * @param clockCase - The ClockCase component representing the body/frame of the clock.
   */
  constructor(
    private readonly clockHands: ClockHands,
    private readonly clockFace: ClockFace,
    private readonly clockCase: ClockCase
  ) {}

  /**
   * Updates the position of the clock hands based on the current time.
   */
  public updateClock(): void {
    this.clockHands.updateClockHands();
  }

  /**
   * Renders the clock components (face, case, and hands) into the given scene.
   * @param scene - The Three.js scene to which the clock will be added.
   */
  public render(scene: THREE.Scene): void {
    this.clockFace.renderClockFace(scene);
    this.clockCase.renderClockCase(scene);
    this.clockHands.renderClockHands(scene);
  }
}
