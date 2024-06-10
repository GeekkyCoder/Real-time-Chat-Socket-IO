import { useContext } from "react";
import Share from "../share/Share";
import "./feed.css";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const { user } = useContext(AuthContext);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <h4 style={{margin:"1em 0"}}>Just A Dummy Layout</h4>
        {(!username || username === user.username) && <Share />}
      </div>
    </div>
  );
}
