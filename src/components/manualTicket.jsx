import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

// Modal styles
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// Modal component with form to add ticket manually
export default function ManualTicket({ addTicket, existingTickets }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [error, setError] = React.useState('');

  // Open and close modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && number.length === 3 && /^[0-9]{3}$/.test(number)) { 
      if (existingTickets.includes(number)) {
        setError("This ticket already exists. Please choose a different number.");
        return;
      }
      addTicket(name, number); // Add ticket if it's not a duplicate
      setName(''); // Reset name field
      setNumber(''); // Reset number field
      setError(''); // Clear errors
      handleClose(); // Close modal
    } else {
      setError("Please enter a valid name and a 3-digit number.");
    }
  };

  return (
    <div>
      {/* Button to open modal */}
      <button 
        className='w-32 px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out'
        onClick={handleOpen}
      >
        Manual
      </button>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a New Ticket Manually
          </Typography>

          {/* Form inside the modal */}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="filled"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="3-Digit Ticket Number"
              variant="filled"
              fullWidth
              margin="normal"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              inputProps={{ maxLength: 3, pattern: "[0-9]{3}" }}
              required
            />
            {error && <Typography color="error">{error}</Typography>}

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Add Ticket
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
