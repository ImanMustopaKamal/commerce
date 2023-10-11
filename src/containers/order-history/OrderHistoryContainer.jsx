import React, { useEffect } from "react";
import Layout from "@/components/_shared/core/Layout/Index";
import OrderHistoryComponent from "@/components/order-history/OrderHistoryComponent";
import { historyTransactionRequested } from "@/store/reducers/slice/transaction/transactionSlice";
import { useAppDispatch } from "@/hooks";

function OrderHistoryContainer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: historyTransactionRequested.toString(),
    });
  }, []);

  return (
    <Layout navigation={false}>
      <OrderHistoryComponent />
    </Layout>
  );
}

export default OrderHistoryContainer;
