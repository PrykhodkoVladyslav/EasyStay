import VerticalPad from "components/ui/VerticalPad.tsx";
import { addDays, addMonths, addWeeks, format, getDate, startOfMonth, startOfWeek } from "date-fns";
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

interface IDatePickerModalProps {
    onSelectionChange?: (from: Date | null, to: Date | null) => void;
    isOpen: boolean;
    onClose: () => void;
}

const DatePickerModal = (props: IDatePickerModalProps) => {
    const [showedMonth, setShowedMonth] = useState(new Date());
    const nextMonth = addMonths(showedMonth, 1);

    const [selectedFirst, setSelectedFirst] = useState<Date | null>(null);
    const [selectedSecond, setSelectedSecond] = useState<Date | null>(null);

    const setDates = (first: Date | null, second: Date | null) => {
        setSelectedFirst(first);
        setSelectedSecond(second);

        props.onSelectionChange?.(first, second ?? first);
    };

    const isSelectedDate = (date: Date) => {
        if (selectedFirst !== null && selectedFirst.getTime() === date.getTime())
            return true;
        if (selectedSecond !== null && selectedSecond.getTime() === date.getTime())
            return true;

        return false;
    };
    const isInRange = (date: Date) => {
        if (selectedFirst === null || selectedSecond === null)
            return false;

        return selectedFirst.getTime() < date.getTime() && date.getTime() < selectedSecond.getTime();
    };
    const setSelectedDate = (date: Date) => {
        if (selectedFirst === null) {
            setDates(date, null);
        } else if (selectedSecond === null) {
            if (selectedFirst.getTime() < date.getTime()) {
                setDates(selectedFirst, date);
            } else {
                setDates(date, selectedFirst);
            }
        }
    };
    const unsetSelectedDate = (date: Date) => {
        if (selectedFirst?.getTime() == date.getTime()) {
            setSelectedFirst(selectedSecond);
            setSelectedSecond(null);
            setDates(selectedSecond, null);
            return;
        }

        if (selectedSecond?.getTime() == date.getTime()) {
            setDates(selectedFirst, null);
            return;
        }
    };
    const switchSelectedDay = (date: Date) => {
        if (isSelectedDate(date)) {
            unsetSelectedDate(date);
        } else {
            setSelectedDate(date);
        }
    };

    const canShowDate = () => selectedFirst !== null || selectedSecond !== null;
    const toStringDate = (date: Date) => format(date, "MM.dd");
    const getDateFrom = () => {
        if (selectedFirst === null)
            return "";

        return toStringDate(selectedFirst);
    };
    const getDateTo = () => {
        if (selectedFirst === null)
            return "";

        return toStringDate(selectedSecond ?? selectedFirst);
    };

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
                            <div key={dayIndex}
                                 className={`day-container ${isSelectedDate(day) ? "day-container-selected" : ""} ${isInRange(day) ? "day-container-in-range" : ""}`}
                                 onClick={() => switchSelectedDay(day)}>
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

    if (!props.isOpen) {
        return null;
    }

    return (
        <div className="date-picker-modal">
            <div className="date-picker-background" onClick={props.onClose} />

            <div className="date-picker-container">
                <div className="selected-dates">
                    {canShowDate() && <>
                        <span>{getDateFrom()}</span>
                        <img src={getPublicResourceUrl("icons/calendar-arrow.svg")} alt="Arrow" />
                        <span>{getDateTo()}</span>
                    </>}
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
