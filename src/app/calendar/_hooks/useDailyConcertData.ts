import { Concert } from "@/types/concert";
import { getDayTimestamps } from "@/util/dateconverters";
import { useEffect, useState } from "react";

type Return = {
  data: Array<{
    _id: string;
    _index: string;
    _score: number;
    _source: Concert;
  }>;
  isLoading: boolean;
};

export function useDailyConcertData(
  d: number | undefined,
  m: number | undefined,
  y: number | undefined
): Return {
  const [data, setData] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (d !== undefined && m !== undefined && y !== undefined) {
      const { start, end } = getDayTimestamps(d, m, y);
      fetch(
        `https://api.classicals.live/concerts/epochrange?start=${start}&end=${end}`
      )
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          setData(data.data);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    }
  }, [d, m, y]);

  return {
    data: data,
    isLoading: isLoading,
  };
}
