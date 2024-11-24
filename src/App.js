import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Dummy data for social media metrics
const userData = {
  followers: 1200,
  posts: 56,
  likes: 3450,
  comments: 210,
};

const postData = [
  { id: 1, title: "Post 1", likes: 250, comments: 15 },
  { id: 2, title: "Post 2", likes: 180, comments: 25 },
  { id: 3, title: "Post 3", likes: 300, comments: 40 },
  { id: 4, title: "Post 4", likes: 120, comments: 30 },
];

// Activity data for the line chart (e.g., daily activity)
const activityData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "User Activity",
      data: [50, 75, 100, 130, 120, 170, 200],
      borderColor: "rgba(75,192,192,1)",
      backgroundColor: "rgba(75,192,192,0.2)",
      fill: true,
    },
  ],
};

function Dashboard() {
  return (
    <div>
      <h1>Social Media Dashboard</h1>
      <div className="metrics">
        <div className="metric">
          <h3>Followers</h3>
          <p>{userData.followers}</p>
        </div>
        <div className="metric">
          <h3>Posts</h3>
          <p>{userData.posts}</p>
        </div>
        <div className="metric">
          <h3>Likes</h3>
          <p>{userData.likes}</p>
        </div>
        <div className="metric">
          <h3>Comments</h3>
          <p>{userData.comments}</p>
        </div>
      </div>

      <h2>Activity Over Time</h2>
      <div className="chart">
        <Line data={activityData} />
      </div>

      <h2>Recent Posts</h2>
      <ul>
        {postData.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>Likes: {post.likes}</p>
            <p>Comments: {post.comments}</p>
            <Link to={`/post/${post.id}`}>View Post</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PostDetail({ postId }) {
  const post = postData.find((p) => p.id === parseInt(postId));

  if (!post) {
    return <h2>Post not found</h2>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>Likes: {post.likes}</p>
      <p>Comments: {post.comments}</p>
      <Link to="/">Back to Dashboard</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

