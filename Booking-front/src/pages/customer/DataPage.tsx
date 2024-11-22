const DataPage = () => {

    return (
        <div className="data-content">
            <p className="global-title">Особисті дані</p>
            <form>

                <div className="data">
                    <div className="info">

                    </div>

                    <div className="container10">

                        <div className="containers1">
                            <p>Номер телефону</p>
                            <input className="text-input"
                                   id="phone"
                                   title="Номер телефону"
                                   type="text"
                                   placeholder="Введіть Номер телефону"
                            />

                        </div>

                        <div className="containers1">
                            <p>Дата народження</p>
                            <input
                                className="text-input"
                                id="birthdate"
                                title="Дата народження"
                                type="date"
                                placeholder="Введіть дату народження"
                                max="9999-12-31"
                            />
                        </div>

                        <div className="containers1">
                            <p>Громадянство</p>
                            <select></select>


                        </div>

                        <div className="containers1">
                            <p>Стать</p>
                            <select></select>

                        </div>

                        <div className="containers1">
                            <p>Адреса</p>
                            <input
                                className="text-input"
                                id="address"
                                title="Адреса"
                                type="text"
                                placeholder="Введіть адресу"
                            />

                        </div>

                        <div className="containers2">
                            <div className="container11">
                                <div>
                                    <p>Країна</p>
                                    <select></select>
                                </div>
                                <div>
                                    <p>Місто</p>
                                    <select></select>

                                </div>
                            </div>

                            <button type="submit" className="btn-edit">
                                Редагувати
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default DataPage;