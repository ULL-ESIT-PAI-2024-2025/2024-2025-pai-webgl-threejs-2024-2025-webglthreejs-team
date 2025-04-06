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
import ClockFace from "./ClockFace";

export default class ClockFaceBuilder {
  public static buildClockFace(radius: number, color: string): ClockFace {
    const marksColor = color === 'black' ? 'white' : 'black';
    const clockMarks = new ClockMarks(0.1, 0.1, marksColor);
    return new ClockFace(clockMarks, radius, color);
  }
}