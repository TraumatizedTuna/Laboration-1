class Location {
    constructor(name) {
        this.name = name;
        this.neighborhood = new Set();
        this.items = new Set();
        this.message = 'You are in ' + this.name;
    }
    addNeighbor(neighbor) {
        this.neighborhood.add(neighbor);
    }
    addItem(item) {
        this.items.add(item);
    }
    interact() {
        alert(this.message);
        let actions = {};
        let options = '';
        for (let loc of this.neighborhood) {
            let command = 'Enter ' + loc.name;
            actions[command.toLowerCase().replaceAll(' ', '')] = loc;
            options += '\n' + command;
        }
        for (let item of this.items) {
            let command = item.command + item.name;
            actions[command.toLowerCase().replaceAll(' ', '')] = item;
            options += '\n' + command;
        }
        let action;
        while(!action){
            let userInput = prompt('Options:' + options);
            action=actions[userInput.toLowerCase().replaceAll(' ', '')]
        }
        action.interact();
    }
}
Location.neighborize = function (loc0, loc1) {
    loc0.addNeighbor(loc1);
    loc1.addNeighbor(loc0);
}

class Item {
    constructor(name, loc, command, interact) {
        this.name = name;
        this.move(loc);
        this.command = command || 'Check out ';
        this.interact = interact || function(){alert('This is '+this.name); this.loc.interact()};
    }
    move(to, from) {
        if (from) {
            from.removeItem(this)
        }
        to.addItem(this);
        this.loc = to;
    }

}