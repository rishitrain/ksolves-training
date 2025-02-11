import React  , {useState}from "react";
import { useNavigate} from "react-router-dom";
import { 
  AppBar, Toolbar, Typography, Drawer, List, 
  ListItem, ListItemIcon, ListItemText, Box, 
  Grid, Paper, 
  CircularProgress
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShowChartIcon from "@mui/icons-material/ShowChart";

import Graph from "./Graph";
import PieChart from "./Pie";

const drawerWidth = 240;

export default function StockMarketDashboard() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false)

  const handlenavigation = ()=>{
    setloading(true);
    setTimeout(()=>{
      navigate('/editor')
    },1000)
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button onClick={() => navigate("/")}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={handlenavigation}>
          <ListItemIcon><ShowChartIcon /></ListItemIcon>

            {loading?<CircularProgress/>:"Editor"}
             <ListItemText/>
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppBar position="fixed" sx={{ zIndex: 1201 }}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Stock Market Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, height:500 }}>
              <Graph />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 550 }}>
              <PieChart />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
