'use client';

import { useEffect, useRef } from 'react';

// The one visual the brand owns: "alaz", the working edge of a flame.
// A single fragment shader draws a thin band of heat that drifts with noise,
// follows the pointer and brightens with scroll speed. Monochrome ink with the
// ember gradient only on the edge. ~40 KB of JS replaces 20 MB of stock video.
// variant: 'hero' (wide band), 'band' (thin line), 'quiet' (faint glow)
// Reduced motion / no WebGL: a static gradient fallback is drawn by CSS.

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;
const FRAG = `
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse; uniform float uIntensity; uniform float uBand; uniform float uY;
vec3 hash3(vec2 p){ vec3 q = vec3(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)), dot(p,vec2(419.2,371.9))); return fract(sin(q)*43758.5453); }
float noise(vec2 p){ vec2 i = floor(p); vec2 f = fract(p); f = f*f*(3.0-2.0*f);
  float a = hash3(i).x, b = hash3(i+vec2(1,0)).x, c = hash3(i+vec2(0,1)).x, d = hash3(i+vec2(1,1)).x;
  return mix(mix(a,b,f.x), mix(c,d,f.x), f.y); }
float fbm(vec2 p){ float v = 0.0; float a = 0.5; for(int i=0;i<5;i++){ v += a*noise(p); p = p*2.03 + vec2(1.7,9.2); a *= 0.5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  float aspect = uRes.x / uRes.y;
  vec2 q = vec2(uv.x * aspect, uv.y);
  float t = uTime * 0.06;
  // the edge: a horizontal line warped by noise, pulled gently toward the pointer
  float warp = fbm(q * 1.6 + vec2(t, -t * 0.7)) - 0.5;
  float pull = (uMouse.y - uY) * 0.25 * smoothstep(0.9, 0.0, abs(uv.x - uMouse.x));
  float edge = uY + warp * 0.18 + pull;
  float d = uv.y - edge;
  float heat = exp(-abs(d) * (40.0 / uBand));          // thin bright core
  float glow = exp(-abs(d) * (6.0 / uBand)) * 0.35;    // soft halo
  float grain = (hash3(gl_FragCoord.xy + uTime).x - 0.5) * 0.03;
  vec3 ink = vec3(0.039);
  vec3 hot = vec3(1.0, 0.957, 0.902);
  vec3 soft = vec3(1.0, 0.706, 0.329);
  vec3 ember = vec3(1.0, 0.353, 0.122);
  vec3 col = mix(ember, soft, smoothstep(0.0, 0.6, heat));
  col = mix(col, hot, smoothstep(0.6, 1.0, heat));
  float a = clamp((heat + glow) * uIntensity, 0.0, 1.0);
  // below the edge the ink cools to black, above it stays dark with faint embers
  float ash = fbm(q * 3.0 - vec2(0.0, t * 2.0)) * 0.06 * smoothstep(0.0, 0.4, d) * uIntensity;
  vec3 outc = mix(ink + ash, col, a) + grain;
  gl_FragColor = vec4(outc, 1.0);
}`;

const VARIANTS = { hero: { band: 1.0, intensity: 0.9, y: 0.2 }, band: { band: 0.45, intensity: 0.8, y: 0.62 }, quiet: { band: 1.4, intensity: 0.35, y: 0.08 } };

export default function HeatField({ variant = 'hero', className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return undefined;
    const cfg = VARIANTS[variant] ?? VARIANTS.hero;

    const compile = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    gl.useProgram(program);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (name) => gl.getUniformLocation(program, name);
    const uRes = u('uRes'); const uTime = u('uTime'); const uMouse = u('uMouse'); const uIntensity = u('uIntensity'); const uBand = u('uBand'); const uY = u('uY');
    gl.uniform1f(uBand, cfg.band); gl.uniform1f(uY, cfg.y);

    const mouse = { x: 0.5, y: cfg.y, tx: 0.5, ty: cfg.y };
    let intensity = cfg.intensity; let targetIntensity = cfg.intensity;
    let frame; let visible = false; let lastScroll = window.scrollY; let lastT = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor(canvas.clientWidth * dpr); const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    const draw = (t) => {
      resize();
      mouse.x += (mouse.tx - mouse.x) * 0.05; mouse.y += (mouse.ty - mouse.y) * 0.05;
      intensity += (targetIntensity - intensity) * 0.08;
      targetIntensity += (cfg.intensity - targetIntensity) * 0.05;
      gl.uniform1f(uTime, t / 1000); gl.uniform2f(uMouse, mouse.x, mouse.y); gl.uniform1f(uIntensity, intensity);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (t) => { if (t - lastT > 1000 / 45) { draw(t); lastT = t; } frame = requestAnimationFrame(loop); };

    if (reduced) { draw(1000); return undefined; }

    const onMove = (e) => { const r = canvas.getBoundingClientRect(); mouse.tx = (e.clientX - r.left) / r.width; mouse.ty = 1 - (e.clientY - r.top) / r.height; };
    const onScroll = () => { const v = Math.min(1, Math.abs(window.scrollY - lastScroll) / 60); lastScroll = window.scrollY; targetIntensity = Math.min(cfg.intensity + 0.6, targetIntensity + v * 0.5); };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(loop);
      if (!visible && frame) { cancelAnimationFrame(frame); frame = null; }
    }, { rootMargin: '100px' });
    io.observe(canvas);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [variant]);

  return <canvas ref={ref} className={`heat-field heat-field--${variant} ${className}`} aria-hidden="true" />;
}
