import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Circle from "../assets/CheckCircle.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: { xs: "600px", md: "460px" },
  width: { xs: "350px", md: "700px" },
  overflow: "auto",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
  py: "30px",
  pr: "20px",
};

const AddressModel = ({
  openAddressModel,
  setOpenAddressModel,
  userDetails,
  setAddress,
  setChangeAddress,
  handleAddressClick,
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
        <div className={`w-[100%] max-w-[963px] h-full rounded-[5px] `}>
          <div className="flex justify-between">
            <div className="text-2xl font-bold font-dmsans">Address</div>
            <div
              className="w-[160px] text-center items-end font-bold font-dmsans border p-[4px] rounded-lg bg-slate-500 text-white cursor-pointer"
              onClick={() => {
                handleAddressClick();
              }}
            >
              Add new address
            </div>
          </div>
          <div className="h-fit flex justify-center items-center  mt-[30px] mb-8">
            {!userDetails?.address?.length ? (
              <div className="flex border justify-center items-center p-[10px] px-32 rounded-lg font-dmsans">
                ADDRESS NOT FOUND
              </div>
            ) : (
              <div className="grid grid-flow-col-1 md:grid-cols-2 gap-8 mb-6">
                {userDetails?.address?.map((item) => {
                  return (
                    <div
                      className="w-[100%] max-w-[394px] h-[139px] p-[10px] border-2 border-gray-600 rounded-lg font-dmsans text-sm leading-[22.4px] font-medium cursor-pointer"
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
                })}
              </div>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default AddressModel;
