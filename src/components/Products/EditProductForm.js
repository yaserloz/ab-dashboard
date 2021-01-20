import React from "react";
import TextInput from "../Form/TextInput";
import axios from "axios";
import env from "../../env";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const EditProductForm = (props) => {
  const [product, setProduct] = React.useState([]);
  React.useEffect(() => {
    axios.get(env() + "products/" + props.productId).then((response) => {
      console.log(response.data);
      setProduct(response.data);
    });
  }, [props.productId]);

  const codeBarChangeHandler = (event) => {
    const productCodeBar = event.target.value;
    const productCopy = { ...product };
    productCopy.product[0].code_bar = productCodeBar;
    setProduct(productCopy);
  };

  const localCodeBarChangeHandler = (event) => {
    const productLocalCodeBar = event.target.value;
    const productCopy = { ...product };
    productCopy.product[0].local_code_bar = productLocalCodeBar;
    setProduct(productCopy);
  };

  const weightChangeHandler = (event) => {
    const weight = event.target.value;
    const productCopy = { ...product };
    productCopy.product[0].weight = weight;
    setProduct(productCopy);
  };

  const volumeChangeHandler = (event) => {
    const volume = event.target.value;
    const productCopy = { ...product };
    productCopy.product[0].volume = volume;
    setProduct(productCopy);
  };

  const saveProductDetails = () => {
    const productCopy = { ...product };
    const productDetails = productCopy.product[0]
    axios.patch(env() + "products",productDetails).then((response) => {
      console.log(response.data);
      // setProduct(response.data);
    });
  }

  console.log(product.product && product);
  return (
    <div style={{ padding: "3em" }}>
      <h1>PRODUCT DETAIL : {props.productId}</h1>
      <TextInput
        InputLabelProps={{ shrink: true }}
        fullWidth
        label="Codebar"
        value={product && product.product && product.product[0].code_bar}
        placeholder="Codebar"
        onChange={codeBarChangeHandler}
      />
      <br />
      <br />
      <TextInput
        InputLabelProps={{ shrink: true }}
        fullWidth
        label="Local code bar"
        value={product && product.product && product.product[0].local_code_bar}
        placeholder="Local code bar"
        onChange={localCodeBarChangeHandler}
      />
      <br />
      <br />
      <TextInput
        InputLabelProps={{ shrink: true }}
        fullWidth
        label="Weight"
        value={product && product.product && product.product[0].weight}
        placeholder="Weight"
        onChange={weightChangeHandler}
      />
      <br />
      <br />
      <TextInput
        InputLabelProps={{ shrink: true }}
        fullWidth
        label="Volume"
        value={product && product.product && product.product[0].volume}
        placeholder="Volume"
        onChange={volumeChangeHandler}
      />
      <br />
      <br />
      <Button onClick={saveProductDetails} variant="contained" color="primary">
        Save product details
      </Button>
      <br />
      <br />
      <hr />
      <h1>TITLE TRANSLATIONS</h1>
      {product.product &&
        product.titleTranslations.map((language, index) => {
          return (
            <>
              <Grid container spacing={3} key={index}>
                <Grid item>
                  {" "}
                  <TextInput
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    label="Language"
                    value={language.name}
                    placeholder="Language"
                  />
                </Grid>
                <Grid item>
                  <TextInput
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    label="Language code"
                    value={language.code}
                    placeholder="Language code"
                  />
                </Grid>
                <Grid item>
                  <TextInput
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    label="Title"
                    value={language.title}
                    placeholder="Title"
                  />
                </Grid>
                <Grid item>
                  <Button>Save</Button>
                </Grid>
              </Grid>
            </>
          );
        })}
      <Button onClick={props.onDrawerCloseHandler}>Close this window</Button>
      <hr />
      <h1>DESCRIPTION TRANSLATIONS</h1>
      {product.product &&
        product.descriptionsTranslations.map((language, index) => {
          return (
            <>
              <Grid container spacing={3} key={index}>
                <Grid item>
                  {" "}
                  <TextInput
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    label="Language"
                    value={language.name}
                    placeholder="Language"
                  />
                </Grid>
                <Grid item>
                  <TextInput
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    label="Language code"
                    value={language.code}
                    placeholder="Language code"
                  />
                </Grid>
                <Grid item>
                  <TextInput
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    label="Description"
                    value={language.description}
                    placeholder="Description"
                  />
                </Grid>
                <Grid item>
                  <Button>Save</Button>
                </Grid>
              </Grid>
            </>
          );
        })}
      <hr />
      <h1>PRICE</h1>
      <TextInput
        InputLabelProps={{ shrink: true }}
        fullWidth
        label="Price"
        value={product && product.price}
        placeholder="PRICE"
      />
      <hr />
      <h1>
        IMAGES <Button>Add new image</Button>
      </h1>
      {product.product &&
        product.images.map((image, index) => {
          return (
            <>
              <Grid spacing={3} key={index}>
                <Grid lg={6} item>
                  <TextInput
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    label="File name"
                    value={image.url}
                    placeholder="File name"
                  />
                </Grid>
              </Grid>
            </>
          );
        })}

      <Button onClick={props.onDrawerCloseHandler}>Close this window</Button>
    </div>
  );
};

export default EditProductForm;
