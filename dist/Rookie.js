"use strict";
exports.__esModule = true;
exports.Rookie = void 0;
var lodash_1 = require("lodash");
var utils_1 = require("./utils");
var constants_1 = require("./constants");
var Rookie = /** @class */ (function () {
    function Rookie(id, distribution) {
        this.id = id;
        var weights = [];
        var i = 0;
        for (i; i < 10; i++) {
            weights.push(distribution.probabilityBetween(i, i + 1));
        }
        this.buildNumbericProps(weights);
        this.qualitativeProps(weights);
    }
    Rookie.prototype.buildNumbericProps = function (weights) {
        var _this = this;
        constants_1.numericProps.forEach(function (prop) {
            _this[prop] = (0, utils_1.weightedRandom)(weights) + 1;
        });
    };
    Rookie.prototype.qualitativeProps = function (weights) {
        this.height = constants_1.heightLabels[(0, utils_1.weightedRandom)((0, lodash_1.map)((0, lodash_1.chunk)(weights, 2), lodash_1.sum))];
        this.weight = constants_1.weightLabels[(0, utils_1.weightedRandom)((0, lodash_1.map)((0, lodash_1.chunk)(weights, 2), lodash_1.sum))];
    };
    Rookie.prototype.allAttributes = function () {
        return [
            'id',
            'height',
            'weight',
            'stamina',
            'speed',
            'strength',
            'agility',
            'creativity',
            'influence',
            'aggression',
            'teamwork',
        ];
    };
    Rookie.prototype.buildMetadata = function () {
        var _this = this;
        return {
            image: constants_1.IPFS_BASE_PATH + "/" + this.id,
            attributes: this.allAttributes().map(function (propName) { return ({
                "trait_type": (0, lodash_1.capitalize)(propName),
                "value": _this[propName]
            }); })
        };
    };
    return Rookie;
}());
exports.Rookie = Rookie;
