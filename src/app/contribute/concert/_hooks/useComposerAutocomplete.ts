import { useEffect, useState } from "react";

type Return = {
  autocompleteResults: Array<string>;
};

export default function useComposerAutocomplete(
  text: string,
  debounceTimeout = 400
): Return {
  const [autoCompleteResults, setAutoCompleteResults] = useState<Array<string>>(
    []
  );

  useEffect(() => {
    if (text.trim() === "") return;

    const handleDebounce = setTimeout(() => {
      fetch(`https://api.openopus.org/composer/list/search/${text}.json`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setAutoCompleteResults(
            data.composers
              ? data.composers.map((item: any) => item.complete_name)
              : []
          );
        });
    }, debounceTimeout);

    return () => {
      clearTimeout(handleDebounce);
    };
  }, [text, debounceTimeout]);

  return {
    autocompleteResults: autoCompleteResults,
  };
}
