import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
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

function ProductEdit (props) {
    const classes = useStyles();
    const [available, setAvailable] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [warrantyYears, setWarrantyYears] = useState('');
    useEffect(() => {   
        if (props.product) {
            setAvailable(props.product.available);
            setName(props.product.name);
            setPrice(props.product.price);
            setRating(props.product.rating);
            setWarrantyYears(props.product.warranty_years);
        }
    }, [props.product])

    const handleUpdate = async () => {
        const { product } = props;
        const updates = {};
        let updated = false;
        if (name !== product.name) {
            updates['name'] = name;
            updated = true;
        }
        if (price !== product.price) {
            updates['price'] = price;
            updated = true;
        }
        if (rating !== product.rating) {
            updates['rating'] = rating;
            updated = true;
        }
        if (available !== product.available) {
            updates['available'] = available;
            updated = true;
        }
        if (warrantyYears !== product.warranty_years) {
            updates['warranty_years'] = warrantyYears;
            updated = true;
        }
        if (updated) {
            try {
                await axios.put('http://localhost:5000/produits/'+product._id, updates, null);
                props.refresh();
                props.onClose();
            } catch (error) {
                console.log(error);
                props.onClose();
            }
        }

    }

    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Product</DialogTitle>
            {
                props.product ? (
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Product name"
                            type="text"
                            fullWidth
                            className={classes.field}
                            onChange={e => setName(e.target.value)}
                            defaultValue={props.product.name}
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
                            defaultValue={props.product.price}
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
                            defaultValue={props.product.rating}
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
                            defaultValue={props.product.warranty_years}
                        />
                        <FormControlLabel
                            control={
                            <Switch defaultChecked={props.product.available === 'true'}  onChange={e => setAvailable(e.target.checked)} value={available} />
                            }
                            label="Available"
                        />
                    </DialogContent> 
                ) : (
                    <DialogContent></DialogContent>
                )
            }
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleUpdate} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    )   
}

export default ProductEdit;