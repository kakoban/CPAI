import confetti from 'canvas-confetti';

export function fireGoalCelebrationConfetti() {
  confetti({
    particleCount: 80,
    angle: 60,
    spread: 70,
    origin: { x: 0.1, y: 0.95 },
    colors: ['#e0533c', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6', '#eab308'],
    zIndex: 9999,
  });

  confetti({
    particleCount: 80,
    angle: 120,
    spread: 70,
    origin: { x: 0.9, y: 0.95 },
    colors: ['#e0533c', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6', '#eab308'],
    zIndex: 9999,
  });

  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { x: 0.5, y: 0.8 },
      colors: ['#fbbf24', '#34d399', '#60a5fa', '#f472b6', '#a78bfa'],
      shapes: ['star', 'circle'],
      scalar: 1.2,
      zIndex: 9999,
    });
  }, 250);
}

export function triggerCelebration() {
  fireGoalCelebrationConfetti();
}

export function fireInteractiveSparkleConfetti(x = 0.5, y = 0.95) {
  confetti({
    particleCount: 45,
    spread: 60,
    origin: { x, y },
    colors: ['#10b981', '#e0533c', '#ec4899', '#6366f1'],
    zIndex: 9999,
  });
}
