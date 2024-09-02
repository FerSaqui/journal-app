import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixture";
jest.mock("../../../src/firebase/providers");

describe('Pruebas en AuthThunks', () => {
    const dispatch = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('Debe de invocar el checkingCredentials', async() => {
        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    });

    test('startgoogleSigIn debe de llamar checkingCredentials y login - Éxito', async() => {
        const loginData = {
            ok: true,
            ...demoUser
        };

        await signInWithGoogle.mockResolvedValue(loginData);
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
    });

    test('startgoogleSigIn debe de llamar checkingCredentials y logout - Error', async() => {
        const loginData = {
            ok: false,
            errorMessage: "Error google"
        };

        await signInWithGoogle.mockResolvedValue(loginData);
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: "Error google" }));
    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y Login - Éxito', async() => {
        const loginData = {ok: true, ...demoUser};
        const formData = { email: demoUser.email, password: "123456" };

        await loginWithEmailPassword.mockResolvedValue(loginData);
        await startLoginWithEmailPassword(formData)(dispatch);

        // expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login({ ...demoUser }));
    });

    test('startLogout debe de llamar logoutFirebase, clearNotes, logout', async() => {
        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: null }));
    });
});