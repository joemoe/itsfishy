var GameState = function(game) {
    this.fish = [];
};

GameState.prototype = {

    preload: function() {
        this.load.image('fish', 'assets/sprites/fishright.png');
    },

    create: function() {
        for (var i = 0; i < 10; i++) {
            var newFish = this.add.sprite(Math.random() * 600, Math.random() * 400, 'fish');
            this.fish.push(newFish);
        }
    },

    update: function() {
    },

    render: function() {
    }
};

module.exports = GameState;