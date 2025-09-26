"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// A lightweight three.js shader-based pixel/ripple/liquid effect
// Inspired by Bayer dithering demos; not a 1:1 port but similar vibe
export default function PixelBlast({
  variant = "circle", // "circle" | "grid"
  pixelSize = 6,
  color = "#B19EEF",
  patternScale = 3,
  patternDensity = 1.2,
  pixelSizeJitter = 0.5,
  enableRipples = true,
  rippleSpeed = 0.4,
  rippleThickness = 0.12,
  rippleIntensityScale = 1.5,
  liquid = true,
  liquidStrength = 0.12,
  liquidRadius = 1.2,
  liquidWobbleSpeed = 5,
  speed = 0.6,
  edgeFade = 0.25,
  transparent = true,
  className = "",
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 100;
    const height = container.clientHeight || 100;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: transparent });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      u_time: { value: 0 },
      u_res: { value: new THREE.Vector2(width, height) },
      u_color: { value: new THREE.Color(color) },
      u_pixelSize: { value: pixelSize },
      u_patternScale: { value: patternScale },
      u_patternDensity: { value: patternDensity },
      u_pixelSizeJitter: { value: pixelSizeJitter },
      u_enableRipples: { value: enableRipples ? 1.0 : 0.0 },
      u_rippleSpeed: { value: rippleSpeed },
      u_rippleThickness: { value: rippleThickness },
      u_rippleIntensityScale: { value: rippleIntensityScale },
      u_liquid: { value: liquid ? 1.0 : 0.0 },
      u_liquidStrength: { value: liquidStrength },
      u_liquidRadius: { value: liquidRadius },
      u_liquidWobbleSpeed: { value: liquidWobbleSpeed },
      u_speed: { value: speed },
      u_edgeFade: { value: edgeFade },
      u_variant: { value: variant === "circle" ? 1 : 0 },
    };

    const vertex = /* glsl */`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragment = /* glsl */`
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_res;
      uniform float u_time;
      uniform vec3 u_color;
      uniform float u_pixelSize;
      uniform float u_patternScale;
      uniform float u_patternDensity;
      uniform float u_pixelSizeJitter;
      uniform float u_enableRipples;
      uniform float u_rippleSpeed;
      uniform float u_rippleThickness;
      uniform float u_rippleIntensityScale;
      uniform float u_liquid;
      uniform float u_liquidStrength;
      uniform float u_liquidRadius;
      uniform float u_liquidWobbleSpeed;
      uniform float u_speed;
      uniform float u_edgeFade;
      uniform int u_variant;

      // Hash/Noise helpers
      float hash12(vec2 p){
        vec3 p3  = fract(vec3(p.xyx) * .1031);
        p3 += dot(p3, p3.yzx + 33.33);
        return fract((p3.x + p3.y) * p3.z);
      }

      // Simple value noise
      float vnoise(vec2 p){
        vec2 i=floor(p); vec2 f=fract(p);
        float a=hash12(i);
        float b=hash12(i+vec2(1.,0.));
        float c=hash12(i+vec2(0.,1.));
        float d=hash12(i+vec2(1.,1.));
        vec2 u=f*f*(3.-2.*f);
        return mix(a,b,u.x)+ (c-a)*u.y*(1.-u.x)+ (d-b)*u.x*u.y;
      }

      // Liquid UV warp
      vec2 liquidWarp(vec2 uv){
        float r = u_liquidRadius;
        float s = u_liquidStrength;
        float w = u_liquidWobbleSpeed;
        vec2 n = vec2(vnoise(uv * r + u_time * 0.05 * w), vnoise(uv * r * 1.3 - u_time * 0.04 * w));
        return uv + (n - 0.5) * s;
      }

      // Ripple from center
      float ripple(vec2 uv){
        vec2 c = vec2(0.5);
        float d = distance(uv, c);
        float w = 6.2831 * (d * (2.0 + u_patternDensity)) - u_time * u_rippleSpeed * 4.0;
        float s = sin(w);
        float band = smoothstep(u_rippleThickness, 0.0, abs(s));
        return band * u_rippleIntensityScale;
      }

      // Pixelate
      vec3 pixelate(vec2 uv){
        float px = max(1.0, u_pixelSize + (hash12(uv * 200.0 + u_time) - 0.5) * u_pixelSizeJitter * u_pixelSize);
        vec2 grid = u_res / px;
        vec2 cuv = (floor(uv * grid) + 0.5) / grid;
        float dither = vnoise(cuv * u_patternScale + u_time * 0.05 * u_speed);
        float shape = 1.0;
        if (u_variant == 1) {
          // circular pixel feel
          vec2 cell = fract(uv * grid) - 0.5;
          float rad = length(cell) * 2.0;
          shape = smoothstep(0.8, 0.5, rad);
        }
        vec3 base = u_color * (0.7 + 0.6 * dither) * shape;
        return base;
      }

      void main(){
        vec2 uv = vUv;
        if (u_liquid > 0.5) uv = liquidWarp(uv);

        vec3 col = pixelate(uv);
        if (u_enableRipples > 0.5) {
          float r = ripple(uv);
          col += vec3(r) * 0.25;
        }
        // Edge fade to blend into background
        float fx = smoothstep(0.0, u_edgeFade, uv.x) * smoothstep(0.0, u_edgeFade, 1.0 - uv.x);
        float fy = smoothstep(0.0, u_edgeFade, uv.y) * smoothstep(0.0, u_edgeFade, 1.0 - uv.y);
        float fade = clamp(fx * fy, 0.0, 1.0);
        col *= fade;
        gl_FragColor = vec4(col, fade);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: transparent,
      depthWrite: false,
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onResize = () => {
      const w = container.clientWidth || 100;
      const h = container.clientHeight || 100;
      renderer.setSize(w, h);
      material.uniforms.u_res.value.set(w, h);
    };

    const start = performance.now();
    const tick = () => {
      const t = (performance.now() - start) / 1000;
      material.uniforms.u_time.value = t * speed;
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("resize", onResize);
    tick();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  // Intentionally ignore exhaustive-deps for prop-driven uniforms set once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className={`pointer-events-none absolute inset-x-0 top-0 z-0 h-40 ${className}`} />;
}
