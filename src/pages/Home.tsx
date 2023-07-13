import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useTheme } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useQuery } from "react-query";
import { getNotes } from "../services/note";

const tabList = ["推荐", "穿搭", "美食", "彩妆", "影视", "职场"];

const StyleCard = (props: NoteDatatype) => {
  const { id, username, userAvatar, title, content, images, likes, index } =
    props;
  return (
    <Card
      sx={{
        width: {
          xs: 176, // 在移动设备上的宽度
          sm: 196, // 在小屏幕设备上的宽度
          md: 216, // 在中等屏幕设备上的宽度
          lg: 236, // 在大屏幕设备上的宽度
        },
        boxShadow: "none",
      }}
    >
      <CardMedia
        component="img"
        alt={title}
        sx={{
          borderRadius: 1,
        }}
        image={images}
      />
      <CardContent sx={{ padding: ".3rem .8rem" }}>
        <Typography variant="body2">{title}</Typography>
      </CardContent>
      <CardActions sx={{ padding: "0 .8rem .5rem" }}>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems={"center"}
          flexGrow={1}
        >
          <Stack direction="row" spacing={1} flexGrow={1} alignItems={"center"}>
            <Avatar
              alt={username}
              src={userAvatar}
              sx={{
                width: { xs: 20, sm: 24, md: 32, lg: 32 },
                height: { xs: 20, sm: 24, md: 32, lg: 32 },
              }}
            />
            <Typography variant="caption" display="block" color={"black"}>
              {username}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={0.5}
            flexGrow={1}
            alignItems={"center"}
            justifyContent={"flex-end"}
          >
            <IconButton sx={{ padding: 0 }}>
              <FavoriteBorderIcon
                sx={{
                  width: { xs: 14, sm: 16, md: 20, lg: 20 },
                  height: { xs: 14, sm: 16, md: 20, lg: 20 },
                }}
              />
            </IconButton>
            <Typography variant="caption" display="block">
              {index || likes}
            </Typography>
          </Stack>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default function Home() {
  const [selectTab, setSelectTab] = useState([1]);
  const [page, setPage] = useState(0);
  const [dataSource, setDataSource] = useState<Map<number, NoteDatatype[]>>(
    new Map()
  );
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.up("xs"));
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const myColumn =
    (xs ? 1 : 0) + (sm ? 1 : 0) + (md ? 1 : 0) + (lg ? 1 : 0) + 1;

  // 查询
  const { data, isFetching } = useQuery({
    queryKey: ["frp-status", page, myColumn],
    queryFn: () => getNotes(page, myColumn * 5),
    onSuccess(data) {
      const temp = new Map();
      if (page === 0) {
        Array.from({ length: myColumn }).map((_, i) => {
          temp.set(i, data.result.slice(5 * i, 5 * (i + 1)));
        });
        setDataSource(temp);
        return;
      }
      Array.from({ length: myColumn }).map((_, i) => {
        temp.set(i, [
          ...(dataSource.get(i) ?? []),
          ...data.result.slice(5 * i, 5 * (i + 1)),
        ]);
      });
      setDataSource(temp);
    },
  });

  const handleClick = (event: React.SyntheticEvent, index: number): void => {
    setSelectTab(() => {
      const temp = [];
      temp[index] = 1;
      return temp;
    });
  };

  useEffect(() => {
    setPage(0);
  }, [myColumn]);

  useEffect(() => {
    const scrollFetchData = (e) => {
      const scrollBarHeight = Math.abs(
        window.innerHeight - document.body.clientHeight
      );
      if (isFetching) {
        return;
      }
      if (window.scrollY / scrollBarHeight > 0.8) {
        // console.log("scrollBarHeight", window.scrollY, scrollBarHeight);
        setPage(page + 1);
      }
    };
    window.addEventListener("scroll", scrollFetchData);
    return () => {
      window.removeEventListener("scroll", scrollFetchData);
    };
  }, [page, isFetching]);

  return (
    <>
      <div>
        <Box sx={{ flexGrow: 1, pb: 7, pt: 7 }}>
          <Box mt={1.5} mb={1.5}>
            <Stack
              direction="row"
              justifyContent={"space-around"}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              {tabList.map((str, i) => (
                <Chip
                  key={str}
                  label={str}
                  variant={selectTab[i] ? "filled" : "outlined"}
                  sx={{
                    flexGrow: 1,
                    minWidth: 0,
                    maxWidth: 80,
                    border: "none",
                  }}
                  onClick={(_) => handleClick(_, i)}
                />
              ))}
            </Stack>
          </Box>
          <Stack
            spacing={{ xs: 1, sm: 2, md: 4, lg: 6 }}
            direction="row"
            justifyContent={"space-evenly"}
          >
            {[...new Array(myColumn)].map((_, i) => {
              return (
                <Stack direction="column" key={i} spacing={1}>
                  {(dataSource.get(i) ?? []).map((obj: NoteDatatype, index) => (
                    <StyleCard key={obj.id} index={index} {...obj} />
                  ))}
                </Stack>
              );
            })}
          </Stack>
          {isFetching && (
            <Box sx={{ display: "flex" }} justifyContent={"center"} mt={5}>
              <CircularProgress />
            </Box>
          )}
        </Box>
      </div>
    </>
  );
}
