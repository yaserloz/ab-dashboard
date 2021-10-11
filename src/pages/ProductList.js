import { Helmet } from 'react-helmet';
import { useEffect } from 'react';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import ProductListToolbar from 'src/components/product/ProductListToolbar';
import ProductCard from 'src/components/product//ProductCard';
import { addProducts } from '../store/products';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products)
  console.log(products)
  useEffect(() => {
    axios.get('products').then((response) => {
      dispatch(addProducts(response.data));

      console.log(response);
    });
  }, []);
  return (
    <>
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
          <ProductListToolbar />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {products && products.length && products.map((product) => (
                <Grid item key={product.id} lg={4} md={6} xs={12}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3
            }}
          >
            <Pagination color="primary" count={3} size="small" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProductList;
