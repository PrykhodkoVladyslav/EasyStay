import React from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';

interface ModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (date: Date) => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onClose, onConfirm }) => {
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    const handleConfirm = () => {
        if (selectedDate) {
            const now = new Date();
            if (selectedDate < now) {
                setError("Дата та час повинні бути після поточного моменту.");
            } else {
                // Convert selectedDate to UTC
                const utcDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
                // console.log("UTC date:", utcDate.toISOString());
                onConfirm(utcDate);
                setError(null);
                onClose();
            }
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Block User"
            ariaHideApp={false}
            className="fixed inset-0 flex items-center justify-center p-4"
            overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
        >
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Виберіть дату та час блокування</h2>
                <DateTimePicker
                    value={selectedDate ? moment(selectedDate) : undefined} // Convert Date to Moment if needed
                    onChange={(date) => {
                        if (moment.isMoment(date) && date.isValid()) {
                            setSelectedDate(date.toDate()); // Convert Moment to Date
                        } else {
                            console.error("Вибрано невірну дату:", date);
                        }
                    }}
                    dateFormat="YYYY/MM/DD"
                    timeFormat="HH:mm"
                    inputProps={{ className: 'border border-gray-300 rounded-lg p-2 w-full' }}
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={handleConfirm}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Заблокувати
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                    >
                        Скасувати
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalComponent;
