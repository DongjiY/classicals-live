import { User } from "@/types/User";
import { useEffect, useState } from "react";

type Return = {
  user: User | undefined;
  isLoading: boolean;
  error: boolean;
};

export default function useUser(): Return {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetch("https://api.classicals.live/user/token", {
      credentials: "include",
      mode: "cors",
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          setError(true);
          setIsLoading(false);
        }
      })
      .then(
        (data: { _id: string; name: string; email: string; __v: number }) => {
          setUser(data);
          setIsLoading(false);
        }
      )
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        setError(true);
      });
  }, []);

  return {
    isLoading: isLoading,
    user: user,
    error: error,
  };
}
