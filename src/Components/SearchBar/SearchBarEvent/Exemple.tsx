import { useState, useEffect } from "react";
import postData from "./data.json";

export function Exemple({ filteredPosts }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(postData);
  }, []);

  return (
    <>
      <div>
        <h1>Liste des articles</h1>
        <ul>
          {filteredPosts.map((post, index) => (
            <li key={index}>
              <h2>{post.title}</h2>
              <p>Catégories: {post.categories}</p>
              <p>Date: {post.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
