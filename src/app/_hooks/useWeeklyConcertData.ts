import { Concert } from "@/types/concert";
import { useEffect, useState } from "react";

type Return = {
  isLoading: boolean;
  data: Array<Concert>;
};
export default function useWeeklyConcertData(): Return {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Array<Concert>>([]);

  useEffect(() => {
    fetch("https://api.classicals.live/concerts/thisweek", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
    })
      .then((res) => res.json())
      .then(
        (data: {
          data: Array<{
            _id: string;
            _index: string;
            _score: number;
            _source: Object;
          }>;
        }) => {
          console.log("garba geel", data);
          const arr = data.data.map((item) => {
            return {
              id: item._id,
              ...item._source,
            };
          });
          setData(arr as Array<Concert>);
          setIsLoading(false);
        }
      )
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        setData([]);
      });
  }, []);

  return {
    isLoading: isLoading,
    data: data,
  };
}
