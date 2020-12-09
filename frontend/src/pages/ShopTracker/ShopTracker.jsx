import React, {useContext, useEffect, useState} from "react";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";

import ShopInfoPaper from "./components/ShopInfoPaper/ShopInfoPaper";
import ShopTable from "./components/ShopTable/ShopTable";
import TotalShopsCard from "./components/TotalShopsCard/TotalShopsCard";
import AddShopForm from "./components/AddShopForm/AddShopForm";
import { Grid } from "@material-ui/core";
import ShowAddShopFormButton from "./components/ShowAddShopFormButton/ShowAddShopFormButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios'
import {UserContext} from "../../context/UserContext";
import {ORDER_FULFILLER} from "../../constants/ROLES";

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
    const { user } = useContext(UserContext);
    const [showOrderForm, setShowOrderForm] = useState(false)
    const [loading, setLoading] = useState(true)
    const [shops, setShops] = useState([]);
    const [selectedShop, setSelectedShop] = useState(null);
    const [zones, setZones] = useState([]);
    const [categories, setCategories] = useState([]);
    const [reload, setReloading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            let response = await axios.get("/shops/all");
            let body = response.data;

            const shopOptions = body.data.map((s) => {
                return {
                    id: s.id,
                    name: s.name,
                    street: s.street,
                    city: s.city,
                    providence: s.providence,
                    zip: s.zip_4,
                    zoneName: s.zones[0].name,
                    phone: s.phone_number,
                    email: s.email,
                    image_url: s.image_url
                }
            });

            response = await axios.get("/zones/all");
            body = response.data;
            const zoneOptions = body.data.map((z) => ({
                id: z.id,
                name: z.name
            }))

            response = await axios.get("/shop_categories/all");
            body = response.data;
            const categoryOptions = body.data.map((c) => ({
                id: c.id,
                name: c.type
            }))


            setCategories(categoryOptions);
            setZones(zoneOptions);
            setSelectedShop(shopOptions[0]);
            setShops(shopOptions);
            setLoading(false);
        }
        fetchData().then()
    }, [reload])

    const handleReload = () => {
        setReloading((p) => !p);
    }

    const shopShowDetailHandler = (shopId) => {
        const selectedShopRaw = shops.filter((o) => o.id === shopId);
        setSelectedShop(selectedShopRaw[0])
    }

    const onFormCloseHandler = () => {
        setShowOrderForm(false);
    }

    const onFormShowHandler = () => {
        setShowOrderForm(true)
    }

    return (
        <WithSignedInSkeleton title={'Shop Tracker'}>
            {!loading ? (
                <>
                    <Grid container spacing={3} className={classes.rootContainer}>
                        <Grid item lg={9} xs={12}>
                            <Grid container item>
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
                                        email={selectedShop.email}
                                        phone={selectedShop.phone}
                                        image_url={selectedShop.image_url}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={3} xs={12}>
                            <Grid container spacing={2} justify="center">
                                <Grid item lg={12} xs={6}>
                                    <ShowAddShopFormButton
                                        disable={showOrderForm || user.role === ORDER_FULFILLER}
                                        onClickHandler={onFormShowHandler}
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
                    {showOrderForm ? (
                        <AddShopForm
                            showForm={showOrderForm}
                            onCloseButtonHandler={onFormCloseHandler}
                            zones={zones}
                            categories={categories}
                            reload={handleReload}
                        />
                    ) : null}
                </>
                ) : <CircularProgress />
            }
        </WithSignedInSkeleton>
    )
}

export default ShopTracker