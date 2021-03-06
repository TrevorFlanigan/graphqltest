import {
  Modal,
  Backdrop,
  Fade,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import { createPost as createPostMutation } from "../graphql/mutations";
import { API, Storage, Auth } from "aws-amplify";
import { useState } from "react";

const initialFormState = { caption: "", imageFile: [], image: "" };

const CreatePostModal = ({ modalIn, setModalIn, notes, setNotes }) => {
  const [formData, setFormData] = useState(initialFormState);

  async function onChange(e) {
    console.log("file");
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name, imageFile: file });
    console.log(formData.imageFile);
  }

  async function createNote() {
    if (!formData.caption || !formData.image) return;
    let cloned = {};
    Object.assign(cloned, formData);
    console.log(cloned);
    delete cloned.imageFile;
    let res = await API.graphql({
      query: createPostMutation,
      variables: { input: cloned },
    });
    if (formData.image) {
      await Storage.put(formData.image, formData.imageFile);
      const image = await Storage.get(formData.image);
      formData.image = image;
    }

    console.log(res.data);

    let acc = await Auth.currentUserInfo();
    formData.owner = acc.username;

    setNotes([formData, ...notes]);
    setFormData(initialFormState);
    setModalIn(false);
  }

  return (
    <Modal
      disableAutoFocus={true}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={modalIn}
      onClose={() => setModalIn(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalIn}>
        <div
          style={{
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            style={{
              width: "33%",
              height: "66%",
              minHeight: "500px",
              minWidth: "300px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pointerEvents: "all",
              position: "relative",
              justifyContent: "space-evenly",
            }}
          >
            <h1>Create a Post!</h1>
            <input type="file" accept="image/*" onChange={onChange} />
            <TextField
              multiline
              onChange={(e) =>
                setFormData({ ...formData, caption: e.target.value })
              }
              label="Caption"
              value={formData.caption}
            />
            <Button onClick={createNote} variant="contained" color="primary">
              Create Post
            </Button>
            <div style={{ position: "absolute", bottom: 10 }}></div>
          </Paper>
        </div>
      </Fade>
    </Modal>
  );
};

export default CreatePostModal;
