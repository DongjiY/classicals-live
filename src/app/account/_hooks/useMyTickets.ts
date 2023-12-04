import { useEffect, useState } from "react";

type Return = {
  data: Array<any>;
  isLoading: boolean;
};

export default function useMyTickets(): Return {
  const [ticketData, setTicketData] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://api.classicals.live/tickets/active", {
      mode: "cors",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTicketData(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return {
    data: ticketData,
    isLoading: isLoading,
  };
}
