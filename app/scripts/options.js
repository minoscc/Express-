'use strict';

/**
 * optionApp Module
 *
 * setting page
 */
angular.module('optionApp', ['explus']).controller('optionController', function ($scope, postsService) {

    chrome.storage.sync.get({'check': true, 'auto': true, 'delay': 30, sync: false }, function (conf) {
        $scope.conf = conf;
        $scope.$apply();
    })

    $scope.delay_options = [10, 30, 60, 120];
    $scope.markFilter = '';

    $scope.removeMark = function (id) {
        postsService.removeMark(id);
    }

    $scope.updateMark = function (id) {
        postsService.updateMark(id).then(function (mark) {
        })
    }

    $scope.setFilter = function (f) {
        $scope.markFilter = f;
    }

    $scope.onChange = function (t) {
        if (t === 'auto')
            chrome.storage.sync.set({'auto': $scope.conf.auto, 'delay': $scope.conf.delay}, function () {
                console.log("settings saved!");
                chrome.runtime.sendMessage({});
            });
        else if (t === 'check')
            chrome.storage.sync.set({'check': $scope.conf.check}, function () {
                console.log("settings saved!");
            });
    }

}).filter('cut', function () {
    return function (value, max, tail) {
        if (!value) return ''

        if (value.length > max) {
            value = value.substr(0, max);
        }
        else {
            return value
        }
        return value + (tail || ' ...' );
    }
}).filter('code2zh', function () {
    var coms = {
        "shunfeng": "顺丰",
        "zhaijisong": "宅急送",
        "zhongtong": "中通",
        "yuantong": "圆通",
        "yunda": "韵达",
        "shentong": "申通",
        "tiantian": "天天",
        "quanfengkuaidi": "全峰",
        "youshuwuliu": "优速",
        "jd": "京东",
        "neweggozzo": "新蛋",
        "xinbangwuliu": "新邦物流",
        "debangwuliu": "德邦物流",
        "huitongkuaidi": "百世汇通",
        "youzhengguonei": "国内邮政",
        "youzhengguoji": "邮政国际",
        "dhl": "DHL(中国)",
        "dhlen": "DHL(国际)",
        "dhlde": "DHL(德国)",
        "ems": "EMS",
        "emsguoji": "EMS(国际)",
        "japanposten": "EMS(日本)",
        "ecmsglobal": "ECMS",
        "ups": "UPS",
        "usps": "USPS"
    }
    return function (value) {
        return coms[value.toLowerCase()]||value;
    }
});
