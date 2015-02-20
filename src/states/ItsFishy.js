'use strict';

var Obstacle = require('../components/Obstacle.js');
var VisualTimer = require('../components/VisualTimer.js');
var Fish = require('../components/Fish.js');
var Killer = require('../components/Killer.js');

var ItsFishy = function () {
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

    this.killers = null;

    this.lastFish = null;
};

ItsFishy.prototype = {

    loadPhysics: function () {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
    },

    loadInput: function () {
        this.game.inputEnabled = true;
    },

    reloadBread: function () {
        this.breadCrumbAvailable = true;
    },

    loadBreadCrumbReloader: function () {
        this.breadcrumbReloader = new VisualTimer(this.visualTimerOptions);

        this.game.time.events.loop(
            Phaser.Timer.SECOND * this.breadCrumbSeconds,
            this.reloadBread,
            this
        );

        this.breadcrumbReloader.start();
    },

    initializeComponentOptions: function () {
        this.automataOptions = {
            seek: {
                enabled: true,
                priority: 1,
                target: this.breadcrumbs
            },
            flocking: {
                enabled: true,
                flock: this.fish,
                priority: 2
            }
        };
        this.visualTimerOptions = {
            game: this.game,
            x: 650,
            y: 0,
            type: 'up',
            seconds: this.breadCrumbSeconds,
            onComplete: function() {
                // called in context of timer, thats ok
                this.reset();
                this.start();
            }
        };
    },

    create: function() {
        this.obstacles = this.game.add.group();
        this.fish = this.game.add.group();
        this.breadcrumbs = this.game.add.group();

        this.initializeComponentOptions();

        this.loadPhysics();
        this.loadInput();
        this.loadBreadCrumbReloader();

        var demoObstacle = new Obstacle(this.game, 300, 300);

        var demoObstacle2 = new Obstacle(this.game, 400, 400);

        this.obstacles.add(demoObstacle);
        this.obstacles.add(demoObstacle2);

        this.killers = this.game.add.group();
        var demoKiller = new Killer(this.game, 200, 100);
        demoKiller.body.onBeginContact.add(function(body) {
            if(this.fish.getIndex(body.sprite) != -1) {
                body.sprite.kill();
            }

        }, this);
        this.killers.add(demoKiller);

        this.game.automata.setOptions(this.automataOptions);


        for (var i = 0; i < 10; i++) {
            this.fish.add(this.lastFish = new Fish(this.game, Math.random() * 600, Math.random() * 400));
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


            this.game.physics.p2.enable(bread);
            bread.body.static = true;

            bread.body.onBeginContact.add(function(body) {
                console.log(body);
                if(this.fish.getIndex(body.sprite) != -1) {
                    bread.kill();
                }
            }, this);

            this.game.time.events.add(
                Phaser.Timer.SECOND * this.breadCrumLifespan,
                this.removeBread,
                this,
                bread.id
            );

        }
    },

    update: function() {
        this.fish.forEach(function(fish) {
            this.game.automata.setSprite(fish);
            this.breadcrumbs.forEach(function(bread) {
                this.game.automata.seek(bread);
            }, this);
            this.game.automata.update();
        }, this);

        if (game.input.activePointer.isDown) {
            this.addBread();
        }
    },

    render: function() {
        // this.fish.forEach(function(fish) {
        //     this.game.debug.spriteBounds(fish);
        // }, this);
        // this.obstacles.forEach(function(fish) {
        //     this.game.debug.spriteBounds(fish);
        // }, this);
    },
};

module.exports = ItsFishy;