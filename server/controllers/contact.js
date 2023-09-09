const Contact = require('../models/Contacts')

exports.getAllContacts = async (req, res) => {
    try {
        const allContacts = await Contact.find();

        res.status(200).json({ success: true, data: allContacts });
    } catch (err) {
        console.error(err);

        res.status(500).json({ success: false, message: 'Failed to retrieve contacts.', error: err.message });
    }
}

exports.getSingleContact = async (req, res) => {
    try {
        const id = req.params.contactId;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: 'Invalid contact ID.' });
        }

        const contact = await Contact.findById(id);

        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found.' });
        }

        res.status(200).json({ success: true, data: contact });
    } catch (err) {
        console.error(err);

        if (err.name === 'CastError') {
            return res.status(400).json({ success: false, message: 'Invalid contact ID.' });
        }

        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

exports.addContact = async (req, res) => {
    try {
        const { name, email, phoneNumber } = req.body;

        if (!name || !email || !phoneNumber) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        const contact = new Contact({
            name,
            email,
            phoneNumber,
        });

        const savedContact = await contact.save();

        res.status(201).json({ success: true, data: savedContact, message: 'Contact added successfully!' });
    } catch (err) {
        console.error(err);

        if (err.name === 'ValidationError') {
            const validationErrors = Object.values(err.errors).map((error) => error.message);
            return res.status(400).json({ success: false, message: validationErrors });
        }

        res.status(500).json({ success: false, message: 'Failed to add contact.', error: err.message });
    }
}

exports.updateContact = async (req, res) => {
    try {
        const { name, email, phoneNumber } = req.body;
        const id = req.params.contactId;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: 'Invalid contact ID.' });
        }

        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            {
                name,
                email,
                phoneNumber,
            },
            { new: true }
        );

        if (!updatedContact) {
            return res.status(404).json({ success: false, message: 'Contact not found.' });
        }
        res.status(200).json({ success: true, data: 'Contact updated!', contact: updatedContact });
    } catch (err) {
        console.error(err);

        if (err.name === 'CastError') {
            return res.status(400).json({ success: false, message: 'Invalid contact ID.' });
        }

        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

exports.deleteContact = async (req, res) => {
    try {
        const id = req.params.contactId;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: 'Invalid contact ID.' });
        }

        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return res.status(404).json({ success: false, message: 'Contact not found.' });
        }

        res.status(200).json({ success: true, data: 'Contact deleted!' });
    } catch (err) {
        console.error(err);

        if (err.name === 'CastError') {
            return res.status(400).json({ success: false, message: 'Invalid contact ID.' });
        }

        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}