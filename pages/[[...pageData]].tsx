import { useEffect, useState } from "react";
import { Localization, Navigation } from "../types/LangTypes";
import Sidebar from "../components/Sidebar/Sidebar";
import { GetServerSidePropsContext } from "next";
import Navbar from "../components/Navbar/Navbar";

interface Props {
  navigation: Navigation[];
  localizations: Localization[];
  locale: string;
  slug: string;
}

function getNavigation(
  navigation: Navigation[],
  slug: string
): Navigation | undefined {
  for (const item of navigation) {
    if (item.related?.slug === slug) {
      return item;
    } else if (item.items) {
      const nestedItem = getNavigation(item.items, slug);
      if (nestedItem) {
        return nestedItem;
      }
    }
  }
}

export default function Index({
  navigation,
  localizations,
  locale,
  slug,
}: Props) {
  const [selectedMenu, setSelectedMenu] = useState<Navigation>();
  const [selectedSidebarItem, setSelectedSidebarItem] = useState<Navigation>();

  useEffect(() => {
    const menu = navigation.at(0);
    setSelectedMenu(menu);
  }, [navigation]);

  useEffect(() => {
    const foundNavigation = getNavigation(navigation, slug);
    setSelectedSidebarItem(foundNavigation);
  }, [navigation, slug]);

  const onSelectMenu = (id: number) => {
    setSelectedMenu(navigation.find((page) => page.id === id));
  };
  return (
    <>
      {navigation && selectedMenu && (
        <Navbar
          navigation={navigation}
          locale={locale}
          localizations={localizations}
          selectedMenuId={selectedMenu.id}
          onSelectMenu={onSelectMenu}
        />
      )}
      <div className="flex">
        {selectedMenu && <Sidebar selectedMenu={selectedMenu} />}
        {selectedSidebarItem && (
          <div className="flex justify-center items-center w-full">
            <h1 className="text-4xl text-white">
              {selectedSidebarItem.title}
            </h1>
          </div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // @ts-ignore
  const [lang, slug] = context.query.pageData;
  const config = require(`../data/${lang}.json`);

  return {
    props: {
      navigation: config.pageProps.navigation,
      localizations: config.pageProps.localizations,
      locale: config.pageProps["__lang"],
      slug: slug || null,
    },
  };
}
