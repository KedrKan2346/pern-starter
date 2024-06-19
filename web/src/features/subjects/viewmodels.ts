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
