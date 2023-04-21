import { Navigation } from "../../types/LangTypes";
import SidebarItem from "../SidebarItem/SidebarItem";

interface Props {
  selectedMenu: Navigation;
}

export default function Sidebar({ selectedMenu }: Props) {
  return (
    <aside
      className="bg-blue-950 text-white w-72 h-screen pr-4 overflow-x-hidden overflow-y-scroll scrollbar-hide"
      aria-label="Sidebar"
    >
      <ul>
        {selectedMenu.items?.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}
      </ul>
    </aside>
  );
}
