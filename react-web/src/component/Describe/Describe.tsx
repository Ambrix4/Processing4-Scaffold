/** @jsxImportSource @emotion/react */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import { css, keyframes } from "@emotion/react";
import { useTheme } from "@mui/material/styles";
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import MyDialog from "../MyDialog/MyDialog"
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';

function openFolder(arg: any, c: any, type: boolean) {
  if (type) {
    let g = new Promise((resolve, reject) => { resolve((window as any).pywebview.api.selectDir(type)) });
    g.then((res: any) => { console.log(res); arg.set(res[0]); c(res[1]); console.log(c); })
  }
  else {
    let g = new Promise((resolve, reject) => { resolve((window as any).pywebview.api.selectDir(type)) });
    g.then((res: any) => { console.log(res); arg.set(res[0]); c(res[1]); console.log(c); })
  }
}

function openAny(path: any) {
  let g = new Promise((resolve, reject) => { resolve((window as any).pywebview.api.openAny(path)) });
  g.then((res: any) => { return })
}

function changeImg(path: any, update: any) {
  let g = new Promise((resolve, reject) => { resolve((window as any).pywebview.api.changeImg(path)) });
  g.then((res: any) => { update(""); return; })
}

function createCollection(path: string, setmessage: any, setSnack: any,setDialog: Function, dialog: boolean) {
  if (path == "") {
    setSnack(true)
    setmessage("请先选择文件目录位置")
    return
  }
  setDialog(!dialog)
}

function createLib(name:string,path: string, detail: any, now: any, setmessage: any, setSnack: any,libDir:any, lib:any) {
  if (path == "") {
    setSnack(true)
    setmessage("请先选择文件目录位置")
    return
  }
  let da: object = {
    path: path,
    title: detail.title,
    author: (detail.author == "" || detail.author == undefined) ? "Anonymous" : detail.author,
    description: detail.description
  }
  let g = new Promise((resolve, reject) => { resolve((window as any).pywebview.api.createLib(da)) });
  g.then(
    (res: any) => { 
      now.set(res);
      let gg = new Promise((resolve, reject) => { resolve((window as any).pywebview.api.checkDir(libDir.data,false))});
      gg.then((res: any) => { console.log(res); lib(res); return;}) ;
      return; })
}

