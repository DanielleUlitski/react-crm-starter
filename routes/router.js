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
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    firstContact: {
        type: Sequelize.DATE
    },
    emailType: {
        type: Sequelize.STRING
    },
    sold: {
        type: Sequelize.BOOLEAN
    },
    owner: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    }
})

router.get('/clients', (req, res) => {
    Clients.findAll({}).then(clients => {
        res.send(clients);
    })
})

router.post('/newOwner', (req, res) => {
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

router.post('/newEmailType', (req, res) => {
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

router.post('/sale', (req, res) => {
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

router.post('/qedit', (req, res) => {
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

router.post('/new', (req, res) => {
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
