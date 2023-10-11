import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useAppDispatch = useDispatch;
export const useAppSelectors = useSelector;

export const useForm = (initialValues, validateOnChange = false, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    }
  }, [initialValues]);

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;

    setValues({
      ...values,
      [name]: checked,
    });
    // console.log(name, value)
    // setValues({
    //   ...values,
    //   [name]: value
    // })
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });

    if (validateOnChange) {
      validate({ [name]: value });
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  const resetField = (name, value) => {
    console.log(name, value);
    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    handleSwitchChange,
    resetField,
    resetForm,
  };
};

export function useDetectVirtualKeyboard() {
  const [onDetect, setOnDetect] = useState(false);
  if (typeof window !== "undefined") {
    const VIEWPORT_VS_CLIENT_HEIGHT_RATIO = 0.75;
    window.visualViewport.addEventListener("resize", function (event) {
      if (
        (event.target.height * event.target.scale) / window.screen.height <
        VIEWPORT_VS_CLIENT_HEIGHT_RATIO
      )
        setOnDetect(true);
      else setOnDetect(false);
    });
  }
  return onDetect;
}
