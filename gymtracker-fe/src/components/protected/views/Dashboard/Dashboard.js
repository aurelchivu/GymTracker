import React, {useState} from "react";
import { useSelector } from 'react-redux';
import { getUserDetails} from '../../../../actions/userActions'

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import Button from '../../components/CustomButtons/Button.js';
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

// const useStyles = makeStyles(styles);
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  input: {
    height: 40
  },
  button: {
    height: 40
  }
}));

export default function Dashboard() {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const createdAt = userInfo.createdAt
  const date = new Date().toDateString();
  const time = new Date().toLocaleTimeString();
  const lastWeekWorkout = 'back and abs';
  const googleWorkout = "legs";
  const classes = useStyles();

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h2>Dasboard</h2>
          </CardHeader>
          <CardBody>
            {createdAt > Date.now() - 60000 ?
              <h3 className={classes.cardTitle}>
                Hello, {userInfo.username}! <br />
                Welcome to GymTracker!<br />
                Today is {date}, {time}.<br />
                This is the place to be if you want better results in the gym.<br />
                Drink water and don't forget to warm up before each training.<br />
                What do you want to train today?<br />
              </h3>
              :
              <h3 className={classes.cardTitle}>
                Hello, {userInfo.username}! <br />
                Today is {date}, {time}.<br />
                This time last week you had the {lastWeekWorkout} workout.<br />
                According to your Google Calendar, today you have {googleWorkout} day.<br />
                What do you want to train today?<br />
              </h3>
            }
              <form
                // className={classes.form}
                noValidate>
                {/* onSubmit={handleSubmit}> */}
                <Grid container direction="row" spacing="3">
                  <Grid item xs={6} sm={3} md={3}>
                    <TextField
                      // value={username}
                      // onInput={ e => setMuscle(e.target.value)}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="standard-basic"
                      label="Muscle"
                      name="muscle"
                      autoComplete="muscle"
                      autoFocus
                      className={classes.button}
                    />
                  </Grid> 
                  <Grid item xs={4} sm={2} md={2}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      round
                      className={classes.button}
                      // className={classes.submit}
                    >
                      Add muscle
                    </Button>
                  </Grid>
                </Grid>
                <Grid container direction="row" spacing="3">
                  <Grid item xs={6} sm={3} md={3}>
                    <TextField
                      // value={username}
                      // onInput={ e => setMuscle(e.target.value)}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="standard-basic"
                      label="Muscle"
                      name="muscle"
                      autoComplete="muscle"
                      autoFocus
                      className={classes.button}
                    />
                  </Grid> 
                  <Grid item xs={4} sm={2} md={2}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      round
                      className={classes.button}
                      // className={classes.submit}
                    >
                      Add muscle
                    </Button>
                  </Grid>
                </Grid>
                <Grid container direction="row" spacing="3">
                  <Grid item xs={6} sm={3} md={3}>
                    <TextField
                      // value={username}
                      // onInput={ e => setMuscle(e.target.value)}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="standard-basic"
                      label="Muscle"
                      name="muscle"
                      autoComplete="muscle"
                      autoFocus
                      className={classes.button}
                    />
                  </Grid> 
                  <Grid item xs={4} sm={2} md={2}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      round
                      className={classes.button}
                      // className={classes.submit}
                    >
                      Add muscle
                    </Button>
                  </Grid>
                </Grid>

                <br />
                <Grid container direction="row" spacing="3">
                  <Grid item xs={2} sm={3} md={3}>
                  </Grid>

                    <Grid item xs={8} sm={6} md={6}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        round
                      className={classes.button}
                      center
                        // className={classes.submit}
                      >
                        start training
                      </Button>
                  </Grid>
                  <Grid item xs={2} sm={3} md={3}>
                  </Grid>
                </Grid>
            </form>
          </CardBody>
          <CardFooter chart>
            <div className={classes.CardBody}>
              <br />
              {/* This is the place where I should pick exercises and start training */}
            </div>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
