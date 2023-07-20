export interface PopulationData {
  prefCode: string;
  prefName: string;
  data: {
    label: string;
    data: {
      year: number;
      value: number;
    }[];
  }[];
}
