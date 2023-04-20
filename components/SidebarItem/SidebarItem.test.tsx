import { render, screen } from '@testing-library/react';
import SidebarItem from './SidebarItem';
import { Navigation } from '../../types/LangTypes';

const navigation: Navigation = {
    id: 1,
    title: 'Main Navigation',
    type: 'WRAPPER',
    path: null,
    related: null,
    uiRouterKey: 'main_navigation',
    items: [
        {
            id: 2,
            title: 'Page 1',
            type: 'INTERNAL',
            path: null,
            related: {
                slug: 'page-1',
                __contentType: 'page',
                publishedAt: '2022-04-18T10:30:00.000Z',
                locale: 'en',
            },
            uiRouterKey: 'page_1',
            items: null,
        },
        {
            id: 3,
            title: 'Page 2',
            type: 'INTERNAL',
            path: null,
            related: {
                slug: 'page-2',
                __contentType: 'page',
                publishedAt: '2022-04-18T10:30:00.000Z',
                locale: 'en',
            },
            uiRouterKey: 'page_2',
            items: null,
        },
    ],
};

describe('SidebarItem', () => {
    it('renders internal navigation item', () => {
        // @ts-ignore
        render(<SidebarItem item={navigation} />);
        expect(screen.getByText('Main Navigation')).toBeInTheDocument()

        const linkElement = screen.getByTestId("sidebar-menu");
        expect(linkElement).toBeInTheDocument();

        expect(linkElement.children.item(0)).toHaveTextContent('Page 1')
        expect(linkElement.children.item(1)).toHaveTextContent('Page 2')
    });
});
