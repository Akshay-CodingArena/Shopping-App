import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MyCard({url}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let Mytitle = url.title;
  if (url.title.length > 20){
    Mytitle=url.title.slice(0,20)+"..."
  }
  let Mydesc = url.description;
  Mydesc = Mydesc.replaceAll("/","/ ")
  Mydesc = Mydesc.replaceAll("("," (")
  if (Mydesc.length > 80){
    Mydesc = Mydesc.slice(0,75) + " ..."
  }


  return (
    <container className = "CardsProp">
    <Card sx={{ maxWidth: 345 }} >
      <CardHeader

        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={Mytitle}
        subheader={"$"+url.price}
        
        
      />
      <CardMedia
        component="img"
        height="194"
        image={url.image}
        alt="Akshay"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {Mydesc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            {url.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </container>
  );
}
