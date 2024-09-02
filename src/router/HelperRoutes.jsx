import { Navigate } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage";
import { JournalPage } from "../journal/pages/JournalPage";
import { JournalApp } from "../JournalApp";

const privateRoutes = [
    {
        path: "/",
        element: <JournalPage />,
        errorElement: <Navigate to={"/"} />,
        children: [
            {
                index: true,
                element: <JournalPage />    // The default component to load at '/'
            }
        ]
    }
];

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

export const HelperRoutes = ({ status }) => {
    return (status === "authenticated")
            ? privateRoutes
            : publicRoutes
}