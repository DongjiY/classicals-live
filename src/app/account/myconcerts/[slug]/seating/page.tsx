import { NextPage } from "next";
import SeatingMap from "./_components/SeatingMap";

const EditSeating: NextPage = () => {
  return (
    <main className="p-4 h-full">
      <SeatingMap editMode={true}></SeatingMap>
    </main>
  );
};

export default EditSeating;
