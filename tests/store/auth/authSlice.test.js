import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixture";

describe('Pruebas en authSlice', () => {
    test('Debe de regresar el estado inicial y llamarse "auth"', () => {
        const state = authSlice.reducer(initialState, {});
        
        expect(authSlice.name).toBe("auth");
        expect(state).toEqual(initialState);
    });

    test('Debe de realizar la autenticación', () => {
        const state = authSlice.reducer(initialState, login(demoUser));

        expect(state).toEqual({
            status: "authenticated",
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        });
    });

    test('Debe de realizar el logout sin mensaje de error', () => {
        const state = authSlice.reducer(authenticatedState, logout({ errorMessage: null }));
        expect(state).toEqual({
            status: "not-authenticated", //not-authenticated, authenticated, checked
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: null
        });
    });

    test('Debe de realizar el logout con mensaje de error', () => {
        let errorMessage = "Credenciales no son correctas";

        const state = authSlice.reducer(authenticatedState, logout({ errorMessage }));
        expect(state).toEqual({
            status: "not-authenticated", //not-authenticated, authenticated, checked
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage
        });
    });

    test('Debe de cambiar el estado a checking', () => {
        const state = authSlice.reducer(authenticatedState, checkingCredentials());

        expect(state.status).toBe("checking");
    });
});