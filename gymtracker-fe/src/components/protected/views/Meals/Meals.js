import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @material-ui/core
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import CircularProgress from '@material-ui/core/CircularProgress';
// core components
import Button from '../../components/CustomButtons/Button.js';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import CardFooter from '../../components/Card/CardFooter.js';

import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle.js';

import { createMeal } from '../../../../redux/actions/mealActions';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 10,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 10,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Meals() {
  const classes = useStyles();

  const [meal, setMeal] = useState('');
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState(null);
  const [proteins, setProteins] = useState(null);
  const [carbs, setCarbs] = useState(null);
  const [fats, setFats] = useState(null);

  const dispatch = useDispatch();

  // const mealList = useSelector((state) => state.mealList);
  // const { loading, error, meals } = mealList;

  // useEffect(() => {
  //   dispatch(listMeals());
  // }, [dispatch]);

  const handleAddMeal = (e) => {
    e.preventDefault();
    const newMeal = {
      meal,
      food,
      calories,
      proteins,
      carbs,
      fats,
    };
    dispatch(createMeal(newMeal));
  };

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color='primary'>
              <h2>My Meals</h2>
            </CardHeader>
            <CardBody>
              <form
                style={{ display: 'flex' }}
                className={classes.form}
                noValidate
                onSubmit={handleAddMeal}
              >
                <GridContainer>
                  <GridContainer xs={12} spacing={1}>
                    <GridItem>
                      <FormControl className={classes.margin}>
                        <BootstrapInput
                          placeholder='Meal name'
                          id='demo-customized-textbox'
                          htmlFor='demo-customized-select-native'
                          value={meal}
                          onChange={(e) => setMeal(e.target.value)}
                          variant='outlined'
                          required
                        />
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                  <GridContainer xs={12} spacing={1}>
                    <GridItem>
                      <FormControl className={classes.margin}>
                        <BootstrapInput
                          placeholder='Food name'
                          id='demo-customized-textbox'
                          htmlFor='demo-customized-select-native'
                          value={food}
                          onChange={(e) => setFood(e.target.value)}
                          variant='outlined'
                          required
                        />
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                  <GridContainer xs={12} spacing={1}>
                    <GridItem>
                      <FormControl className={classes.margin}>
                        <BootstrapInput
                          placeholder='Calories'
                          id='demo-customized-textbox'
                          htmlFor='demo-customized-select-native'
                          value={calories}
                          onChange={(e) => setCalories(e.target.value)}
                          variant='outlined'
                          required
                        />
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                  <GridContainer xs={12} spacing={1}>
                    <GridItem>
                      <FormControl className={classes.margin}>
                        <BootstrapInput
                          placeholder='Proteins'
                          id='demo-customized-textbox'
                          htmlFor='demo-customized-select-native'
                          value={proteins}
                          onChange={(e) => setProteins(e.target.value)}
                          variant='outlined'
                          required
                        />
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                  <GridContainer xs={12} spacing={1}>
                    <GridItem>
                      <FormControl className={classes.margin}>
                        <BootstrapInput
                          placeholder='Carbs'
                          id='demo-customized-textbox'
                          htmlFor='demo-customized-select-native'
                          value={carbs}
                          onChange={(e) => setCarbs(e.target.value)}
                          variant='outlined'
                          required
                        />
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                  <GridContainer xs={12} spacing={1}>
                    <GridItem>
                      <FormControl className={classes.margin}>
                        <BootstrapInput
                          placeholder='Fats'
                          id='demo-customized-textbox'
                          htmlFor='demo-customized-select-native'
                          value={fats}
                          onChange={(e) => setFats(e.target.value)}
                          variant='outlined'
                          required
                        />
                      </FormControl>
                    </GridItem>
                  </GridContainer>

                  <Button
                    round
                    size='medium'
                    color='primary'
                    type='submit'
                    color='primary'
                    className={classes.submit}
                  >
                    Add meal
                  </Button>
                </GridContainer>
              </form>
            </CardBody>

            <CardFooter chart></CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
