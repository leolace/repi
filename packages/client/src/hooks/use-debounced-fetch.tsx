import React from "react";

export function useDebounced<T>(
  delay: number,
  resetDependencies: unknown[] = []
) {
  const [result, setResult] = React.useState<T | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = React.useCallback(
    async (func: () => T) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setIsLoading(true);
      setResult(null);

      return new Promise<T | null>((resolve) => {
        timerRef.current = setTimeout(async () => {
          const data = await func();
          setResult(data);
          setIsLoading(false);
          resolve(data);
        }, delay);
      });
    },
    [delay]
  );

  React.useEffect(() => {
    return () => {
      setIsLoading(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, resetDependencies);

  return { debouncedFunction, isLoading, result };
}
