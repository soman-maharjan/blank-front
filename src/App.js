import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Routes from './Routes';
import { NotificationsProvider } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';

function App() {
    return (
        <MantineProvider>
            <NotificationsProvider>
                <BrowserRouter>
                    <div className="App">
                        <Routes/>
                    </div>
                </BrowserRouter>
            </NotificationsProvider>
        </MantineProvider>
    );
}

export default App;
