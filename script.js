(() => {
  const root = document.documentElement;
  const hero = document.querySelector(".amh-hero");

  if (!hero) return;

  const clamp01 = (n) => Math.max(0, Math.min(1, n));

  let target = 0;
  let current = 0;

  const progressHero = () => {
    const rect = hero.getBoundingClientRect();
    const vh = window.innerHeight || 1;

    const start = vh;
    const end = -rect.height;
    const p = (start - rect.top) / (start - end);

    return clamp01(p);
  };

  const updateTarget = () => {
    target = progressHero();
  };

  const tick = () => {
    current += (target - current) * 0.035;

    const t = performance.now() * 0.001;

    const scrollPush = (current - 0.5) * 26;
    const tilt = (current - 0.5) * 3.5;

    const osc = (time, period, phase, amp) =>
      Math.sin(((time + phase) * Math.PI * 2) / period) * amp;

    const indigoY =
      osc(t, 6.8, 0.0, 18) +
      osc(t, 2.9, 0.4, 5) +
      scrollPush * 0.65;

    const mintY =
      osc(t, 9.6, 1.1, 26) +
      osc(t, 3.6, 0.9, 6) +
      scrollPush * 0.45;

    const pinkY =
      osc(t, 7.9, 2.2, 22) +
      osc(t, 3.1, 1.7, 5) +
      scrollPush * 0.55;

    root.style.setProperty("--wave-indigo-y", `${indigoY.toFixed(2)}px`);
    root.style.setProperty("--wave-mint-y", `${mintY.toFixed(2)}px`);
    root.style.setProperty("--wave-pink-y", `${pinkY.toFixed(2)}px`);
    root.style.setProperty("--wave-tilt", `${tilt.toFixed(2)}deg`);

    requestAnimationFrame(tick);
  };

  window.addEventListener("scroll", updateTarget, { passive: true });
  window.addEventListener("resize", updateTarget);

  updateTarget();
  requestAnimationFrame(tick);
})();
