import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles';

// core components
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import CardFooter from '../../components/Card/CardFooter.js';
import Button from '../../components/CustomButtons/Button.js';

import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle.js';

import AddMeasurement from './AddMeasurement';
import CheckMeasurement from './CheckMeasurement';

const useStyles = makeStyles(styles);

export default function Measurements({ history }) {
  const classes = useStyles();
  const [showAddMeasuremet, setShowAddMeasurement] = useState(false);
  const [showCheckMeasurement, setShowCheckMeasurement] = useState(false);

  const handleAddMeasurement = () => {
    history.push(`/user/measurements/add_measurement`);
    setShowAddMeasurement(true);
  };

  const handleCheckMeasurement = () => {
    history.push(`/user/measurements/check_measurement`);
    setShowCheckMeasurement(true);
  };

  // const didMount = useRef(false);

  // useEffect(() => {
  //   setShowAddMeasurement(false);
  //   setShowCheckMeasurement(false);
  //   history.push(`/user/measurements`);
  // }, [showAddMeasuremet, showCheckMeasurement, history]);

  return (
    <>
      {showAddMeasuremet ? (
        <AddMeasurement />
      ) : showCheckMeasurement ? (
        <CheckMeasurement />
      ) : (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color='primary'>
                <h2>My Measurements</h2>
              </CardHeader>
              <CardBody>
                <br />
                <GridContainer>
                  <GridItem xs={1} sm={2} md={2}></GridItem>
                  <GridItem xs={4} sm={3} md={3}>
                    <Button
                      onClick={handleAddMeasurement}
                      fullWidth
                      variant='contained'
                      color='primary'
                      round
                      className={classes.button}
                    >
                      Add measurement
                    </Button>
                  </GridItem>
                  <GridItem xs={2} sm={2} md={2}></GridItem>
                  <GridItem xs={4} sm={3} md={3}>
                    <Button
                      onClick={handleCheckMeasurement}
                      fullWidth
                      variant='contained'
                      color='primary'
                      round
                      className={classes.button}
                    >
                      Check measurement
                    </Button>
                  </GridItem>
                  <GridItem xs={1} sm={2} md={2}></GridItem>
                </GridContainer>
                <br />
              </CardBody>
              <CardFooter chart>
                <br />
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      )}
    </>
  );
}
