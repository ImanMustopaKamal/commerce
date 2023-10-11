import React from "react";
import styled from "@emotion/styled";
import { ArrowBackIos } from "@mui/icons-material";
import { useRouter } from "next/router";
import { Box, Button, IconButton } from "@mui/material";
import { linearColor } from "@/utils/helpers";
import { useAppSelectors } from "@/hooks";
import dayjs from "dayjs";

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

const FlexBetween = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

const DividerLine = styled.div`
  border: 1px solid #dbdbdb;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const BoxTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
`;

function OrderHistoryComponent() {
  const { myTransactions, totalTransaction } = useAppSelectors(
    (state) => state.transaction
  );
  console.log("myTransactions: ", myTransactions);
  const router = useRouter();

  const handleChangePage = (path) => {
    router.push(path);
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
                router.back();
              }}
            >
              <ArrowBackIos />
            </IconButton>
          </Box>
          <h4>ORDER HISTORY</h4>
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
          <h4>History</h4>
        </Box>
        {myTransactions.map((item, index) => (
          <Box key={index}>
            <Box sx={{ marginBottom: "1rem" }}>
              <h4>{`1 ITEMS ${index + 1} OUT OF ${totalTransaction}`}</h4>
            </Box>
            <FlexBetween>
              <h4>{`DATE OF ORDER ${dayjs(item.created_at).format(
                "DD MMM YYYY, HH:mm"
              )}`}</h4>
              <Button
                variant="contained"
                sx={{ background: linearColor }}
                size="small"
                onClick={() => {
                  router.push(`/order-history/${item.order_id}`);
                }}
              >
                Details
              </Button>
            </FlexBetween>
            <DividerLine />
            <FlexColumn>
              <span>{`Order number : ${item.order_id}`}</span>
              <span>{`Order class : ${item.transaction_shippings.origin_name}`}</span>
              <span>{`Order status : ${item.payment_status}`}</span>
              <span>{`Payment : VA BJB - ${item.payment_signature}`}</span>
              <span>{`Delivery by : ${item.transaction_shippings.logistic_name}-${item.transaction_shippings.rate_type}`}</span>
              <span>{`Delivery slip number : ${
                item?.transaction_shippings?.awb || "not available"
              }`}</span>
            </FlexColumn>
            <br />
          </Box>
        ))}
      </Box>
    </>
  );
}

export default OrderHistoryComponent;
