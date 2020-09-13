import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./logo";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";

const Header = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  // const [page,setPage]=useState(-1);
  const open = Boolean(anchorEl);
  // const history = useHistory();

  const handleLogout = () => {
    handleClose();
    props.logout(props.user.username, props.user.token);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // useEffect(()=>{
  //   const currentpath = history.location.pathname;
  //   if(currentpath === '/profile')
  //     setPage(0)
  //   else if(currentpath === '/subscription')
  //     setPage(1)
  // },[history])

  return (
    <div className="main-header">
      <Link to="/">
        <Logo light={true} />
      </Link>
      <div className="main-navbar">
        <Link to="/profile">
          <div className="navbar-item">{props.user.fname}</div>
        </Link>
        <div>
          <IconButton
            onClick={open ? handleClose : handleOpen}
            aria-label="options"
            aria-haspopup="true"
          >
            <MenuIcon style={{ color: "white" }} />
          </IconButton>
          <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  colors: state.coms.colors,
});

export default connect(mapStateToProps, { logout })(Header);
