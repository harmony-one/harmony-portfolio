import {Navigate, Route, Routes} from "react-router-dom";
import { AppLayout } from './components/layout'
import {Dashboard} from './pages/dashboard'
import {appRoutes} from "./constants";

export const AppRoutes = () => {
  return <Routes>
    <Route element={<AppLayout />}>
      <Route path={'/'} element={<Navigate to={appRoutes.dashboard} />} />
      <Route index path={appRoutes.dashboard} element={<Dashboard />} />
    </Route>
  </Routes>
}
