import { IconButton } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
const Post = ({ caption, image, author, deletePost, username }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: 10,
        padding: 10,
        borderRadius: 10,
        width: "300px",
        minHeight: "500px",
        backgroundColor: "white",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", top: -10, right: -10 }}>
        {author === username && (
          <IconButton onClick={deletePost}>
            <Clear />
          </IconButton>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          marginBottom: "20px",
          borderRadius: 10,
        }}
      >
        <img src={image} alt="" style={{ flexGrow: 1, borderRadius: 10 }} />
      </div>
      <div
        style={{
          flex: "0 1 100px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <p style={{ flexGrow: 1 }}>{caption}</p>
        <h6 style={{ margin: 5, textAlign: "right" }}>@{author}</h6>
      </div>
    </div>
  );
};

export default Post;
