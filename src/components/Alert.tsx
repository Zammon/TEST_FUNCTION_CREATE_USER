import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "../reducers/alert";
import { useEffect } from "react";
import { editUser } from "../reducers/users";
import { useNavigate } from "react-router-dom";

export default function Alert() {
    const alert = useSelector((state:any)=> state.alert.open);
    const typeAlert = useSelector((state:any)=> state.alert.type);
    const detail = useSelector((state:any)=>{return {title: state.alert.title, description: state.alert.description}});
    const edit = useSelector((state:any)=> state.user.datailEditUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return(
        <>
            {
                alert ?
                <div className="container-alert">
                    <div className="box-content">
                        <div className="item-content">
                            <h2>{detail.title}</h2>
                            {typeAlert === "prompt" ?
                                (
                                <div className="cotent-prompt">
                                    <button className="buttons default" onClick={()=>{dispatch(changeStatus(false))}}>
                                        CANCEL
                                    </button>
                                    <button className="buttons create" onClick={()=>{
                                        dispatch(editUser(edit)); 
                                        dispatch(changeStatus(false));
                                        navigate("/")
                                    }}>
                                        SAVE
                                    </button>
                                </div>
                                ):(<div>{detail.description}</div>)
                            }
                        </div>
                    </div>
                    <div className="bg-content" onClick={()=>{dispatch(changeStatus(false))}}></div>
                </div>
                :
                <></>
            }
        </>
    )
}