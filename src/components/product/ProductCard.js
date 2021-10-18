import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import "./ProductCard.css"
import Grid3x3Icon from '@material-ui/icons/Grid3x3';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
const ProductCard = ({ product, addTobaskerHandler, ...rest }) => {

  
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      {...rest}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        >
          <div>
            <img
              style={{
                width: '100%',
                height: '319px'
              }}
              alt="Some text"
              src={`https://yaz-fr.com/ab-online-cdn/images/${
                product.id
              }/thumbs/${
                product.images
                  ? product.images.split(',').length
                    ? product.images.split(',')[0]
                    : null
                  : null
              }`}
            />
          </div>
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {product.title}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          <strong>{product.price}</strong>
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Grid3x3Icon color="action" />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {product.id}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <ShoppingBasketIcon className="shopping-basket" onClick={addTobaskerHandler(product)}  color="action" />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {product.totalDownloads} {product.available_in_stock}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductCard;
