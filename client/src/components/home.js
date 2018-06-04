import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import io from 'socket.io-client';
import { listenSocket } from '../ducks/socket';
import { takePhoto, takeVideo, stopVideo } from '../ducks/photo/action';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const StyledGrid = styled(Grid)`
    && {
        padding-left: 20px;
    }
`;

const StyledFormControl = styled(FormControl)`
    && {
        margin-left: 30px;
    }
`;

class Home extends Component {
    state = { interval: 0 }

    playerRef = React.createRef()

    separator = new Uint8Array([0, 0, 0, 1])

    handleChange = ({ target }) => this.setState({ interval: target.value })

    takePhoto = () => this.props.takePhoto({ interval: this.state.interval })

    takeVideo = () => this.props.takeVideo()

    stopVideo = () => this.props.stopVideo()

    addSeparator = buffer => {
		const tmp = new Uint8Array(4+buffer.byteLength)
		tmp.set(this.separator, 0)
		tmp.set(new Uint8Array(buffer), 4)
		return tmp.buffer
	}

    onData = data => {
        this.player && this.player.decode(new Uint8Array(this.addSeparator(data)));
    }

    componentDidMount() {
        this.player = new window.Player({
            useWorker: true,
            webgl: true
          });
          this.playerRef.current.appendChild(this.player.canvas);
        this.props.listenSocket(this.onData);
    }

    render() {
        const { photo, temperature, motion = {} } = this.props;

        return (
            <Fragment>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            Raspberry smart home
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Paper>
                    <StyledGrid container spacing={16} direction="column">
                        <Grid item>
                            <Typography variant="subheading">
                                Temperature: {temperature.temperature}
                            </Typography>
                        </Grid>
                        <Grid item >
                            <Typography variant="subheading">
                                Humidity: {temperature.humidity} 
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subheading">
                                Date: {temperature.date ? new Date(temperature.date).toLocaleString() : ''}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subheading">
                                Last movement: {motion.date ? new Date(motion.date).toLocaleString() : ''}
                            </Typography>
                        </Grid>
                    </StyledGrid>
                    <Card>
                        <CardContent>
                            <Button variant="contained" color="primary" onClick={this.takePhoto}>
                                Take a photo
                            </Button>
                            <StyledFormControl>
                                <InputLabel htmlFor="interval">Interval</InputLabel>
                                <Select
                                    value={this.state.interval}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'interval',
                                        id: 'interval',
                                    }}
                                >
                                    <MenuItem value={0}>None</MenuItem>
                                    <MenuItem value={10}>10s</MenuItem>
                                    <MenuItem value={20}>30s</MenuItem>
                                    <MenuItem value={30}>60s</MenuItem>
                                </Select>
                            </StyledFormControl>
                        </CardContent>
                        <CardContent>
                            <Typography variant="subheading">
                                {photo.isStarted && `${photo.buffer.reduce((a, i) => a + i.byteLength, 0)/1024}Kb`}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            {photo.isStarted && <LinearProgress color="secondary" />}
                        </CardContent>
                        <CardContent>
                            <img width="100%" src={photo.blob} />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Button variant="contained" color="primary" onClick={this.takeVideo}>
                                Take video
                            </Button>
                            <Button variant="contained" color="primary" onClick={this.stopVideo}>
                                Stop video
                            </Button>
                        </CardContent>
                        <CardContent>
                            <div ref={this.playerRef}></div>
                        </CardContent>
                    </Card>
                </Paper>
            </Fragment>
        );
    }
}

const mapStateToProps = ({ photo, temperature }) => {
    return {
        photo: photo,
        temperature
    }
}

export default connect(mapStateToProps, { listenSocket, takePhoto, takeVideo, stopVideo })(Home);
