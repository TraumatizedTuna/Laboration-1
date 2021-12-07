function play() {
    let locs = {
        livingRoom: new Location('living room'),
        bedroom: new Location('bedroom'),
        bathroom: new Location('bathroom'),
        kitchen: new Location('Kitchen'),
        heaven: new Location('heaven'),
        hell: new Location('hell')
    };
    let hyperspace = new Location('hyperspace');
    hyperspace.addNeighbors(locs);

    Location.neighborize(locs.bedroom, locs.livingRoom);
    Location.neighborize(locs.livingRoom, locs.bathroom);
    Location.neighborize(locs.livingRoom, locs.kitchen);

    let items = {
        watch: new Item(
            'watch',
            locs.bedroom,
            'Watch ',
            function () {
                let date = new Date();
                alert("It's " + date.getHours() + ':' + date.getMinutes());
                this.loc.interact();
            }),

        teleporter: new Item('teleporter',
            locs.bathroom,
            'Use ',
            function () {
                let password = prompt('Please enter password');
                if (password === 'Do geese see God?') {
                    if (confirm('Proceed into hyperspace? (Probability of fatal error: 2*10^-1)')) {
                        if (Math.random() < .2) {
                            //50/50 between heaven and hell
                            if (Math.random() < .5) {
                                locs.heaven.interact();
                            }
                            else {
                                locs.hell.interact();
                            }
                        }
                        //If there's no fatal error, move on to hyperspace
                        else {
                            hyperspace.interact();
                        }
                    }
                    else {
                        this.loc.interact();
                    }
                }
                else {
                    alert('Antimatter security system triggered.');
                    locs.hell.interact();
                }

            }
        ),

        cat: new Item('cat',
            locs.livingRoom,
            'Pet ',
            function () {
                alert('Successfully petted cat.');
                let loc = this.loc;
                this.moveRandom();
                loc.interact();
            }
        ),

        bob: new Item('Bob',
            locs.livingRoom,
            'Talk to ',
            function () {
                prompt('"Hey, my name is Bob, did you know that\'s a palindrome?"');
                while (true) {
                    let name = prompt('"What\'s your name?"').replace(' ', '').toLowerCase();
                    if (name) {
                        //You have to be more creative than that
                        if (name === 'bob') {
                            alert('"Yeah, right."');
                        }

                        //Bob knows the password to the teleporter
                        else if ((name.includes('password') || name.includes('code')) && name.includes('teleport')) {
                            alert('"Do geese see God?"');
                        }

                        //If your name is a palindrome Bob will be satisfied and leave you alone
                        else if (name === name.split('').reverse().join('')) {
                            alert('"Oh, cool, that\'s a palindrome, bye."');
                            let loc = this.loc;
                            this.moveRandom();
                            loc.interact();
                        }
                        //If it isn't you'll have to try harder
                        else {
                            alert("That's not a palindrome though.");
                            //One in five risk that Bob dies
                            if (Math.random() < .2) {
                                let loc = this.loc;
                                //Bob doesn't seem like a nice guy
                                this.move(locs.hell);
                                alert('Bob was killed by the non-palindromity of your name.');
                                loc.interact();
                            }
                        }
                    }
                }
            }
        ),

        god: new Item('God',
            locs.heaven,
            'Talk to ',
            function () {
                while (prompt());
                this.loc.interact();
            }
        ),

        satan: new Item('Satan',
            locs.hell,
            'Poke ',
            function () {
                alert('"Ouch!"');
                this.loc.interact();
            }
        ),

        chair: new Item('chair',
            locs.kitchen,
            'Sit on ',
            function () {
                do {
                    alert('You sit on chair.');
                } while (confirm('Keep sitting on chair?'));
                this.loc.interact();
            }
        ),

        //The following items don't really do anything
        steve: new Item('Steve', locs.bathroom),
        cloud: new Item('cloud', locs.heaven),
        demon: new Item('demon', locs.hell)
    };
    if (Math.random() > 1 / 3) items.cat.moveRandom();


    locs.bedroom.interact();
}