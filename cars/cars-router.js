const express = require('express');
const db = require('../data/db-config');
const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
        .then(cars => {
            res.json(cars);
            res.status(200);
        })
        .catch(err => {
            res.status(500).json({
                error: 'Failed to retrieve cars.'
            })
        });
})

router.post('/', (req, res) => {
    const {VIN, make, model, mileage} = req.body;

    if (!VIN || !make || !model || !mileage) {
        res.status(400).json({
            error: 'Must provide VIN, make, model, and mileage.'
        })
    }

    db('cars').insert(req.body)
        .then(ids => {
            db('cars').where({id: ids[0]})
                .then(newCar => {
                    res.status(201).json(newCar)
                });
        })
        .catch(err => {
            res.status(500).json({
                error: 'Failed to store data.'
            });
        });

});

router.put('/:id', async (req, res) => {
    const {VIN, make, model, mileage} = req.body;

    if (!VIN || !make || !model || !mileage) {
        res.status(400).json({
            error: 'Must provide VIN, make, model, and mileage.'
        })
    }
    if (!req.params.id) {
        res.status(400).json({
            error: 'Must include an id.'
        })
    }
    try {
        const carUpdate = await db('cars')
            .where('id', req.params.id)
            .update(req.body);
        res.status(200).json({updated: carUpdate});
    } catch {
        res.status(500).json({
            error: 'Failed to update car.'
        })
    }
})

router.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({
            error: 'Must include an id.'
        })
    }
    try{
        const carDelete = await db('cars')
            .where('id', req.params.id)
            .del();
        res.status(200).end()
    } catch {
        res.status(500).json({
            error: 'Failed to delete car.'
        })
    }
})

module.exports = router;
