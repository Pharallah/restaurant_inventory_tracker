import App from "./pages/App";
// import Dashboard from "./pages/Dashboard";
import RestockingOrders from "./pages/RestockOrders";
import SupplierList from "./pages/SupplierList";
import About from "./pages/About";
// import ErrorPage from "./pages/ErrorPage";

const routes = [
    {
        path: "/",
        element: <App/>,
        // errorElement: <ErrorPage />
    },
    {
        path: "/about",
        element: <About/>,
        // errorElement: <ErrorPage />
    },
    {
        path: "/restockorders",
        element: <RestockingOrders/>,
        // errorElement: <ErrorPage />
    },
    {
        path: "/suppliers",
        element: <SupplierList/>,
        // errorElement: <ErrorPage />
    }
    
]

export default routes;