// Codifica o resultado de cada pessoa dentro do próprio link (depois do #).
// O texto fica embaralhado, então ninguém lê o nome olhando a URL,
// e o GitHub Pages nunca recebe essa parte do endereço.
const Codec = (() => {
  const KEY = 'amigo-secreto-v1';
  const enc = new TextEncoder();
  const dec = new TextDecoder();

  function seedFrom(salt) {
    let h = 2166136261;
    for (const b of [...salt, ...enc.encode(KEY)]) {
      h ^= b;
      h = Math.imul(h, 16777619);
    }
    return h >>> 0 || 0x9e3779b9;
  }

  function stream(seed) {
    let x = seed;
    return () => {
      x ^= x << 13; x >>>= 0;
      x ^= x >>> 17;
      x ^= x << 5; x >>>= 0;
      return x & 255;
    };
  }

  function toB64u(bytes) {
    let s = '';
    bytes.forEach(b => (s += String.fromCharCode(b)));
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function fromB64u(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) str += '=';
    return Uint8Array.from(atob(str), c => c.charCodeAt(0));
  }

  function encode(obj) {
    const data = enc.encode(JSON.stringify(obj));
    const salt = crypto.getRandomValues(new Uint8Array(4));
    const next = stream(seedFrom(salt));
    const out = new Uint8Array(4 + data.length);
    out.set(salt);
    data.forEach((b, i) => (out[4 + i] = b ^ next()));
    return toB64u(out);
  }

  function decode(str) {
    try {
      const all = fromB64u(str);
      const next = stream(seedFrom(all.slice(0, 4)));
      const data = all.slice(4).map(b => b ^ next());
      return JSON.parse(dec.decode(data));
    } catch {
      return null;
    }
  }

  return { encode, decode };
})();

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Neve leve no fundo. Desliga sozinha se a pessoa preferir menos movimento.
function startSnow(canvas) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  let w, h, flakes;
  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.width = innerWidth * dpr;
    h = canvas.height = innerHeight * dpr;
    const count = Math.round(Math.min(70, innerWidth / 12));
    flakes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() * 2 + 0.8) * dpr,
      s: (Math.random() * 0.5 + 0.25) * dpr,
      d: Math.random() * Math.PI * 2,
    }));
  }
  function tick() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    for (const f of flakes) {
      f.y += f.s;
      f.d += 0.01;
      f.x += Math.sin(f.d) * 0.3;
      if (f.y > h + 5) { f.y = -5; f.x = Math.random() * w; }
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  addEventListener('resize', resize);
  resize();
  tick();
}
