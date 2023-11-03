import { FunctionComponent, useRef, useState } from "react";
import useComposerAutocomplete from "../_hooks/useComposerAutocomplete";

type Props = {
  i: number;
};
const AutocompleteInputField: FunctionComponent<Props> = ({ i }) => {
  const ref = useRef(null);
  const [text, setText] = useState<string>("");

  const { autocompleteResults } = useComposerAutocomplete(text);

  return (
    <div className="relative">
      <input
        ref={ref}
        type="text"
        name={`composerName-${i}`}
        className="h-8 border-2 rounded-md w-full dark:text-black peer"
        onChange={(e) => {
          setText(e.currentTarget.value);
        }}
        required
      />

      <ul className="absolute bg-gray-50 py-1 w-full rounded-b-md px-2 z-20 peer-focus:block hover:block hidden">
        {autocompleteResults.map((item, index) => (
          <li className="hover:bg-gray-100" key={index}>
            <button
              className="w-full text-left"
              onClick={() => {
                (ref.current! as HTMLInputElement).value = item;
              }}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AutocompleteInputField;
