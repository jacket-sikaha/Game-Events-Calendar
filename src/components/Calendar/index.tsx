import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { useEffect, useState } from "react";
import "./index.css";
import type { CalendarGridItem, CalendarProps } from "./CalendarType";
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
const generateCalendarGrid = (date: Dayjs | string) => {
  const res = new Set<string>();
  const startM = dayjs(date).startOf("M");
  const endM = dayjs(date).endOf("M");
  const start = startM.subtract(parseInt(startM.format("d")), "day");
  const end = endM.add(6 - parseInt(endM.format("d")), "day");
  const length = end.diff(start, "day") + 1;
  Array.from({ length }).forEach((_, i) => {
    res.add(start.add(i, "day").format("YYYY-MM-DD"));
  });
  const res2: string[][] = [];
  const temp: string[] = [];
  Array.from({ length }).forEach((_, i) => {
    temp.push(start.add(i, "day").format("YYYY-MM-DD"));
  });

  for (let i = 0; i < temp.length; i += 7) {
    res2.push(temp.slice(i, i + 7));
  }
  // console.log("res", res2);
  return res2;
};
const rainbowColors = [
  "#FF0000",
  "#FF7F00",
  "#FFFF00",
  "#00FF00",
  "#0000FF",
  "#4B0082",
  "#8B00FF",
];
function Calendar({ value, activity, style }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(value);
  const [calendarGrid, setCalendarGrid] =
    useState<Map<string, CalendarGridItem[]>>();
  const [collapse, setCollapse] = useState(false);
  const handleMonChange = (type: boolean) => {
    setCurrentDate(
      type ? currentDate.add(1, "month") : currentDate.subtract(1, "month")
    );
  };

  const progressDisplay = (activity_status: number): string => {
    let radius = `${
      !collapse ? "hidden" : activity_status ? "" : "invisible"
    } `;
    switch (activity_status) {
      case 1:
        radius += `bg-[#50d71e] rounded-l-full`;
        break;
      case 2:
        radius += `bg-[#50d71e] rounded-r-full`;
        break;
      case 3:
        radius += `bg-[#50d71e] rounded-none`;
        break;
      default:
        break;
    }
    return radius;
  };

  // 层级分配算法
  const levelAssignment = () => {
    // 记录每一层级的当前最新的结束日期
    const check: Dayjs[] = [];
    const sortActivity = activity.sort((a, b) => {
      return dayjs(a.start_time).isBefore(b.start_time) ? -1 : 1;
    });
    const res = sortActivity.map((item) => {
      // const date1 = dayjs(start_time).format("YYYY-MM-DD");
      // const date2 = dayjs(end_time).format("YYYY-MM-DD");
      // const diffDays = dayjs(date1).diff(date2, "day", true) + 1;
      const { id, title, start_time, end_time } = item;
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
    console.log(
      "r77es",
      res.map(({ level }) => level)
    );
  };
  levelAssignment();
  console.log(
    111,
    // dayjs("2023-6-25").isBetween(
    //   "2023-07-08T21:00:00+00:00",
    //   "2023-07-16T20:59:00+00:00",
    //   "day",
    //   "[]"
    // )
    dayjs("2023-07-24").diff("2023-07-12", "day", true)
  );
  return (
    <>
      <div className="p-5 flex flex-col overflow-hidden" style={style}>
        <nav className="flex justify-between items-center">
          <div
            onClick={() => {
              handleMonChange(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.354 1.64599C11.4006 1.69244 11.4375 1.74761 11.4628 1.80836C11.488 1.86911 11.5009 1.93423 11.5009 1.99999C11.5009 2.06576 11.488 2.13088 11.4628 2.19163C11.4375 2.25237 11.4006 2.30755 11.354 2.35399L5.70704 7.99999L11.354 13.646C11.4479 13.7399 11.5007 13.8672 11.5007 14C11.5007 14.1328 11.4479 14.2601 11.354 14.354C11.2602 14.4479 11.1328 14.5006 11 14.5006C10.8673 14.5006 10.7399 14.4479 10.646 14.354L4.64604 8.35399C4.59948 8.30755 4.56253 8.25237 4.53733 8.19163C4.51212 8.13088 4.49915 8.06576 4.49915 7.99999C4.49915 7.93423 4.51212 7.86911 4.53733 7.80836C4.56253 7.74761 4.59948 7.69244 4.64604 7.64599L10.646 1.64599C10.6925 1.59943 10.7477 1.56249 10.8084 1.53728C10.8692 1.51207 10.9343 1.4991 11 1.4991C11.0658 1.4991 11.1309 1.51207 11.1917 1.53728C11.2524 1.56249 11.3076 1.59943 11.354 1.64599Z"
                fill="#1F2937"
              />
            </svg>
          </div>
          <div>{currentDate.format("YYYY[年] M[月]")}</div>
          <div
            onClick={() => {
              handleMonChange(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.64592 1.64599C4.69236 1.59943 4.74754 1.56249 4.80828 1.53728C4.86903 1.51207 4.93415 1.4991 4.99992 1.4991C5.06568 1.4991 5.13081 1.51207 5.19155 1.53728C5.2523 1.56249 5.30747 1.59943 5.35392 1.64599L11.3539 7.64599C11.4005 7.69244 11.4374 7.74761 11.4626 7.80836C11.4878 7.86911 11.5008 7.93423 11.5008 7.99999C11.5008 8.06576 11.4878 8.13088 11.4626 8.19163C11.4374 8.25237 11.4005 8.30755 11.3539 8.35399L5.35392 14.354C5.26003 14.4479 5.13269 14.5006 4.99992 14.5006C4.86714 14.5006 4.7398 14.4479 4.64592 14.354C4.55203 14.2601 4.49929 14.1328 4.49929 14C4.49929 13.8672 4.55203 13.7399 4.64592 13.646L10.2929 7.99999L4.64592 2.35399C4.59935 2.30755 4.56241 2.25237 4.5372 2.19163C4.512 2.13088 4.49902 2.06576 4.49902 1.99999C4.49902 1.93423 4.512 1.86911 4.5372 1.80836C4.56241 1.74761 4.59935 1.69244 4.64592 1.64599Z"
                fill="#1F2937"
              />
            </svg>
          </div>
        </nav>
        <div className="flex py-5 text-xs">
          <div className="flex-1 text-center">周日</div>
          <div className="flex-1 text-center">周一</div>
          <div className="flex-1 text-center">周二</div>
          <div className="flex-1 text-center">周三</div>
          <div className="flex-1 text-center">周四</div>
          <div className="flex-1 text-center">周五</div>
          <div className="flex-1 text-center">周六</div>
        </div>
        {/* 父元素包裹一个子元素，两者分别采用relative和absolute，
                  正常情况下子元素可以移动到父元素之外的任何位置，
                  但父元素设置了overflow:auto的情况下，
                  这种规则下跑出父元素宽高范围的子元素会撑开父元素来实现滚动（父元素还是原本的宽高，只多了滚动条）。
                  这样就能在每个日期下面的有限范围里展示我们的日程，
                  显示不完的也可以滚动下拉 */}
        <div className="grid grid-cols-1 text-xs h-full border">
          {[...generateCalendarGrid(currentDate)].map((_, i) => {
            return (
              <div className="relative w-full overflow-y-auto" key={i}>
                <div className="flex">
                  {_.map((__, j) => {
                    return (
                      <div
                        key={j}
                        className="w-full h-full flex justify-center"
                      >
                        {dayjs(__).format("D")}
                      </div>
                    );
                  })}
                </div>

                <div className="text-xs w-full">
                  <div className={`absolute bg-blue-400 span1`}>55555555</div>
                  <div
                    className={`block absolute bg-red-400 span2 top-[8em] overflow-hidden`}
                  >
                    55555555
                  </div>
                  <div className={`absolute bg-green-400 span3`}>55555555</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Calendar;
