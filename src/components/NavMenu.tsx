import { Avatar, Dropdown, Menu } from "antd";
import {
  ArrowLeftOutlined,
  DisconnectOutlined,
  DownOutlined,
  PlusOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/store/user";
import Logo from "../images/logo-wordmark.svg";

const { Item } = Menu;

const StyledMenu = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .brandItems {
    img {
      width: 40%;
    }
  }
`;

const StyledMenuActions = styled.div`
  display: flex;

  .routeLinks {
    margin: 4px 1.5rem 0 0;
  }

  .routeLinks a {
    text-decoration: none;
    background-color: #f2f2f2;
    padding: 0.45rem 0.75rem;
  }

  .dropdown {
    p:hover {
      cursor: pointer;
    }
  }
`;

const NavMenu: React.FC = () => {
  const { user } = useSelector((state: any) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const UserMenu = () => {
    const handleMenuClick = (e: any) => {
      if (e.key === "2") {
        dispatch(logout({ history }));
      }
    };
    return (
      <div className="dropdown-menu">
        <Menu onClick={handleMenuClick}>
          <Item key="1" icon={<UserOutlined />}>
            Profile
          </Item>
          <Item key="2" icon={<DisconnectOutlined />}>
            Logout
          </Item>
          <Item disabled key="3" icon={<SettingOutlined />}>
            Dark Mode
          </Item>
        </Menu>
      </div>
    );
  };

  return (
    <StyledMenu>
      <div className="brandItems">
        <Link to="/">
          <img src={Logo} alt="Ampersand Logo" />
        </Link>
      </div>
      {user ? (
        <StyledMenuActions>
          <span className="routeLinks">
            {history.location.pathname !== "/" ? (
              <Link to="/">
                {" "}
                <ArrowLeftOutlined /> Back To Home
              </Link>
            ) : (
              <>
                <Link to="/tracker">
                  {" "}
                  <PlusOutlined /> Track Applications
                </Link>
                <Link to="/add-application">
                  {" "}
                  <PlusOutlined /> Add Application
                </Link>
              </>
            )}
          </span>
          <div className="dropdown">
            <Dropdown
              overlayStyle={{
                boxShadow:
                  "0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%)",
              }}
              overlay={UserMenu}
              trigger={["click"]}>
              <p className="ant-dropdown-link">
                <Avatar
                  src={user.profilePicture && user.profilePicture}
                  style={{ backgroundColor: "#FF5A5F" }}
                  icon={<UserOutlined />}
                />{" "}
                {`${user.firstName} ${user.lastName}`} <DownOutlined />
              </p>
            </Dropdown>
          </div>
        </StyledMenuActions>
      ) : null}
    </StyledMenu>
  );
};

export default NavMenu;