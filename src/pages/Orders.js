import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import OrderList from 'src/components/order/OrderList';

const CustomerList = () => {

  return <>
    <Helmet>
      <title>Customers | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          <OrderList />
        </Box>
      </Container>
    </Box>
  </>
}

export default CustomerList;
