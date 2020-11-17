import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../api";
import { createSelector } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "purchaseOrders",
  initialState: {
    list: [],
    loading: false,
    purchaseOrderAddSuccess: null,
    purchaseOrderAddFinished: null,
    lastFetch: null,
    completingPurchaseOrder: false,
    lastInsertedOrderId: null,
    purchaseOrderToModifie: null,
  },
  reducers: {
    purchaseOrdersReceived: (purchaseOrders, action) => {
      purchaseOrders.list = action.payload;
      purchaseOrders.loading = false;
      purchaseOrders.lastFetch = Date.now();
    },
    purchaseOrdersRequested: (purchaseOrders, action) => {
      purchaseOrders.loading = true;
    },
    purchaseOrdersRequestedFailed: (purchaseOrders, action) => {
      purchaseOrders.loading = false;
    },

    onePurchaseOrdersReceived: (purchaseOrders, action) => {
      purchaseOrders.purchaseOrderToModifie = action.payload;
      purchaseOrders.loading = false;
      purchaseOrders.lastFetch = Date.now();
    },
    onePurchaseOrderRequested: (purchaseOrders, action) => {
      purchaseOrders.loading = true;
    },
    onePurchaseOrdersRequestedFailed: (purchaseOrders, action) => {
      purchaseOrders.loading = false;
    },

    completePurchaseOrderProcessStarted: (purchaseOrders, action) => {
      purchaseOrders.completingPurchaseOrder = true;
      purchaseOrders.lastInsertedOrderId = action.payload.lastInsertedId;
    },
    completePurchaseOrderProcessFinished: (purchaseOrders, action) => {
      purchaseOrders.addPurchaseOrder = false;
    },

    purchaseOrderAddRequested: (purchaseOrders, action) => {
      purchaseOrders.loading = true;
      purchaseOrders.purchaseOrderAddSuccess = null;
    },
    purchaseOrderAddFailed: (purchaseOrders, action) => {
      purchaseOrders.loading = false;
      purchaseOrders.purchaseOrderAddSuccess = false;
    },
    purchaseOrderAddSuccess: (purchaseOrders, action) => {
      purchaseOrders.loading = false;
      purchaseOrders.purchaseOrderAddSuccess = true;
    },
    purchaseOrderAddFinished: (purchaseOrders, action) => {
      purchaseOrders.loading = false;
      purchaseOrders.purchaseOrderAddFinished = true;
    },

    purchaseOrderAddLine: (purchaseOrders, action) => {
      const purchaseOrderToModifie = JSON.parse(
        JSON.stringify(purchaseOrders.purchaseOrderToModifie)
      );
      purchaseOrders.purchaseOrderToModifie = {
        orderInfo: purchaseOrderToModifie.orderInfo,
        orderLines:[{
          code_bar: " ",
          product_id: " ",
          product_count: " ",
          unit_price: " ",
          total_price: " ",
        }].concat(purchaseOrderToModifie.orderLines) ,
      };
    },

    purchaseOrderModifieLine: (purchaseOrders, action) => {
      const purchaseOrderToModifie = JSON.parse(
        JSON.stringify(purchaseOrders.purchaseOrderToModifie)
      );


      purchaseOrders.purchaseOrderToModifie = {
        orderInfo: purchaseOrderToModifie.orderInfo,
        orderLines: purchaseOrderToModifie.orderLines.map((order, index) => {
          if (index === action.payload.index) {
            return Object.assign(
              purchaseOrderToModifie.orderLines[action.payload.index],
              action.payload.line
            );
          } else {
            return order;
          }
        }),
      };
    },
  },
});

export const loadPurchaseOrders = () => (dispatch, getState) => {
  dispatch(
    actions.apiCallBegan({
      url: "/purchase-orders",
      onStart: purchaseOrdersRequested.type,
      onError: purchaseOrdersRequestedFailed.type,
      onSuccess: purchaseOrdersReceived.type,
    })
  );
};

export const getPurchaseOrder = (id) => (dispatch, getState) => {
  dispatch(
    actions.apiCallBegan({
      url: "/purchase-order/" + id,
      onStart: onePurchaseOrderRequested.type,
      onError: onePurchaseOrdersRequestedFailed.type,
      onSuccess: onePurchaseOrdersReceived.type,
    })
  );
};

export const modifeOrderline = (line, index) => (dispatch, getState) => {
  dispatch({
    type: purchaseOrderModifieLine.type,
    payload: {
      index,
      line:!line ? {
        code_bar: " ",
        product_id: " ",
        product_count: " ",
        unit_price: " ",
        total_price: " ",
      } :line
    },
  });
};

export const addNewOrderLine = (id) => (dispatch, getState) => {
  const state = getState();
  dispatch({
    type: purchaseOrderAddLine.type,
    payload: {
      purchaseOrderToModifie: state.PurchaseOrders.purchaseOrderToModifie,
      line: {},
    },
  });
};

export const addPurchaseOrder = (data) => (dispatch, getState) => {
  dispatch(
    actions.apiCallBegan({
      url: "/purchase-order-add",
      method: "post",
      data: data,
      onStart: purchaseOrderAddRequested.type,
      onError: purchaseOrderAddFailed.type,
      onSuccess: purchaseOrderAddSuccess.type,
      onFinish: purchaseOrderAddFinished.type,
      wait: 4000,
      dipatchNext: completePurchaseOrderProcessStarted.type,
    })
  );
};

export const getPurchaseOrders = createSelector(
  (state) => state.PurchaseOrders,
  (PurchaseOrders) => PurchaseOrders.list
);

export const getOnePurchaseOrder = createSelector(
  (state) => state.PurchaseOrders,
  (PurchaseOrders) => PurchaseOrders.purchaseOrderToModifie
);

export const {
  onePurchaseOrderRequested,
  onePurchaseOrdersRequestedFailed,
  onePurchaseOrdersReceived,
  purchaseOrdersReceived,
  purchaseOrdersRequested,
  purchaseOrdersRequestedFailed,
  completePurchaseOrderProcessStarted,
  purchaseOrderAddRequested,
  purchaseOrderAddFailed,
  purchaseOrderAddFinished,
  purchaseOrderAddSuccess,
  purchaseOrderAddLine,
  purchaseOrderModifieLine,
} = slice.actions;

export default slice.reducer;
