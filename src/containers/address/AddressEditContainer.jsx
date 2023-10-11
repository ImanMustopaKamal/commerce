import React, { useEffect } from "react";
import Layout from "@/components/_shared/core/Layout/Index";
import AddressEditComponent from "@/components/address/AddressEditComponent";
import { useAppDispatch } from "@/hooks";
import { useRouter } from "next/router";
import { getAddressDetailRequested } from "@/store/reducers/slice/address/addressSlice";
import { getProvinceRequested } from "@/store/reducers/slice/options/optionSlice";

function AddressEditContainer() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch({
      type: getProvinceRequested.toString()
    })
  }, [])

  useEffect(() => {
    if (router?.query?.id) {
      dispatch({
        type: getAddressDetailRequested.toString(),
        payload: router?.query?.id,
      });
    }
  }, [router?.query?.id]);

  return (
    <Layout navigation={false}>
      <AddressEditComponent />
    </Layout>
  );
}

export default AddressEditContainer;
