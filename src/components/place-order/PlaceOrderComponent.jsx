/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { ArrowBackIos } from "@mui/icons-material";
import {
  Box,
  IconButton,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  useMediaQuery,
  Stack,
} from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import { getStorage, clearStorage, setStorages } from "@/utils/storage";
import { formatRupiah, linearColor } from "@/utils/helpers";
import { useAppDispatch, useAppSelectors } from "@/hooks";
import { setResponserMessage } from "@/store/reducers/slice/responserSlice";
import { getShippingRequested } from "@/store/reducers/slice/shipping/shippingSlice";
import { postTransactionRequested } from "@/store/reducers/slice/transaction/transactionSlice";

const TopWrapper = {
  padding: "1rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "1rem",
  width: "100%",
  position: "fixed",
  left: "50%",
  top: "0",
  zIndex: "7",
  transform: "translateX(-50%)",
  maxWidth: "450px",
  background: "#FFFFFF",
  borderBottom: "1px solid #DBDBDB",
};

const FlexStart = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const GreyText = styled.span`
  color: #8b9b8b;
`;

const BorderBox = styled.div`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
`;

const FlexBetween = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const BottomWrapper = {
  padding: "0",
  margin: "0",
  border: "1px solid #DBDBDB",
  background: linearColor,
  width: "100%",
  position: "fixed",
  left: "50%",
  bottom: "0",
  zIndex: "7",
  transform: "translateX(-50%)",
  maxWidth: "450px",
};

const BoxTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
`;

function PlaceOrderComponent() {
  const dispatch = useAppDispatch();
  const [payment, setPayment] = useState("");
  const [items, setItems] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [itemSubTotal, setItemSubTotal] = useState(0);
  const [orderSubTotal, setOrderSubTotal] = useState(0);
  const [shipping, setShipping] = useState("");
  const [adminPrice, setAdminPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const matches = useMediaQuery("(max-width:414px)");
  const router = useRouter();
  const { myAddress } = useAppSelectors((state) => state.address);
  const { shippingOptions } = useAppSelectors((state) => state.shipping);
  const handleChangePayment = (e) => {
    setPayment(e.target.value);
    setAdminPrice(4000);
  };

  const fetchShipping = async () => {
    dispatch({
      type: getShippingRequested.toString(),
      payload: {
        destination: {
          area_id: myAddress.area.id,
          lat: null,
          lng: null,
          subdistrict_id: myAddress.subDistrict.id,
        },
        origin: {
          area_id: 12096,
          lat: null,
          lng: null,
          subdistrict_id: 1225,
        },
        price: orderSubTotal,
      },
    });
  };

  useEffect(() => {
    const data = getStorage("checkout");
    const user = getStorage("user");
    setDiscount(0);
    if (typeof data !== "undefined" && data !== null) {
      setItems(JSON.parse(data));
    }
    if (typeof user !== "undefined" && user !== null) {
      const userData = JSON.parse(user);
      setCustomerName(userData?.name);
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      let tempData = 0;
      for (let i = 0; i < items.length; i++) {
        let tempPrice = items[i].staticAmount * items[i].stock;
        tempData += tempPrice;
      }
      setItemSubTotal(tempData);
      setOrderSubTotal(Number(tempData - discount));
    }
  }, [items]);

  useEffect(() => {
    if (orderSubTotal > 0 && myAddress.name) {
      fetchShipping();
    }
  }, [myAddress?.name, orderSubTotal]);

  const handleItemSubTotal = (price, qty) => {
    return Number(price * qty);
  };

  const getAllQty = () => {
    let result = items.reduce((val, data) => {
      return val + data.stock;
    }, 0);
    return result;
  };

  const handleSetShipping = (e) => {
    setShipping(e.target.value);
    const found = shippingOptions.find((val) => val.rate.id == e.target.value);
    setShippingPrice(found.final_price);
  };

  const getGrandTotal = () => {
    return Number(orderSubTotal + shippingPrice + adminPrice);
  };

  const handleBack = () => {
    clearStorage(["checkout"]);
    router.back();
  };

  const handleSubmit = () => {
    if (shipping === "") {
      dispatch({
        type: setResponserMessage.toString(),
        payload: {
          code: 400,
          message: "Please Choose Shipping!",
        },
      });
    } else if (payment === "") {
      dispatch({
        type: setResponserMessage.toString(),
        payload: {
          code: 400,
          message: "Please Choose Payment Method!",
        },
      });
    } else if (shipping === "" && payment === "") {
      dispatch({
        type: setResponserMessage.toString(),
        payload: {
          code: 400,
          message: "Please Choose Payment Method and Shipping!",
        },
      });
    } else {
      setStorages([
        {
          name: "totalPrice",
          value: JSON.stringify(getGrandTotal()),
        },
      ]);

      const payload = {
        payment,
        items,
        itemSubTotal,
        orderSubTotal,
        shipping: shippingOptions.find((val) => val.rate.id == shipping),
        adminPrice,
        shippingPrice,
        discount,
        total: orderSubTotal + shippingPrice + adminPrice - discount,
        myAddress,
      };

      dispatch({
        type: postTransactionRequested.toString(),
        payload: payload,
      });
      // router.push("/virtual-account");
    }
  };

  return (
    <>
      <Box sx={TopWrapper}>
        <BoxTop>
          <Box
            sx={{
              position: "fixed",
              top: "7px",
              left: "10px",
            }}
          >
            <IconButton
              onClick={() => {
                handleBack();
              }}
            >
              <ArrowBackIos />
            </IconButton>
          </Box>
          <h4>PLACE ORDER</h4>
        </BoxTop>
      </Box>
      <Box
        sx={{
          overflowY: "auto",
          paddingTop: "6rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <Box
          sx={{
            width: "100%",
            borderBottom: "1px solid #DBDBDB",
            paddingBottom: ".5rem",
            marginBottom: "1rem",
          }}
        >
          <h5>Order Detail</h5>
        </Box>
        {items?.map((item, index) => (
          <FlexStart key={index} style={{ marginBottom: "1rem" }}>
            <Box sx={{ border: "1px solid #DBDBDB" }}>
              <Image
                src={item?.product?.galleries[0].image}
                alt="product"
                width={150}
                height={100}
              />
            </Box>
            <Box>
              <Box sx={{ marginBottom: "1.5rem" }}>
                <h4>{item?.product?.name}</h4>
              </Box>
              <h3>
                {formatRupiah(
                  handleItemSubTotal(item?.staticAmount, item.stock)
                )}
                &nbsp;({item.stock}&nbsp;pcs)
              </h3>
            </Box>
          </FlexStart>
        ))}
        <Box sx={{ marginBottom: ".5rem" }}>
          <h4>Order Summary | {getAllQty()} Item(s)</h4>
        </Box>
        <BorderBox style={{ marginBottom: "1rem" }}>
          <FlexBetween>
            <GreyText>Item(s) subtotal</GreyText>
            <GreyText>{formatRupiah(itemSubTotal)}</GreyText>
          </FlexBetween>
          <FlexBetween>
            <GreyText>Discount</GreyText>
            <GreyText>Rp.{discount}</GreyText>
          </FlexBetween>
          <FlexBetween>
            <span style={{ fontWeight: "bold" }}>Order Subtotal</span>
            <span style={{ fontWeight: "bold" }}>
              {formatRupiah(orderSubTotal)}
            </span>
          </FlexBetween>
        </BorderBox>
        <Box sx={{ marginBottom: ".5rem" }}>
          <h4>Delivery Details</h4>
        </Box>
        <BorderBox style={{ marginBottom: "1rem" }}>
          <FlexBetween>
            <span style={{ fontWeight: "bold" }}>Address</span>
            <GreyText
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push("/address");
              }}
            >
              Change
            </GreyText>
          </FlexBetween>
          <FlexBetween>
            <Box sx={{ width: "100%", maxWidth: "100px" }}>
              <Stack direction={"column"} spacing={2}>
                <h4>{myAddress?.name || customerName}</h4>
                <h4>{myAddress?.phone || ""}</h4>
              </Stack>
            </Box>
            <Box sx={{ width: "100%", maxWidth: "200px" }}>
              <h4>
                {`${myAddress?.address || ""}, ${
                  myAddress?.province?.name || ""
                }, ${myAddress?.city?.name || ""}, ${
                  myAddress?.subDistrict?.name || ""
                }, ${myAddress?.area?.name || ""}, ${
                  myAddress?.postal_code || ""
                }`}
              </h4>
            </Box>
          </FlexBetween>
        </BorderBox>
        <Box sx={{ marginBottom: ".5rem" }}>Shipping Options</Box>
        <BorderBox style={{ marginBottom: "1rem" }}>
          <FlexBetween>
            <FormControl variant="outlined" sx={{ width: "200px" }}>
              <Select
                name="shipping"
                onChange={handleSetShipping}
                size="small"
                value={shipping}
              >
                {shippingOptions.map((item, index) => (
                  <MenuItem key={index} value={item.rate.id}>
                    {item.logistic.name} - {item.rate.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <span style={{ fontWeight: "bold" }}>
              {formatRupiah(shippingPrice)}
            </span>
          </FlexBetween>
        </BorderBox>
        <Box sx={{ marginBottom: ".5rem" }}>
          <h4>Payment Details</h4>
        </Box>
        <BorderBox style={{ marginBottom: "1rem" }}>
          <FlexBetween>
            <span style={{ fontWeight: "bold" }}>Payment Method</span>
          </FlexBetween>
          <FormControl sx={{ marginBottom: ".5rem" }}>
            <RadioGroup
              row
              name="payment"
              onChange={(e) => handleChangePayment(e)}
            >
              <FormControlLabel
                value="BJB"
                control={<Radio />}
                label="Bank BJB Virtual Account"
              />
            </RadioGroup>
          </FormControl>
          <hr />
          <FlexBetween style={{ marginTop: ".5rem" }}>
            <GreyText>Order Subtotal</GreyText>
            <GreyText>{formatRupiah(orderSubTotal)}</GreyText>
          </FlexBetween>
          <FlexBetween style={{ marginTop: ".5rem" }}>
            <GreyText>Shipping Subtotal</GreyText>
            <GreyText>{formatRupiah(shippingPrice)}</GreyText>
          </FlexBetween>
          <FlexBetween style={{ marginTop: ".5rem" }}>
            <GreyText>Admin Bank</GreyText>
            <GreyText>{formatRupiah(adminPrice)}</GreyText>
          </FlexBetween>
          <FlexBetween style={{ marginTop: ".5rem" }}>
            <span style={{ fontWeight: "bold" }}>Total</span>
            <span style={{ fontWeight: "bold" }}>
              {formatRupiah(getGrandTotal())}
            </span>
          </FlexBetween>
        </BorderBox>
        <TextField
          id="input_note"
          label="Customer Note"
          variant="standard"
          type="text"
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />
      </Box>
      <Box sx={BottomWrapper}>
        <Grid container>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} alignItems="center">
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                background: linearColor,
                paddingTop: ".5rem",
              }}
            >
              <Button
                fullWidth
                sx={{ color: "#FFFFFF" }}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Place Order
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDIrection: "row",
                alignItems: "center",
                justifyContent: "center",
                background: "#FFFFFF",
                color: "#000000",
                padding: "1rem",
                gap: "1rem",
              }}
            >
              <h5>TOTAL {formatRupiah(getGrandTotal())}</h5>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default PlaceOrderComponent;
