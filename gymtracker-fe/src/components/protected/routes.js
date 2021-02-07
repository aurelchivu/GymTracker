// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import HomeIcon from '@material-ui/icons/Home';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import HeightIcon from '@material-ui/icons/Height';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import VideocamIcon from '@material-ui/icons/Videocam';
import LocationOn from "@material-ui/icons/LocationOn";
// core components/views for Admin layout
import DashboardPage from "../protected/views/Dashboard/Dashboard";
import WorkoutsPage from "../protected/views/Workouts/Workouts.js";
import MeasurementsPage from "../protected/views/Measurements/Measurements.js";
import MusicPage from "../protected/views/Music/Music.js";
import MealsPage from "../protected/views/Meals/Meals.js";
import FindGym from "../protected/views/FindGym/FindGym.js";
import VideosPage from "../protected/views/Videos/Videos.js";
// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: HomeIcon,
    component: DashboardPage,
    layout: '/user',
  },
  {
    path: '/workouts',
    name: 'My Workouts',
    icon: FitnessCenterIcon,
    component: WorkoutsPage,
    layout: '/user',
  },
  {
    path: '/measurements',
    name: 'My Measurements',
    icon: FlashOnIcon,
    component: MeasurementsPage,
    layout: '/user',
  },
  {
    path: '/meals',
    name: 'My Meals',
    icon: FastfoodIcon,
    component: MealsPage,
    layout: '/user',
  },
  {
    path: '/music',
    name: 'My Music',
    icon: PlayArrowIcon,
    component: MusicPage,
    layout: '/user',
  },
  {
    path: '/training_videos',
    name: 'Training Videos',
    icon: VideocamIcon,
    component: VideosPage,
    layout: '/user',
  },
  {
    path: '/find_gym',
    name: 'Find a Gym near me',
    icon: LocationOn,
    component: FindGym,
    layout: '/user',
  },
];

export default dashboardRoutes;
