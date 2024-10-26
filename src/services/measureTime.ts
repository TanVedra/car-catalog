import { performance } from "node:perf_hooks";

export function measureTime(): () => number {
  const start = performance.now();

  return (): number => {
    const end = performance.now();

    return Math.floor((end - start) % 1000);
  };
}
