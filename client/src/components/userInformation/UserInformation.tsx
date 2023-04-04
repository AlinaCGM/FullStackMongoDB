import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Card,
  Box,
  Typography,
  Avatar,
  CardContent,
  Button,
} from "@mui/material";

import { AppDispatch, RootState } from "../../redux/store";

import { userActions } from "../../redux/slice/user";
import UserUpdate from "./UserUpdate";

export default function UserInformation() {
  const [showComponent, setShowComponent] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.userInfo.userInfo);
  const isLogIn = useSelector((state: RootState) => state.userInfo.isLogin);
  const userId = localStorage.getItem("userId");
  const handleClick = () => {
    setShowComponent(!showComponent);
  };
  useEffect(() => {
    if (userId) {
      dispatch(userActions.getUserById(userId));
    }
  }, [dispatch, userId]);

  return (
    <Box
      style={{
        marginBottom: "10%",
        width: "100%",
      }}
    >
      <Box
        style={{
          width: "300px",
          marginTop: "100px",
          marginInline: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          style={{
            width: "100%",
            height: "300px",
          }}
        >
          {
            <Avatar
              sx={{
                backgroundColor: "#141111",
                marginY: "20px",
                marginX: "20px",
                width: "100px",
                height: "100px",
                fontSize: "50px",
              }}
              aria-label="recipe"
            >
              <img src={user.image} height={150} alt={user.firstName} />
            </Avatar>
          }
          <CardContent>
            <Box style={{ marginTop: "10%", marginInline: "auto" }}>
              <Typography gutterBottom variant="h5" component="div">
                {user.firstName.toUpperCase()} {user.lastName}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {user.email}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
      {isLogIn ? (
        <>
          <Button
            style={{ border: "1px solid grey", marginTop: "20px" }}
            onClick={handleClick}
          >
            {showComponent ? "Hide update field" : "Update Information"}
          </Button>
          {showComponent && <UserUpdate />}
        </>
      ) : null}
    </Box>
  );
}
