import "./../../../css/stage-indicator.scss";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";

interface IStageIndicatorProps {
    options: string[];
    currentOptionIndex: number;
}

const StageIndicator = (props: IStageIndicatorProps) => {
    const { options, currentOptionIndex } = props;

    const optionsItems = options.map((option, index) => (
        <div key={index * 2} className="option-container">
            <div className={`option-circle ${(index <= currentOptionIndex) ? "green" : "gray"}`}>
                {index < currentOptionIndex
                    ? <img src={getPublicResourceUrl("icons/stageIndicator/done.svg")} alt="done" />
                    :
                    <p className={`index ${index === currentOptionIndex ? "index-current" : "index-other"}`}>
                        {index + 1}
                    </p>}
            </div>
            <p className="option-name">{option}</p>
        </div>
    ));

    const allItems = optionsItems.flatMap((item, index) => (
        index < options.length - 1 ? [item, <div key={index * 2 + 1} className="vertical-line" />] : [item]
    ));

    return (
        <div className="stage-indicator-main-container">
            {allItems}
        </div>
    );
};

export default StageIndicator;