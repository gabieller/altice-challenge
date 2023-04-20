import { ChangeEvent, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Localization, Navigation } from "../../types/LangTypes";

interface Props {
  navigation: Navigation[];
  localizations: Localization[];
  locale: string;
  selectedMenuId: number;
  onSelectMenu: (id: number) => void;
}

export default function Navbar({
  navigation,
  localizations,
  locale,
  selectedMenuId,
  onSelectMenu,
}: Props) {
  const router = useRouter();
  const availableLocales = useMemo(() => {
    const allLocales = [...localizations.map((l) => l.locale), locale];
    return allLocales.sort();
  }, [localizations, locale]);

  const onChangeSelect = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      router.push(`/${event.target.value}`);
    },
    [router]
  );

  const isActive = useCallback(
    (id: number) => {
      return id === selectedMenuId;
    },
    [selectedMenuId]
  );

  return (
    <nav className="bg-blue-950">
      <div className="max-w-screen-xxl flex flex-wrap items-center justify-between mx-auto py-6 px-4">
        <Link href={`/${locale}`} className="flex items-center">
          <span className="self-center text-2xl text-white">Challenge</span>
        </Link>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul
            data-testid="menu-links"
            className="bg-blue-950 text-white font-medium flex items-center p-4 md:p-0 mt-4  md:flex-row md:space-x-8 md:mt-0"
          >
            {navigation.map((nav) => (
              <li
                key={nav.id}
                className={`${isActive(nav.id) ? "active bg-blue-200 rounded-lg p-2" : ""} cursor-pointer hover:text-blue-400`}
              >
                <div onClick={() => onSelectMenu(nav.id)}>
                  <p className="uppercase">

                  {nav.title}
                  </p>
                  </div>
              </li>
            ))}
            <select
              data-testid="language-select"
              onChange={onChangeSelect}
              className="rounded bg-blue-950 p-3 ring-1 ring-sky-400 uppercase "
            >
              {availableLocales.map((locale) => (
                <option key={locale} value={locale} data-testid={locale}>
                  {locale}
                </option>
              ))}
            </select>
          </ul>
        </div>
      </div>
    </nav>
  );
}
