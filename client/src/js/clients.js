import { observable, action } from 'mobx'
import axios from 'axios'
// import io from 'socket.io-client'

class Clients {
    @observable clients = [];

    // socket = io.connect();

    @observable client = {};

    @observable owners = {};

    @observable emailTypes = {};

    @observable filteredClients = [];

    @observable displayedClients = [];

    @observable newClientsCounter = 0;

    @observable emailsSent = 0;

    @observable outStandingClients = 0;

    @observable countries = {};

    @observable emailTypeSales = {};

    @action populateClients = async (min, max, isClientsComponent, isActionComponent, isAnalyticsComponent) => {
        this.clients = await axios.get('http://localhost:8090/stuff/clients')
        this.clients = this.clients.data
        if (isClientsComponent) {
            this.applyFilter("name", "");
            this.populateDisplayed(min, max);
        }
        if (isActionComponent) {
            this.calculateOwners();
            this.calculateEmailTypes();
        }
        if (isAnalyticsComponent) {
            this.calcNewClients();
            this.calcEmailsSent();
            this.calcOutStanding();
            this.calcCountrySales();
            this.calculateOwners();
            this.calcEmailTypeSales();
        };
    }

    @action applyFilter = (category, input) => {
        debugger;
        if (category === "sold") return this.filteredClients = this.clients.filter(c => c.sold && c.name.toLowerCase().includes(input.toLowerCase()));
        if (category === "email") {
            return this.filteredClients = this.clients.filter(c => {
                if (c.emailType) {
                    return c.emailType.toLowerCase().includes(input.toLowerCase())
                }
                return false;
            });
        }
        this.filteredClients = this.clients.filter(c => {
            return c[category].toLowerCase().includes(input.toLowerCase());
        })
    }

    @action calcCountrySales = () => {
        for (let i = 0; i < this.clients.length; i++) {
            if (this.clients[i].sold) {
                if (!this.countries[this.clients[i].country]) {
                    this.countries[this.clients[i].country] = 0;
                }
                this.countries[this.clients[i].country]++
            }
        }
    }

    @action calcEmailTypeSales = () => {
        for (let i = 0; i < this.clients.length; i++) {
            if (this.clients[i].sold && this.clients[i].emailType !== null) {
                if (!this.emailTypeSales[this.clients[i].emailType]) {
                    this.emailTypeSales[this.clients[i].emailType] = 0;
                }
                this.emailTypeSales[this.clients[i].emailType]++
            }
        }
    }

    @action calcOutStanding = () => {
        this.outStandingClients = this.clients.filter(c => !c.sold).length;
    }

    @action calcNewClients = () => {
        let counter = 0;
        let date = new Date();
        let currentMonth = date.getMonth();
        this.clients.map(c => {
            let cDate = new Date(c.firstContact);
            if (cDate.getMonth() === currentMonth) {
                counter++;
            }
            return null;
        });
        this.newClientsCounter = counter;
    }

    @action calcEmailsSent = () => {
        this.emailsSent = this.clients.filter(c => c.emailType !== null).length;
    }

    @action calculateOwners = () => {
        let ownersKeys = Object.keys(this.owners);
        if (ownersKeys.length) {
            this.owners = {};
        }
        for (let i = 0; i < this.clients.length; i++) {
            if (this.clients[i].sold) {
                if (!this.owners[this.clients[i].owner]) {
                    this.owners[this.clients[i].owner] = 1;
                } else {
                    this.owners[this.clients[i].owner]++;
                }
            } else if (!this.owners[this.clients[i].owner]) {
                this.owners[this.clients[i].owner] = 0;
            }
        }
    }

    @action calculateEmailTypes = () => {
        let emailTypesKeys = Object.keys(this.owners);
        if (emailTypesKeys.length) {
            // for(let i of ownersKeys) {
            //     delete this.owners[i];
            // }
            this.emailTypes = {};
        }
        for (let i = 0; i < this.clients.length; i++) {
            if (this.clients[i].emailType !== null) {
                if (!this.emailTypes[this.clients[i].emailType]) {
                    this.emailTypes[this.clients[i].emailType] = 1;
                } else {
                    this.emailTypes[this.clients[i].emailType]++;
                }
            }
        }
    }

    @action populateDisplayed = (min, max) => {
        // this.socket.emit('texts', min)
        this.displayedClients.splice(0);
        for (let i = min; i < max; i++) {
            if (this.filteredClients[i]) {
                this.displayedClients.push(this.filteredClients[i]);
            }
        }
    }

    @action selectClient = (client) => {
        this.client = client;
    }

    @action transfer = async (newOwner) => {
        let index = this.clients.indexOf(this.client)
        this.clients[index] = await axios.post('http://localhost:8090/stuff/newOwner', { newOwner: newOwner, id: this.client.id });
        this.clients[index] = this.clients[index].data
        this.client = this.clients[index]
    }

    @action send = async (newEmailType) => {
        let index = this.clients.indexOf(this.client)
        this.clients[index] = await axios.post('http://localhost:8090/stuff/newEmailType', { newEmailType: newEmailType, id: this.client.id });
        this.clients[index] = this.clients[index].data
        this.client = this.clients[index]
    }

    @action switchSale = async () => {
        let newBool = undefined;
        switch (this.client.sold) {
            case true:
                newBool = false;
                break;
            case false:
                newBool = true;
                break;
        }
        let index = this.clients.indexOf(this.client)
        this.clients[index] = await axios.post('http://localhost:8090/stuff/sale', { newBool: newBool, id: this.client.id });
        this.clients[index] = this.clients[index].data
        this.client = this.clients[index]
    }

    @action editClient = async (index, changes, min, max) => {
        changes.id = this.clients[index].id
        this.clients[index] = await axios.post('http://localhost:8090/stuff/qedit', changes);
        this.clients[index] = this.clients[index].data
        this.populateDisplayed(min, max)
    }

    @action addNewClient = async (name, surname, country, owner) => {
        let newEmail = name + surname + "@imant.com"
        let newClient = {
            name: name + " " + surname,
            email: newEmail.toLowerCase(),
            owner: owner,
            country: country
        };
        this.clients = await axios.post('http://localhost:8090/stuff/new', newClient);
        this.clients = this.clients.data;
    }
}

const clients = new Clients();

export default clients;