import { Concert } from "@/types/concert";
import { useEffect, useState } from "react";

type Return = {
  isLoading: boolean;
  concertData: Array<Concert> | null;
};

export default function useConcertSearchData(query: string | null): Return {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [concertData, setConcertData] = useState<Array<Concert> | null>([]); // null means error

  useEffect(() => {
    if (query === null) {
      setIsLoading(false);
      setConcertData(null);
    } else {
      fetch(`https://api.classicals.live/search?q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsLoading(false);
          setConcertData(
            data.map(
              (row: {
                _id: string;
                _index: number;
                _score: number;
                _source: Object;
              }) => {
                return {
                  id: row._id,
                  ...row._source,
                } as Concert;
              }
            )
          );
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
          setConcertData(null);
        });
    }
  }, [query]);

  return {
    isLoading: isLoading,
    concertData: concertData,
  };
}
