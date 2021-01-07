import React, { useState, useEffect } from "react";
import { API, Storage, Auth } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { listPosts } from "../graphql/queries";
import { deletePost as deletePostMutation } from "../graphql/mutations";
import Header from "./Header";
import Post from "./Post";
import bg from "../assets/bg.svg";
import { CircularProgress } from "@material-ui/core";

function App() {
  const [posts, setNotes] = useState([]);
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
    const newNotesArray = posts.filter((note) => note.id !== id);
    setNotes(newNotesArray);
    let res = await API.graphql({
      query: deletePostMutation,
      variables: { input: { id } },
    });

    console.log(res);
  }
  async function fetchNotes() {
    const apiData = await API.graphql({ query: listPosts });
    const notesFromAPI = apiData.data.listPosts.items;
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          const image = await Storage.get(note.image);
          note.image = image;
        }
        return note;
      })
    );
    setNotes(apiData.data.listPosts.items);
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
        <Header notes={posts} setNotes={setNotes} />
        <CircularProgress />
      </div>
    );
  }

  if (!loading && !posts.length) {
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
        <Header notes={posts} setNotes={setNotes} />
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
      <Header notes={posts} setNotes={setNotes} />

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
        {posts.map((post, index) => (
          <Post
            key={index}
            username={user.username}
            caption={post.caption}
            image={post.image}
            author={post.owner}
            deletePost={() => deleteNote(post)}
          />
        ))}
      </div>
      {/* <AmplifySignOut /> */}
    </div>
  );
}

export default withAuthenticator(App);
