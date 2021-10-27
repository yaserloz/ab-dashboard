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

const ProductList = () => {

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  
  const user = useSelector((state) => state.auth.user);
  const selectedSellingPoint = useSelector(
    (state) => state.sellingPoint.selectedSellingPoint
  );
  const [sellingPoints, setSellingPoint] = useState([]);

  // const [selectedSellingPoint, setSelectedSellingPoint] = useState(null);

  const [selectedProductToAddToBascket, setSelectedProductToAddToBascket] = useState(null);

  const [selectedProductCountValue, setSelectedProductCountValue] = useState(null);

  const emptyProductSelection = () => {
    setSelectedProductToAddToBascket(null);
    setSelectedProductCountValue(null);
  };

  useEffect(() => {
    if (selectedSellingPoint) {
      getProducts();
    }
  }, [selectedSellingPoint]);

  const getSellingPoints = () => {
    axios.get('selling-points').then((response) => {
      setSellingPoint(response.data);
    });
  };

  if (!sellingPoints.length) {
    getSellingPoints();
  }

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
    if (!selectedProductCountValue || selectedProductCountValue == '') {
      alert('You should enter a value');
      return false;
    }

    dispatch(
      addingProducts({
        id: selectedProductToAddToBascket.id,
        user: user.id,
        sellingPoint: selectedSellingPoint.id,
        count: selectedProductCountValue,
        price: selectedProductToAddToBascket.price
      })
    );

    emptyProductSelection();
  };

  return (
    <>
      {selectedProductToAddToBascket ? (
        <DialogResponsive
          onPresistProductToBacket={PresistProductToBascketHandler}
          onCloseDialogHandler={closeAddProductToBasketDialog}
          product={selectedProductToAddToBascket}
        >
          <TextField
            sx={{ paddingRight: '1em' }}
            fullWidth
            variant="outlined"
            onChange={selectedProductCountValueHandler}
          />
        </DialogResponsive>
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
