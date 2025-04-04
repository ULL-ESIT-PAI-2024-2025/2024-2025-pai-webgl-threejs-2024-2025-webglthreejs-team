import ClockMarks from "./ColckMarks";
import ClockFace from "./ClockFace";

export default class ClockFaceBuilder {
  public static buildClockFace(radius: number, color: string): ClockFace {
    const marksColor = color === 'black' ? 'white' : 'black';
    const clockMarks = new ClockMarks(0.1, 0.1, marksColor);
    return new ClockFace(clockMarks, radius, color);
  }
}