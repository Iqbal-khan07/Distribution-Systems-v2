import React, { useEffect, useState } from "react";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import EmployeeTable from "./components/EmployeeTable/EmployeeTable";
import EmployeeInfoCard from "./components/EmployeeInfoCard/EmployeeInfoCard";
import AddEmployeeButton from "./components/AddEmployeeButton/AddEmployeeButton";
import AddEmployeeForm from "./components/AddEmployeeForm/AddEmployeeForm";
import OrdersFulfilledCard from "./components/OrdersFulfilledCard/OrdersFulfilledCard";
import OrderTakerGoalCard from "./components/OrderTakerGoalCard/OrderTakerGoalCard";
import SetGoalForm from "./components/SetGoalForm/SetGoalForm";

const useStyles = makeStyles((theme) => ({
    rootContainer: {
    }
}));

const deliveredOrders = (deliveries, id) => {
    let completed = 0;
    for (let i = 0; i < deliveries.length; i++) {
        if (deliveries[i].orderFulfillerId != null && deliveries[i].orderFulfillerId === id) {
            completed++;
        }
    }
    return completed;
};


const Employees = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [deliveries, setDeliveries] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showEmployeeForm, setShowEmployeeForm] = useState(false);
    const [showOFComponents, setShowOFComponents] = useState(false);
    const [showOTComponents, setShowOTComponents] = useState(false);
    const [roles, setRoles] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        async function fetchData() {
            let response = await axios.get("/users/all");
            let body = response.data;

            const rawEmployees = body.data.map((s) => {
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
            let roles = [
                {id: 1, role: "Order Taker"},
                {id: 2, role: "Order Fulfiller"},
                {id: 3, role: "Administrator"}
            ]
            response = await axios.get("/orders/today");
            body = response.data;
            const rawDeliveries = body.data.map((s) => {
                let UFId = null;
                if (s.order_fulfiller) {
                    UFId = s.order_fulfiller.id;
                }
                return {
                    id: s.id,
                    orderFulfillerId: UFId
                }
            });

            setDeliveries(rawDeliveries);
            setEmployees(rawEmployees);
            setSelectedEmployee(rawEmployees[0]);
            setRoles(roles);
            setLoading(false);
        }
        fetchData().then()
    }, [reload])



    const employeeShowDetailHandler = (employeeId) => {
        const selectedShopRaw = employees.filter((o) => o.id === employeeId);
        setSelectedEmployee(selectedShopRaw[0]);
        switch (selectedShopRaw[0].role) {
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

    const handleReload = () => {
        setReload((p) => !p);
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
                                            delivered={deliveredOrders(deliveries, selectedEmployee.id)}
                                        /> : null
                                    }
                                    {showOTComponents ?
                                        <OrderTakerGoalCard
                                            name={`${selectedEmployee.first} ${selectedEmployee.last}`}
                                            id={selectedEmployee.id}
                                            goal={10000}
                                            current={2}
                                            order={3}
                                        /> : null
                                    }
                                </Grid>
                                <Grid item lg={4} xs={12}>
                                    {showOTComponents ?
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
                            reload={handleReload}
                        />
                    ) : null}

                </>
            ) : <CircularProgress />
            }
        </WithSignedInSkeleton>
    )
}

export default Employees;