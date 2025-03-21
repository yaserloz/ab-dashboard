import { useEffect } from 'react';
import {  useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import SellingPoint from '../components/SellingPoint/SellingPoint'
import {
  // Avatar,
  Box,
  // Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  // AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  // Lock as LockIcon,
  // Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  // UserPlus as UserPlusIcon,
  Users as UsersIcon,
  Truck 
} from 'react-feather';
import NavItem from './NavItem';





const items = [
  {
    href: '/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  // {
  //   href: '/customers',
  //   icon: UsersIcon,
  //   title: 'Customers'
  // },
  {
    href: '/products',
    icon: ShoppingBagIcon,
    title: 'Products'
  },
  {
    href: '/orders',
    icon: ShoppingBagIcon,
    title: 'Orders'
  },
  // {
  //   href: '/purchase-order',
  //   icon: ShoppingBagIcon,
  //   title: 'Purchase orders'
  // },
  {
    href: '/account',
    icon: UserIcon,
    title: 'Account'
  },
  // {
  //   href: '/shipments',
  //   icon: Truck,
  //   title: 'Shipments'
  // }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user)
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {user && user.firstname+ " " + user.lastname}
        </Typography>

      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <SellingPoint />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
