import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Welcome from "@/Components/Welcome";
import Congratulations from "@/Components/Congratulations";
import ActivityChart from "@/components/ActivityChart";
import AverageSessionsChart from "@/components/AverageSessionsChart";
import PerformanceChart from "@/Components/PerformanceChart";
import ScoreChart from "@/components/ScoreChart";
import Nutriments from "@/Components/Nutriments";
import ApiService from "@/Services/api.service";
import MockService from "@/Services/mock.service";
import {
  UserMainDataModel,
  ActivityChartModel,
  SessionsChartModel,
  PerformanceChartModel,
} from "@/Models/NormalizeData";

const UserProfile = () => {
  const { userId } = useParams();
  const [useApi, setUseApi] = useState(true);
  const [dataMain, setDataMain] = useState(null);
  const [dataActivity, setDataActivity] = useState(null);
  const [dataPerformance, setDataPerformance] = useState(null);
  const [dataSession, setDataSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getInfo(userId);
  }, [userId]);

  const getInfo = async (userId) => {

    let mainResponse, activityResponse, performanceResponse, sessionResponse;

    if (useApi) {
      // Tentative de récupération des données depuis l'API
      const user = await ApiService.GetUser(userId);

      if (user) {
        console.log("j'utilise les données de l'API");
        mainResponse = await ApiService.GetUser(userId);
        activityResponse = await ApiService.GetActivity(userId);
        performanceResponse = await ApiService.GetPerformance(userId);
        sessionResponse = await ApiService.GetSessions(userId);
      } else {
        console.log("j'utilise les données mock");
        mainResponse = await MockService.GetUser(userId);
        activityResponse = await MockService.GetActivity(userId);
        performanceResponse = await MockService.GetPerformance(userId);
        sessionResponse = await MockService.GetSessions(userId);
      }
    } else {
      console.log("j'utilise les données mock");
      mainResponse = await MockService.GetUser(userId);
      activityResponse = await MockService.GetActivity(userId);
      performanceResponse = await MockService.GetPerformance(userId);
      sessionResponse = await MockService.GetSessions(userId);
    }

    if (!mainResponse || !activityResponse || !performanceResponse || !sessionResponse) {
      console.log("Problème de chargement des données");
      return;
    }

    // Normalisation des données avec les classes
    const normalizedMain = new UserMainDataModel(mainResponse);
    const normalizedActivity = new ActivityChartModel(activityResponse);
    const normalizedPerformance = new PerformanceChartModel(performanceResponse);
    const normalizedSessions = new SessionsChartModel(sessionResponse);

    // Mise à jour du state avec les données normalisées
    setDataMain(normalizedMain);
    setDataActivity(normalizedActivity.dataModel);
    setDataPerformance(normalizedPerformance.dataModel);
    setDataSession(normalizedSessions.dataModel);
    setIsLoading(false);
  };

  if (isLoading) {
    return <h3>Chargement...</h3>;
  }

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
            <ScoreChart score={dataMain.todayScore} />
          </div>
        </div>
        <Nutriments keyData={dataMain.keyData} />
      </div>
    </div>
  );
};

export default UserProfile;