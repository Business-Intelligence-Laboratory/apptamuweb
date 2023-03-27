import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import logoLab from '../assets/images/Logo LBI.png';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Backdrop, CircularProgress } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://lbi.si.fti.unand.ac.id/">
        LBI FTI UNAND
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function TamuPage() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [type, setType] = React.useState("success");
  const [showBackdrop, setShowBackDrop] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  function showMessage(type, msg) {
    setOpen(true)
    setType(type)
    setMessage(msg)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log("sdasdas", event.currentTarget)
    console.log("data", data)
    // console.log(data)
    // console.log({
    //   nama: data.get('nama'),
    //   noIdentitas: data.get('noIdentitas'),
    //   listIntansi: data.get('listInstansi'),
    //   jenisKelamin: data.get('jenisKelamin'),
    //   statusKunjungan: data.get('statusKunjungan'),
    // });
    try {
      setShowBackDrop(true)
      const res = await axios.post('https://brave-cow-hoodie.cyclic.app/saveTamu', data, { headers: { "Content-Type": "application/json" } })
      // console.log(res.data);
      showMessage("success", "Selamat Datang")
      setShowBackDrop(false)
      event.target.reset();
    } catch (error) {
      setShowBackDrop(true)
      showMessage("error", error.message)
      setShowBackDrop(false)
      event.target.reset()
    }
  };

  const instansi = [
    { label: 'Sistem Informasi UNAND', value: 'Sistem Informasi UNAND' },
    { label: 'Teknik Komputer UNAND', value: 'Teknik Komputer UNAND' },
    { label: 'Informatika UNAND', value: 'Informatika UNAND' },
    { label: 'Lainnya', value: 'Lainnya' }]


  return (
    <ThemeProvider theme={theme}>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={logoLab} alt='Logo LBI' width={100} height={100} />
          <Typography component="h1" variant="h5" align='center'>
            Selamat Datang di Laboratory of Business Intelligence
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nama"
              label="Nama"
              name="nama"
              autoComplete="nama"
              autoFocus
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="noIdentitas"
              label="No.Identitas / NIM / NIP"
              id="noIdentitas"
              autoComplete="current-password"
            />
            <Autocomplete
              disablePortal
              margin="dense"
              required
              id="listInstansi"
              // name="listInstansi"
              options={instansi}
              fullWidth
              renderInput={(params) => <TextField name='instansi' margin='dense' variant='outlined' {...params} label="Instansi" />}
            />
            <FormControl margin="dense">
              <FormLabel id="jenisKelamin">Jenis Kelamin</FormLabel>
              <RadioGroup
                row
                required
                aria-labelledby="demo-row-radio-buttons-group-label"
                defaultValue="Laki-Laki"
                name="jenisKelamin"
              >
                <FormControlLabel value="Laki-Laki" control={<Radio />} label="Laki-Laki" />
                <FormControlLabel value="Perempuan" control={<Radio />} label="Perempuan" />
              </RadioGroup>
            </FormControl>
            <TextField
              margin="dense"
              required
              fullWidth
              name="statusKunjungan"
              label="Tujuan Kunjungan"
              id="statusKunjungan"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Masuk
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showBackdrop}

      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}