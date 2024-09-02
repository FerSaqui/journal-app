import { fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../../src/store/auth/authSlice";
import { JournalApp } from "../../../src/JournalApp";
import { RegisterPage } from "../../../src/auth/pages/RegisterPage";
import { createMemoryRouter, Navigate, RouterProvider } from "react-router-dom";
import { notAuthenticatedState } from "../../fixtures/authFixture";

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();
jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassword({ email, password });
    },
}));

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
});

const publicRoutes = [
    {
        path: "/auth/*",
        element: <JournalApp />,
        children: [
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "register",
                element: <RegisterPage />
            },
            {
                path: "*",
                element: <Navigate to={"/auth/login"}/>
            }
        ]
    },
    {
        path: "*",
        element: <Navigate to={"/auth/login"}/>
    }
];

describe('Pruebas en <LoginPage />', () => {

    beforeEach(() => jest.clearAllMocks());

    test('Debe de mostrar el componente correctamente', () => {
        const router = createMemoryRouter(publicRoutes, { initialEntries: ['/auth/login'] });
        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        );

        expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
    });

    test('Botón de google debe llamar startGoogleSignIn', () => {
        const router = createMemoryRouter(publicRoutes, { initialEntries: ['/auth/login'] });
        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        );

        const googleBtn = screen.getByTestId("btnGoogle");
        fireEvent.click(googleBtn);
        expect(mockStartGoogleSignIn).toHaveBeenCalled();
    });

    test('Submit debe de llamar al startLoginWithEmailPassword', () => {
        const email = "fernando@google.com";
        const password= "123456";

        const router = createMemoryRouter(publicRoutes, { initialEntries: ['/auth/login'] });
        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        );

        const emailField = screen.getByRole("textbox", { name: "Correo" });
        fireEvent.change(emailField, { target: {
            name: "email", value: email
        }});

        const passwordField = screen.getByTestId("txtPasswordLogin");
        fireEvent.change(passwordField, { target: {
            name: "password", value: password
        }});

        const formLogin = screen.getByTestId("formLogin");
        fireEvent.submit(formLogin);

        expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
            email, password
        });
    });
});