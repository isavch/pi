import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route,Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
    render() {
        const { user, component: Component, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={props =>
                    user.token ? (
                    <Component {...props} />
                    ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                    )
                }
            />
        );
    }
}

  const mapStateToProps = ({ user }) => ({ user });

  export default connect(mapStateToProps)(PrivateRoute);