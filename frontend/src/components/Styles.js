import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "auto",
    marginRight: "auto",
    padding: "3%",
    paddingLeft: "0%",
    width: "40%",
    height: "50%",
    color: "white !important",
    backgroundColor: "#484848 !important",
    [theme.breakpoints.down("sm")]: {
      marginTop: "10%",
      width: "85%",
      height: "50%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      marginTop: "10%",
      width: "85%",
      height: "100%",
    },
  },
  backGroundStyle: {
    paddingTop: "3%",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "18%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      paddingTop: "15%",
    },
  },
  form: {
    marginLeft: "0%",
    paddingLeft: "0%",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0%",
      padding: "5%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      padding: "4%",
    },
  },
  textBox: {
    width: "60%",
  },
  inputColour: {
    color: "white !important",
  },
  linkStyle: {
    color: "inherit",
    textDecoration: "inherit",
  },
  card: {
    minWidth: 290,
    minHeight: 300,
    maxWidth: 345,
    margin: ".5%",
    marginBottom: "10%",
  },
  inputStyle: {
    padding: "2.5%",
  },
  header: {
    display: "flex",
    paddingTop: "2.5%",
  },
  discoverDeals: {
    paddingTop: "20%",
  },
  dealTileButton: {
    width: "50%",
    height: "40%",
    backgroundColor: "red",
    color: "white",
  },
}));
