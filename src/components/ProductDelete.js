import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

function ProductDelete(props) {
    const handleDelete = async () => {
        try {
            await axios.delete('http://localhost:5000/produits/'+props.product._id, null);
            props.refresh();
            props.onClose();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
            <DialogContent>
                {
                    props.product ? (
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete {props.product.name} ?
                        </DialogContentText>
                    ) : (
                        <div></div>
                    )
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDelete} color="primary" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ProductDelete;