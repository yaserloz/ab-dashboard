import React from "react";
import TextInput from "../Form/TextInput";
import axios from "axios";
import env from "../../env";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Modal from "../Modal/Modal";
import TextEditor from "../TextEditor/TextEditor";
import DraftTextEditor from "../TextEditor/DraftTextEditor";
const EditProductForm = (props) => {
  const [product, setProduct] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [
    selectedProductDescriptionToEdit,
    setSelectedProductDescriptionToEdit,
  ] = React.useState(false);
  const [
    openProductDescriptionModal,
    setOpenProductDescriptionModal,
  ] = React.useState(false);

  React.useEffect(() => {
    getProductDetails().then((response) => {
      console.log(response.data);
      setProduct(response.data);
    });

    getImages().then((response) => {
      console.log(response.data);
      setImages(response.data);
    });
  }, [props.productId]);

  const getProductDetails = () => {
    return axios.get(env() + "products/" + props.productId);
  };

  const getImages = () =>
    axios.get(
      "http://yaz-fr.com/ab-online-cdn/images/images.php?productId=" +
        props.productId
    );

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
    const productDetails = productCopy.product[0];
    axios.post(env() + "products", productDetails).then((response) => {
      console.log(response.data);
      // setProduct(response.data);
    });
  };

  const languageTitleChangeHandler = (index) => (event) => {
    const title = event.target.value;
    const productCopy = { ...product };
    productCopy.titleTranslations[index].title = title;
    setProduct(productCopy);
  };

  const priceChangeHandler = (event) => {
    const price = event.target.value;
    const productCopy = { ...product };
    productCopy.price = price;
    setProduct(productCopy);
  };

  const saveNewPriceHandler = () => {
    const productCopy = { ...product };
    const price = productCopy.price;
    axios
      .post(env() + "products/" + props.productId + "/price", {
        price,
        productId: props.productId,
      })
      .then((response) => {
        getProductDetails().then((response) => {
          setProduct(response.data);
        });
      });
  };

  const imagesChangeHandler = (index) => (event) => {
    const image = event.target.value;
    const productCopy = { ...product };
    productCopy.images[index].url = image;
    setProduct(productCopy);
  };

  const saveTranslationHandler = (index) => (event) => {
    const productCopy = { ...product };
    if (productCopy.titleTranslations[index].product === null)
      productCopy.titleTranslations[index].product = props.productId;
    const translation = productCopy.titleTranslations[index];
    axios
      .post(env() + "translations", translation)
      .then((response) => {
        getProductDetails().then((response) => {
          setProduct(response.data);
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const addNewProductImageHandler = () => {
    const productCopy = { ...product };
    productCopy.images.push({
      id: null,
      product: props.productId,
      url: null,
      edit: true,
    });
    setProduct(productCopy);
  };

  const saveImageHandler = (index) => (event) => {
    const productCopy = { ...product };
    const image = productCopy.images[index];
    axios.post(env() + "images", image).then((response) => {
      getProductDetails().then((response) => {
        setProduct(response.data);
      });
    });
  };

  const fileUpload = (e) => {
    const files = Array.from(e.target.files);

    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append(i, file);
    });

    formData.append("productId", props.productId);

    formData.append(
      "t",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFMUUFJU0kgWUFTSVIiLCJpYXQiOjE1MTYyMzkwMjJ9._QzNFrX99dwLQboNZsCGNbFdFFapCFZtSbKXVkWfdG0"
    );

    axios
      .post(`http://yaz-fr.com/ab-online-cdn/images/images.php`, formData)
      .then((res) => {
        console.log(res.data);
      });
  };

  const showProductDescriptionEditor = (index) => (e) => {
    const descriptionsTranslations = [...product.descriptionsTranslations][
      index
    ];
    setSelectedProductDescriptionToEdit(descriptionsTranslations);
    setOpenProductDescriptionModal(true);
  };

  const onProductDescriptionChange = (content) => {
    const selectedProductDescriptionToEditCopy = {...selectedProductDescriptionToEdit}
    selectedProductDescriptionToEditCopy.description = content
    setSelectedProductDescriptionToEdit(selectedProductDescriptionToEditCopy)
  };

  const onProductDescriptionCloseHandler = () => {
    setOpenProductDescriptionModal(false);
    saveProductDescription()
  };

  const saveProductDescription = () => {
    axios
      .post(env() + "products/descriptions", {
        id:selectedProductDescriptionToEdit.id,
        language:selectedProductDescriptionToEdit.language,
        product:props.productId,
        description:selectedProductDescriptionToEdit.description
      } )
      .then((response) => {
        getProductDetails().then((response) => {
          setProduct(response.data);
        });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div style={{ padding: "3em" }}>
      <Modal openModal={openProductDescriptionModal}>
        <Button onClick={saveProductDescription}>Save</Button>
        <Button onClick={onProductDescriptionCloseHandler}>Close</Button>

        <DraftTextEditor
          value={selectedProductDescriptionToEdit.description || " "}
          onChange={onProductDescriptionChange}
        />
      </Modal>
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
                    onChange={languageTitleChangeHandler(index)}
                  />
                </Grid>
                <Grid item>
                  <Button onClick={saveTranslationHandler(index)}>Save</Button>
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
                    disabled
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    label="Language"
                    value={language.name}
                    placeholder="Language"
                  />
                </Grid>
                <Grid item>
                  <TextInput
                    disabled
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    label="Language code"
                    value={language.code}
                    placeholder="Language code"
                  />
                </Grid>
                <Grid item>
                  <Button onClick={showProductDescriptionEditor(index)}>
                    Edit
                  </Button>
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
        onChange={priceChangeHandler}
      />
      <Button onClick={saveNewPriceHandler}>Save price</Button>
      <hr />
      <h1>PURCHAISE PRICES</h1>
      {product.product &&
        product.purchaisePrices.map((price, index) => {
          return <div>{price.unit_price}</div>;
        })}
      <h1>
        IMAGES{" "}
        <Button onClick={addNewProductImageHandler}>Add new image</Button>
        <input type="file" id="multi" onChange={fileUpload} multiple />
      </h1>
      {images &&
        images.map((image, index) => {
          return (
            <>
              <Grid spacing={3} key={index}>
                <Grid lg={6} item>
                  <div>{image}</div>
                  {image.edit ? (
                    <Button onClick={saveImageHandler(index)}>Save</Button>
                  ) : (
                    <Button onClick={saveImageHandler(index)}>Save</Button>
                  )}
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
