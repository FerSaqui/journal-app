export const initialState = {
    status: "checking", //not-authenticated, authenticated, checked
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
};

export const authenticatedState = {
    status: "authenticated", //not-authenticated, authenticated, checked
    uid: "123abc",
    email: "fernando@google.com",
    displayName: "Fernando",
    photoURL: "https://demo.jpg",
    errorMessage: null
}

export const notAuthenticatedState = {
    status: "not-authenticated", //not-authenticated, authenticated, checked
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const demoUser = {
    uid: "123abc",
    email: "fernando@google.com",
    photoURL: "https://demo.jpg",
    displayName: "Fernando"
}