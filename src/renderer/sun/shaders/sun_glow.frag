#pragma glslify: blur = require("glsl-fast-gaussian-blur/13")

uniform vec2 resolution;
uniform sampler2D inputTexture;
uniform vec2 direction;

varying vec2 vUv;

//void main() {
//  vec2 uv = vec2(gl_FragCoord.xy / resolution.xy);
//  gl_FragColor = blur(inputTexture, uv, resolution.xy, direction);
//}

void main() {
    float blurFactor = 2.0;
    vec3 clr = (
        texture2D( inputTexture, vUv + blurFactor * 2.0 * direction / resolution ).xyz +
        texture2D( inputTexture, vUv + blurFactor * 1.0 * direction / resolution ).xyz +
        texture2D( inputTexture, vUv + blurFactor * 0.0 * direction / resolution ).xyz +
        texture2D( inputTexture, vUv - blurFactor * 1.0 * direction / resolution ).xyz +
        texture2D( inputTexture, vUv - blurFactor * 2.0 * direction / resolution ).xyz
    );

    vec3 minVal = vec3(0.0);
    vec3 maxVal = vec3(5.0);
    gl_FragColor = vec4(clamp(clr / 5.0, minVal, maxVal), 1.0);
}