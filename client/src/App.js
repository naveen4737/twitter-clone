import './App.css';
import {Route, Routes, Navigate} from 'react-router-dom';
import Home from './components/Home/Home';
import Signup from './components/SignUp/Signup';
import Login from './components/Login/Login';
import MyTweets from './components/MyTweets/MyTweets';
import PostTweet from './components/PostTweet/PostTweet';
import Navbar from './components/Navbar';
import Following from './components/Following/Following';
import NotFollowing from './components/NotFollowing/NotFollowing';

function App() {
  const user = localStorage.getItem("token");
  return (
    <>
    <Navbar/>
    <Routes>
      {user && <Route path="/" exact element={<Home/>} />}
      <Route path="/post" exact element={<PostTweet/>} />
      <Route path="/signup" exact element={<Signup/>} />
      <Route path="/login" exact element={<Login/>} />
      <Route path="/following" exact element={<Following/>} />
      <Route path="/notfollowing" exact element={<NotFollowing/>} />
      <Route path="/mytweets" exact element={<MyTweets/>} />
      <Route path="/" exact element={<Navigate replace to="/login"/>} />
    </Routes>
    </>
  );
}

export default App;
