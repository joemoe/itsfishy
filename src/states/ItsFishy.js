'use strict';

var ItsFishy = function (game) {
    this.score = 0;
    this.fish = null;
};

ItsFishy.prototype = {

    create: function() {
        this.fish = this.game.add.group();

        this.game.automata.setOptions({
            flocking: {
                enabled: true,
                flock: this.fish
            }
        });

        for (var i = 0; i < 10; i++) {
            var newFish = this.fish.create(
                Math.random() * 600,
                Math.random() * 400,
                'fish'
            );

            this.game.physics.enable(newFish);

            newFish.body.collideWorldBounds = true;
            newFish.body.allowGravity = false;
        }
    },

    update: function() {
        this.fish.forEach(function(fish) {
            this.game.automata.setSprite(fish);
            this.game.automata.update();
        }, this);
        // this.game.state.start('GameOver', true, false, this.score);
    }
};

module.exports = ItsFishy;