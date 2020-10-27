import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="http://localhost:3000/">
          GymTracker
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'} {'All Rights reserved.'}
      </Typography>
    );
  }

const About = () => {
    return (
        <div>
            <h2>GymTracker</h2>
            <p>
                GymTracker is an app tracks
                your progress in the gym, gives you a workout routine depending on
                the last sessions you had for each muscle group and gives you
                a meal plan depending on the results we want to have.
            </p>
            <Box mt={8}>
                <Copyright />
            </Box>
        </div>
    )
}

export default About;
