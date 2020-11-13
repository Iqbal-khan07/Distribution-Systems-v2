import React, {useState} from "react";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";
import ShopTable from "./components/ShopTable/ShopTable";
import TotalShopsCard from "./components/TotalShopsCard/TotalShopsCard";
import {Grid} from "@material-ui/core";
import ShowAddShopFormButton from "./components/ShowAddShopFormButton/ShowAddShopFormButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  rootContainer: {
      margin: "20px 0"
  }
}));

const rows = [
  createData(111111, 'ABC General Store', '123 Main Street Anytown, USA'),
  createData(111112, 'Super Super Market', '123 Main Street Anytown, USA'),
  createData(111113, 'Corner Central', '123 Main Street Anytown, USA'),
  createData(111114, 'Store Name', '123 Main Street Anytown, USA'),
  createData(111115, 'Store Name', '123 Main Street Anytown, USA'),
  createData(111116, 'Store Name', '123 Main Street Anytown, USA'),
  createData(111117, 'Store Name', '123 Main Street Anytown, USA'),
  createData(111118, 'Store Name', '123 Main Street Anytown, USA'),
  createData(111119, 'Store Name', '123 Main Street Anytown, USA'),
  createData(111120, 'Store Name', '123 Main Street Anytown, USA'),
  createData(111121, 'Store Name', '123 Main Street Anytown, USA'),
  createData(111122, 'Store Name', '123 Main Street Anytown, USA'),
  createData(111123, 'Store Name', '123 Main Street Anytown, USA'),
]

function createData(id, name, address) {
  return { id, name, address };
}

const ShopTracker = () => {
    const classes = useStyles();
    const [totalShops, setTotalShops] = useState(0);
    const [showOrderForm, setOrderForm] = useState(false)
    const [loading, setLoading] = useState(false)

    return (
        <WithSignedInSkeleton title={'Shop Tracker'}>
            {!loading ? (
                <>
                    <div className={classes.rootContainer}>
                        <Grid container spacing={3}>
                            <Grid item lg={9}>
                                <ShopTable
                                    rows={rows}
                                />
                            </Grid>
                            <Grid item lg={3} container direction={"column"} spacing={2}>
                                <div>
                                    <ShowAddShopFormButton
                                        disable={showOrderForm}
                                        // onClickHandler={onFormShowHandler}
                                        title={"Add New Shop"}
                                    />
                                </div>
                                <div>
                                    <TotalShopsCard
                                        shopnumbers={totalShops}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    {/*{showOrderForm ? (*/}
                    {/*    <OrderForm*/}
                    {/*        showForm={showOrderForm}*/}
                    {/*        onCloseButtonHandler={onFormCloseHandler}*/}
                    {/*        shops={shopOptions}*/}
                    {/*        products={productOptions}*/}
                    {/*    />*/}
                    {/*) : null}*/}
                </>

            ): <CircularProgress />

            }
        </WithSignedInSkeleton>
    )
}

export default ShopTracker