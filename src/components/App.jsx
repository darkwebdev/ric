import { Route, Switch } from 'wouter';
import { AudioPlayerProvider } from 'react-use-audio-player'

import { Story } from './Story.jsx';
import { Home } from './Home';

export const App = () => {
    return (
        <AudioPlayerProvider>
            <Switch>
                <Route path="*/story/*" component={Story} />
                <Route component={Home} />
            </Switch>
        </AudioPlayerProvider>
    );
}
