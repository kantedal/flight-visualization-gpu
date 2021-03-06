import {Settings} from "../settings";
import SphereGeometry = THREE.SphereGeometry;
import ShaderMaterial = THREE.ShaderMaterial;

/*
 Shader imports
 */
const normalVert = require('raw-loader!glslify-loader!./shaders/planetNormals.vert');
const normalFrag = require('raw-loader!glslify-loader!./shaders/planetNormals.frag');

export default class PlanetGlow {
  private _renderer: THREE.WebGLRenderer;
  private _camera: THREE.Camera;
  private _scene: THREE.Scene;

  private _normalsRenderTarget: THREE.WebGLRenderTarget;
  private _normalsUniforms: any;

  constructor(renderer: THREE.WebGLRenderer, camera: THREE.Camera) {
    this._renderer = renderer;
    this._camera = camera;
    this._scene = new THREE.Scene();

    let width = Settings.width;
    let height = Settings.height;

    this._normalsUniforms = {
      sunPosition: { type: 'v3', value: null }
    };

    let planetNormalsShader = new ShaderMaterial({
      uniforms: this._normalsUniforms,
      vertexShader: normalVert,
      fragmentShader: normalFrag,
      blending: THREE.AdditiveBlending
    });
    let sphere = new THREE.Mesh(new SphereGeometry(10.2, 32, 32), planetNormalsShader);
    this._scene.add(sphere);

    this._normalsRenderTarget = new THREE.WebGLRenderTarget(width, height, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    });
  }

  public render(planetTexture: THREE.Texture, sunPosition: THREE.Vector3) {
    this._normalsUniforms.sunPosition.value = sunPosition;
    this._renderer.render(this._scene, this._camera, this._normalsRenderTarget);
  }

  get texture() { return this._normalsRenderTarget.texture; }
}