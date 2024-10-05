import React, { useState } from 'react';
import {getPublicResourceUrl} from "utils/publicAccessor.ts";

const HotelPage = () => {
    const [currentContainer, setCurrentContainer] = useState(1); // Контролюємо, який блок відображається

    const nextContainer = () => {
        if (currentContainer === 1) {
            setCurrentContainer(2);
        } else {
            // логіка API
            handleSubmit();
        }
    };

    const handleSubmit = () => {

        console.log("Дані відправлені на API");
    };

    return (
        <div className="add-hotel">

            {currentContainer === 1 && (
            <div className="add-hotel-page-1">
                <p className="title">Додайте своє помешкання</p>
                <div className="data-containers">

                    <div className="pre-container">
                        <div className="top">
                            <div className="number">1</div>
                            <p className="title">Дайте опис</p>
                        </div>

                        <div className="container-1">
                            <div className="data">
                                <p className="title">Назва готелю</p>
                                <input
                                    type="text"
                                    placeholder="Назва"/>
                            </div>
                            <div className="data">
                                <p className="title">Категорія готелю</p>
                                <select>
                                    <option value="" disabled selected hidden>Вибрати</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </div>
                            <div className="data">
                                <p className="title">Опис</p>
                                <div className="form-textarea">
                            <textarea
                                placeholder="Текст"
                                maxLength="4000"
                            ></textarea>
                                    <p className="counter">0/4000</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pre-container">
                        <div className="top">
                            <div className="number">2</div>
                            <p className="title">Вкажіть адрес</p>
                        </div>

                        <div className="container-2">
                            <div className="data">
                                <p className="title">Країна</p>
                                <select>
                                    <option value="" disabled selected hidden>Вибрати</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </div>
                            <div className="data">
                                <p className="title">Місто</p>
                                <select>
                                    <option value="" disabled selected hidden>Вибрати</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </div>
                            <div className="data">
                                <p className="title">Назва вулиці</p>
                                <input
                                    type="text"
                                    placeholder="Вулиця"/>
                            </div>
                            <div className="data">
                                <p className="title">Номер будинку</p>
                                <input
                                    type="text"
                                    placeholder="Номер будинку"/>
                            </div>
                            <div className="data">
                                <p className="title">Поверх</p>
                                <input
                                    type="number"
                                    placeholder="Поверх"/>
                            </div>
                            <div className="data">
                                <p className="title">Номер квартири / кімнати</p>
                                <input
                                    type="text"
                                    placeholder="Назва"/>
                            </div>
                        </div>
                    </div>

                    <div className="pre-container">
                        <div className="top">
                            <div className="number">3</div>
                            <p className="title">Чим можуть користуватися гості у цьому готелі?</p>
                        </div>

                        <div className="container-3">
                            <label><input type="checkbox"/> Ресторан</label>
                            <label><input type="checkbox"/> Фітнес-центр</label>
                            <label><input type="checkbox"/> Обслуговування номерів</label>
                            <label><input type="checkbox"/> Кондиціонер</label>
                            <label><input type="checkbox"/> Бар</label>
                            <label><input type="checkbox"/> Пляж</label>
                        </div>
                    </div>

                    <div className="pre-container">
                        <div className="top">
                            <div className="number">4</div>
                            <p className="title"> Ви подаєте сніданок?</p>
                        </div>

                        <div className="container-4">
                            <div className="check-breakfast">
                                <label htmlFor="yes">
                                    <input type="radio" id="yes" value="yes" name="breakfast" checked/>
                                    Так
                                </label>
                                <label htmlFor="no">
                                    <input type="radio" id="no" value="no" name="breakfast"/>
                                    Ні
                                </label>
                            </div>

                            <div className="post-check">
                                <p>Типи сніданку</p>
                                <div className="breakfast">
                                    <label><input type="checkbox"/> <span>Типи сніданку</span></label>
                                    <label><input type="checkbox"/>
                                        <span>Типи сніданкусніданку сніданкусніданку</span></label>
                                    <label><input type="checkbox"/> <span>Типи сніданку сніданку</span></label>
                                    <label><input type="checkbox"/> <span>Типи сніданкусніданку</span></label>
                                    <label><input type="checkbox"/> <span>Типи сніданку</span></label>
                                    <label><input type="checkbox"/>
                                        <span>Типи сніданкусніданкусніданкусніданку</span></label>
                                    <label><input type="checkbox"/> <span>Типи сніданку</span></label>
                                    <label><input type="checkbox"/> <span>Типи сніданку сніданку сніданку</span></label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pre-container">
                        <div className="top">
                            <div className="number">5</div>
                            <p className="title">Чим можуть користуватися гості у цьому готелі?</p>
                        </div>

                        <div className="container-5">
                            <label><input type="checkbox"/> Українська</label>
                            <label><input type="checkbox"/> Англійська</label>
                            <label><input type="checkbox"/> Німецька</label>
                            <label><input type="checkbox"/> Французька</label>
                            <label><input type="checkbox"/> Іспанська</label>
                            <label><input type="checkbox"/> Польська</label>
                        </div>
                    </div>

                    <div className="pre-container">
                        <div className="top">
                            <div className="number">6</div>
                            <p className="title">О котрій у вас відбувається заїзд і виїзд?</p>
                        </div>

                        <div className="container-6">
                            <div className="containers">
                                <p className="title">Заїзд</p>
                                <div className="container">
                                    <div className="from-to">
                                        <p>З</p>
                                        <input type="date"/>
                                    </div>
                                    <div className="from-to">
                                        <p>До</p>
                                        <input type="date"/>
                                    </div>
                                </div>
                            </div>

                            <div className="containers">
                                <p className="title">Виїзд</p>
                                <div className="container">
                                    <div className="from-to">
                                        <p>З</p>
                                        <input type="date"/>
                                    </div>
                                    <div className="from-to">
                                        <p>До</p>
                                        <input type="date"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            )}

            {currentContainer === 2 && (
                <div className="add-hotel-page-2">
                    <div className="top">
                        <p className="title">Додайте фотографії готелю</p>
                        <p className="description">
                            <span>Завантажте принаймні 5 фото свого помешкання.</span>
                            Чим більше фотографій ви завантажите, тим більші ваші шанси отримати бронювання. Ви завжди
                            можете додати більше фото згодом.
                        </p>
                    </div>

                    <div className="photo-container">
                        <label className="add-photo" htmlFor="photo">
                            <div className="inner">
                                <img src={getPublicResourceUrl("account/add-photo.svg")} alt=""/>
                                <input id="photo" type="file" name="photo"/>
                                <span>Завантажити фото</span>
                            </div>
                        </label>

                        <div className="right-section">
                            <p className="title">Ваші фото</p>
                            <div className="photos">

                                <div className="photo">
                                    <img src="" alt=""/>
                                    <button className="btn-delete">
                                        <img
                                            src={getPublicResourceUrl("account/trash.svg")}
                                            alt=""/>
                                    </button>
                                </div>

                                <div className="photo">
                                    <img src="" alt=""/>
                                    <button className="btn-delete">
                                        <img
                                            src={getPublicResourceUrl("account/trash.svg")}
                                            alt=""/>
                                    </button>
                                </div>

                                <div className="photo">
                                    <img src="" alt=""/>
                                    <button className="btn-delete">
                                        <img
                                            src={getPublicResourceUrl("account/trash.svg")}
                                            alt=""/>
                                    </button>
                                </div>

                                <div className="photo">
                                    <img src="" alt=""/>
                                    <button className="btn-delete">
                                        <img
                                            src={getPublicResourceUrl("account/trash.svg")}
                                            alt=""/>
                                    </button>
                                </div>

                                <div className="photo">
                                    <img src="" alt=""/>
                                    <button className="btn-delete">
                                        <img
                                            src={getPublicResourceUrl("account/trash.svg")}
                                            alt=""/>
                                    </button>
                                </div>

                                <div className="photo">
                                    <img src="" alt=""/>
                                    <button className="btn-delete">
                                        <img
                                            src={getPublicResourceUrl("account/trash.svg")}
                                            alt=""/>
                                    </button>
                                </div>

                                <div className="photo">
                                    <img src="" alt=""/>
                                    <button className="btn-delete">
                                        <img
                                            src={getPublicResourceUrl("account/trash.svg")}
                                            alt=""/>
                                    </button>
                                </div>

                                <div className="photo">
                                    <img src="" alt=""/>
                                    <button className="btn-delete">
                                        <img
                                            src={getPublicResourceUrl("account/trash.svg")}
                                            alt=""/>
                                    </button>
                                </div>

                                <div className="photo">
                                    <img src="" alt=""/>
                                    <button className="btn-delete">
                                        <img
                                            src={getPublicResourceUrl("account/trash.svg")}
                                            alt=""/>
                                    </button>
                                </div>

                                <div className="photo">
                                    <img src="" alt=""/>
                                    <button className="btn-delete">
                                        <img
                                            src={getPublicResourceUrl("account/trash.svg")}
                                            alt=""/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <button className="main-button" onClick={nextContainer}>
                Далі
            </button>

        </div>

    );
}

export default HotelPage;