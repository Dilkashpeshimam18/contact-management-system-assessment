const express=require('express')
const contactControllers=require('../controllers/contact')
const router=express.Router()

router.get('/get-contacts',contactControllers.getAllContacts)
router.get('/get-singlecontact/:contactId',contactControllers.getSingleContact)
router.post('/add-contact',contactControllers.addContact)
router.put('/update-contact/:contactId',contactControllers.updateContact)
router.delete('/delete-contact/:contactId',contactControllers.deleteContact)

module.exports=router