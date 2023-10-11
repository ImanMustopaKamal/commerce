import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Image from "next/image";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import {
  ArrowBackIos,
  RemoveCircleOutline,
  ControlPoint,
} from "@mui/icons-material";
import { MdFavoriteBorder } from "react-icons/md";
import { formatRupiah, linearColor } from "@/utils/helpers";
import { useAppSelectors, useAppDispatch } from "@/hooks";
import { updateCartItemRequested } from "@/store/reducers/slice/product/productSlice";
import { setStorages } from "@/utils/storage";
import { setResponserMessage } from "@/store/reducers/slice/responserSlice";

const TopWrapper = {
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
  position: "fixed",
  left: "50%",
  top: "0",
  zIndex: "7",
  transform: "translateX(-50%)",
  maxWidth: "450px",
  background: "#FFFFFF",
  marginBottom: ".5rem",
  borderBottom: "1px solid #C5C5C5",
};

const BottomWrapper = {
  padding: "0",
  margin: "0",
  border: "1px solid #c5c5c5",
  background: linearColor,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  left: "50%",
  bottom: "0",
  zIndex: "7",
  transform: "translateX(-50%)",
  maxWidth: "450px",
};

const TopContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: #000000;
`;

const flexCenter = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
};

const flexStart = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: ".5rem",
  marginBottom: ".5rem",
};

const flexColumn = {
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  gap: "1rem",
};

const flexRowBetween = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "250px",
};

function ShoppingCartComponent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { cart, cartID } = useAppSelectors((state) => state.product);
  const [items, setItems] = useState(cart);

  useEffect(() => {
    if (cart.length > 0) {
      setItems(cart);
    }
  }, [cart]);

  const handleChangeItem = (index, action) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      if (action == "add") {
        updatedItems[index] = {
          ...updatedItems[index],
          ["stock"]: updatedItems[index].stock + 1,
        };
        const IncData = {
          action: "INC",
          productId: Number(updatedItems[index].product?.id),
          itemId: Number(updatedItems[index].variant.id),
          stock: 1,
        };
        dispatch({
          type: updateCartItemRequested.toString(),
          payload: {
            id: cartID,
            data: IncData,
          },
        });
      } else {
        updatedItems[index] = {
          ...updatedItems[index],
          ["stock"]: updatedItems[index].stock - 1,
        };
        const DecData = {
          action: "DEC",
          productId: Number(updatedItems[index].product?.id),
          itemId: Number(updatedItems[index].variant.id),
          stock: 1,
        };
        dispatch({
          type: updateCartItemRequested.toString(),
          payload: {
            id: cartID,
            data: DecData,
          },
        });
      }
      updatedItems[index] = {
        ...updatedItems[index],
        ["amount"]:
          updatedItems[index].staticAmount * updatedItems[index].stock,
      };
      return updatedItems;
    });
  };

  const getGrandTotal = () => {
    if (items.length > 0) {
      let arrCheck = items.filter((item) => {
        return item.check === true;
      });
      const result = arrCheck.reduce((total, item) => total + item.amount, 0);
      return result;
    } else {
      return 0;
    }
  };

  const handleChecked = (index, event) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        ["check"]: event.target.checked,
      };
      return updatedItems;
    });
  };

  const handleAllCheck = (event) => {
    let data = [];
    items.map((item) => {
      data.push({
        amount: item?.amount,
        product: item?.product,
        staticAmount: item?.staticAmount,
        stock: item?.stock,
        variant: item?.variant,
        check: event.target.checked,
      });
    });
    setItems(data);
  };

  const handleSubmit = () => {
    const result = items.filter((item) => item.check === true);
    if (result.length > 0) {
      setStorages([
        {
          name: "checkout",
          value: JSON.stringify(result),
        },
      ]);
      router.push("/place-order");
    } else {
      dispatch({
        type: setResponserMessage.toString(),
        payload: {
          code: 400,
          message: "Please select product before checkout",
        },
      });
    }
  };

  return (
    <>
      <Box sx={TopWrapper}>
        <TopContent>
          <IconButton
            onClick={() => {
              router.push("/");
            }}
          >
            <ArrowBackIos sx={{ color: "#000000" }} />
          </IconButton>
          <h4>SHOPPING CART</h4>
          <IconButton onClick={() => router.push("/shopping-wish")}>
            <MdFavoriteBorder color="#000000" />
          </IconButton>
        </TopContent>
        <Box>
          <Box sx={flexCenter}>
            <h5>All Product ({items.length})</h5>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          overflowY: "auto",
          paddingTop: "8rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          paddingBottom: "6rem",
        }}
      >
        {items.map((item, index) => (
          <Box sx={flexStart} key={index}>
            <Checkbox
              checked={item?.check}
              onChange={(e) => handleChecked(index, e)}
            />
            <Box sx={flexStart}>
              <Box sx={{ border: "1px solid #000000" }}>
                <Image
                  src={item?.product?.galleries[0]?.image}
                  alt={item?.id}
                  width={130}
                  height={90}
                />
              </Box>
              <Box sx={flexColumn}>
                <h5>{item?.product?.name}</h5>
                <Box sx={flexRowBetween}>
                  <h4>{formatRupiah(item?.amount)}</h4>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton
                      onClick={() => handleChangeItem(index, "min")}
                      disabled={item?.qty < 1}
                    >
                      <RemoveCircleOutline fontSize="2px" />
                    </IconButton>
                    <span>{item?.stock}</span>
                    <IconButton onClick={() => handleChangeItem(index, "add")}>
                      <ControlPoint />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={BottomWrapper}>
        <Grid container>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                background: "#FFFFFF",
              }}
            >
              <FormControlLabel
                onChange={(e) => handleAllCheck(e)}
                control={<Checkbox />}
                label="Select All Product"
              />
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
                background: linearColor,
                color: "#FFFFFF",
                padding: ".75rem",
                gap: "1rem",
              }}
            >
              <h5>{formatRupiah(getGrandTotal())}</h5>
            </Box>
          </Grid>
        </Grid>
        <Button
          fullWidth
          sx={{ color: "#FFFFFF" }}
          onClick={() => {
            handleSubmit();
          }}
        >
          Checkout
        </Button>
      </Box>
    </>
  );
}

export default ShoppingCartComponent;
