const express = require('express');
const router = express.Router();
const { User } = require('../models');
const yup = require("yup");
const { validateToken } = require('../middlewares/auth');

// Route to fetch nurses
router.get('/nurses', async (req, res) => {
    try {
        const nurses = await User.findAll({
            where: { role: 'Nurse' },
            attributes: ['id', 'name'] // Include 'id' along with 'name'
        });
        res.json(nurses); // Return array of objects containing ID and name
    } catch (error) {
        console.error('Error fetching nurses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to fetch patients
router.get('/patients', async (req, res) => {
    try {
        const patients = await User.findAll({
            where: { role: 'Patient' },
            attributes: ['id', 'name'] // Include 'id' along with 'name'
        });
        res.json(patients); // Return array of objects containing ID and name
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Route to allocate nurse to patient
router.post("/allocate/patientName", validateToken, async (req, res) => {
    const patientName = parseInt(req.params.patientName);
    const { nurseName, service } = req.body;

    try {
        // Fetch patient details from the database
        const patient = await User.findOne({ where: { id: patientName, role: 'Patient' } });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Fetch nurses from the database
        let nurses = [];
        if (allocationMethod === 'random') {
            nurses = await User.findAll({ where: { role: 'Nurse' } });
            const randomIndex = Math.floor(Math.random() * nurses.length);
            const nurse = nurses[randomIndex];
            res.json({ message: `Nurse ${nurse.name} allocated to ${patient.name}` });
        } else if (allocationMethod === 'choice') {
            const nurse = await User.findOne({ where: { id: nurseId, role: 'Nurse' } });
            if (!nurse) {
                return res.status(404).json({ error: 'Nurse not found' });
            }
            res.json({ message: `Nurse ${nurse.name} allocated to ${patient.name}` });
        } else {
            return res.status(400).json({ error: 'Invalid allocation method' });
        }
    } catch (error) {
        console.error('Error allocating nurse:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
