import { useEffect, useState } from 'react';
import axios from 'axios';

import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import {mountSellingOrderForModification} from '../../store/sellingOrder'
import { Link  } from 'react-router-dom';

const OrderList = ({ ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [totalOrdersCounts, setTotalOrdersCounts] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  
  useEffect(() => {
    getOrders();
  }, [page, limit]);

  
  const getOrders = () => {
    setLoading(true)
    axios.get(`selling-orders?page=${page}&take=${limit}`).then((response) => {
      setOrders(response.data.data);
      setTotalOrdersCounts(response.data['total-result-count']);
      setLoading(false)
    });
    // axios.get(`selling-orders/264`).then((response) => {
    //   console.log(response);

    // });
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    console.log(newPage);
    setPage(newPage + 1);
  };

  const columns = [
    {
      field: 'id',
      headerName: 'Order Id',
      width: 150,
      headerAlign: 'center',
      sortable: false,
      align: 'center',

    },
    {
      field: 'first_name',
      headerName: 'First name',
      width: 150,
      headerAlign: 'center',
      sortable: false,
      align: 'center',

    },
    {
      field: 'last_name',
      headerName: 'Last name',
      width: 150,
      headerAlign: 'center',
      sortable: false,
      align: 'center',

    },
    {
      field: 'order_state',
      headerName: 'Status',
      width: 200,
      headerAlign: 'center',
      sortable: false,
      align: 'center',

    },
    {
      field: 'total_order_price',
      headerName: 'Total Price',
      width: 110,
      headerAlign: 'center',
      sortable: false,
      align: 'center',

    },
    {
      field: 'Pdf',
      headerName: 'To Pdf',
      width: 110,
      headerAlign: 'center',
      sortable: false,
      align: 'center',
      renderCell: params => {
        return (
          <u style={{color: 'brown', cursor: "pointer"}} >
            <Link target="_blank" to={`/order-pdf/${params.id}`}>Download PDF</Link>
            
          </u>
        );
      },

    },
    {
      field: 'modification',
      headerName: 'Modification',
      width: 110,
      headerAlign: 'center',
      sortable: false,
      align: 'center',
      renderCell: params => {
        return (
          <u style={{color: 'brown', cursor: "pointer"}} onClick={() => mountSellingOrder(params.id)}>
            Edit
          </u>
        );
      },
    }
  ];
  const mountSellingOrder = orderId =>{
    dispatch(mountSellingOrderForModification(orderId))
  }
  return (
    <>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={orders && orders.length ? orders : []}
          columns={columns}
          pagination
          paginationMode="server"
          rowsPerPageOptions={[8]}
          pageSize={8}
          rowCount={totalOrdersCounts}
          onPageChange={handlePageChange}
          disableSelectionOnClick
          loading={loading}
          checkboxSelection={false}
          disableColumnMenu={true}
          hideFooterSelectedRowCount={true}
        />
      </div>
      {/* <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Order state</TableCell>
                  <TableCell>Total price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders &&
                  orders.map((order) => (
                    <TableRow
                      hover
                      key={order.id}
                      selected={selectedCustomerIds.indexOf(order.id) !== -1}
                    >
                      <TableCell>{order.id}</TableCell>
                      <TableCell>
                        {order.first_name} {order.last_name}
                      </TableCell>
                      <TableCell>{order.order_state}</TableCell>
                      <TableCell>{order.total_order_price}</TableCell>
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
          page={page - 1}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
          showLastButton={true}
          showFirstButton={true}
        />
      </Card> */}
    </>
  );
};

export default OrderList;
