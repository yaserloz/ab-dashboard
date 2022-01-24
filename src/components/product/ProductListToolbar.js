import {
  Box,
  Button,
  Card,
  CardContent
} from '@material-ui/core';


const ProductListToolbar = (props) => {
  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent></CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ProductListToolbar;
