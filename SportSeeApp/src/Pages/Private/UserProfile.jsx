import { useParams } from "react-router-dom";
import { use, useEffect, useState } from "react";
import Welcome from "@/Components/Welcome";
import Congratulations from "@/Components/Congratulations";
import ActivityChart from "@/components/ActivityChart";
import AverageSessionsChart from "@/components/AverageSessionsChart";
import PerformanceChart from "@/Components/PerformanceChart";
import ScoreChart from "@/components/ScoreChart";
import Nutriments from "@/Components/Nutriments";
import ApiService from "@/Services/api.service";
import MockService from "@/Services/mock.service";

const UserProfile = () => {
  const { userId } = useParams();
  const [useApi, setUseApi] = useState(true);
  const [dataMain, setDataMain] = useState({});
  const [dataActivity, setDataActivity] = useState({});
  const [dataPerformance, setDataPerformance] = useState({});
  const [dataSession, setDataSession] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const currentUserId = userId;

  useEffect(() => {
    getInfo(userId);
  }, [userId]);

  const getInfo = async () => {
    const dataMain = [];
    const dataActivity = [];
    const dataPerformance = [];
    const dataSession = [];

    if (useApi) {
      let user = await ApiService.GetUser(userId);
      if (user) {
        console.log("je suis dans l'api")
        dataMain = await ApiService.GetMaindata(currentUserId)
        dataActivity = await ApiService.GetActivity(currentUserId)
        dataPerformance = await ApiService.GetPerformance(currentUserId)
        dataSession = await ApiService.GetSessions(currentUserId)

      } else {
        console.log("je suis dans le mock")
        dataMain = await MockService.GetMaindata(currentUserId)
        dataActivity = await MockService.GetActivity(currentUserId)
        dataPerformance = await MockService.GetPerformance(currentUserId)
        dataSession = await MockService.GetSessions(currentUserId)
      }
    } else {
      console.log("je suis dans le mock")
      dataMain = await MockService.GetMaindata(currentUserId)
      dataActivity = await MockService.GetActivity(currentUserId)
      dataPerformance = await MockService.GetPerformance(currentUserId)
      dataSession = await MockService.GetSessions(currentUserId)

    }
    //faire appel à la class pour normaliser les données 
    // let data = new myClass(dataMain,dataActivity,dataSession,dataPerformance)
    setDataMain(dataMain);
    setDataActivity(dataActivity);
    setDataPerformance(dataPerformance);
    setDataSession(dataSession);
    setIsLoading(false);
  };

  if (isLoading) return (
    <h3>Chargement...</h3>
  )

  return (
    <div className="userProfile">
      <Welcome name={dataMain.userInfos.firstName} />
      <Congratulations congratulation="Félicitation ! Vous avez explosé vos objectifs hier 👏" />
      <div className="charts_and_nutriments">
        <div className="charts-wrapper">
          <ActivityChart sessions={dataActivity} />
          <div className="small-charts">
            <AverageSessionsChart sessions={dataSession} />
            <PerformanceChart performance={dataPerformance} />
            <ScoreChart score={rawScore} />
          </div>
        </div>
        <Nutriments keyData={user.keyData} />
      </div>
    </div>
  );
}

export default UserProfile;