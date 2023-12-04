import { useEffect, useState } from "react";
import { dummy_my_concert } from "../_static/mockMyConcert";

type Return = {
  data: Array<any>;
  isLoading: boolean;
};

export default function useMyConcerts(): Return {
  const [myConcertData, setMyConcertData] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      fetch("https://api.classicals.live/concerts", {
        mode: "cors",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setMyConcertData(data.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    } else {
      setMyConcertData(dummy_my_concert.data);
      setIsLoading(false);
    }
  }, []);

  return {
    data: myConcertData,
    isLoading: isLoading,
  };
}
