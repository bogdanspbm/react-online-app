import React, { useState } from 'react';
import Canvas from './components/Canvas';
import Chat from './components/Chat';
import PlayerList from './components/PlayerList';
import Controls from './components/Controls';
import './App.css';

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    return (
        <div className="app">
            <div className="main-content">
                <Canvas />
                <Chat loggedInUser={loggedInUser} />
            </div>
            <div className="sidebar">
                <PlayerList setLoggedInUser={setLoggedInUser} />
                <Controls loggedInUser={loggedInUser} />
            </div>
        </div>
    );
};

export default App;
