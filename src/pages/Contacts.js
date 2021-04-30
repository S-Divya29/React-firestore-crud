import React from 'react'
import {useState,useEffect} from 'react';
import { db } from '../firebase';
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

import UpdateContact from '../components/UpdateContact'
import IconButton from '@material-ui/core/IconButton';

export const useStyles = makeStyles(() => ({
    tableHead: {
        backgroundColor: 'palegreen'
    }
}))

function Contacts() {
    const classes=useStyles()
    const [contacts,setContacts]=useState([]);
    const [page,setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(5);

    const [open,setOpen]=useState(false);
    
   
    useEffect( () => {
        
        console.log('use effect')
        getContacts()
    }, [])

    const getContacts=()=>{

        db.collection('contacts').get()
        .then((querySnapshot)=>{
            const list=[]
        querySnapshot.forEach(doc=>{
            const data=doc.data()
            list.push({id:doc.id, ...data})
         
        })
        setContacts(list)
    
    })
    .catch((error) => {
        console.log(error.message);
        
      });

    }
    
    const handleChangePage=(event,newPage)=>{
        setPage(newPage);
    }
    const handleChangeRowsPerPage=(event)=>{
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

   const deleteContact=(id)=>{
    
        console.log("delete clicked")
         //console.log(doc.id)
         db.collection('contacts').doc(id).delete()
         .then(()=>{alert("successfully deleted! ")
         console.log("deleted")
         getContacts();
        })
          .catch((error)=>{console.log(error.message)})
      }
     

     const handleClick=(contact)=>{
         setOpen(true);
         //<UpdateContact contact={contact} />
     }
     const handleClose = (newValue) => {
        setOpen(newValue);
    };

    return (
       <>
   
        <div>No of records : {contacts.length}</div><br/><br/>
        <Paper>
        <TableContainer>
            <Table>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell>Avatar</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
             
                <TableBody>
                    {contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((contact)=>{
                        return(
                            <TableRow key={contact.id} hover={true}>
                                {/* {console.log("in table  ",contact)} */}
                                
                                <TableCell ><Avatar>{contact.name.charAt(0)}</Avatar></TableCell>
                                <TableCell >{contact.name}</TableCell>
                                <TableCell >{contact.email}</TableCell>
                                <TableCell >{contact.gender}</TableCell>
                                <TableCell>
                                    <IconButton color="secondary" component="span" onClick={()=>{deleteContact(contact.id)}}><DeleteIcon/></IconButton>
                                                                         
                                    <IconButton component="span" color="primary" onClick={()=>handleClick(contact)} ><EditIcon/></IconButton>
                                    {console.log("in contacts open value =>",open)}
                                    {open && <UpdateContact open={open} contact={contact} getcontacts={getContacts} onChange={handleClose} />} 
                                            

                                </TableCell>
                            </TableRow>
                            
                        )
                    })}
                
                </TableBody>                
                
            </Table>
            <TablePagination
            rowsPerPageOptions={[5, 10, 25]} 
            component="div"
            count={contacts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </TableContainer>
      </Paper>
      
     
    </>
    )
}
export default Contacts;