import {Navigation} from "../../types/LangTypes";
import SidebarItem from "../SidebarItem/SidebarItem"

interface Props {
    selectedMenu: Navigation
}

export default function Sidebar({selectedMenu}: Props) {
    return (
        <div>
            <aside className="bg-blue-950 text-white w-72 h-screen pr-4" aria-label="Sidebar">
                    <ul>
                        {selectedMenu.items?.map((item) => (
                            // @ts-ignore
                            <SidebarItem key={item.id} item={item}/>
                        ))}
                    </ul>
            </aside>
        </div>
    );
}