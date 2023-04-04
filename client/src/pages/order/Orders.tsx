import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Snackbar, Alert, Box } from "@mui/material";

import { RootState, AppDispatch } from "../../redux/store";
import { getAllOrders } from "../../redux/thunk/order";
import UserInformation from "../../components/userInformation/UserInformation";
import OrderItem from "../../components/orders/OrderItem";

function Orders() {
  const user = useSelector((state: RootState) => state.userInfo.userInfo);
  const userId = user._id;

  const [open, setOpen] = useState(false);

  const ordersList = useSelector((state: RootState) => state.orders.orders);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllOrders(userId));
  }, [dispatch, userId]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(true);
  };
  return (
    <div>
      <h1>Orders</h1>
      <Box>
        <UserInformation />
      </Box>
      {ordersList.map((order) => {
        return <OrderItem key={order._id} order={order} />;
      })}
      <Button
        variant="contained"
        onClick={() => {
          handleClick();
        }}
      >
        Confirm order
      </Button>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          The order was created successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Orders;
