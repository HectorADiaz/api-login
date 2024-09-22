const router = require("express").Router();
const { Client } = require('../model/Client');

router.get('/client', async (req, res) => {
    try {
        const clients = await Client.findAll({
            attributes: ['clientId','clientName','firstName','lastName','email','phone','nit','address', 'isActive'],
        });
        return res.status(200).json({
            ok: true,
            status: 200,
            message: "Client retrieved successfully.",
            data: clients
        });
    } catch (error) {
        console.error("Error fetching clients:", error);

        return res.status(500).json({
            ok: false,
            status: 500,
            message: "An error occurred while retrieving clients.",
            error: error.message
        });
    }
});

module.exports = router;
