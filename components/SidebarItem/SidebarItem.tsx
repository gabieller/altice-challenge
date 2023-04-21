import { Navigation } from "../../types/LangTypes";
import { useCallback, useState } from "react";
import Link from "next/link";

export default function SidebarItem({ item }: { item: Navigation }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  if (item.type === "INTERNAL") {
    return (
      <li key={item.id} className="p-4">
        <Link href={`/${item.related?.locale}/${item.related?.slug}`}>
          <span>{item.title}</span>
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        className="flex items-center w-full text-white transition duration-75 rounded-lg hover:bg-gray-100 hover:text-black "
        onClick={handleClick}
  
      >
        <span className="flex-1 text-left p-4">{item.title}</span>
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        )}
      </button>
      <ul
        className={` ${!isOpen ? "hidden" : ""}`}
        data-testid="sidebar-menu"
      >
        {item.items?.map((page) => (
          // @ts-ignore
          <SidebarItem key={page.id} item={page} />
        ))}
      </ul>
    </li>
  );
}
