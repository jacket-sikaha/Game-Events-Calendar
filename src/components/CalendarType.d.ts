import { Dayjs } from "dayjs";

export declare interface CalendarProps {
  value: Dayjs;
  activity: {
    title: string;
    start_time: string;
    end_time: string;
    banner: string;
    content: string;
  }[];
}

export declare interface CalendarGridItem {
  // calendar?: string;
  title?: string;
  activity_status?: number; // 0---不在范围内  1---是起始日期   2---是结束日期    3---处在两者之间
}
