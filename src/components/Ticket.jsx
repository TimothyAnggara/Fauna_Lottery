import { useState, useEffect } from "react"
import { Trash2 } from 'lucide-react';
import ManualTicket from "./manualTicket";
import AutomaticTicket from "./automaticTicket";

export default function Ticket(){
    const [tickets, setTickets] = useState(() => {
        const storedTickets = localStorage.getItem("tickets");
        return storedTickets ? JSON.parse(storedTickets) : [];
    });
    const [creatingTicket, setCreatingTicket] = useState(false); // To track if user clicked "Generate Tickets"
    const [searchQuery, setSearchQuery] = useState(""); // For handling search input

    useEffect(() => {
        const storedTickets = localStorage.getItem("tickets");
        if (storedTickets) {
            setTickets(JSON.parse(storedTickets));
        }
    }, []);

    // Save tickets to localStorage whenever the tickets array changes
    useEffect(() => {
        localStorage.setItem("tickets", JSON.stringify(tickets));
    }, [tickets]);

    const addTicket = (name, number) => {
        const newTicket = { name, number }; // Create new ticket object
        setTickets((prevTickets) => [...prevTickets, newTicket]); // Update state
    };

    const deleteTicket = (indexToDelete) => {
        setTickets((prevTickets) =>
            prevTickets.filter((ticket, index) => index !== indexToDelete)
        );
    };

    const existingTickets = tickets.map((ticket) => ticket.number); // Extract existing ticket numbers for duplicate checking
    
    // Filter tickets based on the search query
    const filteredTickets = tickets.filter((ticket) =>
        ticket.number.toString().includes(searchQuery)
    );

    // Preview the first 5 tickets or the ones matching the search
    const ticketPreview = searchQuery
        ? filteredTickets.slice(0, 5) // Display first 5 matching tickets if searching
        : tickets.slice(0, 5); // Display the first 5 tickets when not searching
    
    
    return(
        <div className="w-full max-w-md mx-auto pt-8 flex flex-col gap-y-6">
            {/* Displaying tickets */}
            <div className="flex justify-center items-center">
                <span>Current Tickets {tickets.length} / 1000</span>
            </div>
            {/* Generating part */}
            <div className="flex items-center justify-between mb-4">
                {!creatingTicket ? (
                    <>
                        <button
                            onClick={() => setCreatingTicket(true)}
                            className="w-48 px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out"
                        >
                            Generate Tickets
                        </button>
                        <button
                            onClick={() => setTickets([])}
                            className="w-48 px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-300 ease-in-out"
                        >
                            Reset
                        </button>
                    </>
                ) : (
                    <>
                        <ManualTicket addTicket={addTicket} existingTickets = {existingTickets}/>
                        <AutomaticTicket  addTicket={addTicket} existingTickets={existingTickets}/>
                        <button
                            onClick={() => setCreatingTicket(false)}
                            className="w-32 px-6 py-3 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition duration-300 ease-in-out"
                        >
                            Cancel
                        </button>
                    </>
                )}
                
                
            </div>
            {/* Search part */}
            <div className="mb-6">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for ticket number..."
                    className="w-full px-4 py-2 border rounded-lg shadow-sm"
                />
            </div>

            {/* Ticket Preview */}
            <div>
                {ticketPreview.length > 0 ? (
                    <ul>
                        {ticketPreview.map((ticket, index) => (
                            <li key={index} className="flex justify-between items-center py-2 border-b">
                                <span>{ticket.name}</span>
                                <span>#{ticket.number}</span>
                                <button onClick={() => deleteTicket(index)}><Trash2 /></button>
                            </li>
                        ))}
                    </ul>
                    
                ) : (
                    <p>No tickets to display</p>
                )}
            </div>
        </div>
    )
}