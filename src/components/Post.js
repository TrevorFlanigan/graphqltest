const Post = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: 10,
        border: "1px solid black",
        padding: 10,
        borderRadius: 10,
        width: "300px",
        minHeight: "500px",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          border: "1px solid green",
          marginBottom: "20px",
          borderRadius: 10,
        }}
      >
        <p>Picture</p>
      </div>
      <div style={{ flex: "0 1 100px", border: "1px solid blue" }}>bio</div>
    </div>
  );
};

export default Post;
