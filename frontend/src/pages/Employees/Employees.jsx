import React, { useContext, useEffect, useState } from "react";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios'
import { UserContext } from "../../context/UserContext";
import EmployeeTable from "./components/EmployeeTable/EmployeeTable";
import EmployeeInfoCard from "./components/EmployeeInfoCard/EmployeeInfoCard";
import AddEmployeeButton from "./components/AddEmployeeButton/AddEmployeeButton";
import AddEmployeeForm from "./components/AddEmployeeForm/AddEmployeeForm";
import { SUPER_USER } from "../../constants/ROLES";

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
    const [showEmployeeForm, setShowEmployeeForm] = useState(false)
    const [roles, setRoles] = useState([]);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        const rawEmployees = ([
            { id: 10, name: 'John Smith', userName: 'jsmith', role: 'order-taker' },
            { id: 11, name: 'Jane Snow', userName: 'jane123', role: 'admin' },
            { id: 9, name: 'William Shakespeare', userName: 'will123', role: 'order-fulfiller' }
        ]);
        const roleOptions = ([
            {id: 1, role: 'administrator'},
            {id: 2, role: 'order-taker'},
            {id: 3, role: 'order-fulfiller'}
        ]);
        setEmployees(rawEmployees);
        setSelectedEmployee(rawEmployees[0]);
        setRoles(roleOptions);
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

    const onFormCloseHandler = () => {
        setShowEmployeeForm(false);
    }

    const onFormShowHandler = () => {
        setShowEmployeeForm(true)
    }

    return (
        <WithSignedInSkeleton title={'Employees'}>
            {!loading ? (
                <>
                    <Grid container className={classes.rootContainer}>
                        <Grid item lg={12} xs={12}>
                            <Grid container spacing={3}>
                                <Grid item lg={9} xs={12}>
                                    <EmployeeTable
                                        rows={employees}
                                        employeeShowDetailHandler={employeeShowDetailHandler}
                                    />
                                </Grid>
                                <Grid item lg={3} xs={12}>
                                    <AddEmployeeButton
                                        onClickHandler={onFormShowHandler}
                                        title={"Add An Employee"}
                                    />
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
                    {showEmployeeForm ? (
                        <AddEmployeeForm
                            showForm={showEmployeeForm}
                            onCloseButtonHandler={onFormCloseHandler}
                            roles={roles}
                            reload={setReload}
                        />
                    ) : null}

                </>
            ) : <CircularProgress />
            }
        </WithSignedInSkeleton>
    )
}

export default Employees;