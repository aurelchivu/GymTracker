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

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h2>My Workouts</h2>
            </CardHeader>
            <CardBody>
              <h3 className={classes.cardTitle}>
                You have no registered workouts.
              </h3>
              <br />
              <h3 className={classes.cardBody}>
                Last workout.
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
    </div>
  );
}
