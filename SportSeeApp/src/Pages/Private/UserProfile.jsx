import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserData } from "@/Services/userService";
import Welcome from "@/Components/Welcome";
import Congratulations from "@/Components/Congratulations";

function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      getUserData(Number(userId)).then(setUser);
    }
  }, [userId]);

  if (!user) return <p>Chargement...</p>;

  return (
    <div className="userProfile">
      <Welcome name={user.userInfos.firstName} />
      <Congratulations congratulation={"Félicitation ! Vous avez explosé vos objectifs hier 👏"} />
    </div>
  );
}

export default UserProfile;