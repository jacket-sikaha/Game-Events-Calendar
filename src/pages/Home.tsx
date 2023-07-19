import React from "react";
import Calendar from "../components/Calendar";
import dayjs from "dayjs";

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

function Home() {
  const a = {
    retcode: 0,
    message: "OK",
    data: {
      list: [
        {
          list: [
            {
              ann_id: 254,
              title: "游戏优化及已知问题说明",
              subtitle: "游戏优化及已知问题说明",
              banner:
                "https://sdk-webstatic.mihoyo.com/upload/ann/2023/06/07/8be7463a60a4c25439050f7acfd1918a_5785475491991443322.png",
              content: "",
              type_label: "公告",
              tag_label: "重要",
              tag_icon:
                "https://sdk-webstatic.mihoyo.com/announcement/2023/01/05/605ab5f6643d822ec6cdb158a66c81ad_3387186949421905950.png",
              login_alert: 1,
              lang: "zh-cn",
              start_time: "2023-06-07 00:00:00",
              end_time: "2023-07-19 06:00:00",
              type: 4,
              remind: 0,
              alert: 0,
              tag_start_time: "2000-01-02 15:04:05",
              tag_end_time: "2030-01-02 15:04:05",
              remind_ver: 16,
              has_content: true,
              extra_remind: 0,
            },
            {
              ann_id: 233,
              title: "「花藏繁生」活动：拟造花萼限时双倍掉落",
              subtitle: "「花藏繁生」活动",
              banner:
                "https://sdk-webstatic.mihoyo.com/upload/ann/2023/06/08/0be88c5a7ed8c717d52b007525754826_4047199785208855907.png",
              content: "",
              type_label: "公告",
              tag_label: "重要",
              tag_icon:
                "https://sdk-webstatic.mihoyo.com/announcement/2023/01/05/605ab5f6643d822ec6cdb158a66c81ad_3387186949421905950.png",
              login_alert: 1,
              lang: "zh-cn",
              start_time: "2023-07-09 12:00:00",
              end_time: "2023-07-17 03:59:00",
              type: 4,
              remind: 0,
              alert: 0,
              tag_start_time: "2000-01-02 15:04:05",
              tag_end_time: "2030-01-02 15:04:05",
              remind_ver: 3,
              has_content: true,
              extra_remind: 0,
            },
            {
              ann_id: 230,
              title: "「寻索世间」：限定5星角色「罗刹（丰饶•虚数）」概率UP",
              subtitle: "「寻索世间」活动跃迁",
              banner:
                "https://sdk-webstatic.mihoyo.com/upload/ann/2023/06/08/59db3c9eb8741274e373988fd6fd370a_6450375544711290329.png",
              content: "",
              type_label: "公告",
              tag_label: "重要",
              tag_icon:
                "https://sdk-webstatic.mihoyo.com/announcement/2023/01/05/605ab5f6643d822ec6cdb158a66c81ad_3387186949421905950.png",
              login_alert: 1,
              lang: "zh-cn",
              start_time: "2023-06-27 11:00:00",
              end_time: "2023-07-18 14:59:00",
              type: 4,
              remind: 0,
              alert: 0,
              tag_start_time: "2000-01-02 15:04:05",
              tag_end_time: "2030-01-02 15:04:05",
              remind_ver: 1,
              has_content: true,
              extra_remind: 0,
            },
            {
              ann_id: 231,
              title: "「流光定影」：限定5星光锥「棺的回响（丰饶）」概率UP",
              subtitle: "「流光定影•棺的回响」活动跃迁",
              banner:
                "https://sdk-webstatic.mihoyo.com/upload/ann/2023/06/08/e4e46c4bd23e64d17c6112829db95923_5958533915212797331.png",
              content: "",
              type_label: "公告",
              tag_label: "重要",
              tag_icon:
                "https://sdk-webstatic.mihoyo.com/announcement/2023/01/05/605ab5f6643d822ec6cdb158a66c81ad_3387186949421905950.png",
              login_alert: 1,
              lang: "zh-cn",
              start_time: "2023-06-27 11:00:00",
              end_time: "2023-07-18 14:59:00",
              type: 4,
              remind: 0,
              alert: 0,
              tag_start_time: "2000-01-02 15:04:05",
              tag_end_time: "2030-01-02 15:04:05",
              remind_ver: 1,
              has_content: true,
              extra_remind: 0,
            },
            {
              ann_id: 228,
              title: "1.1版本「银河漫游」版本更新概览",
              subtitle: "1.1版本「银河漫游」版本更新概览",
              banner:
                "https://sdk-webstatic.mihoyo.com/upload/ann/2023/05/31/422f8df952ebfeaedddbbcf1ab6579a9_4100661946353389111.png",
              content: "",
              type_label: "公告",
              tag_label: "修复/更新",
              tag_icon:
                "https://sdk-webstatic.mihoyo.com/announcement/2021/08/23/5d29eb745ebcd5c1f54dc26408b7ca20_3664264394057326109.png",
              login_alert: 1,
              lang: "zh-cn",
              start_time: "2023-06-07 07:00:00",
              end_time: "2023-07-11 23:59:00",
              type: 4,
              remind: 0,
              alert: 0,
              tag_start_time: "2000-01-02 15:04:05",
              tag_end_time: "2030-01-02 15:04:05",
              remind_ver: 1,
              has_content: true,
              extra_remind: 0,
            },
            {
              ann_id: 222,
              title: "1.1版本全新「同行任务」说明",
              subtitle: "1.1版本全新「同行任务」说明",
              banner:
                "https://sdk-webstatic.mihoyo.com/upload/ann/2023/05/25/b912013ca8e8fce4e5e2329d14c8fd37_5109768355894294523.png",
              content: "",
              type_label: "公告",
              tag_label: "重要",
              tag_icon:
                "https://sdk-webstatic.mihoyo.com/announcement/2023/01/05/605ab5f6643d822ec6cdb158a66c81ad_3387186949421905950.png",
              login_alert: 1,
              lang: "zh-cn",
              start_time: "2023-06-06 14:00:00",
              end_time: "2033-06-06 00:00:00",
              type: 4,
              remind: 0,
              alert: 0,
              tag_start_time: "2000-01-02 15:04:05",
              tag_end_time: "2030-01-02 15:04:05",
              remind_ver: 1,
              has_content: true,
              extra_remind: 0,
            },
            {
              ann_id: 219,
              title: "1.1版本「无名勋礼」活动说明",
              subtitle: "1.1版本「无名勋礼」说明",
              banner:
                "https://sdk-webstatic.mihoyo.com/upload/ann/2023/06/07/aa4818f0a5a95ea7ea8f1ffc0f33763c_3862011931400659572.png",
              content: "",
              type_label: "公告",
              tag_label: "重要",
              tag_icon:
                "https://sdk-webstatic.mihoyo.com/announcement/2023/01/05/605ab5f6643d822ec6cdb158a66c81ad_3387186949421905950.png",
              login_alert: 1,
              lang: "zh-cn",
              start_time: "2023-06-06 15:00:00",
              end_time: "2023-07-17 03:59:00",
              type: 4,
              remind: 0,
              alert: 0,
              tag_start_time: "2000-01-02 15:04:05",
              tag_end_time: "2030-01-02 15:04:05",
              remind_ver: 1,
              has_content: true,
              extra_remind: 0,
            },
            {
              ann_id: 220,
              title: "1.1版本「黑塔 • 协议」上新",
              subtitle: "1.1版本「黑塔 • 协议」上新",
              banner:
                "https://sdk-webstatic.mihoyo.com/upload/ann/2023/06/07/f16ca152b8c399da45c97bc96f76177c_5536159459435535486.png",
              content: "",
              type_label: "公告",
              tag_label: "重要",
              tag_icon:
                "https://sdk-webstatic.mihoyo.com/announcement/2023/01/05/605ab5f6643d822ec6cdb158a66c81ad_3387186949421905950.png",
              login_alert: 1,
              lang: "zh-cn",
              start_time: "2023-06-06 16:00:00",
              end_time: "2023-07-18 15:00:00",
              type: 4,
              remind: 0,
              alert: 0,
              tag_start_time: "2000-01-02 15:04:05",
              tag_end_time: "2030-01-02 15:04:05",
              remind_ver: 1,
              has_content: true,
              extra_remind: 0,
            },
            {
              ann_id: 194,
              title: "有奖问卷",
              subtitle: "有奖问卷",
              banner:
                "https://sdk-webstatic.mihoyo.com/upload/ann/2023/06/07/64473d75556f55f458aee75380c684ec_4263168057080397241.png",
              content: "",
              type_label: "公告",
              tag_label: "重要",
              tag_icon:
                "https://sdk-webstatic.mihoyo.com/announcement/2023/01/05/605ab5f6643d822ec6cdb158a66c81ad_3387186949421905950.png",
              login_alert: 1,
              lang: "zh-cn",
              start_time: "2023-04-26 07:00:00",
              end_time: "2024-06-07 00:00:00",
              type: 4,
              remind: 0,
              alert: 0,
              tag_start_time: "2000-01-02 15:04:05",
              tag_end_time: "2030-01-02 15:04:05",
              remind_ver: 1,
              has_content: true,
              extra_remind: 0,
            },
            {
              ann_id: 183,
              title: "官方社群一览",
              subtitle: "官方社群一览",
              banner:
                "https://sdk-webstatic.mihoyo.com/upload/ann/2023/03/24/0a5006eb7cee02dc4bb5e0cf5c7953ea_4579580789715590479.png",
              content: "",
              type_label: "公告",
              tag_label: "重要",
              tag_icon:
                "https://sdk-webstatic.mihoyo.com/announcement/2023/01/05/605ab5f6643d822ec6cdb158a66c81ad_3387186949421905950.png",
              login_alert: 1,
              lang: "zh-cn",
              start_time: "2023-04-18 00:00:00",
              end_time: "2024-06-07 06:00:00",
              type: 4,
              remind: 0,
              alert: 0,
              tag_start_time: "2000-01-02 15:04:05",
              tag_end_time: "2030-01-02 15:04:05",
              remind_ver: 1,
              has_content: true,
              extra_remind: 0,
            },
            {
              ann_id: 187,
              title: "《崩坏：星穹铁道》防沉迷系统公告",
              subtitle: "《崩坏：星穹铁道》防沉迷系统公告",
              banner:
                "https://sdk-webstatic.mihoyo.com/upload/ann/2023/04/04/9864f8b5ea101f518d98c68f06896485_7478825536127926320.png",
              content: "",
              type_label: "公告",
              tag_label: "重要",
              tag_icon:
                "https://sdk-webstatic.mihoyo.com/announcement/2023/01/05/605ab5f6643d822ec6cdb158a66c81ad_3387186949421905950.png",
              login_alert: 1,
              lang: "zh-cn",
              start_time: "2023-04-04 00:00:00",
              end_time: "2035-06-07 06:00:00",
              type: 4,
              remind: 0,
              alert: 0,
              tag_start_time: "2000-01-02 15:04:05",
              tag_end_time: "2030-01-02 15:04:05",
              remind_ver: 1,
              has_content: true,
              extra_remind: 0,
            },
            {
              ann_id: 185,
              title: "《崩坏：星穹铁道》公平运营声明",
              subtitle: "《崩坏：星穹铁道》公平运营声明",
              banner:
                "https://sdk-webstatic.mihoyo.com/upload/ann/2023/04/04/3227c15798a9471b2dad5b5d90fea8b2_6434113300297190953.png",
              content: "",
              type_label: "公告",
              tag_label: "重要",
              tag_icon:
                "https://sdk-webstatic.mihoyo.com/announcement/2023/01/05/605ab5f6643d822ec6cdb158a66c81ad_3387186949421905950.png",
              login_alert: 1,
              lang: "zh-cn",
              start_time: "2023-04-04 00:00:00",
              end_time: "2035-06-07 06:00:00",
              type: 4,
              remind: 0,
              alert: 0,
              tag_start_time: "2000-01-02 15:04:05",
              tag_end_time: "2030-01-02 15:04:05",
              remind_ver: 1,
              has_content: true,
              extra_remind: 0,
            },
          ],
          type_id: 4,
          type_label: "公告",
        },
      ],
      total: 12,
      type_list: [
        {
          id: 4,
          name: "公告",
          mi18n_name: "公告",
        },
      ],
      alert: false,
      alert_id: 0,
      timezone: 8,
      t: "1689344143125",
      pic_list: [
        {
          type_list: [
            {
              list: [
                {
                  ann_id: 233,
                  title: "《崩坏：星穹铁道》刃角色PV：「死兆将至」",
                  subtitle: "",
                  banner:
                    "https://sdk-webstatic.mihoyo.com/upload/ann/2023/07/11/85f043fff8479278acd4c62027ea35ca_6084106639258308195.png",
                  content: "",
                  type_label: "资讯",
                  tag_label: "",
                  tag_icon: "",
                  login_alert: 1,
                  lang: "zh-cn",
                  start_time: "2023-07-14 12:00:00",
                  end_time: "2023-07-17 00:00:00",
                  type: 3,
                  remind: 1,
                  alert: 0,
                  tag_start_time: "2000-01-02 15:04:05",
                  tag_end_time: "2030-01-02 15:04:05",
                  remind_ver: 1,
                  has_content: true,
                  pic_type: 2,
                  content_type: 0,
                  img: "https://sdk-webstatic.mihoyo.com/upload/ann/2023/07/11/41b1b5ce3dceaa13bf267a44cbb95d2e_6345056980632101542.png",
                  href_type: 2,
                  href: "",
                  pic_list: [],
                  extra_remind: 0,
                },
                {
                  ann_id: 231,
                  title: "1.2版本「仙骸有终」专题展示页",
                  subtitle: "",
                  banner:
                    "https://sdk-webstatic.mihoyo.com/upload/ann/2023/07/07/e4f794e3fe3181833097a33166c9a8e2_1039720606203373117.jpg",
                  content: "",
                  type_label: "资讯",
                  tag_label: "",
                  tag_icon: "",
                  login_alert: 1,
                  lang: "zh-cn",
                  start_time: "2023-07-08 21:00:00",
                  end_time: "2023-07-18 06:00:00",
                  type: 3,
                  remind: 0,
                  alert: 0,
                  tag_start_time: "2000-01-02 15:04:05",
                  tag_end_time: "2030-01-02 15:04:05",
                  remind_ver: 1,
                  has_content: true,
                  pic_type: 2,
                  content_type: 0,
                  img: "https://sdk-webstatic.mihoyo.com/upload/ann/2023/07/07/e07a965e377c836cee6791ef0440d8f2_757575904538745812.jpg",
                  href_type: 2,
                  href: "",
                  pic_list: [],
                  extra_remind: 0,
                },
                {
                  ann_id: 186,
                  title: "「冬城博物珍奇簿」活动：经营博物馆获取自塑尘脂等奖励",
                  subtitle: "",
                  banner: "",
                  content: "",
                  type_label: "资讯",
                  tag_label: "",
                  tag_icon: "",
                  login_alert: 1,
                  lang: "zh-cn",
                  start_time: "2023-06-08 00:00:00",
                  end_time: "2023-08-07 03:59:00",
                  type: 3,
                  remind: 0,
                  alert: 0,
                  tag_start_time: "2000-01-02 15:04:05",
                  tag_end_time: "2030-01-02 15:04:05",
                  remind_ver: 1,
                  has_content: true,
                  pic_type: 2,
                  content_type: 0,
                  img: "https://sdk-webstatic.mihoyo.com/upload/ann/2023/06/17/0531599445cb1dcdf6310d10f534f7fb_2631681347535099712.png",
                  href_type: 2,
                  href: "",
                  pic_list: [],
                  extra_remind: 0,
                },
                {
                  ann_id: 171,
                  title: "《崩坏：星穹铁道》社区专属工具一览",
                  subtitle: "",
                  banner:
                    "https://sdk-webstatic.mihoyo.com/upload/ann/2023/05/09/de5fee16fe6b192e6acd78052ee25409_5079128810981442437.jpg",
                  content: "",
                  type_label: "资讯",
                  tag_label: "",
                  tag_icon: "",
                  login_alert: 1,
                  lang: "zh-cn",
                  start_time: "2023-07-04 00:00:00",
                  end_time: "2023-08-01 00:00:00",
                  type: 3,
                  remind: 0,
                  alert: 0,
                  tag_start_time: "2000-01-02 15:04:05",
                  tag_end_time: "2030-01-02 15:04:05",
                  remind_ver: 4,
                  has_content: true,
                  pic_type: 2,
                  content_type: 0,
                  img: "https://sdk-webstatic.mihoyo.com/upload/ann/2023/06/17/ef791686d737bf4b56fcd721768a83b9_4567572469754947074.jpg",
                  href_type: 2,
                  href: "",
                  pic_list: [],
                  extra_remind: 0,
                },
              ],
              pic_type: 2,
            },
            {
              list: [
                {
                  ann_id: 204,
                  title: "",
                  subtitle: "",
                  banner: "",
                  content: "",
                  type_label: "资讯",
                  tag_label: "",
                  tag_icon: "",
                  login_alert: 1,
                  lang: "zh-cn",
                  start_time: "2023-06-27 00:00:00",
                  end_time: "2023-07-19 06:00:00",
                  type: 3,
                  remind: 0,
                  alert: 0,
                  tag_start_time: "2000-01-02 15:04:05",
                  tag_end_time: "2030-01-02 15:04:05",
                  remind_ver: 1,
                  has_content: true,
                  pic_type: 1,
                  content_type: 0,
                  img: "https://sdk-webstatic.mihoyo.com/upload/ann/2023/06/08/7bb8754849cd606fac7ee076cba13fec_7583931266952027471.png",
                  href_type: 1,
                  href: "",
                  pic_list: [],
                  extra_remind: 0,
                },
              ],
              pic_type: 1,
            },
          ],
          type_id: 3,
          type_label: "资讯",
        },
      ],
      pic_total: 5,
      pic_type_list: [
        {
          id: 3,
          name: "资讯",
          mi18n_name: "资讯",
        },
      ],
      pic_alert: false,
      pic_alert_id: 0,
      static_sign: "",
    },
  };
  const b = [
    {
      id: 593,
      type: 1,
      title: "「普通关卡」掉落3倍",
      start_time: "2023-07-08T21:00:00+00:00",
      end_time: "2023-07-16T20:59:00+00:00",
    },
    {
      id: 595,
      type: 1,
      title: "「圣迹调查&神殿调查」掉落2倍",
      start_time: "2023-07-12T21:00:00+00:00",
      end_time: "2023-07-15T20:59:00+00:00",
    },
    {
      id: 596,
      type: 1,
      title: "「探索」掉落2倍",
      start_time: "2023-07-12T21:00:00+00:00",
      end_time: "2023-07-15T20:59:00+00:00",
    },
    {
      id: 594,
      type: 1,
      title: "「地下城」玛那2倍",
      start_time: "2023-07-12T21:00:00+00:00",
      end_time: "2023-07-24T20:59:00+00:00",
    },
    {
      id: 598,
      type: 5,
      title: "附奖扭蛋",
      start_time: "2023-07-15T03:00:00+00:00",
      end_time: "2023-07-19T02:59:00+00:00",
    },
    {
      id: 597,
      type: 5,
      title: "「静流（夏日）」 PICK UP扭蛋",
      start_time: "2023-07-15T06:00:00+00:00",
      end_time: "2023-07-24T02:59:00+00:00",
    },
    {
      id: 599,
      type: 4,
      title: "「露娜塔」",
      start_time: "2023-07-16T04:00:00+00:00",
      end_time: "2023-07-21T15:59:00+00:00",
    },
    {
      id: 600,
      type: 1,
      title: "「高难关卡」掉落2倍",
      start_time: "2023-07-16T21:00:00+00:00",
      end_time: "2023-07-20T20:59:00+00:00",
    },
    {
      id: 601,
      type: 2,
      title: "七夕剑客旅情谭",
      start_time: "2023-07-18T04:00:00+00:00",
      end_time: "2023-07-25T15:59:00+00:00",
    },
    {
      id: 602,
      type: 1,
      title: "「圣迹调查」掉落2倍",
      start_time: "2023-07-18T21:00:00+00:00",
      end_time: "2023-07-21T20:59:00+00:00",
    },
    {
      id: 603,
      type: 5,
      title: "附奖扭蛋",
      start_time: "2023-07-19T03:00:00+00:00",
      end_time: "2023-07-24T02:59:00+00:00",
    },
    {
      id: 604,
      type: 1,
      title: "「困难关卡」掉落2倍",
      start_time: "2023-07-20T21:00:00+00:00",
      end_time: "2023-07-24T20:59:00+00:00",
    },
    {
      id: 605,
      type: 5,
      title: "附奖扭蛋",
      start_time: "2023-07-24T03:00:00+00:00",
      end_time: "2023-07-31T02:59:00+00:00",
    },
    {
      id: 606,
      type: 1,
      title: "「普通关卡」掉落3倍",
      start_time: "2023-07-24T21:00:00+00:00",
      end_time: "2023-07-30T20:59:00+00:00",
    },
    {
      id: 607,
      type: 1,
      title: "「圣迹调查&神殿调查」掉落2倍",
      start_time: "2023-07-24T21:00:00+00:00",
      end_time: "2023-07-30T20:59:00+00:00",
    },
    {
      id: 608,
      type: 1,
      title: "「探索」掉落2倍",
      start_time: "2023-07-24T21:00:00+00:00",
      end_time: "2023-08-04T20:59:00+00:00",
    },
    {
      id: 609,
      type: 3,
      title: "「团队战」",
      start_time: "2023-07-25T21:00:00+00:00",
      end_time: "2023-07-30T15:59:00+00:00",
    },
  ];
  const obj = {
    value: dayjs(),
    activity:
      b ||
      a.data.list[0]?.list
        ?.filter((item) => {
          return (
            !ignored_ann_ids.includes(item.ann_id) &&
            IGNORE_WORDS.every((word) => item.title.indexOf(word) === -1)
          );
        })
        .map((item) => {
          return {
            id: item.ann_id,
            title: item.title,
            start_time: item.start_time,
            end_time: item.end_time,
            banner: item.banner,
            content: item.content,
            // aaa: dayjs(item.end_time).diff(dayjs(item.start_time), "day"),
          };
        }),
  };
  // 检验日历组件
  return (
    <>
      <Calendar {...obj} style={{ height: "90vh" }}></Calendar>
    </>
  );
}

export default Home;
