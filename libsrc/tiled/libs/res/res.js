//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var RES;
(function (RES) {
    /**
     * @language en_US
     * Resource term. One of the resources arrays in resource.json.
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ?????????????????? resource.json ??? resources ?????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     */
    var ResourceItem = (function () {
        /**
         * @language en_US
         * Constructor.
         * @param name Name of resource term.
         * @param url URL of resource term.
         * @param type Type of resource term.
         * @version Egret 2.4
         * @platform Web,Native
         * @private
         */
        /**
         * @language zh_CN
         * ???????????????
         * @param name ??????????????????
         * @param url ???????????????????????????
         * @param type ????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         * @private
         */
        function ResourceItem(name, url, type) {
            /**
             * @language en_US
             * Name of the resource term group.
             * @version Egret 2.4
             * @platform Web,Native
             * @private
             */
            /**
             * @language zh_CN
             * ????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             * @private
             */
            this.groupName = "";
            /**
             * @language en_US
             * The raw data object to be referenced.
             * @version Egret 2.4
             * @platform Web,Native
             * @private
             */
            /**
             * @language zh_CN
             * ?????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             * @private
             */
            this.data = null;
            this._loaded = false;
            this.name = name;
            this.url = url;
            this.type = type;
        }
        var d = __define,c=ResourceItem;p=c.prototype;
        d(p, "loaded"
            /**
             * @language en_US
             * Load complete flag.
             * @version Egret 2.4
             * @platform Web,Native
             * @private
             */
            /**
             * @language zh_CN
             * ????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             * @private
             */
            ,function () {
                return this.data ? this.data.loaded : this._loaded;
            }
            ,function (value) {
                if (this.data)
                    this.data.loaded = value;
                this._loaded = value;
            }
        );
        /**
         * @language en_US
         * Turn into a string.
         * @version Egret 2.4
         * @platform Web,Native
         * @private
         */
        /**
         * @language zh_CN
         * ??????????????????
         * @version Egret 2.4
         * @platform Web,Native
         * @private
         */
        p.toString = function () {
            return "[ResourceItem name=\"" + this.name + "\" url=\"" + this.url + "\" type=\"" + this.type + "\"]";
        };
        /**
         * @language en_US
         * Animation configuration file. Currently supports Egret MovieClip file format.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * Animation ??????????????????????????? Egret MovieClip ???????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        ResourceItem.TYPE_ANIMATION = "animation";
        /**
         * @language en_US
         * XML file.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * XML ?????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        ResourceItem.TYPE_XML = "xml";
        /**
         * @language en_US
         * Picture file.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        ResourceItem.TYPE_IMAGE = "image";
        /**
         * @language en_US
         * Binary file.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        ResourceItem.TYPE_BIN = "bin";
        /**
         * @language en_US
         * Text file.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        ResourceItem.TYPE_TEXT = "text";
        /**
         * @language en_US
         * JSON file.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * JSON ?????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        ResourceItem.TYPE_JSON = "json";
        /**
         * @language en_US
         * SpriteSheet file.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * SpriteSheet ?????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        ResourceItem.TYPE_SHEET = "sheet";
        /**
         * @private
         * @language en_US
         * BitmapTextSpriteSheet file.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @private
         * @language zh_CN
         * BitmapTextSpriteSheet ?????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        ResourceItem.TYPE_FONT = "font";
        /**
         * @language en_US
         * Sound file.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        ResourceItem.TYPE_SOUND = "sound";
        return ResourceItem;
    })();
    RES.ResourceItem = ResourceItem;
    egret.registerClass(ResourceItem,"RES.ResourceItem");
})(RES || (RES = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var RES;
(function (RES) {
    /**
     * @class RES.ResourceConfig
     * @classdesc
     * @private
     */
    var ResourceConfig = (function () {
        function ResourceConfig() {
            /**
             * ??????????????????
             */
            this.keyMap = {};
            /**
             * ???????????????
             */
            this.groupDic = {};
            RES["configInstance"] = this;
        }
        var d = __define,c=ResourceConfig;p=c.prototype;
        /**
         * ????????????????????????????????????
         * @method RES.ResourceConfig#getGroupByName
         * @param name {string} ??????
         * @returns {Array<egret.ResourceItem>}
         */
        p.getGroupByName = function (name) {
            var group = new Array();
            if (!this.groupDic[name])
                return group;
            var list = this.groupDic[name];
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var obj = list[i];
                group.push(this.parseResourceItem(obj));
            }
            return group;
        };
        /**
         * ?????????????????????????????????????????????
         * @method RES.ResourceConfig#getRawGroupByName
         * @param name {string} ??????
         * @returns {Array<any>}
         */
        p.getRawGroupByName = function (name) {
            if (this.groupDic[name])
                return this.groupDic[name];
            return [];
        };
        /**
         * ?????????????????????????????????,???????????????????????????????????????????????????????????????????????????
         * ????????????ResourceEvent.CONFIG_COMPLETE????????????????????????????????????
         * @method RES.ResourceConfig#createGroup
         * @param name {string} ????????????????????????????????????
         * @param keys {egret.Array<string>} ???????????????????????????key????????????????????????name?????????sbuKeys???????????????????????????????????????
         * @param override {boolean} ??????????????????????????????????????????,??????false???
         * @returns {boolean}
         */
        p.createGroup = function (name, keys, override) {
            if (override === void 0) { override = false; }
            if ((!override && this.groupDic[name]) || !keys || keys.length == 0)
                return false;
            var groupDic = this.groupDic;
            var group = [];
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                var key = keys[i];
                var g = groupDic[key];
                if (g) {
                    var len = g.length;
                    for (var j = 0; j < len; j++) {
                        var item = g[j];
                        if (group.indexOf(item) == -1)
                            group.push(item);
                    }
                }
                else {
                    item = this.keyMap[key];
                    if (item) {
                        if (group.indexOf(item) == -1)
                            group.push(item);
                    }
                    else {
                        egret.$warn(2000, key);
                    }
                }
            }
            if (group.length == 0)
                return false;
            this.groupDic[name] = group;
            return true;
        };
        /**
         * ????????????????????????
         * @method RES.ResourceConfig#parseConfig
         * @param data {any} ??????????????????
         * @param folder {string} ???????????????????????????
         */
        p.parseConfig = function (data, folder) {
            if (!data)
                return;
            var resources = data["resources"];
            if (resources) {
                var length = resources.length;
                for (var i = 0; i < length; i++) {
                    var item = resources[i];
                    var url = item.url;
                    if (url && url.indexOf("://") == -1)
                        item.url = folder + url;
                    this.addItemToKeyMap(item);
                }
            }
            var groups = data["groups"];
            if (groups) {
                length = groups.length;
                for (i = 0; i < length; i++) {
                    var group = groups[i];
                    var list = [];
                    var keys = group.keys.split(",");
                    var l = keys.length;
                    for (var j = 0; j < l; j++) {
                        var name = keys[j].trim();
                        item = this.keyMap[name];
                        if (item && list.indexOf(item) == -1) {
                            list.push(item);
                        }
                    }
                    this.groupDic[group.name] = list;
                }
            }
        };
        /**
         * ??????????????????????????????????????????
         * @method RES.ResourceConfig#addSubkey
         * @param subkey {string} ????????????????????????
         * @param name {string} ???????????????????????????name??????
         */
        p.addSubkey = function (subkey, name) {
            var item = this.keyMap[name];
            if (item && !this.keyMap[subkey]) {
                this.keyMap[subkey] = item;
            }
        };
        /**
         * ????????????????????????????????????
         */
        p.addItemToKeyMap = function (item) {
            if (!this.keyMap[item.name])
                this.keyMap[item.name] = item;
            if (item.hasOwnProperty("subkeys")) {
                var subkeys = (item.subkeys).split(",");
                item.subkeys = subkeys;
                var length = subkeys.length;
                for (var i = 0; i < length; i++) {
                    var key = subkeys[i];
                    if (this.keyMap[key] != null)
                        continue;
                    this.keyMap[key] = item;
                }
            }
        };
        /**
         * ??????????????????name??????
         * @method RES.ResourceConfig#getType
         * @param key {string} ????????????????????????name?????????sbuKeys??????????????????
         * @returns {string}
         */
        p.getName = function (key) {
            var data = this.keyMap[key];
            return data ? data.name : "";
        };
        /**
         * ????????????????????????
         * @method RES.ResourceConfig#getType
         * @param key {string} ????????????????????????name?????????sbuKeys??????????????????
         * @returns {string}
         */
        p.getType = function (key) {
            var data = this.keyMap[key];
            return data ? data.type : "";
        };
        p.getRawResourceItem = function (key) {
            return this.keyMap[key];
        };
        /**
         * ???????????????????????????
         * @method RES.ResourceConfig#getResourceItem
         * @param key {string} ????????????????????????key?????????sbuKeys??????????????????
         * @returns {egret.ResourceItem}
         */
        p.getResourceItem = function (key) {
            var data = this.keyMap[key];
            if (data)
                return this.parseResourceItem(data);
            return null;
        };
        /**
         * ??????Object?????????ResourceItem??????
         */
        p.parseResourceItem = function (data) {
            var resItem = new RES.ResourceItem(data.name, data.url, data.type);
            resItem.data = data;
            return resItem;
        };
        return ResourceConfig;
    })();
    RES.ResourceConfig = ResourceConfig;
    egret.registerClass(ResourceConfig,"RES.ResourceConfig");
})(RES || (RES = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RES;
(function (RES) {
    /**
     * @class RES.ResourceLoader
     * @classdesc
     * @extends egret.EventDispatcher
     * @private
     */
    var ResourceLoader = (function (_super) {
        __extends(ResourceLoader, _super);
        /**
         * ????????????
         * @method RES.ResourceLoader#constructor
         */
        function ResourceLoader() {
            _super.call(this);
            /**
             * ?????????????????????
             */
            this.thread = 2;
            /**
             * ???????????????????????????
             */
            this.loadingCount = 0;
            /**
             * ???????????????????????????????????????????????????????????????????????????????????????????????????callBack(resItem:ResourceItem):void;
             * @member {Function} RES.ResourceLoader#callBack
             */
            this.callBack = null;
            /**
             * RES???????????????
             * @member {any} RES.ResourceLoader#resInstance
             */
            this.resInstance = null;
            /**
             * ??????????????????????????????,key???groupName
             */
            this.groupTotalDic = {};
            /**
             * ????????????????????????,key???groupName
             */
            this.numLoadedDic = {};
            /**
             * ????????????????????????,key???groupName
             */
            this.itemListDic = {};
            /**
             * ??????????????????,key???groupName
             */
            this.groupErrorDic = {};
            this.retryTimesDic = {};
            this.maxRetryTimes = 3;
            this.failedList = new Array();
            /**
             * ???????????????,key???priority???value???groupName??????
             */
            this.priorityQueue = {};
            /**
             * ??????????????????
             */
            this.lazyLoadList = new Array();
            /**
             * ????????????????????????
             */
            this.analyzerDic = {};
            /**
             * ????????????????????????????????????????????????
             */
            this.queueIndex = 0;
        }
        var d = __define,c=ResourceLoader;p=c.prototype;
        /**
         * ???????????????????????????????????????
         * @method RES.ResourceLoader#isGroupInLoading
         * @param groupName {string}
         * @returns {boolean}
         */
        p.isGroupInLoading = function (groupName) {
            return this.itemListDic[groupName] !== undefined;
        };
        /**
         * ????????????????????????
         * @method RES.ResourceLoader#loadGroup
         * @param list {egret.Array<ResourceItem>} ???????????????
         * @param groupName {string} ??????
         * @param priority {number} ???????????????
         */
        p.loadGroup = function (list, groupName, priority) {
            if (priority === void 0) { priority = 0; }
            if (this.itemListDic[groupName] || !groupName)
                return;
            if (!list || list.length == 0) {
                egret.$warn(2001, groupName);
                var event = new RES.ResourceEvent(RES.ResourceEvent.GROUP_LOAD_ERROR);
                event.groupName = groupName;
                this.dispatchEvent(event);
                return;
            }
            if (this.priorityQueue[priority])
                this.priorityQueue[priority].push(groupName);
            else
                this.priorityQueue[priority] = [groupName];
            this.itemListDic[groupName] = list;
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var resItem = list[i];
                resItem.groupName = groupName;
            }
            this.groupTotalDic[groupName] = list.length;
            this.numLoadedDic[groupName] = 0;
            this.next();
        };
        /**
         * ??????????????????
         * @method RES.ResourceLoader#loadItem
         * @param resItem {egret.ResourceItem} ???????????????
         */
        p.loadItem = function (resItem) {
            this.lazyLoadList.push(resItem);
            resItem.groupName = "";
            this.next();
        };
        /**
         * ???????????????
         */
        p.next = function () {
            while (this.loadingCount < this.thread) {
                var resItem = this.getOneResourceItem();
                if (!resItem)
                    break;
                this.loadingCount++;
                if (resItem.loaded) {
                    this.onItemComplete(resItem);
                }
                else {
                    var analyzer = this.resInstance.$getAnalyzerByType(resItem.type);
                    analyzer.loadFile(resItem, this.onItemComplete, this);
                }
            }
        };
        /**
         * ???????????????????????????
         */
        p.getOneResourceItem = function () {
            if (this.failedList.length > 0)
                return this.failedList.shift();
            var maxPriority = Number.NEGATIVE_INFINITY;
            for (var p in this.priorityQueue) {
                maxPriority = Math.max(maxPriority, p);
            }
            var queue = this.priorityQueue[maxPriority];
            if (!queue || queue.length == 0) {
                if (this.lazyLoadList.length == 0)
                    return null;
                //???????????????????????????????????????????????????????????????
                return this.lazyLoadList.pop();
            }
            var length = queue.length;
            var list;
            for (var i = 0; i < length; i++) {
                if (this.queueIndex >= length)
                    this.queueIndex = 0;
                list = this.itemListDic[queue[this.queueIndex]];
                if (list.length > 0)
                    break;
                this.queueIndex++;
            }
            if (list.length == 0)
                return null;
            return list.shift();
        };
        /**
         * ????????????
         */
        p.onItemComplete = function (resItem) {
            this.loadingCount--;
            var groupName = resItem.groupName;
            if (!resItem.loaded) {
                var times = this.retryTimesDic[resItem.name] || 1;
                if (times > this.maxRetryTimes) {
                    delete this.retryTimesDic[resItem.name];
                    RES.ResourceEvent.dispatchResourceEvent(this.resInstance, RES.ResourceEvent.ITEM_LOAD_ERROR, groupName, resItem);
                }
                else {
                    this.retryTimesDic[resItem.name] = times + 1;
                    this.failedList.push(resItem);
                    this.next();
                    return;
                }
            }
            if (groupName) {
                this.numLoadedDic[groupName]++;
                var itemsLoaded = this.numLoadedDic[groupName];
                var itemsTotal = this.groupTotalDic[groupName];
                if (!resItem.loaded) {
                    this.groupErrorDic[groupName] = true;
                }
                RES.ResourceEvent.dispatchResourceEvent(this.resInstance, RES.ResourceEvent.GROUP_PROGRESS, groupName, resItem, itemsLoaded, itemsTotal);
                if (itemsLoaded == itemsTotal) {
                    var groupError = this.groupErrorDic[groupName];
                    this.removeGroupName(groupName);
                    delete this.groupTotalDic[groupName];
                    delete this.numLoadedDic[groupName];
                    delete this.itemListDic[groupName];
                    delete this.groupErrorDic[groupName];
                    if (groupError) {
                        RES.ResourceEvent.dispatchResourceEvent(this, RES.ResourceEvent.GROUP_LOAD_ERROR, groupName);
                    }
                    else {
                        RES.ResourceEvent.dispatchResourceEvent(this, RES.ResourceEvent.GROUP_COMPLETE, groupName);
                    }
                }
            }
            else {
                this.callBack.call(this.resInstance, resItem);
            }
            this.next();
        };
        /**
         * ??????????????????????????????????????????
         */
        p.removeGroupName = function (groupName) {
            for (var p in this.priorityQueue) {
                var queue = this.priorityQueue[p];
                var length = queue.length;
                var index = 0;
                var found = false;
                var length = queue.length;
                for (var i = 0; i < length; i++) {
                    var name = queue[i];
                    if (name == groupName) {
                        queue.splice(index, 1);
                        found = true;
                        break;
                    }
                    index++;
                }
                if (found) {
                    if (queue.length == 0) {
                        delete this.priorityQueue[p];
                    }
                    break;
                }
            }
        };
        return ResourceLoader;
    })(egret.EventDispatcher);
    RES.ResourceLoader = ResourceLoader;
    egret.registerClass(ResourceLoader,"RES.ResourceLoader");
})(RES || (RES = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var RES;
(function (RES) {
    /**
     * @language en_US
     * The events of resource loading.
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ?????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     */
    var ResourceEvent = (function (_super) {
        __extends(ResourceEvent, _super);
        /**
         * @language en_US
         * Creates an Event object to pass as a parameter to event listeners.
         * @param type  The type of the event, accessible as Event.type.
         * @param bubbles  Determines whether the Event object participates in the bubbling stage of the event flow. The default value is false.
         * @param cancelable Determines whether the Event object can be canceled. The default values is false.
         * @version Egret 2.4
         * @platform Web,Native
         * @private
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????? Event ?????????
         * @param type  ?????????????????????????????? Event.type ?????????
         * @param bubbles  ?????? Event ????????????????????????????????????????????????????????? false???
         * @param cancelable ???????????????????????? Event ????????????????????? false???
         * @version Egret 2.4
         * @platform Web,Native
         * @private
         */
        function ResourceEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            _super.call(this, type, bubbles, cancelable);
            /**
             * @language en_US
             * File number that has been loaded.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            this.itemsLoaded = 0;
            /**
             * @language en_US
             * Total file number to load.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            this.itemsTotal = 0;
            /**
             * @language en_US
             * Resource group name.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            this.groupName = "";
            /**
             * @language en_US
             * An item of information that is finished by the end of a load.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            this.resItem = null;
        }
        var d = __define,c=ResourceEvent;p=c.prototype;
        /**
         * ???????????????EventDispatcher???????????????????????????????????????????????????????????????????????????????????????????????????
         * @method RES.ResourceEvent.dispatchResourceEvent
         * @param target {egret.IEventDispatcher}
         * @param type {string}
         * @param groupName {string}
         * @param resItem {egret.ResourceItem}
         * @param itemsLoaded {number}
         * @param itemsTotal {number}
         * @private
         */
        ResourceEvent.dispatchResourceEvent = function (target, type, groupName, resItem, itemsLoaded, itemsTotal) {
            if (groupName === void 0) { groupName = ""; }
            if (resItem === void 0) { resItem = null; }
            if (itemsLoaded === void 0) { itemsLoaded = 0; }
            if (itemsTotal === void 0) { itemsTotal = 0; }
            var event = egret.Event.create(ResourceEvent, type);
            event.groupName = groupName;
            event.resItem = resItem;
            event.itemsLoaded = itemsLoaded;
            event.itemsTotal = itemsTotal;
            var result = target.dispatchEvent(event);
            egret.Event.release(event);
            return result;
        };
        /**
         * @language en_US
         * Failure event for a load item.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        ResourceEvent.ITEM_LOAD_ERROR = "itemLoadError";
        /**
         * @language en_US
         * Configure file to load and parse the completion event. Note: if a configuration file is loaded, it will not be thrown out, and if you want to handle the configuration loading failure, monitor the CONFIG_LOAD_ERROR event.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? CONFIG_LOAD_ERROR ?????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        ResourceEvent.CONFIG_COMPLETE = "configComplete";
        /**
         * @language en_US
         * Configuration file failed to load.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        ResourceEvent.CONFIG_LOAD_ERROR = "configLoadError";
        /**
         * @language en_US
         * Delay load group resource loading progress event.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        ResourceEvent.GROUP_PROGRESS = "groupProgress";
        /**
         * @language en_US
         * Delay load group resource to complete event. Note: if you have a resource item loading failure, the event will not be thrown, if you want to handle the group load failure, please listen to the GROUP_LOAD_ERROR event.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? GROUP_LOAD_ERROR ?????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        ResourceEvent.GROUP_COMPLETE = "groupComplete";
        /**
         * @language en_US
         * Delayed load group resource failed event.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        ResourceEvent.GROUP_LOAD_ERROR = "groupLoadError";
        return ResourceEvent;
    })(egret.Event);
    RES.ResourceEvent = ResourceEvent;
    egret.registerClass(ResourceEvent,"RES.ResourceEvent");
})(RES || (RES = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var RES;
(function (RES) {
    /**
     * @classic
     * @private
     */
    var AnalyzerBase = (function (_super) {
        __extends(AnalyzerBase, _super);
        function AnalyzerBase() {
            _super.call(this);
            this.resourceConfig = null;
            this.resourceConfig = (RES["configInstance"]);
        }
        var d = __define,c=AnalyzerBase;p=c.prototype;
        /**
         * ??????????????????????????????????????????
         * @method RES.ResourceConfig#addSubkey
         * @param subkey {string} ????????????????????????
         * @param name {string} ???????????????????????????name??????
         */
        p.addSubkey = function (subkey, name) {
            this.resourceConfig.addSubkey(subkey, name);
        };
        /**
         * ????????????????????????
         * @param resItem ???????????????
         * @param compFunc ????????????????????????,??????:compFunc(resItem:ResourceItem):void;
         * @param thisObject ???????????????????????????this??????
         */
        p.loadFile = function (resItem, compFunc, thisObject) {
        };
        /**
         * ???????????????????????????????????????
         * @param name ????????????????????????name?????????
         */
        p.getRes = function (name) {
        };
        /**
         * ??????????????????????????????????????????,???????????????????????????
         * @param name ???????????????????????????name??????
         */
        p.destroyRes = function (name) {
            return false;
        };
        /**
         * ??????????????????????????????????????????????????????
         * @param name {string} ?????????????????????
         */
        AnalyzerBase.getStringPrefix = function (name) {
            if (!name) {
                return "";
            }
            var index = name.indexOf(".");
            if (index != -1) {
                return name.substring(0, index);
            }
            return "";
        };
        /**
         * ??????????????????????????????????????????????????????
         * @param name {string} ?????????????????????
         */
        AnalyzerBase.getStringTail = function (name) {
            if (!name) {
                return "";
            }
            var index = name.indexOf(".");
            if (index != -1) {
                return name.substring(index + 1);
            }
            return "";
        };
        return AnalyzerBase;
    })(egret.HashObject);
    RES.AnalyzerBase = AnalyzerBase;
    egret.registerClass(AnalyzerBase,"RES.AnalyzerBase");
})(RES || (RES = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var RES;
(function (RES) {
    /**
     * @private
     */
    var BinAnalyzer = (function (_super) {
        __extends(BinAnalyzer, _super);
        /**
         * ????????????
         */
        function BinAnalyzer() {
            _super.call(this);
            /**
             * ???????????????????????????
             */
            this.fileDic = {};
            /**
             * ???????????????
             */
            this.resItemDic = [];
            this._dataFormat = egret.HttpResponseType.ARRAY_BUFFER;
            /**
             * Loader?????????
             */
            this.recycler = [];
        }
        var d = __define,c=BinAnalyzer;p=c.prototype;
        /**
         * @inheritDoc
         */
        p.loadFile = function (resItem, compFunc, thisObject) {
            if (this.fileDic[resItem.name]) {
                compFunc.call(thisObject, resItem);
                return;
            }
            var request = this.getRequest();
            this.resItemDic[request.hashCode] = { item: resItem, func: compFunc, thisObject: thisObject };
            request.open(RES.$getVirtualUrl(resItem.url));
            request.send();
        };
        /**
         * ????????????URLLoader??????
         */
        p.getRequest = function () {
            var request = this.recycler.pop();
            if (!request) {
                request = new egret.HttpRequest();
                request.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
                request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
            }
            request.responseType = this._dataFormat;
            return request;
        };
        /**
         * ??????????????????
         */
        p.onLoadFinish = function (event) {
            var request = (event.target);
            var data = this.resItemDic[request.hashCode];
            delete this.resItemDic[request.hashCode];
            var resItem = data.item;
            var compFunc = data.func;
            resItem.loaded = (event.type == egret.Event.COMPLETE);
            if (resItem.loaded) {
                this.analyzeData(resItem, request.response);
            }
            this.recycler.push(request);
            compFunc.call(data.thisObject, resItem);
        };
        /**
         * ????????????????????????????????????
         */
        p.analyzeData = function (resItem, data) {
            var name = resItem.name;
            if (this.fileDic[name] || !data) {
                return;
            }
            this.fileDic[name] = data;
        };
        /**
         * @inheritDoc
         */
        p.getRes = function (name) {
            return this.fileDic[name];
        };
        /**
         * @inheritDoc
         */
        p.hasRes = function (name) {
            var res = this.getRes(name);
            return res != null;
        };
        /**
         * @inheritDoc
         */
        p.destroyRes = function (name) {
            if (this.fileDic[name]) {
                this.onResourceDestroy(this.fileDic[name]);
                delete this.fileDic[name];
                return true;
            }
            return false;
        };
        p.onResourceDestroy = function (resource) {
        };
        return BinAnalyzer;
    })(RES.AnalyzerBase);
    RES.BinAnalyzer = BinAnalyzer;
    egret.registerClass(BinAnalyzer,"RES.BinAnalyzer");
})(RES || (RES = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var RES;
(function (RES) {
    /**
     * @private
     */
    var ImageAnalyzer = (function (_super) {
        __extends(ImageAnalyzer, _super);
        /**
         * ????????????
         */
        function ImageAnalyzer() {
            _super.call(this);
            /**
             * ???????????????????????????
             */
            this.fileDic = {};
            /**
             * ???????????????
             */
            this.resItemDic = [];
            /**
             * Loader?????????
             */
            this.recycler = [];
        }
        var d = __define,c=ImageAnalyzer;p=c.prototype;
        /**
         * @inheritDoc
         */
        p.loadFile = function (resItem, compFunc, thisObject) {
            if (this.fileDic[resItem.name]) {
                compFunc.call(thisObject, resItem);
                return;
            }
            var loader = this.getLoader();
            this.resItemDic[loader.$hashCode] = { item: resItem, func: compFunc, thisObject: thisObject };
            loader.load(RES.$getVirtualUrl(resItem.url));
        };
        /**
         * ????????????Loader??????
         */
        p.getLoader = function () {
            var loader = this.recycler.pop();
            if (!loader) {
                loader = new egret.ImageLoader();
                loader.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
                loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
            }
            return loader;
        };
        /**
         * ??????????????????
         */
        p.onLoadFinish = function (event) {
            var request = (event.$target);
            var data = this.resItemDic[request.$hashCode];
            delete this.resItemDic[request.$hashCode];
            var resItem = data.item;
            var compFunc = data.func;
            resItem.loaded = (event.$type == egret.Event.COMPLETE);
            if (resItem.loaded) {
                var texture = new egret.Texture();
                texture._setBitmapData(request.data);
                this.analyzeData(resItem, texture);
            }
            this.recycler.push(request);
            compFunc.call(data.thisObject, resItem);
        };
        /**
         * ????????????????????????????????????
         */
        p.analyzeData = function (resItem, texture) {
            var name = resItem.name;
            if (this.fileDic[name] || !texture) {
                return;
            }
            this.fileDic[name] = texture;
            var config = resItem.data;
            if (config && config["scale9grid"]) {
                var str = config["scale9grid"];
                var list = str.split(",");
                texture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
            }
        };
        /**
         * @inheritDoc
         */
        p.getRes = function (name) {
            return this.fileDic[name];
        };
        /**
         * @inheritDoc
         */
        p.hasRes = function (name) {
            var res = this.getRes(name);
            return res != null;
        };
        /**
         * @inheritDoc
         */
        p.destroyRes = function (name) {
            if (this.fileDic[name]) {
                this.onResourceDestroy(this.fileDic[name]);
                delete this.fileDic[name];
                return true;
            }
            return false;
        };
        p.onResourceDestroy = function (texture) {
            texture.dispose();
        };
        return ImageAnalyzer;
    })(RES.AnalyzerBase);
    RES.ImageAnalyzer = ImageAnalyzer;
    egret.registerClass(ImageAnalyzer,"RES.ImageAnalyzer");
})(RES || (RES = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var RES;
(function (RES) {
    /**
     * @private
     */
    var TextAnalyzer = (function (_super) {
        __extends(TextAnalyzer, _super);
        function TextAnalyzer() {
            _super.call(this);
            this._dataFormat = egret.HttpResponseType.TEXT;
        }
        var d = __define,c=TextAnalyzer;p=c.prototype;
        return TextAnalyzer;
    })(RES.BinAnalyzer);
    RES.TextAnalyzer = TextAnalyzer;
    egret.registerClass(TextAnalyzer,"RES.TextAnalyzer");
})(RES || (RES = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var RES;
(function (RES) {
    /**
     * @private
     */
    var JsonAnalyzer = (function (_super) {
        __extends(JsonAnalyzer, _super);
        function JsonAnalyzer() {
            _super.call(this);
            this._dataFormat = egret.HttpResponseType.TEXT;
        }
        var d = __define,c=JsonAnalyzer;p=c.prototype;
        /**
         * ????????????????????????????????????
         */
        p.analyzeData = function (resItem, data) {
            var name = resItem.name;
            if (this.fileDic[name] || !data) {
                return;
            }
            try {
                var str = data;
                this.fileDic[name] = JSON.parse(str);
            }
            catch (e) {
                egret.$warn(1017, resItem.url, data);
            }
        };
        return JsonAnalyzer;
    })(RES.BinAnalyzer);
    RES.JsonAnalyzer = JsonAnalyzer;
    egret.registerClass(JsonAnalyzer,"RES.JsonAnalyzer");
})(RES || (RES = {}));
////////////////////////////////////////////////////////////////////////////////////////
////
////  Copyright (c) 2014-2015, Egret Technology Inc.
////  All rights reserved.
////  Redistribution and use in source and binary forms, with or without
////  modification, are permitted provided that the following conditions are met:
////
////     * Redistributions of source code must retain the above copyright
////       notice, this list of conditions and the following disclaimer.
////     * Redistributions in binary form must reproduce the above copyright
////       notice, this list of conditions and the following disclaimer in the
////       documentation and/or other materials provided with the distribution.
////     * Neither the name of the Egret nor the
////       names of its contributors may be used to endorse or promote products
////       derived from this software without specific prior written permission.
////
////  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
////  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
////  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
////  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
////  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
////  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
////  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
////  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
////  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
////  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
////
////////////////////////////////////////////////////////////////////////////////////////
var RES;
(function (RES) {
    /**
     * SpriteSheet?????????
     * @private
     */
    var SheetAnalyzer = (function (_super) {
        __extends(SheetAnalyzer, _super);
        function SheetAnalyzer() {
            _super.call(this);
            this.sheetMap = {};
            this.textureMap = {};
            /**
             * ImageLoader?????????
             */
            this.recyclerIamge = [];
            this._dataFormat = egret.HttpResponseType.TEXT;
        }
        var d = __define,c=SheetAnalyzer;p=c.prototype;
        p.getRes = function (name) {
            var res = this.fileDic[name];
            if (!res) {
                res = this.textureMap[name];
            }
            if (!res) {
                var prefix = RES.AnalyzerBase.getStringPrefix(name);
                res = this.fileDic[prefix];
                if (res) {
                    var tail = RES.AnalyzerBase.getStringTail(name);
                    res = res[tail];
                }
            }
            return res;
        };
        /**
         * ??????????????????
         */
        p.onLoadFinish = function (event) {
            var request = event.target;
            var data = this.resItemDic[request.$hashCode];
            delete this.resItemDic[request.hashCode];
            var resItem = data.item;
            var compFunc = data.func;
            resItem.loaded = (event.type == egret.Event.COMPLETE);
            if (resItem.loaded) {
                if (request instanceof egret.HttpRequest) {
                    resItem.loaded = false;
                    var imageUrl = this.analyzeConfig(resItem, request.response);
                    if (imageUrl) {
                        this.loadImage(imageUrl, data);
                        this.recycler.push(request);
                        return;
                    }
                }
                else {
                    var texture = new egret.Texture();
                    texture._setBitmapData(request.data);
                    this.analyzeBitmap(resItem, texture);
                }
            }
            if (request instanceof egret.HttpRequest) {
                this.recycler.push(request);
            }
            else {
                this.recyclerIamge.push(request);
            }
            compFunc.call(data.thisObject, resItem);
        };
        /**
         * ??????????????????????????????????????????
         */
        p.analyzeConfig = function (resItem, data) {
            var name = resItem.name;
            var config;
            var imageUrl = "";
            try {
                var str = data;
                config = JSON.parse(str);
            }
            catch (e) {
                egret.$warn(1017, resItem.url, data);
            }
            if (config) {
                this.sheetMap[name] = config;
                imageUrl = this.getRelativePath(resItem.url, config["file"]);
            }
            return imageUrl;
        };
        /**
         * ??????????????????????????????????????????
         */
        p.analyzeBitmap = function (resItem, texture) {
            var name = resItem.name;
            if (this.fileDic[name] || !texture) {
                return;
            }
            var config = this.sheetMap[name];
            delete this.sheetMap[name];
            var targetName = resItem.data && resItem.data.subkeys ? "" : name;
            var spriteSheet = this.parseSpriteSheet(texture, config, targetName);
            this.fileDic[name] = spriteSheet;
        };
        /**
         * ??????????????????
         */
        p.getRelativePath = function (url, file) {
            url = url.split("\\").join("/");
            var index = url.lastIndexOf("/");
            if (index != -1) {
                url = url.substring(0, index + 1) + file;
            }
            else {
                url = file;
            }
            return url;
        };
        p.parseSpriteSheet = function (texture, data, name) {
            var frames = data.frames;
            if (!frames) {
                return null;
            }
            var spriteSheet = new egret.SpriteSheet(texture);
            var textureMap = this.textureMap;
            for (var subkey in frames) {
                var config = frames[subkey];
                var texture = spriteSheet.createTexture(subkey, config.x, config.y, config.w, config.h, config.offX, config.offY, config.sourceW, config.sourceH);
                if (config["scale9grid"]) {
                    var str = config["scale9grid"];
                    var list = str.split(",");
                    texture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
                }
                if (textureMap[subkey] == null) {
                    textureMap[subkey] = texture;
                    if (name) {
                        this.addSubkey(subkey, name);
                    }
                }
            }
            return spriteSheet;
        };
        p.destroyRes = function (name) {
            var sheet = this.fileDic[name];
            if (sheet) {
                delete this.fileDic[name];
                var texture;
                for (var subkey in sheet) {
                    if (this.textureMap[subkey]) {
                        if (texture == null) {
                            texture = sheet[subkey];
                        }
                        delete this.textureMap[subkey];
                    }
                }
                this.onResourceDestroy(texture);
                return true;
            }
            return false;
        };
        p.loadImage = function (url, data) {
            var loader = this.getImageLoader();
            this.resItemDic[loader.hashCode] = data;
            loader.load(RES.$getVirtualUrl(url));
        };
        p.getImageLoader = function () {
            var loader = this.recyclerIamge.pop();
            if (!loader) {
                loader = new egret.ImageLoader();
                loader.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
                loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
            }
            return loader;
        };
        p.onResourceDestroy = function (texture) {
            if (texture) {
                texture.dispose();
            }
        };
        return SheetAnalyzer;
    })(RES.BinAnalyzer);
    RES.SheetAnalyzer = SheetAnalyzer;
    egret.registerClass(SheetAnalyzer,"RES.SheetAnalyzer");
})(RES || (RES = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var RES;
(function (RES) {
    /**
     * @private
     */
    var FontAnalyzer = (function (_super) {
        __extends(FontAnalyzer, _super);
        function FontAnalyzer() {
            _super.call(this);
        }
        var d = __define,c=FontAnalyzer;p=c.prototype;
        p.analyzeConfig = function (resItem, data) {
            var name = resItem.name;
            var config;
            var imageUrl = "";
            try {
                var str = data;
                config = JSON.parse(str);
            }
            catch (e) {
            }
            if (config) {
                imageUrl = this.getRelativePath(resItem.url, config["file"]);
            }
            else {
                config = data;
                imageUrl = this.getTexturePath(resItem.url, config);
            }
            this.sheetMap[name] = config;
            return imageUrl;
        };
        p.analyzeBitmap = function (resItem, texture) {
            var name = resItem.name;
            if (this.fileDic[name] || !texture) {
                return;
            }
            var config = this.sheetMap[name];
            delete this.sheetMap[name];
            var bitmapFont = new egret.BitmapFont(texture, config);
            this.fileDic[name] = bitmapFont;
        };
        p.getTexturePath = function (url, fntText) {
            var file = "";
            var lines = fntText.split("\n");
            var pngLine = lines[2];
            var index = pngLine.indexOf("file=\"");
            if (index != -1) {
                pngLine = pngLine.substring(index + 6);
                index = pngLine.indexOf("\"");
                file = pngLine.substring(0, index);
            }
            url = url.split("\\").join("/");
            var index = url.lastIndexOf("/");
            if (index != -1) {
                url = url.substring(0, index + 1) + file;
            }
            else {
                url = file;
            }
            return url;
        };
        p.onResourceDestroy = function (font) {
            font.dispose();
        };
        return FontAnalyzer;
    })(RES.SheetAnalyzer);
    RES.FontAnalyzer = FontAnalyzer;
    egret.registerClass(FontAnalyzer,"RES.FontAnalyzer");
})(RES || (RES = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var RES;
(function (RES) {
    /**
     * @private
     */
    var SoundAnalyzer = (function (_super) {
        __extends(SoundAnalyzer, _super);
        /**
         * ????????????
         */
        function SoundAnalyzer() {
            _super.call(this);
            /**
             * ???????????????????????????
             */
            this.soundDic = {};
            /**
             * ???????????????
             */
            this.resItemDic = [];
        }
        var d = __define,c=SoundAnalyzer;p=c.prototype;
        /**
         * @inheritDoc
         */
        p.loadFile = function (resItem, callBack, thisObject) {
            if (this.soundDic[resItem.name]) {
                callBack.call(thisObject, resItem);
                return;
            }
            var sound = new egret.Sound();
            sound.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
            sound.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
            this.resItemDic[sound.$hashCode] = { item: resItem, func: callBack, thisObject: thisObject };
            sound.load(RES.$getVirtualUrl(resItem.url));
        };
        /**
         * ??????????????????
         */
        p.onLoadFinish = function (event) {
            var sound = (event.$target);
            sound.removeEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
            sound.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
            var data = this.resItemDic[sound.$hashCode];
            delete this.resItemDic[sound.$hashCode];
            var resItem = data.item;
            var compFunc = data.func;
            resItem.loaded = (event.$type == egret.Event.COMPLETE);
            if (resItem.loaded) {
                this.analyzeData(resItem, sound);
            }
            compFunc.call(data.thisObject, resItem);
        };
        /**
         * ????????????????????????????????????
         */
        p.analyzeData = function (resItem, data) {
            var name = resItem.name;
            if (this.soundDic[name] || !data) {
                return;
            }
            this.soundDic[name] = data;
        };
        /**
         * @inheritDoc
         */
        p.getRes = function (name) {
            return this.soundDic[name];
        };
        /**
         * @inheritDoc
         */
        p.hasRes = function (name) {
            return !!this.getRes(name);
        };
        /**
         * @inheritDoc
         */
        p.destroyRes = function (name) {
            if (this.soundDic[name]) {
                delete this.soundDic[name];
                return true;
            }
            return false;
        };
        return SoundAnalyzer;
    })(RES.AnalyzerBase);
    RES.SoundAnalyzer = SoundAnalyzer;
    egret.registerClass(SoundAnalyzer,"RES.SoundAnalyzer");
})(RES || (RES = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var RES;
(function (RES) {
    /**
     * @private
     */
    var XMLAnalyzer = (function (_super) {
        __extends(XMLAnalyzer, _super);
        function XMLAnalyzer() {
            _super.call(this);
            this._dataFormat = egret.HttpResponseType.TEXT;
        }
        var d = __define,c=XMLAnalyzer;p=c.prototype;
        /**
         * ????????????????????????????????????
         */
        p.analyzeData = function (resItem, data) {
            var name = resItem.name;
            if (this.fileDic[name] || !data) {
                return;
            }
            try {
                var xmlStr = data;
                var xml = egret.XML.parse(xmlStr);
                this.fileDic[name] = xml;
            }
            catch (e) {
            }
        };
        return XMLAnalyzer;
    })(RES.BinAnalyzer);
    RES.XMLAnalyzer = XMLAnalyzer;
    egret.registerClass(XMLAnalyzer,"RES.XMLAnalyzer");
})(RES || (RES = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var RES;
(function (RES) {
    /**
     * @version Egret 2.4
     * @platform Web,Native
     */
    RES.VersionController;
})(RES || (RES = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var RES;
(function (RES) {
    var web;
    (function (web) {
        /**
         * @private
         */
        var Html5VersionController = (function (_super) {
            __extends(Html5VersionController, _super);
            function Html5VersionController() {
                _super.call(this);
                this._versionInfo = {};
            }
            var d = __define,c=Html5VersionController;p=c.prototype;
            p.fetchVersion = function (callback) {
                callback.onSuccess(null);
                return;
                /*
    
                todo
    
                var self = this;
    
                var virtualUrl:string = "all.manifest";
    
                var httpLoader:egret.HttpRequest = new egret.HttpRequest();
                httpLoader.addEventListener(egret.Event.COMPLETE, onLoadComplete, this);
                httpLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, onError, this);
    
                httpLoader.open(virtualUrl + "?r=" + Date.now(), "get");
                httpLoader.send();
    
                function onError(event:egret.IOErrorEvent) {
                    removeListeners();
                    self.dispatchEvent(event);
                }
    
                function onLoadComplete() {
                    removeListeners();
    
                    self._versionInfo = JSON.parse(httpLoader.response);
    
                    window.setTimeout(function () {
                        self.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
                    }, 0);
                }
    
                function removeListeners():void {
                    httpLoader.removeEventListener(egret.Event.COMPLETE, onLoadComplete, self);
                    httpLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, onError, self);
                }
    
                */
            };
            /**
             * ??????????????????????????????
             * @returns {Array<any>}
             */
            p.getChangeList = function () {
                return [];
            };
            p.getVirtualUrl = function (url) {
                return url;
                /*
    
                todo
    
                if (DEBUG) {
                    return url;
                }
                if (this._versionInfo && this._versionInfo[url]) {
                    return "resource/" + this._versionInfo[url]["v"].substring(0, 2) + "/" + this._versionInfo[url]["v"] + "_" + this._versionInfo[url]["s"] + "." + url.substring(url.lastIndexOf(".") + 1);
                }
                else {
                    return url;
                }
    
                */
            };
            return Html5VersionController;
        })(egret.EventDispatcher);
        web.Html5VersionController = Html5VersionController;
        egret.registerClass(Html5VersionController,"RES.web.Html5VersionController",["RES.VersionController","RES.IVersionController"]);
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            RES.VersionController = Html5VersionController;
        }
    })(web = RES.web || (RES.web = {}));
})(RES || (RES = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var RES;
(function (RES) {
    var native;
    (function (native) {
        /**
         * @private
         */
        var NativeVersionController = (function () {
            function NativeVersionController() {
                this._versionInfo = {};
                this._versionPath = "";
                this._localFileArr = [];
            }
            var d = __define,c=NativeVersionController;p=c.prototype;
            p.fetchVersion = function (callback) {
                var self = this;
                self._versionPath = "all.manifest";
                self._versionInfo = self.getLocalData(self._versionPath);
                if (self._versionInfo == null) {
                    egret.callLater(function () {
                        callback.onFail(1, null);
                    }, self);
                    return;
                }
                var count = 0;
                var loadOver = function (paths) {
                    if (paths) {
                        for (var i = 0; i < paths.length; i++) {
                            if (paths[i] && paths[i] != "") {
                                self._localFileArr.push("resource/" + paths[i]);
                            }
                        }
                    }
                    count++;
                    if (count == 2) {
                        callback.onSuccess(null);
                    }
                };
                self.getList(loadOver, "assets", "resource");
                self.getList(loadOver, "update", "resource");
            };
            p.getList = function (callback, type, root) {
                if (root === void 0) { root = ""; }
                var promise = egret.PromiseObject.create();
                promise.onSuccessFunc = function (paths) {
                    callback(paths);
                };
                promise.onErrorFunc = function () {
                    console.error("list files error");
                };
                if (type == "assets") {
                    egret_native.Game.listResource(root, promise);
                }
                else {
                    egret_native.Game.listUpdate(root, promise);
                }
            };
            /**
             * ??????????????????????????????
             * @returns {Array<any>}
             */
            p.getChangeList = function () {
                var temp = [];
                var localFileArr = this._localFileArr;
                for (var key in this._versionInfo) {
                    if (localFileArr.indexOf(this.getVirtualUrl(key)) < 0) {
                        temp.push({ "url": this.getVirtualUrl(key), "size": this._versionInfo[key]["s"] });
                    }
                }
                return temp;
            };
            p.getVirtualUrl = function (url) {
                if (DEBUG) {
                    return url;
                }
                if (this._versionInfo && this._versionInfo[url]) {
                    return "resource/" + this._versionInfo[url]["v"].substring(0, 2) + "/" + this._versionInfo[url]["v"] + "_" + this._versionInfo[url]["s"] + "." + url.substring(url.lastIndexOf(".") + 1);
                }
                else {
                    return url;
                }
            };
            p.getLocalData = function (filePath) {
                if (egret_native.readUpdateFileSync && egret_native.readResourceFileSync) {
                    //??????????????????
                    var content = egret_native.readUpdateFileSync(filePath);
                    if (content != null) {
                        return JSON.parse(content);
                    }
                    //??????????????????
                    content = egret_native.readResourceFileSync(filePath);
                    if (content != null) {
                        return JSON.parse(content);
                    }
                }
                return null;
            };
            return NativeVersionController;
        })();
        native.NativeVersionController = NativeVersionController;
        egret.registerClass(NativeVersionController,"RES.native.NativeVersionController",["RES.VersionController","RES.IVersionController"]);
        if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
            RES.VersionController = NativeVersionController;
        }
    })(native = RES.native || (RES.native = {}));
})(RES || (RES = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
/// <reference path="core/ResourceItem.ts" />
/// <reference path="core/ResourceConfig.ts" />
/// <reference path="core/ResourceLoader.ts" />
/// <reference path="events/ResourceEvent.ts" />
/// <reference path="analyzer/BinAnalyzer.ts" />
/// <reference path="analyzer/ImageAnalyzer.ts" />
/// <reference path="analyzer/TextAnalyzer.ts" />
/// <reference path="analyzer/JsonAnalyzer.ts" />
/// <reference path="analyzer/SheetAnalyzer.ts" />
/// <reference path="analyzer/FontAnalyzer.ts" />
/// <reference path="analyzer/SoundAnalyzer.ts" />
/// <reference path="analyzer/XMLAnalyzer.ts" />
/// <reference path="version/IVersionController.ts" />
/// <reference path="version/HTML5VersionController.ts" />
/// <reference path="version/NativeVersionController.ts" />
var RES;
(function (RES) {
    /**
     * @language en_US
     * Conduct mapping injection with class definition as the value.
     * @param type Injection type.
     * @param analyzerClass Injection type classes need to be resolved.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample extension/resource/Resource.ts
     */
    /**
     * @language zh_CN
     * ???????????????????????????????????????
     * @param type ??????????????????
     * @param analyzerClass ?????????????????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample extension/resource/Resource.ts
     */
    function registerAnalyzer(type, analyzerClass) {
        instance.registerAnalyzer(type, analyzerClass);
    }
    RES.registerAnalyzer = registerAnalyzer;
    /**
     * ??????url??????????????????url??????
     * @param call
     */
    function registerVersionController(vcs) {
        instance.$registerVersionController(vcs);
    }
    RES.registerVersionController = registerVersionController;
    /**
     * @language en_US
     * Load configuration file and parse.
     * @param url Configuration file path (path resource.json).
     * @param resourceRoot Resource path. All URL in the configuration is the relative value of the path. The ultimate URL is the value of the sum of the URL of the string and the resource in the configuration.
     * @param type Configuration file format. Determine what parser to parse the configuration file. Default "json".
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ??????????????????????????????
     * @param url ??????????????????(resource.json?????????)???
     * @param resourceRoot ????????????????????????????????????url???????????????????????????????????????url??????????????????????????????????????????url???????????????
     * @param type ?????????????????????????????????????????????????????????????????????????????????"json"
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     */
    function loadConfig(url, resourceRoot, type) {
        if (resourceRoot === void 0) { resourceRoot = ""; }
        if (type === void 0) { type = "json"; }
        instance.loadConfig(url, resourceRoot, type);
    }
    RES.loadConfig = loadConfig;
    /**
     * @language en_US
     * Load a set of resources according to the group name.
     * @param name Group name to load the resource group.
     * @param priority Load priority can be negative, the default value is 0.
     * <br>A low priority group must wait for the high priority group to complete the end of the load to start, and the same priority group will be loaded at the same time.
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ?????????????????????????????????
     * @param name ??????????????????????????????
     * @param priority ???????????????,???????????????,???????????? 0???
     * <br>?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     */
    function loadGroup(name, priority) {
        if (priority === void 0) { priority = 0; }
        instance.loadGroup(name, priority);
    }
    RES.loadGroup = loadGroup;
    /**
     * @language en_US
     * Check whether a resource group has been loaded.
     * @param name Group name???
     * @returns Is loading or not.
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ????????????????????????????????????????????????
     * @param name ?????????
     * @returns ?????????????????????
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     */
    function isGroupLoaded(name) {
        return instance.isGroupLoaded(name);
    }
    RES.isGroupLoaded = isGroupLoaded;
    /**
     * @language en_US
     * A list of groups of loading is obtained according to the group name.
     * @param name Group name.
     * @returns The resource item array of group.
     * @see RES.ResourceItem
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ???????????????????????????????????????
     * @param name ?????????
     * @returns ??????????????????
     * @see RES.ResourceItem
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     */
    function getGroupByName(name) {
        return instance.getGroupByName(name);
    }
    RES.getGroupByName = getGroupByName;
    /**
     * @language en_US
     * Create a custom load resource group, note that this method is valid only after the resource configuration file is loaded.
     * <br>You can monitor the ResourceEvent.CONFIG_COMPLETE event to verify that the configuration is complete.
     * @param name Group name to create the load resource group.
     * @param keys To be included in the list of key keys, the corresponding configuration file in the name or sbuKeys property one or a resource group name.
     * @param override Is the default false for the same name resource group already exists.
     * @returns Create success or fail.
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ?????????????????????????????????,???????????????????????????????????????????????????????????????????????????
     * <br>???????????? ResourceEvent.CONFIG_COMPLETE ????????????????????????????????????
     * @param name ???????????????????????????????????????
     * @param keys ???????????????????????????key ???????????????????????? name ????????? sbuKeys ???????????????????????????????????????
     * @param override ??????????????????????????????????????????,?????? false???
     * @returns ?????????????????????
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     */
    function createGroup(name, keys, override) {
        if (override === void 0) { override = false; }
        return instance.createGroup(name, keys, override);
    }
    RES.createGroup = createGroup;
    /**
     * @language en_US
     * Check whether the configuration file contains the specified resources.
     * @param key A sbuKeys attribute or name property in a configuration file.
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ???????????????????????????????????????????????????
     * @param key ???????????????????????? name ????????? sbuKeys ??????????????????
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     */
    function hasRes(key) {
        return instance.hasRes(key);
    }
    RES.hasRes = hasRes;
    /**
     * @language en_US
     * Run time dynamic analysis of a configuration file.
     * @param data Configuration file data, please refer to the resource.json configuration file format. JSON object can be introduced into the corresponding.
     * @param folder Path prefix for load.
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ??????????????????????????????????????????
     * @param data ?????????????????????????????? resource.json ??????????????????????????????????????? json ???????????????
     * @param folder ???????????????????????????
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     */
    function parseConfig(data, folder) {
        if (folder === void 0) { folder = ""; }
        instance.parseConfig(data, folder);
    }
    RES.parseConfig = parseConfig;
    /**
     * @language en_US
     * The synchronization method for obtaining the cache has been loaded with the success of the resource.
     * <br>The type of resource and the corresponding return value types are as follows:
     * <br>RES.ResourceItem.TYPE_ANIMATION : (egret.Bitmap|egret.Texture)[]
     * <br>RES.ResourceItem.TYPE_BIN : ArrayBuffer JavaScript primary object
     * <br>RES.ResourceItem.TYPE_IMAGE : img Html Object???or egret.BitmapData interface???
     * <br>RES.ResourceItem.TYPE_JSON : Object
     * <br>RES.ResourceItem.TYPE_SHEET : Object
     * <br>  1. If the incoming parameter is the name of the entire SpriteSheet is returned is {image1: Texture, "image2": Texture}.
     * <br>  2. If the incoming is "sheet.image1", the return is a single resource.
     * <br>  3. If the incoming is the name of the "image1" single resource, the return is a single resource.
     * But if there are two SpriteSheet in a single picture of the same name, the return of the image after the load.
     * <br>RES.ResourceItem.TYPE_SOUND : HtmlSound Html Object
     * <br>RES.ResourceItem.TYPE_TEXT : string
     * @param key A sbuKeys attribute or name property in a configuration file.
     * @see RES.ResourceItem
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ?????????????????????????????????????????????????????????
     * <br>??????????????????????????????????????????????????????
     * <br>RES.ResourceItem.TYPE_ANIMATION : (egret.Bitmap|egret.Texture)[]
     * <br>RES.ResourceItem.TYPE_BIN : ArrayBuffer JavaScript ????????????
     * <br>RES.ResourceItem.TYPE_IMAGE : img Html ??????????????? egret.BitmapData ?????????
     * <br>RES.ResourceItem.TYPE_JSON : Object
     * <br>RES.ResourceItem.TYPE_SHEET : Object
     * <br>  1. ?????????????????????????????? SpriteSheet ????????????????????? {"image1":Texture,"image2":Texture} ??????????????????
     * <br>  2. ?????????????????? "sheet.image1"??????????????????????????????
     * <br>  3. ?????????????????? "image1" ???????????????????????????????????????????????????????????????????????? SpriteSheet ????????????????????????????????????????????????????????????????????????????????????
     * <br>RES.ResourceItem.TYPE_SOUND : HtmlSound Html ??????
     * <br>RES.ResourceItem.TYPE_TEXT : string
     * @param key ???????????????????????? name ????????? sbuKeys ??????????????????
     * @see RES.ResourceItem
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     */
    function getRes(key) {
        return instance.getRes(key);
    }
    RES.getRes = getRes;
    /**
     * @language en_US
     * Asynchronous mode to get the resources in the configuration. As long as the resources exist in the configuration file, you can get it in an asynchronous way.
     * @param key A sbuKeys attribute or name property in a configuration file.
     * @param compFunc Call back function. Example???compFunc(data,key):void.
     * @param thisObject This pointer of call back function.
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * @param key ???????????????????????? name ????????? sbuKeys ??????????????????
     * @param compFunc ????????????????????????compFunc(data,key):void???
     * @param thisObject ??????????????? this ?????????
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     */
    function getResAsync(key, compFunc, thisObject) {
        instance.getResAsync(key, compFunc, thisObject);
    }
    RES.getResAsync = getResAsync;
    /**
     * @language en_US
     * Access to external resources through the full URL.
     * @param url The external path to load the file.
     * @param compFunc Call back function. Example???compFunc(data,url):void???
     * @param thisObject This pointer of call back function.
     * @param type File type (optional). Use the static constants defined in the ResourceItem class. If you do not set the file name extension.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample extension/resource/GetResByUrl.ts
     */
    /**
     * @language zh_CN
     * ????????????URL???????????????????????????
     * @param url ?????????????????????????????????
     * @param compFunc ????????????????????????compFunc(data,url):void???
     * @param thisObject ??????????????? this ?????????
     * @param type ????????????(??????)???????????? ResourceItem ???????????????????????????????????????????????????????????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample extension/resource/GetResByUrl.ts
     */
    function getResByUrl(url, compFunc, thisObject, type) {
        if (type === void 0) { type = ""; }
        instance.getResByUrl(url, compFunc, thisObject, type);
    }
    RES.getResByUrl = getResByUrl;
    /**
     * @language en_US
     * Destroy a single resource file or a set of resources to the cache data, to return whether to delete success.
     * @param name Name attribute or resource group name of the load item in the configuration file.
     * @param force Destruction of a resource group when the other resources groups have the same resource situation whether the resources will be deleted, the default value true.
     * @returns Are successful destruction.
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ??????????????????????????????????????????????????????,???????????????????????????
     * @param name ???????????????????????????name????????????????????????
     * @param force ???????????????????????????????????????????????????????????????????????????????????????????????? true???
     * @see #setMaxRetryTimes
     * @returns ?????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     */
    function destroyRes(name, force) {
        return instance.destroyRes(name, force);
    }
    RES.destroyRes = destroyRes;
    /**
     * @language en_US
     * Sets the maximum number of concurrent load threads, the default value is 2.
     * @param thread The number of concurrent loads to be set.
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ??????????????????????????????????????????????????? 2???
     * @param thread ??????????????????????????????
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     */
    function setMaxLoadingThread(thread) {
        instance.setMaxLoadingThread(thread);
    }
    RES.setMaxLoadingThread = setMaxLoadingThread;
    /**
     * @language en_US
     * Sets the number of retry times when the resource failed to load, and the default value is 3.
     * @param retry To set the retry count.
     * @includeExample extension/resource/Resource.ts
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ????????????????????????????????????????????????????????? 3???
     * @param retry ???????????????????????????
     * @includeExample extension/resource/Resource.ts
     * @version Egret 2.4
     * @platform Web,Native
     */
    function setMaxRetryTimes(retry) {
        instance.setMaxRetryTimes(retry);
    }
    RES.setMaxRetryTimes = setMaxRetryTimes;
    /**
     * @language en_US
     * Add event listeners, reference ResourceEvent defined constants.
     * @param type Event name???
     * @param listener Listener functions for handling events. This function must accept the Event object as its only parameter, and can't return any results,
     * As shown in the following example: function (evt:Event):void can have any name.
     * @param thisObject The this object that is bound to a function.
     * @param useCapture Determine the listener is running on the capture or running on the target and the bubbling phase. Set useCapture to true,
     * then the listener in the capture phase processing events, but not in the target or the bubbling phase processing events.
     * If useCapture is false, then the listener only in the target or the bubbling phase processing events.
     * To listen for events in all three stages, please call addEventListener two times: once the useCapture is set to true, once the useCapture is set to false.
     * @param priority Event listener priority. Priority is specified by a 32 - bit integer with a symbol. The higher the number, the higher the priority.
     * All listeners with a priority for n will be processed before the -1 n listener.
     * If two or more listeners share the same priority, they are processed in accordance with the order of their added. The default priority is 0.
     * @see RES.ResourceEvent
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ?????????????????????,?????? ResourceEvent ??????????????????
     * @param type ??????????????????
     * @param listener ?????????????????????????????????????????????????????? Event ??????????????????????????????????????????????????????????????????
     * ??????????????????????????? function(evt:Event):void ??????????????????????????????
     * @param thisObject ????????????????????? this ?????????
     * @param useCapture ??????????????????????????????????????????????????????????????????????????????????????? useCapture ????????? true???
     * ???????????????????????????????????????????????????????????????????????????????????????????????? useCapture ??? false?????????????????????????????????????????????????????????
     * ??????????????????????????????????????????????????? addEventListener ?????????????????? useCapture ????????? true???????????? useCapture ????????? false???
     * @param priority ???????????????????????????????????????????????????????????? 32 ??????????????????????????????????????????????????????????????? n ????????????????????????
     * ???????????? n -1 ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? 0???
     * @see RES.ResourceEvent
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     */
    function addEventListener(type, listener, thisObject, useCapture, priority) {
        if (useCapture === void 0) { useCapture = false; }
        if (priority === void 0) { priority = 0; }
        instance.addEventListener(type, listener, thisObject, useCapture, priority);
    }
    RES.addEventListener = addEventListener;
    /**
     * @language en_US
     * Remove event listeners, reference ResourceEvent defined constants.
     * @param type Event name???
     * @param listener Listening function???
     * @param thisObject The this object that is bound to a function.
     * @param useCapture Is used to capture, and this property is only valid in the display list.
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ?????????????????????,??????ResourceEvent??????????????????
     * @param type ????????????
     * @param listener ???????????????
     * @param thisObject ?????????????????????this?????????
     * @param useCapture ???????????????????????????????????????????????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     */
    function removeEventListener(type, listener, thisObject, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        instance.removeEventListener(type, listener, thisObject, useCapture);
    }
    RES.removeEventListener = removeEventListener;
    function $getVirtualUrl(url) {
        if (instance.vcs) {
            return instance.vcs.getVirtualUrl(url);
        }
        else {
            return url;
        }
    }
    RES.$getVirtualUrl = $getVirtualUrl;
    /**
     * @private
     */
    var Resource = (function (_super) {
        __extends(Resource, _super);
        /**
         * ????????????
         * @method RES.constructor
         * @private
         */
        function Resource() {
            _super.call(this);
            /**
             * ???????????????
             */
            this.analyzerDic = {};
            this.analyzerClassMap = {};
            this.configItemList = [];
            this.callLaterFlag = false;
            /**
             * ????????????????????????????????????
             */
            this.configComplete = false;
            /**
             * ???????????????????????????
             */
            this.loadedGroups = [];
            this.groupNameList = [];
            /**
             * ????????????????????????????????????
             */
            this.asyncDic = {};
            this._loadedUrlTypes = {};
            this.init();
        }
        var d = __define,c=Resource;p=c.prototype;
        /**
         * ??????type??????????????????????????????
         */
        p.$getAnalyzerByType = function (type) {
            var analyzer = this.analyzerDic[type];
            if (!analyzer) {
                var clazz = this.analyzerClassMap[type];
                if (!clazz) {
                    if (DEBUG) {
                        egret.$error(2003, type);
                    }
                    return null;
                }
                analyzer = this.analyzerDic[type] = new clazz();
            }
            return analyzer;
        };
        /**
         * ??????????????????????????????????????????
         * @param type ?????????????????????????????????bin,text,image,json??????
         * @param analyzerClass ??????????????????????????????
         */
        p.registerAnalyzer = function (type, analyzerClass) {
            this.analyzerClassMap[type] = analyzerClass;
        };
        p.$registerVersionController = function (vcs) {
            this.vcs = vcs;
        };
        /**
         * ?????????
         */
        p.init = function () {
            this.vcs = new RES.VersionController();
            var analyzerClassMap = this.analyzerClassMap;
            //analyzerClassMap[ResourceItem.TYPE_ANIMATION] = AnimationAnalyzer;
            analyzerClassMap[RES.ResourceItem.TYPE_BIN] = RES.BinAnalyzer;
            analyzerClassMap[RES.ResourceItem.TYPE_IMAGE] = RES.ImageAnalyzer;
            analyzerClassMap[RES.ResourceItem.TYPE_TEXT] = RES.TextAnalyzer;
            analyzerClassMap[RES.ResourceItem.TYPE_JSON] = RES.JsonAnalyzer;
            analyzerClassMap[RES.ResourceItem.TYPE_SHEET] = RES.SheetAnalyzer;
            analyzerClassMap[RES.ResourceItem.TYPE_FONT] = RES.FontAnalyzer;
            analyzerClassMap[RES.ResourceItem.TYPE_SOUND] = RES.SoundAnalyzer;
            analyzerClassMap[RES.ResourceItem.TYPE_XML] = RES.XMLAnalyzer;
            this.resConfig = new RES.ResourceConfig();
            this.resLoader = new RES.ResourceLoader();
            this.resLoader.callBack = this.onResourceItemComp;
            this.resLoader.resInstance = this;
            this.resLoader.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this);
            this.resLoader.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupError, this);
        };
        /**
         * ??????????????????
         * @method RES.loadConfig
         * @param url {string}
         * @param resourceRoot {string}
         * @param type {string}
         */
        p.loadConfig = function (url, resourceRoot, type) {
            if (type === void 0) { type = "json"; }
            var configItem = { url: url, resourceRoot: resourceRoot, type: type };
            this.configItemList.push(configItem);
            if (!this.callLaterFlag) {
                egret.callLater(this.startLoadConfig, this);
                this.callLaterFlag = true;
            }
        };
        p.startLoadConfig = function () {
            var _this = this;
            this.callLaterFlag = false;
            var configList = this.configItemList;
            this.configItemList = [];
            this.loadingConfigList = configList;
            var length = configList.length;
            var itemList = [];
            for (var i = 0; i < length; i++) {
                var item = configList[i];
                var resItem = new RES.ResourceItem(item.url, item.url, item.type);
                itemList.push(resItem);
            }
            var callback = {
                onSuccess: function (data) {
                    _this.resLoader.loadGroup(itemList, Resource.GROUP_CONFIG, Number.MAX_VALUE);
                },
                onFail: function (err, data) {
                    RES.ResourceEvent.dispatchResourceEvent(_this, RES.ResourceEvent.CONFIG_LOAD_ERROR);
                }
            };
            if (this.vcs) {
                this.vcs.fetchVersion(callback);
            }
            else {
                this.resLoader.loadGroup(itemList, Resource.GROUP_CONFIG, Number.MAX_VALUE);
            }
        };
        /**
         * ?????????????????????????????????????????????
         * @method RES.isGroupLoaded
         * @param name {string}
         * @returns {boolean}
         */
        p.isGroupLoaded = function (name) {
            return this.loadedGroups.indexOf(name) != -1;
        };
        /**
         * ????????????????????????????????????
         * @method RES.getGroupByName
         * @param name {string}
         * @returns {Array<egret.ResourceItem>}
         */
        p.getGroupByName = function (name) {
            return this.resConfig.getGroupByName(name);
        };
        /**
         * ??????????????????????????????
         * @method RES.loadGroup
         * @param name {string}
         * @param priority {number}
         */
        p.loadGroup = function (name, priority) {
            if (priority === void 0) { priority = 0; }
            if (this.loadedGroups.indexOf(name) != -1) {
                RES.ResourceEvent.dispatchResourceEvent(this, RES.ResourceEvent.GROUP_COMPLETE, name);
                return;
            }
            if (this.resLoader.isGroupInLoading(name))
                return;
            if (this.configComplete) {
                var group = this.resConfig.getGroupByName(name);
                this.resLoader.loadGroup(group, name, priority);
            }
            else {
                this.groupNameList.push({ name: name, priority: priority });
            }
        };
        /**
         * ?????????????????????????????????,???????????????????????????????????????????????????????????????????????????
         * ????????????ResourceEvent.CONFIG_COMPLETE????????????????????????????????????
         * @method RES.ResourceConfig#createGroup
         * @param name {string} ????????????????????????????????????
         * @param keys {egret.Array<string>} ???????????????????????????key????????????????????????name??????????????????????????????
         * @param override {boolean} ??????????????????????????????????????????,??????false???
         * @returns {boolean}
         */
        p.createGroup = function (name, keys, override) {
            if (override === void 0) { override = false; }
            if (override) {
                var index = this.loadedGroups.indexOf(name);
                if (index != -1) {
                    this.loadedGroups.splice(index, 1);
                }
            }
            return this.resConfig.createGroup(name, keys, override);
        };
        /**
         * ????????????????????????
         */
        p.onGroupComp = function (event) {
            if (event.groupName == Resource.GROUP_CONFIG) {
                var length = this.loadingConfigList.length;
                for (var i = 0; i < length; i++) {
                    var config = this.loadingConfigList[i];
                    var resolver = this.$getAnalyzerByType(config.type);
                    var data = resolver.getRes(config.url);
                    resolver.destroyRes(config.url);
                    this.resConfig.parseConfig(data, config.resourceRoot);
                }
                this.configComplete = true;
                this.loadingConfigList = null;
                RES.ResourceEvent.dispatchResourceEvent(this, RES.ResourceEvent.CONFIG_COMPLETE);
                this.loadDelayGroups();
            }
            else {
                this.loadedGroups.push(event.groupName);
                this.dispatchEvent(event);
            }
        };
        /**
         * ????????????????????????
         */
        p.loadDelayGroups = function () {
            var groupNameList = this.groupNameList;
            this.groupNameList = [];
            var length = groupNameList.length;
            for (var i = 0; i < length; i++) {
                var item = groupNameList[i];
                this.loadGroup(item.name, item.priority);
            }
        };
        /**
         * ????????????????????????
         */
        p.onGroupError = function (event) {
            if (event.groupName == Resource.GROUP_CONFIG) {
                this.loadingConfigList = null;
                RES.ResourceEvent.dispatchResourceEvent(this, RES.ResourceEvent.CONFIG_LOAD_ERROR);
            }
            else {
                this.dispatchEvent(event);
            }
        };
        /**
         * ????????????????????????????????????????????????
         * @method RES.hasRes
         * @param key {string} ????????????????????????name?????????sbuKeys??????????????????
         * @returns {boolean}
         */
        p.hasRes = function (key) {
            var type = this.resConfig.getType(key);
            if (type == "") {
                var prefix = RES.AnalyzerBase.getStringPrefix(key);
                type = this.resConfig.getType(prefix);
                if (type == "") {
                    return false;
                }
            }
            return true;
        };
        /**
         * ???????????????????????????????????????,
         * @param data {any} ??????????????????????????????resource.json???????????????????????????????????????json???????????????
         * @param folder {string} ???????????????????????????
         */
        p.parseConfig = function (data, folder) {
            this.resConfig.parseConfig(data, folder);
            if (!this.configComplete && !this.loadingConfigList) {
                this.configComplete = true;
                this.loadDelayGroups();
            }
        };
        /**
         * ??????key??????????????????
         * @method RES.getRes
         * @param key {string}
         * @returns {any}
         */
        p.getRes = function (key) {
            var type = this.resConfig.getType(key);
            if (type == "") {
                var prefix = RES.AnalyzerBase.getStringPrefix(key);
                type = this.resConfig.getType(prefix);
                if (type == "") {
                    return null;
                }
            }
            var analyzer = this.$getAnalyzerByType(type);
            return analyzer.getRes(key);
        };
        /**
         * ??????key??????????????????
         * @method RES.getResAsync
         * @param key {string}
         * @param compFunc {Function} ????????????????????????compFunc(data,url):void???
         * @param thisObject {any}
         */
        p.getResAsync = function (key, compFunc, thisObject) {
            var type = this.resConfig.getType(key);
            var name = this.resConfig.getName(key);
            if (type == "") {
                name = RES.AnalyzerBase.getStringPrefix(key);
                type = this.resConfig.getType(name);
                if (type == "") {
                    egret.$callAsync(compFunc, thisObject);
                    return;
                }
            }
            var analyzer = this.$getAnalyzerByType(type);
            var res = analyzer.getRes(key);
            if (res) {
                egret.$callAsync(compFunc, thisObject, res, key);
                return;
            }
            var args = { key: key, compFunc: compFunc, thisObject: thisObject };
            if (this.asyncDic[name]) {
                this.asyncDic[name].push(args);
            }
            else {
                this.asyncDic[name] = [args];
                var resItem = this.resConfig.getResourceItem(name);
                this.resLoader.loadItem(resItem);
            }
        };
        /**
         * ??????url????????????
         * @method RES.getResByUrl
         * @param url {string}
         * @param compFunc {Function}
         * @param thisObject {any}
         * @param type {string}
         */
        p.getResByUrl = function (url, compFunc, thisObject, type) {
            if (type === void 0) { type = ""; }
            if (!url) {
                egret.$callAsync(compFunc, thisObject);
                return;
            }
            if (!type)
                type = this.getTypeByUrl(url);
            if (this._loadedUrlTypes[url] != null && this._loadedUrlTypes[url] != type) {
                egret.$warn(2002);
            }
            this._loadedUrlTypes[url] = type;
            var analyzer = this.$getAnalyzerByType(type);
            var name = url;
            var res = analyzer.getRes(name);
            if (res) {
                egret.$callAsync(compFunc, thisObject, res, url);
                return;
            }
            var args = { key: name, compFunc: compFunc, thisObject: thisObject };
            if (this.asyncDic[name]) {
                this.asyncDic[name].push(args);
            }
            else {
                this.asyncDic[name] = [args];
                var resItem = new RES.ResourceItem(name, url, type);
                this.resLoader.loadItem(resItem);
            }
        };
        /**
         * ??????url??????????????????
         */
        p.getTypeByUrl = function (url) {
            var suffix = url.substr(url.lastIndexOf(".") + 1);
            if (suffix) {
                suffix = suffix.toLowerCase();
            }
            var type;
            switch (suffix) {
                case RES.ResourceItem.TYPE_XML:
                case RES.ResourceItem.TYPE_JSON:
                case RES.ResourceItem.TYPE_SHEET:
                    type = suffix;
                    break;
                case "png":
                case "jpg":
                case "gif":
                case "jpeg":
                case "bmp":
                    type = RES.ResourceItem.TYPE_IMAGE;
                    break;
                case "fnt":
                    type = RES.ResourceItem.TYPE_FONT;
                    break;
                case "txt":
                    type = RES.ResourceItem.TYPE_TEXT;
                    break;
                case "mp3":
                case "ogg":
                case "mpeg":
                case "wav":
                case "m4a":
                case "mp4":
                case "aiff":
                case "wma":
                case "mid":
                    type = RES.ResourceItem.TYPE_SOUND;
                    break;
                default:
                    type = RES.ResourceItem.TYPE_BIN;
                    break;
            }
            return type;
        };
        /**
         * ???????????????????????????
         */
        p.onResourceItemComp = function (item) {
            var argsList = this.asyncDic[item.name];
            delete this.asyncDic[item.name];
            var analyzer = this.$getAnalyzerByType(item.type);
            var length = argsList.length;
            for (var i = 0; i < length; i++) {
                var args = argsList[i];
                var res = analyzer.getRes(args.key);
                args.compFunc.call(args.thisObject, res, args.key);
            }
        };
        /**
         * ??????????????????????????????????????????????????????,???????????????????????????
         * @method RES.destroyRes
         * @param name {string} ???????????????????????????name?????????????????????
         * @param force {boolean} ????????????????????????????????????????????????????????????????????????????????????????????????true
         * @returns {boolean}
         */
        p.destroyRes = function (name, force) {
            if (force === void 0) { force = true; }
            var group = this.resConfig.getRawGroupByName(name);
            if (group && group.length > 0) {
                var index = this.loadedGroups.indexOf(name);
                if (index != -1) {
                    this.loadedGroups.splice(index, 1);
                }
                var length = group.length;
                for (var i = 0; i < length; i++) {
                    var item = group[i];
                    if (!force && this.isResInLoadedGroup(item.name)) {
                    }
                    else {
                        item.loaded = false;
                        var analyzer = this.$getAnalyzerByType(item.type);
                        analyzer.destroyRes(item.name);
                        this.removeLoadedGroupsByItemName(item.name);
                    }
                }
                return true;
            }
            else {
                var type = this.resConfig.getType(name);
                if (type == "") {
                    type = this._loadedUrlTypes[name];
                    if (type == null || type == "") {
                        return false;
                    }
                    delete this._loadedUrlTypes[name];
                    var analyzer = this.$getAnalyzerByType(type);
                    analyzer.destroyRes(name);
                    return true;
                }
                item = this.resConfig.getRawResourceItem(name);
                item.loaded = false;
                analyzer = this.$getAnalyzerByType(type);
                var result = analyzer.destroyRes(name);
                this.removeLoadedGroupsByItemName(item.name);
                return result;
            }
        };
        p.removeLoadedGroupsByItemName = function (name) {
            var loadedGroups = this.loadedGroups;
            var loadedGroupLength = loadedGroups.length;
            for (var i = 0; i < loadedGroupLength; i++) {
                var group = this.resConfig.getRawGroupByName(loadedGroups[i]);
                var length = group.length;
                for (var j = 0; j < length; j++) {
                    var item = group[j];
                    if (item.name == name) {
                        loadedGroups.splice(i, 1);
                        i--;
                        loadedGroupLength = loadedGroups.length;
                        break;
                    }
                }
            }
        };
        p.isResInLoadedGroup = function (name) {
            var loadedGroups = this.loadedGroups;
            var loadedGroupLength = loadedGroups.length;
            for (var i = 0; i < loadedGroupLength; i++) {
                var group = this.resConfig.getRawGroupByName(loadedGroups[i]);
                var length = group.length;
                for (var j = 0; j < length; j++) {
                    var item = group[j];
                    if (item.name == name) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**
         * ???????????????????????????????????????????????????2.
         * @method RES.setMaxLoadingThread
         * @param thread {number} ??????????????????????????????
         */
        p.setMaxLoadingThread = function (thread) {
            if (thread < 1) {
                thread = 1;
            }
            this.resLoader.thread = thread;
        };
        /**
         * ?????????????????????????????????????????????
         * @param retry ???????????????????????????
         */
        p.setMaxRetryTimes = function (retry) {
            retry = Math.max(retry, 0);
            this.resLoader.maxRetryTimes = retry;
        };
        /**
         * ?????????????????????
         */
        Resource.GROUP_CONFIG = "RES__CONFIG";
        return Resource;
    })(egret.EventDispatcher);
    egret.registerClass(Resource,"Resource");
    /**
     * Resource??????
     */
    var instance = new Resource();
})(RES || (RES = {}));
////////////////////////////////////////////////////////////////////////////////////////
////
////  Copyright (c) 2014-2015, Egret Technology Inc.
////  All rights reserved.
////  Redistribution and use in source and binary forms, with or without
////  modification, are permitted provided that the following conditions are met:
////
////     * Redistributions of source code must retain the above copyright
////       notice, this list of conditions and the following disclaimer.
////     * Redistributions in binary form must reproduce the above copyright
////       notice, this list of conditions and the following disclaimer in the
////       documentation and/or other materials provided with the distribution.
////     * Neither the name of the Egret nor the
////       names of its contributors may be used to endorse or promote products
////       derived from this software without specific prior written permission.
////
////  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
////  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
////  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
////  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
////  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
////  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
////  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
////  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
////  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
////  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
////
////////////////////////////////////////////////////////////////////////////////////////
var RES;
(function (RES) {
    /**
     * SpriteSheet?????????
     * @private
     */
    var AnimationAnalyzer = (function (_super) {
        __extends(AnimationAnalyzer, _super);
        function AnimationAnalyzer() {
            _super.call(this);
            this.sheetMap = {};
            /**
             * ImageLoader?????????
             */
            this.recyclerIamge = [];
            this._dataFormat = egret.HttpResponseType.TEXT;
        }
        var d = __define,c=AnimationAnalyzer;p=c.prototype;
        /**
         * ??????????????????
         */
        p.onLoadFinish = function (event) {
            var request = event.target;
            var data = this.resItemDic[request.$hashCode];
            delete this.resItemDic[request.hashCode];
            var resItem = data.item;
            var compFunc = data.func;
            resItem.loaded = (event.type == egret.Event.COMPLETE);
            if (resItem.loaded) {
                if (request instanceof egret.HttpRequest) {
                    resItem.loaded = false;
                    var imageUrl = this.analyzeConfig(resItem, request.response);
                    if (imageUrl) {
                        this.loadImage(imageUrl, data);
                        this.recycler.push(request);
                        return;
                    }
                }
                else {
                    this.analyzeBitmap(resItem, request.data);
                }
            }
            if (request instanceof egret.HttpRequest) {
                this.recycler.push(request);
            }
            else {
                this.recyclerIamge.push(request);
            }
            compFunc.call(data.thisObject, resItem);
        };
        /**
         * ??????????????????????????????????????????
         */
        p.analyzeConfig = function (resItem, data) {
            var name = resItem.name;
            var config;
            var imageUrl = "";
            try {
                var str = data;
                config = JSON.parse(str);
            }
            catch (e) {
                egret.$warn(1017, resItem.url, data);
            }
            if (config) {
                this.sheetMap[name] = config;
                if (config["file"]) {
                    imageUrl = this.getRelativePath(resItem.url, config["file"]);
                }
                else {
                    var arr = resItem.url.split("?");
                    var arr2 = arr[0].split("/");
                    arr2[arr2.length - 1] = arr2[arr2.length - 1].split(".")[0] + ".png";
                    imageUrl = "";
                    for (var i = 0; i < arr2.length; i++) {
                        imageUrl += arr2[i] + (i < arr2.length - 1 ? "/" : "");
                    }
                    if (arr.length == 2)
                        imageUrl += arr[2];
                }
            }
            return imageUrl;
        };
        /**
         * ??????????????????????????????????????????
         */
        p.analyzeBitmap = function (resItem, data) {
            var name = resItem.name;
            if (this.fileDic[name] || !data) {
                return;
            }
            var config = this.sheetMap[name];
            delete this.sheetMap[name];
            var targetName = resItem.data && resItem.data.subkeys ? "" : name;
            var spriteSheet = this.parseAnimation(data, config, targetName);
            this.fileDic[name] = spriteSheet;
        };
        /**
         * ??????????????????
         */
        p.getRelativePath = function (url, file) {
            url = url.split("\\").join("/");
            var index = url.lastIndexOf("/");
            if (index != -1) {
                url = url.substring(0, index + 1) + file;
            }
            else {
                url = file;
            }
            return url;
        };
        p.parseAnimation = function (bitmapData, data, name) {
            var attributes = Object.keys(data.mc);
            var list = data.mc[attributes[0]].frames;
            var len = list.length;
            var config;
            var animationFrames = [];
            for (var i = 0; i < len; i++) {
                config = data.res[list[i].res];
                var texture = new egret.Texture();
                texture._bitmapData = bitmapData;
                texture.$initData(config.x, config.y, config.w, config.h, list[i].x, list[i].y, list[i].sourceW, list[i].sourceH, bitmapData.width, bitmapData.height);
            }
            return animationFrames;
        };
        p.destroyRes = function (name) {
            var sheet = this.fileDic[name];
            if (sheet) {
                delete this.fileDic[name];
                return true;
            }
            return false;
        };
        p.loadImage = function (url, data) {
            var loader = this.getImageLoader();
            this.resItemDic[loader.hashCode] = data;
            loader.load(RES.$getVirtualUrl(url));
        };
        p.getImageLoader = function () {
            var loader = this.recyclerIamge.pop();
            if (!loader) {
                loader = new egret.ImageLoader();
                loader.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
                loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
            }
            return loader;
        };
        return AnimationAnalyzer;
    })(RES.BinAnalyzer);
    RES.AnimationAnalyzer = AnimationAnalyzer;
    egret.registerClass(AnimationAnalyzer,"RES.AnimationAnalyzer");
})(RES || (RES = {}));
var egret;
(function (egret) {
    egret.$locale_strings = egret.$locale_strings || {};
    egret.$locale_strings["en_US"] = egret.$locale_strings["en_US"] || {};
    var locale_strings = egret.$locale_strings["en_US"];
    //RES
    locale_strings[2000] = "RES.createGroup() passed in non-existed key value in configuration: {0}";
    locale_strings[2001] = "RES loaded non-existed or empty resource group:\"{0}\"";
    locale_strings[2002] = "Do not use the different types of ways to load the same material!";
    locale_strings[2003] = "Can't find the analyzer of the specified file type:{0}??? Please register the specified analyzer in the initialization of the project first,then start the resource loading process???";
})(egret || (egret = {}));
var egret;
(function (egret) {
    egret.$locale_strings = egret.$locale_strings || {};
    egret.$locale_strings["zh_CN"] = egret.$locale_strings["zh_CN"] || {};
    var locale_strings = egret.$locale_strings["zh_CN"];
    //RES
    locale_strings[2000] = "RES.createGroup()????????????????????????????????????: {0}";
    locale_strings[2001] = "RES????????????????????????????????????:\"{0}\"";
    locale_strings[2002] = "???????????????????????????????????????????????????????????????";
    locale_strings[2003] = "???????????????????????????????????????:{0}??? ??????????????????????????????????????????????????????????????????????????????????????????";
})(egret || (egret = {}));
