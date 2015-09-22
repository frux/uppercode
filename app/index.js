var generators = require('yeoman-generator'),
    fs = require('fs');

module.exports = generators.Base.extend({
    constructor: function(){
        generators.Base.apply(this, arguments);
    },
    prompting: function(){
        var done = this.async();

        this.prompt({
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: this.appname
        }, function(answers){
            done();
        }.bind(this));
    },
    writing: function(){
        this.template('hooks/pre-commit', '.git/hooks/pre-commit');
        this.template('uppercode/pre-commit.js', 'uppercode/pre-commit.js');

        setTimeout((function(){
            fs.chmodSync(this.destinationPath('.git/hooks/pre-commit'), '0755');
        }).bind(this), 100);
    },
    install: function(){}
});