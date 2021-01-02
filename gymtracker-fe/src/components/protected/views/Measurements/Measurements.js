import React from 'react';
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

const useStyles = makeStyles(styles);

export default function Measurements() {
  const classes = useStyles();
  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color='primary'>
              <h2>My Measurements</h2>
            </CardHeader>
            <CardBody>
              <br />
              <GridContainer spacing='3'>
                <GridItem xs={1} sm={2} md={2}></GridItem>
                <GridItem xs={4} sm={3} md={3}>
                  <Button
                    size='small'
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    round
                    className={classes.button}
                    center
                  >
                    Add measure
                  </Button>
                </GridItem>
                <GridItem xs={2} sm={2} md={2}></GridItem>
                <GridItem xs={4} sm={3} md={3}>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    round
                    className={classes.button}
                    center
                  >
                    Check measure
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
    </>
  );
}
