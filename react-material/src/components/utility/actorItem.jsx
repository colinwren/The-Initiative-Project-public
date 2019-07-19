//high level goals: refactor this where sub-components are defined elsewhere, and this layer allows generic "actorRow" to be abstracted and customized with params
import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Zoom from '@material-ui/core/Zoom';
import Fade from '@material-ui/core/Fade';
import RemoveIcon from '@material-ui/icons/Remove';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { maxWidth } from '@material-ui/system';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import SvgIcon from '@material-ui/core/SvgIcon';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Collapse from '@material-ui/core/Collapse';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: 'relative'
  },
  fab: {
    margin: '5px'
  },
  paper: {
    // padding: theme.spacing(2),
    verticalAlign: 'middle',
    margin: '50px auto',
    position: 'relative',
    minHeight: '76px',
    width: '40%'

    // color: theme.palette.text.secondary
  },
  nameField: { marginLeft: '5px' },
  modField: { marginLeft: '5px' },
  chaField: { marginRight: '5px' }
}));

const saves = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

const ActorCreator = props => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const [values, setValues] = useState({
    editing: false,
    expanded: false,
    name: '',
    initMod: '',
    armorClass: '',
    maxHP: 30,
    strSave: '',
    dexSave: '',
    conSave: '',
    intSave: '',
    wisSave: '',
    chaSave: '',
    creator: true
  });
  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();
    props.cb(values, () =>
      setValues({
        editing: false,
        expanded: false,
        name: '',
        initMod: '',
        armorClass: '',
        maxHP: '',
        strSave: '',
        dexSave: '',
        conSave: '',
        intSave: '',
        wisSave: '',
        chaSave: ''
      })
    );
  };

  const editToggle = e => {
    setValues({ ...values, editing: !values.editing });
  };

  const expandToggle = e => {
    setValues({ ...values, expanded: !values.expanded, editing: false });
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const refTest = React.useRef(null);

  React.useEffect(() => {
    if (!refTest.current || !refTest.current.offsetWidth) return;
    console.log('do something with', refTest.current.offsetWidth);
  }, [refTest.current]);

  return (
    <span className={classes.root}>
      <Paper className={classes.paper} ref={refTest}>
        <Grid container>
          <Grid container item xs={12} spacing={1}>
            <Grid item xs={6}>
              <TextField
                id={`name-${props.flavor}`}
                className={classes.nameField}
                label="Name"
                value={values.name}
                onChange={handleChange('name')}
                margin="dense"
              />
            </Grid>
            <Grid item xs>
              <TextField
                id={`armorClass-${props.flavor}`}
                label="AC"
                value={values.armorClass}
                onChange={handleChange('armorClass')}
                margin="dense"
                type="number"
              />
            </Grid>
            <Grid item xs>
              <TextField
                id={`maxHP-${props.flavor}`}
                label="Max HP"
                disabled
                value={values.maxHP}
                onChange={handleChange('maxHP')}
                margin="dense"
                type="number"
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            spacing={0}
            xs
            alignItems="center"
            justify="space-between"
          >
            <Grid item xs={4}>
              <TextField
                className={classes.modField}
                id={`initMod-${props.flavor}`}
                label="Init Mod"
                onChange={handleChange('initMod')}
                value={values.initMod}
                margin="dense"
                type="number"
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="default"
                className={classes.modButton}
                onClick={editToggle}
              >
                {'Saves'}
              </Button>
            </Grid>
            <Grid item>
              <Fab
                color="primary"
                onClick={handleSubmit}
                className={classes.fab}
                label="Add"
              >
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
          <Grid item xs={12} container>
            <Collapse in={values.editing}>
              <Grid container spacing={1}>
                {saves.map((save, idx) => (
                  <Grid
                    item
                    key={idx}
                    xs
                    className={
                      save === 'str'
                        ? classes.modField
                        : save === 'cha'
                        ? classes.chaField
                        : null
                    }
                  >
                    <TextField
                      id={`${save}-${props.flavor}`}
                      label={save.charAt(0).toUpperCase() + save.slice(1)}
                      value={values[`${save}Save`]}
                      onChange={handleChange(`${save}Save`)}
                      margin="dense"
                      type="number"
                    />
                  </Grid>
                ))}
              </Grid>
            </Collapse>
          </Grid>
        </Grid>
      </Paper>
      <div>{'matches: ' + matches}</div>
      <div>{refTest.current !== null ? refTest.current.offsetWidth : ':('}</div>
    </span>
  );
};

export default ActorCreator;
