import SideBarItem from "../SideBarItem";

import { SideBarItemProps } from "../SideBarItem";

const BookMark = ({ text, icon, children }: SideBarItemProps) => {
  return (
    <SideBarItem text={text} icon={icon}>
      {children}
    </SideBarItem>
  );
};

export default BookMark;
