import {Navigate, Route, Routes} from "react-router-dom";
import { AppLayout } from './components/layout'
import {Dashboard} from './pages/dashboard'
import {appRoutes} from "./constants";
import {Explore} from "./pages/explore";

export const AppRoutes = () => {
  return <Routes>
    <Route element={<AppLayout />}>
      <Route path={'/'} element={<Navigate to={appRoutes.dashboard} />} />
      <Route index path={appRoutes.dashboard} element={<Dashboard />} />
      <Route index path={appRoutes.explore} element={<Explore />} />
    </Route>
  </Routes>
}
