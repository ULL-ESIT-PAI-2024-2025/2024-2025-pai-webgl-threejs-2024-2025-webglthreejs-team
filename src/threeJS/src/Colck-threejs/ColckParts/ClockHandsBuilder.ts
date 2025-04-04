import Hand from "./Hand";
import ClockHands from "./ClockHands";

export default class ClockHandsBuilder {
  public static buildClockHands(width: number, length: number): ClockHands {
    const hourHand = new Hand(width, length, 'black');   
    const minuteHand = new Hand(width - 0.05, length, 'grey');
    const secondHand = new Hand(width - 0.1, length + 0.8, 'red');
    return new ClockHands(hourHand, minuteHand, secondHand);
  }
}
