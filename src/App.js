import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Link to="/">
        <h1>React Router v6 - Learning</h1>
      </Link>
      <nav>
        <NavLink
          className={({ isActive }) => (isActive ? "nav-active" : null)}
          to="/"
        >
          Home
        </NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/stories">Stories</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/stories" element={<Stories />}>
          <Route index element={<StoryList />} />
          <Route path=":id" element={<Story />} />
        </Route>
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home Page</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About Page</h2>
    </div>
  );
}

function Stories() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

function StoryList() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setStories(json));
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <h2>Story List Page</h2>
      <ul>
        {stories.map((story) => (
          <li key={story.id}>
            <button onClick={() => navigate(`/stories/${story.id}`)}>
              {story.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Story() {
  const [story, setStory] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((json) => setStory(json));
  }, [id]);

  return (
    <div>
      <h2>{story.title}</h2>
      <p>{story.body}</p>
    </div>
  );
}

export default App;
