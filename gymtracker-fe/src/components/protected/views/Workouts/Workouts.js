import React, { useState } from 'react';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { v4 as uuidv4 } from 'uuid';

import Button from '../../components/CustomButtons/Button.js';
import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  }
}))

export default function Dashboard() {
  const classes = useStyles();
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), muscle: '', exercise: '', sets: 0, reps: 0, weight: 0 },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    
    setInputFields(newInputFields);
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(),  muscle: '', exercise: '', sets: 0, reps: 0, weight: 0 }])
  }

  const handleRemoveFields = id => {
    const values  = [...inputFields];
    values.splice(id, 1);
    setInputFields(values);
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h2>My Workouts</h2>
            </CardHeader>
            <CardBody>
            <h3>Today's workout</h3>
              <h3 className={classes.cardTitle}>
                {/* You have no registered workouts. */}
                <form className={classes.root} onSubmit={handleSubmit}>
                  <Grid item direction="row" xs={12} sm={12} md={12}>
                    { inputFields.map(inputField => (
                      <div key={inputField.id}>
                        <TextField
                          name="muscle"
                          label="Muscle"
                          variant="outlined"
                          size="small"
                          value={inputField.muscle}
                          onChange={event => handleChangeInput(inputField.id, event)}
                        />
                        <TextField
                          name="exercise"
                          label="Exercise"
                          variant="outlined"
                          size="small"
                          value={inputField.exercise}
                          onChange={event => handleChangeInput(inputField.id, event)}
                        />                        
                        <TextField
                          name="sets"
                          label="Sets"
                          variant="outlined"
                          size="small"
                          value={inputField.sets}
                          onChange={event => handleChangeInput(inputField.id, event)}
                        />
                        <TextField
                          name="reps"
                          label="Reps"
                          variant="outlined"
                          size="small"
                          value={inputField.reps}
                          onChange={event => handleChangeInput(inputField.id, event)}
                        />
                        <TextField
                          name="weight"
                          label="Weight"
                          variant="outlined"
                          size="small"
                          value={inputField.weight}
                          onChange={event => handleChangeInput(inputField.id, event)}
                        />
                        <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                          <RemoveIcon />
                        </IconButton>
                        <IconButton
                          onClick={handleAddFields}
                        >
                          <AddIcon />
                        </IconButton>
                      </div>
                    )) }
                  </Grid>
                  <Button
                    center
                    className={classes.button}
                    round
                    variant="contained" 
                    color="primary" 
                    type="submit" 
                    onClick={handleSubmit}
                  >
                    Stop training
                  </Button>
                </form>
                
              </h3>
              <br />
              <h3 className={classes.cardBody}>
                {/* Last workout. */}
              </h3>
            </CardBody>
            <CardFooter chart>
              <h3>
                Last week's workout summary.
              </h3>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
