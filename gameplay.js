function play() {
    let locs = {
        livingRoom: new Location('living room'),
        bedroom: new Location('bedroom'),
        bathroom: new Location('bathroom'),
        kitchen: new Location('kitchen'),
        heaven: new Location('heaven'),
        hell: new Location('hell')
    };
    let hyperspace = new Location('hyperspace');
    hyperspace.addNeighbors(locs);

    Location.connect(locs.bedroom, locs.livingRoom);
    Location.connect(locs.livingRoom, locs.bathroom);
    Location.connect(locs.livingRoom, locs.kitchen);

    let items = {
        watch: new Item(
            'watch',
            locs.bedroom,
            'Watch ',
            function () {
                let date = new Date();
                ui.userInput(
                    "It's " + date.getHours() + ':' + date.getMinutes(),
                    function (userInput, loc) {
                        loc.interact();
                    },
                    this.loc
                );
            }),

        teleporter: new Item('teleporter',
            locs.bathroom,
            'Use ',
            function () {

                ui.userInput(
                    'Please enter password',
                    function (password, loc) {

                        if (password === 'Do geese see God?') {
                            ui.userInput('Proceed into hyperspace? (Probability of fatal error: 2*10^-1)',
                                function (userInput, loc) {
                                    if (userInput.toLowerCase() === 'yes') {
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
                                    //If user does not wish to proceed into hyperspace, go back to loc
                                    else {
                                        loc.interact();
                                    }
                                },
                                loc
                            )
                        }
                        else {
                            ui.userInput(
                                'Antimatter security system triggered.',
                                function () {
                                    locs.hell.interact();
                                }
                            );
                        }
                    },
                    this.loc
                );

            }
        ),

        cat: new Item('cat',
            locs.livingRoom,
            'Pet ',
            function () {
                ui.userInput(
                    'Cat successfully petted.',
                    function (userInput, cat) {
                        let loc = cat.loc;
                        cat.moveRandom();
                        loc.interact();
                    },
                    this
                );
            }
        ),

        bob: new Item('Bob',
            locs.livingRoom,
            'Talk to ',
            function () {
                ui.userInput(
                    'Bob: "Hey, my name is Bob, did you know that\'s a palindrome?"',
                    function (userInput, bob) {

                        let talkToBob = function (name, bob, talkToBob) {
                            name.replace(' ', '').toLowerCase();
                            if (name) {
                                //You have to be more creative than that
                                if (name === 'bob') {
                                    ui.userInput('Bob: "Yeah, right."', talkToBob, bob, talkToBob);
                                }

                                //Bob knows the password to the teleporter
                                else if ((name.includes('password') || name.includes('code')) && name.includes('teleport')) {
                                    ui.userInput(
                                        'Bob: "Do geese see God?"',
                                        function (userInput, loc) {
                                            loc.interact()
                                        },
                                        bob.loc
                                    );
                                }

                                //If your name is a palindrome Bob will be satisfied and leave you alone
                                else if (name === name.split('').reverse().join('')) {
                                    ui.userInput(
                                        'Bob: "Oh, cool, that\'s a palindrome, bye."',
                                        function (userInput, bob) {
                                            let loc = bob.loc;
                                            bob.moveRandom();
                                            loc.interact();
                                        },
                                        bob
                                    );
                                }
                                //If it isn't you'll have to try harder
                                else {
                                    ui.userInput(
                                        "Bob: That's not a palindrome though.",
                                        function (userInput, bob) {
                                            //One in five risk that Bob dies
                                            if (Math.random() < .2) {
                                                let loc = bob.loc;
                                                //Bob doesn't seem like a nice guy
                                                bob.move(locs.hell);
                                                userInput('Bob was killed by the non-palindromity of your name.',
                                                function(userInput, loc){
                                                    loc.interact();
                                                },
                                                bob.loc
                                                );
                                                loc.interact();
                                            }
                                            else {
                                                ui.userInput(
                                                    'Bob: "What\'s your name?"',
                                                    talkToBob,
                                                    bob,
                                                    talkToBob
                                                );
                                            }
                                        },
                                        bob
                                    );
                                }
                            }
                        }
                        ui.userInput(
                            'Bob: "What\'s your name?"',
                            talkToBob,
                            bob,
                            talkToBob
                        );
                    },
                    this
                );
            }

        ),

        god: new Item('God',
            locs.heaven,
            'Talk to '
        ),

        satan: new Item('Satan',
            locs.hell,
            'Poke ',
            function () {
                ui.userInput(

                    'Satan: "Ouch!"',
                    function (userInput, loc) {
                        loc.interact()
                    },
                    this.loc
                );
            }
        ),

        chair: new Item('chair',
            locs.kitchen,
            'Sit on ',
            function () {
                ui.userInput(
                    'You sit on chair.',
                    function (userInput, chair) {
                        ui.userInput(
                            'Keep sitting on chair?',
                            function (userInput, chair) {
                                if (userInput.toLowerCase() === 'no') {
                                    chair.loc.interact();
                                }
                                else {
                                    chair.interact();
                                }
                            },
                            chair
                        );
                    },
                    this
                )
            }
        ),

        //The following items don't really do anything
        steve: new Item('Steve', locs.bathroom),
        cloud: new Item('cloud', locs.heaven),
        demon: new Item('demon', locs.hell)
    };
    if (Math.random() > 1 / 4) items.cat.moveRandom();


    locs.bedroom.interact();
}