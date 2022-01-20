import {useEffect,useState} from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

const OrderList = ({  ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([])
  const [totalOrdersCounts, setTotalOrdersCounts] = useState(0)
  useEffect(() => {
    getOrders()
  }, [page,limit])

  const getOrders = () => {
    axios
    .get(`selling-orders`)
    .then((response) => {
      setOrders(response.data);
      setTotalOrdersCounts(response.data['total-result-count'])
    });
  }
//   const handleSelectAll = (event) => {
//     let newSelectedCustomerIds;

//     if (event.target.checked) {
//       newSelectedCustomerIds = customers.map((customer) => customer.id);
//     } else {
//       newSelectedCustomerIds = [];
//     }

//     setSelectedCustomerIds(newSelectedCustomerIds);
//   };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage+1);
  };
  console.log(orders)

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>

                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Registration date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders && orders.map((order) => (
                <TableRow
                  hover
                  key={order.id}
                  selected={selectedCustomerIds.indexOf(order.id) !== -1}
                >

                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        // src={customer.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials("ee")}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {"customer.first_name"} {"customer.last_name"}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {"customer.email"}
                  </TableCell>
                  <TableCell>
                    {"customer.address_line"}
                  </TableCell>
                  <TableCell>
                    {"customer.telephone"}
                  </TableCell>
                  <TableCell>
                    {/* {moment(customer.created_at).format('DD/MM/YYYY')} */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={totalOrdersCounts}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page -1 }
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
        showLastButton = {true}
        showFirstButton = {true}
      />
    </Card>
  );
};

// OrderList.propTypes = {
//   orders: PropTypes.array.isRequired
// };

export default OrderList;
