import {createRoot} from "react-dom/client";
import {App} from "./components/App/App";
import {createBrowserRouter, createHashRouter, RouterProvider} from "react-router-dom";
import {AboutLazy} from "./pages/About/About.lazy";
import {Shop} from "./pages/Shop";
import {Suspense} from "react";

const root = document.getElementById('root')

if (!root) {
    throw new Error('root not found');
}

const container = createRoot(root);

const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/about',
                element: <div><Suspense fallback={'Loading...'}><AboutLazy /></Suspense></div> ,
            },
            {
                path:'/shop',
                element: <div><Suspense fallback={'Loading...'}><Shop /></Suspense></div>,
            },
        ]
    }
])
container.render(
    <RouterProvider router={router} />
)
