import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ModalConfirmed from './ModalConfirmed';

function DriversTab() {
    const [activeTab, setActiveTab] = useState('confirmed');
    const [cars, setCars] = useState([]);
    const [socket, setSocket] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const socket = io("http://localhost:2000/", {
            reconnectionAttempts: 5,
            timeout: 10000,
        });

        socket.on('GET_CARS', (data) => {
            setCars(data);
        });

        setSocket(socket);

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const confirmDriver = (id) => {
        // Отправляем запрос на сервер для обновления значения active
        socket.emit('UPDATE_DRIVER_ACTIVE', id);
    };

    const handleConfirmModal = (data) => {
        // Здесь можете обработать подтверждение водителя и отправить на сервер
        console.log(data);
        setShowModal(false);
    };

    return (
        <div className=" py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-lg">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex" aria-label="Tabs">
                            <button
                                onClick={() => handleTabClick('confirmed')}
                                className={`${
                                    activeTab === 'confirmed'
                                        ? 'border-b-2 border-gray-900'
                                        : 'border-b-2 border-transparent'
                                } flex-1 py-4 px-6 inline-block text-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:border-b-2 focus:outline-none focus:text-gray-700 focus:border-gray-300`}
                            >
                                Подтвержденные водители
                            </button>
                            <button
                                onClick={() => handleTabClick('pending')}
                                className={`${
                                    activeTab === 'pending'
                                        ? 'border-b-2 border-gray-900'
                                        : 'border-b-2 border-transparent'
                                } flex-1 py-4 px-6 inline-block text-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:border-b-2 focus:outline-none focus:text-gray-700 focus:border-gray-300`}
                            >
                                На подтверждении
                            </button>
                        </nav>
                    </div>
                    <div className="p-6">
                        {activeTab === 'confirmed' && (
                            <div id="confirmed-drivers">
                                <table className="min-w-full">
                                    <thead>
                                        <tr>
                                            <th>Имя</th>
                                            <th>Латитуда</th>
                                            <th>Лонгитуда</th>
                                            <th>Активный</th>
                                            <th>Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cars.map((driver) => (
                                            <tr key={driver.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{driver._id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{driver.lat}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{driver.lng}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{driver.active ? 'Yes' : 'No'}</td>
                                                <td>
                                                    <button onClick={() => confirmDriver(driver.id)}>Подтвердить</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {activeTab === 'pending' && (
                            <div id="pending-drivers">
                                {/* Ваш код для вкладки "На подтверждении" */}
                                <button onClick={() => setShowModal(true)}>Подтвердить водителя</button>
                                {showModal && <ModalConfirmed onConfirm={handleConfirmModal} />}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DriversTab;
