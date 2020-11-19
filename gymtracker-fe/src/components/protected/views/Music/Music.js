import React from "react";
// @material-ui/core
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
// core components
import Button from '../../components/CustomButtons/Button.js';
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";

import TextField from '@material-ui/core/TextField';

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Music() {
  const classes = useStyles();
  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h2>My Music</h2>
            </CardHeader>
            <CardBody>
              <TextField
                // value={music}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="standard-basic"
                label="Music"
                name="muscle"
                autoComplete="muscle"
                autoFocus
              />
              <br />
              <br />
              <Grid container direction="row" spacing="3">
              <Grid item xs={2} sm={3} md={3}>
              </Grid>
                <Grid item xs={8} sm={6} md={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    round
                    className={classes.button}
                    center
                    // className={classes.submit}
                  >
                    play music!
                  </Button>
                </Grid>
                <Grid item xs={2} sm={3} md={3}>
                </Grid>
              </Grid>

            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
