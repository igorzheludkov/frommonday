export default interface IHabbit {
  id: string;
  title?: string;
  description?: string;
  category?: string;
  days?: Array<number>;
  time?: Array<number>;
  status: number;
}
