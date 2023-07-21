import dayjs, { Dayjs } from "dayjs";
import { CalendarActivity, CalendarWeekItem } from "./CalendarType";
// import classNames from "classnames";

export const rainbowColors = [
  "#fca5a5",
  "#fdba74",
  "#fde047",
  "#86efac",
  "#5eead4",
  "#93c5fd",
  "#d8b4fe",
];

export const generateCalendarGrid = (date: Dayjs | string) => {
  const startM = dayjs(date).startOf("M");
  const endM = dayjs(date).endOf("M");
  const start = startM.subtract(parseInt(startM.format("d")), "day");
  const end = endM.add(6 - parseInt(endM.format("d")), "day");
  const length = end.diff(start, "day") + 1;
  const res: string[][] = [];
  const temp: string[] = [];
  Array.from({ length }).forEach((_, i) => {
    temp.push(start.add(i, "day").format("YYYY-MM-DD"));
  });
  for (let i = 0; i < temp.length; i += 7) {
    res.push(temp.slice(i, i + 7));
  }
  return res;
};

// 层级分配算法
export const levelAssignment = (events: CalendarActivity[]) => {
  // 记录每一层级的当前最新的结束日期
  const check: Dayjs[] = [];
  const sortActivity = events.sort((a, b) => {
    return dayjs(a.start_time).isBefore(b.start_time) ? -1 : 1;
  });
  return sortActivity.map((item) => {
    const { start_time, end_time } = item;
    if (check.length === 0) {
      check.push(dayjs(end_time));
      return { ...item, level: 1 };
    }
    const isNeedNewLine = check.findIndex((endDate) => {
      return dayjs(start_time).isSameOrAfter(endDate);
    });
    if (isNeedNewLine === -1) {
      // 没有超过任一层级的最新的活动结束日期，就需要新建一行
      check.push(dayjs(end_time));
      return { ...item, level: check.length };
    } else {
      // 有 就在符合的层级进行添加，标记，并更新活动的结束日期
      check[isNeedNewLine] = dayjs(end_time);
      return { ...item, level: isNeedNewLine + 1 };
    }
  });
};

export const calculateEventPosition = (
  date: Dayjs | string,
  events: CalendarActivity[]
): CalendarWeekItem[][] => {
  const res = [];
  const temp = generateCalendarGrid(date);
  const eventsWithLevel = levelAssignment(events);
  // 一个活动对应一种颜色 尽量区分开
  const colorMap = new Map<number, string>(
    events.map((item, i) => [item.id, rainbowColors[i % rainbowColors.length]])
  );

  for (let i = 0; i < temp.length; i++) {
    const week = temp[i];
    const thisWeekEvents = [];
    for (let j = 0; j < eventsWithLevel.length; j++) {
      const { start_time, end_time } = eventsWithLevel[j];
      let left = 0;
      let width = 0;
      week.forEach((day) => {
        if (dayjs(day).isBetween(start_time, end_time, "day", "[]")) {
          width++;
        }
        if (width === 0) {
          left++;
        }
      });
      width > 0 &&
        thisWeekEvents.push({
          ...eventsWithLevel[j],
          left,
          width,
          color: colorMap.get(eventsWithLevel[j].id) as string,
        });
    }
    res.push(thisWeekEvents);
  }
  return res;
};

export const parseClassName = (event: CalendarWeekItem): string => {
  // !!! tailwindcss 样式不生效问题
  // https://tailwindcss.com/docs/content-configuration#dynamic-class-names
  // tailwindcss 目前不支持  拼接字符串  这种动态类名的写法
  // tailwindcss 只会在源文件中找到作为完全不间断的字符串存在的类。（如下面这种不完整的类名，他就不会进行处理）
  const { left, width, level, color } = event;
  return `absolute rounded-lg pl-2 bg-[${color}] top-[${
    20 * level + "%"
  }] width-[calc(${width}00%/7)] ${
    left === 0 || left === 7 ? "" : `left-[calc(${left}00%/7)]`
  }`;
  // return classNames("absolute rounded-lg pl-2", {
  //   [`bg-[${color}]`]: true,
  //   [`top-[${20 * level + "%"}]`]: true,
  //   [`w-[calc(${width}00%/7)]`]: true,
  //   [`left-[calc(${left}00%/7)]`]: left !== 0 && left !== 7,
  // });
};
