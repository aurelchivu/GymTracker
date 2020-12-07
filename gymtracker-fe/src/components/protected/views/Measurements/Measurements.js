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
              {/* <h3 className={classes.cardTitle}>
                You have no registered measurements.
              </h3> */}

              <GridItem xs={12} sm={12} md={12}>
                <Button color='primary' round>
                  Chest
                </Button>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Button color='primary' round>
                  Waist
                </Button>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Button color='primary' round>
                  Hip
                </Button>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Button color='primary' round>
                  Bicep
                </Button>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Button color='primary' round>
                  Forearm
                </Button>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Button color='primary' round>
                  Thigh
                </Button>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Button color='primary' round>
                  Calve
                </Button>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Button color='primary' round>
                  Neck
                </Button>
              </GridItem>
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
