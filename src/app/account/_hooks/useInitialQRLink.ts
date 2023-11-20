import { useEffect, useState } from "react";

export default function useInitialQRLink() {
  const [qrData, setQrData] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://api.classicals.live/tickets/validtoken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        test: "data",
      }),
      credentials: "include",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        setQrData(data.qrLink);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return {
    initialLink: qrData,
    isLoading: isLoading,
  };
}
