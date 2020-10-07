export interface StatementItem {
  date: string;
  amount: number;
}

export class DateUtil {
  private static readonly ds = [0, 1, 2, 3, 4, 5, 6];

  static fmtDate(dt: Date) {
    const year = dt.getFullYear().toString().padStart(4, "0");
    const month = (dt.getMonth() + 1).toString().padStart(2, "0");
    const date = dt.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${date}`;
  }

  static getWeekSet(base: Date) {
    const day = base.getDay();
    const res = DateUtil.ds.map((r) => {
      const val = 864e5 * (r - day);
      const newDate = new Date(base.getTime() + val);
      return newDate;
    });

    return res;
  }

  static fillMissingStatement(set: StatementItem[]) {
    if (!set[0]) {
      return [];
    }
    const first = new Date(set[0].date || new Date());
    const week = DateUtil.getWeekSet(first).map(DateUtil.fmtDate);

    const res = week.map((w) => {
      const data = set.find((d) => DateUtil.fmtDate(new Date(d.date)) === w);
      let obj: StatementItem = {
        date: DateUtil.fmtDate(new Date(w)),
        amount: 0,
      };
      if (!data) return obj;
      obj.amount = data.amount;
      return obj;
    });

    return res;
  }
}
