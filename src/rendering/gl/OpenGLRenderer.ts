import {mat4, vec4} from 'gl-matrix';
import Drawable from './Drawable';
import Camera from '../../Camera';
import {gl} from '../../globals';
import ShaderProgram, {ShaderData} from './ShaderProgram';

// In this file, `gl` is accessible because it is imported above
class OpenGLRenderer {
  constructor(public canvas: HTMLCanvasElement) {
  }

  setClearColor(r: number, g: number, b: number, a: number) {
    gl.clearColor(r, g, b, a);
  }

  setSize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  clear() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  render(camera: Camera, prog: ShaderProgram, shaderData : ShaderData, drawables: Array<Drawable>) {
    let model = shaderData.model;
    let viewProj = shaderData.viewProj;
    let color = shaderData.color;

    mat4.identity(model);
    mat4.multiply(viewProj, camera.projectionMatrix, camera.viewMatrix);
    prog.setModelMatrix(model);
    prog.setViewProjMatrix(viewProj);
    prog.setGeometryColor(color);
    prog.setTime(shaderData.time);

    for (let drawable of drawables) {
      prog.draw(drawable);
    }
  }

  drawNoise(camera: Camera, prog: ShaderProgram, shaderData : ShaderData, drawables: Array<Drawable>) {
    let model = shaderData.model;
    let viewProj = shaderData.viewProj;
    let color = shaderData.color;

    mat4.identity(model);
    mat4.multiply(viewProj, camera.projectionMatrix, camera.viewMatrix);
    prog.setModelMatrix(model);
    prog.setViewProjMatrix(viewProj);
    prog.setGeometryColor(color);
    prog.setTime(shaderData.time);

    for (let drawable of drawables) {
      prog.drawArray(drawable);
    }
  }
};

export default OpenGLRenderer;
