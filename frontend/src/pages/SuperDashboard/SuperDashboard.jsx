import React, {useState} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";

export default function SuperDashboard(){
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