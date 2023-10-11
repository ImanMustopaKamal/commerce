import React, { useEffect } from "react";
import Layout from "@/components/_shared/core/Layout/Index";
import PlaceOrderComponent from "@/components/place-order/PlaceOrderComponent";
import { useAppDispatch } from "@/hooks";
import { myAddressRequested } from "@/store/reducers/slice/address/addressSlice";

function PlaceOrderContainer() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({
      type: myAddressRequested.toString(),
    });
  }, []);

  return (
    <Layout navigation={false}>
      <PlaceOrderComponent />
    </Layout>
  );
}

export default PlaceOrderContainer;
