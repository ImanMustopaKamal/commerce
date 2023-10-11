import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  Box,
  IconButton,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
  FormHelperText,
} from "@mui/material";
import { useRouter } from "next/router";
import { ArrowBackIos } from "@mui/icons-material";
import Form from "../_shared/form/Form";
import { linearColor } from "@/utils/helpers";
import { useAppDispatch, useAppSelectors, useForm } from "@/hooks";
import {
  getAreaRequested,
  getCityRequested,
  getDistrictRequested,
  resetAreaRequested,
  resetDistrictRequested,
} from "@/store/reducers/slice/options/optionSlice";
import { putAddressRequested } from "@/store/reducers/slice/address/addressSlice";

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

const BorderBox = styled.div`
  width: 100%;
  padding: 1rem;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
`;

const BoxTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
`;

function AddressEditComponent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { addressDetail } = useAppSelectors((state) => state.address);
  const { listProvince, listCity, listDistrict, listArea } = useAppSelectors(
    (state) => state.options
  );
  const [initialValues, setInitialValues] = useState({
    name: "",
    phone: "",
    address: "",
    province: "",
    city: "",
    district: "",
    area: "",
    postalCode: "",
    isPrimary: false,
  });

  useEffect(() => {
    if (addressDetail.name) {
      setInitialValues({
        name: addressDetail.name,
        phone: addressDetail.phone,
        address: addressDetail.address,
        province: addressDetail.province.id,
        city: addressDetail.city.id,
        district: addressDetail.subDistrict.id,
        area: addressDetail.area.id,
        postalCode: addressDetail.postalCode,
        isPrimary: addressDetail.isPrimary,
      });

      dispatch({
        type: getCityRequested.toString(),
        payload: addressDetail.province.id,
      });
      dispatch({
        type: getDistrictRequested.toString(),
        payload: addressDetail.city.id,
      });
      dispatch({
        type: getAreaRequested.toString(),
        payload: addressDetail.subDistrict.id,
      });
    }
  }, [addressDetail.name]);

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors };

    if ("name" in fieldOfValues)
      temp.name = fieldOfValues.name ? "" : "Please Input Name";

    if ("phone" in fieldOfValues)
      temp.phone = fieldOfValues.phone ? "" : "Please Input Phone Number";

    if ("address" in fieldOfValues)
      temp.address = fieldOfValues.address ? "" : "Please Input Address";

    if ("province" in fieldOfValues)
      temp.province = fieldOfValues.province ? "" : "Please Choose Province";

    if ("city" in fieldOfValues)
      temp.city = fieldOfValues.city ? "" : "Please Choose City";

    if ("district" in fieldOfValues)
      temp.district = fieldOfValues.district ? "" : "Please Choose District";

    if ("area" in fieldOfValues)
      temp.area = fieldOfValues.area ? "" : "Please Choose Area";

    if ("postalCode" in fieldOfValues)
      temp.postalCode = fieldOfValues.postalCode ? "" : "Please Postal Code";

    setErrors({
      ...temp,
    });

    if (fieldOfValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const {
    values,
    errors,
    setErrors,
    resetForm,
    handleInputChange,
    handleSwitchChange,
  } = useForm(initialValues, false, validate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const payload = {
        name: values.name,
        phone: values.phone,
        address: values.address,
        province: values.province,
        city: values.city,
        subDistrict: values.district,
        area: values.area,
        postalCode: values.postalCode,
        isPrimary: values.isPrimary,
      };
      await dispatch({
        type: putAddressRequested.toString(),
        payload: payload,
        id: router.query.id,
      });
      // console.log("submit: ", submit);
      // await resetForm();
      // setInitialValues({
      //   name: "",
      //   phone: "",
      //   address: "",
      //   province: "",
      //   city: "",
      //   district: "",
      //   area: "",
      //   postalCode: "",
      //   isPrimary: false,
      // });
      // console.log("payload: ", payload);
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
          <h4>EDIT ADDRESS</h4>
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
        <Form onSubmit={handleSubmit}>
          <BorderBox style={{ marginBottom: "1.5rem" }}>
            <TextField
              id="input_name"
              multiline
              label="Name"
              variant="standard"
              name="name"
              type="text"
              fullWidth
              value={values?.name}
              onChange={handleInputChange}
              error={errors?.name ? true : false}
              helperText={errors?.name}
              sx={{ marginBottom: "1rem" }}
            />
            <TextField
              id="input_phone"
              multiline
              label="Phone Number"
              variant="standard"
              name="phone"
              type="text"
              fullWidth
              value={values?.phone}
              onChange={handleInputChange}
              error={errors?.phone ? true : false}
              helperText={errors?.phone}
              sx={{ marginBottom: "1rem" }}
            />
            <TextField
              id="input_address"
              multiline
              label="Address"
              variant="standard"
              name="address"
              type="text"
              fullWidth
              value={values?.address}
              onChange={handleInputChange}
              error={errors?.address ? true : false}
              helperText={errors?.address}
              sx={{ marginBottom: "1rem" }}
            />
            <FormControl
              fullWidth
              variant="standard"
              sx={{ marginBottom: "1rem" }}
            >
              <InputLabel>Province *</InputLabel>
              <Select
                name="province"
                onChange={(e) => {
                  handleInputChange(e);
                  dispatch({
                    type: getCityRequested.toString(),
                    payload: e.target.value,
                  });
                  dispatch({
                    type: resetDistrictRequested.toString(),
                  });
                  dispatch({
                    type: resetAreaRequested.toString(),
                  });
                }}
                value={values?.province}
                error={errors?.province ? true : false}
              >
                {listProvince.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              {errors?.province && (
                <FormHelperText sx={{ color: "#EF4444" }}>
                  {errors?.province}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              variant="standard"
              sx={{ marginBottom: "1rem" }}
            >
              <InputLabel>City *</InputLabel>
              <Select
                name="city"
                onChange={(e) => {
                  handleInputChange(e);
                  dispatch({
                    type: getDistrictRequested.toString(),
                    payload: e.target.value,
                  });
                  dispatch({
                    type: resetAreaRequested.toString(),
                  });
                }}
                value={values?.city}
                error={errors?.city ? true : false}
              >
                {listCity.map((item) => (
                  <MenuItem key={item?.id} value={item?.id}>
                    {item?.name}
                  </MenuItem>
                ))}
              </Select>
              {errors?.city && (
                <FormHelperText sx={{ color: "#EF4444" }}>
                  {errors?.city}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              variant="standard"
              sx={{ marginBottom: "1rem" }}
            >
              <InputLabel>District *</InputLabel>
              <Select
                name="district"
                onChange={(e) => {
                  handleInputChange(e);
                  dispatch({
                    type: getAreaRequested.toString(),
                    payload: e.target.value,
                  });
                }}
                value={values?.district}
                error={errors?.district ? true : false}
              >
                {listDistrict.map((item) => (
                  <MenuItem key={item?.id} value={item?.id}>
                    {item?.name}
                  </MenuItem>
                ))}
              </Select>
              {errors?.district && (
                <FormHelperText sx={{ color: "#EF4444" }}>
                  {errors?.district}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              variant="standard"
              sx={{ marginBottom: "1rem" }}
            >
              <InputLabel>Area *</InputLabel>
              <Select
                name="area"
                onChange={(e) => handleInputChange(e)}
                value={values?.area}
                error={errors?.area ? true : false}
              >
                {listArea.map((item) => (
                  <MenuItem key={item?.id} value={item?.id}>
                    {item?.name}
                  </MenuItem>
                ))}
              </Select>
              {errors?.area && (
                <FormHelperText sx={{ color: "#EF4444" }}>
                  {errors?.area}
                </FormHelperText>
              )}
            </FormControl>
            <TextField
              id="input_postal_code"
              multiline
              label="Postal Code"
              variant="standard"
              type="text"
              name="postalCode"
              value={values?.postalCode}
              onChange={handleInputChange}
              error={errors?.postalCode ? true : false}
              helperText={errors?.postalCode}
              fullWidth
              sx={{ marginBottom: "1rem" }}
            />
          </BorderBox>
          <Box sx={{ marginBottom: "1rem", width: "100%" }}>
            <FormControlLabel
              control={
                <Switch
                  name="isPrimary"
                  onChange={handleSwitchChange}
                  value={values.isPrimary}
                  checked={values.isPrimary}
                />
              }
              label="Primary"
            />
            {/* <Button type="button" fullWidth size="medium" variant="outlined">
              Make as Primary Address
            </Button> */}
          </Box>
          <Box sx={{ marginBottom: "1rem", width: "100%" }}>
            <Button
              sx={{ background: linearColor }}
              type="submit"
              fullWidth
              size="medium"
              variant="contained"
            >
              Save
            </Button>
          </Box>
        </Form>
      </Box>
    </>
  );
}

export default AddressEditComponent;
