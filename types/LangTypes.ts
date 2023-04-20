export interface Navigation {
    id: number;
    title: string;
    type: 'INTERNAL' | 'WRAPPER';
    path: string | null;
    related: {
        slug: string;
        __contentType: string;
        publishedAt: string;
        locale: string;
    } | null;
    uiRouterKey: string;
    items: Navigation[] | null;
}

export interface LangResponse {
    pageProps: PageProps;
}

export interface Localization {
    locale: string;
    slug: string;
}

export interface PageProps {
    navigation: Navigation[];
    localizations: Localization[]
    '__lang': 'en' | 'pt' | 'es'
}