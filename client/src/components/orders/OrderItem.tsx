import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CardMedia,
} from "@mui/material";

import { Order } from "../../redux/types/type";

type Props = {
  order: Order;
};

function OrderItem({ order }: Props) {
  const orderDate = new Date(order.createdAt);
  const date = orderDate.getDate();
  const month = orderDate.toLocaleString("default", { month: "long" });
  const year = orderDate.getFullYear();
  const hours = orderDate.getHours();
  const minutes = orderDate.getMinutes();

  const formattedDate = `${date} ${month}, ${year} ${hours}:${minutes}`;
  return (
    <Box style={{ width: "90%", marginInline: "auto", marginBlock: "100px" }}>
      <TableContainer component={Paper}>
        <Box>Order created on {formattedDate}</Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>

              <TableCell align="left">TITLE</TableCell>
              <TableCell align="left">CATEGORY</TableCell>
              <TableCell align="left">PRICE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.productOrder.map((order, index) => (
              <TableRow
                key={order._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell component="th" scope="row" width="100px">
                  <CardMedia
                    component="img"
                    height="50"
                    image={order.thumbnail}
                    alt="Paella dish"
                  />
                </TableCell>
                <TableCell align="left">{order.title}</TableCell>
                <TableCell align="left">{order.category}</TableCell>
                <TableCell align="left">{order.price} $</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default OrderItem;
