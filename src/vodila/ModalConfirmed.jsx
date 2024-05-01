import React, { useState } from 'react';
import axios from 'axios';

function ModalConfirmed({ onClose, driverId }) {
    const [fullname, setFullName] = useState('');
    const [carId, setCarId] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (fullname && carId) {
            try {
                const response = await axios.post('http://localhost:2000/api/confirmed', { id: driverId, fullname, carId });
                console.log(response.data); // Что-то делайте с ответом от сервера
                onClose(); // Закрываем модальное окно после успешного подтверждения
            } catch (error) {
                console.error('Ошибка при отправке данных:', error);
                setError('Ошибка при отправке данных');
            }
        } else {
            setError('Пожалуйста, заполните все поля');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            <div className="bg-white p-8 rounded-lg z-10">
                <h2 className="text-lg font-semibold mb-4">Подтверждение водителя</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">ФИО водителя:</label>
                        <input type="text" id="fullName" name="fullName" value={fullname} onChange={(e) => setFullName(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="carId" className="block text-sm font-medium text-gray-700">ID машины:</label>
                        <input type="text" id="carId" name="carId" value={carId} onChange={(e) => setCarId(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                    <div className="flex justify-end">
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Подтвердить</button>
                        <button type="button" onClick={onClose} className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Отмена</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalConfirmed;
