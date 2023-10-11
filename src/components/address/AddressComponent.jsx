import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { ArrowBackIos } from "@mui/icons-material";
import { Box, IconButton, Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { linearColor } from "@/utils/helpers";
import { useAppDispatch, useAppSelectors } from "@/hooks";
import { deleteAddressRequested } from "@/store/reducers/slice/address/addressSlice";

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
  gap: 0.5rem;
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

function AddressComponent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { address } = useAppSelectors((state) => state.address);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (address) {
      setData(address);
    }
  }, [address]);

  const handleDelete = (value, e) => {
    e.preventDefault();
    if (typeof window === "undefined") return;
    const confrim = window.confirm("Are you sure want to delete this address?");
    if (confrim) {
      dispatch({
        type: deleteAddressRequested.toString(),
        payload: value,
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
          <h4>ADDRESS LIST</h4>
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
          <h4>Address</h4>
        </Box>
        {data.map((item, index) => {
          return (
            <BorderBox key={index} style={{ marginBottom: "1rem" }}>
              <FlexBetween>
                <Stack direction={"column"} spacing={2}>
                  <Box sx={{ width: "100%", maxWidth: "260px" }}>
                    <h4>
                      {item?.name || "Default"} | {item?.phone || "08XXXXX"}
                    </h4>
                    <GreyText>
                      {`${item.address}, ${item.area.name}, ${item.city.name}, ${item.province.name}, ${item.postalCode}`}
                    </GreyText>
                  </Box>
                  {item.isPrimary && (
                    <Box
                      sx={{
                        width: "max-content",
                        padding: "5px 10px",
                        border: "2px solid #000000",
                        borderRadius: "6px",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>Primary</span>
                    </Box>
                  )}
                </Stack>
                <FlexStart>
                  <Button
                    sx={{ background: linearColor }}
                    variant="contained"
                    size="small"
                    onClick={() => {
                      router.push(`/address/edit/${item.id}`);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={handleDelete.bind(this, item.id)}
                  >
                    Delete
                  </Button>
                </FlexStart>
              </FlexBetween>
            </BorderBox>
          );
        })}
        <Box sx={{ marginTop: "3rem", width: "100%" }}>
          <Button
            sx={{ background: linearColor }}
            fullWidth
            variant="contained"
            size="medium"
            onClick={() => {
              router.push("/address/create");
            }}
          >
            Add New Address
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default AddressComponent;
