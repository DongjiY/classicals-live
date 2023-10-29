import { useEffect, useState } from "react";

type Return = {
  data: Array<string>;
};

export default function useRecentSearchHistory(): Return {
  const [d, setD] = useState<Array<string>>([]);

  useEffect(() => {
    const r = localStorage.getItem("search_history");

    if (r !== null) setD(JSON.parse(r));
  }, []);

  return {
    data: d,
  };
}
