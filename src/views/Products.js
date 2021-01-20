import React from "react";
import ProductsList from "../components/Products/ProductsList";
import AddButtonCircle from "../components/Form/AddButtonCircle";
import Drawer from "../components/Drawer/Drawer";
import EditProductForm from "../components/Products/EditProductForm";
import axios from "axios";
import env from "../env";
import CircularProgress from "@material-ui/core/CircularProgress";

const Products = () => {
  const [showAddProductDialog, setShowAddProductDialog] = React.useState(false);
  const [productToEdit, setProductToEdit] = React.useState(null);

  const [loading, setLoading] = React.useState(false);

  const addnewProductHandler = () => {
    setLoading(true)
    setTimeout(() => {
      axios
      .put(env() + "products")
      .then((response) => {
        setProductToEdit(response.data.lastInsertedId);
        setShowAddProductDialog(true);
        setLoading(false)
      })
      .catch((error) => {
        alert("error");
        setLoading(false)
      });
    }, 3000);
    
  };

  const productEditHandler = id => {
    setShowAddProductDialog(true);
    setProductToEdit(id);
  }

  const closeDrawer = () => {
    setShowAddProductDialog(false)
    setProductToEdit(null)
  }

  return (
    <div>
      {showAddProductDialog ? (
        <Drawer closeDrawer={closeDrawer} show={showAddProductDialog}>
          {productToEdit && <EditProductForm productId={productToEdit} />}
        </Drawer>
      ) : null}{" "}
      <AddButtonCircle loading={loading} onClick={addnewProductHandler} />
      <ProductsList onEditHandler={productEditHandler} />
    </div>
  );
};

export default Products;
