import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const dash = () => {
  const [user, setUser] = useState({});
  const username = useParams().username;


  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);


  return (
    <div>
      <h1>dash</h1>
    </div>
  )
}

export default dash