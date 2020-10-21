import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const username = 'aurel';
const date = new Date().toDateString();
const lastWeekWorkout = 'back and abs';
const googleWorkout = "legs";

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h2>Dasboard</h2>
            </CardHeader>
            <CardBody>
              <h3 className={classes.cardTitle}>
                Hello, {username}! <br />
                Today is {date}.<br />
                This time last week you had the {lastWeekWorkout} workout.<br />
                Acording to your Google Calendar, today you have {googleWorkout} day.<br />
                What do you want to train today?<br />
              </h3>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
