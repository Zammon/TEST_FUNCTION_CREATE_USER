import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import moment from "moment";

export interface RowTableInterface {
    _id?: number;
    profile?: any;
    firstName?: string;
    lastName?: string;
    gender?: string;
    birthDate?: any;
    width?: string[];
    onClick: (id?:number)=>void;
}

export default function RowTable({
    _id,
    profile,
    firstName,
    lastName,
    birthDate,
    gender,
    width,
    onClick
    }:RowTableInterface) {
    const navigate = useNavigate();
    const dateFormat = moment(birthDate).format("DD MMMM YYYY"); 
    const capitalizeFirst = (str?:string) => {
        if(!str) return;
        return str.charAt(0).toUpperCase() + str.slice(1);
      };

    return(
        <div className="table-items">
            <div style={{minWidth: width?.[0]}} className="row-item">
               {profile ? <img src={profile} alt="" />:<div className="none-image"></div>}  
            </div>
            <div style={{minWidth: width?.[1]}} className="row-item">
                <div className="text-overflow">
                    {capitalizeFirst(firstName)}
                </div>
            </div>
            <div style={{minWidth: width?.[2]}} className="row-item">
                <div className="text-overflow">
                    {capitalizeFirst(lastName)}
                </div>
            </div>
            <div style={{minWidth: width?.[3]}} className="row-item">
                <div className="text-overflow">
                    {capitalizeFirst(gender)}
                </div>
            </div>
            <div style={{minWidth: width?.[4]}} className="row-item">
                <div className="text-overflow">
                    {dateFormat}
                </div>
            </div>
            <div style={{minWidth: width?.[5]}} className="row-item">
                <button style={{minWidth: "90px"}} className="buttons edit" onClick={()=>{navigate(`/edit/${_id}`)}}>
                    Edit
                </button>
                <button style={{minWidth: "90px", margin: '0'}} className="buttons user-delete" onClick={()=>{onClick(_id);}}>
                    Delecte
                </button>
            </div>
        </div>
    )
}