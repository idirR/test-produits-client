import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import ProductEdit from './ProductEdit';
import ProductDelete from './ProductDelete';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const ProductTable = forwardRef((props, ref) => {
    const classes = useStyles();

    const [docs, setDocs] = useState([]);
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/produits', null);
        setDocs(data);
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      fetchData();
    }, [])

    useImperativeHandle(ref, () => ({
      refresh() {
        fetchData();
      }
    }));

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [product, setProduct] = useState(null);
    const onEdit = (p) => {
      setProduct(p);
      setOpenEdit(true);
    }
    const onDelete = (p) => {
      setProduct(p);
      setOpenDelete(true);
    }
    const close = () => {
      setProduct(null);
      setOpenEdit(false);
      setOpenDelete(false);
    }

    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Created at</TableCell>
                <TableCell align="right">Product name</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Rating</TableCell>
                <TableCell align="right">Available</TableCell>
                <TableCell align="right">#</TableCell>
              </TableRow>
            </TableHead>
            {
              docs.length > 0 ? (
                <TableBody>
                  {docs.map(doc => (
                    <TableRow key={doc._id}>
                      <TableCell component="th" scope="row">
                        {new Date(doc.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell align="right">{doc.name}</TableCell>
                      <TableCell align="right">{doc.type}</TableCell>
                      <TableCell align="right">{doc.price}</TableCell>
                      <TableCell align="right">{doc.rating}</TableCell>
                      <TableCell align="right">
                        {
                          (doc.available === 'true') ? (
                            <Chip
                              icon={<DoneIcon />}
                              color='primary'
                            />
                          ) : (
                            <Chip
                              icon={<CloseIcon />}
                              color='secondary'
                            />
                          )
                        }
                      </TableCell>
                      <TableCell align="right">
                        <Button className={classes.button} onClick={() => onEdit(doc)}>Edit</Button>
                        <Button className={classes.button} onClick={() => onDelete(doc)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody></TableBody>
              )
            }
          </Table>
        </Paper>
        <ProductEdit open={openEdit} onClose={() => close()} product={product} refresh={() => fetchData()} />
        <ProductDelete open={openDelete} onClose={() => close()} product={product} refresh={() => fetchData()} />
      </div>
    )
});

export default ProductTable;