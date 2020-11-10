import React from "react";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";
import OrderTable from "./components/OrderTable";

const Orders = () => {
    return (
        <WithSignedInSkeleton title={'Orders'}>
        <OrderTable></OrderTable>

        </WithSignedInSkeleton>
    )
}

export default Orders