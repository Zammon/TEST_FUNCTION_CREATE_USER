import { ReactNode, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

export interface PaginationInterface {
    pageSize: number;
    target: number;
    plus: ()=>void;
    minus: ()=>void;
    setSize: (i:number)=>void;
}

interface NumberPageInterface {
    title: number;
    target: number;
    setSize: (i:number)=>void;
}

function NumberPage({target, title, setSize}:NumberPageInterface) {
    return(
        <div 
        style={{fontWeight: target===title ? "500":""}} 
        className="number-button-pagination" 
        onClick={()=>setSize(title)}>
            {title}
        </div>
    )
}

export default function Pagination({pageSize, target, plus, minus, setSize}:PaginationInterface) {
    const [buttonPages, setButtonPages] = useState<ReactNode[]>([]);
    const hadleButtonPage = () => {
        let components:ReactNode[] = [];
        for(let i=1; i<=pageSize; i++) {
            components.push(<NumberPage key={i} title={i} target={target+1} setSize={setSize} />)
            
        }
        setButtonPages([components]);
    }

    useEffect(()=>{
        hadleButtonPage();
    },[target, pageSize])

    return(
        <div className="container-pagination">
            <div className="content-pagination">
                <div className="button-left-pagination" onClick={minus}>
                    <IoIosArrowBack />
                </div>
                <div className="rows-pagination">
                    {
                        buttonPages.map((data)=>(data))
                    }
                </div>
                <div className="button-right-pagination" onClick={plus}>
                    <IoIosArrowForward />
                </div>
            </div>
        </div>
    )
}