import React from "react";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";
import ShopTable from "./components/ShopTable";

const ShopTracker = () => {
    return (
        <WithSignedInSkeleton title={'Shop Tracker'}>
        <ShopTable></ShopTable>

        </WithSignedInSkeleton>
    )
}

export default ShopTracker