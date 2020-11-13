import React, {useState} from "react";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";
import ShopTable from "./components/ShopTable";
import ShopInfoPaper from "./components/ShopInfoPaper";
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
        <ShopInfoPaper 
            name="ABC General Store"
            street="123 Main Street"
            city="Anytown"
            providence="NJ"
            zip="07011"
            id={114000}
            zoneName="Zone 1"
        >

        </ShopInfoPaper>
        </WithSignedInSkeleton>
    )
}

export default ShopTracker