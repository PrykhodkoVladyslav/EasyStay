import {getPublicResourceUrl} from "utils/publicAccessor.ts";

const ArchivedPage = () => {

    return (
        <div className="hotels-content">
            <div className="top">
                <p className="title">Мої готелі</p>
                <div className="sort">
                    <button>
                        <img
                            src={getPublicResourceUrl("account/sort.svg")}
                            alt="Sort"
                        />

                        <p>Сортувати за:</p>

                        <p className="sort-active">
                            Назвою
                        </p>
                    </button>

                    <div className="list hidden">
                        List
                    </div>
                </div>

            </div>

            <div className="hotels">
                <div className="hotel">
                    <div className="info">
                        <div className="img"></div>
                        <div className="info">
                            <div className="top-info">
                                <p className="name">Radisson Blu Hotel</p>
                                <div>
                                    <p className="city">Відень</p>
                                    <p className="address">Goldschlagstrase 97</p>
                                </div>
                            </div>

                            <p className="category">Стандартний двомісний номер</p>
                        </div>
                    </div>

                    <div className="actions">
                        <button className="btn-delete">
                            <img
                                src={getPublicResourceUrl("account/trash.svg")}
                                alt=""/>
                        </button>
                        <button className="btn-edit">Редагувати</button>
                    </div>
                </div>
                <div className="hotel">
                    <div className="info">
                        <div className="img"></div>
                        <div className="info">
                            <div className="top-info">
                                <p className="name">Radisson Blu Hotel</p>
                                <div>
                                    <p className="city">Відень</p>
                                    <p className="address">Goldschlagstrase 97</p>
                                </div>
                            </div>

                            <p className="category">Стандартний двомісний номер</p>
                        </div>
                    </div>

                    <div className="actions">
                        <button className="btn-delete">
                            <img
                                src={getPublicResourceUrl("account/trash.svg")}
                                alt=""/>
                        </button>
                        <button className="btn-edit">Редагувати</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArchivedPage;