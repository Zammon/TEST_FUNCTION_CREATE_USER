import { ReactNode } from "react";

interface CustomTableInterface {
    headers: ReactNode[];
    items: ReactNode[];
    width: string;
}

export default function Table({
    headers,
    items,
    width
    }:CustomTableInterface) {

    return(
        <div className="container-table">
            <div className="overflow-auto">
                <div style={{minWidth: width}} className="header-table">
                    {headers}
                </div>
                <div style={{minWidth: width}} className="body-table">
                    {items.length === 0 ? <div className="no-item-box"> No items.</div>:items}
                </div>
            </div>
        </div>
    )
}