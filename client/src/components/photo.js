import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

class Photo extends Comment {
    takePhoto() {

    }
    render() {
        return (
            <Card>
                <CardContent>
                    <Button variant="contained" color="primary" onClick={this.takePhoto}>
                        Take a photo
                    </Button>
                </CardContent>
                <CardMedia image="/static/images/cards/contemplative-reptile.jpg" />
            </Card>
        );
    }
}

export default Photo;