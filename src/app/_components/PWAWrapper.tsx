import { FunctionComponent, ReactNode } from "react";
import BottomNavigationBar from "./BottomNavigationBar";

const PWAWrapper: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <div className="pwa-screen-split-a overflow-y-scroll no-scrollbar overscroll-y-none">
        {children}
      </div>
      <BottomNavigationBar />
    </>
  );
};

export default PWAWrapper;
