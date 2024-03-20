import {Navigate, Route, Routes} from "react-router-dom";
import { AppLayout } from './components/layout'
import {Dashboard} from './pages/dashboard'
import {appRoutes} from "./constants";
import {Explore} from "./pages/explore";
import {Bridge} from "./pages/bridge";
import {Lend} from "./pages/lend";
import {Pools} from "./pages/pools";
import {Swap} from "./pages/swap";
import {AI} from "./pages/AI";
import {Buy} from "./pages/buy";

export const AppRoutes = () => {
  return <Routes>
    <Route element={<AppLayout />}>
      <Route path={'/'} element={<Navigate to={appRoutes.dashboard} />} />
      {/*<Route index path={appRoutes.buy} element={<Buy />} />*/}
      {/*<Route index path={appRoutes.AI} element={<AI />} />*/}
      <Route index path={appRoutes.swap} element={<Swap />} />
      {/*<Route index path={appRoutes.pools} element={<Pools />} />*/}
      {/*<Route index path={appRoutes.lend} element={<Lend />} />*/}
      {/*<Route index path={appRoutes.bridge} element={<Bridge />} />*/}
      <Route index path={appRoutes.explore} element={<Explore />} />
      <Route index path={appRoutes.dashboard} element={<Dashboard />} />
    </Route>
  </Routes>
}
