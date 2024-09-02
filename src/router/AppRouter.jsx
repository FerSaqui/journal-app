import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelperRoutes } from "./HelperRoutes";
import { AppTheme } from "../themes/AppTheme";
import { CheckingAuth } from "../ui/components/CheckingAuth";
import { useCheckAuth } from "../hooks/useCheckAuth";

export const AppRouter = () => {
    const { status } = useCheckAuth();

    if(status === "checking"){
        return <CheckingAuth />
    }

    const browserRouter = createBrowserRouter(HelperRoutes({ status }));

    return (
        <AppTheme>
            <RouterProvider router={ browserRouter } />
        </AppTheme>
    );
}