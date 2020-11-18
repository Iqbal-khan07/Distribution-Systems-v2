import React, { useEffect, useState } from "react";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";

import ShopInfoPaper from "./components/ShopInfoPaper/ShopInfoPaper";
import ShopTable from "./components/ShopTable/ShopTable";
import TotalShopsCard from "./components/TotalShopsCard/TotalShopsCard";
import { Grid } from "@material-ui/core";
import ShowAddShopFormButton from "./components/ShowAddShopFormButton/ShowAddShopFormButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    rootContainer: {
    }
}));

// shop: {
//   id
//   name
//   address
// }

const mapShopsToShopOptions = (shops) => {
    return shops.map((s) => {
        return {
            id: s.id,
            name: s.name,
            address: `${s.street}, ${'USA'}`,
            status: 'Pending'
        }
    })
}


const ShopTracker = () => {
    const classes = useStyles();
    const [showOrderForm, setOrderForm] = useState(false)
    const [loading, setLoading] = useState(true)
    const [shops, setShops] = useState([]);
    const [selectedShop, setSelectedShop] = useState(null);


    useEffect(() => {
        async function fetchData() {
            let response = await axios.get("/shop/request/all");
            let body = response.data;

            const shopOptions = body.request_shop_response.map((s) => {
                return {
                    id: s.id,
                    name: s.name,
                    street: s.street,
                    city: s.city,
                    providence: s.providence,
                    zip: s.zip_4,
                    zoneName: ""
                }
            });
            setSelectedShop(shopOptions[0])
            setShops(shopOptions)
            setLoading(false)
        }
        fetchData().then()
    }, [])

    const shopShowDetailHandler = (shopId) => {
        const selectedShopRaw = shops.filter((o) => o.id === shopId);
        setSelectedShop(selectedShopRaw[0])
    }

    return (
        <WithSignedInSkeleton title={'Shop Tracker'}>
            {!loading ? (
                <>
                    <Grid container lg={12} xs={12} spacing={3} className={classes.rootContainer}>
                        <Grid item lg={9} xs={12}>
                        <Grid container>
                            <Grid item lg={12} xs={12}>
                                <ShopTable
                                    rows={mapShopsToShopOptions(shops)}
                                    shopShowDetailHandler={shopShowDetailHandler}
                                />
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <ShopInfoPaper
                                    id={selectedShop.id}
                                    name={selectedShop.name}
                                    street={selectedShop.street}
                                    city={selectedShop.city}
                                    providence={selectedShop.providence}
                                    zip={selectedShop.zip}
                                    zoneName={selectedShop.zoneName}
                                />
                            </Grid>
                        </Grid>
                        </Grid>
                        <Grid item lg={3} xs={12}>
                            <Grid container spacing={2} justify="center">
                                <Grid item lg={12} xs={6}>
                                    <ShowAddShopFormButton
                                        disable={showOrderForm}
                                        // onClickHandler={onFormShowHandler}
                                        title={"Add New Shop"}
                                    />
                                </Grid>
                                <Grid item lg={12} xs={6}>
                                    <TotalShopsCard
                                        shopnumbers={shops.length}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/*{showOrderForm ? (*/}
                    {/*    <OrderForm*/}
                    {/*        showForm={showOrderForm}*/}
                    {/*        onCloseButtonHandler={onFormCloseHandler}*/}
                    {/*        shops={shopOptions}*/}
                    {/*        products={productOptions}*/}
                    {/*    />*/}
                    {/*) : null}*/}
                </>

            ) : <CircularProgress />

            }
        </WithSignedInSkeleton>
    )
}

export default ShopTracker