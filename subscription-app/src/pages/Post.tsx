import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Post.css";

interface MyPost {
  _id: string;
  title: string;
  content: string;
}

const MyPost = () => {
  const [myposts, setMyposts] = useState<MyPost[]>([]);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      const { data: response } = await axios.get(
        "http://localhost:5000/subscription",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setMyposts(response);
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
