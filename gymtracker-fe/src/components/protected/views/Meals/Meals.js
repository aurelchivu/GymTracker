import React from "react";
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

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h2>My Meals</h2>
            </CardHeader>
            <CardBody>
              {/* <h3 className={classes.cardTitle}>
                You have no registered meals.
              </h3> */}
              <h3 className={classes.cardTitle}>
                Today's summary.<br />
                Until now, yo had 2 meals, with 1450 calories in total:
                <ol>
                  <li>
                    Meal 1: 700 calories.
                  </li>
                  <li>
                    Meal 2: 750 calories.
                  </li>
                </ol>
              </h3>
              <Button
                color="primary"
                round
              >
                Add a meal
              </Button>
            </CardBody>
            <CardFooter chart>
            <h3 className={classes.cardTitle}>
              Yesterday's summary.<br />
              Yesterday you had 3 meals, with 2000 calories in total:
                <ol>
                <li>
                  Meal 1: 600 calories.
                </li>
                <li>
                  Meal 2: 800 calories.
                </li>
                <li>
                  Meal 3: 600 calories.
                </li>
                </ol>
              </h3>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
