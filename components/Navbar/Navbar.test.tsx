import {render, fireEvent} from '@testing-library/react'
import Navbar from './Navbar'
import { Navigation } from '../../types/LangTypes';

const navigation: Navigation[] = [
    {
        id: 1,
        title: 'Home',
        type: "WRAPPER",
        path: '/',
        related: null,
        uiRouterKey: 'home',
        items: [],
    },
    {
        id: 2,
        title: 'About',
        type: 'WRAPPER',
        path: '/about',
        related: null,
        uiRouterKey: 'about',
        items: [],
    },
]

const localizations = [
    {
        locale: 'en',
        slug: 'en',
    },
    {
        locale: 'pt',
        slug: 'pt',
    },
]

jest.mock("next/router", () => ({
    useRouter() {
        return {
            route: "/",
            pathname: "",
            query: "",
            asPath: "",
        };
    },
}));

describe('Navbar', function () {
    test('renders the Navbar correctly', () => {
        const {getByText, getByTestId} = render(
            <Navbar
                navigation={navigation}
                localizations={localizations}
                locale="es"
                selectedMenuId={1}
                onSelectMenu={() => {
                }}
            />
        )

        const select = getByTestId("language-select")
        expect(select.childElementCount).toEqual(3)
        expect(select.children.item(0)).toHaveTextContent('en')
        expect(select.children.item(1)).toHaveTextContent('es')
        expect(select.children.item(2)).toHaveTextContent('pt')

        expect(getByText('Home')).toBeInTheDocument()
        expect(getByText('About')).toBeInTheDocument()
    })


//
    test('calls onSelectMenu when a navigation item is clicked', () => {
        const onSelectMenu = jest.fn()
        const {getByText} = render(
            <Navbar
                navigation={navigation}
                localizations={localizations}
                locale="es"
                selectedMenuId={1}
                onSelectMenu={onSelectMenu}
            />
        )

        fireEvent.click(getByText('Home'))

        expect(onSelectMenu).toHaveBeenCalledWith(1)
    })

    test('renders the correct selected navigation item', () => {
        const {getByTestId} = render(
            <Navbar
                navigation={navigation}
                localizations={localizations}
                locale="es"
                selectedMenuId={2}
                onSelectMenu={() => {
                }}
            />
        )

        const itemsList = getByTestId("menu-links")

        expect(itemsList.childNodes.item(1)).not.toHaveClass('active')
        expect(itemsList.childNodes.item(2)).toHaveClass('active')
    })
});
