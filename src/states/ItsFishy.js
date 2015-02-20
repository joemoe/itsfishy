'use strict';

var Obstacle = require('../components/Obstacle.js');
var VisualTimer = require('../components/VisualTimer.js');

var ItsFishy = function (game) {
    this.score = 0;
    this.breadCrumbSeconds = 3;
    this.breadCrumLifespan = 5;
    /** @type {Phaser.Group} */
    this.fish = null;
    this.obstacles = null;

    this.breadCrumbAvailable = false;
    this.breadcrumbReloader = null;
    /** @type {Phaser.Group} */
    this.breadcrumbs = null;
};

ItsFishy.prototype = {

    loadPhysics: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    },

    loadInput: function () {
        this.game.inputEnabled = true;
    },

    reloadBread: function () {
        this.breadCrumbAvailable = true;
    },

    loadBreadCrumbReloader: function () {
        this.breadcrumbReloader = new VisualTimer({
            game: this.game,
            x: 650,
            y: 0,
            type: 'up',
            seconds: this.breadCrumbSeconds,
            onComplete: function() {
                this.reset();
                this.start();
            }
        });

        this.game.time.events.loop(
            Phaser.Timer.SECOND * this.breadCrumbSeconds,
            this.reloadBread,
            this
        );

        this.breadcrumbReloader.start();
    },

    create: function() {
        this.loadPhysics();
        this.loadInput();
        this.loadBreadCrumbReloader();

        this.obstacles = this.game.add.group();
        this.fish = this.game.add.group();
        this.breadcrumbs = this.game.add.group();


        var demoObstacle = new Obstacle(this.game, 300, 300);

        var demoObstacle2 = new Obstacle(this.game, 400, 400);

        this.obstacles.add(demoObstacle);
        this.obstacles.add(demoObstacle2);


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

        /** demo polygon collision - needs physics assets from Preload.js
        var collisionSprite = this.game.add.sprite(128, 128, 'check');
        this.game.physics.p2.enableBody(collisionSprite, true);

        collisionSprite.body.clearShapes();
        collisionSprite.body.loadPolygon('physicsData', 'check');
         */
    },

    removeBread: function (breadId) {
        var bread = this.breadcrumbs.getFirstAlive();
        if (bread && bread.id === breadId) {
            bread.kill();
        }
    },

    addBread: function () {
        if (this.breadCrumbAvailable) {

            this.breadCrumbAvailable = false;

            var bread = this.breadcrumbs.create(
                this.game.input.x,
                this.game.input.y,
                'breadcrumb'
            );
            bread.id = Math.random();


            this.game.physics.arcade.enable(bread);
            bread.body.immovable = true;

            this.game.time.events.add(
                Phaser.Timer.SECOND * this.breadCrumLifespan,
                this.removeBread,
                this,
                bread.id
            );

        }
    },

    collideBread: function (bread, fish) {
        if (bread) {
            bread.kill();
            return false;
        }
    },

    update: function() {
        this.fish.forEach(function(fish) {
            this.game.automata.setSprite(fish);
            this.game.automata.update();
        }, this);
        this.game.physics.arcade.collide(this.obstacles, this.fish);
        this.game.physics.arcade.collide(
            this.breadcrumbs,
            this.fish,
            this.collideBread,
            null,
            this
        );
        // this.game.state.start('GameOver', true, false, this.score);

        if (game.input.activePointer.isDown) {
            this.addBread();
        }
    }
};

module.exports = ItsFishy;