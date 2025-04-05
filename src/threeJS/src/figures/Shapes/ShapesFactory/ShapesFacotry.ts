import Shape from "../Shapes";

export default interface ShapesFactory {
  createShape(): Shape[] | Shape;
}
