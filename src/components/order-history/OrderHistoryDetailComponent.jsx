import React from "react";
import styled from "@emotion/styled";
import { ArrowBackIos } from "@mui/icons-material";
import { useRouter } from "next/router";
import { Box, Button, IconButton } from "@mui/material";
import { AiOutlinePrinter } from "react-icons/ai";
import { SAMPLE_PRODUCT_2 } from "@/utils/assetsConstant";
import Image from "next/image";
import { useAppSelectors } from "@/hooks";
import { formatRupiah } from "@/utils/helpers";
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
const FlexStart = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
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

const GreyText = styled.span`
  color: #8b9b8b;
`;

const BoxTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
`;

function OrderHistoryDetailComponent() {
  const { myTransactionDetail } = useAppSelectors((state) => state.transaction);
  console.log("myTransactionDetail: ", myTransactionDetail);
  const router = useRouter();
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
          <h4>ORDER HISTORY DETAIL</h4>
        </BoxTop>
      </Box>
      <Box
        sx={{
          overflowY: "auto",
          paddingTop: "6rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          paddingBottom: "4rem",
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
          <h4>Details</h4>
        </Box>
        {myTransactionDetail.map((item, index) => (
          <Box key={index}>
            <h4>{`DATE OF ORDER ${dayjs(item.created_at).format(
              "DD MMM YYYY, HH:mm"
            )}`}</h4>
            <FlexColumn>
              <span>{`Order number : ${item.order_id}`}</span>
              <span>{`Order status : ${item.payment_status}`}</span>
              <span>{`Order class : ${item.transaction_shippings.origin_name}`}</span>
              <span>{`Delivery by : ${item.transaction_shippings.logistic_name}-${item.transaction_shippings.rate_type}`}</span>
              <span>{`Delivery slip number : ${
                item?.transaction_shippings?.awb || "not available"
              }`}</span>
            </FlexColumn>
            <DividerLine />
            <h4>SHIPPING ADDRESS</h4>
            <span>
              {`${item.transaction_shippings.dest_name} | ${item.transaction_shippings.dest_phone}`}
            </span>
            <br />
            <span>
              {`${item.transaction_shippings.dest_address}, ${item.transaction_shippings.dest_post_code}`}
            </span>
            <DividerLine />
            <h4>PAYMENT OPTION</h4>
            <span>{`VIRTUAL ACCOUNT BJB - ${item.payment_signature}`}</span>
            <DividerLine />
            <h4>ORDER SUMMARY</h4>
            {item.transaction_items.map((item, index) => (
              <FlexStart key={index} style={{ marginTop: ".5rem" }}>
                <Box sx={{ border: "1px solid #DBDBDB" }}>
                  <Image
                    src={`/${item.product.galleries[0].image}`}
                    alt="product"
                    width={150}
                    height={100}
                  />
                </Box>
                <Box>
                  <Box sx={{ marginBottom: "1.5rem" }}>
                    <h4>{`${item.product.name}`}</h4>
                  </Box>
                  <h3>{formatRupiah(item.product.price)}</h3>
                </Box>
              </FlexStart>
            ))}
            <DividerLine />
            <FlexBetween style={{ marginTop: ".5rem" }}>
              <GreyText>Order Subtotal</GreyText>
              <GreyText>{`${formatRupiah(item.subtotal)}`}</GreyText>
            </FlexBetween>
            <FlexBetween style={{ marginTop: ".5rem" }}>
              <GreyText>Shipping Subtotal</GreyText>
              <GreyText>{`${formatRupiah(item.shipping_fee)}`}</GreyText>
            </FlexBetween>
            <FlexBetween style={{ marginTop: ".5rem" }}>
              <GreyText>Admin Bank</GreyText>
              <GreyText>{`${formatRupiah(item.admin_fee)}`}</GreyText>
            </FlexBetween>
            <FlexBetween style={{ marginTop: ".5rem" }}>
              <span style={{ fontWeight: "bold" }}>Total</span>
              <span style={{ fontWeight: "bold" }}>{`${formatRupiah(
                item.total
              )}`}</span>
            </FlexBetween>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default OrderHistoryDetailComponent;
