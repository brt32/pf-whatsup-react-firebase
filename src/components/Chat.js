import React, { useState } from "react";
import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import { AddPhotoAlternate, ArrowBack, MoreVert } from "@material-ui/icons";
import { useParams, useHistory } from "react-router-dom";
import Compressor from "compressorjs";
import ChatMessages from "./ChatMessages";
import ChatFooter from "./ChatFooter";
import MediaPreview from "./MediaPreview";
import useRoom from "../hooks/useRoom";
import { createTimestamp, db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import "./Chat.css";
import useChatMessages from "../hooks/useChatMessages";

export default function Chat({ user, page }) {
  const [image, setImage] = useState(null);
  const [src, setSrc] = useState("");
  const [input, setInput] = useState("");

  const { roomId } = useParams();

  const history = useHistory();

  const messages = useChatMessages(roomId);
  const room = useRoom(roomId, user.uid);

  console.log(messages);

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() || (input === "" && image)) {
      setInput("");
      if (image) {
        closePreview();
      }
      const imageName = uuid();
      const newMessage = image
        ? {
            name: user.displayName,
            message: input,
            uid: user.uid,
            timestamp: createTimestamp(),
            time: new Date().toUTCString(),
            imageUrl: "uploading",
            imageName,
          }
        : {
            name: user.displayName,
            message: input,
            uid: user.uid,
            timestamp: createTimestamp(),
            time: new Date().toUTCString(),
          };

      db.collection("users")
        .doc(user.uid)
        .collection("chats")
        .doc(roomId)
        .set({
          name: room.name,
          photoURL: room.photoURL || null,
          timestamp: createTimestamp(),
        });

      const doc = await db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .add(newMessage);

      if (image) {
        new Compressor(image, {
          quality: 0.8,
          maxWidth: 1920,
          async success(result) {
            setSrc("");
            setImage(null);
            await storage.child(imageName).put(result);
            const url = await storage.child(imageName).getDownloadURL();
            db.collection("rooms")
              .doc(roomId)
              .collection("messages")
              .doc(doc.id)
              .update({
                imageUrl: url,
              });
          },
        });
      }
    }
  };

  const showPreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSrc(reader.result);
      };
    }
  };

  const closePreview = (e) => {
    setSrc("");
    setImage(null);
  };

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
            onChange={showPreview}
          />
          <IconButton>
            <label style={{ cursor: "pointer", height: 24 }} htmlFor="image">
              <AddPhotoAlternate />
            </label>
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
          <Menu id="menu" keepMounted open={false}>
            <MenuItem>Delete Room</MenuItem>
          </Menu>
        </div>
      </div>
      <div className="chat__body--container">
        <div className="chat__body" style={{ height: page.height - 68 }}>
          <ChatMessages messages={messages} user={user} roomId={roomId} />
        </div>
      </div>

      <MediaPreview src={src} closePreview={closePreview} />

      <ChatFooter
        input={input}
        onChange={onChange}
        sendMessage={sendMessage}
        image={image}
        user={user}
        room={room}
        roomId={roomId}
      />
    </div>
  );
}
