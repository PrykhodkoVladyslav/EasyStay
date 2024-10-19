import { getApiImageUrl } from "utils/apiImageAccessor.ts";

interface IPhotoSliderProps {
    photos: string[];
}

const PhotoSlider = (props: IPhotoSliderProps) => {
    return (
        <div className="photo-slider">
            <img className="photo" src={getApiImageUrl(props.photos[0], 800)} alt="photo" />

        </div>
    );
};

export default PhotoSlider;