import React, { useState, useEffect } from "react";
import { API, Storage, Auth } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { listNotes } from "../graphql/queries";
import { deleteNote as deleteNoteMutation } from "../graphql/mutations";
import Header from "./Header";
import Post from "./Post";
import bg from "../assets/bg.svg";
import { CircularProgress } from "@material-ui/core";

function App() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState({});

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadAll = async () => {
      let user = await Auth.currentUserInfo();
      console.log("Current User: ", user);
      setUser(user);
      fetchNotes();
      setLoading(false);
    };
    loadAll();
  }, []);

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter((note) => note.id !== id);
    setNotes(newNotesArray);
    let res = await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });

    console.log(res);
  }
  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          const image = await Storage.get(note.image);
          note.image = image;
        }
        return note;
      })
    );
    setNotes(apiData.data.listNotes.items);
  }

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          flex: "1 0 100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundSize: "cover",
          backgroundImage: `url(${bg})`,
        }}
      >
        <Header notes={notes} setNotes={setNotes} />
        <CircularProgress />
      </div>
    );
  }

  if (!loading && !notes.length) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          flex: "1 0 100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundSize: "cover",
          backgroundImage: `url(${bg})`,
        }}
      >
        <Header notes={notes} setNotes={setNotes} />
        <h2>There's nothing here!</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        flex: "1 0 100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${bg})`,
      }}
    >
      <Header notes={notes} setNotes={setNotes} />

      <div
        style={{
          marginBottom: 30,
          maxHeight: "700px",
          overflow: "scroll",
          border: "2px solid grey",
          borderRadius: 10,
          width: "50%",
          maxWidth: "500px",
          alignItems: "center",
          flexDirection: "column",
          display: "flex",
          minWidth: "400px",
        }}
      >
        {notes.map((note, index) => (
          <div key={note.id || note.name}>
            <h2>{note.name}</h2>
            <p>{note.description}</p>
            <p>Posted by: {note.owner}</p>
            {note.owner === user.username && (
              <button onClick={() => deleteNote(note)}>Delete note</button>
            )}
            {note.image && <img src={note.image} style={{ width: 400 }} />}
          </div>
          // <Post
          //   key={index}
          //   caption={note.caption}
          //   image={note.image}
          //   author={note.owner}
          // />
        ))}
      </div>
      {/* <AmplifySignOut /> */}
    </div>
  );
}

export default withAuthenticator(App);
