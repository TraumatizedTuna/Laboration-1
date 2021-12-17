class Location {
    constructor(name) {
        this.name = name;
        this.neighbors = new Set();
        this.items = new Set();
        this.message = 'You are in ' + this.name;
    }
    addNeighbors(neighbors) {
        for (let i in neighbors) {
            this.neighbors.add(neighbors[i]);
        }
    }
    addItem(item) {
        this.items.add(item);
    }
    removeItem(item) {
        this.items.delete(item);
    }
    interact() {
        ui.setLoc(this.message);
        let actions = {};
        let options = '';
        for (let loc of this.neighbors) {
            let command = 'Enter ' + loc.name;
            actions[command.toLowerCase().replaceAll(' ', '')] = loc;
            options += '\n' + command;
        }
        for (let item of this.items) {
            let command = item.command + item.name;
            actions[command.toLowerCase().replaceAll(' ', '')] = item;
            options += '\n' + command;
        }


        ui.userInput(
            'Options:' + options,
            function (userInput, actions) {
                let action = actions[userInput.toLowerCase().replaceAll(' ', '')]
                action.interact();
            },
            actions
        );

    }
}
Location.connect = function (loc0, loc1) {
    loc0.addNeighbors([loc1]);
    loc1.addNeighbors([loc0]);
}

class Item {
    constructor(name, loc, command, interact) {
        this.name = name;
        this.move(loc);
        this.command = command || 'Check out ';
        this.interact = interact || function () {
            ui.userInput(
                'This is ' + this.name,
                function(userInput, loc){
                    loc.interact()
                },
                this.loc
            )
        };
    }
    move(destination) {
        if (this.loc) {
            this.loc.removeItem(this)
        }
        destination.addItem(this);
        this.loc = destination;
    }
    moveRandom() {
        let locs = Array.from(this.loc.neighbors);
        if (locs.length) {
            this.move(locs[Math.floor(Math.random() * locs.length)]);
        }
    }

}