import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import ProductListToolbar from 'src/components/product/ProductListToolbar';
import ProductCard from 'src/components/product//ProductCard';
import { addProducts } from '../store/products';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import AddProductToOrder from '../components/product/AddProductToOrder';

const ProductList = () => {
  const dispatch = useDispatch();

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
    if (selectedSellingPoint) {
      getProducts();
    }
  }, [selectedSellingPoint]);

  const addProductToBasketHandler = (product) => (event) => {
    setSelectedProductToAddToBascket(product);
  };

  const getProducts = () => {
    let query = 'products';

    if (selectedSellingPoint) {
      query = query + '?selling-point=' + selectedSellingPoint.id;
    }
    axios.get(query).then((response) => {
      dispatch(addProducts(response.data));
    });
  };

  const closeAddProductToBasketDialog = () => {
    emptyProductSelection();
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
          <ProductListToolbar
          // sellingPoints={sellingPoints}
          // selectedSellingPoint={selectedSellingPoint}
          />
          {!selectedSellingPoint ? (
            <Box sx={{ pt: 3 }}>Please select a selling point</Box>
          ) : (
            <Box sx={{ pt: 3 }}>
              <Grid container spacing={3}>
                {products &&
                  products.length &&
                  products.map((product) => (
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
              >
                <Pagination color="primary" count={3} size="small" />
              </Box>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default ProductList;
