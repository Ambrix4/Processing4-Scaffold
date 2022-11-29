import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';

const Transition = React.forwardRef(
  function Transition(props: TransitionProps & { children: React.ReactElement<any, any>; }, ref: React.Ref<unknown>) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function changeDir(arg: any, c: any) {
  let g = new Promise((resolve, reject) => { resolve((window as any).pywebview.api.selectDir(false)) });
  g.then((res: any) => { console.log(res); arg(res[0]); c(res[1]); })
}

function showList(arg: any, file: any) {
  return (
    arg.data.map((value: any, index: any) => {
      if (value.title == undefined) { return }
      return (
        <FormControlLabel control={<Checkbox />}
          label={value.title} data-file={value.path}
          onChange={(event) => selectfile(event, file)}
        />
      )
    })
  )
}
function selectfile(event: any, file: Array<string>) {
  if (event.target.checked) {
    file.push(event.nativeEvent.path[2].dataset.file)
  } else {
    file.splice(file.indexOf(event.nativeEvent.path[2].dataset.file), 1);
  }
}

function submit(props: any, file: any, setmessage:any, setSnack:any) {
  props.open.set(!props.open.data)
  let d = props.detail;
  console.log(d)
  d['path'] = props.other.path.data;
  d['libpath'] = props.other.libpath.data;
  d['lib'] = file;
  d['author'] = (d['author']=="" || d['author'] == undefined)?"Anonymous":d['author']
  let g = new Promise((resolve, reject) => { resolve((window as any).pywebview.api.createCollection(d)) });
  g.then(
    (res: any) => {
      console.log(res)
      props.now.set(res);
      let gg = new Promise((resolve, reject) => { resolve((window as any).pywebview.api.checkDir(props.other.path.data,true))});
      gg.then((res: any) => { console.log(props); props.collection.set(res); return;}) ;
    })
}

function getSnack(snack:any,setSnack:any,message: any) {
  return (
    <Snackbar
      open={snack}
      onClose={() => { setSnack(!snack) }}
      TransitionComponent={Fade}
      message={message}
    />
  )
}

function MyDialog(props: any) {
  let file: any = []
  const [snack, setSnack] = useState(false)
  const [message,setmessage] = useState("")
  return (
    <div>
      <Dialog open={props.open.data} TransitionComponent={Transition} keepMounted onClose={() => props.open.set(!props.open.data)} aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"添加自定义库 Add pdelib"}</DialogTitle>
        <Button onClick={() => changeDir(props.other.libpath.set, props.liball.set)}>当前目录:{props.other.libpath.data}</Button>
        <DialogContent>
          <FormGroup>
            {showList(props.liball, file)}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.open.set(!props.open.data)}>取消</Button>
          <Button onClick={(event) => submit(props, file,setmessage,setSnack)}>确认</Button>
        </DialogActions>
      </Dialog>
      {getSnack(snack,setSnack,message)}
    </div>
  )
}

export default MyDialog;

