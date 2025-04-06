/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Samuel Montoya Díaz, Roberto Padrón Castañeda y Aarón Jano Barreto
 * @since March 23 2025
 * @description Triangle class that encapsulates the logic to draw a triangle using WebGL.
 * 
 * This code is stracted form the example provided in the WebGL Basics tutorial.
 * {@link https://www.tutorialspoint.com/webgl/webgl_basics.html}
 *
 */

class Triangle {
  private canvas: HTMLCanvasElement;
  private context: WebGLRenderingContext;
  /**
   * 
   * @param canvasID - The ID of the canvas element where the triangle will be drawn.
   * @description Constructor that initializes the canvas and WebGL context.
   */
  constructor(canvasID: string) {
    this.canvas = document.getElementById(canvasID) as HTMLCanvasElement;
    this.context = this.canvas.getContext('webgl')!;
  }
  /**
   * @description Main method that initializes the buffers, shaders, and draws the triangle.
   * It binds the attributes, clears the canvas, and renders the triangle.
   */
  public draw() {
    const vertexBuffer = this.initBuffers();
    const shaderProgram = this.initShaders();
    this.bindAttributes(vertexBuffer, shaderProgram);
    this.clearCanvas();
    this.render();
  }
  /**
   * 
   * @returns The vertex buffer containing the triangle coordinates.
   * @description Initializes the vertex buffer with the coordinates of the triangle.
   */
  private initBuffers(): WebGLBuffer {
    const vertices = [-0.5, 0.5, -0.5, -0.5, 0.0, -0.5];
    const vertexBuffer = this.context.createBuffer();
    this.context.bindBuffer(this.context.ARRAY_BUFFER, vertexBuffer);
    this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(vertices), this.context.STATIC_DRAW);
    this.context.bindBuffer(this.context.ARRAY_BUFFER, null);
    return vertexBuffer;
  }
  /**
   * 
   * @returns The shader program created from the vertex and fragment shaders.
   * @description Initializes the shaders for the triangle. It compiles the vertex and fragment shaders,
   * links them to a program, and checks for errors during compilation and linking.
   */
  private initShaders(): WebGLProgram {
    const vertCode = `
      attribute vec2 coordinates;
      void main(void) {
        gl_Position = vec4(coordinates, 0.0, 1.0);
      }`;
    const vertShader = this.context.createShader(this.context.VERTEX_SHADER)!;
    this.context.shaderSource(vertShader, vertCode);
    this.context.compileShader(vertShader);

    const fragCode = `
      void main(void) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);
      }`;
    const fragShader = this.context.createShader(this.context.FRAGMENT_SHADER)!;
    this.context.shaderSource(fragShader, fragCode);
    this.context.compileShader(fragShader);

    const shaderProgram = this.context.createProgram()!;
    this.context.attachShader(shaderProgram, vertShader);
    this.context.attachShader(shaderProgram, fragShader);
    this.context.linkProgram(shaderProgram);

    this.context.useProgram(shaderProgram); 
    return shaderProgram;
  }
  /**
   * 
   * @param vertexBuffer - The vertex buffer containing the triangle coordinates.
   * @param shaderProgram - The shader program used for rendering.
   * @description Binds the vertex buffer to the shader program attributes.
   * It sets the attribute pointer for the coordinates and enables the attribute array.
   */
  private bindAttributes(vertexBuffer: WebGLBuffer, shaderProgram: WebGLProgram): void {
    this.context.bindBuffer(this.context.ARRAY_BUFFER, vertexBuffer);
    const coord = this.context.getAttribLocation(shaderProgram, 'coordinates');
    this.context.vertexAttribPointer(coord, 2, this.context.FLOAT, false, 0, 0);
    this.context.enableVertexAttribArray(coord);
  }
  /**
   * @description Clears the canvas and sets the viewport.
   */
  private clearCanvas(): void {
    this.context.clearColor(0.5, 0.5, 0.5, 0.9); 
    this.context.enable(this.context.DEPTH_TEST); 
    this.context.clear(this.context.COLOR_BUFFER_BIT); 
    this.context.viewport(0, 0, this.canvas.width, this.canvas.height);
  }
  /**
   * @description Renders the triangle using the WebGL context.
   */
  private render(): void {
    this.context.drawArrays(this.context.TRIANGLES, 0, 3);
  }
}

export default Triangle;