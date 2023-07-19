import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { useEffect, useState } from "react";
import "./index.css";
import type { CalendarProps, CalendarWeekItem } from "./CalendarType";
import { calculateEventPosition, generateCalendarGrid } from "./utils";
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);

function Calendar({ value, activity, style }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(value);
  const [eventGridPosition, setEventGridPosition] = useState<
    CalendarWeekItem[][]
  >([]);
  const handleMonChange = (type: boolean) => {
    setCurrentDate(
      type ? currentDate.add(1, "month") : currentDate.subtract(1, "month")
    );
  };

  useEffect(() => {
    setEventGridPosition(calculateEventPosition(currentDate, activity));
  }, [currentDate]);

  return (
    <>
      <div
        className="p-5 flex flex-col h-full min-h-[26rem]"
        style={{ ...style }}
      >
        <nav className="flex justify-between items-center">
          <div
            className="cursor-pointer"
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
            className="cursor-pointer"
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
        <div className="flex-1 grid grid-cols-1 text-xs h-full border-x border-b">
          {generateCalendarGrid(currentDate).map((_, i) => {
            return (
              <div className="relative w-full overflow-y-auto" key={i}>
                {/* 日历区 */}
                <div className="flex h-full">
                  {_.map((__, j) => {
                    return (
                      <div
                        key={j}
                        className="w-full h-full flex justify-center items-start even:border-x border-t"
                      >
                        {value.isSame(__, "day") ? (
                          <span className="w-full text-center bg-red-100">
                            {dayjs(__).format("D")}
                          </span>
                        ) : (
                          dayjs(__).format("D")
                        )}
                      </div>
                    );
                  })}
                </div>
                {/* 日程区 */}
                <div className="w-full">
                  {eventGridPosition[i]?.map((obj) => {
                    const { id, title, left, width, level, color } = obj;
                    return (
                      <div
                        key={id}
                        className={
                          "absolute rounded-lg pl-2 overflow-hidden text-ellipsis whitespace-nowrap"
                        }
                        style={{
                          backgroundColor: color,
                          width: `calc((${width}00%/7))`,
                          left:
                            left !== 0 && left !== 7
                              ? `calc(${left}00%/7)`
                              : "",
                          // top: `${20 * level + "%"}`, // 百分比受限于最上层元素的高度变化
                          top: `${1.35 * level}em`, // em只受限于离其最近的父元素（简单嵌套情况）
                        }}
                      >
                        {title}
                      </div>
                    );
                  })}
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
