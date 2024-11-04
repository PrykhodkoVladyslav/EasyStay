import VerticalPad from "components/ui/VerticalPad.tsx";
import InfoInput from "components/ui/design/InfoInput.tsx";
import { User } from "interfaces/user";

const PersonalDataBlock = (props: { user: User }) => {
    const { user } = props;

    return <div className="personal-data-block">
        <h3 className="personal-data-title">Ваші дані</h3>

        <VerticalPad heightPx={24} />

        <div className="personal-data-rows">
            <div className="personal-data-columns">
                <InfoInput title="Ім'я" value={user.firstName} />
                <InfoInput title="Прізвище" value={user.lastName} />
            </div>
            <InfoInput title="Email" value={user.email} />
        </div>
    </div>;
};

export default PersonalDataBlock;