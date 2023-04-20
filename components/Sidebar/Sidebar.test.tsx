import React from 'react';
import { render } from '@testing-library/react';
import Sidebar from './Sidebar';
import {Navigation} from "../../types/LangTypes";

const menu: Navigation = {
    id: 1,
    title: 'Menu',
    type: 'INTERNAL',
    path: '/',
    related: null,
    uiRouterKey: 'menu',
    items: [
        {
            id: 2,
            title: 'Submenu 1',
            type: 'INTERNAL',
            path: '/submenu1',
            related: null,
            uiRouterKey: 'submenu1',
            items: [],
        },
        {
            id: 3,
            title: 'Submenu 2',
            type: 'INTERNAL',
            path: '/submenu2',
            related: null,
            uiRouterKey: 'submenu2',
            items: [],
        },
    ],
};

describe('Sidebar component', () => {
    test('renders the component', () => {
        const { getByLabelText, getByText } = render(<Sidebar selectedMenu={menu} />);
        const sidebar = getByLabelText('Sidebar');
        const submenu1 = getByText('Submenu 1');
        const submenu2 = getByText('Submenu 2');

        expect(sidebar).toBeInTheDocument();
        expect(submenu1).toBeInTheDocument();
        expect(submenu2).toBeInTheDocument();
    });

    test('does not render submenus if selected menu has no items', () => {
        const selectedMenu: Navigation = { id: 1, title: 'Menu', type: 'INTERNAL', path: '/', related: null, uiRouterKey: 'menu', items:[] };
        const { queryByText } = render(<Sidebar selectedMenu={selectedMenu} />);
        const submenu1 = queryByText('Submenu 1');
        const submenu2 = queryByText('Submenu 2');

        expect(submenu1).toBeNull();
        expect(submenu2).toBeNull();
    });
});
