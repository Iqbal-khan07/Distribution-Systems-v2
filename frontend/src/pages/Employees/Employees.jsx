import React, {useContext, useEffect, useState} from "react";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios'
import {UserContext} from "../../context/UserContext";
import {SUPER_USER} from "../../constants/ROLES";

const useStyles = makeStyles((theme) => ({
    rootContainer: {
    }
}));

// const mapShopsToShopOptions = (shops) => {
//     return shops.map((s) => {
//         return {
//             id: s.id,
//             name: s.name,
//             address: `${s.street}, ${'USA'}`,
//             status: 'Pending'
//         }
//     })
// }


const Employees = () => {
    const classes = useStyles();
    const { user } = useContext(UserContext);
    // const [showOrderForm, setShowOrderForm] = useState(false)
    const [loading, setLoading] = useState(false);
    // const [shops, setShops] = useState([]);
    // const [selectedShop, setSelectedShop] = useState(null);
    // const [zones, setZones] = useState([]);
    // const [categories, setCategories] = useState([]);
    // const [reload, setReload] = useState(false);


    // useEffect(() => {
    //     async function fetchData() {
    //         let response = await axios.get("/shops/all");
    //         let body = response.data;

    //         const shopOptions = body.data.map((s) => {
    //             return {
    //                 id: s.id,
    //                 name: s.name,
    //                 street: s.street,
    //                 city: s.city,
    //                 providence: s.providence,
    //                 zip: s.zip_4,
    //                 zoneName: s.zones[0].name
    //             }
    //         });

    //         response = await axios.get("/zones/all");
    //         body = response.data;
    //         const zoneOptions = body.data.map((z) => ({
    //             id: z.id,
    //             name: z.name
    //         }))

    //         response = await axios.get("/shop_categories/all");
    //         body = response.data;
    //         const categoryOptions = body.data.map((c) => ({
    //             id: c.id,
    //             name: c.type
    //         }))


    //         setCategories(categoryOptions);
    //         setZones(zoneOptions);
    //         setSelectedShop(shopOptions[0]);
    //         setShops(shopOptions);
    //         setLoading(false);
    //     }
    //     fetchData().then()
    // }, [reload])



    // const shopShowDetailHandler = (shopId) => {
    //     const selectedShopRaw = shops.filter((o) => o.id === shopId);
    //     setSelectedShop(selectedShopRaw[0])
    // }

    // const onFormCloseHandler = () => {
    //     setShowOrderForm(false);
    // }

    // const onFormShowHandler = () => {
    //     setShowOrderForm(true)
    // }

    return (
        <WithSignedInSkeleton title={'Employees'}>
            {!loading ? (
                <>
                    <Grid container spacing={3} className={classes.rootContainer}>
                        <Grid item lg={9} xs={12}>
                            <Grid container item>
                                <Grid item lg={12} xs={12}>
                                </Grid>
                                <Grid item lg={12} xs={12}>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={3} xs={12}>
                            <Grid container spacing={2} justify="center">
                                <Grid item lg={12} xs={6}>
                                </Grid>
                                <Grid item lg={12} xs={6}>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
                ) : <CircularProgress />
            }
        </WithSignedInSkeleton>
    )
}

export default Employees;