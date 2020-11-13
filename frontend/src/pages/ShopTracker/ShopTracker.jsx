import React, {useState} from "react";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";
import ShopTable from "./components/ShopTable";
import TotalShopsCard from "./components/TotalShopsCard";

const ShopTracker = () => {
    const [totalShops, setTotalShops] = useState(0);

    const setShopNumber = (total) => {
        setTotalShops(total)
    }
    return (
        <WithSignedInSkeleton title={'Shop Tracker'}>
        <ShopTable></ShopTable>
        <TotalShopsCard shopnumbers={totalShops}></TotalShopsCard>

        </WithSignedInSkeleton>
    )
}

export default ShopTracker