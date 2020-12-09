import React, {useContext, useEffect, useState} from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";
import InventoryTable from "./components/InventoryTable/InventoryTable";
import axios from "axios";
import {UserContext} from "../../context/UserContext";
import {SUPER_USER} from "../../constants/ROLES";
import AddProductForm from "./components/AddProductForm/AddProductForm";

// const inventory = [
//     {
//         id: 1,
//         name: 'Catty',
//         imageUrl: 'https://www.esytolo.com/wp-content/uploads/2020/07/afp-000108378-1.png',
//         description: 'Best Selling',
//         stock: 10,
//         buyingPrice: 100,
//         sellingPrice: 120
//     }
// ]

export default function InventoryManager () {
    const [loading, setLoading] = useState(true)
    const [inventory, setInventory] = useState([]);
    const [company, setCompany] = useState([]);
    const [showProductForm, setShowProductForm] = useState(false);
    const [reload, setReloading] = useState(true)
    const {user} = useContext(UserContext);

    useEffect(() => {
        async function fetchData() {
            let response = await axios.get("/inventory");
            let body = response.data;
            const inventoryData = body.data.map((p) => (
                {
                    id: p.id,
                    name: p.name,
                    imageUrl: p.image_url,
                    description: p.description,
                    stock: p.stock,
                    buyingPrice: p.price_buy,
                    sellingPrice: p.price_sell
                }
            ))

            response = await axios.get('/company');
            body = response.data;

            const companyData = body.data.map((c) => (
                {
                    id: c.id,
                    name: c.name
                }
            ))

            setCompany(companyData);
            setInventory(inventoryData);
            setLoading(false);
        }
        fetchData().then()
    }, [reload])

    const onFormShowHandler = () => {
        setShowProductForm(true)
    }

    const onFormCloseHandler = () => {
        setShowProductForm(false)
    }

    const handleReload = () => {
        setReloading((p) => !p);
    }

    return (
        <WithSignedInSkeleton title={user.role === SUPER_USER ? "Inventory Manager": 'Inventory'}>
            {!loading ? (
                <>
                    <InventoryTable
                        inventory={inventory}
                        reload={setReloading}
                        role={user.role}
                        onAddNewProduct={onFormShowHandler}
                    />
                    {showProductForm ? (
                        <AddProductForm
                            showForm={showProductForm}
                            onCloseButtonHandler={onFormCloseHandler}
                            companies={company}
                            reload={handleReload}
                        />
                    ) : null}
                </>
            ) : <CircularProgress />
            }
        </WithSignedInSkeleton>
    )

}