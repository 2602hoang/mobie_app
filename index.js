/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { AuthContextProvider } from './contexts/AuthContext';
import Gui from './screens/Gui';

AppRegistry.registerComponent(appName, () => () =>
    <AuthContextProvider>
        <Gui />
    </AuthContextProvider>
);
