import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  return (
    <>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            switch (newValue) {
              case 0:
                navigate("/");
                break;
              case 1:
                navigate("/postNote");
                break;
              default:
                navigate("/personal");
                break;
            }
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            icon={<LabelOutlinedIcon sx={{ transform: "rotate(-90deg)" }} />}
          />
          <BottomNavigationAction icon={<AddBoxOutlinedIcon />} />
          <BottomNavigationAction icon={<PersonOutlineOutlinedIcon />} />
        </BottomNavigation>
      </Paper>
    </>
  );
}

export default Footer;
