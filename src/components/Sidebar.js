import React from "react";
import styled from "styled-components";
import { rgba } from "polished";

import { NavLink as RouterNavLink, withRouter } from "react-router-dom";

import PerfectScrollbar from "react-perfect-scrollbar";
import "../vendor/perfect-scrollbar.css";

import logo from '../images/Logo4.png';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import {
  Avatar,
  Collapse,
  Grid,
  Chip,
  ListItem,
  ListItemText,
  Drawer as MuiDrawer,
  List as MuiList,
  Typography
} from "@material-ui/core";

import { ExpandLess, ExpandMore } from "@material-ui/icons";

import originalMenu from "../routes/index";

import {Logo} from "../pages/components/Logo";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import GLOBALS from "../services/GLOBALS";
import {redirectTo} from "../routes/functions";
import {AuthService} from "../services/AuthService";

let routes = originalMenu.filter(child => !child.hidden);

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`;

const Scrollbar = styled(PerfectScrollbar)`
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  background-image: linear-gradient(to bottom, #FFFFFF 6.34%, #D2D2D2 77.92%) !important;
`;

const List = styled(MuiList)`
`;

const Items = styled.div`
  padding-top: ${props => props.theme.spacing(2.5)}px;
  padding-bottom: ${props => props.theme.spacing(2.5)}px;
`;

const Brand = styled(ListItem)`
  font-size: ${props => props.theme.typography.h5.fontSize};
  font-weight: ${props => props.theme.typography.fontWeightMedium};
  color: ${props => props.theme.sidebar.header.color};
  background: #FFFFFF 6.34%;
  font-family: ${props => props.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${props => props.theme.spacing(6)}px;
  padding-right: ${props => props.theme.spacing(6)}px;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  

  ${props => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }
`;


const Category = styled(ListItem)`
  padding-top: ${props => props.theme.spacing(3)}px;
  padding-bottom: ${props => props.theme.spacing(3)}px;
  padding-left: ${props => props.theme.spacing(6)}px;
  padding-right: ${props => props.theme.spacing(5)}px;
  font-weight: ${props => props.theme.typography.fontWeightRegular};

  svg {
    color: ${props => props.theme.sidebar.color};
    font-size: 20px;
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: #D2D2D2;
    border-radius: 8px;
  }

  &.${props => props.activeClassName} {

    span {
      color: ${props => props.theme.sidebar.color};
    }
  }
`;

const CategoryText = styled(ListItemText)`
  margin: 0;
  span {
    color: ${props => props.theme.sidebar.color};
    font-size: 16px;
    font-weight: 500;
    padding: 0 ${props => props.theme.spacing(4)}px;
  }
`;

const CategoryIconLess = styled(ExpandLess)`
  color: ${props => rgba(props.theme.sidebar.color, 0.5)};
`;

const CategoryIconMore = styled(ExpandMore)`
  color: ${props => rgba(props.theme.sidebar.color, 0.5)};
`;

const Link = styled(ListItem)`
  padding-left: ${props => props.theme.spacing(14)}px;
  padding-top: ${props => props.theme.spacing(2)}px;
  padding-bottom: ${props => props.theme.spacing(2)}px;

  span {
    color: ${props => rgba(props.theme.sidebar.color, 0.7)};
  }

  &:hover {
    background: #EEF7FF;
    border-radius: 8px;
    span {
      color: ${props => props.theme.sidebar.color};
    }
  }

  &.${props => props.activeClassName} {

    span {
      color: ${props => props.theme.sidebar.color};
    }
  }
`;

const LinkText = styled(ListItemText)`
  color: ${props => props.theme.sidebar.color};
  span {
    font-size: 15px;
  }
  margin-top: 0;
  margin-bottom: 0;
`;

const LinkBadge = styled(Chip)`
  font-size: 11px;
  font-weight: ${props => props.theme.typography.fontWeightBold};
  height: 20px;
  position: absolute;
  right: 12px;
  top: 8px;

  span.MuiChip-label,
  span.MuiChip-label:hover {
    cursor: pointer;
    color: ${props => props.theme.sidebar.badge.color};
    padding-left: ${props => props.theme.spacing(2)}px;
    padding-right: ${props => props.theme.spacing(2)}px;
  }
`;

const CategoryBadge = styled(LinkBadge)`
  top: 12px;
`;

const SidebarSection = styled(Typography)`
  color: ${props => props.theme.sidebar.color};
  padding: ${props => props.theme.spacing(4)}px
    ${props => props.theme.spacing(6)}px ${props => props.theme.spacing(1)}px;
  font-weight: 600;
  display: block;
`;

const SidebarFooter = styled.div`
  padding: ${props => props.theme.spacing(3)}px
    ${props => props.theme.spacing(4)}px;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  background: #FFFFFF 77.92%;
  &:hover {
    background: #D2D2D2;
    cursor: pointer;
  }

`;

function SidebarCategory({
  name,
  icon,
  classes,
  isOpen,
  isCollapsable,
  badge,
  ...rest
}) {
  return (
    <Category {...rest}>
      {icon}
      <CategoryText>{name}</CategoryText>
      {isCollapsable ? (
        isOpen ? (
          <CategoryIconMore />
        ) : (
          <CategoryIconLess />
        )
      ) : null}
      {badge ? <CategoryBadge label={badge} /> : ""}
    </Category>
  );
}



function SidebarLink({ name, to, badge, disabled=false }) {
  return (
    <Link
      button
      dense
      component={NavLink}
      exact
      to={to}
      activeClassName="active"
      disabled={disabled}
    >
      <LinkText>{name}</LinkText>
      {badge ? <LinkBadge label={badge} /> : ""}
    </Link>
  );
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggle = index => {
    // Collapse all elements
    Object.keys(this.state).forEach(
      item =>
        this.state[index] ||
        this.setState(() => ({
          [item]: false
        }))
    );

    // Toggle selected element
    this.setState(state => ({
      [index]: !state[index]
    }));
  };

  UNSAFE_componentWillMount() {
    /* Open collapse element that matches current url */
    const pathName = this.props.location.pathname;

    routes.forEach((route, index) => {
      const isActive = pathName.indexOf(route.path) === 0;
      const isOpen = route.open;
      const isHome = route.containsHome && pathName === "/" ? true : false;

      this.setState(() => ({
        [index]: isActive || isOpen || isHome
      }));
    });
  }


  render() {
    const { classes, staticContext, ...other } = this.props;

    function handleLogout(){
      AuthService.logout();
      sessionStorage.removeItem(GLOBALS.SESSION_KEYS.TOKEN);
      sessionStorage.removeItem(GLOBALS.SESSION_KEYS.USER);
      sessionStorage.removeItem(GLOBALS.SESSION_KEYS.USER_ID);
      redirectTo('/auth/sign-in')
    }

    return (
      <Drawer variant="permanent" {...other}>
        <Brand>
          <Logo logo={logo} padding={'5'} width={'150px'} />
        </Brand>
        <Scrollbar>
          <List disablePadding>
            <Items>
              {routes.map((category, index) => (
                <React.Fragment key={index}>
                  {category.header ? (
                    <SidebarSection>{category.header}</SidebarSection>
                  ) : null}

                  {category.children ? (
                    <React.Fragment key={index}>
                      <SidebarCategory
                        isOpen={!this.state[index]}
                        isCollapsable={true}
                        name={category.id}
                        icon={category.icon}
                        button={true}
                        onClick={() => this.toggle(index)}
                      />

                      <Collapse
                        in={this.state[index]}
                        timeout="auto"
                        unmountOnExit
                      >
                        {category.children.map((route, index) => (
                            route.hidden ?
                                null
                                :
                          <SidebarLink
                            key={index}
                            name={route.name}
                            to={route.path}
                            icon={route.icon}
                            badge={route.badge}
                            disabled={route.disabled}
                          />
                        ))}
                      </Collapse>
                    </React.Fragment>
                  ) : (
                    <SidebarCategory
                      isCollapsable={false}
                      name={category.id}
                      to={category.path}
                      activeClassName="active"
                      component={NavLink}
                      icon={category.icon}
                      exact
                      badge={category.badge}
                    />
                  )}
                </React.Fragment>
              ))}
            </Items>
          </List>
        </Scrollbar>
        <Divider/>
        <SidebarFooter onClick={() => this.toggle(10)}>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar
                alt={sessionStorage.getItem('user_first_name')}
                src="../images/user.png"
                style={{color: '#FFFFFF', backgroundColor: '#D2D2D2'}}
              />
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {sessionStorage.getItem('user_first_name')} {sessionStorage.getItem('user_last_name')}
              </Typography>
              <Typography variant="body2">
                {sessionStorage.getItem('username')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Collapse
                in={this.state[10]}
                timeout="auto"
                unmountOnExit
              >
                <Grid item xs={12}>
                  <Button
                    startIcon={<AccountBoxIcon/>}
                    onClick={(e)=> redirectTo('/my_account')}
                    disabled={!sessionStorage.getItem(GLOBALS.SESSION_KEYS.TOKEN)}
                    fullWidth
                    style={{justifyContent: "left"}}
                  >
                    My Account
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    startIcon={<ExitToAppIcon/>}
                    onClick={(e)=> handleLogout()}
                    disabled={!sessionStorage.getItem(GLOBALS.SESSION_KEYS.TOKEN)}
                    fullWidth
                    style={{justifyContent: "left"}}
                  >
                    Logout
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography style={{marginTop: '15px'}}>
                   VERSION: {GLOBALS.VERSION}
                  </Typography>
                </Grid>
              </Collapse>
            </Grid>
          </Grid>
        </SidebarFooter>
      </Drawer>
    );
  }
}

export default withRouter(Sidebar);
