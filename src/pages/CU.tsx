import { UsersInterface } from "../mocup";
import TitleContent from "../components/TitleContent";
import { useEffect, useRef, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { addUser, editUser, setDetailEdit } from "../reducers/users";
import { ALERTTITLE, changeStatus, setDetail } from "../reducers/alert";
import { useNavigate, useParams } from "react-router-dom";

export const TYPECU = Object.freeze({
    CREATE: 'create',
    EDIT: 'edit'
})

export const TITLECU = Object.freeze({
    CREATE: 'Create new User',
    EDIT: 'Edit detail Uer'
})

interface CUinterface {
    type: "create"|"edit";
}


export default function CU({type}:CUinterface) {
    const { id } = useParams();
    const users = useSelector((state:any)=> state.user.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ref = useRef<HTMLInputElement>(null);

    const [user, setUser] = useState<UsersInterface>({
        _id: users.length,
        profile: "",
        firstName: "",
        lastName: "",
        gender: "",
        birthDate: "",
    });

    useEffect(()=>{
        if(type === TYPECU.EDIT) {
            const hadleFilter = (target:any) => { if(target._id === Number(id)) {return target;}};
            const filterUser = users.filter(hadleFilter);
            if(filterUser.length === 0) {
                navigate("/");
                return;
            }
            setUser(filterUser[0]);
            return;
        }
    },[users])

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const base64:any = await hadleConvertBase64(file);
            setUser({...user, profile: base64});
        }
    };

    const hadleConvertBase64 = (file:any) =>{
        return new Promise((resolve, reject)=> {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = (err:any) => {
                reject(err);
            };
        })
    }

    const hadleRemoveProfile = () => {
        setUser({...user, profile: null});
    }

    const hadleSubmit = ()=> {
        if(!(user.firstName&&user.lastName&&user.birthDate&&user.gender)) {
            dispatch(setDetail({
                title: ALERTTITLE.CHECKFORM,
                status: true,
                type: "alert"
            }));
            return;
        }

        if(type === TYPECU.CREATE) {
            dispatch(addUser(user));
            navigate("/");
            return;
        }else if (type === TYPECU.EDIT) {
            dispatch(setDetail({
                title: ALERTTITLE.PROMPT_SAVE,
                status: true,
                type: "prompt"
            }));
            dispatch(setDetailEdit(user));
            return;
        };
    }



    return(
        <div className="container-edit"> 
            <TitleContent title={type===TYPECU.CREATE ? TITLECU.CREATE:TITLECU.EDIT}/>
            <div className="content-edit">
                <div className="rows-input">
                    <div className="sharp-image" onClick={()=>{ref.current?.click()}}>
                       {user.profile && <img src={user.profile} alt="" />}
                        <input 
                            ref={ref} 
                            onChange={handleImageUpload}
                            style={{display: "none"}} 
                            type="file" 
                            accept="image/png, image/jpeg" />
                    </div>
                    <button className="buttons upload" onClick={()=>{ref.current?.click()}}>
                        Upload Profile Picture
                    </button>
                    <button className="buttons delete" onClick={hadleRemoveProfile}>
                        Delete Picture
                    </button>
                </div>
                <div className="rows-input">
                    <div className="items-edit">
                        <div className="rows-item">
                            <label>First Name</label>
                            <input type="text" placeholder="Please enter First name" 
                                value={user.firstName} 
                                onChange={(e)=>{setUser({...user, firstName: e.target.value})}}/>
                        </div>
                        <div className="rows-item">
                            <label>Last Name</label>
                            <input type="text" placeholder="Please enter Last name" 
                                value={user.lastName}
                                onChange={(e)=>{setUser({...user, lastName: e.target.value})}}/>
                        </div>
                    </div>
                    <div className="items-edit">
                        <div className="rows-item">
                            <label>Gender</label>
                            <select 
                                style={{color: user.gender ? "#000":"#868686"}} 
                                onChange={(e)=>{setUser({...user, gender: e.target.value})}}
                                value={user.gender}>
                                <option value="">-- Please select Gender --</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="rows-item">
                            <label>Birthday</label>
                            <input type="date" 
                                value={user.birthDate}
                                onChange={(e)=>{setUser({...user, birthDate: e.target.value})}}
                            />
                        </div>
                    </div>
                    <div className="rows-button">
                        <button className="buttons default" onClick={()=>{navigate("/")}}>
                            CANCEL
                        </button>
                        <button 
                            className={`buttons ${type === TYPECU.CREATE ? "create":"create"}`} 
                            onClick={hadleSubmit}>
                                { type === TYPECU.CREATE ? "CREATE":"SAVE" }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}