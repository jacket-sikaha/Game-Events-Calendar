import { useQuery } from "react-query";
import EventCalendar from "../components/EventCalendar";
import dayjs from "dayjs";
import axios from "axios";
import Loading from "../components/Loading";

const ignored_ann_ids = [
  194, // 有奖问卷调查开启！
  183, // 官方社群一览
  171, // 米游社《崩坏：星穹铁道》专属工具一览
  187, // 《崩坏：星穹铁道》防沉迷系统公告
  185, // 《崩坏：星穹铁道》公平运营声明
];

const IGNORE_WORDS = [
  "内容专题页",
  "版本更新说明",
  "调研",
  "防沉迷",
  "米游社",
  "专项意见",
  "游戏优化及已知问题说明",
  "问卷调查",
  "版本更新通知",
  "更新时间说明",
  "预下载功能",
  "周边限时",
  "周边上新",
  "角色演示",
  "上新",
  "同行任务",
  "无名勋礼",
];

function Pcr() {
  const { data, isFetching } = useQuery({
    queryKey: ["pcr"],
    queryFn: () => axios(import.meta.env.VITE_PCR_API),
    // onSuccess(data) {
    //   const temp = new Map();
    // },
  });
  console.log("data", data);
  return (
    <>
      {/* {isFetching ? (
        <Loading />
      ) : (
        <EventCalendar
          {...{
            value: dayjs(),
            activity: data,
          }}
        />
      )} */}
    </>
  );
}

export default Pcr;
