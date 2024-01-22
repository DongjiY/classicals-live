import { Concert } from "@/types/concert";
import { getMonthStartEndTimestamps } from "@/util/dateconverters";
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

export function useMonthlyConcertData(
  m: number | undefined,
  y: number | undefined
): Return {
  const [data, setData] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (m !== undefined && y !== undefined) {
      console.log(m, y);
      const { start, end } = getMonthStartEndTimestamps(m, y);
      fetch(
        `https://api.classicals.live/concerts/epochrange?start=${start}&end=${end}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsLoading(false);
          setData(data.data);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    }
  }, [m, y]);

  return {
    data: data,
    isLoading: isLoading,
  };
}
