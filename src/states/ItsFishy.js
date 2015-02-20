'use strict';

var Obstacle = require('../components/Obstacle.js');
var Fish = require('../components/Fish.js');
var Killer = require('../components/Killer.js');

var ItsFishy = function (game) {
    this.score = 0;
    this.fish = null;
    this.obstacles = null;

    this.killers = null;
};

ItsFishy.prototype = {

    create: function() {
        this.obstacles = this.game.add.group();

        var demoObstacle = new Obstacle(this.game, 300, 300);

        var demoObstacle2 = new Obstacle(this.game, 400, 400);

        this.obstacles.add(demoObstacle);
        this.obstacles.add(demoObstacle2);

        this.killers = this.game.add.group();
        var demoKiller = new Killer(this.game, 200, 100);
        this.killers.add(demoKiller);

        this.fish = this.game.add.group();

        this.game.automata.setOptions({
            flocking: {
                enabled: true,
                flock: this.fish
            }
        });

        for (var i = 0; i < 10; i++) {
            this.fish.add(new Fish(this.game, Math.random() * 600, Math.random() * 400));
        }
    },

    update: function() {
        this.fish.forEach(function(fish) {
            this.game.automata.setSprite(fish);
            this.game.automata.update();
        }, this);
        this.game.physics.arcade.collide(this.obstacles, this.fish);
        this.game.physics.arcade.collide(this.killers, this.fish, function(killer, fish) {fish.kill();});
        // this.game.state.start('GameOver', true, false, this.score);
    }
};

module.exports = ItsFishy;