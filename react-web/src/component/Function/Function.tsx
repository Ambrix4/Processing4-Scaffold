/** @jsxImportSource @emotion/react */
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Component } from 'react';

class Function extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { k: -1, open: false };
  }

  handleListItemClick(index: any) {
    if (index == 0 || index == 1 || index == 2) {
      this.props.prop.test(index);
      this.props.now.set("")
      if(this.state.k == index){this.setState({open:!this.state.open})}
      else{this.setState({k:index,open:true})}
    }else{
      this.props.now.set(index)
    }
  };

  genElements = (value: any, type: boolean) => {
    if (type) {
      return value.map((value: any, index: any) => {
        return this.takeItem(value, index)
      })
    } else {
      return value.map((value: any, index: any) => {
        if (value.title == undefined) { return }
        return this.checkItem(value, index)
      })
    }
  }

  checkItem = (value: any, index: any) => {
    return (
      <ListItemButton sx={{ pl: 4 }} onClick={() => this.handleListItemClick(value.path)}>
        <ListItemIcon><CreateNewFolderIcon /></ListItemIcon>
        <ListItemText primary={value.title} />
      </ListItemButton>
    )
  }


  takeItem(value: any, index: any) {
    if (value.link == '') {
      return (
        <ListItemButton key={index} onClick={() => this.handleListItemClick(index)}>
          <ListItemIcon>{value.icon}</ListItemIcon>
          <ListItemText primary={value.title} />
        </ListItemButton>
      )
    }
    else {
      return (
        <div key={index} >
          <ListItemButton onClick={() => this.handleListItemClick(index)}>
            <ListItemIcon>{value.icon}</ListItemIcon>
            <ListItemText primary={value.title} />
            {this.state.k == index && this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={this.state.k == index && this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {value.key==1?this.genElements(this.props.collection.data, false):this.genElements(this.props.lib.data, false)}
            </List>
          </Collapse>
        </div>
      )
    }
  }

  render() {
    const values = [{ key: 0, title: "功能介绍 Introduction", icon: <SendIcon />, link: '' },
    { key: 1, title: "作品集 Sketches", icon: <DraftsIcon />, link: (this.state.k == 1 && this.state.open == true) ? <ExpandLess /> : <ExpandMore /> },
    { key: 2, title: "模板库 Templates", icon: <InboxIcon />, link: (this.state.k == 2 && this.state.open == true) ? <ExpandLess /> : <ExpandMore /> }]
    return (
      <div style={{height:"70vh"}}>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper',height:"70vh",overflow:"auto" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        
      >
        {this.genElements(values, true)}
      </List></div>
    );
  }
}
export default Function;

