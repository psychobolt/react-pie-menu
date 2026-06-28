import {
  createContext,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from 'react';

type StartAngle = Partial<{
  [id: number]: number;
}>;

export interface Props {
  innerRadius?: number;
}

export const useAPI = ({ innerRadius }: Props) => {
  const [startAngle, setStartAngle] = useState<StartAngle>({});
  const [count, setCount] = useState(0);

  const indexAPI = useMemo(() => {
    let index = 0;
    const pool: number[] = [];
    return {
      useIndex() {
        const ref = useRef<number>(null);
        if (ref.current === null) {
          ref.current = pool.shift() ?? index++;
        }

        useEffect(() => {
          setCount((count) => count + 1);
          return () => {
            const index = ref.current;
            if (index === null) return;
            pool.push(index);
            pool.sort((a, b) => a - b);
            ref.current = null;
            setCount((count) => count - 1);
            setStartAngle(({ [index]: _, ...next }) => next);
          };
        }, []);

        return ref.current;
      }
    };
  }, []);

  const context = {
    startAngle,
    innerRadius,
    count
  };

  type Update = {
    startAngle?: StartAngle;
  };

  const batchUpdate = useCallback(
    (update: Update) => {
      setStartAngle((prev) =>
        Object.entries({ ...prev, ...update.startAngle }).reduce(
          (startAngle, [key, value]) => {
            const index = Number(key);
            if (index < count) startAngle[index] = value;
            return startAngle;
          },
          {} as StartAngle
        )
      );
    },
    [count]
  );

  return {
    ...indexAPI,
    ...context,
    batchUpdate
  };
};

type API = ReturnType<typeof useAPI>;

export const Context = createContext<API | null>(null);
