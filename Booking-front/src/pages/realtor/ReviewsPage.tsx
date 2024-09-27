import {getPublicResourceUrl} from "utils/publicAccessor.ts";

const ReviewsPage = () => {

    return (
        <div className="reviews-content">
            <div className="top">
                <p className="title">Відгуки</p>
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

            <div className="reviews">
                <div className="review">
                    <div className="author">
                        <div className="image">
                            <img
                                src={getPublicResourceUrl('account/no_user_photo.png')}
                                alt="realtor name"
                            />
                        </div>
                        <div className="container9">
                            <p className="name">Марія</p>
                            <div className="stars-container">
                                <img
                                    src={getPublicResourceUrl("account/home/star.svg")}
                                    alt=""
                                    className="star"
                                />
                                <p className="rating">
                                    9.7
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="description">
                        Розташування було дуже близько до центру міста. Господар був дуже добрим. Квартира була
                        дуже чистою та дуже добре мебльованою. Ціна була дуже хорошою.
                    </p>

                    <button className="btn-delete">
                        <img
                            src={getPublicResourceUrl("account/trash.svg")}
                            alt=""/>
                    </button>
                </div>
                <div className="review">
                    <div className="author">
                        <div className="image">
                            <img
                                src={getPublicResourceUrl('account/no_user_photo.png')}
                                alt="realtor name"
                            />
                        </div>
                        <div className="container9">
                            <p className="name">Олександра dsad as d asd dad s </p>
                            <div className="stars-container">
                                <img
                                    src={getPublicResourceUrl("account/home/star.svg")}
                                    alt=""
                                    className="star"
                                />
                                <p className="rating">
                                    9.7
                                </p>
                            </div>
                        </div>

                    </div>

                    <p className="description">
                        Розташування було дуже близько до центру міста. Господар був дуже добрим. Квартира була
                        дуже
                        чистою та дуже добре мебльованою. Ціна була дуже хорошою.Розташування було дуже близько
                        до центру міста. Господар був дуже добрим. Квартира була дуже
                        чистою та дуже добре мебльованою. Ціна була дуже хорошою.Розташування було дуже близько
                        до центру міста. Господар був дуже добрим. Квартира була дуже
                        чистою та дуже добре мебльованою. Ціна була дуже хорошою.
                    </p>
                </div>
                <div className="review">
                    <div className="author">
                        <div className="image">
                            <img
                                src={getPublicResourceUrl('account/no_user_photo.png')}
                                alt="realtor name"
                            />
                        </div>
                        <div className="container9">
                            <p className="name">Даніела</p>
                            <div className="stars-container">
                                <img
                                    src={getPublicResourceUrl("account/home/star.svg")}
                                    alt=""
                                    className="star"
                                />
                                <p className="rating">
                                    9.7
                                </p>
                            </div>
                        </div>

                    </div>

                    <p className="description">
                        Розташування було дуже близько до центру міста. Господар був дуже добрим. Квартира була
                        дуже
                        чистою та дуже добре мебльованою. Ціна була дуже хорошою.
                    </p>
                </div>
                <div className="review">
                    <div className="author">
                        <div className="image">
                            <img
                                src={getPublicResourceUrl('account/no_user_photo.png')}
                                alt="realtor name"
                            />
                        </div>
                        <div className="container9">
                            <p className="name">Марія</p>
                            <div className="stars-container">
                                <img
                                    src={getPublicResourceUrl("account/home/star.svg")}
                                    alt=""
                                    className="star"
                                />
                                <p className="rating">
                                    9.7
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="description">
                        Розташування було дуже близько до центру міста. Господар був дуже добрим. Квартира була
                        дуже чистою та дуже добре мебльованою. Ціна була дуже хорошою.
                    </p>
                </div>
                <div className="review">
                    <div className="author">
                        <div className="image">
                            <img
                                src={getPublicResourceUrl('account/no_user_photo.png')}
                                alt="realtor name"
                            />
                        </div>
                        <div className="container9">
                            <p className="name">Даніела</p>
                            <div className="stars-container">
                                <img
                                    src={getPublicResourceUrl("account/home/star.svg")}
                                    alt=""
                                    className="star"
                                />
                                <p className="rating">
                                    9.7
                                </p>
                            </div>
                        </div>

                    </div>

                    <p className="description">
                        Розташування було дуже близько до центру міста. Господар був дуже добрим. Квартира була
                        дуже
                        чистою та дуже добре мебльованою. Ціна була дуже хорошою.
                    </p>
                </div>
                <div className="review">
                    <div className="author">
                        <div className="image">
                            <img
                                src={getPublicResourceUrl('account/no_user_photo.png')}
                                alt="realtor name"
                            />
                        </div>
                        <div className="container9">
                            <p className="name">Олександра dsad as d asd dad s </p>
                            <div className="stars-container">
                                <img
                                    src={getPublicResourceUrl("account/home/star.svg")}
                                    alt=""
                                    className="star"
                                />
                                <p className="rating">
                                    9.7
                                </p>
                            </div>
                        </div>

                    </div>

                    <p className="description">
                        Розташування було дуже близько до центру міста. Господар був дуже добрим. Квартира була
                        дуже
                        чистою та дуже добре мебльованою. Ціна була дуже хорошою.Розташування було дуже близько
                        до центру міста. Господар був дуже добрим. Квартира була дуже
                        чистою та дуже добре мебльованою. Ціна була дуже хорошою.Розташування було дуже близько
                        до центру міста. Господар був дуже добрим. Квартира була дуже
                        чистою та дуже добре мебльованою. Ціна була дуже хорошою.
                    </p>
                </div>
                <div className="review">
                    <div className="author">
                        <div className="image">
                            <img
                                src={getPublicResourceUrl('account/no_user_photo.png')}
                                alt="realtor name"
                            />
                        </div>
                        <div className="container9">
                            <p className="name">Олександра dsad as d asd dad s </p>
                            <div className="stars-container">
                                <img
                                    src={getPublicResourceUrl("account/home/star.svg")}
                                    alt=""
                                    className="star"
                                />
                                <p className="rating">
                                    9.7
                                </p>
                            </div>
                        </div>

                    </div>

                    <p className="description">
                        Розташування було дуже близько до центру міста. Господар був дуже добрим. Квартира була
                        дуже
                        чистою та дуже добре мебльованою. Ціна була дуже хорошою.Розташування було дуже близько
                        до центру міста. Господар був дуже добрим. Квартира була дуже
                        чистою та дуже добре мебльованою. Ціна була дуже хорошою.Розташування було дуже близько
                        до центру міста. Господар був дуже добрим. Квартира була дуже
                        чистою та дуже добре мебльованою. Ціна була дуже хорошою.
                    </p>
                </div>
                <div className="review">
                    <div className="author">
                        <div className="image">
                            <img
                                src={getPublicResourceUrl('account/no_user_photo.png')}
                                alt="realtor name"
                            />
                        </div>
                        <div className="container9">
                            <p className="name">Даніела</p>
                            <div className="stars-container">
                                <img
                                    src={getPublicResourceUrl("account/home/star.svg")}
                                    alt=""
                                    className="star"
                                />
                                <p className="rating">
                                    9.7
                                </p>
                            </div>
                        </div>

                    </div>

                    <p className="description">
                        Розташування було дуже близько до центру міста. Господар був дуже добрим. Квартира була
                        дуже
                        чистою та дуже добре мебльованою. Ціна була дуже хорошою.
                    </p>
                </div>
                <div className="review">
                    <div className="author">
                        <div className="image">
                            <img
                                src={getPublicResourceUrl('account/no_user_photo.png')}
                                alt="realtor name"
                            />
                        </div>
                        <div className="container9">
                            <p className="name">Олександра dsad as d asd dad s </p>
                            <div className="stars-container">
                                <img
                                    src={getPublicResourceUrl("account/home/star.svg")}
                                    alt=""
                                    className="star"
                                />
                                <p className="rating">
                                    9.7
                                </p>
                            </div>
                        </div>

                    </div>

                    <p className="description">
                        Розташування було дуже близько до центру міста. Господар був дуже добрим. Квартира була
                        дуже
                        чистою та дуже добре мебльованою. Ціна була дуже хорошою.Розташування було дуже близько
                        до центру міста. Господар був дуже добрим. Квартира була дуже
                        чистою та дуже добре мебльованою. Ціна була дуже хорошою.Розташування було дуже близько
                        до центру міста. Господар був дуже добрим. Квартира була дуже
                        чистою та дуже добре мебльованою. Ціна була дуже хорошою.
                    </p>
                </div>
                <div className="review">
                    <div className="author">
                        <div className="image">
                            <img
                                src={getPublicResourceUrl('account/no_user_photo.png')}
                                alt="realtor name"
                            />
                        </div>
                        <div className="container9">
                            <p className="name">Марія</p>
                            <div className="stars-container">
                                <img
                                    src={getPublicResourceUrl("account/home/star.svg")}
                                    alt=""
                                    className="star"
                                />
                                <p className="rating">
                                    9.7
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="description">
                        Розташування було дуже близько до центру міста. Господар був дуже добрим. Квартира була
                        дуже чистою та дуже добре мебльованою. Ціна була дуже хорошою.
                    </p>
                </div>
                <div className="review">
                    <div className="author">
                        <div className="image">
                            <img
                                src={getPublicResourceUrl('account/no_user_photo.png')}
                                alt="realtor name"
                            />
                        </div>
                        <div className="container9">
                            <p className="name">Олександра dsad as d asd dad s </p>
                            <div className="stars-container">
                                <img
                                    src={getPublicResourceUrl("account/home/star.svg")}
                                    alt=""
                                    className="star"
                                />
                                <p className="rating">
                                    9.7
                                </p>
                            </div>
                        </div>

                    </div>

                    <p className="description">
                        Розташування було дуже близько до центру міста. Господар був дуже добрим. Квартира була
                        дуже
                        чистою та дуже добре мебльованою. Ціна була дуже хорошою.Розташування було дуже близько
                        до центру міста. Господар був дуже добрим. Квартира була дуже
                        чистою та дуже добре мебльованою. Ціна була дуже хорошою.Розташування було дуже близько
                        до центру міста. Господар був дуже добрим. Квартира була дуже
                        чистою та дуже добре мебльованою. Ціна була дуже хорошою.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ReviewsPage;