import ShaderMaterial = THREE.ShaderMaterial;
import {invertNormals} from "../utils/invertNormals";
import {Settings} from "../settings";

/*
 Shader imports
 */
const starsVert = require('raw-loader!glslify-loader!./shaders/stars.vert');
const starsFrag = require('raw-loader!glslify-loader!./shaders/stars.frag');

export default class Stars {
  private _scene: THREE.Scene;
  private _starsRenderTarget: THREE.WebGLRenderTarget;

  constructor(private _renderer: THREE.WebGLRenderer, private _camera: THREE.Camera) {
    this._scene = new THREE.Scene();

    this._starsRenderTarget = new THREE.WebGLRenderTarget(Settings.width, Settings.height, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBFormat,
      type: THREE.FloatType,
    });

    let starsShader = new ShaderMaterial({
      vertexShader: starsVert,
      fragmentShader: starsFrag,
      blending: THREE.AdditiveBlending
    });

    let starsSphereGeometry = new THREE.SphereGeometry(100, 30, 30);
    invertNormals(starsSphereGeometry);

    let sphere = new THREE.Mesh(starsSphereGeometry, starsShader);
    let earth = new THREE.Mesh(new THREE.SphereGeometry(10, 30, 30), new THREE.MeshBasicMaterial({color: 0x000000}));
    this._scene.add(sphere);
    this._scene.add(earth);
  }

  public render() {
    this._renderer.render(this._scene, this._camera, this._starsRenderTarget);
  }

  get texture(): THREE.Texture { return this._starsRenderTarget.texture; }
}