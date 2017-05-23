import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import EventsIndex from './components/events_index';
import EventsNew from './components/events_new';
import EventsShow from './components/events_show';

export default (
    <Route path="/HealthFairEvents/" component={App}>
        <IndexRoute component={EventsIndex} />
        <Route path="/HealthFairEvents/events/new" component={EventsNew} />
        <Route path="/HealthFairEvents/events/:id" component={EventsShow} />
    </Route>
);
