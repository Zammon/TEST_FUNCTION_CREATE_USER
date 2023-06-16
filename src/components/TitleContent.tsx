interface TitleContentInterface {
    title: string;
    buttonName?: string;
    onClick?: ()=>void;
}

export default function TitleContent({title, buttonName, onClick}:TitleContentInterface) {
    return(
        <div className="title-row-content">
          <h3>
            {title}
          </h3>
          {buttonName ? <button onClick={onClick}>{buttonName}</button>:<></>}
        </div>
)}