import React, { useContext, useEffect, useState } from "react";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { UserContext } from "../../context/UserContext";
import EmployeeTable from "./components/EmployeeTable/EmployeeTable";
import EmployeeInfoCard from "./components/EmployeeInfoCard/EmployeeInfoCard";
import AddEmployeeButton from "./components/AddEmployeeButton/AddEmployeeButton";
import AddEmployeeForm from "./components/AddEmployeeForm/AddEmployeeForm";
import OrdersFulfilledCard from "./components/OrdersFulfilledCard/OrdersFulfilledCard";
import OrderTakerGoalCard from "./components/OrderTakerGoalCard/OrderTakerGoalCard";
import SetGoalForm from "./components/SetGoalForm/SetGoalForm";
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
    const [showEmployeeForm, setShowEmployeeForm] = useState(false);
    const [showOFComponents, setShowOFComponents] = useState(false);
    const [showOTComponents, setShowOTComponents] = useState(false);
    const [roles, setRoles] = useState([]);
    const [reload, setReload] = useState(false);
    // useEffect(() => {
    //     const roleOptions = ([
    //         { id: 1, role: 'administrator' },
    //         { id: 2, role: 'order-taker' },
    //         { id: 3, role: 'order-fulfiller' }
    //     ]);
    //     setLoading(false);
    // }, []);
    useEffect(() => {
        async function fetchData() {
            let response = await axios.get("/users/all");
            let body = response.data;

            const roleOptions = new Set();
            const rawEmployees = body.data.map((s) => {
                const pair = {id: s.sys_user_role.id, role: s.sys_user_role.name};
                if (!roleOptions.has(pair))
                    roleOptions.add(pair);
                return {
                    id: s.id,
                    first: s.name_first,
                    last: s.name_last,
                    userName: s.sys_username,
                    gmail: s.email_google,
                    fbEmail: s.email_fb,
                    image: s.image_url,
                    phone: s.phone_number,
                    roleId: s.sys_user_role.id,
                    role: s.sys_user_role.name,
                }
            });

            setEmployees(rawEmployees);
            setSelectedEmployee(rawEmployees[0]);
            setRoles(roleOptions);
            setLoading(false);
        }
        fetchData().then()
    }, [reload])



    const employeeShowDetailHandler = (employeeId) => {
        const selectedShopRaw = employees.filter((o) => o.id === employeeId);
        setSelectedEmployee(selectedShopRaw[0]);
        switch(selectedShopRaw[0].role) {
            case "Order Fulfiller":
                setShowOFComponents(true);
                setShowOTComponents(false);
                break;
            case "Order Taker":
                setShowOFComponents(false);
                setShowOTComponents(true);
                break;
            case "Administrator":
                setShowOFComponents(false);
                setShowOTComponents(false);
                break;
            default:
                break;
        }
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
                    <Grid container spacing={3} className={classes.rootContainer}>
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
                                    {showOFComponents ?
                                    <OrdersFulfilledCard
                                        name={`${selectedEmployee.first} ${selectedEmployee.last}`}
                                        delivered={0}
                                        total={4}
                                    /> : null
                                    }
                                    {showOTComponents ?
                                    <OrderTakerGoalCard 
                                        name={`${selectedEmployee.first} ${selectedEmployee.last}`}
                                        goal={10000}
                                        current={2}
                                        order={3}
                                    /> : null
                                    }
                                </Grid>
                                <Grid item lg={4} xs={12}>
                                    {showOTComponents?
                                    <SetGoalForm 
                                        id={selectedEmployee.id}
                                        name={`${selectedEmployee.first} ${selectedEmployee.last}`}
                                    /> : null
                                    }
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