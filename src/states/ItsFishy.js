'use strict';

var VisualTimer = require('../components/VisualTimer.js');

var ItsFishy = function (game) {
    this.score = 0;
    this.breadCrumbSeconds = 3;
    this.breadCrumLifespan = 5;
    /** @type {Phaser.Group} */
    this.fish = null;

    this.breadCrumbAvailable = false;
    this.breadcrumbReloader = null;
    /** @type {Phaser.Group} */
    this.breadcrumbs = null;
};

ItsFishy.prototype = {

    loadPhysics: function () {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        //set some initial gravity
        this.game.physics.p2.gravity.y = 500;
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

        this.fish = this.game.add.group();
        this.breadcrumbs = this.game.add.group();

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

        /** demo polygon collision - needs physics assets from Preload.js
        var collisionSprite = this.game.add.sprite(128, 128, 'check');
        this.game.physics.p2.enableBody(collisionSprite, true);

        collisionSprite.body.clearShapes();
        collisionSprite.body.loadPolygon('physicsData', 'check');
         */
    },

    removeBread: function () {
        var bread = this.breadcrumbs.getFirstAlive();
        bread.kill();
    },

    addBread: function () {
        if (this.breadCrumbAvailable) {

            this.breadCrumbAvailable = false;

            this.breadcrumbs.create(
                this.game.input.x,
                this.game.input.y,
                'breadcrumb'
            );

            this.game.time.events.add(
                Phaser.Timer.SECOND * this.breadCrumLifespan,
                this.removeBread,
                this
            );

        }
    },

    update: function() {
        this.fish.forEach(function(fish) {
            this.game.automata.setSprite(fish);
            this.game.automata.update();
        }, this);
        // this.game.state.start('GameOver', true, false, this.score);

        if (game.input.activePointer.isDown) {
            this.addBread();
        }
    }
};

module.exports = ItsFishy;