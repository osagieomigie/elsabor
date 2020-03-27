import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    margin: "10%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "3%",
    paddingLeft: "0%",
    width: "40%",
    height: "50%"
  },
  form: {
    marginLeft: "0%",
    paddingLeft: "0%"
  },
  textBox: {
    width: "60%"
  },

  inputStyle: {
    padding: "2.5%"
  }
}));
