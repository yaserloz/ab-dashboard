import { Navigate, Routes, Route, useParams   } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Settings from 'src/pages/Settings';
import Orders from 'src/pages/Orders';
import OrderToPdf from "./components/OrderToPdf/OrderToPdf"



const RoutesDom = () => {

return <Routes>
  <Route path="/" element={<DashboardLayout />}>
    <Route path="account" element={<Account />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="products" element={<ProductList />} />
    <Route path="settings" element={<Settings />} />
    <Route path="orders" element={<Orders />} />
    <Route path="*" element={<Navigate to="/404" />} />
  </Route>
  <Route path="/" element={<MainLayout />}>
    <Route path="login" element={<Login />} />
    <Route path="404" element={<NotFound />} />
    <Route path="/" element={<Navigate to="/dashboard"  />} />
    <Route path="*" element={<Navigate to="/404" />} />
  </Route>
  <Route path="order-pdf">
  <Route path=":id" element={<OrderToPdf />} />

  </Route>

</Routes>
}


export default RoutesDom;
