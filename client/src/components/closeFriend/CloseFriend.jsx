import axios from "axios";
import "./closeFriend.css";
import useSnackbar from "../../hooks/useSnackbar";
import SimpleSnackbar from "../snackbar/Snackbar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function CloseFriend({ user, ownId }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);

  const { handleClose, handleOpen, open } = useSnackbar();

  const handleFollow = async (userToFollow) => {
    try {
      await axios.put(`/users/${userToFollow.id}/follow`, {
        userId: currentUser?._id,
      });
      dispatch({ type: "FOLLOW", payload: userToFollow.id });
      await axios.post(`/conversations`, {
        senderId: currentUser?._id,
        receiverId: userToFollow?.id,
      });
      handleOpen();
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <>
      <SimpleSnackbar
        handleClose={handleClose}
        handleOpen={handleOpen}
        message={`you are now following ${user?.userName}`}
        hideDuration={3000}
        open={open}
      />
      {user?.id !== ownId && (
        <div className="flex">
          <div>
            <li className="sidebarFriend">
              <img
                className="sidebarFriendImg"
                src={
                  PF + user.profilePicture.length > 0 ||
                  PF + "person/noAvatar.png"
                }
                alt=""
              />
              <span className="sidebarFriendName">{user.userName}</span>
            </li>
          </div>

          <span onClick={() => handleFollow(user)} className="follow-text">
            {currentUser?.followings.includes(user.id) ? "following" : "follow"}
          </span>

          <span style={{fontSize:".5rem"}}>
          {currentUser?.followers.includes(user.id) ? "follows you" : ""}
          </span>
        </div>
      )}
    </>
  );
}
