import VerticalPad from "components/ui/VerticalPad.tsx";
import { addDays, addMonths, addWeeks, getDate, startOfMonth, startOfWeek } from "date-fns";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";

import { useState } from "react";

const monthNamesByIndex: Record<number, string> = {
    0: "Січень",
    1: "Лютий",
    2: "Березень",
    3: "Квітень",
    4: "Травень",
    5: "Червень",
    6: "Липень",
    7: "Серпень",
    8: "Вересень",
    9: "Жовтень",
    10: "Листопад",
    11: "Грудень",
};

const shortDayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

const DatePickerModal = () => {
    const [showedMonth, setShowedMonth] = useState(new Date());
    const nextMonth = addMonths(showedMonth, 1);

    const getFirstDisplayDayOfMonth = (date: Date) => {
        const firstDayOfMonth = startOfMonth(date);
        return startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });
    };

    const getWeeksOfMonth = (date: Date) => {
        const firstDayOfWeek = getFirstDisplayDayOfMonth(date);

        return Array.from({ length: 6 }, (_, index) => index).map((weekIndex) => {
            const week = addWeeks(firstDayOfWeek, weekIndex);

            return (
                <div key={weekIndex} className="week-container">
                    {Array.from({ length: 7 }, (_, index) => index).map((dayIndex) => {
                        const day = addDays(week, dayIndex);

                        return (
                            <div key={dayIndex} className="day-container">
                                <p
                                    className={`day-number ${day.getMonth() !== date.getMonth() ? "day-of-other-month" : ""}`}
                                >
                                    {getDate(day)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            );
        });
    };

    const monthName1 = monthNamesByIndex[showedMonth.getMonth()];
    const monthName2 = monthNamesByIndex[nextMonth.getMonth()];

    const weeks1 = getWeeksOfMonth(showedMonth);
    const weeks2 = getWeeksOfMonth(nextMonth);

    return (
        <div className="date-picker-modal">
            <div className="date-picker-container">
                <div className="selected-dates">
                    <span>11.08</span>
                    <img src={getPublicResourceUrl("icons/calendar-arrow.svg")} alt="Arrow" />
                    <span>15.08</span>
                </div>

                <VerticalPad heightPx={16} />

                <div className="line" />

                <VerticalPad heightPx={16} />

                <div className="months-container">
                    <div className="month-container">
                        <div className="month-name-container">
                            <img
                                className="side-arrow-width side-arrow"
                                src={getPublicResourceUrl("icons/calendar-left-arrow.svg")}
                                alt="Arrow"
                                onClick={() => setShowedMonth((oldMonth) => addMonths(oldMonth, -1))}
                            />
                            <p className="month-name">{monthName1}</p>
                            <div className="side-arrow-width" />
                        </div>

                        <VerticalPad heightPx={8} />
                        <div className="line" />
                        <VerticalPad heightPx={8} />

                        <div className="day-names-container">
                            {shortDayNames.map((name, index) => (
                                <p key={index}>{name}</p>
                            ))}
                        </div>
                        <div className="weeks-container">{weeks1}</div>
                    </div>

                    <div className="month-container">
                        <div className="month-name-container">
                            <div className="side-arrow-width" />
                            <p className="month-name">{monthName2}</p>
                            <img
                                className="side-arrow-width side-arrow"
                                src={getPublicResourceUrl("icons/calendar-right-arrow.svg")}
                                alt="Arrow"
                                onClick={() => setShowedMonth((oldMonth) => addMonths(oldMonth, 1))}
                            />
                        </div>

                        <VerticalPad heightPx={8} />
                        <div className="line" />
                        <VerticalPad heightPx={8} />

                        <div className="day-names-container">
                            {shortDayNames.map((name, index) => (
                                <p key={index}>{name}</p>
                            ))}
                        </div>
                        <div className="weeks-container">{weeks2}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatePickerModal;
