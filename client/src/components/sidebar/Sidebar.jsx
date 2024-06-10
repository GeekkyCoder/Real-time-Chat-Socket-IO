import { useState, useEffect, memo, useContext } from "react";
import axios from "axios";
import "./sidebar.css";
import CloseFriend from "../closeFriend/CloseFriend";
import { AuthContext } from "../../context/AuthContext";

export default function Sidebar() {
  const [peoples, setPeoples] = useState([]);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetcAllPeoples = async () => {
      try {
        const { data: peoplesData } = await axios.get("/users/peoples");
        setPeoples(peoplesData);
      } catch (err) {
        console.log(err);
      }
    };
    fetcAllPeoples();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <>
          {!!peoples.length ? (
            <div>
              <h4>Peoples You Might Wanna Follow</h4>
              <hr className="sidebarHr" />
            </div>
          ) : (
            <div>
              <h3>No One to Follow for now</h3>
            </div>
          )}
        </>
        <ul className="sidebarFriendList">
          {!!peoples.length &&
            peoples.map((u) => (
              <CloseFriend key={u._id} user={u} ownId={currentUser._id} />
            ))}
        </ul>
      </div>
    </div>
  );
}
