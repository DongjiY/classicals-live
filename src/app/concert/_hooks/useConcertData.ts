import { Concert } from "@/types/concert";
import { useEffect, useState } from "react";

type Return = {
  isLoading: boolean;
  data: Concert | null;
};

export default function useConcertData(id: string): Return {
  const [data, setData] = useState<Concert>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`https://api.classicals.live/concerts/id/${id}`)
      .then((res) => res.json())
      .then((data: { body: { _id: string; _source: Object } }) => {
        setData({
          id: data.body._id,
          ...data.body._source,
        } as Concert);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [id]);

  return {
    data: data ?? null,
    isLoading: isLoading,
  };
}
