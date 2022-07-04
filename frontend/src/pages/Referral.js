import { Link } from "@mui/material";
import React from "react";

const ReferralLink = () => {
    const userDetails = JSON.parse(localStorage.getItem('userInfo'));

    return (
        <div>
            <Link href={`http://localhost:3000/register/user/${userDetails._id}`} target="_blank" rel="noreferrer">{`http://localhost:3000/register/user/${userDetails._id}`}</Link>
        </div>
    )

}
export default ReferralLink;