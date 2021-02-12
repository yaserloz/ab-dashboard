import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Test from '../PurchaseOrder/Test'

export const MainListItems = (props) =>{

    return (
        <div>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText onClick={() => props.onLinkClick('dashboard')} primary="dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText onClick={() => props.onLinkClick({page:'PurchaseOrderList'})} primary="Purchases orders" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText onClick={() => props.onLinkClick({page:'SellingOrderList'})} primary="Selling orders" primary="Selling orders" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText onClick={() => props.onLinkClick({page:'products'})}  primary="Products" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText onClick={() => props.onLinkClick({page:'shipment'})}  primary="Shipment" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText onClick={() => props.onLinkClick({page:'stock'})}  primary="Stock" />
          </ListItem>
        </div>
      );
      


}

export const SecondaryListItems = () => {
    return (
    <div>
      <ListSubheader inset>Saved reports</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Current month" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Last quarter" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Year-end sale" />
      </ListItem>
    </div>
  );

} 
 