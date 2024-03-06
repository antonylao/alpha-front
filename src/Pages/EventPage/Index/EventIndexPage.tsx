import { Exemple } from "../../../Components/SearchBar/SearchBarEvent/Exemple";
import { SearchBar } from "../../../Components/SearchBar/SearchBarEvent/SearchBar";
import { useEffect, useState } from "react";
import postData from "../../../Components/SearchBar/SearchBarEvent/data.json";

export function EventIndex() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    setPosts(postData);
    setFilteredPosts(postData);
  }, []);

  const filterFuturePosts = () => {
    const currentDate = new Date();
    const futurePosts = postData.filter((post) => {
      const postDate = new Date(post.date);
      return postDate > currentDate;
    });
    // return futurePosts;
    setFilteredPosts(futurePosts);
  };

  const filterPastPosts = () => {
    const currentDate = new Date();
    const pastPosts = postData.filter((post) => {
      const postDate = new Date(post.date);
      return postDate < currentDate;
    });
    // return pastPosts;
    setFilteredPosts(pastPosts);
  };

  return (
    <>
      <SearchBar
        onFilterFuturePosts={filterFuturePosts}
        onFilterPastPosts={filterPastPosts}
        posts={posts}
      />
      <Exemple filteredPosts={filteredPosts} />
    </>
  );
}
