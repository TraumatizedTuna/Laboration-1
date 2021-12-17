/** A Location object represents a location in the game and keeps track of its items. */
class Location {
    /**
     * Create a new location.
     * @param {string} name - Name of location, will be displayed when you enter it.
     */
    constructor(name) {
        this.name = name;
        this.neighbors = new Set();
        this.items = new Set();
        this.message = 'You are in ' + this.name;
    }
    /**
     * Make neighbors directly accessible from this location (but not vice versa).
     * @param {Location[]} neighbors 
     */
    addNeighbors(neighbors) {
        for (let i in neighbors) {
            this.neighbors.add(neighbors[i]);
        }
    }
    /**
     * Add item to this.items.
     * @param {Item} item 
     */
    addItem(item) {
        this.items.add(item);
    }
    /**
     * Remove item from this.items.
     * @param {Item} item 
     */
    removeItem(item) {
        this.items.delete(item);
    }
    /**
     * interact() is called when you enter this location.
     * this.message will be displayed to user, followed by all available commands.
     */
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
/**
 * Add loc0 and loc1 as neighbors to each other.
 * @param {Location} loc0 
 * @param {Location} loc1 
 */
Location.connect = function (loc0, loc1) {
    loc0.addNeighbors([loc1]);
    loc1.addNeighbors([loc0]);
}
/** Class representing an item. */
class Item {
    /**
     * Create new item and add it to loc.
     * @param {string} name 
     * @param {Location} loc 
     * @param {string} command 
     * @param {function} interact 
     */
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
    /**
     * Move this from this.loc to destination.
     * @param {Location} destination 
     */
    move(destination) {
        if (this.loc) {
            this.loc.removeItem(this)
        }
        destination.addItem(this);
        this.loc = destination;
    }
    /** Move this from this.loc to random neighbor. */
    moveRandom() {
        let locs = Array.from(this.loc.neighbors);
        if (locs.length) {
            this.move(locs[Math.floor(Math.random() * locs.length)]);
        }
    }

}