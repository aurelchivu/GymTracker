import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

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

import { createMeal, listMeals } from '../../../../redux/actions/mealActions';

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

  const history = useHistory();
  
  const classes = useStyles();

  const [meal, setMeal] = useState('');
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState(null);
  const [proteins, setProteins] = useState(null);
  const [carbs, setCarbs] = useState(null);
  const [fats, setFats] = useState(null);
  const [totalCalories, setTotalCalories] = useState(null);

  const dispatch = useDispatch();

  const mealList = useSelector((state) => state.mealList);
  const { loading, error, meals = [] } = mealList;
  const { count, data = [] } = meals;

  useEffect(() => {
    dispatch(listMeals(new Date()));
    const totalCals = data?.reduce((prev, curr) => prev + curr.calories, 0);
    setTotalCalories(totalCals);
  }, []);

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
    // history.go(0);
  };

  // www.eatthismuch.com/

  https: return (
    <>
      <GridContainer>
        <GridItem xs={11} sm={11} md={11}>
          <Card>
            <CardHeader color='primary'>
              <h2>My Meals</h2>
            </CardHeader>
            <CardBody>
              {loading ? (
                <h3>
                  <CircularProgress color='primary' />
                </h3>
              ) : error ? (
                <h3>{error}</h3>
              ) : count === 0 ? (
                <h4>Today you had no meals!</h4>
              ) : count === 1 ? (
                <h4>
                  Today you had {count} meal, {totalCalories} calories in total.
                </h4>
              ) : (
                <h4>
                  Today you had {count} meals, {totalCalories} calories in
                  total.
                </h4>
              )}
              <ol>
                {data &&
                  data.map((meal) => {
                    return (
                      <>
                        <li key={meal._id}>{meal.meal}</li>
                        <p>Food: {meal.food}</p>
                        <p>Calories: {meal.calories}</p>
                        <p>Proteins: {meal.proteins}</p>
                        <p>Carbs: {meal.carbs}</p>
                        <p>Fats: {meal.fats}</p>
                        <br />
                      </>
                    );
                  })}
              </ol>
            </CardBody>

            <CardFooter chart>
              <GridContainer xs={1} sm={1} md={1}></GridContainer>
              <GridContainer xs={11} sm={11} md={11}>
                <GridContainer xs={12} sm={12} md={12}>
                  <h3>Add a new meal</h3>
                </GridContainer>
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
                    <GridContainer xs={12} sm={12} md={12} spacing={1}>
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
                    <GridContainer xs={12} sm={12} md={12} spacing={1}>
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
                    <GridContainer xs={12} sm={12} md={12} spacing={1}>
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
                    <GridContainer xs={12} sm={12} md={12} spacing={1}>
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
                    <GridContainer xs={12} sm={12} md={12} spacing={1}>
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
                      // size='big'
                      color='primary'
                      type='submit'
                      className={classes.submit}
                    >
                      Add new meal
                    </Button>
                  </GridContainer>
                </form>
              </GridContainer>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
