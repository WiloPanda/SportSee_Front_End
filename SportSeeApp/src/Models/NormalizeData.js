/**
 * Classe pour normaliser les données principales de l'utilisateur
 */
class UserMainDataModel {
  constructor(apiResponse) {
    const data = apiResponse?.data || apiResponse;

    this.id = data?.id || null;
    this.userInfos = {
      firstName: data?.userInfos?.firstName || '',
      lastName: data?.userInfos?.lastName || '',
      age: data?.userInfos?.age || 0
    };
    // Gère todayScore OU score
    this.todayScore = data?.todayScore || data?.score || 0;
    this.keyData = {
      calorieCount: data?.keyData?.calorieCount || 0,
      proteinCount: data?.keyData?.proteinCount || 0,
      carbohydrateCount: data?.keyData?.carbohydrateCount || 0,
      lipidCount: data?.keyData?.lipidCount || 0
    };
  }
}

/**
 * Classe pour normaliser les données d'activité (BarChart)
 */
class ActivityChartModel {
  constructor(apiResponse) {
    const sessions = apiResponse?.data?.sessions || apiResponse?.sessions || [];

    this.dataModel = sessions.map((session, index) => ({
      day: session?.day || '',
      dayIndex: index + 1,
      kilogram: session?.kilogram || 0,
      calories: session?.calories || 0
    }));
  }
}

/**
 * Classe pour normaliser les données de sessions moyennes (LineChart)
 */
class SessionsChartModel {
  constructor(apiResponse) {
    // Gère API (apiResponse.data.sessions) OU Mock (apiResponse.sessions)
    const sessions = apiResponse?.data?.sessions || apiResponse?.sessions || [];

    const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    this.dataModel = sessions.map(session => ({
      day: session?.day || 0,
      dayLabel: dayLabels[session?.day - 1] || '',
      sessionLength: session?.sessionLength || 0
    }));
  }
}

/**
 * Classe pour normaliser les données de performances (RadarChart)
 */
class PerformanceChartModel {
  constructor(input) {
    const items = (input?.data?.data ?? input?.data) ?? [];

    this.dataModel = items.map((item) => ({
      kind: this.convertKind(item.kind),
      value: item.value,
    }));

    this.changeOrder();
  }

  changeOrder() {
    const order = [
      { kind: 'Intensité' },
      { kind: 'Vitesse' },
      { kind: 'Force' },
      { kind: 'Endurance' },
      { kind: 'Energie' },
      { kind: 'Cardio' },
    ];
    this.dataModel = order.map((it) => ({
      ...it,
      ...this.dataModel.find((d) => d.kind === it.kind),
      value: (this.dataModel.find((d) => d.kind === it.kind)?.value) ?? 0,
    }));
  }

  convertKind(kind) {
    const categories = [
      'Cardio',
      'Energie',
      'Endurance',
      'Force',
      'Vitesse',
      'Intensité',
    ];
    return categories[kind - 1];
  }
}

export {
  UserMainDataModel,
  ActivityChartModel,
  SessionsChartModel,
  PerformanceChartModel,
};