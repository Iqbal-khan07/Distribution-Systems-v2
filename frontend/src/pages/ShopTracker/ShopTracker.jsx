import React from "react";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";
import ShopTable from "./components/ShopTable";
import ShopInfoPaper from "./components/ShopInfoPaper";

const ShopTracker = () => {
    return (
        <WithSignedInSkeleton title={'Shop Tracker'}>
        <ShopTable></ShopTable>
        <ShopInfoPaper></ShopInfoPaper>

        </WithSignedInSkeleton>
    )
}

export default ShopTracker