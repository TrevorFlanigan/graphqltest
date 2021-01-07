import { IconButton, Modal, Backdrop, Fade, Paper } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import { useState } from "react";
import CreatePostModal from "./CreatePostModal";
import { AmplifySignOut } from "@aws-amplify/ui-react";
const Header = ({ notes, setNotes }) => {
  const [modalIn, setModalIn] = useState(false);

  const openModal = () => {
    setModalIn(true);
  };
  return (
    <div
      style={{
        minHeight: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h1
        style={{ fontFamily: "Montserrat", flex: "1 0", textAlign: "center" }}
      >
        FINSTAGRAM
      </h1>
      <div style={{ position: "absolute", marginLeft: "300px" }}>
        <IconButton
          onClick={() => {
            openModal();
          }}
        >
          <Settings />
        </IconButton>
      </div>

      <CreatePostModal
        modalIn={modalIn}
        setModalIn={setModalIn}
        notes={notes}
        setNotes={setNotes}
      />
      <div style={{ position: "absolute", bottom: 10, right: 10 }}>
        <AmplifySignOut />
      </div>
    </div>
  );
};

export default Header;
