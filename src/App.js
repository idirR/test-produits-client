import React, { useState, useRef } from 'react';
import './App.css';
import ProductTable from './components/ProductTable';
import ProductAdd from './components/ProductAdd';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));;

function App() {
  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState(false);
  const tableRef = useRef();

  const refresh = () => {
    if (tableRef !== null) {
      console.log(tableRef)
      tableRef.current.refresh();
    }
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>            
            CRUD
          </Typography>
          <Button color="inherit" onClick={e => setModalOpen(true)} >ADD</Button>
        </Toolbar>
      </AppBar>
      <ProductTable ref={tableRef} />
      <ProductAdd open={modalOpen} onClose={() => setModalOpen(false)} refresh={refresh}/>
    </div>
  );
}

export default App;
