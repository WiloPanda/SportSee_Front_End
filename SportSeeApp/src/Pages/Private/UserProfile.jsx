import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserData } from "@/Services/mainDataService";
import { getUserActivity } from "@/Services/activityService";
import { getUserAverageSessions } from "@/Services/averageSessionsService";
import { getUserPerformance } from "@/Services/performanceService";
import Welcome from "@/Components/Welcome";
import Congratulations from "@/Components/Congratulations";
import ActivityChart from "@/components/ActivityChart";
import AverageSessionsChart from "@/components/AverageSessionsChart";
import PerformanceChart from "@/Components/PerformanceChart";
import ScoreChart from "@/components/ScoreChart";
import Nutriments from "@/Components/Nutriments";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [avgSessions, setAvgSessions] = useState([]);
  const [performance, setPerformance] = useState([]);

  useEffect(() => {
    if (!userId) return;
    const id = Number(userId);
    getUserData(id).then(setUser);
    getUserActivity(id).then(setSessions);
    getUserAverageSessions(id).then(setAvgSessions);
    getUserPerformance(id).then(setPerformance);
  }, [userId]);

  if (!user) return <p>Chargement...</p>;

  const rawScore = user.todayScore ?? user.score ?? 0;

  return (
    <div className="userProfile">
      <Welcome name={user.userInfos.firstName} />
      <Congratulations congratulation="Félicitation ! Vous avez explosé vos objectifs hier 👏" />
      <div className="charts_and_nutriments">
        <div className="charts-wrapper">
          <ActivityChart sessions={sessions} />
          <div className="small-charts">
            <AverageSessionsChart sessions={avgSessions} />
            <PerformanceChart performance={performance} />
            <ScoreChart score={rawScore} />
          </div>
        </div>
        <Nutriments keyData={user.keyData} />
      </div>
    </div>
  );
}

export default UserProfile;