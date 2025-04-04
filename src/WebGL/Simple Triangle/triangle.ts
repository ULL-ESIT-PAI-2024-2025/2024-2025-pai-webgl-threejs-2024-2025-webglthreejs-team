/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Samuel Montoya Díaz, Roberto Padrón Castañeda y Aarón Jano Barreto
 * @since Marzo 23 2025
 * @description Clase triángulo simple que dibuja un triángulo en un canvas HTML utilizando WebGL.
 *
 */

class Triangle {
  private canvas: HTMLCanvasElement;
  private context: WebGLRenderingContext;
  /**
   * Constructor de la clase Triangle.
   * @param canvasID - ID del canvas HTML donde se dibujará el triángulo.
   * @description Inicializa el canvas y el contexto WebGL.
   */
  constructor(canvasID: string) {
    /* Step1: Prepare the canvas and get WebGL context */
    this.canvas = document.getElementById(canvasID) as HTMLCanvasElement;
    this.context = this.canvas.getContext('webgl')!;
  }

  /**
   * Dibuja un triángulo en el canvas utilizando WebGL.
   * @description Define la geometría del triángulo, compila los shaders, asocia los buffers y dibuja el triángulo.
   */
  public draw() {
    /* Step2: Define the geometry and store it in buffer objects */
    const vertices = [-0.5, 0.5, -0.5, -0.5, 0.0, -0.5,];
    const vertexBuffer = this.context.createBuffer();
    this.context.bindBuffer(this.context.ARRAY_BUFFER, vertexBuffer);
    this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(vertices), this.context.STATIC_DRAW);
    this.context.bindBuffer(this.context.ARRAY_BUFFER, null);

    /* Step3: Create and compile Shader programs */
    const vertCode =
      'attribute vec2 coordinates;' + 
      'void main(void) {' + ' gl_Position = vec4(coordinates,0.0, 1.0);' + '}'; // GLSL language

    const vertShader = this.context.createShader(this.context.VERTEX_SHADER)!;
    this.context.shaderSource(vertShader, vertCode);
    this.context.compileShader(vertShader);

    const fragCode = 
      'void main(void) {' + 
      'gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' + '}';

    const fragShader = this.context.createShader(this.context.FRAGMENT_SHADER)!;
    this.context.shaderSource(fragShader, fragCode);
    this.context.compileShader(fragShader);

    const shaderProgram = this.context.createProgram();
    this.context.attachShader(shaderProgram, vertShader); 
    this.context.attachShader(shaderProgram, fragShader);
    this.context.linkProgram(shaderProgram);
    this.context.useProgram(shaderProgram);

    /* Step 4: Associate the shader programs to buffer objects */
    this.context.bindBuffer(this.context.ARRAY_BUFFER, vertexBuffer);
    const coord = this.context.getAttribLocation(shaderProgram, "coordinates");
    this.context.vertexAttribPointer(coord, 2, this.context.FLOAT, false, 0, 0);
    this.context.enableVertexAttribArray(coord);

    /* Step5: Drawing the required object (triangle) */
    this.context.clearColor(0.5, 0.5, 0.5, 0.9);
    this.context.enable(this.context.DEPTH_TEST); 
    this.context.clear(this.context.COLOR_BUFFER_BIT);  
    this.context.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawArrays(this.context.TRIANGLES, 0, 3);
  }
}

export default Triangle;