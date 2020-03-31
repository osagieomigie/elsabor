import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    //marginTop: "10%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "3%",
    paddingLeft: "0%",
    width: "40%",
    height: "50%",
    color: "white !important",
    backgroundColor: "#484848 !important"
  },
  backGroundStyle: {
    paddingTop: "12%"
  },
  form: {
    marginLeft: "0%",
    paddingLeft: "0%"
  },
  textBox: {
    width: "60%"
  },
  inputColour: {
    color: "white !important"
  },
  card: {
    maxWidth: 345
  },
  inputStyle: {
    padding: "2.5%"
  }
}));
