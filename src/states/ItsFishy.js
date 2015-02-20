'use strict';

var Obstacle = require('../components/Obstacle.js');

var ItsFishy = function (game) {
    this.score = 0;
    this.fish = null;
    this.obstacles = null;
};

ItsFishy.prototype = {

    create: function() {
        this.obstacles = this.game.add.group();

        var demoObstacle = new Obstacle(this.game, 300, 300);

        var demoObstacle2 = new Obstacle(this.game, 400, 400);

        this.obstacles.add(demoObstacle);
        this.obstacles.add(demoObstacle2);


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

            this.game.physics.arcade.enable(newFish);

            newFish.body.collideWorldBounds = true;
            newFish.body.allowGravity = false;
        }
    },

    update: function() {
        this.fish.forEach(function(fish) {
            this.game.automata.setSprite(fish);
            this.game.automata.update();
        }, this);
        this.game.physics.arcade.collide(this.obstacles, this.fish);
        // this.game.state.start('GameOver', true, false, this.score);
    }
};

module.exports = ItsFishy;