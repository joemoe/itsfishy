'use strict';

var Obstacle = require('../components/Obstacle.js');
var VisualTimer = require('../components/VisualTimer.js');
var Fish = require('../components/Fish.js');
var Killer = require('../components/Killer.js');

var ItsFishy = function () {
    this.score = 0;
    this.breadCrumbSeconds = 3;
    this.breadCrumLifespan = 5;
    this.cameraSpeed = 1; // pixel per update

    /** @type {Phaser.Group} */
    this.fish = null;
    this.obstacles = null;

    this.breadCrumbAvailable = false;
    this.breadcrumbReloader = null;
    /** @type {Phaser.Group} */
    this.breadcrumbs = null;

    this.killers = null;
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
            fixedToCamera: true,
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

    loadObstacles: function (obstacles) {
        for (var i = 0; i < obstacles.length; i++) {
            var obstacle = new Obstacle(this.game, obstacles[i].x, obstacles[i].y);
            this.obstacles.add(obstacle);
        }
    },

    loadDeathZones: function (deathZones) {
        for (var i = 0; i < deathZones.length; i++) {
            var deathZone = new Killer(this.game, deathZones[i].x, deathZones[i].y);
            this.killers.add(deathZone);
        }
    },

    loadLevel: function (levelKey) {
        var level = game.cache.getJSON(levelKey);
        this.game.world.setBounds(0, 0, level.world.width, level.world.height);

        this.loadObstacles(level.obstacles);
        this.loadDeathZones(level.deathZones);
    },

    loadFish: function () {
        for (var i = 0; i < 10; i++) {
            this.fish.add(new Fish(this.game, Math.random() * 600, Math.random() * 400));
        }

        /** demo polygon collision - needs physics assets from Preload.js
         var collisionSprite = this.game.add.sprite(128, 128, 'check');
         this.game.physics.p2.enableBody(collisionSprite, true);

         collisionSprite.body.clearShapes();
         collisionSprite.body.loadPolygon('physicsData', 'check');
         */
    },

    initializeGroups: function () {
        this.obstacles = this.game.add.group();
        this.fish = this.game.add.group();
        this.breadcrumbs = this.game.add.group();
        this.killers = this.game.add.group();
    },

    create: function() {
        this.initializeGroups();

        this.initializeComponentOptions();

        this.loadPhysics();
        this.loadInput();
        this.loadBreadCrumbReloader();

        this.loadLevel('level1');

        this.loadFish();

        this.game.automata.setOptions(this.automataOptions);
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
                this.game.input.x + this.game.camera.x,
                this.game.input.y + this.game.camera.y,
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
            this.breadcrumbs.forEach(function(bread) {
                this.game.automata.seek(bread);
            }, this);
            this.game.automata.update();
        }, this);

        this.game.physics.arcade.collide(this.obstacles, this.fish);
        this.game.physics.arcade.collide(this.killers, this.fish, function(killer, fish) {fish.kill();});
        this.game.physics.arcade.collide(
            this.breadcrumbs,
            this.fish,
            this.collideBread,
            null,
            this
        );
        // this.game.state.start('GameOver', true, false, this.score);

        if (this.game.input.activePointer.isDown) {
            this.addBread();
        }

        this.game.camera.x += this.cameraSpeed;
    }
};

module.exports = ItsFishy;