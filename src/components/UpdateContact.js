import React ,{useState} from 'react'
import {db} from '../firebase';


import {Dialog,DialogTitle, DialogContent,DialogContentText, DialogActions } from '@material-ui/core';
import {TextField,Button} from '@material-ui/core';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
function UpdateContact(props) {
    console.log("opened update dialog")
    const contact=props.contact//line 1
    console.log(props.open)
    console.log("in update",contact)
    const [updatecontact,setUpdateContact]=useState(contact)
    
    
    const onChangeName=(name)=>{
      setUpdateContact({
        ...updatecontact,
        name:name
      })
    }
    const onChangeEmail=(email)=>{
      setUpdateContact({
        ...updatecontact,
         email:email
      })
    }
    const onChangeGender=(gender)=>{
      setUpdateContact({
        ...updatecontact,
         gender:gender
      })
    }
    const handleClose = () => {
        //setOpen(false);
        props.onChange(false)

    };
    const update = () => {
      db.collection('contacts').doc(contact.id).update({
        name:updatecontact.name,
        email:updatecontact.email,
        gender:updatecontact.gender}
      )
      .then(()=>{
        //setOpen(false);
        props.onChange(false)
        alert("updated");
        props.getcontacts()
        // setUpdateContact({
        //   name:'',
        //   email:'',
        //   gender:''
        // })
        
        
      })
      .catch(error=>{
        console.log(error.message)
      })
    }
    return (
      <div>                          
            
          {/* {open && (<>)} */}
          
            <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Contact</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter the update values
              </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        value={updatecontact.name}
                        onChange={(e)=>onChangeName(e.target.value)}
                    />  
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Email Address"
                        fullWidth
                        value={updatecontact.email}
                        onChange={(e)=>onChangeEmail(e.target.value)}
                    />
                    <FormControl >      
                      <FormLabel >Gender</FormLabel>
                      <RadioGroup value={updatecontact.gender} variant="outlined" onChange={(e)=>onChangeGender(e.target.value)}>
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />            
                      </RadioGroup>
                    </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={update} color="primary">
                Update
              </Button>
            </DialogActions>
          </Dialog> 
        
    </div>
    )
}

export default UpdateContact
