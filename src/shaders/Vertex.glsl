varying vec2 vUv;
uniform vec2 uDelta;

const float PI = 3.141592653589793;

void main() {
    vUv = uv;

    vec3 newPosition = position;

    newPosition.x += sin(uv.y * PI) * uDelta.x * 1.45;
    newPosition.y += sin(uv.x * PI) * uDelta.y * 1.45;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}