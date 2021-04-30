import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import {db} from '../firebase'
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})

export default function Create() {
  const classes = useStyles()
 
  const [contact,setContact]=useState({
    name:'',
    email:'',
    gender:''
  })
  const [contactError,setContactError]=useState({
    name:false,
    email:false,
    gender:false
  })
  
  const handleOnChangeName=(name)=>{
    setContact({
      ...contact,
       name: name 
    })
  }
  const handleOnChangeEmail=(email)=>{
    setContact({
      ...contact,
       email: email
    })
  }
  const handleOnChangeGender=(gender)=>{
    setContact({
      ...contact,
       gender: gender 
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("entered value",contact)

    setContactError({
      ...contactError,
      name:false,
      email:false,
      gender:false
    })
    

     if (contact.name === ' ') {
      setContactError({...contactError,name:true})
     }
     if (contact.email ==='') {
      setContactError({...contactError,email:true})
     }
      if (contact.gender === '') {
        setContactError({...contactError,gender:true})
    }
    
    if (contact.name && contact.email && contact.gender){
        console.log("added value",contact)
        db.collection("contacts")
        .add(contact)
        .then((docRef)=> {
          alert("Your message has been submitted👍");
          console.log("Document written with ID: ", docRef.id);
         
          setContact({
            name:'',
            email:'',
            gender:''
          })
          
        })
        .catch((error) => {
          alert(error.message);
        }); 
    }
    
    
  }

  return (
    <Container size="sm">
      <Typography
        variant="h6" 
        color="Primary"
        component="h2"
        gutterBottom
      >
        Create a New Contact
      </Typography>
      
      <form Validate autoComplete="off" onSubmit={handleSubmit}>
      
        <TextField 
          onChange={(e)=>handleOnChangeName(e.target.value)}
          label="Name" 
          variant="outlined" 
          color="secondary" 
          fullWidth
          required
          value={contact.name}
          error={contactError.name}
        />
        <TextField className={classes.field}
          onChange={(e)=>handleOnChangeEmail(e.target.value)}
          label="Email"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          value={contact.email}
          error={contactError.email}
        />  
        <FormControl required error={contactError.gender}  className={classes.field}>      
          <FormLabel >Gender</FormLabel>
          <RadioGroup value={contact.gender} variant="outlined" onChange={(e)=>handleOnChangeGender(e.target.value)}>
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />            
          </RadioGroup>
        </FormControl>

        <Button
          type="submit" 
          color="secondary" 
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}>
          Submit
        </Button>
      </form>

      
    </Container>
  )
}
