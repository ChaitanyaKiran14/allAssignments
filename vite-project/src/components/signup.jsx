import './signup'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';

const Signup = () => {

    return(

        <center>
             <Card variant="outlined">
            <p>User Name</p>
                <br/>
                <TextField id="outlined-basic" label="username" variant="outlined"  placeholder='Enter Username'/>

                <p>Password</p>
                <br/>
                <TextField id="outlined-basic" type='password' label="password" variant="outlined"  placeholder='Enter password'/>
                <br/>
                <br/>
                <Button  size='medium' variant="contained">Signup</Button>
            </Card>   

        </center>
       
               
    )
}




export default Signup