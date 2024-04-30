import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function Notifications() {

    const [socket, setSocket] = useState(null)
    const [notif, setNotif] = useState([]);
    const [notifik, setNotifik] = useState([]);

    useEffect(() => {
        const socket = io("http://localhost:2000/", {
            reconnectionAttempts: 5,
            timeout: 10000,
        });

        socket.on('GET_NOTIFICATIONS', (data) => {
            setNotif(prevNotif => [...prevNotif, ...data.filter(newNotif => !prevNotif.some(existingNotif => existingNotif.id === newNotif.id))]);
        });

        setSocket(socket);

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        setNotifik([...notifik, ...notif.map(notif => ({ msg: notif.text, time: notif.createdAt }))]);
    }, [notif]);

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="shadow-lg rounded-lg">
            <div className="border-b border-gray-200" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <ul className="grid gap-4">
                    {notifik.map((not, index) => (
                        <li key={index} className='bg-white px-2 py-4 rounded-xl'>
                            <strong>ID:</strong> {not.msg}, <strong>Location:</strong> {not.time}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
    
    );
}

export default Notifications;
