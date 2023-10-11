import React, { useEffect } from "react";
import Layout from "@/components/_shared/core/Layout/Index";
import OrderHistoryDetailComponent from "@/components/order-history/OrderHistoryDetailComponent";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/hooks";
import { historyTransactionDetailRequested } from "@/store/reducers/slice/transaction/transactionSlice";

function OrderHistoryDetailContainer() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (router.query.id) {
      dispatch({
        type: historyTransactionDetailRequested.toString(),
        payload: router.query.id,
      });
    }
  }, [router.query.id]);

  return (
    <Layout navigation={false}>
      <OrderHistoryDetailComponent />
    </Layout>
  );
}

export default OrderHistoryDetailContainer;
