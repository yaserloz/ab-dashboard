import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import ProductListToolbar from 'src/components/product/ProductListToolbar';
import ProductCard from 'src/components/product//ProductCard';
import { addProducts } from '../store/products';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import DialogResponsive from '../components/muDialog/DialogResponsive';
import { addingProducts } from '../store/backet';
import {
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { showNotification } from '../store/notification';

import AddProductToOrder from '../components/product/AddProductToOrder';
const ProductList = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);

  const user = useSelector((state) => state.auth.user);
  const selectedSellingPoint = useSelector(
    (state) => state.sellingPoint.selectedSellingPoint
  );
  const [sellingPoints, setSellingPoint] = useState([]);


  const [selectedProductToAddToBascket, setSelectedProductToAddToBascket] =
    useState(null);

  const [selectedProductCountValue, setSelectedProductCountValue] =
    useState(null);

  const emptyProductSelection = () => {
    setSelectedProductToAddToBascket(null);
    setSelectedProductCountValue(null);
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

  const handleChange = (event) => {
    //setSelectedSellingPoint(event.target.value);
  };

  const closeAddProductToBasketDialog = () => {
    emptyProductSelection();
  };

  const selectedProductCountValueHandler = (event) => {
    setSelectedProductCountValue(event.target.value);
  };

  const PresistProductToBascketHandler = () => {
    dispatch(
      addingProducts({
        product: selectedProductToAddToBascket.id,
        user: user.id,
        selling_point: selectedSellingPoint.id,
        count: selectedProductCountValue,
        price: selectedProductToAddToBascket.price
      })
    );

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
            onSellingPoingChange={handleChange}
            sellingPoints={sellingPoints}
            selectedSellingPoint={selectedSellingPoint}
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
