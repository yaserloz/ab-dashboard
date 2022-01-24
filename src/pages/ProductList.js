import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import { Container, Grid, Pagination } from '@material-ui/core';
import ProductListToolbar from 'src/components/product/ProductListToolbar';
import ProductCard from 'src/components/product//ProductCard';
import { addProducts } from '../store/products';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import AddProductToOrder from '../components/product/AddProductToOrder';
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

const ProductList = () => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalProductsCounts, setTotalProductsCounts] = useState(0);
  const products = useSelector((state) => state.products.products);

  const selectedSellingPoint = useSelector(
    (state) => state.sellingPoint.selectedSellingPoint
  );

  const [selectedProductToAddToBascket, setSelectedProductToAddToBascket] =
    useState(null);

  const emptyProductSelection = () => {
    setSelectedProductToAddToBascket(null);
  };

  useEffect(() => {
    getProducts();
  }, [page, limit]);

  const addProductToBasketHandler = (product) => (event) => {
    setSelectedProductToAddToBascket(product);
  };

  const getProducts = () => {
    let query = `products?page=${page}&take=${limit}`;
    axios.get(query).then((response) => {
      if (response && response.data && response.data.data) {
        dispatch(addProducts(response.data.data));
        setTotalProductsCounts(response.data['total-result-count']);
        return;
      }

      dispatch(addProducts([]));
      setTotalProductsCounts(0);
    });
  };

  const closeAddProductToBasketDialog = () => {
    emptyProductSelection();
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };

  return (
    <>
      {selectedProductToAddToBascket ? (
        <AddProductToOrder
          onCloseDialogHandler={closeAddProductToBasketDialog}
          product={selectedProductToAddToBascket}
          selectedProduct={selectedProductToAddToBascket}
        />
      ) : null}
      <Helmet>
        <title>Products | Material Kit</title>
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
            {products && products.length ? (
              <>
                <Grid container spacing={3}>
                  {products.map((product) => (
                    <Grid item key={product.id} lg={4} md={6} xs={12}>
                      <ProductCard
                        product={product}
                        addTobaskerHandler={addProductToBasketHandler}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    pt: 3
                  }}
                ></Box>
                <TablePagination
                  component="div"
                  count={totalProductsCounts}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleLimitChange}
                  page={page - 1}
                  rowsPerPage={limit}
                  rowsPerPageOptions={[5, 10, 25]}
                  showLastButton={true}
                  showFirstButton={true}
                />
              </>
            ) : (
              'No products or somthing wend wrong'
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProductList;
