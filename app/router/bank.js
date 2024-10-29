const router = require("express").Router();
const {Bank} = require("../model/associations");
const AccountType = require("../model/AccountType");


router.get("/bank", async (req, res) => {
    try {
        const banks = await Bank.findAll({
            attributes: ["bankId","bankName"]
          });
        return res.status(200).json({
            ok:true,
            data: banks
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "An error occurred while retrieving Bankss.",
            error: error.message,
          });        
    }   
});

router.get("/accountType", async (req, res) => {
    try {
        const accountType = await AccountType.findAll({
            attributes: ["accountTypeId","typeName"]
          });
        return res.status(200).json({
            ok:true,
            data: accountType
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "An error occurred while retrieving Account Type.",
            error: error.message,
          });        
    }   
});



module.exports = router;