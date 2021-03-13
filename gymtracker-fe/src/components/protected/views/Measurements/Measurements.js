import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createMeasurement,
  detailsMeasurement,
  listMeasurements,
  resetMeasurement,
  listMeasurementsReset,
} from '../../../../redux/actions/measurementActions';
import bodyParts from './bodyParts';
// @material-ui/core
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import CircularProgress from '@material-ui/core/CircularProgress';
// core components
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import CardFooter from '../../components/Card/CardFooter.js';
import Button from '../../components/CustomButtons/Button.js';
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle.js';

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

export default function Measurement({ history }) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [addBodyPart, setAddBodyPart] = useState('');
  const [checkBodyPart, setCheckBodyPart] = useState('');
  const [measure, setMeasure] = useState();
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const measurementList = useSelector((state) => state.measurementList);
  const {
    loading: loadingList,
    error: errorList,
    measurements = [],
  } = measurementList;
  const {
    succes: succesMeasurementsList,
    count,
    data: MeasurementsByBodyPart,
  } = measurements;

  const measurementCreate = useSelector((state) => state.measurementCreate);
  const { success: successCreate, measurement } = measurementCreate;
  const measurementId = measurement?.data?._id;

  const measurementDetails = useSelector((state) => state.measurementDetails);
  const {
    loading: loadingDetails,
    error: errorDetails,
    measurement: detailsMeasurements = {},
  } = measurementDetails;
  const { succes: succesDetails, data: details } = detailsMeasurements;

  useEffect(() => {
    if (successCreate) {
      dispatch(detailsMeasurement(measurementId));
    }
  }, [successCreate]);

  const handleAddMeasurement = (e) => {
    e.preventDefault();
    dispatch(createMeasurement(addBodyPart, measure));
    setShowMeasurements(false);
    setShowDetails(true);
    setAddBodyPart('');
    setMeasure(0);
  };

  const handleCheckMeasurements = (e) => {
    e.preventDefault();
    dispatch(listMeasurements(checkBodyPart));
    setShowMeasurements(true);
  };

  return (
    <>
      <Card>
        <CardHeader color='primary'>
          <h2>Measurements</h2>
        </CardHeader>
        <CardBody>
          <h3>Add new measurement</h3>
          <GridContainer>
            <form
              className={classes.formButton}
              noValidate
              onSubmit={handleAddMeasurement}
            >
              <FormControl className={classes.margin}>
                <NativeSelect
                  id='demo-customized-select-native'
                  value={addBodyPart}
                  onChange={(e) => {
                    setAddBodyPart(e.target.value);
                    setShowDetails(false);
                    dispatch(resetMeasurement());
                    setShowMeasurements(false);
                  }}
                  input={<BootstrapInput />}
                >
                  {bodyParts.map((bodyPart, key) => {
                    return <option key={key}>{bodyPart}</option>;
                  })}
                </NativeSelect>
              </FormControl>
              <FormControl className={classes.margin}>
                <BootstrapInput
                  placeholder='Value'
                  id='demo-customized-textbox'
                  htmlFor='demo-customized-select-native'
                  value={measure}
                  onChange={(e) => setMeasure(e.target.value)}
                  variant='outlined'
                  required
                />
              </FormControl>
              <Button
                round
                size='sm'
                color='primary'
                type='submit'
                color='primary'
                className={classes.submit}
              >
                Add new measurement
              </Button>
            </form>
          </GridContainer>

          {loadingDetails ? (
            <h3>
              <CircularProgress color='primary' />
            </h3>
          ) : errorDetails ? (
            <h3>{errorDetails}</h3>
          ) : showDetails && details ? (
            <p>
              Your new measure for {details.bodyPart} is {details.measure}.
            </p>
          ) : null}

          <h3>Check Measurements</h3>
          <GridContainer>
            <form
              style={{ display: 'flex' }}
              className={classes.form}
              noValidate
              onSubmit={handleCheckMeasurements}
            >
              <FormControl className={classes.margin}>
                <NativeSelect
                  id='demo-customized-select-native'
                  value={checkBodyPart}
                  onChange={(e) => {
                    setCheckBodyPart(e.target.value);
                    setShowMeasurements(false);
                    setShowDetails(false);
                  }}
                  input={<BootstrapInput />}
                >
                  {bodyParts.map((bodyPart, key) => {
                    return <option key={key}>{bodyPart}</option>;
                  })}
                </NativeSelect>
              </FormControl>
              <Button
                round
                size='sm'
                color='primary'
                type='submit'
                color='primary'
                className={classes.submit}
              >
                Check measurement
              </Button>
            </form>
          </GridContainer>
          {loadingList ? (
            <h3>
              <CircularProgress color='primary' />
            </h3>
          ) : errorList ? (
            <h3>{errorList}</h3>
          ) : showMeasurements && MeasurementsByBodyPart ? (
            <>
              <h4>
                At {checkBodyPart} you have {count} measurements.{' '}
              </h4>
              <ol>
                {Object.values(MeasurementsByBodyPart).map(
                  (measurement, key) => {
                    return (
                      <li key={key}>
                        {measurement.measure} on{' '}
                        {new Date(measurement.createdAt).toDateString()}
                        {'.'}
                      </li>
                    );
                  }
                )}
              </ol>
            </>
          ) : null}
          <br />
        </CardBody>

        <CardFooter chart>
          <br />
        </CardFooter>
      </Card>
    </>
  );
}

// Form validation
