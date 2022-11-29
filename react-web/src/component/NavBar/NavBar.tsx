/** @jsxImportSource @emotion/react */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { css, keyframes } from "@emotion/react";
import { useTheme } from "@mui/material/styles";
import logo from "../../media/P4S.svg";

function NavBar() {
    const myEffect = keyframes`
  0% {
      opacity: 0;
      transform: translateY(-200%);
      }
  100% {
      opacity: 1;
      transform: translateY(0);
      }`;
    const myEffectExit = keyframes`
  0% {
      opacity: 1;
      transform: translateY(0);
      }
  100% {
      opacity: 0;
      transform: translateY(-200%);
      }`;
    const theme = useTheme();
    const animatedItem = css`
      animation: ${myEffect} 1000ms ${theme.transitions.easing.easeInOut};`;
    const animatedItemExiting = css`
      animation: ${myEffectExit} 1000ms ${theme.transitions.easing.easeInOut};
      opacity: 0;
      transform: translateY(-200%);`;
    const [exit, setExit] = React.useState(false);
    return (
        <div>
            <AppBar position="fixed" css={exit ? animatedItemExiting : animatedItem} sx={{ height: '12vh', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justify: 'space-between' }}>
                <Box sx={{ fontSize: 30, fontWeight: 900 }}>🔩Processing4 Scaffold 脚手架</Box>
                <Box sx={{ fontSize: 10, fontWeight: 600 ,color:'#aaaaaa'}}>
                  作者: AmberLarix &nbsp;&nbsp;
                  <a style={{color:'#aaaaaa',textDecoration:'none'}} href="https://space.bilibili.com/4662914?spm_id_from=333.1007.0.0">Bilibili</a>
                  &nbsp;&nbsp;
                  <a style={{color:'#aaaaaa',textDecoration:'none'}} href="https://github.com/Ambrix4/Processing4-Scaffold">Github</a>
                </Box>
            </AppBar>
        </div>
    );
}
export default NavBar;

