import Pcr from "../pages/Pcr";
import Genshin from "../pages/Genshin";
import StarRail from "../pages/StarRail";

// 懒加载组件 要配合Suspense使用，避免白屏问题
// fast fresh问题 懒加载的组件里不能额外再导出别的东西
// export const Genshin2 = lazy(() => import("../pages/Genshin"));
// const StarRail = lazy(() => import("../pages/StarRail"));

export const menuList: menuItem[] = [
  {
    name: "公主连结",
    path: "/",
    icon: "https://pcredivewiki.tw/static/images/unit/icon_unit_117131.png",
    element: <Pcr />,
  },
  {
    name: "原神",
    path: "/genshin",
    icon: "https://img-static.mihoyo.com/communityweb/upload/14792b4820e324d9e9ef2bbea406f4ae.png",
    element: <Genshin />,
  },
  {
    name: "星穹铁道",
    path: "/starrail",
    icon: "https://starrailstation.com/assets/9dcc998c64c6aedefa5d9507a356bcfa4230077449edba27a6581f4d009c113a.webp",
    element: <StarRail />,
  },
  // {
  //   name: "xxxx",
  //   path: "/xxx",
  //   icon: "https://starrailstation.com/assets/9dcc998c64c6aedefa5d9507a356bcfa4230077449edba27a6581f4d009c113a.webp",
  //   element: <Loading /> || (
  //     <Suspense fallback={<Loading />}>
  //       <Genshin2 />
  //     </Suspense>
  //   ),
  // },
];
