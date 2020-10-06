import { useRef, useEffect } from "react";

export default function useInterval(callback: any, delay: number | null) {
  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay === null) {
      return;
    }
    let id = setInterval(tick, delay);
    return () => {
      console.log("dispose interval");

      clearInterval(id);
    };
  }, [delay]);
}
