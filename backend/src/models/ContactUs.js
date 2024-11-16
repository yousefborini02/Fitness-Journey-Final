const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const contactMessageSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the User (optional for guests)
    name: { type: String, required: true }, // Name of the person contacting
    email: { type: String, required: true }, // Email of the person contacting
    message: { type: String, required: true }, // The message content
    status: { type: String, default: 'new' }, // Status of the message ('new', 'read', 'resolved')
    createdAt: { type: Date, default: Date.now }, // Timestamp for message creation
    updatedAt: { type: Date, default: Date.now } // Timestamp for message update
  });
  
  // Create the ContactMessage model using the schema
  const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
  
  module.exports = ContactMessage;
  