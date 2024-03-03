import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Circle from "../assets/CheckCircle.png";
import { useNavigate, useParams } from "react-router-dom";
import { clearCart } from "../store/reducers/cartItems";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
  py: "68px",
  pr: "20%",
  pl: "20%",
};

export default function OrderConfirmModel({ open, setOpen, order }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => setOpen(false);
  const handleStatus = (id) => {
    dispatch(clearCart());
    navigate(`/status/${id}`);
  };

  useEffect(() => {}, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        className="flex flex-col gap-3 justify-center items-center"
      >
        <Box>
          <img
            src={Circle}
            alt={"Orderplaced"}
            loading="lazy"
            className="w-[100px] h-[100px]"
          />
        </Box>
        <Box className="flex flex-col justify-center items-center w-max">
          <Typography className="font-dmsans font-normal text-2xl text-[#000]">
            Your order is successfully placed
          </Typography>
          <Typography className="font-dmsans font-normal text-xs">
            Order ID - {order?.orderId}
          </Typography>
        </Box>
        <Box>
          <button
            className="h-[40px] w-[193px] -[10px] bg-black font-normal font-dmsans text-base text-white"
            onClick={() => {
              handleStatus(order?.orderId);
            }}
          >
            Check Status
          </button>
        </Box>
      </Box>
    </Modal>
  );
}
