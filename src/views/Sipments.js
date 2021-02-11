import React from "react";
import ShipmentList from "../components/Shipment/ShipmentList";
import AddButtonCircle from "../components/Form/AddButtonCircle";
import Drawer from "../components/Drawer/Drawer";
import ShipmentForm from "../components/Shipment/ShipmentForm";
import axios from "axios";
import env from "../env";
import CircularProgress from "@material-ui/core/CircularProgress";

const Shipments = () => {
  const [showAddShipmentDialog, setShowAddShipmentDialog] = React.useState(false);
  const [shipmentToEdit, setShipmentToEdit] = React.useState(null);

  const [loading, setLoading] = React.useState(false);

  const addnewShipmentHandler = () => {
    setLoading(true)
    setTimeout(() => {
      axios
      .put(env() + "shipments")
      .then((response) => {
        setShipmentToEdit(response.data.lastInsertedId);
        setShowAddShipmentDialog(true);
        setLoading(false)
      })
      .catch((error) => {
        alert("error");
        setLoading(false)
      });
    }, 3000);
  };

  const shipmentEditHandler = id => {
    console.log(id)
    setShowAddShipmentDialog(true);
    setShipmentToEdit(id);
  }

  const closeDrawer = () => {
    setShowAddShipmentDialog(false)
    setShipmentToEdit(null)
  }

  return (
    <div>
      {showAddShipmentDialog ? (
        <Drawer closeDrawer={closeDrawer} show={showAddShipmentDialog}>
          {shipmentToEdit && <ShipmentForm shipmentId={shipmentToEdit} />}
        </Drawer>
      ) : null}{" "}
      <AddButtonCircle loading={loading} onClick={addnewShipmentHandler} />
      <ShipmentList onEditHandler={shipmentEditHandler} />
    </div>
  );
};

export default Shipments;
