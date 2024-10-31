import App from "./pages/App";
import Dashboard from "./pages/Dashboard";
import SupplierList from "./pages/SupplierList";
import ErrorPage from "./pages/ErrorPage";
import RestockOrders from "./pages/RestockOrders";
import { ContextProvider } from "./context/Context";


const routes = [
    {
        path: "/",
        element: (
        <ContextProvider>
            <App/>
        </ContextProvider>
    ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Dashboard />
            },
            {
                path: "/restockorders",
                element: <RestockOrders/>,
            },
            {
                path: "/suppliers",
                element: <SupplierList/>,
            }
        ]
    },
    
    
]

export default routes;