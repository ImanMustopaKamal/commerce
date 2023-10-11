import React, { useState } from "react";
import Form from "@/components/_shared/form/Form";
import {
  Box,
  Grid,
  IconButton,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import styled from "@emotion/styled";
import { ArrowBackIos, Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/router";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useForm } from "@/hooks";
import { useAppSelectors, useAppDispatch } from "@/hooks";
import {
  getCityRequested,
  getDistrictRequested,
  getAreaRequested,
} from "@/store/reducers/slice/options/optionSlice";
import {
  convertDateValue,
  checkRegulerExpression,
  linearColor,
} from "@/utils/helpers";
import { registerRequested } from "@/store/reducers/slice/auth/authSlice";

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
};

function RegisterComponent() {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmationPassword: "",
    address: "",
    province: "",
    city: "",
    district: "",
    area: "",
    postalCode: "",
    gender: "",
    birthDate: null,
  });
  const { listProvince, listCity, listDistrict, listArea } = useAppSelectors(
    (state) => state.options
  );

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors };
    if ("name" in fieldOfValues)
      temp.name = fieldOfValues.name ? "" : "Please Input name";

    if ("email" in fieldOfValues) {
      const patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      temp.email = fieldOfValues.email
        ? checkRegulerExpression(patternEmail, fieldOfValues.email)
          ? ""
          : "Format email should be valid"
        : "Email is required";
    }

    if ("password" in fieldOfValues) {
      const patternPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      temp.password = fieldOfValues.password
        ? checkRegulerExpression(patternPassword, fieldOfValues.password)
          ? ""
          : "Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number"
        : "Please Input Password";
    }

    if ("confirmationPassword" in fieldOfValues) {
      temp.confirmationPassword = fieldOfValues.confirmationPassword
        ? fieldOfValues.confirmationPassword == values.password
          ? ""
          : "Confirmation Password must be same with password"
        : "Please Input Confirmation Password";
    }

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

    if ("gender" in fieldOfValues)
      temp.gender = fieldOfValues.gender ? "" : "Please Choose Gender";

    if ("birthDate" in fieldOfValues)
      temp.birthDate = fieldOfValues.birthDate
        ? ""
        : "Please Choose Birth of date";

    setErrors({
      ...temp,
    });

    if (fieldOfValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, errors, setErrors, resetForm, handleInputChange } = useForm(
    initialValues,
    true,
    validate
  );
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPwd = () => {
    setConfirmation(!confirmation);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
        confirmationPassword: values.confirmationPassword,
        birthdate: dayjs(values.birthDate).format("YYYY-MM-DD"),
        gender: Number(values?.gender),
        province: values.province,
        city: values.city,
        subDistrict: values.district,
        area: values.area,
        postalCode: values.postalCode,
        address: values.address,
      };
      await dispatch({
        type: registerRequested.toString(),
        payload: payload,
      });
      await resetForm();
      setInitialValues({
        name: "",
        email: "",
        password: "",
        confirmationPassword: "",
        address: "",
        province: "",
        city: "",
        district: "",
        area: "",
        postalCode: "",
        gender: "",
        birthDate: "",
      });
    }
  };
  const router = useRouter();
  const handleback = () => {
    router.back();
  };

  return (
    <>
      <Box sx={TopWrapper}>
        <IconButton onClick={handleback}>
          <ArrowBackIos />
        </IconButton>
      </Box>
      <Box
        sx={{
          overflowY: "auto",
          paddingTop: "4rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: ".5rem",
          }}
        >
          <h1 style={{ color: "#3296C8" }}>CREATE AN</h1>
          <h1 style={{ color: "#B9A739" }}>ACCOUNT</h1>
        </div>
        <h5>Please fill up this form to register new account.</h5>
        <Form style={{ marginTop: "1rem" }} onSubmit={handleSubmit}>
          <TextField
            id="input_name"
            label="Name *"
            variant="standard"
            name="name"
            type="text"
            onChange={handleInputChange}
            value={values?.name}
            fullWidth
            error={errors?.name ? true : false}
            helperText={errors?.name}
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            id="input_email"
            label="Email Address *"
            variant="standard"
            name="email"
            type="text"
            onChange={handleInputChange}
            value={values?.email}
            fullWidth
            error={errors?.email ? true : false}
            helperText={errors?.email}
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            id="input_password"
            label="Password *"
            variant="standard"
            fullWidth
            name="password"
            value={values?.password}
            onChange={handleInputChange}
            error={errors?.password ? true : false}
            helperText={errors?.password}
            type={showPassword ? "text" : "password"}
            sx={{ marginBottom: "1rem" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => {
                      handleShowPassword();
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="input_confirm_password"
            label="Confirmation Password *"
            variant="standard"
            fullWidth
            name="confirmationPassword"
            value={values?.confirmationPassword}
            onChange={handleInputChange}
            error={errors?.confirmationPassword ? true : false}
            helperText={errors?.confirmationPassword}
            type={confirmation ? "text" : "password"}
            sx={{ marginBottom: "1rem" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => {
                      handleShowConfirmPwd();
                    }}
                  >
                    {confirmation ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="input_address"
            label="Address *"
            variant="standard"
            type="text"
            name="address"
            value={values?.address}
            onChange={handleInputChange}
            error={errors?.address ? true : false}
            helperText={errors?.address}
            multiline
            fullWidth
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
              onChange={handleInputChange}
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
            label="Postal Code *"
            variant="standard"
            type="number"
            name="postalCode"
            value={values?.postalCode}
            onChange={handleInputChange}
            error={errors?.postalCode ? true : false}
            helperText={errors?.postalCode}
            fullWidth
            sx={{ marginBottom: "1rem" }}
          />
          <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              row
              name="gender"
              value={values?.gender}
              onChange={handleInputChange}
            >
              <FormControlLabel value="0" control={<Radio />} label="Female" />
              <FormControlLabel value="1" control={<Radio />} label="Male" />
            </RadioGroup>
            {errors?.gender && (
              <FormHelperText sx={{ color: "#EF4444" }}>
                {errors?.gender}
              </FormHelperText>
            )}
          </FormControl>
          <LocalizationProvider
            sx={{ marginBottom: "1rem" }}
            dateAdapter={AdapterDayjs}
          >
            <DatePicker
              label="Birth Date"
              value={values?.birthDate}
              name="birthDate"
              maxDate={dayjs(new Date())}
              onChange={(e) => {
                handleInputChange(convertDateValue("birthDate", e));
              }}
              defaultValue={dayjs("1994-05-22")}
              slotProps={{
                textField: {
                  variant: "standard",
                  fullWidth: true,
                  name: "birthDate",
                },
              }}
            />
            {errors?.birthDate && (
              <FormHelperText sx={{ color: "#EF4444" }}>
                {errors?.birthDate}
              </FormHelperText>
            )}
          </LocalizationProvider>
          <Grid container mt="2rem" mb="2rem">
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ background: linearColor }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </>
  );
}

export default RegisterComponent;
