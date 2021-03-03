import React, { useState, useEffect } from 'react';
import axios from 'axios';
// @material-ui/core
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// core components
import Button from '../../components/CustomButtons/Button.js';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import CardFooter from '../../components/Card/CardFooter.js';

import TextField from '@material-ui/core/TextField';

import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles(styles);

export default function Music() {
  const classes = useStyles();

  const [token, setToken] = useState('');
  const [keyword, setKeyword] = useState('');
  const [trackList, setTrackList] = useState([]);
  const [showTrackList, setShowTrackList] = useState(false);
  
  const getAccesToken = async (keyword) => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' + btoa(REACT_APP_spotifyClientID + ':' + REACT_APP_spotifyClientSecret),
      },
      data: 'grant_type=client_credentials',
      method: 'POST',
    };

    try {
      const { data } = await axios(
        'https://accounts.spotify.com/api/token',
        config
      );
      setToken(data.access_token);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTracks = async (keyword) => {
    const config = {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token },
    };

    try {
      const { data } = await axios(
        `https://api.spotify.com/v1/search?query=${keyword}&type=track&limit=50`,
        config
      );
      setTrackList(data.tracks.items);
      console.log(data.tracks.items);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    getTracks(keyword);
    setShowTrackList(true);
  };

  useEffect(() => {
    getAccesToken();
  }, []);

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color='primary'>
              <h2>My Music</h2>
            </CardHeader>
            <CardBody>
              <TextField
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  setShowTrackList(false);
                }}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='standard-basic'
                label='Music'
                name='muscle'
                autoComplete='muscle'
                autoFocus
              />
              <br />
              <br />
              <Grid container direction='row' spacing='3'>
                <Grid item xs={2} sm={3} md={3}></Grid>
                <Grid item xs={8} sm={6} md={6}>
                  <Button
                    onClick={handleClick}
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    round
                    className={classes.button}
                    center
                    // className={classes.submit}
                  >
                    play music!
                  </Button>
                </Grid>
                <Grid item xs={2} sm={3} md={3}></Grid>
              </Grid>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                {showTrackList && trackList ? (
                  <ul className={classes.grid}>
                    {trackList.map((track) => {
                      return (
                        <li className='styles.card' key={track.id}>
                          <a href={`https://open.spotify.com/track/${track.id}`}>
                            <p>
                              <img
                                width={track.album.images[2].width}
                                height={track.album.images[2].height}
                                src={track.album.images[2].url}
                                alt=''
                              />
                              <h3>{track.name}</h3>
                            </p>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
