import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import EventCalendar from "../components/EventCalendar";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CalendarActivity } from "../components/EventCalendar/CalendarType";
import Loading from "../components/Loading";
import { BACKEND_URL } from "../services/note";
dayjs.extend(customParseFormat);

function WutheringWaves() {
  const [eventData, setEventData] = useState<CalendarActivity[]>();
  const { isFetching } = useQuery({
    queryKey: ["wuthering-waves"],
    queryFn: () => axios(`${BACKEND_URL}/mc`),
    onSuccess(data: any) {
      setEventData(
        data?.data?.data?.filter((item: CalendarActivity) => {
          return Boolean(item.start_time);
        })
      );
    },
  });
  // 检验日历组件
  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <EventCalendar
          {...{
            value: dayjs(),
            activity: eventData ?? [],
          }}
        />
      )}
    </>
  );
}

export default WutheringWaves;
