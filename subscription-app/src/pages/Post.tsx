import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Post.css";

interface Comment {
  user: string;
  text: string;
}

interface MyPost {
  _id: string;
  title: string;
  content: string;
  comments: Comment[];
}

const MyPost = () => {
  const [myposts, setMyposts] = useState<MyPost[]>([]);
  const [commentInput, setCommentInput] = useState<{
    [postId: string]: string;
  }>({});

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/subscription");
      setMyposts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleCommentChange = (postId: string, value: string) => {
    setCommentInput((prevInputs) => ({
      ...prevInputs,
      [postId]: value,
    }));
  };

  const addComment = async (postId: string) => {
    const response = await axios.post(
      "http://localhost:5000/subs/comment",
      {
        postId,
        text: commentInput[postId],
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      const updatedPosts = myposts.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                { user: "You", text: commentInput[postId] },
              ],
            }
          : post
      );

      setMyposts(updatedPosts);

      setCommentInput((prevInputs) => ({
        ...prevInputs,
        [postId]: "",
      }));
      // fetchMyPosts();
    }
  };

  return (
    <div>
      {myposts.length ? (
        <div>
          {myposts.map((mypost) => (
            <div key={mypost._id}>
              <h3>{mypost.title}</h3>
              <p>{mypost.content}</p>
              <ul>
                {mypost.comments.map((comment, index) => (
                  <li key={index}>
                    <strong>{comment.user}:</strong> {comment.text}
                  </li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="Add a comment"
                value={commentInput[mypost._id] || ""}
                onChange={(e) =>
                  handleCommentChange(mypost._id, e.target.value)
                }
              />
              <button onClick={() => addComment(mypost._id)}>
                Add Comment
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="buy-plan">
          <div className="plan-content">You don't have access yet</div>
          <Link to="/sub-plan" className="plan-link">
            Buy a Plan
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyPost;
