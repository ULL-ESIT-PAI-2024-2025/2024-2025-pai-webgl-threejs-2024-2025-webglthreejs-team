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

import Hand from "../Hand";
import ClockHands from "../ClockHands";

/**
 * Builder class responsible for creating and assembling clock hands.
 */
export default class ClockHandsBuilder {
  /**
   * Builds and returns a ClockHands object with hour, minute, and second hands.
   * @param width - The base width for the hour hand. Minute and second hands will be slightly thinner.
   * @param length - The base length for the hour and minute hands. The second hand will be longer.
   * @returns A fully assembled ClockHands instance.
   */
  public static buildClockHands(width: number, length: number): ClockHands {
    const hourHand = new Hand(width, length, 'black');   
    const minuteHand = new Hand(width - 0.05, length, 'grey');
    const secondHand = new Hand(width - 0.1, length + 0.8, 'red');
    return new ClockHands(hourHand, minuteHand, secondHand);
  }
}
