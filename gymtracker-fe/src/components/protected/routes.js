// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
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
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/MyWorkouts",
    name: "My Workouts",
    icon: Dashboard,
    component: WorkoutsPage,
    layout: "/admin"
  },
  {
    path: "/MyMeasurements",
    name: "My Measurements",
    icon: Dashboard,
    component: MeasurementsPage,
    layout: "/admin"
  },
  {
    path: "/MyMeals",
    name: "My Meals",
    icon: Dashboard,
    component: MealsPage,
    layout: "/admin"
  },
  {
    path: "/MyMusic",
    name: "My Music",
    icon: Dashboard,
    component: MusicPage,
    layout: "/admin"
  },
  {
    path: "/TrainingVideos",
    name: "Training Videos",
    icon: Dashboard,
    component: VideosPage,
    layout: "/admin"
  },
  {
    path: "/findGym",
    name: "Find a Gym near me",
    icon: LocationOn,
    component: FindGym,
    layout: "/admin"
  }
];

export default dashboardRoutes;