function getDetail(unshow: any, path: any, setDetail: any, detail: any, photo: any, setPhoto: any, type: boolean) {
  if (type) {
    let g = new Promise((resolve, reject) => { resolve((window as any).pywebview.api.searchDeatial(path)) });
    g.then((res: any) => { setDetail(res); return; })
    return (
      <Card id="0" css={unshow} sx={{width:'55vw', height: '81vh', display: 'flex', flexDirection: 'column', justifyContent: 'top', alignItems: 'flex-start',overflow:"auto",overflowX:'hidden' }}>
        <img onClick={() => { changeImg(path, setPhoto) }} style={{ objectFit: "contain"}} height="40%" width="100%" alt="" src={("file://" + path + "/.config/image.png")}></img>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">{detail.title}</Typography>
          <Divider style={{ marginTop: '2%', marginBottom: "2%" }} variant="middle"></Divider>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">{detail.author}</Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">{detail.time}</Typography>
          <Typography sx={{width:'52vw',wordBreak: 'break-all',whiteSpace: 'pre-line' }} variant="body2" color="text.secondary">{detail.description}</Typography>
          <Button style={{ marginTop: "2%", width: '97%' }} variant="contained"
            onClick={() => { openAny(path) }}>Open</Button>
        </CardContent>
      </Card>
    )
  }
  else {
    let g = new Promise((resolve, reject) => { resolve((window as any).pywebview.api.searchLib(path)) });
    g.then((res: any) => { setDetail(res); return; })
    return (
      <Card id="0" css={unshow} sx={{width:'55vw', height: '81vh', display: 'flex', flexDirection: 'column', justifyContent: 'top', alignItems: 'flex-start',overflow:"auto",overflowX:'hidden' }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">{detail.title}</Typography>
          <Divider style={{ marginTop: '2%', marginBottom: "2%" }} variant="middle"></Divider>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">{detail.author}</Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">{detail.time}</Typography>
          <Typography sx={{width:'52vw',wordBreak: 'break-all',whiteSpace: 'pre-line'}} variant="body2" color="text.secondary">{detail.description}</Typography>
          <Button style={{ marginTop: "2%", width: '97%' }} variant="contained"
            onClick={() => { openAny(path) }}>Open</Button>
        </CardContent>
      </Card>
    )
  }
  
}

function getSnack(snack: any, setSnack: any, message: any) {
  return (
    <Snackbar
      open={snack}
      onClose={() => { setSnack(!snack) }}
      TransitionComponent={Fade}
      message={message}
    />
  )
}

function Describe(this:any,props: any) {
  const EffectRS = keyframes`
  0% {opacity: 0;}
  100% {opacity: 1;}`;
  const theme = useTheme();
  const unshow = css`
    animation: ${EffectRS} 1000ms ${theme.transitions.easing.easeInOut};`;
  const [detail, setDetail] = useState({ title: "", author: props.name.date, description: "" })
  const [dialog, setDialog] = useState(false)
  const [photo, setPhoto] = useState("")
  const [snack, setSnack] = useState(false)
  const [message, setmessage] = useState("")
  console.log(props)
  const [detailshow, setDetailshow] = useState({ title: "", author: "", description: "" })
  if (props.prop == 0) {
    return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'top', alignItems: 'flex-start' }}>
        <CardContent css={unshow}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Select Buttom in Left</Typography>
          <Typography variant="h5" >🎉点击左侧选择按钮选择功能✨<br /></Typography>
          <Typography variant="body2">
            <br />让我们一起管理项目吧<br />
            作品集用来放置您的作品，为他们创作管理卡片！<br />
            模板库用来放置通用模板，例如粒子类。在新建工程的时候可以复制过去。<br />
          </Typography>
          <div >
            <Typography variant="h5" ><br />🪄请确认个人信息，用于创建作品<br /></Typography>
            <TextField style={{ marginTop: "5%" }} id="outlined-basic" label="Artist Name" variant="outlined" value={props.name.data} onChange={(event) => {props.name.set(event.target.value);let k ={title: detail.title, author: event.target.value, description: detail.description}; setDetail(k);console.log(detail)}} />
          </div>
        </CardContent>
      </Card>
    )
  } else if (props.prop == 1 && props.now.data == "") {
    return (
      <div>
        <Card css={unshow} sx={{ height: '81vh', display: 'flex', flexDirection: 'column', justifyContent: 'top', alignItems: 'flex-start' }}>
          <CardContent >
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{props.collectionDir.data == "" ? "Select the folder need open..." : props.collectionDir.data}</Typography>
            <Typography variant="h5" >🐬选择要打开的文件夹...🐬<br /></Typography>
            <Button style={{ marginTop: '5%' }} variant="contained" endIcon={<SendIcon />} onClick={(event) => openFolder(props.collectionDir, props.collection.set, true)}>Select...</Button>
            <Divider style={{ width: '45vw', marginTop: '2%' }} variant="middle">创建工程</Divider>
            <div style={{ display: 'flex' }}>
              <TextField style={{ marginTop: "2%", width: '55%' }} id="outlined-basic" label="项目名 Sketch Name" value={detail.title} onChange={(event) => {setDetail({ author: detail.author, title: event.target.value, description: detail.description })}} />
              <TextField style={{ marginTop: "2%", marginLeft: '2%', width: '40%' }} id="outlined-basic" label="作者 Artist" value={detail.author} onChange={(event) => (setDetail({ author: event.target.value, title: detail.title, description: detail.description }))} />
            </div>
            <TextField style={{ marginTop: "2%", width: '97%' }} id="outlined-multiline-static" label="描述 Description" value={detail.description} onChange={(event) => (setDetail({ author: detail.author, title: detail.title, description: event.target.value }))} multiline rows={4} />
            <Button style={{ marginTop: "2%", width: '97%' }} variant="contained"
              onClick={(event) => createCollection(props.collectionDir.data,setmessage, setSnack,setDialog, dialog)}>Create</Button>
          </CardContent>
        </Card>
        {getSnack(snack, setSnack, message)}
        <MyDialog
          open={{ data: dialog, set: setDialog.bind(this) }}
          detail={detail}
          other={{ path: props.collectionDir, libpath: props.libDir }}
          liball={props.lib}
          collection={props.collection}
          now={props.now}
          name = {props.name.data}
        ></MyDialog>
      </div>
    )
  } else if (props.prop == 2 && props.now.data == "") {
    return (
      <div css={unshow} >
        <Card sx={{ height: '81vh', display: 'flex', flexDirection: 'column', justifyContent: 'top', alignItems: 'flex-start' }}>
          <CardContent >
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{props.libDir.data == "" ? "Select the folder need open..." : props.libDir.data}</Typography>
            <Typography variant="h5" >🧩选择要打开的文件夹...🧩<br /></Typography>
            <Button style={{ marginTop: '5%' }} variant="contained" endIcon={<SendIcon />} onClick={(event) => openFolder(props.libDir, props.lib.set, false)}>Select...</Button>
            <Divider style={{ width: '45vw', marginTop: '2%' }} variant="middle">创建工程</Divider>
            <div style={{ display: 'flex' }}>
              <TextField style={{ marginTop: "2%", width: '55%' }} id="outlined-basic" label="项目名 Sketch Name" value={detail.title} onChange={(event) => (setDetail({ author: detail.author, title: event.target.value, description: detail.description }))} />
              <TextField style={{ marginTop: "2%", marginLeft: '2%', width: '40%' }} id="outlined-basic" label="作者 Artist" value={detail.author} onChange={(event) => (setDetail({ author: event.target.value, title: detail.title, description: detail.description }))} />
            </div>
            <TextField style={{ marginTop: "2%", width: '97%' }} id="outlined-multiline-static" label="描述 Description" value={detail.description} onChange={(event) => (setDetail({ author: detail.author, title: detail.title, description: event.target.value }))} multiline rows={4} />
            <Button style={{ marginTop: "2%", width: '97%' }} variant="contained"
              onClick={(event) => createLib(props.name.data,props.libDir.data, detail, props.now, setmessage, setSnack,props.libDir, props.lib.set)}>Create</Button>
          </CardContent>
        </Card>
        {getSnack(snack, setSnack, message)}
      </div>
    )
  } else if (props.prop == 1) {
    return (
      <div style={{height:"81vh"}}>
        {getDetail(unshow, props.now.data, setDetailshow, detailshow, photo, props.now.set, true)}
      </div>
    );
  } else {
    return (
      <div style={{height:"81vh"}}>
        {getDetail(unshow, props.now.data, setDetailshow, detailshow, photo, props.now.set, false)}
      </div>
    );
  }
}

export default Describe;