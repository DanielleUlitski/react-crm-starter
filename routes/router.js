const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.sqlDB);
const bodyParser = require('body-parser');
const dateFormat = require('dateformat');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const Clients = sequelize.define('clients', {
    name: {
        type: Sequelize.CHAR
    },
    email: {
        type: Sequelize.CHAR
    },
    firstContact: {
        type: Sequelize.DATE
    },
    emailType: {
        type: Sequelize.CHAR
    },
    sold: {
        type: Sequelize.BOOLEAN
    },
    owner: {
        type: Sequelize.CHAR
    },
    country: {
        type: Sequelize.CHAR
    }
})

router.get('/stuff/clients', (req, res) => {
    Clients.findAll({}).then(clients => {
        res.send(clients);
    })
})

router.post('/stuff/newOwner', (req, res) => {
    Clients.update(
        { owner: req.body.newOwner },
        {
            where: {
                id: req.body.id
            }
        })
        .then(() => {
            Clients.findAll({
                where: {
                    id: req.body.id
                }
            }).then(client => {
                console.log(client);
                // res.send();
                res.send(client[0].dataValues);
            })
        })
})

router.post('/stuff/newEmailType', (req, res) => {
    Clients.update(
        { emailType: req.body.newEmailType },
        {
            where: {
                id: req.body.id
            }
        })
        .then(() => {
            Clients.findAll({
                where: {
                    id: req.body.id
                }
            }).then(client => {
                console.log(client);
                // res.send();
                res.send(client[0].dataValues);
            })
        })
})

router.post('/stuff/sale', (req, res) => {
    Clients.update(
        { sold: req.body.newBool },
        {
            where: {
                id: req.body.id
            }
        })
        .then(() => {
            Clients.findAll({
                where: {
                    id: req.body.id
                }
            }).then(client => {
                res.send(client[0].dataValues);
            })
        })
})

router.post('/stuff/qedit', (req, res) => {
    Clients.update(
        { name: req.body.name, country: req.body.country },
        {
            where: {
                id: req.body.id
            }
        })
        .then(() => {
            Clients.findAll({
                where: {
                    id: req.body.id
                }
            }).then(client => {
                res.send(client[0].dataValues);
            })
        })
})

router.post('/stuff/new', (req, res) => {
    let now = new Date();
    Clients.create({
        name: req.body.name,
        email: req.body.email,
        firstContact: dateFormat(now, "isoDateTime"),
        emailType: null,
        sold: false,
        owner: req.body.owner,
        country: req.body.country,
    })
    .then(() => {
        Clients.findAll({}).then((clients) => {
            res.send(clients);
        })
    })
})

module.exports = router;