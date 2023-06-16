import { useNavigate } from "react-router-dom";
import TitleContent from "../components/TitleContent";
import { useDispatch, useSelector } from "react-redux";
import Table from "../components/Table";
import { UsersInterface } from "../mocup";
import RowTable from "../components/RowTable";
import { useEffect, useState } from "react";
import { deleteUser, headers } from "../reducers/users";
import Pagination from "../components/Pagination";

export default function Home() {
    const users = useSelector((state:any)=> state.user.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [list, setList] = useState<UsersInterface[]>([]);
    const [size, setSize] = useState(0);
    const [page, setPage] = useState(0);

    const hadlePage = () => {
        const defaultRound = page * 3
        const index = defaultRound + 3;
        console.log("page: ", page);
        console.log("size: ", size);
        console.log("default: ", defaultRound);
        console.log("index: ", index);
        let value:UsersInterface[] = [];
        for(let i=defaultRound; i<index; i++) {
            if(!users[i]) break;
            value.push(users[i]);
        }
        setList([...value]);
    }

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])

    useEffect(()=>{
        hadlePage();
        const lengthUser = Math.ceil(users.length/3);
        setSize(lengthUser);
    },[users, page]);

    return(
        <div className="container-content">
        <TitleContent 
            title="User List" 
            buttonName="Add +" 
            onClick={()=>{
                navigate("/create");
            }} />
        <div className="table-row-content">
            <Table 
                headers={
                    headers.map((data:any, index:number)=>{
                        return <div key={index} style={{minWidth: data.size}} className="header-item">{data.title}</div>
                    })
                } 
                items={
                    list.map((data:UsersInterface, index:number)=>{
                        return(
                            <RowTable
                                key={index}
                                _id={data?._id} 
                                firstName={data?.firstName} 
                                lastName={data?.lastName} 
                                gender={data?.gender} 
                                birthDate={data?.birthDate}
                                profile={data?.profile}
                                onClick={(id)=>{
                                    dispatch(deleteUser(id));
                                }}
                                width={headers.map((data:any, index:number)=>{
                                    return  data.size;
                                })}
                                />
                        );
                    })
                } 
                width="1200px"/>
            <Pagination 
                pageSize={size} 
                plus={()=>{
                    if(page<=size) return;
                    setPage(page+1);
                }} 
                minus={()=>{
                    if(page<1) return;
                    setPage(page-1);
                }}
                setSize={(i)=>{setPage(i-1)}} 
                target={page} />
        </div>
      </div>
    )
}