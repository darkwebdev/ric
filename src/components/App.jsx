import { Route, Switch } from 'wouter';

import { Story } from './Story.jsx';
import { Home } from './Home';

export const App = () => {
    return <Switch>
        <Route path="*/story/*" component={Story} />
        <Route component={Home} />
    </Switch>;
}
