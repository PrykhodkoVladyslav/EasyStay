import "./../../../css/info-input.scss";

const InfoInput = (props: { title: string, value: string }) => {
    return <div className="info-input-container">
        <p className="info-input-title">{props.title}</p>
        <input className="info-input-input" type="text" value={props.value} readOnly={true} />
    </div>;
};

export default InfoInput;