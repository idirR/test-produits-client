import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
    type: {
      minWidth: '100%',
      marginBottom: '1rem'
    },
    field: {
        marginBottom: '1rem'
    }
}));

const types = [
    { key: 'phone-key', value: 'phone', label: 'Phone' },
    { key: 'computer-key', value: 'computer', label: 'Computer' }
]

function ProductAdd (props) {
    const classes = useStyles();
    const [type, setType] = useState('');
    const [available, setAvailable] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [rating, setRating] = useState(0);
    const [warrantyYears, setWarrantyYears] = useState(0);

    const handleSave = async () => {
        if (!name || !type || price === 0 || warrantyYears === 0) return;
        const body = { name, price, rating, type, available, warrantyYears };

        try {
            await axios.post('http://localhost:5000/produits', body, null);
            props.refresh();
            props.onClose();
        } catch (error) {
            console.log(error);
            props.onClose();
        }
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add New Product</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Fill the form below to register a new product
                </DialogContentText>
                <FormControl className={classes.type}>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                    {
                        types.map(t => {
                            return (
                            <MenuItem key={t.key} value={t.value}>{t.label}</MenuItem>
                            )
                        })
                    }
                    </Select>
                </FormControl>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Product name"
                    type="email"
                    fullWidth
                    className={classes.field}
                    onChange={e => setName(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="price"
                    label="Price"
                    type="number"
                    fullWidth
                    className={classes.field}
                    onChange={e => setPrice(Number(e.target.value))}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="rating"
                    label="Rating"
                    type="number"
                    fullWidth
                    className={classes.field}
                    onChange={e => setRating(Number(e.target.value))}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="warranty-years"
                    label="Warranty years"
                    type="number"
                    fullWidth
                    className={classes.field}
                    onChange={e => setWarrantyYears(Number(e.target.value))}
                />
                <FormControlLabel
                    control={
                    <Switch checked={available} onChange={e => setAvailable(e.target.checked)} value={available} />
                    }
                    label="Available"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )   
}

export default ProductAdd;