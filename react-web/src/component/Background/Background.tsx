/** @jsxImportSource @emotion/react */
import Paper from '@mui/material/Paper';
import { useTheme } from "@mui/material/styles";
import { css, keyframes } from "@emotion/react";
import '../Background/Background.css';
import Function from '../../component/Function/Function'
import Describe from '../Describe/Describe';
import { useState } from 'react';

function Background(this: any) {
  const myEffect = keyframes`
    0% {opacity: 0;transform: translateY(200%);}
    100% {opacity: 1;transform: translateY(0);}`;
  const EffectLS = keyframes`
    0% {opacity: 0;transform: translateX(-200%);}
    100% {opacity: 1;transform: translateX(0);}`;
  const EffectRS = keyframes`
    0% {opacity: 0;transform: translateX(200%);}
    100% {opacity: 1;transform: translateX(0);}`;
  const theme = useTheme();
  const animatedItem = css`
      animation: ${myEffect} 2000ms ${theme.transitions.easing.easeInOut};`;
  const animatedLS = css`
      animation: ${EffectLS} 2000ms ${theme.transitions.easing.easeInOut};`;
  const animatedRS = css`
      animation: ${EffectRS} 2000ms ${theme.transitions.easing.easeInOut};`;
  const [data,setdata] = useState(0)
  const [name,setname] = useState("")
  const [collectionDir,setCollectionDir] = useState("")
  const [collection,setCollection] = useState([{}])
  const [libDir,setLibDir] = useState("")
  const [lib,setLib] = useState([{}])
  const [now,setNow] = useState("")
  return (
    <div className="App-header" css={animatedItem}>
      <Paper style={{ width: '38%', height: '90%' }} elevation={3} css={animatedLS}>
        <Function 
          prop={{data:data,test:setdata.bind(this)}}
          collection={{data:collection,set:setCollection.bind(this)}}
          lib = {{data:lib,set:setLib.bind(this)}}
          now = {{data:now,set:setNow.bind(this)}}
        ></Function>
      </Paper>
      <Paper style={{ width: '55%', height: '90%', marginLeft: '2%' }} elevation={3} css={animatedRS}>
        <Describe 
          prop={data} 
          collectionDir={{data:collectionDir,set:setCollectionDir.bind(this)}} 
          collection={{data:collection,set:setCollection.bind(this)}}
          libDir={{data:libDir,set:setLibDir.bind(this)}} 
          lib = {{data:lib,set:setLib.bind(this)}}
          name={{data:name,set:setname.bind(this)}}
          now = {{data:now,set:setNow.bind(this)}}
        ></Describe>
      </Paper>
    </div>
  );
}

export default Background;
