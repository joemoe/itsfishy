'use strict';

var Obstacle = require('../components/Obstacle.js');
var Fish = require('../components/Fish.js');
var Killer = require('../components/Killer.js');
var Bread = require('../components/Bread.js');
var SpeedBread = require('../components/SpeedBread.js');
var CombinedKiller = require('../components/CombinedKiller.js');
var CombinedObstacle = require('../components/CombinedObstacle.js');
var Floater = require('../components/Floater.js');
var config = require('../components/Configuration.js');

var BREAD_STATE = {
    EMPTY: 1,
    BREAD: 2,
    SPEEDBREAD: 3
};

var ItsFishy = function () {
    this.breadCrumbReloadTime = config.breadCrumbDefaultReloadTime;
    this.cameraSpeed = config.defaultCameraSpeed; // pixel per update
    this.gameOverFishAmount = config.fishDefaultGameOverAmount;

    this.background;

    /** @type {Phaser.Group} */
    this.fish = null;
    this.obstacles = null;

    this.breadCrumbAvailable = BREAD_STATE.BREAD;
    this.breadCrumbReloader = null;
    /** @type {Phaser.Group} */
    this.breadcrumbs = null;
    this.killers = null;
    this.combineds = null;
    this.survivors = 0;

    this.land = null;
    this.level = config.defaultLevel;
};

ItsFishy.prototype = {

    init: function(level) {
        this.level = level;
    },

    loadPhysics: function () {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
    },

    loadInput: function () {
        this.game.inputEnabled = true;
    },

    reloadBread: function () {
        this.breadCrumbAvailable = Math.random() * 10 > 9 ? BREAD_STATE.SPEEDBREAD : BREAD_STATE.BREAD;
        this.breadCrumpLoader.animations.play(this.breadCrumbAvailable == BREAD_STATE.BREAD ? 'bread' : 'speedbread');
    },

    loadBreadCrumbReloader: function () {
        this.breadCrumpLoader = this.game.add.sprite(800 - 79 - 10, 10, "breadcrumb-sprite");
        this.breadCrumpLoader.fixedToCamera = true;
        this.breadCrumpLoader.animations.add('empty', [0]);
        this.breadCrumpLoader.animations.add('bread', [1]);
        this.breadCrumpLoader.animations.add('speedbread', [2]);
        this.breadCrumpLoader.animations.play('bread', false);

        this.game.time.events.loop(
            Phaser.Timer.SECOND * this.breadCrumbReloadTime,
            this.reloadBread,
            this
        );

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

    loadLevel: function () {
        var level = this.game.cache.getJSON(this.level);
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
        var level = this.game.cache.getJSON(this.level);
        this.goal = this.game.add.sprite(
            level.world.width - 80,
            0,
            'goal'
        );
    },

    loadFish: function () {
        var offset = config.fishRandomCreateBorder;
        var width = config.gameWidth - config.fishRandomCreateBorder * 2;
        var height = config.gameHeight - config.fishRandomCreateBorder * 2;
        var level = this.game.cache.getJSON(this.level);

        for (var i = 0; i < level.world.fishAmount; i++) {
            this.fish.add(new Fish(
                this.game,
                offset + Math.random() * width,
                offset + Math.random() * height
            ));
        }
    },

    initializeGame: function() {
        var level = this.game.cache.getJSON(this.level);
        this.background = this.game.add.tileSprite(
            0,
            0,
            level.world.width,
            level.world.height,
            'background'
        );
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


        this.loadLevel();
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
        if (this.breadCrumbAvailable != BREAD_STATE.EMPTY) {


            var bread;

            if (this.breadCrumbAvailable == BREAD_STATE.SPEEDBREAD) {
                bread = new SpeedBread(this.game);
            } else {
                bread = new Bread(this.game);
            }

            this.breadCrumbAvailable = BREAD_STATE.EMPTY;
            this.breadCrumpLoader.animations.play('empty');
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
            if (this.survivors > 0) {

                console.debug(this.fish.countLiving());
                console.debug(this.survivors);

                return this.game.state.start(
                    'GameWon',
                    true,
                    false,
                    undefined,
                    this.survivors + (this.fish.countLiving() * 1)
                );
            }

            console.debug(this.fish.countLiving());
            this.game.state.start(
                'GameOver',
                true,
                false,
                undefined,
                this.fish.countLiving()
            );
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

        if (fish.animations.currentAnim.name != 'normal') {
            return;
        }

        if (fish.body.x < this.game.camera.x + this.land.width) {
            fish.kill();
            return;
        }

        var level = this.game.cache.getJSON(this.level);
        if (fish.body.x > level.world.width - this.goal.width) {
            this.survivors++;
            fish.kill('win');
        }
    },

    render: function() {
        this.game.debug.cameraInfo(this.game.camera, 32, 32);
        // this.fish.forEach(function(fish) {
        //     this.game.debug.spriteBounds(fish);
        // }, this);
        // this.obstacles.forEach(function(fish) {
        //     this.game.debug.spriteBounds(fish);
        // }, this);
    },

    dump: function(key) {
        if (typeof this[key] === 'undefined') {
            return;
        }

        var items = []
        this[key].forEach(function(item) {
            items.push({
                x: item.x,
                y: item.y,
                asset: item.key
            });
        });

        console.debug(JSON.stringify(items));
    },

    makeNew: function(key, x, y, asset) {
        if (typeof this[key] === 'undefined') {
            return;
        }

        var item = null;
        switch (key) {
            case 'obstacles':
                item = new Obstacle(this.game, x, y, asset);
                return this.obstacles.add(item);
            case 'killers':
                item = new Killer(this.game, x, y, asset);
                return this.killers.add(item);
        }
    }
};

module.exports = ItsFishy;