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

import ClockHands from "./ColckParts/ClockHands";
import ClockFace from "./ColckParts/ClockFace";
import ClockCase from "./ColckParts/ClockCase";
import ClockHandsBuilder from "./ColckParts/ClockHandsBuilder";
import ClockFaceBuilder from "./ColckParts/ClockFaceBuilder";
import Clock from "./Colck";

export default class ClockBuilder {
  public static buildClock(caseClolor: string, faceColor: string, size: number): Clock { 
    const clockHands: ClockHands = ClockHandsBuilder.buildClockHands(0.15, 1.0);
    const clockFace: ClockFace = ClockFaceBuilder.buildClockFace(size, faceColor);
    const clockCase = new ClockCase(size + 0.1, 0.5, caseClolor);
    return new Clock(clockHands, clockFace, clockCase);
  }
}