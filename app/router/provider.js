const router = require("express").Router();
const AccountType = require("../model/accountType");
const { Provider, EntityAccount } = require('../model/associations');
const Bank = require("../model/Bank");
const BankAccount = require("../model/BankAccount");
 
require("../model/associations");  

router.get('/provider', async (req, res) => {
    try {
        const providers = await Provider.findAll({
            where: { isActive: true },
            attributes: [
              "providersId",
              "businessName",
              "commercialName",
              "fiscalAddress",
              "nit",
              "phone",
              "email",
              "managerName",
              "managerPhone"
            ],
            include: [{
              model: EntityAccount,
              attributes: ['entityAccountsId', 'providersId','bankAccountId'],
              include:[
                {
                  model:BankAccount,
                  attributes: ['bankAccountId','accountNumber','accountName', 'isActive', 'typeAccounts'],
                  include:[
                    {
                      model:Bank,
                      attributes: ['bankId','bankName']
                    },
                    {
                      model:AccountType,
                      attributes: ['accountTypeId','typeName']
                    }
                  ]
                }
              ],
            }]
          });
        return res.status(200).json({
            ok:true,
            data: providers
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "An error occurred while retrieving Providers.",
            error: error.message,
          });        
    }
  });

  module.exports = router;
