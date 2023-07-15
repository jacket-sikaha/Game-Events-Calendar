import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useEffect, useState } from "react";
import type { CalendarGridItem, CalendarProps } from "./CalendarType";
dayjs.extend(isBetween);

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
  return res;
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
function Calendar({ value, activity }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(value);
  const [calendarGrid, setCalendarGrid] =
    useState<Map<string, CalendarGridItem[]>>();
  const [collapse, setCollapse] = useState(false);
  const handleMonChange = (type: boolean) => {
    setCurrentDate(
      type ? currentDate.add(1, "month") : currentDate.subtract(1, "month")
    );
  };

  // const progressDisplay = (activity_status: number, i: number): string => {
  //   let radius = "";
  //   switch (activity_status) {
  //     case 1:
  //       radius = "rounded-l-full";
  //       break;
  //     case 2:
  //       radius = "rounded-r-full";
  //       break;
  //     case 3:
  //       radius = "rounded-full";
  //       break;
  //     default:
  //       break;
  //   }
  //   return `w-full ${collapse ? "" : "hidden"} bg-red-${
  //     (i + 1) * 100
  //   } ${radius}`;
  // };
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

  useEffect(() => {
    const temp = generateCalendarGrid(currentDate);
    const sortActivity = activity.sort((a, b) => {
      return dayjs(a.start_time).isBefore(b.start_time) ? -1 : 1;
    });
    const result = new Map<string, CalendarGridItem[]>(
      [...temp].map((str) => [str, []])
    );
    // 0---不在范围内  1---是起始日期   2---是结束日期    3---处在两者之间
    [...temp].forEach((str) => {
      sortActivity.forEach(({ title, start_time, end_time }) => {
        if (dayjs(str).isSame(start_time, "day")) {
          result.set(str, [
            ...(result.get(str) ?? []),
            { title, activity_status: 1 },
          ]);
          return;
        }
        if (dayjs(str).isSame(end_time, "day")) {
          result.set(str, [
            ...(result.get(str) ?? []),
            { title, activity_status: 2 },
          ]);
          return;
        }
        if (dayjs(str).isBetween(start_time, end_time, "day", "[]")) {
          result.set(str, [
            ...(result.get(str) ?? []),
            { title, activity_status: 3 },
          ]);
        } else {
          // result.set(str, [
          //   ...(result.get(str) ?? []),
          //   { title: " ", activity_status: 0 },
          // ]);
        }
      });
    });

    setCalendarGrid(result);
  }, [currentDate]);
  return (
    <>
      <div className="p-5">
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
        <div className="grid grid-cols-7 place-items-center py-5">
          <div>日</div>
          <div>一</div>
          <div>二</div>
          <div>三</div>
          <div>四</div>
          <div>五</div>
          <div>六</div>
        </div>

        <div className={`grid grid-cols-7 aspect-[4/3] place-items-center`}>
          {[...(calendarGrid?.keys() ?? [])].map((_, i) => {
            return (
              <>
                <div
                  key={i}
                  className="w-full h-full flex justify-center items-center"
                >
                  {dayjs(_).format("D")}
                </div>
              </>
            );
          })}
        </div>

        {/* <div
          onClick={() => {
            setCollapse(!collapse);
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
              d="M7.64599 4.646C7.69244 4.59944 7.74761 4.56249 7.80836 4.53729C7.8691 4.51208 7.93422 4.49911 7.99999 4.49911C8.06576 4.49911 8.13088 4.51208 8.19162 4.53729C8.25237 4.56249 8.30754 4.59944 8.35399 4.646L14.354 10.646C14.4479 10.7399 14.5006 10.8672 14.5006 11C14.5006 11.1328 14.4479 11.2601 14.354 11.354C14.2601 11.4479 14.1328 11.5006 14 11.5006C13.8672 11.5006 13.7399 11.4479 13.646 11.354L7.99999 5.707L2.35399 11.354C2.2601 11.4479 2.13277 11.5006 1.99999 11.5006C1.86721 11.5006 1.73988 11.4479 1.64599 11.354C1.5521 11.2601 1.49936 11.1328 1.49936 11C1.49936 10.8672 1.5521 10.7399 1.64599 10.646L7.64599 4.646Z"
              fill="#2563EB"
            />
          </svg>
        </div> */}
      </div>
    </>
  );
}

export default Calendar;
