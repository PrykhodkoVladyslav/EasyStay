import {getPublicResourceUrl} from "utils/publicAccessor.ts";

const PaymentDataPage = () => {

    return (
        <div className="payment-conteiner">
        <p className="pre-title">Платіжні дані</p>
            <h1 className="pre-info">Безпечно додайте або видаліть способи оплати, щоб спростити процес бронювання.</h1>

            <div className="card-conteiner">
            <div className="card-information">
                <p className="payment-card-p">Платіжні карти</p>
                <div className="card-num-cont">
                    <div className="card-type-img" ><img src={getPublicResourceUrl("icons/visa.svg")}></img></div>
                <p className="card-number">···· 8399</p>
                </div>
                <p className="payment-card-p">02-2038</p>
                <button className="delete-card-btn">Видалити</button>
            </div>

            <div className="add-card-div">
                <p className="new-card-p">Нова карта</p>
                <button className="add-card-btn">Додати карту</button>
            </div>
            </div>

        </div>
    );
}

export default PaymentDataPage;