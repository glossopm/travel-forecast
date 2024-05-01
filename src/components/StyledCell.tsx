import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";

export const StyledCell = styled(TableCell)((props) => ({
  [props.theme.breakpoints.down('sm')]: {
      fontSize: 10
  }
}))