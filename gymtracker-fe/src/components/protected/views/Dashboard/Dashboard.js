import React, {useState} from "react";
import { useSelector } from 'react-redux';

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
}));

const date = new Date().toDateString();
const lastWeekWorkout = 'back and abs';
const googleWorkout = "legs";

export default function Dashboard() {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const date = new Date().toDateString();
  const lastWeekWorkout = 'back and abs';
  const googleWorkout = "legs";

  //CheckBox
  const classes = useStyles();

  const [state, setState] = useState({
    biceps: true,
    triceps: false,
    forearm: false,
    quads: false,
    hamstrings: false,
    calves: false,
    upperChest: false,
    middleChest: false,
    lowerChest: false,
    upperBack: false,
    middleBack: false,
    lowerBack: false,
    frontShoulder: false,
    middleShoulder: false,
    backShoulder: false,
    abdominal: false,
    glutes: false,
    cardio: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { biceps, triceps, forearm,
    quads, hamstrings, calves,
    upperChest, middleChest, lowerChest,
    upperBack, middleBack, lowerBack,
    frontShoulder, middleShoulder, backShoulder,
    abdominal, glutes, cardio } = state;

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h2>Dasboard</h2>
            </CardHeader>
            <CardBody>
              <h3 className={classes.cardTitle}>
                Hello, {userInfo.username}! <br />
                Today is {date}.<br />
                This time last week you had the {lastWeekWorkout} workout.<br />
                According to your Google Calendar, today you have {googleWorkout} day.<br />
                What do you want to train today?<br />
              </h3>
                <form
                  // className={classes.form}
                  noValidate>
                  {/* onSubmit={handleSubmit}> */}
                  <Grid container spacing={2} >
                  <Grid item xs={12} sm={3} md={3}>
                    <TextField
                      // value={username}
                      // onInput={ e => setUsername(e.target.value)}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="standard-basic"
                      label="Muscle"
                      name="muscle"
                      autoComplete="muscle"
                      autoFocus
                    />
                    
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      round
                      className={classes.submit}
                    >
                      Add
                    </Button>
                    </Grid>
                    
                  </Grid>
                </form>
              {/* <h3 className={classes.cardTitle}>
                Hello, {userInfo.username}! <br />
                Welcome to GymTracker.<br />
                This is the place to be if you want better results in the gym.<br />
                Drink water and don't forget to warm up before each training.<br />
                What do you want to train today?<br />
              </h3> */}


            </CardBody>
            <CardFooter chart>
              <div className={classes.CardBody}>

                {/* <FormControl component="fieldset" className={classes.formControl}>
                  <Grid container spacing={15}>
                    <Grid item xs={2}>
                      <FormLabel component="legend">Arms</FormLabel>
                        <FormControlLabel
                          control={<Checkbox checked={biceps} onChange={handleChange} name="biceps" />}
                          label="Biceps                                               "
                        />
                        <FormControlLabel
                          control={<Checkbox checked={triceps} onChange={handleChange} name="triceps" />}
                          label="Triceps"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={forearm} onChange={handleChange} name="forearm" />}
                          label="Forearm"
                        />
                    </Grid>
                    <Grid item xs={2}>
                      <FormLabel component="legend">Legs</FormLabel>
                        <FormControlLabel
                          control={<Checkbox checked={quads} onChange={handleChange} name="quads" />}
                          label="Quads"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={hamstrings} onChange={handleChange} name="hamstrings" />}
                          label="Hamstrings"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={calves} onChange={handleChange} name="calves" />}
                          label="Calves"
                        />
                    </Grid>
                    <Grid item xs={2}>
                      <FormLabel component="legend">Chest</FormLabel>
                        <FormControlLabel
                          control={<Checkbox checked={upperChest} onChange={handleChange} name="upperChest" />}
                          label="UpperChest"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={middleChest} onChange={handleChange} name="middleChest" />}
                          label="MiddleChest"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={lowerChest} onChange={handleChange} name="lowerChest" />}
                          label="LowerChest"
                        />
                    </Grid>
                    <Grid item xs={2}>
                      <FormLabel component="legend">Back</FormLabel>
                        <FormControlLabel
                          control={<Checkbox checked={upperBack} onChange={handleChange} name="upperBack" />}
                          label="UpperBack"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={middleBack} onChange={handleChange} name="middleBack" />}
                          label="MiddleBack"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={lowerBack} onChange={handleChange} name="lowerBack" />}
                          label="LowerBack"
                        />
                    </Grid>
                    <Grid item xs={2}>
                      <FormLabel component="legend">Shoulders</FormLabel>
                        <FormControlLabel
                          control={<Checkbox checked={frontShoulder} onChange={handleChange} name="frontShoulder" />}
                          label="FrontShoulder"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={middleShoulder} onChange={handleChange} name="middleShoulder" />}
                          label="MiddleShoulder"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={backShoulder} onChange={handleChange} name="backShoulder" />}
                          label="BackShoulder"
                        />
                    </Grid>
                    <Grid item xs={2}>
                      <FormLabel component="legend">Other</FormLabel>
                        <FormControlLabel
                          control={<Checkbox checked={abdominal} onChange={handleChange} name="abdominal" />}
                          label="Abdominal"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={glutes} onChange={handleChange} name="glutes" />}
                          label="Glutes"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={cardio} onChange={handleChange} name="cardio" />}
                          label="Cardio"
                        />
                    </Grid>
                  </Grid>
                  <br />
                  <br />
                  <Button
                    className={classes.submit}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    round
                  >
                    Choose exercises
                  </Button>
                </FormControl>
            <br /> */}
                
                <br />
                This is the place where I should pick exercises and start training
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
