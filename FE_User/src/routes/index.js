import { useRoutes } from "react-router-dom";
import Layout from "../layout";
import Home from "../page/Home";
import Product from "../page/Product";


const Routes = () => {
    const route = useRoutes([
        {
            path: '/',
            element: <Layout/>,
            children: [
                {
                    path: '/',
                    element: <Home/>
                },
                {
                    path: '/product/:id',
                    element: <Product/>
                }
            ]
        }
    ]);
    return route;
}

export default Routes;