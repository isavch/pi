import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import login from '../ducks/login/action';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const Logo = styled.img`
    width: 20vw;
    margin-bottom: 5vh;
`;
const Container = styled(Grid)`
    && {
        height: 100%;
        position: absolute;
        width: 100%;
    }
`;

class Login extends Component {
    state = { password: '', redirectToReferrer: false }
    
    onChange = ({ target }) => this.setState({ password: target.value });

    login = () => {
        this.props.login(this.state.password);
        this.setState({ redirectToReferrer: true });
    }
    
    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }
        
        return (
            <Container container direction="column" alignItems="center" justify="center">
                <Grid item>
                    <Logo src="/icons/256.svg" />
                </Grid>
                <Grid item>
                    <TextField
                        error={this.props.user.error}
                        helperText={this.props.user.error}
                        value={this.state.password}
                        id="password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        onChange={this.onChange}
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="secondary" onClick={this.login}>
                        Log in
                    </Button>
                </Grid>
            </Container>
        );
    }
}

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps, { login })(Login);