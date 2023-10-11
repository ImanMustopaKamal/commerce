/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { ArrowBackIos, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Grid,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import { linearColor } from "@/utils/helpers";
import dayjs from "dayjs";
import { getStorage } from "@/utils/storage";
import { formatRupiah, copyToClipboard } from "@/utils/helpers";
import { useAppDispatch, useAppSelectors } from "@/hooks";
import { checkPaymentRequested } from "@/store/reducers/slice/transaction/transactionSlice";

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

const BoxTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
`;

function VirtualAccountComponent() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const date = dayjs().add(1, "days").format("DD MMM YYYY, HH:mm");
  const [totalPrice, setTotalPrice] = useState(0);
  const { transactionDetail } = useAppSelectors((state) => state.transaction);
  console.log("transactionDetail: ", transactionDetail);

  useEffect(() => {
    const data = getStorage("totalPrice");
    if (typeof data !== "undefined" && data !== null) {
      setTotalPrice(JSON.parse(data));
    }
  }, []);

  const handleCheck = () => {
    if (transactionDetail.id) {
      dispatch({
        type: checkPaymentRequested.toString(),
        payload: transactionDetail.id,
      });
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
                router.back();
              }}
            >
              <ArrowBackIos />
            </IconButton>
          </Box>
          <h4>BJB VIRTUAL ACCOUNT</h4>
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
          <h5>Payment Detail</h5>
        </Box>
        <Box
          sx={{
            paddingTop: "1rem",
            paddingBottom: "1rem",
            paddingLeft: ".5rem",
            paddingRight: ".5rem",
          }}
        >
          <FlexBetween>
            <span style={{ fontWeight: "bold" }}>Payment Expired Date</span>
            <GreyText>
              {transactionDetail?.payment_date_expired
                ? dayjs(transactionDetail.payment_date_expired).format(
                    "DD MMM YYYY, HH:mm"
                  )
                : ""}
            </GreyText>
          </FlexBetween>
        </Box>
        <BorderBox style={{ marginBottom: "1rem" }}>
          <FlexBetween>
            <GreyText>Invoice Number</GreyText>
            <GreyText>{transactionDetail?.order_id || ""}</GreyText>
          </FlexBetween>
          <FlexBetween>
            <GreyText>Payment Channel</GreyText>
            <GreyText>BJB Virtual Account</GreyText>
          </FlexBetween>
          <FlexBetween>
            <span style={{ fontWeight: "bold" }}>Virtual Account Number</span>
            <span style={{ fontWeight: "bold" }}>
              {transactionDetail?.payment_signature || ""}
            </span>
            <GreyText
              style={{ cursor: "pointer" }}
              onClick={() => {
                copyToClipboard(
                  transactionDetail?.payment_signature,
                  "Virtual Account Number Copied Success!"
                );
              }}
            >
              Salin
            </GreyText>
          </FlexBetween>
          <FlexBetween>
            <span style={{ fontWeight: "bold" }}>Total Payment</span>
            <span style={{ fontWeight: "bold" }}>
              {transactionDetail?.total
                ? formatRupiah(transactionDetail?.total)
                : ""}
            </span>
            <GreyText
              style={{ cursor: "pointer" }}
              onClick={() => {
                copyToClipboard(
                  transactionDetail?.total,
                  "Total Payment Copied Success!"
                );
              }}
            >
              Salin
            </GreyText>
          </FlexBetween>
        </BorderBox>
        <Box sx={{ marginBottom: ".5rem" }}>
          <h4>Payment Instruction</h4>
        </Box>
        <BorderBox>
          <Box sx={{ marginBottom: "1rem" }}>
            <Accordion sx={{ border: "1px solid #000000" }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <h6>ATM BJB</h6>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: "8px 25px 25px" }}>
                <span>
                  <ol>
                    <li>Input Kartu ATM dan PIN Anda</li>
                    <li>
                      Pilih menu Transaksi Lainnya kemudian pilih Virtual
                      Account
                    </li>
                    <li>Pilih Tabungan</li>
                    <li>
                      Input Nomor Virtual Account, misal. 1887XXXXXXXXXXXX
                      sebagai Kode Bayar
                    </li>
                    <li>Pilih Lanjutkan</li>
                    <li>
                      Layar akan menampilkan Kode Bayar dan Data Pembayaran Jika
                      jenis tagihan open, customer harus menginput kembali
                      Jumlah Bayar
                    </li>
                    <li>Klik Ya untuk melakukan pembayaran</li>
                    <li>Selesai</li>
                  </ol>
                </span>
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box sx={{ marginBottom: "1rem" }}>
            <Accordion sx={{ border: "1px solid #000000" }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <h6>BJB Net</h6>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: "8px 25px 25px" }}>
                <span>
                  <ol>
                    <li>Login BJB Net App Anda</li>
                    <li>Pilih Menu BJB Virtual Account</li>
                    <li>
                      Input Nomor Virtual Account , misal. 1887XXXXXXXXXXXX
                      sebagai Kode Bayar
                    </li>
                    <li>
                      Layar akan menampilkan Kode Bayar dan Data Pembayaran Jika
                      jenis tagihan open, customer menginput kembali Nominal
                      yang harus dibayarkan
                    </li>
                    <li>Klik Lanjut untuk melakukan pembayaran</li>
                    <li>Selesai</li>
                  </ol>
                </span>
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box sx={{ marginBottom: "1rem" }}>
            <Accordion sx={{ border: "1px solid #000000" }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <h6>MOBILE BANKING</h6>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: "8px 25px 25px" }}>
                <span>
                  <ol>
                    <li>Login BJB Mobile App Anda</li>
                    <li>Pilih Menu Virtual Account</li>
                    <li>
                      Input Nomor Virtual Account , misal. 1887XXXXXXXXXXXX
                      sebagai Kode Bayar
                    </li>
                    <li>
                      Layar akan menampilkan Kode Bayar dan Data Pembayaran Jika
                      jenis tagihan open, customer menginput kembali Nominal
                      yang harus dibayarkan
                    </li>
                    <li>
                      Input PIN, Klik Lanjutkan untuk melakukan pembayaran
                    </li>
                    <li>Selesai</li>
                  </ol>
                </span>
              </AccordionDetails>
            </Accordion>
          </Box>
        </BorderBox>
        <Grid container mt="1rem">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Button
              onClick={() => {
                handleCheck();
              }}
              size="small"
              variant="contained"
              fullWidth
              sx={{ background: linearColor }}
            >
              Check
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default VirtualAccountComponent;
