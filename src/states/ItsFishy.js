'use strict';

var Obstacle = require('../components/Obstacle.js');
var VisualTimer = require('../components/VisualTimer.js');
var Fish = require('../components/Fish.js');
var Killer = require('../components/Killer.js');
var Bread = require('../components/Bread.js');
var SpeedBread = require('../components/SpeedBread.js');
var CombinedKiller = require('../components/CombinedKiller.js');
var CombinedObstacle = require('../components/CombinedObstacle.js');
var Floater = require('../components/Floater.js');
var config = require('../components/Configuration.js');

var ItsFishy = function () {
    this.breadCrumbReloadTime = config.breadCrumbDefaultReloadTime;
    this.cameraSpeed = config.defaultCameraSpeed; // pixel per update
    this.gameOverFishAmount = config.fishDefaultGameOverAmount;

    this.background;

    /** @type {Phaser.Group} */
    this.fish = null;
    this.obstacles = null;

    this.breadCrumbAvailable = false;
    this.breadcrumbReloader = null;
    /** @type {Phaser.Group} */
    this.breadcrumbs = null;
    this.killers = null;
    this.combineds = null;

    this.land = null;
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
            Phaser.Timer.SECOND * this.breadCrumbReloadTime,
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
            seconds: this.breadCrumbReloadTime,
            onComplete: function () {
                // called in context of timer, thats ok
                this.reset();
                this.start();
            }
        };
    },

    loadStats: function () {
        this.scoreText = this.game.add.text(
            0,
            0,
            '',
            config.statsTextStyle
        );
        this.scoreText.fixedToCamera = true;
    },

    loadObstacles: function (obstacles) {
        for (var i = 0; i < obstacles.length; i++) {
            var obstacle = new Obstacle(this.game, obstacles[i].x, obstacles[i].y, obstacles[i].asset);
            this.obstacles.add(obstacle);
        }
    },

    loadDeathZones: function (deathZones) {
        for (var i = 0; i < deathZones.length; i++) {
            var deathZone = new Killer(this.game, deathZones[i].x, deathZones[i].y, deathZones[i].asset);
            this.killers.add(deathZone);
        }
    },

    loadFloaters: function (floaters) {
        for (var i = 0; i < floaters.length; i++) {
            var floater = new Floater(this.game, floaters[i].x, floaters[i].y, floaters[i].asset);
            this.floaters.add(floater);
        }
    },

    loadCombined: function(combineds) {
        for(var i = 0; i < combineds.length; i++) {
            var combinedObstacle = new CombinedObstacle(this.game, combineds[i].obstacle.x, combineds[i].obstacle.y);
            this.combineds.add(combinedObstacle);

            var combinedKiller = new CombinedKiller(this.game, combineds[i].killer.x, combineds[i].killer.y, combinedObstacle);
            this.combineds.add(combinedKiller);
            combinedKiller.body.onBeginContact.add(function (body) {
                if (this.fish.getIndex(body.sprite) != -1) {
                    combinedKiller.fishDetonation(body.sprite);
                }
            }, this);

        }
    },

    loadLevel: function (levelKey) {
        var level = this.game.cache.getJSON(levelKey);
        this.game.world.setBounds(0, 0, level.world.width, level.world.height);

        this.loadPhysics();

        this.loadLand();

        if (level.hasOwnProperty('obstacles')) {
            this.loadObstacles(level.obstacles);
        }
        if (level.hasOwnProperty('deathZones')) {
            this.loadDeathZones(level.deathZones);
        }
        if(level.hasOwnProperty('combined')) {
            this.loadCombined(level.combined);
        }
        if(level.hasOwnProperty('floaters')) {
            this.loadFloaters(level.floaters);
        }


        if (level.world.hasOwnProperty('cameraSpeed')) {
            this.cameraSpeed = level.world.cameraSpeed;
        }
        if (level.world.hasOwnProperty('gameOverFishAmount')) {
            this.gameOverFishAmount = level.world.gameOverFishAmount;
        }
        if (level.world.hasOwnProperty('breadCrumbLifespan')) {
            this.breadCrumbLifespan = level.world.breadCrumbLifespan;
        }
        if (level.world.hasOwnProperty('breadCrumbReloadTime')) {
            this.breadCrumbReloadTime = level.world.breadCrumbReloadTime;
        }
    },

    loadLand: function() {
        this.land = this.game.add.sprite(
            0, 0,
            'land'
        );
        this.land.fixedToCamera = true;
    },

    loadFish: function () {
        var offset = config.fishRandomCreateBorder;
        var width = config.gameWidth - config.fishRandomCreateBorder * 2;
        var height = config.gameHeight - config.fishRandomCreateBorder * 2;

        for (var i = 0; i < 10; i++) {
            this.fish.add(new Fish(
                this.game,
                offset + Math.random() * width,
                offset + Math.random() * height
            ));
        }
    },

    initializeGame: function() {
        this.background = this.game.add.tileSprite(0, 0, 4000, 600, 'background');
    },

    initializeGroups: function () {
        this.obstacles = this.game.add.group();
        this.fish = this.game.add.group();
        this.breadcrumbs = this.game.add.group();
        this.killers = this.game.add.group();
        this.combineds = this.game.add.group();
        this.floaters = this.game.add.group();
    },

    create: function () {
        this.initializeGame();
        this.initializeGroups();

        this.initializeComponentOptions();


        this.loadLevel('level1');
        this.loadStats();
        this.loadInput();
        this.loadBreadCrumbReloader();


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

            var bread;

            if (game.input.keyboard.isDown(
                    Phaser.Keyboard.SPACEBAR
                )) {
                bread = new SpeedBread(this.game);
            } else {
                bread = new Bread(this.game);
            }

            this.breadcrumbs.add(bread);
        }
    },

    update: function () {

        if (game.input.activePointer.isDown) {
            this.addBread();
        }

        this.updateStats();

        this.updateFish();

        this.game.camera.x += this.cameraSpeed;
    },

    updateStats: function () {
        var alive = this.fish.countLiving();
        this.scoreText.setText(alive);
        if (alive <= this.gameOverFishAmount) {
            this.game.state.start('GameOver', true, false, this.fish.countLiving());
            //this.game.state.start('GameWon', true, false, this.fish.countLiving());
        }
    },

    updateFish: function () {
        this.fish.forEachAlive(this.updateEachFish, this);
        this.game.automata.setSprite(null);
    },

    updateEachFish: function (fish) {
        this.game.automata.setSprite(fish);
        this.game.automata.update();
        fish.body.rotation = Math.atan2(fish.body.velocity.y, fish.body.velocity.x);

        if(fish.body.x < this.game.camera.x + this.land.width) fish.kill();
    },

    render: function() {
        this.game.debug.cameraInfo(this.game.camera, 32, 32);
        // this.fish.forEach(function(fish) {
        //     this.game.debug.spriteBounds(fish);
        // }, this);
        // this.obstacles.forEach(function(fish) {
        //     this.game.debug.spriteBounds(fish);
        // }, this);
    }
};

module.exports = ItsFishy;