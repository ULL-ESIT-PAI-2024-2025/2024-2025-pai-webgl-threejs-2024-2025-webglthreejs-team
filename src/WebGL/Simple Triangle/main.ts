/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Samuel Montoya Díaz, Roberto Padrón Castañeda y Aarón Jano Barreto
 * @since Marzo 23 2025
 * @description Programa principal que inicializa el canvas y dibuja un triángulo utilizando la clase Triangle.
 *
 */

import Triangle from "./triangle";

function main() {
  const triangle = new Triangle("canvas");
  triangle.draw();
}

main();