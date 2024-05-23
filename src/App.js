import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import Registration from "./components/Registration";
import Body from "./components/Body";
import SellerDashboard from "./components/SellerDashboard";
import BuyerDashboard from "./components/BuyerDashboard";


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Body />,
        children: [
            {
                path: "/",
                element: <Registration />,
            },
            {
                path: "signin",
                element: <SignInPage />,
            },
            {
                path: "seller_dashboard",
                element: <SellerDashboard />,
            },
            {
                path: "buyer_dashboard",
                element: <BuyerDashboard />,
            },
        ],
    },
]);

function App() {
    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    );
}

export default App;