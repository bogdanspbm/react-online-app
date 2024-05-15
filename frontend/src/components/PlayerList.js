import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const PlayerList = ({ setLoggedInUser }) => {
    const [players, setPlayers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedInUser, setLocalLoggedInUser] = useState(null);
    const [error, setError] = useState('');
    const [client, setClient] = useState(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                console.log('Connected to WebSocket server');
                stompClient.subscribe('/topic/onlineUsers', (message) => {
                    const onlineUsers = JSON.parse(message.body);
                    setPlayers(onlineUsers.map(user => user.username));
                });
            },
        });

        stompClient.activate();
        setClient(stompClient);

        return () => {
            stompClient.deactivate();
        };
    }, []);

    useEffect(() => {
        if (loggedInUser && client) {
            const interval = setInterval(() => {
                client.publish({ destination: '/app/ping', body: JSON.stringify({ username: loggedInUser }) });
            }, 10000);

            return () => clearInterval(interval);
        }
    }, [loggedInUser, client]);

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/users/authenticate', {
                username,
                password,
            }, { withCredentials: true });
            if (response.data) {
                setLocalLoggedInUser(response.data.username);
                setLoggedInUser(response.data.username);
                if (!players.includes(response.data.username)) {
                    setPlayers([...players, response.data.username]);
                }
                setError('');
            } else {
                setError('Неверный пароль');
            }
        } catch (error) {
            console.error(error);
            setError('Произошла ошибка при аутентификации');
        }
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('/api/users', {
                username,
                password,
            }, { withCredentials: true });
            if (response.data) {
                setLocalLoggedInUser(username);
                setLoggedInUser(username);
                setPlayers([...players, username]);
                setError('');
            }
        } catch (error) {
            console.error(error);
            setError('Произошла ошибка при регистрации');
        }
    };

    return (
        <div className="player-list">
            <h3>Players</h3>
            <ul>
                {players.map((player, index) => (
                    <li key={index}>{player}</li>
                ))}
            </ul>
            {loggedInUser ? (
                <div className="logged-in">
                    <p>{loggedInUser}, вы онлайн</p>
                </div>
            ) : (
                <div className="login-form">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={handleRegister}>Register</button>
                    {error && <p className="error">{error}</p>}
                </div>
            )}
        </div>
    );
};

export default PlayerList;
