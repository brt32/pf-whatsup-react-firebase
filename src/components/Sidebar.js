import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { Add, ExitToApp, SearchOutlined } from "@material-ui/icons";
import { auth } from "../firebase";
import "./Sidebar.css";

export default function Sidebar({ user, page }) {
  const signOut = () => {
    auth.signOut();
  };

  return (
    <div
      className="sidebar"
      style={{ minHeight: page.isMobile ? page.height : "auto" }}
    >
      <div className="sidebar__header">
        <div className="sidebar_header--left">
          <Avatar src={user?.photoURL} />
          <h4>{user?.displayName}</h4>
        </div>
        <div className="sidebar__header--right">
          <IconButton onClick={signOut}>
            <ExitToApp />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <form className="sidebar__search--container">
          <SearchOutlined />
          <input
            placeholder="Search for users or rooms"
            type="text"
            id="search"
          />
        </form>
      </div>

      <div className="sidebar__chat--addRoom">
        <IconButton>
          <Add />
        </IconButton>
      </div>
    </div>
  );
}
