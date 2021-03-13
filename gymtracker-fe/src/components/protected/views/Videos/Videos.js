import React, { useEffect, useState } from 'react';
import YTSearch from 'youtube-api-search';
import ReactPlayer from 'react-player';

// @material-ui/core
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
// core components
import Button from '../../components/CustomButtons/Button.js';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import CardFooter from '../../components/Card/CardFooter.js';

import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles(styles);

export default function Videos() {
  const [muscle, setMuscle] = useState('');
  const [videoList, setVideoList] = useState([]);
  const [showVideoList, setShowVideoList] = useState(false);

  const { REACT_APP_YOUTUBE_API_KEY } = process.env;

  const videoSearch = async () => {
    YTSearch(
      {
        key: REACT_APP_YOUTUBE_API_KEY,
        term: `${muscle} traning workout exercises`,
        maxResults: 20,
      },
      (videos) => setVideoList(videos)
    );
  };

  const handleClick = (e) => {
    e.preventDefault();
    videoSearch();
    setShowVideoList(true);
    console.log(videoList);
  };

  const classes = useStyles();

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color='primary'>
              <h2>Training Videos</h2>
            </CardHeader>
            <CardBody>
              <TextField
                value={muscle}
                onChange={(e) => {
                  setMuscle(e.target.value);
                  setShowVideoList(false);
                  setVideoList([]);
                }}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='standard-basic'
                label='Training videos'
                name='muscle'
                autoComplete='muscle'
                autoFocus
              />
              <br />
              <br />
              <Grid container direction='row' spacing={3}>
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
                  >
                    search for training videos
                  </Button>
                </Grid>
                <Grid item xs={2} sm={3} md={3}></Grid>
              </Grid>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                {showVideoList && videoList ? (
                  <ul className={classes.grid}>
                    {videoList.map((video) => {
                      const { id, snippet = {} } = video;
                      const { title, thumbnails = {} } = snippet;
                      const { medium = {} } = thumbnails;
                      return (
                        <li className='styles.card' key={id}>
                          {/* <a
                            href={`https://www.youtube.com/watch?v=${id.videoId}`}
                          >
                            <p>
                              <img
                                width={medium.width}
                                height={medium.height}
                                src={medium.url}
                                alt=''
                              />
                            </p>
                            <h3>{title}</h3>
                          </a> */}
                          <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${id.videoId}`}
                            controls
                          />
                          <h3>{title}</h3>
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
