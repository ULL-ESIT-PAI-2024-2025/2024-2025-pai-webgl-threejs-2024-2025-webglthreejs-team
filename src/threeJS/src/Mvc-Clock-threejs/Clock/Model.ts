/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * Patrón Modelo Vista Controlador
 *
 * @since Tue 25 Mar 2025
 * @desc Controller class for the shopping list
 * @author Guillermo Silva González
 * @author Himar Edhey Hernández Alonso
 * @author Samuel Rodríguez Cuesta
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-mvc-2425-pai-mvc-team}
 * @see {@link https://github.com/taniarascia/mvc}
 */

import type { Cocktail } from '../../cocktail';
import type { Model } from '../../core/model';

/**
 * @class CocktailAppModel
 * @implements Model<Cocktail[], string>
 * @description Handles data retrieval and transformation for the Cocktail app.
 */
export class CocktailAppModel implements Model<{hours: number, minutes: number, seconds: number}> {
  /**
   * Fetches cocktail data based on the current search filter.
   *
   * @returns {Promise<Cocktail[]>} A promise resolving to an array of `Cocktail` objects.
   */
  public async fetchData(): Promise<Cocktail[]> {
    if (!this.filter) return [];
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.filter}`
    );
    const json: { drinks: any[] } = await response.json();
    return json.drinks.map(this.transform);
  }
}