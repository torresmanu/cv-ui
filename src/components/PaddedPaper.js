import Paper from '@material-ui/core/Paper';
import styled from "styled-components";


const PaddedPaper = styled(Paper)`
  padding: ${props => props.theme.spacing(3)}px;
  margin-bottom: ${props => props.theme.spacing(3)}px;
  margin-right:${props => props.marginRight ? props.marginRight : props.theme.spacing(3) + 'px'};
  margin-left:${props => props.marginLeft ? props.marginLeft : props.theme.spacing(3) + 'px'};
  /* for small screens */
  ${props => props.theme.breakpoints.down("sm")} {
    padding: 0px;
  }
  box-shadow: none !important;
`;
export default PaddedPaper;
