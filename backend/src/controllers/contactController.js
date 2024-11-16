const ContactMessage = require('../models/ContactUs'); // Import the ContactMessage model

// Controller function to handle contact form submission
const sendContactMessage = async (req, res) => {
    const { name, email, message } = req.body;
    console.log(req.body);  // Log the form data

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const contactMessage = new ContactMessage({
            userId: req.userId, // Use the ID from the token
            name,
            email,
            message,
        });

        await contactMessage.save();
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (err) {
        console.error(err); // Log the error on the backend
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};

module.exports = { sendContactMessage };
