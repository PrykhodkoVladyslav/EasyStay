import { getApiImageUrl } from "utils/apiImageAccessor.ts";
import { useState } from "react";

interface IPhotoSliderProps {
    photos: string[];
}

const PhotoSlider = (props: IPhotoSliderProps) => {
    const photos = props.photos;

    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

    return (
        <div className="photo-slider">
            <img className="photo" src={getApiImageUrl(photos[selectedPhotoIndex], 800)} alt="photo" />

            <div className="centered-container">
                <div className="slide-container" onClick={e => e.stopPropagation()}>
                    {Array.from({ length: photos.length }, (_, index) => index).map((photoIndex) => (
                        <div key={photoIndex}
                             className={`slider-item pointer ${selectedPhotoIndex === photoIndex ? "slider-item-selected" : ""}`}
                             onClick={() => setSelectedPhotoIndex(photoIndex)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PhotoSlider;