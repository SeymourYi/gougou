import { createBrowserRouter } from "react-router-dom";
import Layout from "../page/layout/layout";
import Newpage from "../page/new/newpage";
import Yearpage from "../page/year/yearpage";
import Month from "../page/month/month";
const router= createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: "/year",
        element: <Yearpage />,
        index:true
      },
      {
        path: '/month',
        element:<Month/>
      }
    ]
  },
  {
    path: '/new',
    element:<Newpage />
  }
])
export default router