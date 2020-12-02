import React, {useContext, useEffect, useState} from "react";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios'
import {UserContext} from "../../context/UserContext";
import EmployeeTable from "./components/EmployeeTable/EmployeeTable";
import EmployeeInfoCard from "./components/EmployeeInfoCard/EmployeeInfoCard";
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
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    // const [showOrderForm, setShowOrderForm] = useState(false)
    // const [zones, setZones] = useState([]);
    // const [categories, setCategories] = useState([]);
    // const [reload, setReload] = useState(false);
    useEffect(() => {
        const rawEmployees = ([
            {id:10, name:'John Smith', userName: 'jsmith', role: 'order-taker'},
            {id:11, name:'Jane Snow', userName: 'jane123', role: 'admin'},
            {id:9, name:'William Shakespeare', userName: 'will123', role: 'order-fulfiller'}
        ]);
        setEmployees(rawEmployees);
        setSelectedEmployee(rawEmployees[0]);
        setLoading(false);
    }, []);
    // useEffect(() => {
    //     async function fetchData() {
    //         let response = await axios.get("/shops/all");
    //         let body = response.data;

    //         const shopOptions = body.data.map((s) => {
    //             return {
    //                 id: s.id,
    //                 name: s.name,
    //                 userName: "",
    //                 role: "",
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



    const employeeShowDetailHandler = (employeeId) => {
        const selectedShopRaw = employees.filter((o) => o.id === employeeId);
        setSelectedEmployee(selectedShopRaw[0]);
    }

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
                        <Grid item lg={12} xs={12}>
                            <Grid container item>
                                <Grid item lg={9} xs={12}>
                                    <EmployeeTable 
                                        rows={employees}
                                        employeeShowDetailHandler={employeeShowDetailHandler}
                                    />
                                </Grid>
                                <Grid item lg={3} xs={12}>
                                    Button goes here
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={12} xs={12}>
                            <Grid container spacing={2} justify="center">
                                <Grid item lg={5} xs={12}>
                                    <EmployeeInfoCard 
                                        employee={selectedEmployee}
                                    />
                                </Grid>
                                <Grid item lg={3} xs={12}>
                                </Grid>
                                <Grid item lg={4} xs={12}>
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