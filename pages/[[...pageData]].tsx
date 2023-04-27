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
//tenta achar o slug que dá match com algum navigation
function getNavigation(
  navigation: Navigation[],
  slug: string
): Navigation | undefined {
  for (const item of navigation) {
    //pra cada item de navigation encontra o match do slug e retorna o item
    if (item.related?.slug === slug) {
      return item;
      // no caso em que existem subitems, chama a função de novo (recursiva) para os items filhos
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

  //pegar todos os navigation e seleciona o primeiro
  useEffect(() => {
    //ter algo selecionado no primeiro render -> senao ia tá vazio
    const menu = navigation.at(0);
    setSelectedMenu(menu);
  }, [navigation]);

  //ve o slug e tenta achar dentro do arquivo de dados o slug igual a url e dai seleciona
  //o conteudo é controlado pelo slug (url)
  useEffect(() => {
    const foundNavigation = getNavigation(navigation, slug);
    //seta o conteudo
    setSelectedSidebarItem(foundNavigation);
  }, [navigation, slug]);

  //seleciona o menu da navbar
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
          selectedMenuId={selectedMenu.id} //controlada por estados, não pela url
          onSelectMenu={onSelectMenu}
        />
      )}
      <div className="flex">
        {selectedMenu && <Sidebar selectedMenu={selectedMenu} />}

        {selectedSidebarItem && (
          <div className="flex justify-center items-center w-full">
            <h1 className="text-4xl text-white">{selectedSidebarItem.title}</h1>
          </div>
        )}
      </div>
    </>
  );
}


//injeta as props pelo lado do servidor
//pra ler direto os dado pelo backend (simplicidade)
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


