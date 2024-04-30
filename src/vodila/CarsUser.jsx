import { useState } from 'react';

function DriversTab() {
  const [activeTab, setActiveTab] = useState('confirmed');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const confirmDriver = () => {
    // Здесь можно добавить логику для отправки данных на сервер
    hideModal();
  };

  const hideModal = () => {
    // Закрытие модального окна
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
                {/* Список подтвержденных водителей */}
              </div>
            )}
            {activeTab === 'pending' && (
              <div id="pending-drivers">
                {/* Список водителей на подтверждении */}
                <button onClick={() => confirmDriver()}>Подтвердить водителя</button>
                {/* Модальное окно */}
                <div className="modal">
                  <div className="modal-content">
                    <h2>Подтверждение водителя</h2>
                    <p>Введите ФИО водителя:</p>
                    <input type="text" id="driverName" name="driverName" placeholder="Фамилия Имя Отчество" />
                    <button onClick={() => confirmDriver()}>Подтвердить</button>
                    <button onClick={() => hideModal()}>Отмена</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriversTab;
