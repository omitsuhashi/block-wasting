export interface Storage {
  date: Date;
  histories: Histories;
  rules: Rules;
}

type Histories = {[host: string]: number};
type Rules = {[host: string]: Rule}
type Rule = {
  limit: number
}
