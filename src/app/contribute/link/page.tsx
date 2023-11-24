"use client";
import { NextPage } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const LinkPage: NextPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    fetch(
      `https://api.classicals.live/concerts/link/${searchParams.get(
        "concertid"
      )}`,
      {
        mode: "cors",
        credentials: "include",
      }
    )
      .then((res) => {
        if (res.status === 200) {
          router.push("/contribute/concert/success");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return <></>;
};

export default LinkPage;
