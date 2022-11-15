import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import PhoneMissedIcon from "@mui/icons-material/PhoneMissed";
import "./CircleMenu.css"
export default function CircleMenu() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="circelMenu">
        <Tabs className="circleMenuList"
          value={value}
          onChange={handleChange}
          aria-label="icon position tabs example"                            
        >
          <Tab className="circleMenuItem" icon={<PhoneMissedIcon />} iconPosition="start" label="start" />
          <Tab className="circleMenuItem" icon={<PhoneMissedIcon />} iconPosition="start" label="start" />
          <Tab className="circleMenuItem" icon={<PhoneMissedIcon />} iconPosition="start" label="start" />
          <Tab className="circleMenuItem" icon={<PhoneMissedIcon />} iconPosition="start" label="start" />
        </Tabs>
      </div>
    </>
  );
}
