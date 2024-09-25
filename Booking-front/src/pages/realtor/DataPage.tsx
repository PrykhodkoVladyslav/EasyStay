

const DataPage = () => {

    return (
        <div className="data-content">
            <p className="title">Особисті дані</p>

            <div className="data">
                <div className="info">
                    <p className="name">Дмитро Романчук</p>
                    <p className="email">dmytro937@gmail.com</p>
                </div>

                <div className="container10">
                    <div className="containers1">
                        <p>Номер телефону</p>
                        <input className="text-input"
                            id="phone"
                            title="Номер телефону"
                            type="number"
                            placeholder="Введіть Номер телефону"
                            // isError={Boolean(errors.firstName || firstNameError)}
                            // errorMessage={errors?.firstName?.message || firstNameError}
                            // showCross={showCross}
                            // formRegisterReturn={register("firstName")}
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
                            min="1900-01-01"
                            max="2024-12-31"
                        />

                    </div>
                    <div className="containers1">
                        <p>Громадянство</p>
                        <input
                            className="text-input"
                            id="Country"
                            title="Громадянство"
                            type="text"
                            placeholder="Введіть громадянство"
                        />
                    </div>
                    <div className="containers1">
                        <p>Стать</p>
                        <input
                            className="text-input"
                            id="gender"
                            title="Стать"
                            type="text"
                            placeholder="Введіть стать"
                        />
                    </div>
                    <div className="containers1">
                        <p>Адресса</p>
                        <input
                            className="text-input"
                            id="address"
                            title="Адресса"
                            type="text"
                            placeholder="Введіть адрессу"
                        />
                    </div>
                    <div className="containers2">
                        <div className="container11">
                            <div>
                                <p>Країна/регіон</p>
                                <input
                                    className="text-input"
                                       id="text"
                                       title="Країна/регіон"
                                       type="text"
                                       placeholder="Введіть країну/регіон"
                                />
                            </div>
                            <div>
                                <p>Місто</p>
                                <input
                                    className="text-input"
                                       id="text"
                                       title="Місто"
                                       type="text"
                                       placeholder="Введіть місто"
                                />
                            </div>
                        </div>

                        <button className="btn-edit">
                            Редагувати
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DataPage;