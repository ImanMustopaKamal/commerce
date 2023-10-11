import React, { useEffect } from "react";
import Layout from "@/components/_shared/core/Layout/Index";
import VirtualAccountComponent from "@/components/virtual-account/VirtualAccountComponent";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getDetailTransactionRequested } from "@/store/reducers/slice/transaction/transactionSlice";

function VirtualAccountContainer() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (router.query.id) {
      dispatch({
        type: getDetailTransactionRequested.toString(),
        payload: router.query.id,
      });
    }
  }, [router.query.id]);

  return (
    <Layout navigation={true}>
      <VirtualAccountComponent />
    </Layout>
  );
}

export default VirtualAccountContainer;
