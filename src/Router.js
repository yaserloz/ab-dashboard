import React from 'react'
import { BrowserRouter as ReactRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './views/Dashboard'
import PurchaseOrder from './views/PurchaseOrder'
import SellingOrder from './views/SellingOrder'

import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import DashboardIndex from './views/DashboardIndex'
import OrderToPdf from './components/OrderToPdf/OrderToPdf'
import PurchaseOrderForm from './components/PurchaseOrder/PurchaseOrderForm'
const NoMatch  = () => {
    return (
        <div>
            <h1>Page not found</h1>
        </div>
    )
}

const store = configureStore();


const Router = props => {

    return (
        <ReactRouter >
            <Switch>
                <Route path="/"   render={(props) => <Dashboard {...props} page={DashboardIndex} />} />
                <Provider store={store}>
                    <Route path="purchase-order"  component={PurchaseOrder}   />
                    <Route path="selling-order"  render={(props) => <Dashboard {...props} page={SellingOrder} />} />
                    <Route path="selling-order/:id"  component={OrderToPdf} />
                    <Route path="purchase-order/:id"  component={PurchaseOrderForm} />
                </Provider>
                <Route component={NoMatch}/>
            </Switch>
        </ReactRouter>
    )
}

export default Router
