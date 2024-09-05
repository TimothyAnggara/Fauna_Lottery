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

// Modal component with form to generate automatic tickets
export default function AutomaticTicket({ addTicket, existingTickets }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [ticketCount, setTicketCount] = React.useState(1);
  const [error, setError] = React.useState('');

  // Open and close modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  // Function to generate a random 3-digit number
  const generateRandomTicket = () => {
    let ticket;
    do {
      ticket = Math.floor(100 + Math.random() * 900).toString(); // Generate random 3-digit number
    } while (existingTickets.includes(ticket)); // Check for duplicate
    return ticket;
  };

  // Handle form submission and ticket generation
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || ticketCount < 1 || ticketCount > 999) {
      setError("Please enter a valid name and a ticket count between 1 and 999.");
      return;
    }

    const newTickets = [];
    for (let i = 0; i < ticketCount; i++) {
      const randomTicket = generateRandomTicket();
      newTickets.push(randomTicket);
    }

    // Add each new ticket using the addTicket function
    newTickets.forEach(ticket => addTicket(name, ticket));

    setName(''); // Reset form fields
    setTicketCount(1);
    setError(''); // Clear errors
    handleClose(); // Close modal
  };

  return (
    <div>
      {/* Button to open modal */}
      <button
        className="w-32 px-6 py-3 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition duration-300 ease-in-out"
        onClick={handleOpen}
      >
        Automatic
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
            Generate Automatic Tickets
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
              label="How Many Tickets"
              variant="filled"
              fullWidth
              margin="normal"
              type="number"
              value={ticketCount}
              onChange={(e) => setTicketCount(Math.min(999, Math.max(1, e.target.value)))}
              inputProps={{ min: 1, max: 999 }}
              required
            />
            {error && <Typography color="error">{error}</Typography>}

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Generate Tickets
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
