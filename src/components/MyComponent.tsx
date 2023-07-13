import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// 测试 MUI 捕捉不同窗口宽度变化的hook
export default function MyComponent() {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.up("xs"));
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      <div>{`theme.breakpoints.up('xs') matches: ${xs}`}</div>
      <div>{`theme.breakpoints.up('sm') matches: ${sm}`}</div>
      <div>{`theme.breakpoints.up('md') matches: ${md}`}</div>
      <div>{`theme.breakpoints.up('lg') matches: ${lg}`}</div>
      <div>
        column{(xs ? 1 : 0) + (sm ? 1 : 0) + (md ? 1 : 0) + (lg ? 1 : 0) + 1}
      </div>
    </>
  );
}
