import App from "./pages/App";
import Dashboard from "./pages/Dashboard";
import SupplierList from "./pages/SupplierList";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";
import RestockOrders from "./pages/RestockOrders";
import SupplierCard from "./components/SupplierCard";
import RestockOrderCard from "./components/RestockOrderCard";
import { SupplierProvider } from "./context/SupplierContext";

const routes = [
    {
        path: "/",
        element: (
        <SupplierProvider>
            <App/>
        </SupplierProvider>
    ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Dashboard />
            },
            {
                path: "/about",
                element: <About/>
            },
            {
                path: "/restockorders",
                element: <RestockOrders/>,
                children: [
                    {
                        path: "/restockorders/:id",
                        element: <RestockOrderCard />,
                        // Consider adding a unique error page for this
                        errorElement: <ErrorPage />
                    }
                ]
            },
            {
                path: "/suppliers",
                element: <SupplierList/>,
                children: [
                    {
                        path: "/suppliers/:id",
                        element: <SupplierCard/>,
                        // Consider adding a unique error page for this
                        errorElement: <ErrorPage />
                    }
                ]
            }
        ]
    },
    
    
]

export default routes;