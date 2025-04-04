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