import React,{ Component } from 'react';
import { Route } from 'react-router-dom';
import Layout from '../../../Layout/index';
import Profile from '../../../Account/Profile/index';
import AccountList from '../../../Account/List/index';
import ListCreate from '../../../Account/List/Create/index';
import ListEdit from '../../../Account/List/Edit/index';
import Dashboard from '../../../Dashboard/index';

class WrappedRoutes extends Component {
  render() {
    return (
      <div>
        <Layout />
        <div className="container__wrap" style={{ paddingLeft: "20%"}}>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/account/profile" component={Profile} />
          <Route exact path="/account/list" component={AccountList} />
          <Route path="/account/list/create" component={ListCreate} />
          <Route path="/account/list/edit/:index" component={ListEdit} />
        </div>
      </div>
    )
  }
}

export default WrappedRoutes;

