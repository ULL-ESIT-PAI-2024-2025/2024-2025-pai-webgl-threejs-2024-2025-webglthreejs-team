/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * 
 * @summary This script defines a class that creates clocks.
 * 
 * @since  01 Apr 2025 
 * @author Aarón Jano Barreto
 * @author Roberto Padrón Castañeda
 * @author Samuel Montoya Diaz
 * 
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-webgl-threejs-2024-2025-webglthreejs-team.git}
 */

import ClockHands from './ClockParts/ClockHands';
import ClockFace from './ClockParts/ClockFace';
import ClockCase from './ClockParts/ClockCase';
import ClockHandsBuilder from './ClockParts/Builders/ClockHandsBuilder';
import ClockFaceBuilder from './ClockParts/Builders/ClockFaceBuilder';
import Clock from './Colck';

/**
 * Utility class responsible for assembling and returning a complete Clock object.
 */
export default class ClockBuilder {
  /**
   * Builds a complete Clock using provided colors and size.
   * @param caseClolor - The color of the outer clock case.
   * @param faceColor - The color of the clock face.
   * @param size - The size (radius) of the clock face.
   * @returns A fully constructed Clock instance.
   */
  public static buildClock(caseClolor: string, faceColor: string, size: number): Clock { 
    const clockHands: ClockHands = ClockHandsBuilder.buildClockHands(0.15, 1.0);
    const clockFace: ClockFace = ClockFaceBuilder.buildClockFace(size, faceColor);
    const clockCase = new ClockCase(size + 0.1, 0.5, caseClolor);
    return new Clock(clockHands, clockFace, clockCase);
  }
}
