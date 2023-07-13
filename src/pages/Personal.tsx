import { ExpandMore } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import MaleOutlinedIcon from "@mui/icons-material/MaleOutlined";
import FemaleOutlinedIcon from "@mui/icons-material/FemaleOutlined";
import { red } from "@mui/material/colors";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  flexGrow: 1,
  justifyContent: "center",
}));
function Personal() {
  const tabList = ["笔记", "收藏", "点赞"];
  const [selectTab, setSelectTab] = useState([1]);
  const [userMsg, setUserMsg] = useState<UserMsgDatatype>({
    id: 1,
    username: "EN-64979456",
    nickname: "想养修勾的托尼",
    avatar:
      "https://market-1312547758.cos.ap-beijing.myqcloud.com/avatar/2022/09/28/07B443B492E19CCB8430A26D391E5E3E.png",
    introduction: "debug the world",
    sex: "男",
    ip: "天津",
    follows: 0,
    fans: 0,
    likes: 1000,
  });
  const handleClick = (event: React.SyntheticEvent, index: number): void => {
    setSelectTab(() => {
      const temp = [];
      temp[index] = 1;
      return temp;
    });
  };
  return (
    <Box sx={{ flexGrow: 1, mb: 8, mt: 12 }}>
      <Stack spacing={{ xs: 1, sm: 2, md: 2.5 }} direction="column">
        <Card
          sx={{
            width: {
              xs: 350,
              sm: 400,
              md: 500,
              lg: 600,
            },
            boxShadow: "none",
          }}
        >
          <CardHeader
            sx={{ p: 0 }}
            avatar={
              <Avatar
                sx={{
                  width: 66,
                  height: 66,
                }}
                src={userMsg.avatar}
              />
            }
            title={<Typography variant="h6">{userMsg.username}</Typography>}
            subheader={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="caption" fontSize={".8rem"} color={"grey"}>
                  {`小红书号：${userMsg.id}`}
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ m: 0.5 }} />
                <Typography variant="caption" fontSize={".8rem"} color={"grey"}>
                  {`IP属地：${userMsg.ip}`}
                </Typography>
              </Box>
            }
          />
        </Card>
        <Typography variant="subtitle2">{userMsg.introduction}</Typography>
        {userMsg.sex === "男" ? (
          <MaleOutlinedIcon color="primary" />
        ) : (
          <FemaleOutlinedIcon color="error" />
        )}
        <Box width={{ xs: 190 }}>
          <Grid container justifyContent={"flex-start"}>
            <Grid item xs={4} textAlign={"center"}>
              {userMsg.follows}
            </Grid>
            <Grid item xs={4} textAlign={"center"}>
              {userMsg.fans}
            </Grid>
            <Grid item xs textAlign={"center"}>
              {userMsg.likes}
            </Grid>
            <Grid item xs={4} textAlign={"center"}>
              <Typography variant="caption" color={"grey"}>
                关注
              </Typography>
            </Grid>
            <Grid item xs={4} textAlign={"center"}>
              <Typography variant="caption" color={"grey"}>
                粉丝
              </Typography>
            </Grid>
            <Grid item xs textAlign={"center"}>
              <Typography variant="caption" color={"grey"}>
                获赞与收藏
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid container rowSpacing={1}>
          <Grid item xs={12}>
            <Stack
              direction={"row"}
              justifyContent={"center"}
              sx={{ width: "50%", margin: "auto" }}
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
          </Grid>
          <Grid item xs={12}>
            <Divider variant="middle" />
          </Grid>
          <Grid item xs={12}>
            <Item>2</Item>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

export default Personal;
