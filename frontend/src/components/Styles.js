import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  formRoot: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    },
    root: {
      margin: "5%"
    }
  }
}));
