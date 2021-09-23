import React from 'react';
import { Router as Router, Switch, Route } from 'react-router-dom';
import history from './history';
import StreamShow from './components/StreamShow';
import StreamCreate from './components/StreamCreate';
import StreamEdit from './components/StreamEdit';
import StreamList from './components/StreamList';
import StreamDelete from './components/StreamDelete';
import Header from './components/Header';


const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Header />
          <Switch>
            <Route path="/" exact component={StreamList}/>
            <Route path="/streams/new" exact component={StreamCreate}/>
            <Route path="/streams/edit/:id" exact component={StreamEdit}/>
            <Route path="/streams/delete/:id" exact component={StreamDelete}/>
            <Route path="/streams/:id" exact component={StreamShow} />
          </Switch>
      </Router>
    </div>
  )
}

export default App;