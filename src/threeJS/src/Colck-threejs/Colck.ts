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

import ClockHands from "./ColckParts/ClockHands";
import ClockFace from "./ColckParts/ClockFace";
import ClockCase from "./ColckParts/ClockCase";
import * as THREE from 'three';

export default class Clock { 
  constructor(
    private readonly clockHands: ClockHands,
    private readonly clockFace: ClockFace,
    private readonly clockCase: ClockCase
  ) { }
  public updateClock(): void { this.clockHands.updateClockHands(); }

  public render(scene: THREE.Scene): void { 
    this.clockFace.renderClockFace(scene); 
    this.clockCase.renderClockCase(scene); 
    this.clockHands.renderClockHands(scene); 
  }
}