// import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PersonIcon from "@mui/icons-material/Person";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { red } from "@mui/material/colors";

const icons = [
  {
    icon: <DashboardIcon />,
    title: "Dashboard",
    url: "/courses",
  },
  {
    icon: <HistoryEduIcon />,
    title: "Courses",
    url: "/courses/courses",
  },
  {
    icon: <PersonIcon />,
    title: "Students",
    url: "/courses/students",
  },
  {
    icon: <SupervisorAccountIcon />,
    title: "Admin Panel",
    url: "https://aygnhmz.pythonanywhere.com/admin/",
  },
];

const iconStyle = {
  color: "#eee",
  transition: "all 0.5s",
  "& .MuiSvgIcon-root": { color: "#eee", transition: "all 0.5s" },
  "&:hover": { color: red[400] },
  "&:hover .MuiSvgIcon-root": { color: red[400] },
};

const DrawerList = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <List>
      {currentUser && (
        <Typography
          variant="h5"
          align="center"
          sx={{ color: "#eee", textDecoration: "underline overline" }}
        >
          {currentUser?.first_name} {currentUser?.last_name}
        </Typography>
      )}

      {icons?.map((item, index) => (
        <ListItem key={index} disablePadding>
          {item.url.includes("http") ? (
            <ListItemButton
              to={"http://127.0.0.1:8000/admin/"}
              target="_blank"
              sx={iconStyle}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          ) : (
            <ListItemButton onClick={() => navigate(item.url)} sx={iconStyle}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default DrawerList;
