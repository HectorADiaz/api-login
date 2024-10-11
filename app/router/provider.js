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
async function  validateProviderInput({
  businessName, commercialName, fiscalAddress, nit, phone, email, managerName, managerPhone, entityAccounts
}){
  const errors = [];

  if (!businessName || typeof businessName !== 'string' || businessName.length < 5) {
    errors.push('El nombre commercial debe tener al menos 5 caracteres.');
  }
  if (!commercialName || typeof commercialName !== 'string' || commercialName.length < 5) {
    errors.push('El nombre comercial debe tener al menos 5 caracteres.');
  }
  if (!fiscalAddress || typeof fiscalAddress !== 'string' || fiscalAddress.length < 5) {
    errors.push('La dirección fiscal debe tener al menos 5 caracteres.');
  }
  if (!nit || typeof nit !== 'string' || nit.length < 5) {
    errors.push('El NIT debe tener al menos 5 caracteres.');
  }
  if (!phone || typeof phone !== 'string' || phone.length < 5) {
    errors.push('El número de teléfono debe tener al menos 5 caracteres.');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errors.push("El formato del email no es válido.");
  }
  if (!managerName || typeof managerName !== 'string' || managerName.length < 5) {
    errors.push('El nombre del gerente debe tener al menos 5 caracteres.');
  }
  if (!managerPhone || typeof managerPhone !== 'string' || managerPhone.length < 5) {
    errors.push('El número de teléfono del gerente debe tener al menos 5 caracteres.');
  }
  if (errors.length > 0) {
    throw new Error(JSON.stringify(errors));
  }
}

router.post('/providerAccount', async (req, res) => {
  console.log(req.body);
  const { bankAccount } = req.body;
  const { bankId, accountNumber, accountName, AccountTypeId, isActive, typeAccounts } = bankAccount;
  
  try{
    let bankAccounts = [];
    if (!bankAccount) {
      if (Array.isArray(bankAccount)) {
        for (const account of bankAccount) {
          const newBankAccount = await BankAccount.create({
              bankId: account.bankId,
              accountNumber: account.accountNumber,
              accountName: account.accountName,
              AccountTypeId: account.AccountTypeId,
              isActive: account.isActive,
              typeAccounts: account.typeAccounts
            });
          bankAccounts.push(newBankAccount);

        }
      } else {
          const newBankAccount = await BankAccount.create({
        bankId: bankAccount.bankId,
        accountNumber: bankAccount.accountNumber,
        accountName: bankAccount.accountName,
        AccountTypeId: bankAccount.AccountTypeId,
        isActive: bankAccount.isActive,
        typeAccounts: bankAccount.typeAccounts
          });
          bankAccounts.push(newBankAccount);
      } 
  }
}catch (error) {

  }

});

router.post('/provider', async (req, res) => {
  console.log(req.body);
  const { businessName, commercialName, fiscalAddress, nit, phone, email, managerName, managerPhone } = req.body;
    try {
        await validateProviderInput(req.body);
        const newProvider = await Provider.create({
          businessName,
          commercialName,
          fiscalAddress,
          nit,
          phone,
          email,
          managerName,
          managerPhone,
          isActive: true,
          BankAccount
          
        });

        return res.status(201).json({
            ok:true,
            status: 201,
            message: "Provider created successfully.",            
        })
    } catch (error) {
      console.error("Error creating provider:", error);
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          ok: false,
          status: 400,
          message: "Validation error occurred.",
          error: error.errors.map((err) => err.message),
        });
      }
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "An error occurred while creating Provider.",
            error: error.message,
          });        
    }
});
  module.exports = router;
