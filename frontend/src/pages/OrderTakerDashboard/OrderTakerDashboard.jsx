import React, {useState} from "react";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function OrderTakerDashboard() {
    const [loading, setLoading] = useState(false)
    return (
        <WithSignedInSkeleton title={'Dashboard'}>
            {!loading ? (
                <>
                </>
            ) : <CircularProgress />

            }
        </WithSignedInSkeleton>
    )
}