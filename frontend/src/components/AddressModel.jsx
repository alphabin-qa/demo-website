import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Circle from "../assets/CheckCircle.png";

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
  pr: "20px",
  pl: "80px",
};

const AddressModel = ({
  openAddressModel,
  setOpenAddressModel,
  userDetails,
  setAddress,
}) => {
  const handleClose = () => setOpenAddressModel(false);

  const handleAddressSelect = (id) => {
    const selectedAddress = userDetails?.address.filter(
      (item) => item._id === id
    );
    setAddress(selectedAddress[0]);
    handleClose();
  };

  return (
    <Modal
      open={openAddressModel}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        className="flex flex-col gap-3 justify-center items-center"
      >
        <div className={`w-[963px] h-full rounded-[5px] `}>
          <div className="text-2xl font-bold font-inter">Address</div>
          <div className="h-96 grid grid-cols-2 justify-start items-center gap-8 mt-[30px] ml-[30px] mb-8">
            {!userDetails?.address?.length ? (
              <div className="flex border justify-center items-center p-[10px] font-inter">
                ADDRESS NOT FOUND
              </div>
            ) : (
              userDetails?.address?.map((item) => {
                return (
                  <div
                    className="w-[394px] h-[139px] p-[10px] border-2 border-red-600 rounded-lg font-inter text-sm leading-[22.4px] font-medium cursor-pointer"
                    onClick={() => handleAddressSelect(item?._id)}
                  >
                    <div className="p-[10px]">
                      <p>{item?.firstname}</p>
                      <p>
                        {item?.street +
                          " " +
                          item?.city +
                          " " +
                          item?.state +
                          " " +
                          item?.country +
                          " " +
                          item?.zipCode}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default AddressModel;
