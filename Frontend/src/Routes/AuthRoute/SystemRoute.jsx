import { Routes, Route } from "react-router-dom";
import {
  publicRoutes,
  guestRoutes,
  customerRoutes,
  adminRoutes,
} from "./routes";

import GuestRoute from "./GuestRoute";
import CustomerRoute from "./CustomerRoute";
import AdminRoute from "./AdminRoute";

import NotFoundPage from "../../Page/AuthenPage/NotFoundPage";
import UnAuthorizedPage from "../../Page/AuthenPage/UnAuthorizedPage";


const SystemRoute = () => {
  return (
    <Routes>
 
      {publicRoutes.map((route, idx) => (
        <Route key={idx} path={route.path} element={route.element} />
      ))}

    
      <Route element={<GuestRoute />}>
        {guestRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))}
      </Route>

     
      <Route element={<CustomerRoute />}>
        {customerRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))}
      </Route>


      <Route element={<AdminRoute />}>
        {adminRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))}
      </Route>

      <Route path="/403" element={<UnAuthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default SystemRoute;
