import React from "react";
import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import { AddPhotoAlternate, ArrowBack, MoreVert } from "@material-ui/icons";
import { useParams, useHistory } from "react-router-dom";
import ChatMessages from "./ChatMessages";
import ChatFooter from "./ChatFooter";
import MediaPreview from "./MediaPreview";
import useRoom from "../hooks/useRoom";
import "./Chat.css";

export default function Chat({ user, page }) {
  const { roomId } = useParams();

  const history = useHistory();

  const room = useRoom(roomId, user.uid);

  console.log({ room });

  return (
    <div className="chat">
      <div className="chat__background" style={{ height: page.height }} />
      <div className="chat__header">
        {page.isMobile && (
          <IconButton onClick={history.goBack}>
            <ArrowBack />
          </IconButton>
        )}
        <div className="avatar__container">
          <Avatar src={room?.photoURL} />
        </div>
        <div className="chat__header--info">
          <h3 style={{ width: page.isMobile && page.width - 165 }}>
            {room?.name}
          </h3>
        </div>
        <div className="chat__header-right">
          <input
            type="file"
            id="image"
            style={{ display: "none" }}
            accept="image/*"
          />
          <IconButton>
            <label style={{ cursor: "pointer", height: 24 }} htmlFor="image">
              <AddPhotoAlternate />
            </label>
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
          <Menu id="menu" keepMounted>
            <MenuItem>Delete Room</MenuItem>
          </Menu>
        </div>
      </div>
      <div className="chat__body--container">
        <div className="chat__body" style={{ height: page.height - 68 }}>
          <ChatMessages />
        </div>
      </div>

      <MediaPreview />

      <ChatFooter />
    </div>
  );
}
