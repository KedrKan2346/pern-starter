/**
 * The purpose of view model is separate domain DTOs from presentation data. This allows
 * developing new features on frontend without having backend just by serving fake data
 * from hardcoded json.
 */

export interface SubjectViewModel {
  id: string;
  name: string;
  sex: string;
  status: string;
  diagnosisDate: string;
}

/**
 * TechDebt: This model represents form state and is not part of presentation viewmodels.
 * However, it is not clear currently where this model should reside so leaving it here for now.
 */
export interface SubjectFormData {
  name: string;
  sex: string;
  status: string;
  diagnosisDate?: Date;
}
