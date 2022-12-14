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
this["DEBUG"] = true;
this["RELEASE"] = false;
var egret;
(function (egret) {
    /**
     * @private
     */
    function _getString(code) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return egret.sys.tr.apply(egret.sys, arguments);
    }
    egret.getString = _getString;
    function _error(code) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var text = egret.sys.tr.apply(null, arguments);
        if (DEBUG) {
            egret.sys.$logToFPS("Error #" + code + ": " + text);
        }
        throw new Error("#" + code + ": " + text);
    }
    egret.$error = _error;
    function _warn(code) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var text = egret.sys.tr.apply(null, arguments);
        if (DEBUG) {
            egret.sys.$logToFPS("Warning #" + code + ": " + text);
        }
        egret.warn("Warning #" + code + ": " + text);
    }
    egret.$warn = _warn;
    function _markReadOnly(instance, property, isProperty) {
        if (isProperty === void 0) { isProperty = true; }
        var data = Object.getOwnPropertyDescriptor(isProperty ? instance.prototype : instance, property);
        if (data == null) {
            console.log(instance);
            return;
        }
        data.set = function (value) {
            if (isProperty) {
                egret.$warn(1010, egret.getQualifiedClassName(instance), property);
            }
            else {
                egret.$warn(1014, egret.getQualifiedClassName(instance), property);
            }
        };
        Object.defineProperty(instance.prototype, property, data);
    }
    egret.$markReadOnly = _markReadOnly;
    function markCannotUse(instance, property, defaultValue) {
        Object.defineProperty(instance.prototype, property, {
            get: function () {
                egret.$warn(1009, egret.getQualifiedClassName(instance), property);
                return defaultValue;
            },
            set: function (value) {
                $error(1009, egret.getQualifiedClassName(instance), property);
            },
            enumerable: true,
            configurable: true
        });
    }
    egret.$markCannotUse = markCannotUse;
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * Registers the runtime class information for a class.This method adds some strings which represent the class name or
     * some interface names to the class definition. After the registration,you can use egret.is() method to do the type checking
     * for the instance of this class.<br/>
     * Note:If you use the TypeScript programming language, the egret command line tool will automatically generate the registration code line.
     * You don't need to manually call this method.
     *
     * @example the following code shows how to register the runtime class information for the EventDispatcher class and do the type checking:
     * <pre>
     *      egret.registerClass(egret.EventDispatcher,"egret.EventDispatcher",["egret.IEventDispatcher"]);
     *      var dispatcher = new egret.EventDispatcher();
     *      egret.log(egret.is(dispatcher, "egret.IEventDispatcher"));  //true???
     *      egret.log(egret.is(dispatcher, "egret.EventDispatcher"));   //true???
     *      egret.log(egret.is(dispatcher, "egret.Bitmap"));   //false???
     * </pre>
     * @param classDefinition the class definition to be registered.
     * @param className  a unique identification string of the specific class
     * @param interfaceNames a list of unique identification string of the specific interfaces.
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ??????????????????????????????????????????,?????????????????????????????????????????????????????????????????????????????????
     * ???????????????????????????????????????????????? egret.is() ???????????????????????????????????????????????????
     * @example ??????????????????????????????EventDispatcher?????????????????????????????????????????????
     * <pre>
     *      //???egret.EventDispatcher????????????????????????????????????????????????IEventDispatcher????????????????????????????????????????????????????????????
     *      egret.registerClass(egret.EventDispatcher,"egret.EventDispatcher",["egret.IEventDispatcher"]);
     *      var dispatcher = new egret.EventDispatcher();
     *      egret.log(egret.is(dispatcher, "egret.IEventDispatcher"));  //true???
     *      egret.log(egret.is(dispatcher, "egret.EventDispatcher"));   //true???
     *      egret.log(egret.is(dispatcher, "egret.Bitmap"));   //false???
     * </pre>
     * ????????????????????? TypeScript ??????????????????egret ?????????????????????????????????????????????????????????????????? Javascript ??????????????????????????????????????????????????????
     *
     * @param classDefinition ????????????????????????
     * @param className ?????????????????????
     * @param interfaceNames ?????????????????????????????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     */
    function registerClass(classDefinition, className, interfaceNames) {
        if (DEBUG) {
            if (!classDefinition) {
                egret.$error(1003, "classDefinition");
            }
            if (!classDefinition.prototype) {
                egret.$error(1012, "classDefinition");
            }
            if (className === void 0) {
                egret.$error(1003, "className");
            }
        }
        var prototype = classDefinition.prototype;
        prototype.__class__ = className;
        var types = [className];
        if (interfaceNames) {
            types = types.concat(interfaceNames);
        }
        var superTypes = prototype.__types__;
        if (prototype.__types__) {
            var length = superTypes.length;
            for (var i = 0; i < length; i++) {
                var name = superTypes[i];
                if (types.indexOf(name) == -1) {
                    types.push(name);
                }
            }
        }
        prototype.__types__ = types;
    }
    egret.registerClass = registerClass;
})(egret || (egret = {}));
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
/// <reference path="registerclass.ts" />
var egret;
(function (egret) {
    /**
     * @private
     * ????????????
     */
    egret.$hashCount = 1;
    /**
     * @language en_US
     * The HashObject class is the base class for all objects in the Egret framework.The HashObject
     * class includes a hashCode property, which is a unique identification number of the instance.
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Egret??????????????????????????????????????????????????????????????????????????????hashCode??????
     * @version Egret 2.4
     * @platform Web,Native
     */
    var HashObject = (function () {
        /**
         * @language en_US
         * Initializes a HashObject
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????? HashObject ??????
         * @version Egret 2.4
         * @platform Web,Native
         */
        function HashObject() {
            this.$hashCode = egret.$hashCount++;
        }
        var d = __define,c=HashObject;p=c.prototype;
        d(p, "hashCode"
            /**
             * @language en_US
             * a unique identification number assigned to this instance.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????????????????????,?????????????????????????????????hashCode???????????????1????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$hashCode;
            }
        );
        return HashObject;
    })();
    egret.HashObject = HashObject;
    egret.registerClass(HashObject,"egret.HashObject",["egret.IHashObject"]);
    if (DEBUG) {
        egret.$markReadOnly(HashObject, "hashCode");
    }
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    var ONCE_EVENT_LIST = [];
    /**
     * @language en_US
     * The EventDispatcher class is the base class for all classes that dispatchEvent events. The EventDispatcher class implements
     * the IEventDispatcher interface and is the base class for the DisplayObject class. The EventDispatcher class allows
     * any object on the display list to be an event target and as such, to use the methods of the IEventDispatcher interface.
     * Event targets are an important part of the Egret event model. The event target serves as the focal point for how events
     * flow through the display list hierarchy. When an event such as a touch tap, Egret dispatches an event object into the
     * event flow from the root of the display list. The event object then makes its way through the display list until it
     * reaches the event target, at which point it begins its return trip through the display list. This round-trip journey
     * to the event target is conceptually divided into three phases: <br/>
     * the capture phase comprises the journey from the root to the last node before the event target's node, the target
     * phase comprises only the event target node, and the bubbling phase comprises any subsequent nodes encountered on
     * the return trip to the root of the display list. In general, the easiest way for a user-defined class to gain event
     * dispatching capabilities is to extend EventDispatcher. If this is impossible (that is, if the class is already extending
     * another class), you can instead implement the IEventDispatcher interface, create an EventDispatcher member, and write simple
     * hooks to route calls into the aggregated EventDispatcher.
     * @see egret.IEventDispatcher
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/events/EventDispatcher.ts
     */
    /**
     * @language zh_CN
     * EventDispatcher ??? Egret ???????????????????????????????????????????????????????????????
     * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * ??????????????????????????????????????????????????????????????????????????? EventDispatcher??????????????????????????????????????????????????????????????????????????????????????????
     * IEventDispatcher ??????????????? EventDispatcher ????????????????????????????????????????????????????????????????????? EventDispatcher ??????
     * @see egret.IEventDispatcher
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/events/EventDispatcher.ts
     */
    var EventDispatcher = (function (_super) {
        __extends(EventDispatcher, _super);
        /**
         * @language en_US
         * create an instance of the EventDispatcher class.
         * @param target The target object for events dispatched to the EventDispatcher object. This parameter is used when
         * the EventDispatcher instance is aggregated by a class that implements IEventDispatcher; it is necessary so that the
         * containing object can be the target for events. Do not use this parameter in simple cases in which a class extends EventDispatcher.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????? EventDispatcher ????????????
         * @param target ??? EventDispatcher ???????????????????????? target ????????????????????????????????????????????? IEventDispatcher ????????????????????????
         * ?????????????????????????????? target ???????????????????????????????????????????????????????????? EventDispatcher ??????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        function EventDispatcher(target) {
            if (target === void 0) { target = null; }
            _super.call(this);
            this.$EventDispatcher = {
                0: target ? target : this,
                1: {},
                2: {},
                3: 0
            };
        }
        var d = __define,c=EventDispatcher;p=c.prototype;
        /**
         * @private
         *
         * @param useCapture
         */
        p.$getEventMap = function (useCapture) {
            var values = this.$EventDispatcher;
            var eventMap = useCapture ? values[2 /* captureEventsMap */] : values[1 /* eventsMap */];
            return eventMap;
        };
        /**
         * @inheritDoc
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.addEventListener = function (type, listener, thisObject, useCapture, priority) {
            this.$addListener(type, listener, thisObject, useCapture, priority);
        };
        /**
         * @inheritDoc
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.once = function (type, listener, thisObject, useCapture, priority) {
            this.$addListener(type, listener, thisObject, useCapture, priority, true);
        };
        /**
         * @private
         */
        p.$addListener = function (type, listener, thisObject, useCapture, priority, dispatchOnce) {
            if (DEBUG && !listener) {
                egret.$error(1003, "listener");
            }
            var values = this.$EventDispatcher;
            var eventMap = useCapture ? values[2 /* captureEventsMap */] : values[1 /* eventsMap */];
            var list = eventMap[type];
            if (!list) {
                list = eventMap[type] = [];
            }
            else if (values[3 /* notifyLevel */] !== 0) {
                eventMap[type] = list = list.concat();
            }
            this.$insertEventBin(list, type, listener, thisObject, useCapture, priority, dispatchOnce);
        };
        p.$insertEventBin = function (list, type, listener, thisObject, useCapture, priority, dispatchOnce) {
            priority = +priority | 0;
            var insertIndex = -1;
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var bin = list[i];
                if (bin.listener == listener && bin.thisObject == thisObject && bin.target == this) {
                    return false;
                }
                if (insertIndex == -1 && bin.priority < priority) {
                    insertIndex = i;
                }
            }
            var eventBin = {
                type: type,
                listener: listener,
                thisObject: thisObject,
                priority: priority,
                target: this,
                useCapture: useCapture,
                dispatchOnce: !!dispatchOnce
            };
            if (insertIndex !== -1) {
                list.splice(insertIndex, 0, eventBin);
            }
            else {
                list.push(eventBin);
            }
            return true;
        };
        /**
         * @inheritDoc
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.removeEventListener = function (type, listener, thisObject, useCapture) {
            var values = this.$EventDispatcher;
            var eventMap = useCapture ? values[2 /* captureEventsMap */] : values[1 /* eventsMap */];
            var list = eventMap[type];
            if (!list) {
                return;
            }
            if (values[3 /* notifyLevel */] !== 0) {
                eventMap[type] = list = list.concat();
            }
            this.$removeEventBin(list, listener, thisObject);
            if (list.length == 0) {
                eventMap[type] = null;
            }
        };
        p.$removeEventBin = function (list, listener, thisObject) {
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var bin = list[i];
                if (bin.listener == listener && bin.thisObject == thisObject && bin.target == this) {
                    list.splice(i, 1);
                    return true;
                }
            }
            return false;
        };
        /**
         * @inheritDoc
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.hasEventListener = function (type) {
            var values = this.$EventDispatcher;
            return !!(values[1 /* eventsMap */][type] || values[2 /* captureEventsMap */][type]);
        };
        /**
         * @inheritDoc
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.willTrigger = function (type) {
            return this.hasEventListener(type);
        };
        /**
         * @inheritDoc
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.dispatchEvent = function (event) {
            event.$currentTarget = this.$EventDispatcher[0 /* eventTarget */];
            event.$setTarget(event.$currentTarget);
            return this.$notifyListener(event, false);
        };
        /**
         * @private
         */
        p.$notifyListener = function (event, capturePhase) {
            var values = this.$EventDispatcher;
            var eventMap = capturePhase ? values[2 /* captureEventsMap */] : values[1 /* eventsMap */];
            var list = eventMap[event.$type];
            if (!list) {
                return true;
            }
            var length = list.length;
            if (length == 0) {
                return true;
            }
            var onceList = ONCE_EVENT_LIST;
            //???????????????????????????????????????????????????????????????????????????????????????list.concat()??????dispatch()?????????????????????on()??????????????????
            values[3 /* notifyLevel */]++;
            for (var i = 0; i < length; i++) {
                var eventBin = list[i];
                eventBin.listener.call(eventBin.thisObject, event);
                if (eventBin.dispatchOnce) {
                    onceList.push(eventBin);
                }
                if (event.$isPropagationImmediateStopped) {
                    break;
                }
            }
            values[3 /* notifyLevel */]--;
            while (onceList.length) {
                eventBin = onceList.pop();
                eventBin.target.removeEventListener(eventBin.type, eventBin.listener, eventBin.thisObject, eventBin.useCapture);
            }
            return !event.$isDefaultPrevented;
        };
        /**
         * @language en_US
         * Distribute a specified event parameters.
         * @param type The type of the event. Event listeners can access this information through the inherited type property.
         * @param bubbles Determines whether the Event object bubbles. Event listeners can access this information through
         * the inherited bubbles property.
         * @param data {any} data
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????
         * @param type {string} ????????????
         * @param bubbles {boolean} ?????? Event ????????????????????????????????????????????????????????? false???
         * @param data {any} ??????data
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.dispatchEventWith = function (type, bubbles, data) {
            if (bubbles || this.hasEventListener(type)) {
                var event = egret.Event.create(egret.Event, type, bubbles);
                event.data = data;
                var result = this.dispatchEvent(event);
                egret.Event.release(event);
                return result;
            }
            return true;
        };
        return EventDispatcher;
    })(egret.HashObject);
    egret.EventDispatcher = EventDispatcher;
    egret.registerClass(EventDispatcher,"egret.EventDispatcher",["egret.IEventDispatcher"]);
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    var PI = Math.PI;
    var HalfPI = PI / 2;
    var PacPI = PI + HalfPI;
    var TwoPI = PI * 2;
    var DEG_TO_RAD = Math.PI / 180;
    /**
     * @private
     */
    function cos(angle) {
        switch (angle) {
            case HalfPI:
            case -PacPI:
                return 0;
            case PI:
            case -PI:
                return -1;
            case PacPI:
            case -HalfPI:
                return 0;
            default:
                return Math.cos(angle);
        }
    }
    /**
     * @private
     */
    function sin(angle) {
        switch (angle) {
            case HalfPI:
            case -PacPI:
                return 1;
            case PI:
            case -PI:
                return 0;
            case PacPI:
            case -HalfPI:
                return -1;
            default:
                return Math.sin(angle);
        }
    }
    var matrixPool = [];
    /**
     * @language en_US
     * The Matrix class represents a transformation matrix that determines how to map points from one coordinate space to
     * another. You can perform various graphical transformations on a display object by setting the properties of a Matrix
     * object, applying that Matrix object to the matrix property of a display object, These transformation functions include
     * translation (x and y repositioning), rotation, scaling, and skewing.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/geom/Matrix.ts
     */
    /**
     * @language zh_CN
     * Matrix ?????????????????????????????????????????????????????????????????????????????????????????????????????????
     * ??????????????????????????????????????????????????????????????????????????? Matrix ???????????????????????? Matrix
     * ?????????????????????????????? matrix ??????????????????????????????????????????x ??? y ?????????????????????????????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/geom/Matrix.ts
     */
    var Matrix = (function (_super) {
        __extends(Matrix, _super);
        /**
         * @language en_US
         * Creates a new Matrix object with the specified parameters.
         * @param a The value that affects the positioning of pixels along the x axis when scaling or rotating an image.
         * @param b The value that affects the positioning of pixels along the y axis when rotating or skewing an image.
         * @param c The value that affects the positioning of pixels along the x axis when rotating or skewing an image.
         * @param d The value that affects the positioning of pixels along the y axis when scaling or rotating an image..
         * @param tx The distance by which to translate each point along the x axis.
         * @param ty The distance by which to translate each point along the y axis.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????? Matrix ??????
         * @param a ??????????????????????????????????????? x ??????????????????
         * @param b ??????????????????????????????????????? y ??????????????????
         * @param c ??????????????????????????????????????? x ??????????????????
         * @param d ??????????????????????????????????????? y ??????????????????
         * @param tx ??? x ??????????????????????????????
         * @param ty ??? y ??????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        function Matrix(a, b, c, d, tx, ty) {
            if (a === void 0) { a = 1; }
            if (b === void 0) { b = 0; }
            if (c === void 0) { c = 0; }
            if (d === void 0) { d = 1; }
            if (tx === void 0) { tx = 0; }
            if (ty === void 0) { ty = 0; }
            _super.call(this);
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        }
        var d = __define,c=Matrix;p=c.prototype;
        /**
         * @language en_US
         * Releases a matrix instance to the object pool
         * @param matrix matrix that Needs to be recycled
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????Matrix??????????????????
         * @param matrix ??????????????? matrix
         * @version Egret 2.4
         * @platform Web,Native
         */
        Matrix.release = function (matrix) {
            if (!matrix) {
                return;
            }
            matrixPool.push(matrix);
        };
        /**
         * @language en_US
         * get a matrix instance from the object pool or create a new one.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????Matrix?????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Matrix.create = function () {
            var matrix = matrixPool.pop();
            if (!matrix) {
                matrix = new Matrix();
            }
            return matrix;
        };
        /**
         * @language en_US
         * Returns a new Matrix object that is a clone of this matrix, with an exact copy of the contained object.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????? Matrix ?????????????????????????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.clone = function () {
            return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
        };
        /**
         * @language en_US
         * Concatenates a matrix with the current matrix, effectively combining the geometric effects of the two. In mathematical
         * terms, concatenating two matrixes is the same as combining them using matrix multiplication.
         * @param other The matrix to be concatenated to the source matrix.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * @param other ?????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.concat = function (other) {
            var a = this.a * other.a;
            var b = 0.0;
            var c = 0.0;
            var d = this.d * other.d;
            var tx = this.tx * other.a + other.tx;
            var ty = this.ty * other.d + other.ty;
            if (this.b !== 0.0 || this.c !== 0.0 || other.b !== 0.0 || other.c !== 0.0) {
                a += this.b * other.c;
                d += this.c * other.b;
                b += this.a * other.b + this.b * other.d;
                c += this.c * other.a + this.d * other.c;
                tx += this.ty * other.c;
                ty += this.tx * other.b;
            }
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        };
        /**
         * @language en_US
         * Copies all of the matrix data from the source Point object into the calling Matrix object.
         * @param other  The Matrix object from which to copy the data.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????? Matrix ???????????????????????????????????????????????? Matrix ????????????
         * @param other ????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.copyFrom = function (other) {
            this.a = other.a;
            this.b = other.b;
            this.c = other.c;
            this.d = other.d;
            this.tx = other.tx;
            this.ty = other.ty;
            return this;
        };
        /**
         * @language en_US
         * Sets each matrix property to a value that causes a null transformation. An object transformed by applying an
         * identity matrix will be identical to the original. After calling the identity() method, the resulting matrix
         * has the following properties: a=1, b=0, c=0, d=1, tx=0, ty=0.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * ?????? identity() ????????????????????????????????????????????????a=1???b=0???c=0???d=1???tx=0 ??? ty=0???
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.identity = function () {
            this.a = this.d = 1;
            this.b = this.c = this.tx = this.ty = 0;
        };
        /**
         * @language en_US
         * Performs the opposite transformation of the original matrix. You can apply an inverted matrix to an object to
         * undo the transformation performed when applying the original matrix.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????
         * ?????????????????????????????????????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.invert = function () {
            this.$invertInto(this);
        };
        /**
         * @private
         */
        p.$invertInto = function (target) {
            var a = this.a;
            var b = this.b;
            var c = this.c;
            var d = this.d;
            var tx = this.tx;
            var ty = this.ty;
            if (b == 0 && c == 0) {
                target.b = target.c = 0;
                if (a == 0 || d == 0) {
                    target.a = target.d = target.tx = target.ty = 0;
                }
                else {
                    a = target.a = 1 / a;
                    d = target.d = 1 / d;
                    target.tx = -a * tx;
                    target.ty = -d * ty;
                }
                return;
            }
            var determinant = a * d - b * c;
            if (determinant == 0) {
                target.identity();
                return;
            }
            determinant = 1 / determinant;
            var k = target.a = d * determinant;
            b = target.b = -b * determinant;
            c = target.c = -c * determinant;
            d = target.d = a * determinant;
            target.tx = -(k * tx + c * ty);
            target.ty = -(b * tx + d * ty);
        };
        /**
         * @language en_US
         * Applies a rotation transformation to the Matrix object.
         * The rotate() method alters the a, b, c, and d properties of the Matrix object.
         * @param angle The rotation angle in radians.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??? Matrix ???????????????????????????
         * rotate() ??????????????? Matrix ????????? a???b???c ??? d ?????????
         * @param angle ????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.rotate = function (angle) {
            angle = +angle;
            if (angle !== 0) {
                var u = cos(angle);
                var v = sin(angle);
                var ta = this.a;
                var tb = this.b;
                var tc = this.c;
                var td = this.d;
                var ttx = this.tx;
                var tty = this.ty;
                this.a = ta * u - tb * v;
                this.b = ta * v + tb * u;
                this.c = tc * u - td * v;
                this.d = tc * v + td * u;
                this.tx = ttx * u - tty * v;
                this.ty = ttx * v + tty * u;
            }
        };
        /**
         * @language en_US
         * Applies a scaling transformation to the matrix. The x axis is multiplied by sx, and the y axis it is multiplied by sy.
         * The scale() method alters the a and d properties of the Matrix object.
         * @param sx A multiplier used to scale the object along the x axis.
         * @param sy A multiplier used to scale the object along the y axis.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????x ????????? sx???y ????????? sy???
         * scale() ??????????????? Matrix ????????? a ??? d ?????????
         * @param sx ????????? x ???????????????????????????
         * @param sy ????????? y ???????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.scale = function (sx, sy) {
            if (sx !== 1) {
                this.a *= sx;
                this.c *= sx;
                this.tx *= sx;
            }
            if (sy !== 1) {
                this.b *= sy;
                this.d *= sy;
                this.ty *= sy;
            }
        };
        /**
         * @language en_US
         * Sets the members of Matrix to the specified values
         * @param a The value that affects the positioning of pixels along the x axis when scaling or rotating an image.
         * @param b The value that affects the positioning of pixels along the y axis when rotating or skewing an image.
         * @param c The value that affects the positioning of pixels along the x axis when rotating or skewing an image.
         * @param d The value that affects the positioning of pixels along the y axis when scaling or rotating an image..
         * @param tx The distance by which to translate each point along the x axis.
         * @param ty The distance by which to translate each point along the y axis.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??? Matrix ???????????????????????????
         * @param a ??????????????????????????????????????? x ??????????????????
         * @param b ??????????????????????????????????????? y ??????????????????
         * @param c ??????????????????????????????????????? x ??????????????????
         * @param d ??????????????????????????????????????? y ??????????????????
         * @param tx ??? x ??????????????????????????????
         * @param ty ??? y ??????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.setTo = function (a, b, c, d, tx, ty) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
            return this;
        };
        /**
         * @language en_US
         * Returns the result of applying the geometric transformation represented by the Matrix object to the specified point.
         * @param pointX The x coordinate for which you want to get the result of the Matrix transformation.
         * @param pointY The y coordinate for which you want to get the result of the Matrix transformation.
         * @param resultPoint A reusable instance of Point for saving the results. Passing this parameter can reduce the
         * number of reallocate objects, which allows you to get better code execution performance.
         * @returns The point resulting from applying the Matrix transformation.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????? Matrix ??????????????????????????????????????????????????????????????????
         * @param pointX ??????????????????????????????????????????x?????????
         * @param pointY ??????????????????????????????????????????y?????????
         * @param resultPoint ???????????????????????????????????????????????????????????????????????????????????????????????????Point?????????????????????????????????????????????????????????Point???????????????
         * @returns ???????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.transformPoint = function (pointX, pointY, resultPoint) {
            var x = this.a * pointX + this.c * pointY + this.tx;
            var y = this.b * pointX + this.d * pointY + this.ty;
            if (resultPoint) {
                resultPoint.setTo(x, y);
                return resultPoint;
            }
            return new egret.Point(x, y);
        };
        /**
         * @language en_US
         * Translates the matrix along the x and y axes, as specified by the dx and dy parameters.
         * @param dx The amount of movement along the x axis to the right, in pixels.
         * @param dy The amount of movement down along the y axis, in pixels.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??? x ??? y ????????????????????? dx ??? dy ???????????????
         * @param dx ??? x ????????????????????????????????????????????????
         * @param dy ??? y ????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.translate = function (dx, dy) {
            this.tx += dx;
            this.ty += dy;
        };
        /**
         * @language en_US
         * Determines whether two matrixes are equal.
         * @param other The matrix to be compared.
         * @returns A value of true if the object is equal to this Matrix object; false if it is not equal.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????
         * @param other ????????????????????????????????????
         * @returns ???????????????ture???????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.equals = function (other) {
            return this.a == other.a && this.b == other.b && this.c == other.c && this.d == other.d && this.tx == other.tx && this.ty == other.ty;
        };
        /**
         * @language en_US
         * prepend matrix
         * @param a The value that affects the positioning of pixels along the x axis when scaling or rotating an image.
         * @param b The value that affects the positioning of pixels along the y axis when rotating or skewing an image.
         * @param c The value that affects the positioning of pixels along the x axis when rotating or skewing an image.
         * @param d The value that affects the positioning of pixels along the y axis when scaling or rotating an image..
         * @param tx The distance by which to translate each point along the x axis.
         * @param ty The distance by which to translate each point along the y axis.
         * @returns matrix
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????
         * @param a ??????????????????????????????????????? x ???????????????
         * @param b ??????????????????????????????????????? y ???????????????
         * @param c ??????????????????????????????????????? x ???????????????
         * @param d ??????????????????????????????????????? y ???????????????
         * @param tx ??? x ???????????????????????????
         * @param ty ??? y ???????????????????????????
         * @returns ????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.prepend = function (a, b, c, d, tx, ty) {
            var tx1 = this.tx;
            if (a != 1 || b != 0 || c != 0 || d != 1) {
                var a1 = this.a;
                var c1 = this.c;
                this.a = a1 * a + this.b * c;
                this.b = a1 * b + this.b * d;
                this.c = c1 * a + this.d * c;
                this.d = c1 * b + this.d * d;
            }
            this.tx = tx1 * a + this.ty * c + tx;
            this.ty = tx1 * b + this.ty * d + ty;
            return this;
        };
        /**
         * @language en_US
         * append matrix
         * @param a The value that affects the positioning of pixels along the x axis when scaling or rotating an image.
         * @param b The value that affects the positioning of pixels along the y axis when rotating or skewing an image.
         * @param c The value that affects the positioning of pixels along the x axis when rotating or skewing an image.
         * @param d The value that affects the positioning of pixels along the y axis when scaling or rotating an image..
         * @param tx The distance by which to translate each point along the x axis.
         * @param ty The distance by which to translate each point along the y axis.
         * @returns matrix
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????
         * @param a ??????????????????????????????????????? x ???????????????
         * @param b ??????????????????????????????????????? y ???????????????
         * @param c ??????????????????????????????????????? x ???????????????
         * @param d ??????????????????????????????????????? y ???????????????
         * @param tx ??? x ???????????????????????????
         * @param ty ??? y ???????????????????????????
         * @returns ????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.append = function (a, b, c, d, tx, ty) {
            var a1 = this.a;
            var b1 = this.b;
            var c1 = this.c;
            var d1 = this.d;
            if (a != 1 || b != 0 || c != 0 || d != 1) {
                this.a = a * a1 + b * c1;
                this.b = a * b1 + b * d1;
                this.c = c * a1 + d * c1;
                this.d = c * b1 + d * d1;
            }
            this.tx = tx * a1 + ty * c1 + this.tx;
            this.ty = tx * b1 + ty * d1 + this.ty;
            return this;
        };
        /**
         * @language en_US
         * Given a point in the pretransform coordinate space, returns the coordinates of that point after the transformation occurs.
         * Unlike the standard transformation applied using the transformPoint() method, the deltaTransformPoint() method's transformation does not consider the translation parameters tx and ty.
         * @param point The point for which you want to get the result of the matrix transformation.
         * @returns The point resulting from applying the matrix transformation.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????????????????????????????????????????????????????????
         * ????????? transformPoint() ????????????????????????????????????deltaTransformPoint() ???????????????????????????????????? tx ??? ty???
         * @param point ???????????????????????????????????????
         * @returns ????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.deltaTransformPoint = function (point) {
            var self = this;
            var x = self.a * point.x + self.c * point.y;
            var y = self.b * point.x + self.d * point.y;
            return new egret.Point(x, y);
        };
        /**
         * @language en_US
         * Returns a text value listing the properties of the Matrix object.
         * @returns A string containing the values of the properties of the Matrix object: a, b, c, d, tx, and ty.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????? Matrix ??????????????????????????????????????????????????????????????????
         * @returns ??????????????????????????? Matrix ?????????????????????a???b???c???d???tx ??? ty???
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.toString = function () {
            return "(a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")";
        };
        /**
         * @language en_US
         * Includes parameters for scaling, rotation, and translation. When applied to a matrix it sets the matrix's values based on those parameters.
         * @param scaleX The factor by which to scale horizontally.
         * @param scaleY The factor by which scale vertically.
         * @param rotation The amount to rotate, in radians.
         * @param tx The number of pixels to translate (move) to the right along the x axis.
         * @param ty The number of pixels to translate (move) down along the y axis.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * @param scaleX ???????????????????????????
         * @param scaleY ???????????????????????????
         * @param rotation ?????????????????????????????????
         * @param tx ??? x ???????????????????????????????????????
         * @param ty ??? y ???????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.createBox = function (scaleX, scaleY, rotation, tx, ty) {
            if (rotation === void 0) { rotation = 0; }
            if (tx === void 0) { tx = 0; }
            if (ty === void 0) { ty = 0; }
            var self = this;
            if (rotation !== 0) {
                rotation = rotation / DEG_TO_RAD;
                var u = egret.NumberUtils.cos(rotation);
                var v = egret.NumberUtils.sin(rotation);
                self.a = u * scaleX;
                self.b = v * scaleY;
                self.c = -v * scaleX;
                self.d = u * scaleY;
            }
            else {
                self.a = scaleX;
                self.b = 0;
                self.c = 0;
                self.d = scaleY;
            }
            self.tx = tx;
            self.ty = ty;
        };
        /**
         * @language en_US
         * Creates the specific style of matrix expected by the beginGradientFill() and lineGradientStyle() methods of the Graphics class.
         * Width and height are scaled to a scaleX/scaleY pair and the tx/ty values are offset by half the width and height.
         * @param width The width of the gradient box.
         * @param height The height of the gradient box.
         * @param rotation The amount to rotate, in radians.
         * @param tx The distance, in pixels, to translate to the right along the x axis. This value is offset by half of the width parameter.
         * @param ty The distance, in pixels, to translate down along the y axis. This value is offset by half of the height parameter.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????? Graphics ?????? beginGradientFill() ??? lineGradientStyle() ???????????????????????????????????????
         * ??????????????????????????? scaleX/scaleY ????????? tx/ty ???????????????????????????????????????
         * @param width ??????????????????
         * @param height ??????????????????
         * @param rotation ?????????????????????????????????
         * @param tx ??? x ?????????????????????????????????????????????????????????????????? width ???????????????
         * @param ty ??? y ?????????????????????????????????????????????????????????????????? height ???????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.createGradientBox = function (width, height, rotation, tx, ty) {
            if (rotation === void 0) { rotation = 0; }
            if (tx === void 0) { tx = 0; }
            if (ty === void 0) { ty = 0; }
            this.createBox(width / 1638.4, height / 1638.4, rotation, tx + width / 2, ty + height / 2);
        };
        /**
         * @private
         */
        p.$transformBounds = function (bounds) {
            var a = this.a;
            var b = this.b;
            var c = this.c;
            var d = this.d;
            var tx = this.tx;
            var ty = this.ty;
            var x = bounds.x;
            var y = bounds.y;
            var xMax = x + bounds.width;
            var yMax = y + bounds.height;
            var x0 = a * x + c * y + tx;
            var y0 = b * x + d * y + ty;
            var x1 = a * xMax + c * y + tx;
            var y1 = b * xMax + d * y + ty;
            var x2 = a * xMax + c * yMax + tx;
            var y2 = b * xMax + d * yMax + ty;
            var x3 = a * x + c * yMax + tx;
            var y3 = b * x + d * yMax + ty;
            var tmp = 0;
            if (x0 > x1) {
                tmp = x0;
                x0 = x1;
                x1 = tmp;
            }
            if (x2 > x3) {
                tmp = x2;
                x2 = x3;
                x3 = tmp;
            }
            bounds.x = Math.floor(x0 < x2 ? x0 : x2);
            bounds.width = Math.ceil((x1 > x3 ? x1 : x3) - bounds.x);
            if (y0 > y1) {
                tmp = y0;
                y0 = y1;
                y1 = tmp;
            }
            if (y2 > y3) {
                tmp = y2;
                y2 = y3;
                y3 = tmp;
            }
            bounds.y = Math.floor(y0 < y2 ? y0 : y2);
            bounds.height = Math.ceil((y1 > y3 ? y1 : y3) - bounds.y);
        };
        /**
         * @private
         */
        p.getDeterminant = function () {
            return this.a * this.d - this.b * this.c;
        };
        /**
         * @private
         */
        p.$getScaleX = function () {
            var m = this;
            if (m.a == 1 && m.b == 0) {
                return 1;
            }
            var result = Math.sqrt(m.a * m.a + m.b * m.b);
            return this.getDeterminant() < 0 ? -result : result;
        };
        /**
         * @private
         */
        p.$getScaleY = function () {
            var m = this;
            if (m.c == 0 && m.d == 1) {
                return 1;
            }
            var result = Math.sqrt(m.c * m.c + m.d * m.d);
            return this.getDeterminant() < 0 ? -result : result;
        };
        /**
         * @private
         */
        p.$getSkewX = function () {
            return Math.atan2(this.d, this.c) - (PI / 2);
        };
        /**
         * @private
         */
        p.$getSkewY = function () {
            return Math.atan2(this.b, this.a);
        };
        /**
         * @private
         */
        p.$updateScaleAndRotation = function (scaleX, scaleY, skewX, skewY) {
            if ((skewX == 0 || skewX == TwoPI) && (skewY == 0 || skewY == TwoPI)) {
                this.a = scaleX;
                this.b = this.c = 0;
                this.d = scaleY;
                return;
            }
            var u = cos(skewX);
            var v = sin(skewX);
            if (skewX == skewY) {
                this.a = u * scaleX;
                this.b = v * scaleX;
            }
            else {
                this.a = cos(skewY) * scaleX;
                this.b = sin(skewY) * scaleX;
            }
            this.c = -v * scaleY;
            this.d = u * scaleY;
        };
        /**
         * @private
         * target = other * this
         */
        p.$preMultiplyInto = function (other, target) {
            var a = other.a * this.a;
            var b = 0.0;
            var c = 0.0;
            var d = other.d * this.d;
            var tx = other.tx * this.a + this.tx;
            var ty = other.ty * this.d + this.ty;
            if (other.b !== 0.0 || other.c !== 0.0 || this.b !== 0.0 || this.c !== 0.0) {
                a += other.b * this.c;
                d += other.c * this.b;
                b += other.a * this.b + other.b * this.d;
                c += other.c * this.a + other.d * this.c;
                tx += other.ty * this.c;
                ty += other.tx * this.b;
            }
            target.a = a;
            target.b = b;
            target.c = c;
            target.d = d;
            target.tx = tx;
            target.ty = ty;
        };
        return Matrix;
    })(egret.HashObject);
    egret.Matrix = Matrix;
    egret.registerClass(Matrix,"egret.Matrix");
    /**
     * @private
     * ?????????????????????????????????????????????????????????
     */
    egret.$TempMatrix = new Matrix();
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    var sys;
    (function (sys) {
        var regionPool = [];
        /**
         * @private
         */
        var Region = (function () {
            function Region() {
                /**
                 * @private
                 */
                this.minX = 0;
                /**
                 * @private
                 */
                this.minY = 0;
                /**
                 * @private
                 */
                this.maxX = 0;
                /**
                 * @private
                 */
                this.maxY = 0;
                /**
                 * @private
                 */
                this.width = 0;
                /**
                 * @private
                 */
                this.height = 0;
                /**
                 * @private
                 */
                this.area = 0;
                /**
                 * @private
                 * ??????????????????
                 */
                this.moved = false;
            }
            var d = __define,c=Region;p=c.prototype;
            /**
             * @private
             * ????????????Region??????????????????
             */
            Region.release = function (region) {
                regionPool.push(region);
            };
            /**
             * @private
             * ??????????????????????????????????????????Region?????????
             * ?????????????????????????????????????????????????????????????????????????????????new?????????
             * ???????????????????????????release()????????????????????????????????????????????????????????????????????????????????????
             */
            Region.create = function () {
                var region = regionPool.pop();
                if (!region) {
                    region = new Region();
                }
                return region;
            };
            /**
             * @private
             */
            p.setTo = function (minX, minY, maxX, maxY) {
                this.minX = minX;
                this.minY = minY;
                this.maxX = maxX;
                this.maxY = maxY;
                this.updateArea();
                return this;
            };
            /**
             * @private
             */
            p.updateArea = function () {
                this.width = this.maxX - this.minX;
                this.height = this.maxY - this.minY;
                this.area = this.width * this.height;
            };
            /**
             * @private
             * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????0???0????????????
             */
            p.union = function (target) {
                if (this.minX > target.minX) {
                    this.minX = target.minX;
                }
                if (this.minY > target.minY) {
                    this.minY = target.minY;
                }
                if (this.maxX < target.maxX) {
                    this.maxX = target.maxX;
                }
                if (this.maxY < target.maxY) {
                    this.maxY = target.maxY;
                }
                this.updateArea();
            };
            /**
             * @private
             * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????0???0????????????
             */
            p.intersect = function (target) {
                if (this.minX < target.minX) {
                    this.minX = target.minX;
                }
                if (this.maxX > target.maxX) {
                    this.maxX = target.maxX;
                }
                if (this.minX >= this.maxX) {
                    this.setEmpty();
                    return;
                }
                if (this.minY < target.minY) {
                    this.minY = target.minY;
                }
                if (this.maxY > target.maxY) {
                    this.maxY = target.maxY;
                }
                if (this.minY >= this.maxY) {
                    this.setEmpty();
                    return;
                }
                this.updateArea();
            };
            /**
             * @private
             */
            p.setEmpty = function () {
                this.minX = 0;
                this.minY = 0;
                this.maxX = 0;
                this.maxY = 0;
                this.width = 0;
                this.height = 0;
                this.area = 0;
            };
            /**
             * @private
             * ????????? Region ?????????????????????
             */
            p.isEmpty = function () {
                return this.width <= 0 || this.height <= 0;
            };
            /**
             * @private
             */
            p.intersects = function (target) {
                var max = this.minX > target.minX ? this.minX : target.minX;
                var min = this.maxX < target.maxX ? this.maxX : target.maxX;
                if (max > min) {
                    return false;
                }
                max = this.minY > target.minY ? this.minY : target.minY;
                min = this.maxY < target.maxY ? this.maxY : target.maxY;
                return max <= min;
            };
            /**
             * @private
             */
            p.updateRegion = function (bounds, matrix) {
                var m = matrix;
                var a = m.a;
                var b = m.b;
                var c = m.c;
                var d = m.d;
                var tx = m.tx;
                var ty = m.ty;
                var x = bounds.x;
                var y = bounds.y;
                var xMax = x + bounds.width;
                var yMax = y + bounds.height;
                var minX, minY, maxX, maxY;
                //??????????????????????????????????????????????????????????????????????????????????????????
                if (a == 1.0 && b == 0.0 && c == 0.0 && d == 1.0) {
                    minX = Math.floor(x + tx) - 1;
                    minY = Math.floor(y + ty) - 1;
                    maxX = Math.ceil(xMax + tx) + 1;
                    maxY = Math.ceil(yMax + ty) + 1;
                }
                else {
                    var x0 = a * x + c * y + tx;
                    var y0 = b * x + d * y + ty;
                    var x1 = a * xMax + c * y + tx;
                    var y1 = b * xMax + d * y + ty;
                    var x2 = a * xMax + c * yMax + tx;
                    var y2 = b * xMax + d * yMax + ty;
                    var x3 = a * x + c * yMax + tx;
                    var y3 = b * x + d * yMax + ty;
                    var tmp = 0;
                    if (x0 > x1) {
                        tmp = x0;
                        x0 = x1;
                        x1 = tmp;
                    }
                    if (x2 > x3) {
                        tmp = x2;
                        x2 = x3;
                        x3 = tmp;
                    }
                    minX = Math.floor(x0 < x2 ? x0 : x2) - 1;
                    maxX = Math.ceil(x1 > x3 ? x1 : x3) + 1;
                    if (y0 > y1) {
                        tmp = y0;
                        y0 = y1;
                        y1 = tmp;
                    }
                    if (y2 > y3) {
                        tmp = y2;
                        y2 = y3;
                        y3 = tmp;
                    }
                    minY = Math.floor(y0 < y2 ? y0 : y2) - 1;
                    maxY = Math.ceil(y1 > y3 ? y1 : y3) + 1;
                }
                this.minX = minX;
                this.minY = minY;
                this.maxX = maxX;
                this.maxY = maxY;
                this.width = maxX - minX;
                this.height = maxY - minY;
                this.area = this.width * this.height;
            };
            return Region;
        })();
        sys.Region = Region;
        egret.registerClass(Region,"egret.sys.Region");
    })(sys = egret.sys || (egret.sys = {}));
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    var sys;
    (function (sys) {
        if (DEBUG) {
            function isF(num) {
                return num % 1 !== 0;
            }
        }
        /**
         * @private
         */
        function unionArea(r1, r2) {
            var minX = r1.minX < r2.minX ? r1.minX : r2.minX;
            var minY = r1.minY < r2.minY ? r1.minY : r2.minY;
            var maxX = r1.maxX > r2.maxX ? r1.maxX : r2.maxX;
            var maxY = r1.maxY > r2.maxY ? r1.maxY : r2.maxY;
            return (maxX - minX) * (maxY - minY);
        }
        /**
         * @private
         * ????????????????????????
         */
        var DirtyRegion = (function () {
            function DirtyRegion() {
                /**
                 * @private
                 */
                this.dirtyList = [];
                /**
                 * @private
                 */
                this.hasClipRect = false;
                /**
                 * @private
                 */
                this.clipWidth = 0;
                /**
                 * @private
                 */
                this.clipHeight = 0;
                /**
                 * @private
                 */
                this.clipArea = 0;
                /**
                 * @private
                 */
                this.clipRectChanged = false;
            }
            var d = __define,c=DirtyRegion;p=c.prototype;
            /**
             * @private
             * ????????????????????????????????????????????????????????????
             */
            p.setClipRect = function (width, height) {
                this.hasClipRect = true;
                this.clipRectChanged = true;
                this.clipWidth = Math.ceil(width);
                this.clipHeight = Math.ceil(height);
                this.clipArea = this.clipWidth * this.clipHeight;
            };
            /**
             * @private
             * ??????????????????????????????????????????????????????????????????????????????????????????????????????false???
             */
            p.addRegion = function (target) {
                var minX = target.minX, minY = target.minY, maxX = target.maxX, maxY = target.maxY;
                if (DEBUG) {
                    if (isF(minX) || isF(minY) || isF(maxX) || isF(maxY)) {
                        egret.log("addRegion error:", minX, minY, maxX, maxY);
                    }
                }
                if (this.hasClipRect) {
                    if (minX < 0) {
                        minX = 0;
                    }
                    if (minY < 0) {
                        minY = 0;
                    }
                    if (maxX > this.clipWidth) {
                        maxX = this.clipWidth;
                    }
                    if (maxY > this.clipHeight) {
                        maxY = this.clipHeight;
                    }
                }
                if (minX >= maxX || minY >= maxY) {
                    return false;
                }
                if (this.clipRectChanged) {
                    return true;
                }
                var dirtyList = this.dirtyList;
                var region = sys.Region.create();
                dirtyList.push(region.setTo(minX, minY, maxX, maxY));
                this.mergeDirtyList(dirtyList);
                return true;
            };
            /**
             * @private
             */
            p.clear = function () {
                var dirtyList = this.dirtyList;
                var length = dirtyList.length;
                for (var i = 0; i < length; i++) {
                    sys.Region.release(dirtyList[i]);
                }
                dirtyList.length = 0;
            };
            /**
             * @private
             * ??????????????????????????????
             */
            p.getDirtyRegions = function () {
                var dirtyList = this.dirtyList;
                if (this.clipRectChanged) {
                    //todo ???????????????dirty
                    if (egret.Capabilities.runtimeType != egret.RuntimeType.NATIVE) {
                        this.clipRectChanged = false;
                    }
                    this.clear();
                    var region = sys.Region.create();
                    dirtyList.push(region.setTo(0, 0, this.clipWidth, this.clipHeight));
                }
                else {
                    while (this.mergeDirtyList(dirtyList)) {
                    }
                }
                return this.dirtyList;
            };
            /**
             * @private
             * ?????????????????????
             */
            p.mergeDirtyList = function (dirtyList) {
                var length = dirtyList.length;
                if (length < 2) {
                    return false;
                }
                var hasClipRect = this.hasClipRect;
                var bestDelta = length > 3 ? Number.POSITIVE_INFINITY : 0;
                var mergeA = 0;
                var mergeB = 0;
                var totalArea = 0;
                for (var i = 0; i < length - 1; i++) {
                    var regionA = dirtyList[i];
                    hasClipRect && (totalArea += regionA.area);
                    for (var j = i + 1; j < length; j++) {
                        var regionB = dirtyList[j];
                        var delta = unionArea(regionA, regionB) - regionA.area - regionB.area;
                        if (bestDelta > delta) {
                            mergeA = i;
                            mergeB = j;
                            bestDelta = delta;
                        }
                    }
                }
                if (hasClipRect && (totalArea / this.clipArea) > 0.95) {
                    this.clipRectChanged = true;
                }
                if (mergeA != mergeB) {
                    var region = dirtyList[mergeB];
                    dirtyList[mergeA].union(region);
                    sys.Region.release(region);
                    dirtyList.splice(mergeB, 1);
                    return true;
                }
                return false;
            };
            return DirtyRegion;
        })();
        sys.DirtyRegion = DirtyRegion;
        egret.registerClass(DirtyRegion,"egret.sys.DirtyRegion");
    })(sys = egret.sys || (egret.sys = {}));
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @private
     * ???????????????????????????
     */
    function clampRotation(value) {
        value %= 360;
        if (value > 180) {
            value -= 360;
        }
        else if (value < -180) {
            value += 360;
        }
        return value;
    }
    /**
     * @language en_US
     * The DisplayObject class is the base class for all objects that can be placed on the display list. The display list
     * manages all objects displayed in the runtime. Use the DisplayObjectContainer class to arrange the display
     * objects in the display list. DisplayObjectContainer objects can have child display objects, while other display objects,
     * such as Shape and TextField objects, are "leaf" nodes that have only parents and siblings, no children.
     * The DisplayObject class supports basic functionality like the x and y position of an object, as well as more advanced
     * properties of the object such as its transformation matrix.<br/>
     * The DisplayObject class contains several broadcast events.Normally, the target of any particular event is a specific
     * DisplayObject instance. For example, the target of an added event is the specific DisplayObject instance that was added
     * to the display list. Having a single target restricts the placement of event listeners to that target and in some cases
     * the target's ancestors on the display list. With broadcast events, however, the target is not a specific DisplayObject
     * instance, but rather all DisplayObject instances, including those that are not on the display list. This means that you
     * can add a listener to any DisplayObject instance to listen for broadcast events.
     *
     * @event egret.Event.ADDED Dispatched when a display object is added to the display list.
     * @event egret.Event.ADDED_TO_STAGE Dispatched when a display object is added to the on stage display list, either directly or through the addition of a sub tree in which the display object is contained.
     * @event egret.Event.REMOVED Dispatched when a display object is about to be removed from the display list.
     * @event egret.Event.REMOVED_FROM_STAGE Dispatched when a display object is about to be removed from the display list, either directly or through the removal of a sub tree in which the display object is contained.
     * @event egret.Event.ENTER_FRAME [broadcast event] Dispatched when the playhead is entering a new frame.
     * @event egret.Event.RENDER [broadcast event] Dispatched when the display list is about to be updated and rendered.
     * @event egret.TouchEvent.TOUCH_MOVE Dispatched when the user touches the device, and is continuously dispatched until the point of contact is removed.
     * @event egret.TouchEvent.TOUCH_BEGIN Dispatched when the user first contacts a touch-enabled device (such as touches a finger to a mobile phone or tablet with a touch screen).
     * @event egret.TouchEvent.TOUCH_END Dispatched when the user removes contact with a touch-enabled device (such as lifts a finger off a mobile phone or tablet with a touch screen).
     * @event egret.TouchEvent.TOUCH_TAP Dispatched when the user lifts the point of contact over the same DisplayObject instance on which the contact was initiated on a touch-enabled device (such as presses and releases a finger from a single point over a display object on a mobile phone or tablet with a touch screen).
     * @event egret.TouchEvent.TOUCH_RELEASE_OUTSIDE Dispatched when the user lifts the point of contact over the different DisplayObject instance on which the contact was initiated on a touch-enabled device (such as presses and releases a finger from a single point over a display object on a mobile phone or tablet with a touch screen).
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/DisplayObject.ts
     */
    /**
     * @language zh_CN
     * DisplayObject ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? DisplayObjectContainer ?????????
     * ?????????????????????????????????DisplayObjectContainer ???????????????????????????????????????????????????????????? Shape ??? TextField ????????????????????????????????????????????????????????????
     * ?????????DisplayObject ?????????????????????????????????????????????????????? x ??? y ??????????????????????????????????????????????????? Matrix ??????????????????<br/>
     * DisplayObject ??????????????????????????????????????????????????????????????????????????????????????? DisplayObject ??????????????????added ??????????????????????????????????????????
     * ????????? DisplayObject ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * ???????????????????????????????????????????????? DisplayObject ????????????????????? DisplayObject ???????????????????????????????????????????????????????????????????????????????????????
     * DisplayObject ?????????????????????????????????????????????
     *
     * @event egret.Event.ADDED ???????????????????????????????????????????????????
     * @event egret.Event.ADDED_TO_STAGE ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * @event egret.Event.REMOVED ??????????????????????????????????????????????????????
     * @event egret.Event.REMOVED_FROM_STAGE ?????????????????????????????????????????????????????????????????????????????????????????????
     * @event egret.Event.ENTER_FRAME [????????????] ?????????????????????????????????
     * @event egret.Event.RENDER [????????????] ?????????????????????????????????????????????
     * @event egret.TouchEvent.TOUCH_MOVE ??????????????????????????????????????????????????????????????????????????????????????????
     * @event egret.TouchEvent.TOUCH_BEGIN ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * @event egret.TouchEvent.TOUCH_END ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * @event egret.TouchEvent.TOUCH_TAP ???????????????????????????????????????????????????????????? DisplayObject ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * @event egret.TouchEvent.TOUCH_RELEASE_OUTSIDE ???????????????????????????????????????????????????????????? DisplayObject ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/DisplayObject.ts
     */
    var DisplayObject = (function (_super) {
        __extends(DisplayObject, _super);
        /**
         * @language en_US
         * Initializes a DisplayObject object
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        function DisplayObject() {
            _super.call(this);
            /**
             * @private
             * ??????????????????????????????????????????????????????????????????
             */
            this.$children = null;
            /**
             * @private
             */
            this.$parent = null;
            /**
             * @private
             */
            this.$stage = null;
            /**
             * @private
             * ?????????????????????????????????????????????????????????1??????????????????2?????????????????????3??????????????????????????????????????????????????????????????????0.
             */
            this.$nestLevel = 0;
            /**
             * @private
             */
            this.$visible = true;
            /**
             * @private
             * cacheAsBitmap??????????????????????????????
             */
            this.$displayList = null;
            /**
             * @private
             */
            this.$alpha = 1;
            this.$touchEnabled = false;
            /**
             * @private
             */
            this.$scrollRect = null;
            /**
             * @private
             */
            this.$blendMode = 0;
            /**
             * @private
             * ??????????????????
             */
            this.$maskedObject = null;
            /**
             * @private
             */
            this.$mask = null;
            /**
             * @private
             */
            this.$maskRect = null;
            /**
             * @private
             */
            this.$parentDisplayList = null;
            /**
             * @private
             * ????????????????????????????????????????????????????????????????????????????????????????????????????????????
             */
            this.$isDirty = false;
            /**
             * @private
             * ??????????????????????????????????????????
             */
            this.$renderAlpha = 1;
            /**
             * @private
             * ????????????????????????????????????????????????????????????????????????
             */
            this.$renderMatrix = new egret.Matrix();
            /**
             * @private
             * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
             */
            this.$renderRegion = null;
            this.$displayFlags = 880 /* InitFlags */;
            this.$DisplayObject = {
                0: 1,
                1: 1,
                2: 0,
                3: 0,
                4: 0,
                5: "",
                6: new egret.Matrix(),
                7: new egret.Matrix(),
                8: new egret.Matrix(),
                9: new egret.Rectangle(),
                10: new egret.Rectangle(),
                11: false,
                12: 0,
                13: 0,
                14: NaN,
                15: NaN //explicitHeight,
            };
        }
        var d = __define,c=DisplayObject;p=c.prototype;
        /**
         * @private
         * ?????????????????????
         */
        p.$setFlags = function (flags) {
            this.$displayFlags |= flags;
        };
        /**
         * @private
         * ?????????????????????
         */
        p.$removeFlags = function (flags) {
            this.$displayFlags &= ~flags;
        };
        /**
         * @private
         * ??????????????????????????????????????????????????????????????????????????????????????????
         */
        p.$removeFlagsUp = function (flags) {
            if (!this.$hasAnyFlags(flags)) {
                return;
            }
            this.$removeFlags(flags);
            var parent = this.$parent;
            if (parent) {
                parent.$removeFlagsUp(flags);
            }
        };
        /**
         * @private
         * ????????????????????????????????????
         */
        p.$hasFlags = function (flags) {
            return (this.$displayFlags & flags) == flags;
        };
        /**
         * @private
         * ?????????????????????????????????????????????????????????????????????????????????????????????
         */
        p.$propagateFlagsUp = function (flags) {
            if (this.$hasFlags(flags)) {
                return;
            }
            this.$setFlags(flags);
            var parent = this.$parent;
            if (parent) {
                parent.$propagateFlagsUp(flags);
            }
        };
        /**
         * @private
         * ????????????????????????????????????????????????????????????????????????flag?????????????????? DisplayObjectContainer ???????????????
         */
        p.$propagateFlagsDown = function (flags) {
            this.$setFlags(flags);
        };
        /**
         * @private
         * ??????????????????????????????????????????
         */
        p.$hasAnyFlags = function (flags) {
            return !!(this.$displayFlags & flags);
        };
        /**
         * @private
         * ??????????????????
         */
        p.invalidateMatrix = function () {
            this.$setFlags(8 /* InvalidMatrix */);
            this.invalidatePosition();
        };
        /**
         * @private
         * ??????????????????????????????????????????????????????????????????
         */
        p.invalidatePosition = function () {
            this.$invalidateTransform();
            this.$propagateFlagsDown(16 /* InvalidConcatenatedMatrix */ | 32 /* InvalidInvertedConcatenatedMatrix */);
            if (this.$parent) {
                this.$parent.$propagateFlagsUp(4 /* InvalidBounds */);
            }
        };
        d(p, "name"
            /**
             * @language en_US
             * Indicates the instance name of the DisplayObject. The object can be identified in the child list of its parent
             * display object container by calling the getChildByName() method of the display object container.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????? DisplayObject ??????????????????
             * ???????????????????????????????????? getChildByName() ????????????????????????????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$DisplayObject[5 /* name */];
            }
            ,function (value) {
                this.$DisplayObject[5 /* name */] = value;
            }
        );
        d(p, "parent"
            /**
             * @language en_US
             * Indicates the DisplayObjectContainer object that contains this display object. Use the parent property to specify
             * a relative path to display objects that are above the current display object in the display list hierarchy.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????????????????? DisplayObjectContainer ?????????
             * ?????? parent ??????????????????????????????????????????????????????????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$parent;
            }
        );
        /**
         * @private
         * ????????????????????????
         */
        p.$setParent = function (parent) {
            if (this.$parent == parent) {
                return false;
            }
            this.$parent = parent;
            return true;
        };
        /**
         * @private
         * ???????????????????????????
         */
        p.$onAddToStage = function (stage, nestLevel) {
            this.$stage = stage;
            this.$nestLevel = nestLevel;
            egret.Sprite.$EVENT_ADD_TO_STAGE_LIST.push(this);
        };
        /**
         * @private
         * ???????????????????????????
         */
        p.$onRemoveFromStage = function () {
            this.$nestLevel = 0;
            egret.Sprite.$EVENT_REMOVE_FROM_STAGE_LIST.push(this);
        };
        d(p, "stage"
            /**
             * @language en_US
             * The Stage of the display object. you can create and load multiple display objects into the display list, and
             * the stage property of each display object refers to the same Stage object.<br/>
             * If a display object is not added to the display list, its stage property is set to null.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????
             * ????????????????????????????????????????????????????????????????????????????????????????????? stage ???????????????????????? Stage ?????????<br/>
             * ??????????????????????????????????????????????????? stage ?????????????????? null???
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$stage;
            }
        );
        d(p, "matrix"
            /**
             * @language en_US
             * A Matrix object containing values that alter the scaling, rotation, and translation of the display object.<br/>
             * Note: to change the value of a display object's matrix, you must make a copy of the entire matrix object, then copy
             * the new object into the matrix property of the display object.
             * @example the following code increases the tx value of a display object's matrix
             * <pre>
             *     var myMatrix:Matrix = myDisplayObject.matrix;
             *     myMatrix.tx += 10;
             *     myDisplayObject.matrix = myMatrix;
             * </pre>
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????? Matrix ???????????????????????????????????????????????????????????????????????????<br/>
             * ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? matrix ?????????
             * @example ??????????????????????????????????????????tx????????????
             * <pre>
             *     var myMatrix:Matrix = myDisplayObject.matrix;
             *     myMatrix.tx += 10;
             *     myDisplayObject.matrix = myMatrix;
             * </pre>
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$getMatrix().clone();
            }
            ,function (value) {
                this.$setMatrix(value);
            }
        );
        /**
         * @private
         * ????????????
         */
        p.$getMatrix = function () {
            var values = this.$DisplayObject;
            if (this.$hasFlags(8 /* InvalidMatrix */)) {
                values[6 /* matrix */].$updateScaleAndRotation(values[0 /* scaleX */], values[1 /* scaleY */], values[2 /* skewX */], values[3 /* skewY */]);
                this.$removeFlags(8 /* InvalidMatrix */);
            }
            return values[6 /* matrix */];
        };
        /**
         * @private
         * ????????????
         */
        p.$setMatrix = function (matrix, useProperties) {
            if (useProperties === void 0) { useProperties = true; }
            var values = this.$DisplayObject;
            var m = values[6 /* matrix */];
            if (m.equals(matrix)) {
                return false;
            }
            m.copyFrom(matrix);
            if (useProperties) {
                values[0 /* scaleX */] = m.$getScaleX();
                values[1 /* scaleY */] = m.$getScaleY();
                values[2 /* skewX */] = matrix.$getSkewX();
                values[3 /* skewY */] = matrix.$getSkewY();
                values[4 /* rotation */] = clampRotation(values[3 /* skewY */] * 180 / Math.PI);
            }
            this.$removeFlags(8 /* InvalidMatrix */);
            this.invalidatePosition();
            return true;
        };
        /**
         * @private
         * ?????????????????????????????????????????????????????????????????????
         */
        p.$getConcatenatedMatrix = function () {
            var matrix = this.$DisplayObject[7 /* concatenatedMatrix */];
            if (this.$hasFlags(16 /* InvalidConcatenatedMatrix */)) {
                if (this.$parent) {
                    this.$parent.$getConcatenatedMatrix().$preMultiplyInto(this.$getMatrix(), matrix);
                    var values = this.$DisplayObject;
                    var offsetX = values[12 /* anchorOffsetX */];
                    var offsetY = values[13 /* anchorOffsetY */];
                    var rect = this.$scrollRect;
                    if (rect) {
                        matrix.$preMultiplyInto(egret.$TempMatrix.setTo(1, 0, 0, 1, -rect.x - offsetX, -rect.y - offsetY), matrix);
                    }
                    else if (offsetX != 0 || offsetY != 0) {
                        matrix.$preMultiplyInto(egret.$TempMatrix.setTo(1, 0, 0, 1, -offsetX, -offsetY), matrix);
                    }
                }
                else {
                    matrix.copyFrom(this.$getMatrix());
                }
                if (this.$displayList) {
                    this.$displayList.$renderRegion.moved = true;
                }
                if (this.$renderRegion) {
                    this.$renderRegion.moved = true;
                }
                this.$removeFlags(16 /* InvalidConcatenatedMatrix */);
            }
            return matrix;
        };
        /**
         * @private
         * ??????????????????
         */
        p.$getInvertedConcatenatedMatrix = function () {
            var values = this.$DisplayObject;
            if (this.$hasFlags(32 /* InvalidInvertedConcatenatedMatrix */)) {
                this.$getConcatenatedMatrix().$invertInto(values[8 /* invertedConcatenatedMatrix */]);
                this.$removeFlags(32 /* InvalidInvertedConcatenatedMatrix */);
            }
            return values[8 /* invertedConcatenatedMatrix */];
        };
        d(p, "x"
            /**
             * @language en_US
             * Indicates the x coordinate of the DisplayObject instance relative to the local coordinates of the parent
             * DisplayObjectContainer.<br/>
             * If the object is inside a DisplayObjectContainer that has transformations, it is in
             * the local coordinate system of the enclosing DisplayObjectContainer. Thus, for a DisplayObjectContainer
             * rotated 90?? counterclockwise, the DisplayObjectContainer's children inherit a coordinate system that is
             * rotated 90?? counterclockwise. The object's coordinates refer to the registration point position.
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????? DisplayObject ????????????????????? DisplayObjectContainer ??????????????? x ?????????<br/>
             * ???????????????????????????????????? DisplayObjectContainer ??????????????????????????? DisplayObjectContainer ????????????????????????
             * ?????????????????????????????? 90 ?????? DisplayObjectContainer?????? DisplayObjectContainer ????????????????????????????????? 90 ??????????????????
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$getX();
            }
            ,function (value) {
                this.$setX(value);
            }
        );
        /**
         * @private
         * ??????x??????
         */
        p.$getX = function () {
            return this.$DisplayObject[6 /* matrix */].tx;
        };
        /**
         * @private
         * ??????x??????
         */
        p.$setX = function (value) {
            value = egret.sys.getNumber(value);
            var m = this.$DisplayObject[6 /* matrix */];
            if (value == m.tx) {
                return false;
            }
            m.tx = value;
            this.invalidatePosition();
            return true;
        };
        d(p, "y"
            /**
             * @language en_US
             * Indicates the y coordinate of the DisplayObject instance relative to the local coordinates of the parent
             * DisplayObjectContainer. <br/>
             * If the object is inside a DisplayObjectContainer that has transformations, it is in
             * the local coordinate system of the enclosing DisplayObjectContainer. Thus, for a DisplayObjectContainer rotated
             * 90?? counterclockwise, the DisplayObjectContainer's children inherit a coordinate system that is rotated 90??
             * counterclockwise. The object's coordinates refer to the registration point position.
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????? DisplayObject ????????????????????? DisplayObjectContainer ??????????????? y ?????????<br/>
             * ???????????????????????????????????? DisplayObjectContainer ??????????????????????????? DisplayObjectContainer ????????????????????????
             * ?????????????????????????????? 90 ?????? DisplayObjectContainer?????? DisplayObjectContainer ????????????????????????????????? 90 ??????????????????
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$getY();
            }
            ,function (value) {
                this.$setY(value);
            }
        );
        /**
         * @private
         * ??????y??????
         */
        p.$getY = function () {
            return this.$DisplayObject[6 /* matrix */].ty;
        };
        /**
         * @private
         * ??????y??????
         */
        p.$setY = function (value) {
            value = egret.sys.getNumber(value);
            var m = this.$DisplayObject[6 /* matrix */];
            if (value == m.ty) {
                return false;
            }
            m.ty = value;
            this.invalidatePosition();
            return true;
        };
        d(p, "scaleX"
            /**
             * @language en_US
             * Indicates the horizontal scale (percentage) of the object as applied from the registration point. <br/>
             * The default 1.0 equals 100% scale.
             * @default 1
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????????????????????????????<br/>
             * 1.0 ?????? 100% ?????????
             * @default 1
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$getScaleX();
            }
            ,function (value) {
                this.$setScaleX(value);
            }
        );
        /**
         * @private
         *
         * @returns
         */
        p.$getScaleX = function () {
            return this.$DisplayObject[0 /* scaleX */];
        };
        /**
         * @private
         * ?????????????????????
         */
        p.$setScaleX = function (value) {
            value = egret.sys.getNumber(value);
            var values = this.$DisplayObject;
            if (value == values[0 /* scaleX */]) {
                return false;
            }
            values[0 /* scaleX */] = value;
            this.invalidateMatrix();
            return true;
        };
        d(p, "scaleY"
            /**
             * @language en_US
             * Indicates the vertical scale (percentage) of an object as applied from the registration point of the object.
             * 1.0 is 100% scale.
             * @default 1
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????????????????????????????????????????????????????1.0 ??? 100% ?????????
             * @default 1
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$getScaleY();
            }
            ,function (value) {
                this.$setScaleY(value);
            }
        );
        /**
         * @private
         *
         * @returns
         */
        p.$getScaleY = function () {
            return this.$DisplayObject[1 /* scaleY */];
        };
        /**
         * @private
         * ?????????????????????
         */
        p.$setScaleY = function (value) {
            value = egret.sys.getNumber(value);
            if (value == this.$DisplayObject[1 /* scaleY */]) {
                return false;
            }
            this.$DisplayObject[1 /* scaleY */] = value;
            this.invalidateMatrix();
            return true;
        };
        d(p, "rotation"
            /**
             * @language en_US
             * Indicates the rotation of the DisplayObject instance, in degrees, from its original orientation. Values from
             * 0 to 180 represent clockwise rotation; values from 0 to -180 represent counterclockwise rotation. Values outside
             * this range are added to or subtracted from 360 to obtain a value within the range. For example, the statement
             * myDisplayObject.rotation = 450 is the same as myDisplayObject.rotation = 90.
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????? DisplayObject ????????????????????????????????????????????????????????????
             * ??? 0 ??? 180 ??????????????????????????????????????? 0 ??? -180 ???????????????????????????????????????????????????????????????????????????????????????
             * ?????? 360 ????????????????????????????????????myDisplayObject.rotation = 450????????? myDisplayObject.rotation = 90 ???????????????
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$getRotation();
            }
            ,function (value) {
                this.$setRotation(value);
            }
        );
        /**
         * @private
         *
         * @returns
         */
        p.$getRotation = function () {
            return this.$DisplayObject[4 /* rotation */];
        };
        p.$setRotation = function (value) {
            value = egret.sys.getNumber(value);
            value = clampRotation(value);
            var values = this.$DisplayObject;
            if (value == values[4 /* rotation */]) {
                return false;
            }
            var delta = value - values[4 /* rotation */];
            var angle = delta / 180 * Math.PI;
            values[2 /* skewX */] += angle;
            values[3 /* skewY */] += angle;
            values[4 /* rotation */] = value;
            this.invalidateMatrix();
            return true;
        };
        d(p, "skewX"
            /**
             * ??????DisplayObject???x????????????
             * @member {number} egret.DisplayObject#skewX
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$DisplayObject[2 /* skewX */];
            }
            ,function (value) {
                this.$setSkewX(value);
            }
        );
        /**
         * @private
         *
         * @param value
         */
        p.$setSkewX = function (value) {
            value = egret.sys.getNumber(value);
            value = clampRotation(value);
            value = value / 180 * Math.PI;
            var values = this.$DisplayObject;
            if (value == values[2 /* skewX */]) {
                return false;
            }
            values[2 /* skewX */] = value;
            this.invalidateMatrix();
            return true;
        };
        d(p, "skewY"
            /**
             * ??????DisplayObject???y????????????
             * @member {number} egret.DisplayObject#skewY
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$DisplayObject[3 /* skewY */];
            }
            ,function (value) {
                this.$setSkewY(value);
            }
        );
        /**
         * @private
         *
         * @param value
         */
        p.$setSkewY = function (value) {
            value = egret.sys.getNumber(value);
            value = clampRotation(value);
            value = value / 180 * Math.PI;
            var values = this.$DisplayObject;
            if (value == values[3 /* skewY */]) {
                return false;
            }
            values[3 /* skewY */] = value;
            this.invalidateMatrix();
            return true;
        };
        d(p, "width"
            /**
             * @language en_US
             * Indicates the width of the display object, in pixels. The width is calculated based on the bounds of the content
             * of the display object.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????????????????????????????????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$getWidth();
            }
            ,function (value) {
                this.$setWidth(value);
            }
        );
        /**
         * @private
         * ??????????????????
         */
        p.$getWidth = function () {
            return isNaN(this.$getExplicitWidth()) ? this.$getOriginalBounds().width : this.$getExplicitWidth();
            //return this.$getTransformedBounds(this.$parent, $TempRectangle).width;
        };
        /**
         * @private
         *
         * @returns
         */
        p.$getExplicitWidth = function () {
            return this.$DisplayObject[14 /* explicitWidth */];
        };
        /**
         * @private
         * ??????????????????
         */
        p.$setWidth = function (value) {
            this.$DisplayObject[14 /* explicitWidth */] = isNaN(value) ? NaN : value;
            value = +value;
            if (value < 0) {
                return false;
            }
            if (false) {
                var values = this.$DisplayObject;
                var originalBounds = this.$getOriginalBounds();
                var bounds = this.$getTransformedBounds(this.$parent, egret.$TempRectangle);
                var angle = values[4 /* rotation */] / 180 * Math.PI;
                var baseWidth = originalBounds.$getBaseWidth(angle);
                if (!baseWidth) {
                    return false;
                }
                var baseHeight = originalBounds.$getBaseHeight(angle);
                values[1 /* scaleY */] = bounds.height / baseHeight;
                values[0 /* scaleX */] = value / baseWidth;
            }
            this.invalidateMatrix();
            return true;
        };
        d(p, "height"
            /**
             * @language en_US
             * Indicates the height of the display object, in pixels. The height is calculated based on the bounds of the
             * content of the display object.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????????????????????????????????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$getHeight();
            }
            ,function (value) {
                this.$setHeight(value);
            }
        );
        /**
         * @private
         * ??????????????????
         */
        p.$getHeight = function () {
            return isNaN(this.$getExplicitHeight()) ? this.$getOriginalBounds().height : this.$getExplicitHeight();
            //return this.$getTransformedBounds(this.$parent, $TempRectangle).height;
        };
        /**
         * @private
         *
         * @returns
         */
        p.$getExplicitHeight = function () {
            return this.$DisplayObject[15 /* explicitHeight */];
        };
        /**
         * @private
         * ??????????????????
         */
        p.$setHeight = function (value) {
            this.$DisplayObject[15 /* explicitHeight */] = isNaN(value) ? NaN : value;
            value = +value;
            if (value < 0) {
                return false;
            }
            if (false) {
                var values = this.$DisplayObject;
                var originalBounds = this.$getOriginalBounds();
                var bounds = this.$getTransformedBounds(this.$parent, egret.$TempRectangle);
                var angle = values[4 /* rotation */] / 180 * Math.PI;
                var baseHeight = originalBounds.$getBaseHeight(angle);
                if (!baseHeight) {
                    return false;
                }
                var baseWidth = originalBounds.$getBaseWidth(angle);
                values[1 /* scaleY */] = value / baseHeight;
                values[0 /* scaleX */] = bounds.width / baseWidth;
            }
            this.invalidateMatrix();
            return true;
        };
        d(p, "measuredWidth"
            /**
             * ????????????
             * @returns {number}
             * @member {egret.Rectangle} egret.DisplayObject#measuredWidth
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$getOriginalBounds().width;
            }
        );
        d(p, "measuredHeight"
            /**
             * ????????????
             * @returns {number}
             * @member {egret.Rectangle} egret.DisplayObject#measuredWidth
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$getOriginalBounds().height;
            }
        );
        d(p, "anchorOffsetX"
            /**
             * @language en_US
             * X represents the object of which is the anchor.
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????X???
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$DisplayObject[12 /* anchorOffsetX */];
            }
            ,function (value) {
                this.$setAnchorOffsetX(value);
            }
        );
        /**
         * @private
         *
         * @param value
         * @returns
         */
        p.$setAnchorOffsetX = function (value) {
            value = egret.sys.getNumber(value);
            if (value == this.$DisplayObject[12 /* anchorOffsetX */]) {
                return false;
            }
            this.$DisplayObject[12 /* anchorOffsetX */] = value;
            this.invalidatePosition();
            return true;
        };
        d(p, "anchorOffsetY"
            /**
             * @language en_US
             * Y represents the object of which is the anchor.
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????Y???
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$DisplayObject[13 /* anchorOffsetY */];
            }
            ,function (value) {
                this.$setAnchorOffsetY(value);
            }
        );
        /**
         * @private
         *
         * @param value
         * @returns
         */
        p.$setAnchorOffsetY = function (value) {
            value = egret.sys.getNumber(value);
            if (value == this.$DisplayObject[13 /* anchorOffsetY */]) {
                return false;
            }
            this.$DisplayObject[13 /* anchorOffsetY */] = value;
            this.invalidatePosition();
            return true;
        };
        d(p, "visible"
            /**
             * @language en_US
             * Whether or not the display object is visible. Display objects that are not visible are disabled. For example,
             * if visible=false for an DisplayObject instance, it cannot receive touch or other user input.
             * @default true
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????????????????????????????????????????????????????????????????????????????? visible ??? false????????????????????????????????????????????????
             * @default true
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$visible;
            }
            ,function (value) {
                this.$setVisible(value);
            }
        );
        p.$setVisible = function (value) {
            value = !!value;
            if (value == this.$visible) {
                return false;
            }
            this.$visible = value;
            this.$invalidateTransform();
            return true;
        };
        d(p, "cacheAsBitmap"
            /**
             * @language en_US
             * If set to true, Egret runtime caches an internal bitmap representation of the display object. This caching can
             * increase performance for display objects that contain complex vector content. After you set the cacheAsBitmap
             * property to true, the rendering does not change, however the display object performs pixel snapping automatically.
             * The execution speed can be significantly faster depending on the complexity of the content.The cacheAsBitmap
             * property is best used with display objects that have mostly static content and that do not scale and rotate frequently.<br/>
             * Note: The display object will not create the bitmap caching when the memory exceeds the upper limit,even if you set it to true.
             * @default false
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????? true?????? Egret ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
             * ??? cacheAsBitmap ??????????????? true ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
             * ????????????????????????????????????????????????????????? cacheAsBitmap ??????????????????????????????????????????????????????????????????????????????????????????<br/>
             * ?????????????????????????????????????????????????????? cacheAsBitmap ??????????????? true??????????????????????????????????????????
             * @default false
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$DisplayObject[11 /* cacheAsBitmap */];
            }
            ,function (value) {
                value = !!value;
                this.$DisplayObject[11 /* cacheAsBitmap */] = value;
                var hasDisplayList = !!this.$displayList;
                if (hasDisplayList == value) {
                    return;
                }
                if (value) {
                    var displayList = egret.sys.DisplayList.create(this);
                    if (displayList) {
                        this.$displayList = displayList;
                        if (this.$parentDisplayList) {
                            displayList.setDevicePixelRatio(this.$parentDisplayList.$ratioMatrix.a);
                            this.$parentDisplayList.markDirty(displayList);
                        }
                        this.$cacheAsBitmapChanged();
                    }
                }
                else {
                    egret.sys.DisplayList.release(this.$displayList);
                    this.$displayList = null;
                    this.$cacheAsBitmapChanged();
                }
            }
        );
        /**
         * @private
         * cacheAsBitmap????????????
         */
        p.$cacheAsBitmapChanged = function () {
            var parentCache = this.$displayList || this.$parentDisplayList;
            if (this.$renderRegion) {
                parentCache.markDirty(this);
            }
            this.$propagateFlagsDown(16 /* InvalidConcatenatedMatrix */ | 32 /* InvalidInvertedConcatenatedMatrix */);
        };
        d(p, "alpha"
            /**
             * @language en_US
             * Indicates the alpha transparency value of the object specified. Valid values are 0 (fully transparent) to 1 (fully opaque).
             * The default value is 1. Display objects with alpha set to 0 are active, even though they are invisible.
             * @default 1
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????? Alpha ???????????????
             * ???????????? 0????????????????????? 1????????????????????????alpha ????????? 0 ?????????????????????????????????????????????????????????
             * @default 1
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$alpha;
            }
            ,function (value) {
                this.$setAlpha(value);
            }
        );
        /**
         * @private
         *
         * @param value
         */
        p.$setAlpha = function (value) {
            value = egret.sys.getNumber(value);
            if (value == this.$alpha) {
                return false;
            }
            this.$alpha = value;
            this.$propagateFlagsDown(64 /* InvalidConcatenatedAlpha */);
            this.$invalidate(true);
            return true;
        };
        /**
         * @private
         * ????????????????????????????????????????????????????????????
         */
        p.$getConcatenatedAlpha = function () {
            if (this.$hasFlags(64 /* InvalidConcatenatedAlpha */)) {
                if (this.$parent) {
                    var parentAlpha = this.$parent.$getConcatenatedAlpha();
                    this.$renderAlpha = parentAlpha * this.$alpha;
                }
                else {
                    this.$renderAlpha = this.$alpha;
                }
                this.$removeFlags(64 /* InvalidConcatenatedAlpha */);
            }
            return this.$renderAlpha;
        };
        d(p, "touchEnabled"
            /**
             * @language en_US
             * Specifies whether this object receives touch or other user input. The default value is false, which means that
             * by default any DisplayObject instance that is on the display list cannot receive touch events. If touchEnabled is
             * set to false, the instance does not receive any touch events (or other user input events). Any children of
             * this instance on the display list are not affected. To change the touchEnabled behavior for all children of
             * an object on the display list, use DisplayObjectContainer.touchChildren.
             * @see egret.DisplayObjectContainer#touchChildren
             * @default false
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????????????????????????????????????? false?????????????????????????????????????????????????????? DisplayObject ????????????????????????????????????
             * ???????????????????????????????????? touchEnabled ????????? false???????????????????????????????????????????????????????????????????????????????????????????????????????????????
             * ????????????????????????????????????????????????????????????????????????????????? touchEnabled ?????????????????? DisplayObjectContainer.touchChildren???
             * @see egret.DisplayObjectContainer#touchChildren
             * @default false
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$getTouchEnabled();
            }
            ,function (value) {
                this.$setTouchEnabled(value);
            }
        );
        /**
         * @private
         *
         * @returns
         */
        p.$getTouchEnabled = function () {
            return this.$touchEnabled;
        };
        /**
         * @private
         */
        p.$setTouchEnabled = function (value) {
            if (this.$touchEnabled == value) {
                return false;
            }
            this.$touchEnabled = value;
            return true;
        };
        d(p, "scrollRect"
            /**
             * @language en_US
             * The scroll rectangle bounds of the display object. The display object is cropped to the size defined by the rectangle,
             * and it scrolls within the rectangle when you change the x and y properties of the scrollRect object. A scrolled display
             * object always scrolls in whole pixel increments.You can scroll an object left and right by setting the x property of
             * the scrollRect Rectangle object. You can scroll an object up and down by setting the y property of the scrollRect
             * Rectangle object. If the display object is rotated 90?? and you scroll it left and right, the display object actually
             * scrolls up and down.<br/>
             *
             * Note: to change the value of a display object's scrollRect, you must make a copy of the entire scrollRect object, then copy
             * the new object into the scrollRect property of the display object.
             * @example the following code increases the x value of a display object's scrollRect
             * <pre>
             *     var myRectangle:Rectangle = myDisplayObject.scrollRect;
             *     myRectangle.x += 10;
             *     myDisplayObject.scrollRect = myRectangle;
             * </pre>
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????????????????????????????????????????????????????????????????? scrollRect ????????? x ??? y ???????????????????????????????????????
             * ???????????????????????????????????????????????????????????????????????????????????? scrollRect Rectangle ????????? x ?????????????????????????????? ?????????????????????
             * scrollRect ????????? y ????????????????????????????????????????????????????????? 90 ???????????????????????????????????????????????????????????????????????????<br/>
             *
             * ???????????????????????????????????? scrollRect ????????????????????????????????? scrollRect ??????????????????????????????????????????????????? scrollRect ?????????
             * @example ????????????????????????????????? scrollRect ??? x ????????????
             * <pre>
             *     var myRectangle:Rectangle = myDisplayObject.scrollRect;
             *     myRectangle.x += 10;
             *     myDisplayObject.scrollRect = myRectangle;//?????????scrollRect???x???y???width???height????????????????????????myDisplayObject????????????scrollRect????????????????????????
             * </pre>
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$scrollRect;
            }
            ,function (value) {
                this.$setScrollRect(value);
            }
        );
        /**
         * @private
         *
         * @param value
         */
        p.$setScrollRect = function (value) {
            if (!value && !this.$scrollRect) {
                return false;
            }
            if (value) {
                if (!this.$scrollRect) {
                    this.$scrollRect = new egret.Rectangle();
                }
                this.$scrollRect.copyFrom(value);
            }
            else {
                this.$scrollRect = null;
            }
            this.invalidatePosition();
            return true;
        };
        d(p, "blendMode"
            /**
             * @language en_US
             * A value from the BlendMode class that specifies which blend mode to use. Determine how a source image (new one)
             * is drawn on the target image (old one).<br/>
             * If you attempt to set this property to an invalid value, Egret runtime set the value to BlendMode.NORMAL.
             * @default egret.BlendMode.NORMAL
             * @see egret.BlendMode
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * BlendMode ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????<br/>
             * ?????????????????????????????????????????????????????????????????????????????? BlendMode.NORMAL???
             * @default egret.BlendMode.NORMAL
             * @see egret.BlendMode
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return egret.sys.numberToBlendMode(this.$blendMode);
            }
            ,function (value) {
                var mode = egret.sys.blendModeToNumber(value);
                if (mode == this.$blendMode) {
                    return;
                }
                this.$blendMode = mode;
                this.$invalidateTransform();
            }
        );
        d(p, "mask"
            /**
             * @language en_US
             * The calling display object is masked by the specified mask object. To ensure that masking works when the Stage
             * is scaled, the mask display object must be in an active part of the display list. The mask object itself is not drawn.
             * Set mask to null to remove the mask. To be able to scale a mask object, it must be on the display list. To be
             * able to drag a mask object , it must be on the display list.<br/>
             * Note: A single mask object cannot be used to mask more than one calling display object. When the mask is assigned
             * to a second display object, it is removed as the mask of the first object, and that object's mask property becomes null.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????????????????? mask ???????????????????????????????????????????????????????????????mask ??????????????????????????????????????????????????????
             * ???????????? mask ?????????????????? mask ????????? null ???????????????????????????????????????????????????????????????????????????????????????????????????
             * ???????????????????????????????????????<br/>
             * ??????????????? mask ?????????????????????????????????????????????????????????????????? mask ?????????????????????????????????????????????????????????????????????????????????
             * ???????????? mask ??????????????? null???
             *
             * ??????????????? mask ??? Rectangle ??????????????????????????????????????? mask ???????????????????????? myDisplayObject ???????????? mask????????????????????????
             * @example ????????????????????????????????? mask ??? x ????????????
             * <pre>
             *     var myMask:Rectangle = myDisplayObject.mask;
             *     myMask.x += 10;
             *     myDisplayObject.mask = myMask;//????????? mask ???x???y???width???height????????????????????????myDisplayObject???????????? mask????????????????????????
             * </pre>
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$mask ? this.$mask : this.$maskRect;
            }
            ,function (value) {
                if (value === this) {
                    return;
                }
                if (value) {
                    if (value instanceof DisplayObject) {
                        if (value == this.$mask) {
                            return;
                        }
                        if (value.$maskedObject) {
                            value.$maskedObject.mask = null;
                        }
                        value.$maskedObject = this;
                        this.$mask = value;
                        this.$maskRect = null;
                    }
                    else {
                        this.$setMaskRect(value);
                        this.$mask = null;
                    }
                }
                else {
                    this.$mask = null;
                    this.$maskRect = null;
                }
                this.$invalidateTransform();
            }
        );
        p.$setMaskRect = function (value) {
            if (!value && !this.$maskRect) {
                return false;
            }
            if (value) {
                if (!this.$maskRect) {
                    this.$maskRect = new egret.Rectangle();
                }
                this.$maskRect.copyFrom(value);
            }
            else {
                this.$maskRect = null;
            }
            this.invalidatePosition();
            return true;
        };
        /**
         * @language en_US
         * Returns a rectangle that defines the area of the display object relative to the coordinate system of the targetCoordinateSpace object.
         * @param targetCoordinateSpace The display object that defines the coordinate system to use.
         * @param resultRect A reusable instance of Rectangle for saving the results. Passing this parameter can reduce the number of reallocate objects
         *, which allows you to get better code execution performance..
         * @returns The rectangle that defines the area of the display object relative to the targetCoordinateSpace object's coordinate system.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????? targetCoordinateSpace ???????????????????????????????????????
         * @param targetCoordinateSpace ?????????????????????????????????????????????
         * @param resultRect ????????????????????????????????????Rectangle??????????????????????????????????????????????????????????????????????????????????????????????????????
         * @returns ????????? targetCoordinateSpace ?????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.getTransformedBounds = function (targetCoordinateSpace, resultRect) {
            targetCoordinateSpace = targetCoordinateSpace || this;
            return this.$getTransformedBounds(targetCoordinateSpace, resultRect);
        };
        /**
         * @language en_US
         * Obtain measurement boundary of display object
         * @param resultRect {Rectangle} Optional. It is used to import Rectangle object for saving results, preventing duplicate object creation.
         * @param calculateAnchor {boolean} Optional. It is used to determine whether to calculate anchor point.
         * @returns {Rectangle}
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????
         * @param resultRect {Rectangle} ??????????????????????????????????????????Rectangle????????????????????????????????????
         * @param calculateAnchor {boolean} ???????????????????????????????????????
         * @returns {Rectangle}
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.getBounds = function (resultRect, calculateAnchor) {
            if (calculateAnchor === void 0) { calculateAnchor = true; }
            resultRect = this.$getTransformedBounds(this, resultRect);
            if (calculateAnchor) {
                var values = this.$DisplayObject;
                if (values[12 /* anchorOffsetX */] != 0 || values[13 /* anchorOffsetY */] != 0) {
                    resultRect.x -= values[12 /* anchorOffsetX */];
                    resultRect.y -= values[13 /* anchorOffsetY */];
                }
            }
            return resultRect;
        };
        /**
         * @private
         */
        p.$getTransformedBounds = function (targetCoordinateSpace, resultRect) {
            var bounds = this.$getOriginalBounds();
            if (!resultRect) {
                resultRect = new egret.Rectangle();
            }
            resultRect.copyFrom(bounds);
            if (targetCoordinateSpace == this || resultRect.isEmpty()) {
                return resultRect;
            }
            var m;
            if (targetCoordinateSpace) {
                m = egret.$TempMatrix;
                var invertedTargetMatrix = targetCoordinateSpace.$getInvertedConcatenatedMatrix();
                invertedTargetMatrix.$preMultiplyInto(this.$getConcatenatedMatrix(), m);
            }
            else {
                m = this.$getConcatenatedMatrix();
            }
            m.$transformBounds(resultRect);
            return resultRect;
        };
        /**
         * @language en_US
         * Converts the point object from the Stage (global) coordinates to the display object's (local) coordinates.
         * @param stageX the x value in the global coordinates
         * @param stageY the y value in the global coordinates
         * @param resultPoint A reusable instance of Point for saving the results. Passing this parameter can reduce the
         * number of reallocate objects, which allows you to get better code execution performance.
         * @returns A Point object with coordinates relative to the display object.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????????????????
         * @param stageX ????????????x
         * @param stageY ????????????y
         * @param resultPoint ???????????????????????????????????? Point ??????????????????????????????????????????????????????????????????????????????????????????????????????
         * @returns ??????????????????????????????????????? Point ?????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.globalToLocal = function (stageX, stageY, resultPoint) {
            if (stageX === void 0) { stageX = 0; }
            if (stageY === void 0) { stageY = 0; }
            var m = this.$getInvertedConcatenatedMatrix();
            return m.transformPoint(stageX, stageY, resultPoint);
        };
        /**
         * @language en_US
         * Converts the point object from the display object's (local) coordinates to the Stage (global) coordinates.
         * @param localX the x value in the local coordinates
         * @param localY the x value in the local coordinates
         * @param resultPoint A reusable instance of Point for saving the results. Passing this parameter can reduce the
         * number of reallocate objects, which allows you to get better code execution performance.
         * @returns  A Point object with coordinates relative to the Stage.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????????????????????????????????
         * @param localX ???????????? x
         * @param localY ???????????? y
         * @param resultPoint ???????????????????????????????????? Point ??????????????????????????????????????????????????????????????????????????????????????????????????????
         * @returns ???????????????????????????????????? Point ?????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.localToGlobal = function (localX, localY, resultPoint) {
            if (localX === void 0) { localX = 0; }
            if (localY === void 0) { localY = 0; }
            var m = this.$getConcatenatedMatrix();
            return m.transformPoint(localX, localY, resultPoint);
        };
        /**
         * @private
         * ?????????????????????????????????
         */
        p.$invalidateContentBounds = function () {
            this.$invalidate();
            this.$setFlags(2 /* InvalidContentBounds */);
            this.$propagateFlagsUp(4 /* InvalidBounds */);
        };
        /**
         * @private
         * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         */
        p.$getOriginalBounds = function () {
            var bounds = this.$DisplayObject[9 /* bounds */];
            if (this.$hasFlags(4 /* InvalidBounds */)) {
                bounds.copyFrom(this.$getContentBounds());
                this.$measureChildBounds(bounds);
                this.$removeFlags(4 /* InvalidBounds */);
                if (this.$displayList) {
                    this.$displayList.$renderRegion.moved = true;
                }
            }
            return bounds;
        };
        /**
         * @private
         * ?????????????????????????????????
         * @param bounds ??????????????????????????????????????????
         */
        p.$measureChildBounds = function (bounds) {
        };
        /**
         * @private
         */
        p.$getContentBounds = function () {
            var bounds = this.$DisplayObject[10 /* contentBounds */];
            if (this.$hasFlags(2 /* InvalidContentBounds */)) {
                this.$measureContentBounds(bounds);
                if (this.$renderRegion) {
                    this.$renderRegion.moved = true;
                }
                this.$removeFlags(2 /* InvalidContentBounds */);
            }
            return bounds;
        };
        /**
         * @private
         * ????????????????????????????????????????????????????????????????????????????????????????????????
         * @param bounds ??????????????????????????????????????????
         */
        p.$measureContentBounds = function (bounds) {
        };
        /**
         * @private
         * ???????????????????????????????????????????????????????????????cacheAsBitmap?????????????????????????????????????????????????????????????????????????????????$invalidateTransform().
         * @param notiryChildren ??????????????????????????????????????????false????????????????????????????????????????????????????????????alpha??????????????????????????????????????????
         */
        p.$invalidate = function (notifyChildren) {
            if (!this.$renderRegion || this.$hasFlags(256 /* DirtyRender */)) {
                return;
            }
            this.$setFlags(256 /* DirtyRender */);
            var displayList = this.$displayList ? this.$displayList : this.$parentDisplayList;
            if (displayList) {
                displayList.markDirty(this);
            }
        };
        /**
         * @private
         * ????????????????????????????????????????????????????????????????????????????????????????????????????????????cacheAsBitmap?????????
         * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????$invalidate()???
         */
        p.$invalidateTransform = function () {
            if (this.$hasFlags(512 /* DirtyChildren */)) {
                return;
            }
            this.$setFlags(512 /* DirtyChildren */);
            var displayList = this.$displayList;
            if ((displayList || this.$renderRegion) && this.$parentDisplayList) {
                this.$parentDisplayList.markDirty(displayList || this);
            }
        };
        /**
         * @private
         * ???????????????????????????????????????????????????,???????????????????????????????????????
         */
        p.$update = function () {
            this.$removeFlagsUp(768 /* Dirty */);
            this.$getConcatenatedAlpha();
            //???????????????moved??????????????????????????????????????????moved???????????????????????????????????????
            var concatenatedMatrix = this.$getConcatenatedMatrix();
            var bounds = this.$getContentBounds();
            var displayList = this.$displayList || this.$parentDisplayList;
            var region = this.$renderRegion;
            if (!displayList) {
                region.setTo(0, 0, 0, 0);
                region.moved = false;
                return false;
            }
            if (!region.moved && !displayList.$ratioChanged) {
                return false;
            }
            region.moved = false;
            var matrix = this.$renderMatrix;
            matrix.copyFrom(concatenatedMatrix);
            var root = displayList.root;
            if (root !== this.$stage) {
                this.$getConcatenatedMatrixAt(root, matrix);
            }
            displayList.$ratioMatrix.$preMultiplyInto(matrix, matrix);
            region.updateRegion(bounds, matrix);
            return true;
        };
        /**
         * @private
         * ????????????????????????????????????????????????
         * @param root ?????????????????????
         * @param matrix ?????????????????????????????????????????????????????????
         */
        p.$getConcatenatedMatrixAt = function (root, matrix) {
            var invertMatrix = root.$getInvertedConcatenatedMatrix();
            if (invertMatrix.a === 0 || invertMatrix.d === 0) {
                var target = this;
                var rootLevel = root.$nestLevel;
                matrix.identity();
                while (target.$nestLevel > rootLevel) {
                    var rect = target.$scrollRect;
                    if (rect) {
                        matrix.concat(egret.$TempMatrix.setTo(1, 0, 0, 1, -rect.x, -rect.y));
                    }
                    matrix.concat(target.$getMatrix());
                    target = target.$parent;
                }
            }
            else {
                invertMatrix.$preMultiplyInto(matrix, matrix);
            }
        };
        /**
         * @private
         * ????????????,?????????????????????
         */
        p.$render = function (context) {
        };
        /**
         * @private
         */
        p.$hitTest = function (stageX, stageY) {
            if (!this.$renderRegion || !this.$visible) {
                return null;
            }
            var m = this.$getInvertedConcatenatedMatrix();
            var bounds = this.$getContentBounds();
            var localX = m.a * stageX + m.c * stageY + m.tx;
            var localY = m.b * stageX + m.d * stageY + m.ty;
            if (bounds.contains(localX, localY)) {
                if (!this.$children) {
                    var rect = this.$scrollRect ? this.$scrollRect : this.$maskRect;
                    if (rect && !rect.contains(localX, localY)) {
                        return null;
                    }
                    if (this.$mask && !this.$mask.$hitTest(stageX, stageY)) {
                        return null;
                    }
                }
                return this;
            }
            return null;
        };
        /**
         * @language en_US
         * Calculate the display object to determine whether it overlaps or crosses with the points specified by the x and y parameters. The x and y parameters specify the points in the coordinates of the stage, rather than the points in the display object container that contains display objects (except the situation where the display object container is a stage).
         * Note: Don't use accurate pixel collision detection on a large number of objects. Otherwise, this will cause serious performance deterioration.
         * @param x {number}  x coordinate of the object to be tested.
         * @param y {number}  y coordinate of the object to be tested.
         * @param shapeFlag {boolean} Whether to check the actual pixel of object (true) or check that of border (false).Write realized.
         * @returns {boolean} If display object overlaps or crosses with the specified point, it is true; otherwise, it is false.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????????????? x ??? y ????????????????????????????????????x ??? y ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * ???????????????????????????????????????????????????????????????????????????????????????????????????
         * @param x {number}  ???????????????????????? x ?????????
         * @param y {number}  ???????????????????????? y ?????????
         * @param shapeFlag {boolean} ??????????????? (true) ???????????????????????????????????? (false) ?????????????????????????????????
         * @returns {boolean} ????????????????????????????????????????????????????????? true???????????? false???
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.hitTestPoint = function (x, y, shapeFlag) {
            return !!this.$hitTest(x, y);
        };
        /**
         * @private
         */
        p.$addListener = function (type, listener, thisObject, useCapture, priority, dispatchOnce) {
            _super.prototype.$addListener.call(this, type, listener, thisObject, useCapture, priority, dispatchOnce);
            var isEnterFrame = (type == egret.Event.ENTER_FRAME);
            if (isEnterFrame || type == egret.Event.RENDER) {
                var list = isEnterFrame ? DisplayObject.$enterFrameCallBackList : DisplayObject.$renderCallBackList;
                if (list.indexOf(this) == -1) {
                    list.push(this);
                }
            }
        };
        /**
         * @inheritDoc
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.removeEventListener = function (type, listener, thisObject, useCapture) {
            _super.prototype.removeEventListener.call(this, type, listener, thisObject, useCapture);
            var isEnterFrame = (type == egret.Event.ENTER_FRAME);
            if ((isEnterFrame || type == egret.Event.RENDER) && !this.hasEventListener(type)) {
                var list = isEnterFrame ? DisplayObject.$enterFrameCallBackList : DisplayObject.$renderCallBackList;
                var index = list.indexOf(this);
                if (index !== -1) {
                    list.splice(index, 1);
                }
            }
        };
        /**
         * @inheritDoc
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.dispatchEvent = function (event) {
            if (!event.$bubbles) {
                return _super.prototype.dispatchEvent.call(this, event);
            }
            var list = this.$getPropagationList(this);
            var targetIndex = list.length * 0.5;
            event.$setTarget(this);
            this.$dispatchPropagationEvent(event, list, targetIndex);
            return !event.$isDefaultPrevented;
        };
        /**
         * @private
         * ?????????????????????????????????Egret?????????????????????Flash?????????????????????
         *
         * ??????????????????????????????????????????????????????
         * Flash???????????????????????????????????????useCapture??????????????????????????????????????????capture???????????????????????????????????????????????????
         * ?????????Flash???????????????????????????????????????????????????????????????????????????TextField???????????????useCapture???true???false?????????????????????
         * ??????????????????useCapture???false?????????????????????????????????????????????????????????Flash????????????????????????????????????????????????????????????????????????????????????
         *
         * ???HTML?????????????????????useCapture???true??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * ???????????????????????????????????????????????????????????????
         *
         * Egret???????????????HTML????????????????????????????????????????????????
         */
        p.$getPropagationList = function (target) {
            var list = [];
            while (target) {
                list.push(target);
                target = target.$parent;
            }
            var captureList = list.concat();
            captureList.reverse(); //????????????reverse()?????????????????????unshift()????????????
            list = captureList.concat(list);
            return list;
        };
        /**
         * @private
         */
        p.$dispatchPropagationEvent = function (event, list, targetIndex) {
            var length = list.length;
            var captureIndex = targetIndex - 1;
            for (var i = 0; i < length; i++) {
                var currentTarget = list[i];
                event.$currentTarget = currentTarget;
                if (i < captureIndex)
                    event.$eventPhase = 1 /* CAPTURING_PHASE */;
                else if (i == targetIndex || i == captureIndex)
                    event.$eventPhase = 2 /* AT_TARGET */;
                else
                    event.$eventPhase = 3 /* BUBBLING_PHASE */;
                currentTarget.$notifyListener(event, i < targetIndex);
                if (event.$isPropagationStopped || event.$isPropagationImmediateStopped) {
                    return;
                }
            }
        };
        /**
         * @inheritDoc
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.willTrigger = function (type) {
            var parent = this;
            while (parent) {
                if (parent.hasEventListener(type))
                    return true;
                parent = parent.$parent;
            }
            return false;
        };
        /**
         * @private
         */
        DisplayObject.$enterFrameCallBackList = [];
        /**
         * @private
         */
        DisplayObject.$renderCallBackList = [];
        return DisplayObject;
    })(egret.EventDispatcher);
    egret.DisplayObject = DisplayObject;
    egret.registerClass(DisplayObject,"egret.DisplayObject",["egret.sys.Renderable"]);
    if (DEBUG) {
        egret.$markReadOnly(DisplayObject, "parent");
        egret.$markReadOnly(DisplayObject, "stage");
    }
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    var sys;
    (function (sys) {
        var displayListPool = [];
        var blendModes = ["source-over", "lighter", "destination-out"];
        var defaultCompositeOp = "source-over";
        /**
         * @private
         * ????????????
         */
        var DisplayList = (function (_super) {
            __extends(DisplayList, _super);
            /**
             * @private
             * ????????????DisplayList??????
             */
            function DisplayList(root) {
                _super.call(this);
                /**
                 * @private
                 * ??????????????????
                 */
                this.$isDirty = false;
                /**
                 * @private
                 * ????????????????????????
                 */
                this.$renderAlpha = 1;
                /**
                 * @private
                 * ?????????????????????????????????????????????????????????????????????
                 */
                this.$renderMatrix = new egret.Matrix();
                this.$ratioMatrix = new egret.Matrix();
                this.$ratioChanged = false;
                this.$pixelRatio = 1;
                /**
                 * @private
                 * ??????????????????????????????????????????????????????????????????
                 */
                this.$renderRegion = new sys.Region();
                /**
                 * @private
                 * ?????????????????????????????????
                 */
                this.surface = null;
                /**
                 * @private
                 */
                this.offsetX = 0;
                /**
                 * @private
                 */
                this.offsetY = 0;
                /**
                 * @private
                 */
                this.needRedraw = false;
                /**
                 * @private
                 */
                this.rootMatrix = new egret.Matrix();
                /**
                 * @private
                 * ?????????????????????????????????????????????????????????IRenderable??????????????????????????????
                 */
                this.dirtyNodes = {};
                /**
                 * @private
                 */
                this.dirtyNodeList = [];
                /**
                 * @private
                 */
                this.dirtyList = null;
                /**
                 * @private
                 */
                this.dirtyRegion = new sys.DirtyRegion();
                /**
                 * @private
                 */
                this.sizeChanged = false;
                this.root = root;
            }
            var d = __define,c=DisplayList;p=c.prototype;
            /**
             * @private
             * ????????????DisplayList??????????????????
             */
            DisplayList.release = function (displayList) {
                sys.surfaceFactory.release(displayList.surface);
                egret.Matrix.release(displayList.$renderMatrix);
                egret.Matrix.release(displayList.$ratioMatrix);
                displayList.surface = null;
                displayList.renderContext = null;
                displayList.root = null;
                displayList.$renderMatrix = null;
                displayList.$ratioMatrix = null;
                displayList.needRedraw = false;
                displayList.$isDirty = false;
                displayListPool.push(displayList);
            };
            /**
             * @private
             * ??????????????????????????????????????????DisplayList?????????
             */
            DisplayList.create = function (target) {
                var displayList = displayListPool.pop();
                if (!displayList) {
                    displayList = new egret.sys.DisplayList(target);
                }
                var surface = sys.surfaceFactory.create();
                if (!surface) {
                    return null;
                }
                displayList.surface = surface;
                displayList.renderContext = surface.renderContext;
                displayList.root = target;
                displayList.$renderMatrix = egret.Matrix.create();
                displayList.$renderMatrix.setTo(1, 0, 0, 1, 0, 0);
                displayList.$pixelRatio = 1;
                displayList.$ratioMatrix = egret.Matrix.create();
                displayList.$ratioMatrix.setTo(1, 0, 0, 1, 0, 0);
                displayList.needRedraw = true;
                displayList.$isDirty = true;
                return displayList;
            };
            /**
             * @private
             * ???????????????????????????????????????????????????,???????????????????????????????????????
             */
            p.$update = function () {
                var target = this.root;
                //???cache?????????????????????????????????dirtyList??????????????????cache????????????root??????
                if (target == null) {
                    return false;
                }
                target.$removeFlagsUp(768 /* Dirty */);
                this.$renderAlpha = target.$getConcatenatedAlpha();
                //???????????????moved??????????????????????????????????????????moved???????????????????????????????????????
                var concatenatedMatrix = target.$getConcatenatedMatrix();
                var bounds = target.$getOriginalBounds();
                var displayList = target.$parentDisplayList;
                var pixelRatio = 1;
                if (displayList)
                    pixelRatio = displayList.$pixelRatio;
                else if (target.stage && target.stage.$displayList)
                    pixelRatio = target.stage.$displayList.$pixelRatio;
                this.setDevicePixelRatio(pixelRatio);
                var region = this.$renderRegion;
                if (this.needRedraw) {
                    this.updateDirtyRegions();
                }
                if (!displayList) {
                    region.setTo(0, 0, 0, 0);
                    region.moved = false;
                    return false;
                }
                if (!region.moved && !displayList.$ratioChanged) {
                    return false;
                }
                region.moved = false;
                var matrix = this.$renderMatrix;
                matrix.copyFrom(concatenatedMatrix);
                var root = displayList.root;
                if (root !== target.$stage) {
                    target.$getConcatenatedMatrixAt(root, matrix);
                }
                this.$ratioMatrix.$preMultiplyInto(matrix, matrix);
                region.updateRegion(bounds, matrix);
                return true;
            };
            /**
             * @private
             *
             * @param context
             */
            p.$render = function (context) {
                var data = this.surface;
                if (data) {
                    context.drawImage(data, this.offsetX, this.offsetY, data.width / this.$pixelRatio, data.height / this.$pixelRatio);
                }
            };
            /**
             * @private
             * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
             */
            p.setClipRect = function (width, height) {
                width *= this.$pixelRatio;
                height *= this.$pixelRatio;
                this.dirtyRegion.setClipRect(width, height);
                this.rootMatrix = null; //??????????????????????????????ClipRect
                var surface = this.renderContext.surface;
                surface.width = width;
                surface.height = height;
                this.surface = surface;
            };
            /**
             * @private
             * ????????????????????????????????????
             */
            p.markDirty = function (node) {
                var key = node.$hashCode;
                if (this.dirtyNodes[key]) {
                    return;
                }
                this.dirtyNodes[key] = true;
                this.dirtyNodeList.push(node);
                if (!this.needRedraw) {
                    this.needRedraw = true;
                    var parentCache = this.root.$parentDisplayList;
                    if (parentCache) {
                        parentCache.markDirty(this);
                    }
                }
            };
            /**
             * @private
             * ?????????????????????????????????????????????
             */
            p.updateDirtyRegions = function () {
                var nodeList = this.dirtyNodeList;
                this.dirtyNodeList = [];
                this.dirtyNodes = {};
                var dirtyRegion = this.dirtyRegion;
                var length = nodeList.length;
                for (var i = 0; i < length; i++) {
                    var node = nodeList[i];
                    var region = node.$renderRegion;
                    if (node.$renderAlpha > 0) {
                        if (dirtyRegion.addRegion(region)) {
                            node.$isDirty = true;
                        }
                    }
                    var moved = node.$update();
                    if (node.$renderAlpha > 0 && (moved || !node.$isDirty)) {
                        if (dirtyRegion.addRegion(region)) {
                            node.$isDirty = true;
                        }
                    }
                }
                this.dirtyList = dirtyRegion.getDirtyRegions();
                return this.dirtyList;
            };
            /**
             * @private
             * ???????????????????????????????????????????????????draw????????????
             */
            p.drawToSurface = function () {
                var m = this.rootMatrix;
                if (m) {
                    this.changeSurfaceSize();
                }
                var context = this.renderContext;
                //?????????????????????
                context.save();
                context.beginPath();
                if (m) {
                    context.setTransform(1, 0, 0, 1, -this.offsetX * this.$pixelRatio, -this.offsetY * this.$pixelRatio);
                }
                var dirtyList = this.dirtyList;
                this.dirtyList = null;
                var length = dirtyList.length;
                for (var i = 0; i < length; i++) {
                    var region = dirtyList[i];
                    context.clearRect(region.minX, region.minY, region.width, region.height);
                    context.rect(region.minX, region.minY, region.width, region.height);
                }
                context.clip();
                if (m) {
                    context.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                }
                //??????????????????
                var drawCalls = this.drawDisplayObject(this.root, context, dirtyList, m, null, null);
                //?????????????????????
                context.restore();
                this.dirtyRegion.clear();
                this.needRedraw = false;
                this.$ratioChanged = false;
                return drawCalls;
            };
            /**
             * @private
             * ????????????????????????
             */
            p.drawDisplayObject = function (displayObject, context, dirtyList, rootMatrix, displayList, clipRegion) {
                var drawCalls = 0;
                var node;
                var globalAlpha;
                if (displayList) {
                    if (displayList.needRedraw) {
                        drawCalls += displayList.drawToSurface();
                    }
                    node = displayList;
                    globalAlpha = 1; //??????????????????displayList.$renderAlpha,???????????????????????????displayList.surface????????????
                }
                else if (displayObject.$renderRegion) {
                    node = displayObject;
                    globalAlpha = displayObject.$renderAlpha;
                }
                if (node) {
                    var renderRegion = node.$renderRegion;
                    if (clipRegion && !clipRegion.intersects(renderRegion)) {
                        node.$isDirty = false;
                    }
                    else if (!node.$isDirty) {
                        var l = dirtyList.length;
                        for (var j = 0; j < l; j++) {
                            if (renderRegion.intersects(dirtyList[j])) {
                                node.$isDirty = true;
                                break;
                            }
                        }
                    }
                    if (node.$isDirty) {
                        drawCalls++;
                        context.globalAlpha = globalAlpha;
                        var m = node.$renderMatrix;
                        if (rootMatrix) {
                            context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                            node.$render(context);
                            context.setTransform(rootMatrix.a, rootMatrix.b, rootMatrix.c, rootMatrix.d, rootMatrix.tx * this.$pixelRatio, rootMatrix.ty * this.$pixelRatio);
                        }
                        else {
                            context.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                            node.$render(context);
                        }
                        node.$isDirty = false;
                    }
                }
                if (displayList) {
                    return drawCalls;
                }
                var children = displayObject.$children;
                if (children) {
                    var length = children.length;
                    for (var i = 0; i < length; i++) {
                        var child = children[i];
                        if (!child.$visible || child.$alpha <= 0 || child.$maskedObject) {
                            continue;
                        }
                        if (child.$blendMode !== 0 || (child.$mask && child.$mask.$parentDisplayList)) {
                            drawCalls += this.drawWithClip(child, context, dirtyList, rootMatrix, clipRegion);
                        }
                        else if (child.$scrollRect || child.$maskRect) {
                            drawCalls += this.drawWithScrollRect(child, context, dirtyList, rootMatrix, clipRegion);
                        }
                        else {
                            if (DEBUG && child["isFPS"]) {
                                this.drawDisplayObject(child, context, dirtyList, rootMatrix, child.$displayList, clipRegion);
                            }
                            else {
                                drawCalls += this.drawDisplayObject(child, context, dirtyList, rootMatrix, child.$displayList, clipRegion);
                            }
                        }
                    }
                }
                return drawCalls;
            };
            /**
             * @private
             */
            p.drawWithClip = function (displayObject, context, dirtyList, rootMatrix, clipRegion) {
                var drawCalls = 0;
                var hasBlendMode = (displayObject.$blendMode !== 0);
                if (hasBlendMode) {
                    var compositeOp = blendModes[displayObject.$blendMode];
                    if (!compositeOp) {
                        compositeOp = defaultCompositeOp;
                    }
                }
                var scrollRect = displayObject.$scrollRect ? displayObject.$scrollRect : displayObject.$maskRect;
                var mask = displayObject.$mask;
                if (mask && !mask.$parentDisplayList) {
                    mask = null; //?????????????????????????????????????????????????????????
                }
                //??????scrollRect???mask???clip????????????????????????????????????????????????????????????????????????????????????
                var maskRegion;
                var displayMatrix = egret.Matrix.create();
                displayMatrix.copyFrom(displayObject.$getConcatenatedMatrix());
                var root = displayObject.$parentDisplayList.root;
                var invertedMatrix;
                if (root !== displayObject.$stage) {
                    invertedMatrix = root.$getInvertedConcatenatedMatrix();
                    invertedMatrix.$preMultiplyInto(displayMatrix, displayMatrix);
                }
                this.$ratioMatrix.$preMultiplyInto(displayMatrix, displayMatrix);
                if (mask) {
                    var bounds = mask.$getOriginalBounds();
                    maskRegion = sys.Region.create();
                    var m = egret.Matrix.create();
                    m.copyFrom(mask.$getConcatenatedMatrix());
                    if (invertedMatrix) {
                        invertedMatrix.$preMultiplyInto(m, m);
                    }
                    this.$ratioMatrix.$preMultiplyInto(m, m);
                    maskRegion.updateRegion(bounds, m);
                    egret.Matrix.release(m);
                }
                var region;
                if (scrollRect) {
                    region = sys.Region.create();
                    region.updateRegion(scrollRect, displayMatrix);
                }
                if (region && maskRegion) {
                    region.intersect(maskRegion);
                    sys.Region.release(maskRegion);
                }
                else if (!region && maskRegion) {
                    region = maskRegion;
                }
                if (region) {
                    if (region.isEmpty() || (clipRegion && !clipRegion.intersects(region))) {
                        sys.Region.release(region);
                        egret.Matrix.release(displayMatrix);
                        return drawCalls;
                    }
                }
                else {
                    region = sys.Region.create();
                    bounds = displayObject.$getOriginalBounds();
                    region.updateRegion(bounds, displayMatrix);
                }
                var found = false;
                var l = dirtyList.length;
                for (var j = 0; j < l; j++) {
                    if (region.intersects(dirtyList[j])) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    sys.Region.release(region);
                    egret.Matrix.release(displayMatrix);
                    return drawCalls;
                }
                //?????????????????????????????????scrollRect?????????clip
                var displayContext = this.createRenderContext(region.width, region.height);
                if (!displayContext) {
                    drawCalls += this.drawDisplayObject(displayObject, context, dirtyList, rootMatrix, displayObject.$displayList, clipRegion);
                    sys.Region.release(region);
                    egret.Matrix.release(displayMatrix);
                    return drawCalls;
                }
                if (scrollRect) {
                    var m = displayMatrix;
                    displayContext.setTransform(m.a, m.b, m.c, m.d, m.tx - region.minX, m.ty - region.minY);
                    displayContext.beginPath();
                    displayContext.rect(scrollRect.x, scrollRect.y, scrollRect.width, scrollRect.height);
                    displayContext.clip();
                }
                displayContext.setTransform(1, 0, 0, 1, -region.minX, -region.minY);
                var rootM = egret.Matrix.create().setTo(1, 0, 0, 1, -region.minX, -region.minY);
                drawCalls += this.drawDisplayObject(displayObject, displayContext, dirtyList, rootM, displayObject.$displayList, region);
                egret.Matrix.release(rootM);
                //????????????
                if (mask) {
                    var maskContext = this.createRenderContext(region.width, region.height);
                    if (!maskContext) {
                        drawCalls += this.drawDisplayObject(displayObject, context, dirtyList, rootMatrix, displayObject.$displayList, clipRegion);
                        sys.surfaceFactory.release(displayContext.surface);
                        sys.Region.release(region);
                        egret.Matrix.release(displayMatrix);
                        return drawCalls;
                    }
                    maskContext.setTransform(1, 0, 0, 1, -region.minX, -region.minY);
                    rootM = egret.Matrix.create().setTo(1, 0, 0, 1, -region.minX, -region.minY);
                    var calls = this.drawDisplayObject(mask, maskContext, dirtyList, rootM, mask.$displayList, region);
                    egret.Matrix.release(rootM);
                    if (calls > 0) {
                        drawCalls += calls;
                        displayContext.globalCompositeOperation = "destination-in";
                        displayContext.setTransform(1, 0, 0, 1, 0, 0);
                        displayContext.globalAlpha = 1;
                        displayContext.drawImage(maskContext.surface, 0, 0);
                    }
                    sys.surfaceFactory.release(maskContext.surface);
                }
                //?????????????????????
                if (drawCalls > 0) {
                    drawCalls++;
                    if (hasBlendMode) {
                        context.globalCompositeOperation = compositeOp;
                    }
                    if (rootMatrix) {
                        context.translate(region.minX, region.minY);
                        context.drawImage(displayContext.surface, 0, 0);
                        context.setTransform(rootMatrix.a, rootMatrix.b, rootMatrix.c, rootMatrix.d, rootMatrix.tx * this.$pixelRatio, rootMatrix.ty * this.$pixelRatio);
                    }
                    else {
                        context.setTransform(1, 0, 0, 1, region.minX, region.minY);
                        context.drawImage(displayContext.surface, 0, 0);
                    }
                    if (hasBlendMode) {
                        context.globalCompositeOperation = defaultCompositeOp;
                    }
                }
                sys.surfaceFactory.release(displayContext.surface);
                sys.Region.release(region);
                egret.Matrix.release(displayMatrix);
                return drawCalls;
            };
            /**
             * @private
             */
            p.drawWithScrollRect = function (displayObject, context, dirtyList, rootMatrix, clipRegion) {
                var drawCalls = 0;
                var scrollRect = displayObject.$scrollRect ? displayObject.$scrollRect : displayObject.$maskRect;
                var m = egret.Matrix.create();
                m.copyFrom(displayObject.$getConcatenatedMatrix());
                var root = displayObject.$parentDisplayList.root;
                if (root !== displayObject.$stage) {
                    root.$getInvertedConcatenatedMatrix().$preMultiplyInto(m, m);
                }
                this.$ratioMatrix.$preMultiplyInto(m, m);
                var region = sys.Region.create();
                if (!scrollRect.isEmpty()) {
                    region.updateRegion(scrollRect, m);
                }
                if (region.isEmpty() || (clipRegion && !clipRegion.intersects(region))) {
                    sys.Region.release(region);
                    egret.Matrix.release(m);
                    return drawCalls;
                }
                var found = false;
                var l = dirtyList.length;
                for (var j = 0; j < l; j++) {
                    if (region.intersects(dirtyList[j])) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    sys.Region.release(region);
                    egret.Matrix.release(m);
                    return drawCalls;
                }
                //????????????????????????
                context.save();
                if (rootMatrix) {
                    context.setTransform(rootMatrix.a, rootMatrix.b, rootMatrix.c, rootMatrix.d, rootMatrix.tx * this.$pixelRatio, rootMatrix.ty * this.$pixelRatio);
                    context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                }
                else {
                    context.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                }
                context.beginPath();
                context.rect(scrollRect.x, scrollRect.y, scrollRect.width, scrollRect.height);
                context.clip();
                if (rootMatrix) {
                    context.setTransform(rootMatrix.a, rootMatrix.b, rootMatrix.c, rootMatrix.d, rootMatrix.tx * this.$pixelRatio, rootMatrix.ty * this.$pixelRatio);
                }
                drawCalls += this.drawDisplayObject(displayObject, context, dirtyList, rootMatrix, displayObject.$displayList, region);
                context.restore();
                sys.Region.release(region);
                egret.Matrix.release(m);
                return drawCalls;
            };
            /**
             * @private
             */
            p.createRenderContext = function (width, height) {
                var surface = sys.surfaceFactory.create(true);
                if (!surface) {
                    return null;
                }
                if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                    //???chrome???????????????256*256???canvas????????????GPU?????????
                    surface.width = Math.max(257, width);
                    surface.height = Math.max(257, height);
                }
                else {
                    surface.width = width;
                    surface.height = height;
                }
                return surface.renderContext;
            };
            /**
             * @private
             * ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
             */
            p.changeSurfaceSize = function () {
                var root = this.root;
                var oldOffsetX = this.offsetX;
                var oldOffsetY = this.offsetY;
                var bounds = this.root.$getOriginalBounds();
                var scaleX = this.$pixelRatio;
                var scaleY = this.$pixelRatio;
                this.offsetX = bounds.x;
                this.offsetY = bounds.y;
                var oldContext = this.renderContext;
                var oldSurface = oldContext.surface;
                if (!this.sizeChanged) {
                    this.sizeChanged = true;
                    oldSurface.width = bounds.width * scaleX;
                    oldSurface.height = bounds.height * scaleY;
                }
                else {
                    var newContext = sys.sharedRenderContext;
                    var newSurface = newContext.surface;
                    sys.sharedRenderContext = oldContext;
                    this.renderContext = newContext;
                    this.surface = newSurface;
                    newSurface.width = bounds.width * scaleX;
                    newSurface.height = bounds.height * scaleY;
                    if (oldSurface.width !== 0 && oldSurface.height !== 0) {
                        newContext.setTransform(1, 0, 0, 1, 0, 0);
                        newContext.drawImage(oldSurface, (oldOffsetX - this.offsetX) * scaleX, (oldOffsetY - this.offsetY) * scaleY);
                    }
                    oldSurface.height = 1;
                    oldSurface.width = 1;
                }
                this.rootMatrix.setTo(1, 0, 0, 1, -this.offsetX, -this.offsetY);
                this.renderContext.setTransform(1, 0, 0, 1, -bounds.x, -bounds.y);
            };
            p.setDevicePixelRatio = function (ratio) {
                if (ratio === void 0) { ratio = 1; }
                if (this.$pixelRatio == ratio && this.$ratioMatrix)
                    return;
                if (!this.$ratioMatrix)
                    this.$ratioMatrix = egret.Matrix.create();
                this.$ratioChanged = true;
                this.$pixelRatio = ratio;
                this.$ratioMatrix.setTo(ratio, 0, 0, ratio, 0, 0);
                this.root.$invalidate(true);
            };
            return DisplayList;
        })(egret.HashObject);
        sys.DisplayList = DisplayList;
        egret.registerClass(DisplayList,"egret.sys.DisplayList",["egret.sys.Renderable"]);
    })(sys = egret.sys || (egret.sys = {}));
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * The Bitmap class represents display objects that represent bitmap images.
     * The Bitmap() constructor allows you to create a Bitmap object that contains a reference to a BitmapData object.
     * After you create a Bitmap object, use the addChild() or addChildAt() method of the parent DisplayObjectContainer
     * instance to place the bitmap on the display list.A Bitmap object can share its texture reference among several
     * Bitmap objects, independent of translation or rotation properties. Because you can create multiple Bitmap objects
     * that reference the same texture object, multiple display objects can use the same complex texture object
     * without incurring the memory overhead of a texture object for each display object instance.
     *
     * @see egret.Texture
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/Bitmap.ts
     */
    /**
     * @language zh_CN
     * Bitmap ???????????????????????????????????????????????????
     * ?????? Bitmap() ???????????????????????????????????? BitmapData ??????????????? Bitmap ?????????????????? Bitmap ????????????
     * ???????????? DisplayObjectContainer ????????? addChild() ??? addChildAt() ?????????????????????????????????????????????
     * ?????? Bitmap ?????????????????? Bitmap ????????????????????? texture ??????????????????????????????????????????
     * ?????????????????????????????? texture ??????????????? Bitmap ????????????????????????????????????????????????????????? texture ?????????
     * ??????????????????????????????????????????????????? texture ????????????????????????????????????
     *
     * @see egret.Texture
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/Bitmap.ts
     */
    var Bitmap = (function (_super) {
        __extends(Bitmap, _super);
        /**
         * @language en_US
         * Initializes a Bitmap object to refer to the specified BitmapData|Texture object.
         * @param bitmapData The BitmapData object being referenced.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????? BitmapData|Texture ????????? Bitmap ??????
         * @param bitmapData ???????????? BitmapData ??????
         * @version Egret 2.4
         * @platform Web,Native
         */
        function Bitmap(bitmapData) {
            _super.call(this);
            /**
             * @private
             */
            this.$scale9Grid = null;
            /**
             * @private
             */
            this.$fillMode = "scale";
            /**
             * @private
             */
            this.$smoothing = true;
            this._pixelHitTest = false;
            this.$renderRegion = new egret.sys.Region();
            this.$Bitmap = {
                0: null,
                1: null,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0,
                10: true,
                11: NaN,
                12: NaN //explicitBitmapHeight,
            };
            this.$setBitmapData(bitmapData);
        }
        var d = __define,c=Bitmap;p=c.prototype;
        /**
         * @private
         * ???????????????????????????
         */
        p.$onAddToStage = function (stage, nestLevel) {
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            var bitmapData = this.$Bitmap[0 /* bitmapData */];
            if (bitmapData) {
                if (bitmapData instanceof egret.Texture) {
                    egret.Texture.$addDisplayObject(this, bitmapData._bitmapData.hashCode);
                }
                else {
                    egret.Texture.$addDisplayObject(this, bitmapData.hashCode);
                }
            }
        };
        /**
         * @private
         * ???????????????????????????
         */
        p.$onRemoveFromStage = function () {
            _super.prototype.$onRemoveFromStage.call(this);
            var bitmapData = this.$Bitmap[0 /* bitmapData */];
            if (bitmapData) {
                if (bitmapData instanceof egret.Texture) {
                    egret.Texture.$removeDisplayObject(this, bitmapData._bitmapData.hashCode);
                }
                else {
                    egret.Texture.$removeDisplayObject(this, bitmapData.hashCode);
                }
            }
        };
        d(p, "bitmapData"
            /**
             * @language en_US
             * The BitmapData|Texture object being referenced.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????? BitmapData|Texture ?????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$Bitmap[0 /* bitmapData */];
            }
            ,function (value) {
                this.$setBitmapData(value);
            }
        );
        d(p, "texture"
            /**
             * @copy #bitmapData
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$Bitmap[0 /* bitmapData */];
            }
            ,function (value) {
                this.$setBitmapData(value);
            }
        );
        /**
         * @private
         */
        p.$setBitmapData = function (value) {
            var values = this.$Bitmap;
            if (value == values[0 /* bitmapData */]) {
                return false;
            }
            values[0 /* bitmapData */] = value;
            if (value) {
                if (value instanceof egret.Texture) {
                    var texture = value;
                    this.setImageData(texture._bitmapData, texture._bitmapX, texture._bitmapY, texture._bitmapWidth, texture._bitmapHeight, texture._offsetX, texture._offsetY, texture.$getTextureWidth(), texture.$getTextureHeight());
                }
                else {
                    this.setImageData(value, 0, 0, value.width, value.height, 0, 0, value.width, value.height);
                }
            }
            else {
                this.setImageData(null, 0, 0, 0, 0, 0, 0, 0, 0);
                this.$invalidateContentBounds();
                return true;
            }
            if (this.$stage) {
                if (value instanceof egret.Texture) {
                    egret.Texture.$addDisplayObject(this, value._bitmapData.hashCode);
                }
                else {
                    egret.Texture.$addDisplayObject(this, value.hashCode);
                }
            }
            this.$invalidateContentBounds();
            return true;
        };
        /**
         * @private
         */
        p.setImageData = function (image, clipX, clipY, clipWidth, clipHeight, offsetX, offsetY, width, height) {
            var values = this.$Bitmap;
            values[1 /* image */] = image;
            values[2 /* clipX */] = clipX;
            values[3 /* clipY */] = clipY;
            values[4 /* clipWidth */] = clipWidth;
            values[5 /* clipHeight */] = clipHeight;
            values[6 /* offsetX */] = offsetX;
            values[7 /* offsetY */] = offsetY;
            values[8 /* width */] = width;
            values[9 /* height */] = height;
        };
        d(p, "scale9Grid"
            /**
             * @language en_US
             * Represent a Rectangle Area that the 9 scale area of Image.
             * Notice: This property is valid only when <code>fillMode</code>
             * is <code>BitmapFillMode.SCALE</code>.
             *
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????????????????????????????
             * ??????:???????????????<code>fillMode</code>???<code>BitmapFillMode.SCALE</code>????????????
             *
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$scale9Grid;
            }
            ,function (value) {
                this.$scale9Grid = value;
                this.$invalidateContentBounds();
            }
        );
        d(p, "fillMode"
            /**
             * @language en_US
             * Determines how the bitmap fills in the dimensions.
             * ends at the edge of the region.</p>
             * <p>When set to <code>BitmapFillMode.REPEAT</code>, the bitmap
             * repeats to fill the region.</p>
             * <p>When set to <code>BitmapFillMode.SCALE</code>, the bitmap
             * stretches to fill the region.</p>
             *
             * @default <code>BitmapFillMode.SCALE</code>
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????
             * <p>????????? <code>BitmapFillMode.REPEAT</code>???????????????????????????????????????</p>
             * <p>????????? <code>BitmapFillMode.SCALE</code>???????????????????????????????????????</p>
             *
             * @default <code>BitmapFillMode.SCALE</code>
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web
             */
            ,function () {
                return this.$fillMode;
            }
            ,function (value) {
                this.$setFillMode(value);
            }
        );
        p.$setFillMode = function (value) {
            if (value == this.$fillMode) {
                return false;
            }
            this.$fillMode = value;
            return true;
        };
        d(p, "smoothing"
            /**
             * @language en_US
             * Whether or not the bitmap is smoothed when scaled.
             * @default true???
             * @version Egret 2.4
             * @platform Web
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????
             * @default true???
             * @version Egret 2.4
             * @platform Web
             */
            ,function () {
                return this.$smoothing;
            }
            ,function (value) {
                value = !!value;
                if (value == this.$smoothing) {
                    return;
                }
                this.$smoothing = value;
                this.$invalidate();
            }
        );
        /**
         * @private
         *
         * @param value
         */
        p.$setWidth = function (value) {
            //value = +value || 0;
            var values = this.$Bitmap;
            if (value < 0 || value == values[11 /* explicitBitmapWidth */]) {
                return false;
            }
            values[11 /* explicitBitmapWidth */] = value;
            this.$invalidateContentBounds();
            return true;
        };
        /**
         * @private
         *
         * @param value
         */
        p.$setHeight = function (value) {
            //value = +value || 0;
            var values = this.$Bitmap;
            if (value < 0 || value == values[12 /* explicitBitmapHeight */]) {
                return false;
            }
            values[12 /* explicitBitmapHeight */] = value;
            this.$invalidateContentBounds();
            return true;
        };
        /**
         * @private
         * ??????????????????
         */
        p.$getWidth = function () {
            var values = this.$Bitmap;
            return isNaN(values[11 /* explicitBitmapWidth */]) ? this.$getContentBounds().width : values[11 /* explicitBitmapWidth */];
        };
        /**
         * @private
         * ??????????????????
         */
        p.$getHeight = function () {
            var values = this.$Bitmap;
            return isNaN(values[12 /* explicitBitmapHeight */]) ? this.$getContentBounds().height : values[12 /* explicitBitmapHeight */];
        };
        /**
         * @private
         */
        p.$measureContentBounds = function (bounds) {
            var values = this.$Bitmap;
            if (values[1 /* image */]) {
                var values = this.$Bitmap;
                var w = !isNaN(values[11 /* explicitBitmapWidth */]) ? values[11 /* explicitBitmapWidth */] : values[8 /* width */];
                var h = !isNaN(values[12 /* explicitBitmapHeight */]) ? values[12 /* explicitBitmapHeight */] : values[9 /* height */];
                bounds.setTo(0, 0, w, h);
            }
            else {
                bounds.setEmpty();
            }
        };
        /**
         * @private
         */
        p.$render = function (context) {
            var values = this.$Bitmap;
            if (values[1 /* image */]) {
                var destW = !isNaN(values[11 /* explicitBitmapWidth */]) ? values[11 /* explicitBitmapWidth */] : values[8 /* width */];
                var destH = !isNaN(values[12 /* explicitBitmapHeight */]) ? values[12 /* explicitBitmapHeight */] : values[9 /* height */];
                Bitmap.$drawImage(context, values[1 /* image */], values[2 /* clipX */], values[3 /* clipY */], values[4 /* clipWidth */], values[5 /* clipHeight */], values[6 /* offsetX */], values[7 /* offsetY */], values[8 /* width */], values[9 /* height */], destW, destH, this.scale9Grid, this.fillMode, this.$smoothing);
            }
        };
        d(p, "pixelHitTest"
            /**
             * @language en_US
             * Specifies whether this object use precise hit testing by checking the alpha value of each pixel.If pixelHitTest
             * is set to true,the transparent area of the bitmap will be touched through.<br/>
             * Note:If the image is loaded from cross origin,that we can't access to the pixel data,so it might cause
             * the pixelHitTest property invalid.
             * @default false
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????true??????????????????????????????????????????????????????<br/>
             * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
             * @default false
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this._pixelHitTest;
            }
            ,function (value) {
                this._pixelHitTest = !!value;
            }
        );
        p.$hitTest = function (stageX, stageY) {
            var target = _super.prototype.$hitTest.call(this, stageX, stageY);
            if (target && this._pixelHitTest) {
                target = this.hitTestPixel(stageX, stageY);
            }
            return target;
        };
        /**
         * @private
         */
        p.hitTestPixel = function (stageX, stageY) {
            var m = this.$getInvertedConcatenatedMatrix();
            var localX = m.a * stageX + m.c * stageY + m.tx;
            var localY = m.b * stageX + m.d * stageY + m.ty;
            var context;
            var data;
            var displayList = this.$displayList;
            if (displayList) {
                context = displayList.renderContext;
                data = context.getImageData(localX - displayList.offsetX, localY - displayList.offsetY, 1, 1).data;
            }
            else {
                context = egret.sys.sharedRenderContext;
                context.surface.width = context.surface.height = 3;
                context.translate(1 - localX, 1 - localY);
                this.$render(context);
                data = context.getImageData(1, 1, 1, 1).data;
            }
            if (data[3] === 0) {
                return null;
            }
            return this;
        };
        /**
         * @private
         *
         * @param context
         * @param texture
         * @param destW
         * @param destH
         * @param scale9Grid
         * @param fillMode
         * @param smoothing
         */
        Bitmap.$drawImage = function (context, image, clipX, clipY, clipWidth, clipHeight, offsetX, offsetY, textureWidth, textureHeight, destW, destH, scale9Grid, fillMode, smoothing) {
            if (!image) {
                return;
            }
            context.imageSmoothingEnabled = smoothing;
            if (scale9Grid) {
                Bitmap.$drawScale9GridImage(context, image, scale9Grid, clipX, clipY, clipWidth, clipHeight, offsetX, offsetY, textureWidth, textureHeight, destW, destH);
            }
            else if (fillMode == egret.BitmapFillMode.SCALE) {
                context.drawImage(image, clipX, clipY, clipWidth, clipHeight, offsetX, offsetY, clipWidth / textureWidth * destW, clipHeight / textureHeight * destH);
            }
            else {
                var tempImage = image;
                var tempCanvas;
                if (tempImage.width != clipWidth || tempImage.height != clipHeight || egret.$TextureScaleFactor != 1) {
                    tempCanvas = egret.sys.surfaceFactory.create(true);
                    tempCanvas.width = textureWidth;
                    tempCanvas.height = textureHeight;
                    tempCanvas.renderContext.drawImage(tempImage, clipX, clipY, clipWidth, clipHeight, offsetX, offsetY, textureWidth, textureHeight);
                    tempImage = tempCanvas;
                }
                var pattern = context.createPattern(tempImage, "repeat");
                context.beginPath();
                context.rect(0, 0, destW, destH);
                context.fillStyle = pattern;
                context.fill();
                if (tempCanvas) {
                    egret.sys.surfaceFactory.release(tempCanvas);
                }
            }
        };
        /**
         * @private
         * ?????????????????????
         */
        Bitmap.$drawScale9GridImage = function (context, image, scale9Grid, clipX, clipY, clipWidth, clipHeight, offsetX, offsetY, textureWidth, textureHeight, surfaceWidth, surfaceHeight) {
            var imageWidth = clipWidth;
            var imageHeight = clipHeight;
            surfaceWidth = surfaceWidth - (textureWidth - clipWidth * egret.$TextureScaleFactor);
            surfaceHeight = surfaceHeight - (textureHeight - clipHeight * egret.$TextureScaleFactor);
            var targetW0 = scale9Grid.x - offsetX;
            var targetH0 = scale9Grid.y - offsetY;
            var sourceW0 = targetW0 / egret.$TextureScaleFactor;
            var sourceH0 = targetH0 / egret.$TextureScaleFactor;
            var sourceW1 = scale9Grid.width / egret.$TextureScaleFactor;
            var sourceH1 = scale9Grid.height / egret.$TextureScaleFactor;
            //??????????????????????????????
            if (sourceH1 == 0) {
                sourceH1 = 1;
                if (sourceH0 >= imageHeight) {
                    sourceH0--;
                }
            }
            if (sourceW1 == 0) {
                sourceW1 = 1;
                if (sourceW0 >= imageWidth) {
                    sourceW0--;
                }
            }
            var sourceX0 = clipX;
            var sourceX1 = sourceX0 + sourceW0;
            var sourceX2 = sourceX1 + sourceW1;
            var sourceW2 = imageWidth - sourceW0 - sourceW1;
            var sourceY0 = clipY;
            var sourceY1 = sourceY0 + sourceH0;
            var sourceY2 = sourceY1 + sourceH1;
            var sourceH2 = imageHeight - sourceH0 - sourceH1;
            var targetW2 = sourceW2 * egret.$TextureScaleFactor;
            var targetH2 = sourceH2 * egret.$TextureScaleFactor;
            if ((sourceW0 + sourceW2) * egret.$TextureScaleFactor > surfaceWidth || (sourceH0 + sourceH2) * egret.$TextureScaleFactor > surfaceHeight) {
                context.drawImage(image, 0, 0, surfaceWidth, surfaceHeight);
                return;
            }
            var targetX0 = offsetX;
            var targetX1 = targetX0 + targetW0;
            var targetX2 = targetX0 + (surfaceWidth - targetW2);
            var targetW1 = surfaceWidth - targetW0 - targetW2;
            var targetY0 = offsetY;
            var targetY1 = targetY0 + targetH0;
            var targetY2 = targetY0 + surfaceHeight - targetH2;
            var targetH1 = surfaceHeight - targetH0 - targetH2;
            //
            //             x0     x1     x2
            //          y0 +------+------+------+
            //             |      |      |      | h0
            //             |      |      |      |
            //          y1 +------+------+------+
            //             |      |      |      | h1
            //             |      |      |      |
            //          y2 +------+------+------+
            //             |      |      |      | h2
            //             |      |      |      |
            //             +------+------+------+
            //                w0     w1     w2
            //
            context.drawImage(image, sourceX0, sourceY0, sourceW0, sourceH0, targetX0, targetY0, targetW0, targetH0);
            context.drawImage(image, sourceX1, sourceY0, sourceW1, sourceH0, targetX1, targetY0, targetW1, targetH0);
            context.drawImage(image, sourceX2, sourceY0, sourceW2, sourceH0, targetX2, targetY0, targetW2, targetH0);
            context.drawImage(image, sourceX0, sourceY1, sourceW0, sourceH1, targetX0, targetY1, targetW0, targetH1);
            context.drawImage(image, sourceX1, sourceY1, sourceW1, sourceH1, targetX1, targetY1, targetW1, targetH1);
            context.drawImage(image, sourceX2, sourceY1, sourceW2, sourceH1, targetX2, targetY1, targetW2, targetH1);
            context.drawImage(image, sourceX0, sourceY2, sourceW0, sourceH2, targetX0, targetY2, targetW0, targetH2);
            context.drawImage(image, sourceX1, sourceY2, sourceW1, sourceH2, targetX1, targetY2, targetW1, targetH2);
            context.drawImage(image, sourceX2, sourceY2, sourceW2, sourceH2, targetX2, targetY2, targetW2, targetH2);
        };
        return Bitmap;
    })(egret.DisplayObject);
    egret.Bitmap = Bitmap;
    egret.registerClass(Bitmap,"egret.Bitmap");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * The BitmapFillMode class defines the image fill mode of Bitmap.
     * The BitmapFillMode class defines a pattern enumeration for adjusting size. These patterns determine how Bitmap fill the size designated by the layout system.
     * @see http://docs.egret-labs.org/post/manual/bitmap/bitmapfillmode.html Texture filling way
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/BitmapFillMode.ts
     */
    /**
     * @language zh_CN
     * BitmapFillMode ?????????Bitmap????????????????????????
     * BitmapFillMode ?????????????????????????????????????????????????????????????????? Bitmap ?????????????????????????????????????????????
     * @see http://docs.egret-labs.org/post/manual/bitmap/bitmapfillmode.html ?????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/BitmapFillMode.ts
     */
    var BitmapFillMode = (function () {
        function BitmapFillMode() {
        }
        var d = __define,c=BitmapFillMode;p=c.prototype;
        /**
         * @language en_US
         * Repeat the bitmap to fill area.
         * @version Egret 2.4
         * @platform Web
         */
        /**
         * @language zh_CN
         * ??????????????????????????????
         * @version Egret 2.4
         * @platform Web
         */
        BitmapFillMode.REPEAT = "repeat";
        /**
         * @language en_US
         * Scale bitmap fill to fill area.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        BitmapFillMode.SCALE = "scale";
        return BitmapFillMode;
    })();
    egret.BitmapFillMode = BitmapFillMode;
    egret.registerClass(BitmapFillMode,"egret.BitmapFillMode");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    //???????????????Web?????????????????????????????? Native ?????????????????????
    //????????????????????????????????????????????????Layer,Alpha,Normal,Add,ERASE???
    //IOS???????????????????????????Android?????????????????????????????????Multiply,Screen,Lighten,Darken,Difference,Overlay,HardLight???
    //?????? Native ??????????????????Subtract,Invert???
    /**
     * @language en_US
     * A class that provides constant values for visual blend mode effects. These constants are used in the blendMode
     * property of the DisplayObject class.
     * @see egret.DisplayObject#blendMode
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/BlendMode.ts
     */
    /**
     * @language zh_CN
     * ????????????????????????????????????????????????,???????????? DisplayObject ??? blendMode ????????????
     * @see egret.DisplayObject#blendMode
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/BlendMode.ts
     */
    var BlendMode = (function () {
        function BlendMode() {
        }
        var d = __define,c=BlendMode;p=c.prototype;
        /**
         * @language en_US
         * The display object appears in front of the background. Pixel values of the display object override the pixel
         * values of the background. Where the display object is transparent, the background is visible.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        BlendMode.NORMAL = "normal";
        /**
         * @language en_US
         * Adds the values of the constituent colors of the display object to the colors of its background, applying a
         * ceiling of 0xFF. This setting is commonly used for animating a lightening dissolve between two objects.<br/>
         * For example, if the display object has a pixel with an RGB value of 0xAAA633, and the background pixel has an
         * RGB value of 0xDD2200, the resulting RGB value for the displayed pixel is 0xFFC833 (because 0xAA + 0xDD > 0xFF,
         * 0xA6 + 0x22 = 0xC8, and 0x33 + 0x00 = 0x33).
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????????????? 0xFF??????????????????????????????????????????????????????????????????????????????<br/>
         * ????????????????????????????????????????????? RGB ?????? 0xAAA633?????????????????? RGB ?????? 0xDD2200??????????????????????????? RGB ?????? 0xFFC833
         * ????????? 0xAA + 0xDD > 0xFF???0xA6 + 0x22 = 0xC8?????? 0x33 + 0x00 = 0x33??????
         * @version Egret 2.4
         * @platform Web,Native
         */
        BlendMode.ADD = "add";
        /**
         * @language en_US
         * Erases the background based on the alpha value of the display object.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????? Alpha ??????????????????Alpha ?????????0????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        BlendMode.ERASE = "erase";
        return BlendMode;
    })();
    egret.BlendMode = BlendMode;
    egret.registerClass(BlendMode,"egret.BlendMode");
})(egret || (egret = {}));
var egret;
(function (egret) {
    var sys;
    (function (sys) {
        var blendModeString = ["normal", "add", "erase"];
        var blendModeNumber = {};
        var length = blendModeString.length;
        for (var i = 0; i < length; i++) {
            var str = blendModeString[i];
            blendModeNumber[str] = i;
        }
        /**
         * @private
         * ?????? blendMode ?????????????????????
         */
        function blendModeToNumber(blendMode) {
            var num = blendModeNumber[blendMode];
            return egret.sys.isUndefined(num) ? 0 : num;
        }
        sys.blendModeToNumber = blendModeToNumber;
        /**
         * @private
         * ??????????????? blendMode ????????????
         */
        function numberToBlendMode(blendMode) {
            var str = blendModeString[blendMode];
            return egret.sys.isUndefined(str) ? "normal" : str;
        }
        sys.numberToBlendMode = numberToBlendMode;
    })(sys = egret.sys || (egret.sys = {}));
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * The DisplayObjectContainer class is a basic display list building block: a display list node that can contain children.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/DisplayObjectContainer.ts
     */
    /**
     * @language zh_CN
     * DisplayObjectContainer ?????????????????????????????????????????????????????????????????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/DisplayObjectContainer.ts
     */
    var DisplayObjectContainer = (function (_super) {
        __extends(DisplayObjectContainer, _super);
        /**
         * @language en_US
         * Creates a new DisplayObjectContainer instance.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        function DisplayObjectContainer() {
            _super.call(this);
            this.$touchChildren = true;
            this.$children = [];
        }
        var d = __define,c=DisplayObjectContainer;p=c.prototype;
        /**
         * @private
         */
        p.$propagateFlagsDown = function (flags) {
            if (this.$hasFlags(flags)) {
                return;
            }
            this.$setFlags(flags);
            var children = this.$children;
            for (var i = 0; i < children.length; i++) {
                children[i].$propagateFlagsDown(flags);
            }
        };
        d(p, "numChildren"
            /**
             * @inheritDoc
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$children.length;
            }
        );
        /**
         * @inheritDoc
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.addChild = function (child) {
            var index = this.$children.length;
            if (child.$parent == this)
                index--;
            return this.$doAddChild(child, index);
        };
        /**
         * @inheritDoc
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.addChildAt = function (child, index) {
            index = +index | 0;
            if (index < 0 || index >= this.$children.length) {
                index = this.$children.length;
                if (child.$parent == this) {
                    index--;
                }
            }
            return this.$doAddChild(child, index);
        };
        /**
         * @private
         */
        p.$doAddChild = function (child, index, notifyListeners) {
            if (notifyListeners === void 0) { notifyListeners = true; }
            if (DEBUG) {
                if (child == this) {
                    egret.$error(1005);
                }
                else if ((child instanceof egret.DisplayObjectContainer) && child.contains(this)) {
                    egret.$error(1004);
                }
            }
            var host = child.$parent;
            if (host == this) {
                this.doSetChildIndex(child, index);
                return child;
            }
            if (host) {
                host.removeChild(child);
            }
            this.$children.splice(index, 0, child);
            child.$setParent(this);
            var stage = this.$stage;
            if (stage) {
                child.$onAddToStage(stage, this.$nestLevel + 1);
            }
            if (notifyListeners) {
                child.dispatchEventWith(egret.Event.ADDED, true);
            }
            if (stage) {
                var list = DisplayObjectContainer.$EVENT_ADD_TO_STAGE_LIST;
                while (list.length) {
                    var childAddToStage = list.shift();
                    if (childAddToStage.$stage && notifyListeners) {
                        childAddToStage.dispatchEventWith(egret.Event.ADDED_TO_STAGE);
                    }
                }
            }
            var displayList = this.$displayList || this.$parentDisplayList;
            this.assignParentDisplayList(child, displayList, displayList);
            child.$propagateFlagsDown(624 /* DownOnAddedOrRemoved */);
            this.$propagateFlagsUp(4 /* InvalidBounds */);
            this.$childAdded(child, index);
            return child;
        };
        /**
         * @inheritDoc
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.contains = function (child) {
            while (child) {
                if (child == this) {
                    return true;
                }
                child = child.$parent;
            }
            return false;
        };
        /**
         * @inheritDoc
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.getChildAt = function (index) {
            index = +index | 0;
            if (index >= 0 && index < this.$children.length) {
                return this.$children[index];
            }
            else {
                DEBUG && egret.$error(1007);
                return null;
            }
        };
        /**
         * @inheritDoc
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.getChildIndex = function (child) {
            return this.$children.indexOf(child);
        };
        /**
         * @inheritDoc
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.getChildByName = function (name) {
            var children = this.$children;
            var length = children.length;
            var displayObject;
            for (var i = 0; i < length; i++) {
                displayObject = children[i];
                if (displayObject.name == name) {
                    return displayObject;
                }
            }
            return null;
        };
        /**
         * @inheritDoc
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.removeChild = function (child) {
            var index = this.$children.indexOf(child);
            if (index >= 0) {
                return this.$doRemoveChild(index);
            }
            else {
                DEBUG && egret.$error(1006);
                return null;
            }
        };
        /**
         * @inheritDoc
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.removeChildAt = function (index) {
            index = +index | 0;
            if (index >= 0 && index < this.$children.length) {
                return this.$doRemoveChild(index);
            }
            else {
                DEBUG && egret.$error(1007);
                return null;
            }
        };
        /**
         * @private
         */
        p.$doRemoveChild = function (index, notifyListeners) {
            if (notifyListeners === void 0) { notifyListeners = true; }
            index = +index | 0;
            var children = this.$children;
            var child = children[index];
            this.$childRemoved(child, index);
            if (notifyListeners) {
                child.dispatchEventWith(egret.Event.REMOVED, true);
            }
            if (this.$stage) {
                child.$onRemoveFromStage();
                var list = DisplayObjectContainer.$EVENT_REMOVE_FROM_STAGE_LIST;
                while (list.length > 0) {
                    var childAddToStage = list.shift();
                    if (notifyListeners) {
                        childAddToStage.dispatchEventWith(egret.Event.REMOVED_FROM_STAGE);
                    }
                    childAddToStage.$stage = null;
                }
            }
            var displayList = this.$displayList || this.$parentDisplayList;
            this.assignParentDisplayList(child, displayList, null);
            child.$propagateFlagsDown(624 /* DownOnAddedOrRemoved */);
            child.$setParent(null);
            children.splice(index, 1);
            this.$propagateFlagsUp(4 /* InvalidBounds */);
            return child;
        };
        /**
         * @inheritDoc
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.setChildIndex = function (child, index) {
            index = +index | 0;
            if (index < 0 || index >= this.$children.length) {
                index = this.$children.length - 1;
            }
            this.doSetChildIndex(child, index);
        };
        /**
         * @private
         */
        p.doSetChildIndex = function (child, index) {
            var lastIndex = this.$children.indexOf(child);
            if (lastIndex < 0) {
                DEBUG && egret.$error(1006);
            }
            if (lastIndex == index) {
                return;
            }
            this.$childRemoved(child, lastIndex);
            //????????????????????????
            this.$children.splice(lastIndex, 1);
            //??????????????????
            this.$children.splice(index, 0, child);
            this.$childAdded(child, index);
            child.$invalidateTransform();
            this.$propagateFlagsUp(4 /* InvalidBounds */);
        };
        /**
         * @inheritDoc
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.swapChildrenAt = function (index1, index2) {
            index1 = +index1 | 0;
            index2 = +index2 | 0;
            if (index1 >= 0 && index1 < this.$children.length && index2 >= 0 && index2 < this.$children.length) {
                this.doSwapChildrenAt(index1, index2);
            }
            else {
                DEBUG && egret.$error(1007);
            }
        };
        /**
         * @inheritDoc
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.swapChildren = function (child1, child2) {
            var index1 = this.$children.indexOf(child1);
            var index2 = this.$children.indexOf(child2);
            if (index1 == -1 || index2 == -1) {
                DEBUG && egret.$error(1006);
            }
            else {
                this.doSwapChildrenAt(index1, index2);
            }
        };
        /**
         * @private
         */
        p.doSwapChildrenAt = function (index1, index2) {
            if (index1 > index2) {
                var temp = index2;
                index2 = index1;
                index1 = temp;
            }
            else if (index1 == index2) {
                return;
            }
            var list = this.$children;
            var child1 = list[index1];
            var child2 = list[index2];
            this.$childRemoved(child1, index1);
            this.$childRemoved(child2, index2);
            list[index1] = child2;
            list[index2] = child1;
            this.$childAdded(child2, index1);
            this.$childAdded(child1, index2);
            child1.$invalidateTransform();
            child2.$invalidateTransform();
            this.$propagateFlagsUp(4 /* InvalidBounds */);
        };
        /**
         * @inheritDoc
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.removeChildren = function () {
            var children = this.$children;
            for (var i = children.length - 1; i >= 0; i--) {
                this.$doRemoveChild(i);
            }
        };
        /**
         * @private
         * ????????????????????????????????????????????????????????????addChild()???????????????????????????setChildIndex()???swapChildren??????????????????
         * ?????????????????????????????????????????????$childRemoved()?????????????????????$childAdded()?????????
         */
        p.$childAdded = function (child, index) {
        };
        /**
         * @private
         * ?????????????????????????????????????????????????????????removeChild()???????????????????????????setChildIndex()???swapChildren??????????????????
         * ?????????????????????????????????????????????$childRemoved()?????????????????????$childAdded()?????????
         */
        p.$childRemoved = function (child, index) {
        };
        /**
         * @private
         */
        p.$onAddToStage = function (stage, nestLevel) {
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            var children = this.$children;
            var length = children.length;
            nestLevel++;
            for (var i = 0; i < length; i++) {
                var child = this.$children[i];
                child.$onAddToStage(stage, nestLevel);
            }
        };
        /**
         * @private
         *
         */
        p.$onRemoveFromStage = function () {
            _super.prototype.$onRemoveFromStage.call(this);
            var children = this.$children;
            var length = children.length;
            for (var i = 0; i < length; i++) {
                var child = children[i];
                child.$onRemoveFromStage();
            }
        };
        /**
         * @private
         */
        p.$measureChildBounds = function (bounds) {
            var children = this.$children;
            var length = children.length;
            if (length == 0) {
                return;
            }
            var xMin = 0, xMax = 0, yMin = 0, yMax = 0;
            var found = false;
            for (var i = -1; i < length; i++) {
                var childBounds = i == -1 ? bounds : children[i].$getTransformedBounds(this, egret.$TempRectangle);
                if (childBounds.isEmpty()) {
                    continue;
                }
                if (found) {
                    xMin = Math.min(xMin, childBounds.x);
                    xMax = Math.max(xMax, childBounds.x + childBounds.width);
                    yMin = Math.min(yMin, childBounds.y);
                    yMax = Math.max(yMax, childBounds.y + childBounds.height);
                }
                else {
                    found = true;
                    xMin = childBounds.x;
                    xMax = xMin + childBounds.width;
                    yMin = childBounds.y;
                    yMax = yMin + childBounds.height;
                }
            }
            bounds.setTo(xMin, yMin, xMax - xMin, yMax - yMin);
        };
        d(p, "touchChildren"
            /**
             * @inheritDoc
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$getTouchChildren();
            }
            ,function (value) {
                this.$setTouchChildren(!!value);
            }
        );
        /**
         * @private
         *
         * @returns
         */
        p.$getTouchChildren = function () {
            return this.$touchChildren;
        };
        /**
         * @private
         */
        p.$setTouchChildren = function (value) {
            if (this.$touchChildren == value) {
                return false;
            }
            this.$touchChildren = value;
            return true;
        };
        /**
         * @private
         * ???????????????????????????????????????????????????????????????cacheAsBitmap?????????????????????????????????????????????????????????????????????????????????$invalidateTransform().
         * @param notiryChildren ??????????????????????????????????????????false????????????????????????????????????????????????????????????alpha??????????????????????????????????????????
         */
        p.$invalidate = function (notifyChildren) {
            _super.prototype.$invalidate.call(this, notifyChildren);
            if (!notifyChildren) {
                return;
            }
            var cacheRoot = this.$displayList || this.$parentDisplayList;
            var children = this.$children;
            if (children) {
                for (var i = children.length - 1; i >= 0; i--) {
                    this.markChildDirty(children[i], cacheRoot);
                }
            }
        };
        /**
         * @private
         * ????????????????????????????????????????????????????????????????????????????????????????????????????????????cacheAsBitmap?????????
         * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????$invalidate()???
         */
        p.$invalidateTransform = function () {
            this.markChildDirty(this, this.$parentDisplayList);
        };
        /**
         * @private
         */
        p.markChildDirty = function (child, parentCache) {
            if (child.$hasFlags(512 /* DirtyChildren */)) {
                return;
            }
            child.$setFlags(512 /* DirtyChildren */);
            var displayList = child.$displayList;
            if ((displayList || child.$renderRegion) && parentCache) {
                parentCache.markDirty(displayList || child);
            }
            if (displayList) {
                return;
            }
            var children = child.$children;
            if (children) {
                for (var i = children.length - 1; i >= 0; i--) {
                    this.markChildDirty(children[i], parentCache);
                }
            }
        };
        /**
         * @private
         */
        p.$cacheAsBitmapChanged = function () {
            _super.prototype.$cacheAsBitmapChanged.call(this);
            var cacheRoot = this.$displayList || this.$parentDisplayList;
            var children = this.$children;
            for (var i = children.length - 1; i >= 0; i--) {
                this.assignParentDisplayList(children[i], cacheRoot, cacheRoot);
            }
        };
        /**
         * @private
         */
        p.assignParentDisplayList = function (child, parentCache, newParent) {
            child.$parentDisplayList = newParent;
            child.$setFlags(512 /* DirtyChildren */);
            var displayList = child.$displayList;
            if ((child.$renderRegion || displayList) && parentCache) {
                parentCache.markDirty(displayList || child);
            }
            if (displayList) {
                return;
            }
            var children = child.$children;
            if (children) {
                for (var i = children.length - 1; i >= 0; i--) {
                    this.assignParentDisplayList(children[i], parentCache, newParent);
                }
            }
        };
        /**
         * @private
         */
        p.$hitTest = function (stageX, stageY) {
            if (!this.$visible) {
                return null;
            }
            var m = this.$getInvertedConcatenatedMatrix();
            var localX = m.a * stageX + m.c * stageY + m.tx;
            var localY = m.b * stageX + m.d * stageY + m.ty;
            var rect = this.$scrollRect ? this.$scrollRect : this.$maskRect;
            if (rect && !rect.contains(localX, localY)) {
                return null;
            }
            if (this.$mask && !this.$mask.$hitTest(stageX, stageY)) {
                return null;
            }
            var children = this.$children;
            var found = false;
            for (var i = children.length - 1; i >= 0; i--) {
                var child = children[i];
                if (child.$maskedObject) {
                    continue;
                }
                var target = child.$hitTest(stageX, stageY);
                if (target) {
                    found = true;
                    if (target.$touchEnabled) {
                        break;
                    }
                    else {
                        target = null;
                    }
                }
            }
            if (target) {
                if (this.$touchChildren) {
                    return target;
                }
                return this;
            }
            if (found) {
                return this;
            }
            return _super.prototype.$hitTest.call(this, stageX, stageY);
        };
        /**
         * @private
         */
        DisplayObjectContainer.$EVENT_ADD_TO_STAGE_LIST = [];
        /**
         * @private
         */
        DisplayObjectContainer.$EVENT_REMOVE_FROM_STAGE_LIST = [];
        return DisplayObjectContainer;
    })(egret.DisplayObject);
    egret.DisplayObjectContainer = DisplayObjectContainer;
    egret.registerClass(DisplayObjectContainer,"egret.DisplayObjectContainer",["egret.IDisplayObjectContainer"]);
    if (DEBUG) {
        egret.$markReadOnly(DisplayObjectContainer, "numChildren");
    }
})(egret || (egret = {}));
var egret;
(function (egret) {
    var GradientType = (function () {
        function GradientType() {
        }
        var d = __define,c=GradientType;p=c.prototype;
        /**
         * ????????????????????????????????????
         * @method egret.GradientType.LINEAR
         */
        GradientType.LINEAR = "linear";
        /**
         * ???????????????????????????????????????
         * @method egret.GradientType.RADIAL
         */
        GradientType.RADIAL = "radial";
        return GradientType;
    })();
    egret.GradientType = GradientType;
    egret.registerClass(GradientType,"egret.GradientType");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * The Graphics class contains a set of methods for creating vector shape. Display objects that support drawing include Sprite and Shape objects. Each class in these classes includes the graphics attribute that is a Graphics object.
     * The following auxiliary functions are provided for ease of use: drawRect(), drawRoundRect(), drawCircle(), and drawEllipse().
     * @see http://docs.egret-labs.org/post/manual/graphics/drawrect.html  Draw Rectangle
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/Graphics.ts
     */
    /**
     * @language zh_CN
     * Graphics ??????????????????????????????????????????????????????????????????????????????????????? Sprite ??? Shape ????????????????????????????????????????????? graphics ??????????????????????????? Graphics ?????????
     * ?????????????????????????????????????????????????????????drawRect()???drawRoundRect()???drawCircle() ??? drawEllipse()???
     * @see http://docs.egret-labs.org/post/manual/graphics/drawrect.html  ????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/Graphics.ts
     */
    var Graphics = (function (_super) {
        __extends(Graphics, _super);
        /**
         * @version Egret 2.4
         * @platform Web,Native
         */
        function Graphics() {
            _super.call(this);
            /**
             * @private
             */
            this.$renderContext = null;
            /**
             * @private
             */
            this.strokeStyleColor = null;
            /**
             * @private
             */
            this.fillStyle = null;
            /**
             * @private
             */
            this._dirty = false;
            /**
             * @private
             */
            this.lineX = 0;
            /**
             * @private
             */
            this.lineY = 0;
            /**
             * @private
             */
            this._firstCheck = true;
            /**
             * @private
             */
            this._minX = 0;
            /**
             * @private
             */
            this._minY = 0;
            /**
             * @private
             */
            this._maxX = 0;
            /**
             * @private
             */
            this._maxY = 0;
            this.$renderContext = new egret.GraphicsRenderContext();
        }
        var d = __define,c=Graphics;p=c.prototype;
        d(p, "graphicsRenderContext"
            /**
             * @private
             */
            ,function () {
                return this.$renderContext;
            }
        );
        /**
         * @private
         */
        p.$hitTest = function (stageX, stageY) {
            var target = this.$renderContext.$targetDisplay;
            var m = target.$getInvertedConcatenatedMatrix();
            var localX = m.a * stageX + m.c * stageY + m.tx;
            var localY = m.b * stageX + m.d * stageY + m.ty;
            var context = egret.sys.sharedRenderContext;
            context.surface.width = context.surface.height = 3;
            context.translate(1 - localX, 1 - localY);
            this.$renderContext.$render(context, true);
            var data = context.getImageData(1, 1, 1, 1).data;
            if (data[3] === 0) {
                return null;
            }
            return target;
        };
        /**
         * @private
         */
        p.$measureContentBounds = function (bounds) {
            this.$renderContext.$measureContentBounds(bounds);
        };
        /**
         * @private
         */
        p.$render = function (context) {
            this.$renderContext.$render(context);
        };
        /**
         * @language en_US
         * Specify a simple single color fill that will be used for subsequent calls to other Graphics methods (for example, lineTo() and drawCircle()) when drawing.
         * Calling the clear() method will clear the fill.
         * @param color {number} Filled color
         * @param alpha {number} Filled Alpha value
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????????????????????????? Graphics ???????????? lineTo() ??? drawCircle()????????????????????????
         * ?????? clear() ????????????????????????
         * @param color {number} ???????????????
         * @param alpha {number} ????????? Alpha ???
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.beginFill = function (color, alpha) {
            if (alpha === void 0) { alpha = 1; }
            this.fillStyle = this._parseColor(color, alpha);
            this._setStyle(this.fillStyle);
        };
        /**
         * @private
         *
         * @param color
         * @param alpha
         * @returns
         */
        p._parseColor = function (color, alpha) {
            var _colorBlue = color & 0x0000FF;
            var _colorGreen = (color & 0x00ff00) >> 8;
            var _colorRed = color >> 16;
            return "rgba(" + _colorRed + "," + _colorGreen + "," + _colorBlue + "," + alpha + ")";
        };
        /**
         * @private
         *
         * @param colorStr
         */
        p._setStyle = function (colorStr) {
            this.$renderContext.fillStyle = colorStr;
            this.$renderContext.beginPath();
        };
        /**
         * @language en_US
         * Specifies a gradient fill used by subsequent calls to other Graphics methods (such as lineTo() or drawCircle()) for the object.
         * Calling the clear() method clears the fill.
         * Note: Only support on Canvas
         * @param type A value from the GradientType class that specifies which gradient type to use: GradientType.LINEAR or GradientType.RADIAL.
         * @param colors An array of RGB hexadecimal color values used in the gradient; for example, red is 0xFF0000, blue is 0x0000FF, and so on. You can specify up to 15 colors. For each color, specify a corresponding value in the alphas and ratios parameters.
         * @param alphas An array of alpha values for the corresponding colors in the colors array;
         * @param ratios An array of color distribution ratios; valid values are 0-255.
         * @param matrix A transformation matrix as defined by the flash.geom.Matrix class. The flash.geom.Matrix class includes a createGradientBox() method, which lets you conveniently set up the matrix for use with the beginGradientFill() method.
         * @platform Web
         * @version Egret 2.4
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????????????????????????? Graphics ???????????? lineTo() ??? drawCircle()????????????????????????
         * ?????? clear() ????????????????????????
         * ??????????????????????????????H5 Canvas
         * @param type ?????????????????????????????????????????? GradientType ????????????GradientType.LINEAR ??? GradientType.RADIAL???
         * @param colors ?????????????????? RGB ??????????????????????????????????????????????????? 0xFF0000???????????? 0x0000FF?????????????????????????????????????????? alphas ??? ratios ???????????????????????????
         * @param alphas colors ???????????????????????? alpha ????????????
         * @param ratios ?????????????????????????????????????????? 0 ??? 255???
         * @param matrix ????????? egret.Matrix ???????????????????????????egret.Matrix ????????? createGradientBox() ??????????????????????????????????????????????????????????????? beginGradientFill() ??????????????????
         * @platform Web
         * @version Egret 2.4
         */
        p.beginGradientFill = function (type, colors, alphas, ratios, matrix) {
            if (matrix === void 0) { matrix = null; }
            var gradient = this.getGradient(type, colors, alphas, ratios, matrix);
            this.fillStyle = gradient;
            this._setStyle(this.fillStyle);
        };
        p.getGradient = function (type, colors, alphas, ratios, matrix) {
            var surface = egret.sys.surfaceFactory.create(true);
            var context = surface.renderContext;
            var m = new egret.Matrix();
            if (matrix) {
                m.a = matrix.a * 819.2;
                m.b = matrix.b * 819.2;
                m.c = matrix.c * 819.2;
                m.d = matrix.d * 819.2;
                m.tx = matrix.tx;
                m.ty = matrix.ty;
            }
            else {
                //?????????
                m.a = 100;
                m.d = 100;
            }
            var gradient;
            if (type == egret.GradientType.LINEAR) {
                gradient = context.createLinearGradient(-1, 0, 1, 0);
            }
            else {
                gradient = context.createRadialGradient(0, 0, 0, 0, 0, 1);
            }
            //todo colors alphas ratios???????????????????????????
            var l = colors.length;
            for (var i = 0; i < l; i++) {
                gradient.addColorStop(ratios[i] / 255, this._parseColor(colors[i], alphas[i]));
            }
            gradient["matrix"] = m;
            egret.sys.surfaceFactory.release(surface);
            return gradient;
        };
        /**
         * @language en_US
         * Draw a rectangle
         * @param x {number} x position of the center, relative to the registration point of the parent display object (in pixels).
         * @param y {number} y position of the center, relative to the registration point of the parent display object (in pixels).
         * @param width {number} Width of the rectangle (in pixels).
         * @param height {number} Height of the rectangle (in pixels).
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????
         * @param x {number} ?????????????????????????????????????????? x ?????????????????????????????????
         * @param y {number} ????????????????????????????????????????????? y ?????????????????????????????????
         * @param width {number} ??????????????????????????????????????????
         * @param height {number} ??????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.drawRect = function (x, y, width, height) {
            if (DEBUG) {
                if (isNaN(x) || isNaN(y) || isNaN(width) || isNaN(height)) {
                    egret.$error(1013);
                }
            }
            this.$renderContext.beginPath();
            this.$renderContext.rect(x, y, width, height);
            this.$renderContext.closePath();
        };
        /**
         * @language en_US
         * Draw a circle.
         * @param x {number} x position of the center, relative to the registration point of the parent display object (in pixels).
         * @param y {number} y position of the center, relative to the registration point of the parent display object (in pixels).
         * @param r {number} Radius of the circle (in pixels).
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????
         * @param x {number} ?????????????????????????????????????????? x ?????????????????????????????????
         * @param y {number} ????????????????????????????????????????????? y ?????????????????????????????????
         * @param r {number} ???????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.drawCircle = function (x, y, r) {
            if (DEBUG) {
                if (isNaN(x) || isNaN(y) || isNaN(r)) {
                    egret.$error(1013);
                }
            }
            this.$renderContext.beginPath();
            this.$renderContext.arc(x, y, r, 0, Math.PI * 2);
            this.$renderContext.closePath();
        };
        /**
         * @language en_US
         * Draw a rectangle with rounded corners.
         * @param x {number} x position of the center, relative to the registration point of the parent display object (in pixels).
         * @param y {number} y position of the center, relative to the registration point of the parent display object (in pixels).
         * @param width {number} Width of the rectangle (in pixels).
         * @param height {number} Height of the rectangle (in pixels).
         * @param ellipseWidth {number} Width used to draw an ellipse with rounded corners (in pixels).
         * @param ellipseHeight {number} Height used to draw an ellipse with rounded corners (in pixels). (Optional) If no value is specified, the default value matches the value of the ellipseWidth parameter.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????
         * @param x {number} ?????????????????????????????????????????? x ?????????????????????????????????
         * @param y {number} ????????????????????????????????????????????? y ?????????????????????????????????
         * @param width {number} ??????????????????????????????????????????
         * @param height {number} ??????????????????????????????????????????
         * @param ellipseWidth {number} ???????????????????????????????????????????????????????????????
         * @param ellipseHeight {number} ??????????????????????????????????????????????????????????????? ??????????????????????????????????????????????????? ellipseWidth ??????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.drawRoundRect = function (x, y, width, height, ellipseWidth, ellipseHeight) {
            if (DEBUG) {
                if (isNaN(x) || isNaN(y) || isNaN(width) || isNaN(height)) {
                    egret.$error(1013);
                }
            }
            var _x = x; //??????X??????
            var _y = y; //??????Y??????
            var _w = width;
            var _h = height;
            var _ew = ellipseWidth / 2;
            var _eh = ellipseHeight ? ellipseHeight / 2 : _ew;
            var right = _x + _w;
            var bottom = _y + _h;
            var ax = right;
            var ay = bottom - _eh;
            this.$renderContext.beginPath();
            this.$renderContext.moveTo(ax, ay);
            this.$renderContext.quadraticCurveTo(right, bottom, right - _ew, bottom);
            this.$renderContext.lineTo(_x + _ew, bottom);
            this.$renderContext.quadraticCurveTo(_x, bottom, _x, bottom - _eh);
            this.$renderContext.lineTo(_x, _y + _eh);
            this.$renderContext.quadraticCurveTo(_x, _y, _x + _ew, _y);
            this.$renderContext.lineTo(right - _ew, _y);
            this.$renderContext.quadraticCurveTo(right, _y, right, _y + _eh);
            this.$renderContext.lineTo(ax, ay);
            this.$renderContext.closePath();
        };
        /**
         * @language en_US
         * Draw an ellipse.
         * @param x {number} A number indicating the horizontal position, relative to the registration point of the parent display object (in pixels).
         * @param y {number} A number indicating the vertical position, relative to the registration point of the parent display object (in pixels).
         * @param width {number} Width of the rectangle (in pixels).
         * @param height {number} Height of the rectangle (in pixels).
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????
         * @param x {number} ????????????????????????????????????????????????????????????????????????????????????????????????
         * @param y {number} ????????????????????????????????????????????????????????????????????????????????????????????????
         * @param width {number} ??????????????????????????????????????????
         * @param height {number} ??????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.drawEllipse = function (x, y, width, height) {
            if (DEBUG) {
                if (isNaN(x) || isNaN(y) || isNaN(width) || isNaN(height)) {
                    egret.$error(1013);
                }
            }
            var _x = x + width / 2; //??????X??????
            var _y = y + height / 2; //??????Y??????
            var r = (width > height) ? width : height; //????????????????????????arc????????????
            var ratioX = width / r; //??????????????????
            var ratioY = height / r; //??????????????????
            r /= 2;
            this.$renderContext.scale(ratioX, ratioY); //????????????(????????????)
            this.$renderContext.beginPath();
            this.$renderContext.arc(_x / ratioX, _y / ratioY, r, 0, 2 * Math.PI);
            this.$renderContext.closePath();
            this.$renderContext.scale(1 / ratioX, 1 / ratioY); //????????????
        };
        /**
         * @language en_US
         * Specify a line style that will be used for subsequent calls to Graphics methods such as lineTo() and drawCircle().
         * @param thickness {number} An integer, indicating the thickness of the line in points. Valid values are 0 to 255. If a number is not specified, or if the parameter is undefined, a line is not drawn. If a value less than 0 is passed, the default value is 0. Value 0 indicates hairline thickness; the maximum thickness is 255. If a value greater than 255 is passed, the default value is 255.
         * @param color {number} A hexadecimal color value of the line (for example, red is 0xFF0000, and blue is 0x0000FF, etc.). If no value is specified, the default value is 0x000000 (black). Optional.
         * @param alpha {number} Indicates Alpha value of the line's color. Valid values are 0 to 1. If no value is specified, the default value is 1 (solid). If the value is less than 0, the default value is 0. If the value is greater than 1, the default value is 1.
         * @param pixelHinting {boolean} A boolean value that specifies whether to hint strokes to full pixels. This affects both the position of anchors of a curve and the line stroke size itself. With pixelHinting set to true, the line width is adjusted to full pixel width. With pixelHinting set to false, disjoints can appear for curves and straight lines.
         * @param scaleMode {string} Specifies the scale mode to be used
         * @param caps {string} Specifies the value of the CapsStyle class of the endpoint type at the end of the line.
         * @param joints {string} Specifies the type of joint appearance of corner.
         * @param miterLimit {number} Indicates the limit number of cut miter.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????????????? lineTo() ??? drawCircle() ??? Graphics ??????????????????
         * @param thickness {number} ?????????????????????????????????????????????????????????????????? 0 ??? 255??????????????????????????????????????????????????????????????????????????????????????????????????? 0?????????????????? 0?????? 0 ??????????????????????????????????????? 255??????????????????????????? 255?????????????????? 255???
         * @param color {number} ??????????????????????????????????????????????????? 0xFF0000???????????? 0x0000FF ????????????????????????????????????????????? 0x000000????????????????????????
         * @param alpha {number} ????????????????????? Alpha ??????????????????????????? 0 ??? 1??????????????????????????????????????? 1?????????????????????????????? 0?????????????????? 0?????????????????? 1?????????????????? 1???
         * @param pixelHinting {boolean} ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? pixelHinting ????????? true ??????????????????????????????????????????????????????????????? pixelHinting ????????? false ????????????????????????????????????????????????????????????
         * @param scaleMode {string} ????????????????????????????????????
         * @param caps {string} ?????????????????????????????????????????? CapsStyle ????????????
         * @param joints {string} ?????????????????????????????????????????????
         * @param miterLimit {number} ????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.lineStyle = function (thickness, color, alpha, pixelHinting, scaleMode, caps, joints, miterLimit) {
            if (thickness === void 0) { thickness = NaN; }
            if (color === void 0) { color = 0; }
            if (alpha === void 0) { alpha = 1.0; }
            if (pixelHinting === void 0) { pixelHinting = false; }
            if (scaleMode === void 0) { scaleMode = "normal"; }
            if (caps === void 0) { caps = null; }
            if (joints === void 0) { joints = null; }
            if (miterLimit === void 0) { miterLimit = 3; }
            if (this.strokeStyleColor) {
                this._createEndLineCommand();
            }
            this.strokeStyleColor = this._parseColor(color, alpha);
            this.moveTo(this.lineX, this.lineY);
            this.$renderContext.lineWidth = thickness;
            this.$renderContext.strokeStyle = this.strokeStyleColor;
            this.$renderContext.beginPath();
        };
        /**
         * @language en_US
         * Draw a straight line from the current drawing position to (x, y) using the current line style; the current drawing position is then set to (x, y).
         * @param x {number} A number indicating the horizontal position, relative to the registration point of the parent display object (in pixels).
         * @param y {number} A number indicating the vertical position, relative to the registration point of the parent display object (in pixels).
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????????????????????????????????????? (x, y) ?????????????????????????????????????????????????????? (x, y)???
         * @param x {number} ????????????????????????????????????????????????????????????????????????????????????????????????
         * @param y {number} ????????????????????????????????????????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.lineTo = function (x, y) {
            this.lineX = x;
            this.lineY = y;
            this.$renderContext.lineTo(x, y);
        };
        /**
         * @language en_US
         * Draw a quadratic Bezier curve from the current drawing position to (anchorX, anchorY) using the current line style according to the control points specified by (controlX, controlY). The current drawing position is then set to (anchorX, anchorY).
         * If the curveTo() method is called before the moveTo() method, the default value of the current drawing position is (0, 0). If any of these parameters is missed, calling this method will fail and the current drawing position keeps unchanged.
         * The drawn curve is a quadratic Bezier curve. A quadratic Bezier curve contains two anchor points and one control point. The curve interpolates the two anchor points and bends to the control point.
         * @param controlX {number} A number indicating the horizontal position of the control point, relative to the registration point of the parent display object.
         * @param controlY {number} A number indicating the vertical position of the control point, relative to the registration point of the parent display object.
         * @param anchorX {number} A number indicating the horizontal position of the next anchor point, relative to the registration point of the parent display object.
         * @param anchorY {number} A number indicating the vertical position of the next anchor point, relative to the registration point of the parent display object.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????? (controlX, controlY) ???????????????????????????????????????????????????????????? (anchorX, anchorY) ?????????????????????????????????????????????????????????????????? (anchorX, anchorY)???
         * ??????????????? moveTo() ????????????????????? curveTo() ????????????????????????????????????????????? (0, 0)????????????????????????????????????????????????????????????????????????????????????????????????
         * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * @param controlX {number} ?????????????????????????????????????????????????????????????????????????????????
         * @param controlY {number} ?????????????????????????????????????????????????????????????????????????????????
         * @param anchorX {number} ???????????????????????????????????????????????????????????????????????????????????????
         * @param anchorY {number} ???????????????????????????????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.curveTo = function (controlX, controlY, anchorX, anchorY) {
            this.lineX = anchorX;
            this.lineY = anchorY;
            this.$renderContext.quadraticCurveTo(controlX, controlY, anchorX, anchorY);
        };
        /**
         * @language en_US
         * adds an arc to the path which is centered at (x, y) position with radius r starting at startAngle and ending
         * at endAngle going in the given direction by anticlockwise (defaulting to clockwise).
         * @param x The x coordinate of the arc's center.
         * @param y The y coordinate of the arc's center.
         * @param radius The arc's radius.
         * @param startAngle The angle at which the arc starts, measured clockwise from the positive x axis and expressed in radians.
         * @param endAngle The angle at which the arc ends, measured clockwise from the positive x axis and expressed in radians.
         * @param anticlockwise if true, causes the arc to be drawn counter-clockwise between the two angles. By default it is drawn clockwise.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????? (x, y) ?????????????????? r ?????????anticlockwise ?????????????????????????????????????????? startAngle ?????????????????? endAngle ?????????
         * @param x ??????????????????????????? x ????????????
         * @param y ??????????????????????????? y ????????????
         * @param radius ??????????????????
         * @param startAngle ????????????????????? x????????????????????????????????????????????????
         * @param endAngle ?????????????????? ????????????????????????
         * @param anticlockwise ????????? true??????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.drawArc = function (x, y, radius, startAngle, endAngle, anticlockwise) {
            this.lineX = Math.cos(endAngle) + x;
            this.lineY = Math.sin(endAngle) + y;
            this.$renderContext.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        };
        /**
         * @language en_US
         * Draws a cubic Bezier curve from the current drawing position to the specified anchor. Cubic Bezier curves consist of two anchor points and two control points. The curve interpolates the two anchor points and two control points to the curve.
         * @param controlX1 {number} Specifies the first control point relative to the registration point of the parent display the horizontal position of the object.
         * @param controlY1 {number} Specifies the first control point relative to the registration point of the parent display the vertical position of the object.
         * @param controlX2 {number} Specify the second control point relative to the registration point of the parent display the horizontal position of the object.
         * @param controlY2 {number} Specify the second control point relative to the registration point of the parent display the vertical position of the object.
         * @param anchorX {number} Specifies the anchor point relative to the registration point of the parent display the horizontal position of the object.
         * @param anchorY {number} Specifies the anchor point relative to the registration point of the parent display the vertical position of the object.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * @param controlX1 {number} ???????????????????????????????????????????????????????????????????????????
         * @param controlY1 {number} ???????????????????????????????????????????????????????????????????????????
         * @param controlX2 {number} ??????????????????????????????????????????????????????????????????????????????
         * @param controlY2 {number} ??????????????????????????????????????????????????????????????????????????????
         * @param anchorX {number} ??????????????????????????????????????????????????????????????????
         * @param anchorY {number} ??????????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.cubicCurveTo = function (controlX1, controlY1, controlX2, controlY2, anchorX, anchorY) {
            this.lineX = anchorX;
            this.lineY = anchorY;
            this.$renderContext.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, anchorX, anchorY);
        };
        /**
         * @language en_US
         * Move the current drawing position to (x, y). If any of these parameters is missed, calling this method will fail and the current drawing position keeps unchanged.
         * @param x {number} A number indicating the horizontal position, relative to the registration point of the parent display object (in pixels).
         * @param y {number} A number indicating the vertical position, relative to the registration point of the parent display object (in pixels).
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????? (x, y)????????????????????????????????????????????????????????????????????????????????????????????????
         * @param x {number} ????????????????????????????????????????????????????????????????????????????????????????????????
         * @param y {number} ????????????????????????????????????????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.moveTo = function (x, y) {
            this.lineX = x;
            this.lineY = y;
            this.$renderContext.moveTo(x, y);
        };
        /**
         * @language en_US
         * Clear graphics that are drawn to this Graphics object, and reset fill and line style settings.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????? Graphics ?????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.clear = function () {
            this.lineX = 0;
            this.lineY = 0;
            this.strokeStyleColor = null;
            this.fillStyle = null;
            this._minX = 0;
            this._minY = 0;
            this._maxX = 0;
            this._maxY = 0;
            this._firstCheck = true;
            this._dirty = true;
            this.$renderContext.clear();
        };
        /**
         * @language en_US
         * Apply fill to the lines and curves added after the previous calling to the beginFill() method.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????? beginFill()???????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.endFill = function () {
            if (this.fillStyle != null || this.strokeStyleColor != null) {
                this._fill();
                this.fillStyle = null;
            }
        };
        /**
         * @private
         *
         */
        p._createEndFillCommand = function () {
            this.$renderContext.fill();
            this.$renderContext.closePath();
        };
        /**
         * @private
         *
         */
        p._fill = function () {
            if (this.fillStyle) {
                this._createEndFillCommand();
            }
            if (this.strokeStyleColor) {
                this._createEndLineCommand();
            }
        };
        /**
         * @private
         *
         */
        p._createEndLineCommand = function () {
            this.$renderContext.stroke();
            this.$renderContext.closePath();
        };
        return Graphics;
    })(egret.HashObject);
    egret.Graphics = Graphics;
    egret.registerClass(Graphics,"egret.Graphics");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    var PI = Math.PI;
    var HalfPI = PI / 2;
    var PacPI = PI + HalfPI;
    var TwoPI = PI * 2;
    var vector = { x: 0, y: 0 };
    var vector1 = { x: 0, y: 0 };
    var vector3 = { x: 0, y: 0 };
    /**
     * @private
     * ???????????????????????????
     */
    function clampAngle(value) {
        value %= PI * 2;
        if (value < 0) {
            value += PI * 2;
        }
        return value;
    }
    /**
     * @private
     * ???????????????
     */
    function distance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }
    /**
     * @private
     * ????????????????????????
     */
    function getVector(x1, y1, x2, y2, v) {
        var l = distance(x1, y1, x2, y2);
        v.x = (x2 - x1) / l;
        v.y = (y2 - y1) / l;
    }
    /**
     * @private
     * @language en_US
     * The Graphics class contains a set of methods that you can use to create a vector shape. the Shape object that support
     * drawing includes a graphics property that is a Graphics object. The following are among those helper functions provided
     * @see egret.Shape
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @private
     * @language zh_CN
     * Graphics ??????????????????????????????????????????????????????Shape?????????????????????????????????????????????????????? graphics ??????????????????????????? Graphics ?????????
     * @see egret.Shape
     * @version Egret 2.4
     * @platform Web,Native
     */
    var GraphicsRenderContext = (function (_super) {
        __extends(GraphicsRenderContext, _super);
        /**
         * @private
         * @version Egret 2.4
         * @platform Web,Native
         */
        function GraphicsRenderContext() {
            _super.call(this);
            /**
             * @private
             * ??????????????????
             */
            this.$commands = [];
            this.reset();
        }
        var d = __define,c=GraphicsRenderContext;p=c.prototype;
        /**
         * @language en_US
         * creates a radial gradient given by the coordinates of the two circles represented by the parameters.
         * This method returns a radial GraphicsGradient.
         * @param x0 The x axis of the coordinate of the start circle.
         * @param y0 The y axis of the coordinate of the start circle.
         * @param r0 The radius of the start circle.
         * @param x1 The x axis of the coordinate of the end circle.
         * @param y1 The y axis of the coordinate of the end circle.
         * @param r1 The radius of the end circle.
         * @see egret.GraphicsGradient
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????????????????????????????????????????????????????????????????? GraphicsGradient???
         * @param x0 ??????????????? x ????????????
         * @param y0 ??????????????? y ????????????
         * @param r0 ????????????????????????
         * @param x1 ??????????????? x ????????????
         * @param y1 ??????????????? y ????????????
         * @param r1 ????????????????????????
         * @see egret.GraphicsGradient
         * @version Egret 2.4
         * @platform Web,Native
         */
        GraphicsRenderContext.createRadialGradient = function (x0, y0, r0, x1, y1, r1) {
            return egret.sys.sharedRenderContext.createRadialGradient(x0, y0, r0, x1, y1, r1);
        };
        /**
         * @language en_US
         * reates a gradient along the line given by the coordinates represented by the parameters.This method returns a linear GraphicsGradient.
         * @see egret.GraphicsGradient
         * @param x0 The x axis of the coordinate of the start point.
         * @param y0 The y axis of the coordinate of the start point.
         * @param x1 The x axis of the coordinate of the end point.
         * @param y1 The y axis of the coordinate of the end point.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????????????????????????? GraphicsGradient ?????????
         * @param x0 ????????? x ????????????
         * @param y0 ????????? y ????????????
         * @param x1 ????????? x ????????????
         * @param y1 ????????? y ????????????
         * @see egret.GraphicsGradient
         * @version Egret 2.4
         * @platform Web,Native
         */
        GraphicsRenderContext.createLinearGradient = function (x0, y0, x1, y1) {
            return egret.sys.sharedRenderContext.createLinearGradient(x0, y0, x1, y1);
        };
        /**
         * @language en_US
         * creates a pattern using the specified image (BitmapData). It repeats the source in the directions specified by
         * the repetition argument. This method returns a GraphicsPattern.
         * @param bitmapData A BitmapData instance to be used as image to repeat.
         * @param repetition  indicating how to repeat the image. Possible values are:
         * "repeat" (both directions),
         * "repeat-x" (horizontal only),
         * "repeat-y" (vertical only), or
         * "no-repeat" (neither).
         * @see egret.GraphicsPattern
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????(BitmapData)???????????????????????????repetition??????????????????????????????????????????????????????????????????GraphicsPattern?????????
         * @param bitmapData ???????????????????????? BitmapData ?????????
         * @param repetition ???????????????????????????
         * ??????????????????"repeat" (??????????????????),"repeat-x" (?????????????????????),"repeat-y" (?????????????????????),"no-repeat" (?????????).
         * @see egret.GraphicsPattern
         * @version Egret 2.4
         * @platform Web,Native
         */
        GraphicsRenderContext.createPattern = function (bitmapData, repetition) {
            return egret.sys.sharedRenderContext.createPattern(bitmapData, repetition);
        };
        d(p, "fillStyle"
            /**
             * @language en_US
             * specifies the color or style to use inside shapes.
             * @default "#000000"
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????????????????
             * @default "#000000"
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this._fillStyle;
            }
            ,function (value) {
                if (typeof value == "number") {
                    value = egret.toColorString(value);
                }
                this._fillStyle = value;
                this.pushCommand(5 /* fillStyle */, arguments);
            }
        );
        d(p, "lineWidth"
            /**
             * @language en_US
             * sets the thickness of lines in pixels.
             * setting zero, negative, Infinity and NaN values are ignored
             * @default 1
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????????????????????0????????????Infinity ??? NaN ??????????????????
             * @default 1
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this._lineWidth;
            }
            ,function (value) {
                this._lineWidth = value;
                this.pushCommand(3 /* lineWidth */, arguments);
            }
        );
        d(p, "lineCap"
            /**
             * @language en_US
             * determines how the end points of every line are drawn. There are three possible values for this property and those are:<br/>
             * <ul>
             * <li>"butt": The ends of lines are squared off at the endpoints.</li>
             * <li>"round": The ends of lines are rounded.</li>
             * <li>"square": The ends of lines are squared off by adding a box with an equal width and half the height of the line's thickness.</li>
             * </ul>
             * @default "butt"
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????3??????????????????????????????<br/>
             * <ul>
             * <li>"butt": ??????????????????????????????</li>
             * <li>"round": ??????????????????????????????</li>
             * <li>"square": ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</li>
             * </ul>
             * @default "butt"
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this._lineCap;
            }
            ,function (value) {
                this._lineCap = value;
                this.pushCommand(1 /* lineCap */, arguments);
            }
        );
        d(p, "strokeStyle"
            /**
             * @language en_US
             * specifies the color or style to use for the lines around shapes.
             * @default "#000000"
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????????????????
             * @default "#000000"
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this._strokeStyle;
            }
            ,function (value) {
                if (typeof value == "number") {
                    value = egret.toColorString(value);
                }
                this._strokeStyle = value;
                this.pushCommand(4 /* strokeStyle */, arguments);
            }
        );
        d(p, "lineJoin"
            /**
             * @language en_US
             * specifies the type of joint appearance used at angles.There are three possible values for this property and those are:<br/>
             * <ul>
             * <li>"round": Rounds off the corners of a shape by filling an additional sector of disc centered at the common endpoint
             * of connected segments. The radius for these rounded corners is equal to the line width.</li>
             * <li>"bevel": Fills an additional triangular area between the common endpoint of connected segments, and the separate
             * outside rectangular corners of each segment.</li>
             * <li>"miter": Connected segments are joined by extending their outside edges to connect at a single point, with the
             * effect of filling an additional lozenge-shaped area. This setting is effected by the miterLimit property.</li>
             * </ul>
             * @default "miter"
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????,???3??????????????????????????????<br/>
             * <ul>
             * <li>"round": ????????????</li>
             * <li>"bevel": ???????????????</li>
             * <li>"miter": ??????????????????????????????????????????????????????????????? miterLimit ??????????????????????????????</li>
             * </ul>
             * @default "miter"
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this._lineJoin;
            }
            ,function (value) {
                this._lineJoin = value;
                this.pushCommand(2 /* lineJoin */, arguments);
            }
        );
        d(p, "miterLimit"
            /**
             * @language en_US
             * A number that indicates the limit at which a miter is cut off.
             * @default 10
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????????????????
             * @default 10
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this._miterLimit;
            }
            ,function (value) {
                this._miterLimit = value;
                this.pushCommand(0 /* miterLimit */, arguments);
            }
        );
        /**
         *
         * @param x0
         * @param y0
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.scale = function (x0, y0) {
            this.pushCommand(19 /* scale */, arguments);
        };
        /**
         * @language en_US
         * adds an arc to the path which is centered at (x, y) position with radius r starting at startAngle and ending
         * at endAngle going in the given direction by anticlockwise (defaulting to clockwise).
         * @param x The x coordinate of the arc's center.
         * @param y The y coordinate of the arc's center.
         * @param radius The arc's radius.
         * @param startAngle The angle at which the arc starts, measured clockwise from the positive x axis and expressed in radians.
         * @param endAngle The angle at which the arc ends, measured clockwise from the positive x axis and expressed in radians.
         * @param anticlockwise if true, causes the arc to be drawn counter-clockwise between the two angles. By default it is drawn clockwise.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????? (x, y) ?????????????????? r ?????????anticlockwise ?????????????????????????????????????????? startAngle ?????????????????? endAngle ?????????
         * @param x ??????????????????????????? x ????????????
         * @param y ??????????????????????????? y ????????????
         * @param radius ??????????????????
         * @param startAngle ????????????????????? x????????????????????????????????????????????????
         * @param endAngle ?????????????????? ????????????????????????
         * @param anticlockwise ????????? true??????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.arc = function (x, y, radius, startAngle, endAngle, anticlockwise) {
            this.pushCommand(6 /* arc */, arguments);
            if (radius < 0) {
                return;
            }
            if (anticlockwise) {
                var temp = endAngle;
                endAngle = startAngle;
                startAngle = temp;
            }
            this.arcBounds(x, y, radius, startAngle, endAngle);
        };
        /**
         * @private
         * ???????????????????????????
         */
        p.arcBounds = function (x, y, radius, startAngle, endAngle) {
            startAngle = clampAngle(startAngle);
            endAngle = clampAngle(endAngle);
            if (Math.abs(startAngle - endAngle) < 0.01) {
                this.extendByPoint(x - radius, y - radius);
                this.extendByPoint(x + radius, y + radius);
                return;
            }
            var offset = 0;
            if (startAngle > endAngle) {
                offset = TwoPI;
                endAngle += offset;
            }
            var startX = Math.cos(startAngle) * radius;
            var endX = Math.cos(endAngle) * radius;
            var xMin = Math.min(startX, endX);
            var xMax = Math.max(startX, endX);
            if (startAngle <= (PI + offset) && endAngle >= (PI + offset)) {
                xMin = -radius;
            }
            if (startAngle <= offset && endAngle >= offset) {
                xMax = radius;
            }
            var startY = Math.sin(startAngle) * radius;
            var endY = Math.sin(endAngle) * radius;
            var yMin = Math.min(startY, endY);
            var yMax = Math.max(startY, endY);
            if (startAngle <= (PacPI + offset) && endAngle >= (PacPI + offset)) {
                yMin = -radius;
            }
            if (startAngle <= (HalfPI + offset) && endAngle >= (HalfPI + offset)) {
                yMax = radius;
            }
            this.extendByPoint(xMin + x, yMin + y);
            this.extendByPoint(xMax + x, yMax + y);
        };
        /**
         * @language en_US
         * adds a quadratic B??zier curve to the path. It requires two points. The first point is a control point and the
         * second one is the end point. The starting point is the last point in the current path, which can be changed using
         * moveTo() before creating the quadratic B??zier curve.
         * @param cpx The x axis of the coordinate for the control point.
         * @param cpy The y axis of the coordinate for the control point.
         * @param x The x axis of the coordinate for the end point.
         * @param y The y axis of the coordinate for the end point.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????2????????? ??????????????????????????????????????????????????? ?????????????????????????????????????????????????????????????????????????????????????????? moveTo() ?????????????????????
         * @param cpx ???????????? x ????????????
         * @param cpy ???????????? y ????????????
         * @param x ????????? x ????????????
         * @param y ????????? y ????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.quadraticCurveTo = function (cpx, cpy, x, y) {
            this.pushCommand(7 /* quadraticCurveTo */, arguments);
            this.checkMoveTo();
            this.extendByPoint(cpx, cpy);
            this.extendByPoint(x, y);
        };
        /**
         * @language en_US
         * adds a cubic B??zier curve to the path. It requires three points. The first two points are control points and
         * the third one is the end point. The starting point is the last point in the current path, which can be changed
         * using moveTo() before creating the B??zier curve.
         * @param cp1x The x axis of the coordinate for the first control point.
         * @param cp1y The y axis of the coordinate for first control point.
         * @param cp2x The x axis of the coordinate for the second control point.
         * @param cp2y The y axis of the coordinate for the second control point.
         * @param x The x axis of the coordinate for the end point.
         * @param y The y axis of the coordinate for the end point.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????????????????????????????? ????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * ????????????????????????????????????????????? moveTo() ???????????????
         * @param cp1x ????????????????????? x ????????????
         * @param cp1y ????????????????????? y ????????????
         * @param cp2x ????????????????????? x ????????????
         * @param cp2y ????????????????????? y ????????????
         * @param x ???????????? x ????????????
         * @param y ???????????? y ????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y) {
            this.pushCommand(14 /* bezierCurveTo */, arguments);
            this.checkMoveTo();
            this.extendByPoint(cp1x, cp1y);
            this.extendByPoint(cp2x, cp2y);
            this.extendByPoint(x, y);
        };
        /**
         * @language en_US
         * connects the last point in the sub-path to the x, y coordinates with a straight line
         * @param x The x axis of the coordinate for the end of the line.
         * @param y The y axis of the coordinate for the end of the line.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????x???y?????????
         * @param x ??????????????? x ????????????
         * @param y ??????????????? y ????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.lineTo = function (x, y) {
            this.pushCommand(8 /* lineTo */, arguments);
            this.checkMoveTo();
            this.extendByPoint(x, y);
        };
        /**
         * @language en_US
         * fills the current or given path with the current fill style using the non-zero or even-odd winding rule.
         * @param fillRule The algorithm by which to determine if a point is inside a path or outside a path. Possible values:
         * "nonzero": The non-zero winding rule, which is the default rule.
         * "evenodd": The even-odd winding rule.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * @param fillRule ???????????????????????????????????????????????????????????????????????????
         * "nonzero": ????????????????????? ??????????????????
         * "evenodd": ?????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.fill = function (fillRule) {
            this.pushCommand(9 /* fill */, arguments);
            this.hasFill = true;
        };
        /**
         * @language en_US
         * causes the point of the pen to move back to the start of the current sub-path. It tries to add a straight line
         * (but does not actually draw it) from the current point to the start. If the shape has already been closed or
         * has only one point, this function does nothing.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.closePath = function () {
            this.pushCommand(10 /* closePath */, arguments);
        };
        /**
         * @language en_US
         * creates a path for a rectangle at position (x, y) with a size that is determined by width and height. Those
         * four points are connected by straight lines and the sub-path is marked as closed, so that you can fill or stroke this rectangle.
         * @param x The x axis of the coordinate for the rectangle starting point.
         * @param y The y axis of the coordinate for the rectangle starting point.
         * @param w The rectangle's width.
         * @param h The rectangle's height.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????? (x, y) ???????????? width ??? height????????????4??????????????????????????????????????????????????????????????????????????????????????????????????????
         * @param x ??????????????? x ????????????
         * @param y ??????????????? y ????????????
         * @param width ??????????????????
         * @param height ??????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.rect = function (x, y, width, height) {
            this.pushCommand(11 /* rect */, arguments);
            this.extendByPoint(x, y);
            this.extendByPoint(x + width, y + height);
        };
        /**
         * @language en_US
         * moves the starting point of a new sub-path to the (x, y) coordinates.
         * @param x The x axis of the point.
         * @param y The y axis of the point.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????????????????(x???y)??????
         * @param x ?????? x ???
         * @param y ?????? y ???
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.moveTo = function (x, y) {
            this.pushCommand(12 /* moveTo */, arguments);
            this.moveToX = x;
            this.moveToY = y;
            this.hasMoved = true;
        };
        /**
         * @language en_US
         * draws a filled rectangle at (x, y) position whose size is determined by width and height and whose style is
         * determined by the fillStyle attribute.
         * @param x The x axis of the coordinate for the rectangle starting point.
         * @param y The y axis of the coordinate for the rectangle starting point.
         * @param w The rectangle's width.
         * @param h The rectangle's height.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????? (x, y) ??????????????????????????? width ??? height ???fillStyle ??????????????????????????????
         * @param x ?????????????????? x ????????????
         * @param y ?????????????????? y ????????????
         * @param width ??????????????????
         * @param height ??????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.fillRect = function (x, y, width, height) {
            this.pushCommand(13 /* fillRect */, arguments);
            this.extendByPoint(x, y);
            this.extendByPoint(x + width, y + height);
            this.hasFill = true;
        };
        /**
         * @language en_US
         * strokes the current or given path with the current stroke style.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.stroke = function () {
            this.pushCommand(15 /* stroke */, arguments);
            this.hasStroke = true;
        };
        /**
         * @language en_US
         * paints a rectangle which has a starting point at (x, y) and has a w width and an h height onto the surface,
         * using the current stroke style.
         * @param x The x axis of the coordinate for the rectangle starting point.
         * @param y The y axis of the coordinate for the rectangle starting point.
         * @param w The rectangle's width.
         * @param h The rectangle's height.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????? (x, y) ???????????? w ???????????? h ?????????????????????
         * @param x ??????????????? x ????????????
         * @param y ??????????????? y ????????????
         * @param width ??????????????????
         * @param height ??????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.strokeRect = function (x, y, width, height) {
            this.pushCommand(16 /* strokeRect */, arguments);
            this.hasStroke = true;
            this.extendByPoint(x, y);
            this.extendByPoint(x + width, y + height);
        };
        /**
         * @language en_US
         * starts a new path by emptying the list of sub-paths. Call this method when you want to create a new path.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????? ?????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.beginPath = function () {
            this.pushCommand(17 /* beginPath */, arguments);
            this.hasMoved = false;
            this.moveToX = NaN;
            this.moveToY = NaN;
        };
        /**
         * @language en_US
         * adds an arc to the path with the given control points and radius, connected to the previous point by a straight line.
         * @param x1 The x axis of the coordinate for the first control point.
         * @param y1 The y axis of the coordinate for the first control point.
         * @param x2 The x axis of the coordinate for the second control point.
         * @param y2 The y axis of the coordinate for the second control point.
         * @param radius The arc's radius.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????????????????????????????????????????????
         * @param x1 ????????????????????? x ????????????
         * @param y1 ????????????????????? y ????????????
         * @param x2 ????????????????????? x ????????????
         * @param y2 ????????????????????? y ????????????
         * @param radius ??????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.arcTo = function (x1, y1, x2, y2, radius) {
            this.pushCommand(18 /* arcTo */, arguments);
            if (isNaN(this.moveToX)) {
                return;
            }
            this.checkMoveTo();
            getVector(this.moveToX, this.moveToY, x1, y1, vector1);
            getVector(x2, y2, x1, y1, vector3);
            //????????????
            vector.x = vector1.x + vector3.x;
            vector.y = vector1.y + vector3.y;
            //??????????????????1
            getVector(vector.x, vector.y, 0, 0, vector);
            //????????????
            var cross = vector1.x * vector.x + vector1.y * vector.y;
            var l1 = distance(vector1.x, vector1.y, 0, 0);
            var l2 = distance(vector.x, vector.y, 0, 0);
            var cos = cross / (l1 * l2);
            var a = Math.acos(cos);
            var l = radius / Math.sin(a);
            //??????
            var centerX = x1 + vector.x * l;
            var centerY = y1 + vector.y * l;
            var L10 = radius / Math.tan(a);
            var x10 = x1 + vector1.x * L10;
            var y10 = y1 + vector1.y * L10;
            var x12 = x1 + vector3.x * L10;
            var y12 = y1 + vector3.y * L10;
            getVector(centerX, centerY, x10, y10, vector);
            var startAngle = Math.atan2(vector.y, vector.x);
            getVector(centerX, centerY, x12, y12, vector);
            var endAngle = Math.atan2(vector.y, vector.x);
            var offset = endAngle - startAngle;
            offset = clampAngle(offset);
            if (offset > PI) {
                var temp = endAngle;
                endAngle = startAngle;
                startAngle = temp;
            }
            this.arcBounds(centerX, centerY, radius, startAngle, endAngle);
        };
        /**
         * @language en_US
         * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????? Graphics ?????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.clear = function () {
            this.reset();
            this.$commands.length = 0;
            this.$targetDisplay.$invalidateContentBounds();
        };
        /**
         * @private
         *
         */
        p.reset = function () {
            this._fillStyle = null;
            this._lineCap = "butt";
            this._lineJoin = "miter";
            this._lineWidth = 1;
            this._miterLimit = 10;
            this._strokeStyle = null;
            this.hasMoved = false;
            this.minX = 0;
            this.minY = 0;
            this.maxX = 0;
            this.maxY = 0;
            this.isFirst = true;
            this.moveToX = NaN;
            this.moveToY = NaN;
            this.hasStroke = false;
            this.hasFill = false;
        };
        /**
         * @private
         */
        p.pushCommand = function (graphicsType, args) {
            this.$commands.push({ type: graphicsType, arguments: args });
            this.$targetDisplay.$invalidateContentBounds();
        };
        /**
         * @private
         */
        p.checkMoveTo = function () {
            if (this.hasMoved) {
                this.hasMoved = false;
                this.extendByPoint(this.moveToX, this.moveToY);
            }
        };
        /**
         * @private
         */
        p.extendByPoint = function (x, y) {
            if (this.isFirst) {
                this.isFirst = false;
                this.maxX = this.minX = x;
                this.maxY = this.minY = y;
            }
            else {
                this.minX = Math.min(this.minX, x);
                this.minY = Math.min(this.minY, y);
                this.maxX = Math.max(this.maxX, x);
                this.maxY = Math.max(this.maxY, y);
            }
        };
        /**
         * @private
         */
        p.$measureContentBounds = function (bounds) {
            if (!this.hasFill && !this.hasStroke) {
                bounds.setEmpty();
                return;
            }
            if (this.hasStroke) {
                var lineWidth = this._lineWidth;
                var half = lineWidth * 0.5;
            }
            else {
                half = lineWidth = 0;
            }
            bounds.setTo(this.minX - half, this.minY - half, this.maxX - this.minX + lineWidth, this.maxY - this.minY + lineWidth);
        };
        /**
         * @private
         */
        p.$render = function (context, forHitTest) {
            context.save();
            context.fillStyle = "#000000";
            context.lineCap = "butt";
            context.lineJoin = "miter";
            context.lineWidth = 1;
            context.miterLimit = 10;
            context.strokeStyle = "#000000";
            context.beginPath(); //??????????????????????????????
            var map = context["graphicsMap"];
            if (!map) {
                map = mapGraphicsFunction(context);
            }
            var commands = this.$commands;
            var length = commands.length;
            if (forHitTest) {
                for (var i = 0; i < length; i++) {
                    var command = commands[i];
                    if (command.type == 5 /* fillStyle */ || command.type == 4 /* strokeStyle */) {
                        map[command.type].apply(context, ["rgba(1,1,1,1)"]);
                    }
                    else {
                        map[command.type].apply(context, command.arguments);
                    }
                }
            }
            else {
                for (var i = 0; i < length; i++) {
                    var command = commands[i];
                    map[command.type].apply(context, command.arguments);
                }
            }
            context.restore();
        };
        return GraphicsRenderContext;
    })(egret.HashObject);
    egret.GraphicsRenderContext = GraphicsRenderContext;
    egret.registerClass(GraphicsRenderContext,"egret.GraphicsRenderContext");
    /**
     * @private
     *
     * @param context
     * @returns
     */
    function mapGraphicsFunction(context) {
        var map = context["graphicsMap"] = {};
        map[6 /* arc */] = context.arc;
        map[18 /* arcTo */] = context.arcTo;
        map[17 /* beginPath */] = context.beginPath;
        map[14 /* bezierCurveTo */] = context.bezierCurveTo;
        map[10 /* closePath */] = context.closePath;
        map[9 /* fill */] = context.fill;
        map[13 /* fillRect */] = context.fillRect;
        map[8 /* lineTo */] = context.lineTo;
        map[12 /* moveTo */] = context.moveTo;
        map[7 /* quadraticCurveTo */] = context.quadraticCurveTo;
        map[11 /* rect */] = context.rect;
        map[15 /* stroke */] = context.stroke;
        map[16 /* strokeRect */] = context.strokeRect;
        map[19 /* scale */] = context.scale;
        map[3 /* lineWidth */] = function (value) {
            context.lineWidth = value;
        };
        map[0 /* miterLimit */] = function (value) {
            context.miterLimit = value;
        };
        map[5 /* fillStyle */] = function (value) {
            context.fillStyle = value;
        };
        map[1 /* lineCap */] = function (value) {
            context.lineCap = value;
        };
        map[2 /* lineJoin */] = function (value) {
            context.lineJoin = value;
        };
        map[4 /* strokeStyle */] = function (value) {
            context.strokeStyle = value;
        };
        return map;
    }
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    egret.$TextureScaleFactor = 1;
    /**
     * @language en_US
     * The Texture class encapsulates different image resources on different platforms.
     * In HTML5, resource is an HTMLElement object
     * In OpenGL / WebGL, resource is a texture ID obtained after the GPU is submitted
     * The Texture class encapsulates the details implemented on the underlayer. Developers just need to focus on interfaces
     * @see http://docs.egret-labs.org/post/manual/bitmap/textures.html The use of texture packs
     * @see http://docs.egret-labs.org/post/manual/loader/getres.html Several ways of access to resources
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/Texture.ts
     */
    /**
     * @language zh_CN
     * ?????????????????????????????????????????????????????????
     * ???HTML5?????????????????????HTMLElement??????
     * ???OpenGL / WebGL???????????????????????????GPU??????????????????id
     * Texture??????????????????????????????????????????????????????????????????????????????
     * @see http://docs.egret-labs.org/post/manual/bitmap/textures.html ??????????????????
     * @see http://docs.egret-labs.org/post/manual/loader/getres.html ???????????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/Texture.ts
     */
    var Texture = (function (_super) {
        __extends(Texture, _super);
        /**
         * @language en_US
         * Create an egret.Texture object
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????? egret.Texture ??????
         * @version Egret 2.4
         * @platform Web,Native
         */
        function Texture() {
            _super.call(this);
            /**
             * @private
             * ????????????????????? bitmapData ?????? x ????????????
             */
            this._bitmapX = 0;
            /**
             * @private
             * ????????????????????? bitmapData ?????? y ????????????
             */
            this._bitmapY = 0;
            /**
             * @private
             * ????????????????????? bitmapData ????????????
             */
            this._bitmapWidth = 0;
            /**
             * @private
             * ????????????????????? bitmapData ????????????
             */
            this._bitmapHeight = 0;
            /**
             * @private
             * ???????????????????????????????????? x ????????????????????????
             */
            this._offsetX = 0;
            /**
             * @private
             * ???????????????????????????????????? y ????????????????????????
             */
            this._offsetY = 0;
            /**
             * @private
             * ????????????
             */
            this._textureWidth = 0;
            /**
             * @private
             * ????????????
             */
            this._textureHeight = 0;
            /**
             * @private
             * ??????bitmapData.width
             */
            this._sourceWidth = 0;
            /**
             * @private
             * ??????bitmapData.height
             */
            this._sourceHeight = 0;
            /**
             * @private
             */
            this._bitmapData = null;
        }
        var d = __define,c=Texture;p=c.prototype;
        d(p, "textureWidth"
            /**
             * @language en_US
             * Texture width
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$getTextureWidth();
            }
        );
        p.$getTextureWidth = function () {
            return this._textureWidth;
        };
        d(p, "textureHeight"
            /**
             * @language en_US
             * Texture height
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$getTextureHeight();
            }
        );
        p.$getTextureHeight = function () {
            return this._textureHeight;
        };
        p.$getScaleBitmapWidth = function () {
            return this._bitmapWidth * egret.$TextureScaleFactor;
        };
        p.$getScaleBitmapHeight = function () {
            return this._bitmapHeight * egret.$TextureScaleFactor;
        };
        d(p, "bitmapData"
            /**
             * @language en_US
             * The BitmapData object being referenced.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????? BitmapData ?????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this._bitmapData;
            }
        );
        /**
         * @private
         *
         * @param value
         */
        p._setBitmapData = function (value) {
            this._bitmapData = value;
            var w = value.width * egret.$TextureScaleFactor;
            var h = value.height * egret.$TextureScaleFactor;
            this.$initData(0, 0, w, h, 0, 0, w, h, w, h);
        };
        /**
         * @private
         * ??????Texture??????
         * @param bitmapX
         * @param bitmapY
         * @param bitmapWidth
         * @param bitmapHeight
         * @param offsetX
         * @param offsetY
         * @param textureWidth
         * @param textureHeight
         * @param sourceWidth
         * @param sourceHeight
         */
        p.$initData = function (bitmapX, bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureWidth, textureHeight, sourceWidth, sourceHeight) {
            var scale = egret.$TextureScaleFactor;
            this._bitmapX = bitmapX / scale;
            this._bitmapY = bitmapY / scale;
            this._bitmapWidth = bitmapWidth / scale;
            this._bitmapHeight = bitmapHeight / scale;
            this._offsetX = offsetX;
            this._offsetY = offsetY;
            this._textureWidth = textureWidth;
            this._textureHeight = textureHeight;
            this._sourceWidth = sourceWidth;
            this._sourceHeight = sourceHeight;
        };
        /**
         * @language en_US
         * Obtain the color value of a pixel point
         * @param x {number} The x coordinate of a pixel point
         * @param y {number} The y coordinate of a pixel point
         * @returns {number} Color value of a specified pixel point
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????
         * @param x {number} ????????????X?????????
         * @param y {number} ????????????Y?????????
         * @returns {number} ???????????????????????????
         * @version Egret 2.4
         * @platform Web
         */
        p.getPixel32 = function (x, y) {
            throw new Error();
        };
        /**
         * @language en_US
         * Convert base64 string, if the picture (or pictures included) cross-border or null
         * @param type Type conversions, such as "image / png"
         * @param rect The need to convert the area
         * @param smoothing Whether to convert data to the smoothing process
         * @returns {any} base64 string
         * @version Egret 2.4
         */
        /**
         * @language zh_CN
         * ?????????base64?????????????????????????????????????????????????????????????????????null
         * @param type ?????????????????????  "image/png"
         * @param rect ?????????????????????
         * @returns {any} base64?????????
         * @version Egret 2.4
         */
        p.toDataURL = function (type, rect) {
            throw new Error();
        };
        /**
         * @language en_US
         * Crop designated area and save it as image.
         * native support only "image / png" and "image / jpeg"; Web browser because of the various implementations are not the same, it is recommended to use only these two kinds.
         * @param type Type conversions, such as "image / png"
         * @param filePath The path name of the image (the home directory for the game's private space, the path can not have "../",Web supports only pass names.)
         * @param rect The need to convert the area
         * @version Egret 2.4
         * @platform Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????
         * native????????? "image/png" ??? "image/jpeg"???Web?????????????????????????????????????????????????????????????????????2??????
         * @param type ?????????????????????  "image/png"
         * @param filePath ????????????????????????????????????????????????????????????????????????????????? "../"???Web????????????????????????
         * @param rect ?????????????????????
         * @version Egret 2.4
         * @platform Native
         */
        p.saveToFile = function (type, filePath, rect) {
            throw new Error();
        };
        /**
         * @language en_US
         * dispose texture
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.dispose = function () {
            if (this._bitmapData) {
                Texture.$dispose(this._bitmapData.hashCode);
                console.log("dispose Texture");
                this._bitmapData = null;
            }
        };
        Texture.$addDisplayObject = function (displayObject, bitmapDataHashCode) {
            var hashCode = bitmapDataHashCode;
            if (!Texture._displayList[hashCode]) {
                Texture._displayList[hashCode] = [displayObject];
                return;
            }
            var tempList = Texture._displayList[hashCode];
            if (tempList.indexOf(displayObject) < 0) {
                tempList.push(displayObject);
            }
        };
        Texture.$removeDisplayObject = function (displayObject, bitmapDataHashCode) {
            var hashCode = bitmapDataHashCode;
            if (!Texture._displayList[hashCode]) {
                return;
            }
            var tempList = Texture._displayList[hashCode];
            var index = tempList.indexOf(displayObject);
            if (index >= 0) {
                tempList.splice(index);
            }
        };
        Texture.$invalidate = function (bitmapDataHashCode) {
            var hashCode = bitmapDataHashCode;
            if (!Texture._displayList[hashCode]) {
                return;
            }
            var tempList = Texture._displayList[hashCode];
            for (var i = 0; i < tempList.length; i++) {
                tempList[i].$invalidateContentBounds();
            }
        };
        Texture.$dispose = function (bitmapDataHashCode) {
            var hashCode = bitmapDataHashCode;
            if (!Texture._displayList[hashCode]) {
                return;
            }
            var tempList = Texture._displayList[hashCode];
            for (var i = 0; i < tempList.length; i++) {
                if (tempList[i] instanceof egret.Bitmap) {
                    tempList[i].$Bitmap[1 /* image */] = null;
                }
                tempList[i].$invalidateContentBounds();
            }
        };
        Texture._displayList = {};
        return Texture;
    })(egret.HashObject);
    egret.Texture = Texture;
    egret.registerClass(Texture,"egret.Texture");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    var blendModes = ["source-over", "lighter", "destination-out"];
    var defaultCompositeOp = "source-over";
    /**
     * @language en_US
     * RenderTexture is a dynamic texture
     * @extends egret.Texture
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/RenderTexture.ts
     */
    /**
     * @language zh_CN
     * RenderTexture ????????????????????????????????????????????????????????????????????????????????????????????????
     * @extends egret.Texture
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/RenderTexture.ts
     */
    var RenderTexture = (function (_super) {
        __extends(RenderTexture, _super);
        function RenderTexture() {
            _super.call(this);
        }
        var d = __define,c=RenderTexture;p=c.prototype;
        /**
         * @language en_US
         * The specified display object is drawn as a texture
         * @param displayObject {egret.DisplayObject} the display to draw
         * @param clipBounds {egret.Rectangle} clip rect
         * @param scale {number} scale factor
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????
         * @param displayObject {egret.DisplayObject} ???????????????????????????
         * @param clipBounds {egret.Rectangle} ??????????????????
         * @param scale {number} ????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.drawToTexture = function (displayObject, clipBounds, scale) {
            if (scale === void 0) { scale = 1; }
            scale /= egret.$TextureScaleFactor;
            var originParent = displayObject.$parent;
            var c1 = new egret.DisplayObjectContainer();
            c1.addChild(displayObject);
            c1.scaleX = c1.scaleY = scale;
            if (clipBounds) {
                var scrollRect = new egret.Rectangle();
                scrollRect.setTo(clipBounds.x, clipBounds.y, clipBounds.width, clipBounds.height);
                c1.scrollRect = scrollRect;
            }
            var root = new egret.DisplayObjectContainer();
            var displayList = egret.sys.DisplayList.create(root);
            root.$displayList = displayList;
            root.addChild(c1);
            this.$update(displayObject);
            egret.sys.DisplayList.release(displayList);
            root.$displayList = null;
            var bounds = displayObject.getBounds();
            this.context = this.createRenderContext(bounds.width * scale, bounds.height * scale);
            this.context.clearRect(0, 0, bounds.width * scale, bounds.height * scale);
            this._offsetX = bounds.x * scale;
            this._offsetY = bounds.y * scale;
            if (!this.context) {
                return false;
            }
            var drawCalls = this.drawDisplayObject(root, this.context);
            if (drawCalls == 0) {
                return false;
            }
            this._setBitmapData(this.context.surface);
            this._offsetX = bounds.x * scale;
            this._offsetY = bounds.y * scale;
            if (originParent) {
                originParent.addChild(displayObject);
            }
            return true;
        };
        p.$update = function (displayObject) {
            if (displayObject.$renderRegion) {
                displayObject.$renderRegion.moved = true;
                displayObject.$update();
            }
            else if (displayObject instanceof egret.DisplayObjectContainer) {
                var children = displayObject.$children;
                var length = children.length;
                for (var i = 0; i < length; i++) {
                    var child = children[i];
                    this.$update(child);
                }
            }
        };
        p.drawDisplayObject = function (displayObject, context) {
            var drawCalls = 0;
            var node;
            var globalAlpha;
            if (displayObject.$renderRegion) {
                node = displayObject;
                globalAlpha = displayObject.$renderAlpha;
            }
            if (node) {
                drawCalls++;
                context.globalAlpha = globalAlpha;
                var m = node.$renderMatrix;
                context.setTransform(m.a, m.b, m.c, m.d, m.tx - this._offsetX, m.ty - this._offsetY);
                node.$render(context);
            }
            var children = displayObject.$children;
            if (children) {
                var length = children.length;
                for (var i = 0; i < length; i++) {
                    var child = children[i];
                    if (!child.$visible || child.$alpha <= 0 || child.$maskedObject) {
                        continue;
                    }
                    if (child.$blendMode !== 0 || child.$mask) {
                        drawCalls += this.drawWithClip(child, context);
                    }
                    else if (child.$scrollRect) {
                        drawCalls += this.drawWithScrollRect(child, context);
                    }
                    else {
                        drawCalls += this.drawDisplayObject(child, context);
                    }
                }
            }
            return drawCalls;
        };
        p.drawWithClip = function (displayObject, context) {
            var drawCalls = 0;
            var hasBlendMode = (displayObject.$blendMode !== 0);
            if (hasBlendMode) {
                var compositeOp = blendModes[displayObject.$blendMode];
                if (!compositeOp) {
                    compositeOp = defaultCompositeOp;
                }
            }
            var scrollRect = displayObject.$scrollRect;
            var mask = displayObject.$mask;
            //??????scrollRect???mask???clip????????????????????????????????????????????????????????????????????????????????????
            var maskRegion;
            var displayMatrix = displayObject.$getConcatenatedMatrix();
            if (mask) {
                var bounds = mask.$getOriginalBounds();
                maskRegion = egret.sys.Region.create();
                maskRegion.updateRegion(bounds, mask.$getConcatenatedMatrix());
            }
            var region;
            if (scrollRect) {
                region = egret.sys.Region.create();
                region.updateRegion(scrollRect, displayMatrix);
            }
            if (region && maskRegion) {
                region.intersect(maskRegion);
                egret.sys.Region.release(maskRegion);
            }
            else if (!region && maskRegion) {
                region = maskRegion;
            }
            if (region) {
                if (region.isEmpty()) {
                    egret.sys.Region.release(region);
                    return drawCalls;
                }
            }
            else {
                region = egret.sys.Region.create();
                bounds = displayObject.$getOriginalBounds();
                region.updateRegion(bounds, displayObject.$getConcatenatedMatrix());
            }
            //?????????????????????????????????scrollRect?????????clip
            var displayContext = this.createRenderContext(region.width, region.height);
            if (!displayContext) {
                drawCalls += this.drawDisplayObject(displayObject, context);
                egret.sys.Region.release(region);
                return drawCalls;
            }
            if (scrollRect) {
                var m = displayMatrix;
                displayContext.setTransform(m.a, m.b, m.c, m.d, m.tx - region.minX, m.ty - region.minY);
                displayContext.beginPath();
                displayContext.rect(scrollRect.x, scrollRect.y, scrollRect.width, scrollRect.height);
                displayContext.clip();
            }
            displayContext.setTransform(1, 0, 0, 1, -region.minX, -region.minY);
            var rootM = egret.Matrix.create().setTo(1, 0, 0, 1, -region.minX, -region.minY);
            drawCalls += this.drawDisplayObject(displayObject, displayContext);
            egret.Matrix.release(rootM);
            //????????????
            if (mask) {
                var maskContext = this.createRenderContext(region.width, region.height);
                if (!maskContext) {
                    drawCalls += this.drawDisplayObject(displayObject, context);
                    egret.sys.surfaceFactory.release(displayContext.surface);
                    egret.sys.Region.release(region);
                    return drawCalls;
                }
                maskContext.setTransform(1, 0, 0, 1, -region.minX, -region.minY);
                rootM = egret.Matrix.create().setTo(1, 0, 0, 1, -region.minX, -region.minY);
                var calls = this.drawDisplayObject(mask, maskContext);
                egret.Matrix.release(rootM);
                if (calls > 0) {
                    drawCalls += calls;
                    displayContext.globalCompositeOperation = "destination-in";
                    displayContext.setTransform(1, 0, 0, 1, 0, 0);
                    displayContext.globalAlpha = 1;
                    displayContext.drawImage(maskContext.surface, 0, 0);
                }
                egret.sys.surfaceFactory.release(maskContext.surface);
            }
            //?????????????????????
            if (drawCalls > 0) {
                drawCalls++;
                if (hasBlendMode) {
                    context.globalCompositeOperation = compositeOp;
                }
                context.setTransform(1, 0, 0, 1, region.minX, region.minY);
                context.drawImage(displayContext.surface, 0, 0);
                if (hasBlendMode) {
                    context.globalCompositeOperation = defaultCompositeOp;
                }
            }
            egret.sys.surfaceFactory.release(displayContext.surface);
            egret.sys.Region.release(region);
            return drawCalls;
        };
        p.drawWithScrollRect = function (displayObject, context) {
            var drawCalls = 0;
            var scrollRect = displayObject.$scrollRect;
            var m = displayObject.$getConcatenatedMatrix();
            var region = egret.sys.Region.create();
            if (!scrollRect.isEmpty()) {
                region.updateRegion(scrollRect, m);
            }
            if (region.isEmpty()) {
                egret.sys.Region.release(region);
                return drawCalls;
            }
            //????????????????????????
            context.save();
            context.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
            context.beginPath();
            context.rect(scrollRect.x, scrollRect.y, scrollRect.width, scrollRect.height);
            context.clip();
            drawCalls += this.drawDisplayObject(displayObject, context);
            context.restore();
            egret.sys.Region.release(region);
            return drawCalls;
        };
        p.createRenderContext = function (width, height) {
            var surface = egret.sys.surfaceFactory.create(true);
            if (!surface) {
                return null;
            }
            surface.width = Math.max(257, width);
            surface.height = Math.max(257, height);
            return surface.renderContext;
        };
        return RenderTexture;
    })(egret.Texture);
    egret.RenderTexture = RenderTexture;
    egret.registerClass(RenderTexture,"egret.RenderTexture");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * This class is used to create lightweight shapes using the drawing application program interface (API). The Shape
     * class includes a graphics property, which lets you access methods from the Graphics class.
     * @see egret.Graphics
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/Shape.ts
     */
    /**
     * @language zh_CN
     * ???????????????????????????????????????????????? (API) ?????????????????????Shape ????????? graphics ??????????????????????????????????????????????????????????????????
     * @see egret.Graphics
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/Shape.ts
     */
    var Shape = (function (_super) {
        __extends(Shape, _super);
        /**
         * @language en_US
         * Creates a new Shape object.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????? Shape ??????
         * @version Egret 2.4
         * @platform Web,Native
         */
        function Shape() {
            _super.call(this);
            this.$graphics = new egret.Graphics();
            this.$graphics.$renderContext.$targetDisplay = this;
            this.$renderRegion = new egret.sys.Region();
        }
        var d = __define,c=Shape;p=c.prototype;
        d(p, "graphics"
            /**
             * @language en_US
             * Specifies the Graphics object belonging to this Shape object, where vector drawing commands can occur.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????? Shape ?????? Graphics ??????????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$graphics;
            }
        );
        /**
         * @private
         */
        p.$measureContentBounds = function (bounds) {
            this.$graphics.$measureContentBounds(bounds);
        };
        p.$hitTest = function (stageX, stageY) {
            var target = _super.prototype.$hitTest.call(this, stageX, stageY);
            if (target == this) {
                target = this.$graphics.$hitTest(stageX, stageY);
            }
            return target;
        };
        /**
         * @private
         */
        p.$render = function (context) {
            this.$graphics.$render(context);
        };
        return Shape;
    })(egret.DisplayObject);
    egret.Shape = Shape;
    egret.registerClass(Shape,"egret.Shape");
    if (DEBUG) {
        egret.$markReadOnly(Shape, "graphics");
    }
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * The Sprite class is a basic display list building block: a display list node that can contain children.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/Sprite.ts
     */
    /**
     * @language zh_CN
     * Sprite ?????????????????????????????????????????????????????????????????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/Sprite.ts
     */
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        /**
         * @language en_US
         * Creates a new Sprite instance.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        function Sprite() {
            _super.call(this);
            this.$graphics = new egret.Graphics();
            this.$graphics.$renderContext.$targetDisplay = this;
            this.$renderRegion = new egret.sys.Region();
        }
        var d = __define,c=Sprite;p=c.prototype;
        d(p, "graphics"
            /**
             * @language en_US
             * Specifies the Graphics object belonging to this Shape object, where vector drawing commands can occur.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????? Shape ?????? Graphics ??????????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$graphics;
            }
        );
        p.$hitTest = function (stageX, stageY) {
            if (!this.$visible) {
                return null;
            }
            var m = this.$getInvertedConcatenatedMatrix();
            var localX = m.a * stageX + m.c * stageY + m.tx;
            var localY = m.b * stageX + m.d * stageY + m.ty;
            var rect = this.$scrollRect ? this.$scrollRect : this.$maskRect;
            if (rect && !rect.contains(localX, localY)) {
                return null;
            }
            if (this.$mask && !this.$mask.$hitTest(stageX, stageY)) {
                return null;
            }
            var children = this.$children;
            var found = false;
            for (var i = children.length - 1; i >= 0; i--) {
                var child = children[i];
                if (child.$maskedObject) {
                    continue;
                }
                var target = child.$hitTest(stageX, stageY);
                if (target) {
                    found = true;
                    if (target.$touchEnabled) {
                        break;
                    }
                    else {
                        target = null;
                    }
                }
            }
            if (target) {
                if (this.$touchChildren) {
                    return target;
                }
                return this;
            }
            if (found) {
                return this;
            }
            target = egret.DisplayObject.prototype.$hitTest.call(this, stageX, stageY);
            if (target) {
                target = this.$graphics.$hitTest(stageX, stageY);
            }
            return target;
        };
        /**
         * @private
         */
        p.$measureContentBounds = function (bounds) {
            this.$graphics.$measureContentBounds(bounds);
        };
        /**
         * @private
         */
        p.$render = function (context) {
            this.$graphics.$render(context);
        };
        return Sprite;
    })(egret.DisplayObjectContainer);
    egret.Sprite = Sprite;
    egret.registerClass(Sprite,"egret.Sprite",["egret.IDisplayObjectContainer"]);
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * SpriteSheet is a mosaic of multiple sub-bitmaps, comprising a plurality of Texture objects.
     * Each Texture object shares the set bitmap of SpriteSheet, but it points to its different areas.
     * On WebGL / OpenGL, this operation can significantly improve performance.
     * At the same time, SpriteSheet can carry out material integration easily to reduce the number of HTTP requests
     * For specification of the SpriteSheet format, see the document https://github.com/egret-labs/egret-core/wiki/Egret-SpriteSheet-Specification
     * @see http://docs.egret-labs.org/post/manual/bitmap/textures.html The use of texture packs
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/SpriteSheet.ts
     */
    /**
     * @language zh_CN
     * SpriteSheet ???????????????????????????????????????????????????????????????????????? Texture ?????????
     * ????????? Texture ????????? SpriteSheet ??????????????????????????????????????????????????????
     * ???WebGL / OpenGL??????????????????????????????????????????
     * ?????????SpriteSheet?????????????????????????????????????????????HTTP????????????
     * SpriteSheet ??????????????????????????????????????????  https://github.com/egret-labs/egret-core/wiki/Egret-SpriteSheet-Specification
     * @see http://docs.egret-labs.org/post/manual/bitmap/textures.html ??????????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/SpriteSheet.ts
     */
    var SpriteSheet = (function (_super) {
        __extends(SpriteSheet, _super);
        /**
         * @language en_US
         * Create an egret.SpriteSheet object
         * @param texture {Texture} Texture
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????? egret.SpriteSheet ??????
         * @param texture {Texture} ??????
         * @version Egret 2.4
         * @platform Web,Native
         */
        function SpriteSheet(texture) {
            _super.call(this);
            /**
             * @private
             * ????????????SpriteSheet??????????????????bitmapData??????????????????x???
             */
            this._bitmapX = 0;
            /**
             * @private
             * ????????????SpriteSheet??????????????????bitmapData??????????????????y???
             */
            this._bitmapY = 0;
            /**
             * @private
             * ??????????????????
             */
            this._textureMap = {};
            this.texture = texture;
            this._bitmapX = texture._bitmapX - texture._offsetX;
            this._bitmapY = texture._bitmapY - texture._offsetY;
        }
        var d = __define,c=SpriteSheet;p=c.prototype;
        /**
         * @language en_US
         * Obtain a cached Texture object according to the specified texture name
         * @param name {string} Cache the name of this Texture object
         * @returns {egret.Texture} The Texture object
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????? Texture ??????
         * @param name {string} ???????????? Texture ????????????????????????
         * @returns {egret.Texture} Texture ??????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.getTexture = function (name) {
            return this._textureMap[name];
        };
        /**
         * @language en_US
         * Create a new Texture object for the specified area on SpriteSheet and cache it
         * @param name {string} Cache the name of this Texture object. If the name already exists, the previous Texture object will be overwrited.
         * @param bitmapX {number} Starting coordinate x of texture area on bitmapData
         * @param bitmapY {number} Starting coordinate y of texture area on bitmapData
         * @param bitmapWidth {number} Width of texture area on bitmapData
         * @param bitmapHeight {number} Height of texture area on bitmapData
         * @param offsetX {number} Starting point x for a non-transparent area of the original bitmap
         * @param offsetY {number} Starting point y for a non-transparent area of the original bitmap
         * @param textureWidth {number} Width of the original bitmap. If it is not passed, use the bitmapWidth  value.
         * @param textureHeight {number} Height of the original bitmap. If it is not passed, use the bitmapHeight value.
         * @returns {egret.Texture} The created Texture object
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??? SpriteSheet ???????????????????????????????????? Texture ??????????????????
         * @param name {string} ???????????? Texture ???????????????????????????????????????????????????????????????????????? Texture ??????
         * @param bitmapX {number} ??????????????? bitmapData ??????????????????x
         * @param bitmapY {number} ??????????????? bitmapData ??????????????????y
         * @param bitmapWidth {number} ??????????????? bitmapData ????????????
         * @param bitmapHeight {number} ??????????????? bitmapData ????????????
         * @param offsetX {number} ?????????????????????????????? x ?????????
         * @param offsetY {number} ?????????????????????????????? y ?????????
         * @param textureWidth {number} ???????????????????????????????????????????????? bitmapWidth ?????????
         * @param textureHeight {number} ???????????????????????????????????????????????? bitmapHeight ?????????
         * @returns {egret.Texture} ????????? Texture ??????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.createTexture = function (name, bitmapX, bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureWidth, textureHeight) {
            if (offsetX === void 0) { offsetX = 0; }
            if (offsetY === void 0) { offsetY = 0; }
            if (egret.sys.isUndefined(textureWidth)) {
                textureWidth = offsetX + bitmapWidth;
            }
            if (egret.sys.isUndefined(textureHeight)) {
                textureHeight = offsetY + bitmapHeight;
            }
            var texture = new egret.Texture();
            texture._bitmapData = this.texture._bitmapData;
            texture.$initData(this._bitmapX + bitmapX, this._bitmapY + bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureWidth, textureHeight, this.texture._sourceWidth, this.texture._sourceHeight);
            this._textureMap[name] = texture;
            return texture;
        };
        /**
         * @language en_US
         * dispose texture
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.dispose = function () {
            if (this.texture) {
                this.texture.dispose();
            }
        };
        return SpriteSheet;
    })(egret.HashObject);
    egret.SpriteSheet = SpriteSheet;
    egret.registerClass(SpriteSheet,"egret.SpriteSheet");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * The Stage class represents the main drawing area.The Stage object is not globally accessible. You need to access
     * it through the stage property of a DisplayObject instance.<br/>
     * The Stage class has several ancestor classes ??? Sprite, DisplayObject, and EventDispatcher ??? from which it inherits
     * properties and methods. Many of these properties and methods are inapplicable to Stage objects.
     * @event egret.Event.RESIZE Dispatched when the stageWidth or stageHeight property of the Stage object is changed.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/Stage.ts
     */
    /**
     * @language zh_CN
     * Stage ????????????????????????
     * ???????????? DisplayObject ????????? stage ?????????????????????<br/>
     * Stage ????????????????????????: Sprite???DisplayObject ??? EventDispatcher??????????????????????????????????????????????????????
     * ??????????????????????????????????????????????????? Stage ?????????
     * @event egret.Event.RESIZE ???stageWidth???stageHeight???????????????????????????
     * @event egret.Event.DEACTIVATE ???stage?????????????????????
     * @event egret.Event.ACTIVATE ???stage?????????????????????
     *
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/Stage.ts
     */
    var Stage = (function (_super) {
        __extends(Stage, _super);
        /**
         * @private
         * Stage???????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        function Stage() {
            _super.call(this);
            /**
             * @private
             */
            this.$stageWidth = 0;
            /**
             * @private
             */
            this.$stageHeight = 0;
            /**
             * @private
             */
            this.implMap = {};
            this.$scaleMode = egret.StageScaleMode.SHOW_ALL;
            this.$orientation = egret.OrientationMode.AUTO;
            this.$maxTouches = 99;
            this.$stage = this;
            this.$nestLevel = 1;
        }
        var d = __define,c=Stage;p=c.prototype;
        d(p, "frameRate"
            /**
             * @language en_US
             * Gets and sets the frame rate of the stage. The frame rate is defined as frames per second. Valid range for the
             * frame rate is from 0.01 to 1000 frames per second.<br/>
             * Note: setting the frameRate property of one Stage object changes the frame rate for all Stage objects
             * @default 30
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????????????????????????????????????????????????????????????????????????????? 0.01 ??? 60 ?????????<br/>
             * ??????: ??????????????????Stage???frameRate??????????????????????????????Stage????????????
             * @default 30
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return egret.sys.$ticker.$frameRate;
            }
            ,function (value) {
                egret.sys.$ticker.$setFrameRate(value);
            }
        );
        d(p, "stageWidth"
            /**
             * @language en_US
             * Indicates the width of the stage, in pixels.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$stageWidth;
            }
        );
        d(p, "stageHeight"
            /**
             * @language en_US
             * Indicates the height of the stage, in pixels.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$stageHeight;
            }
        );
        /**
         * @language en_US
         * After you call the invalidate() method, when the display list is next rendered, the Egret runtime sends a render
         * event to each display object that has registered to listen for the render event. You must call the invalidate()
         * method each time you want the Egret runtime to send render events.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????? invalidate() ?????????????????????????????????????????????Egret ??????????????????????????? Event.RENDER ????????????????????????????????? Event.RENDER ?????????
         * ??????????????? Egret ?????? Event.RENDER ??????????????????????????? invalidate() ?????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.invalidate = function () {
            egret.sys.$invalidateRenderFlag = true;
        };
        /**
         * @language en_US
         * Adds an interface-name-to-implementation-class mapping to the registry.
         * @param interfaceName the interface name to register. For example???"eui.IAssetAdapter","eui.Theme"
         * @param instance the instance to register.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????
         * @param interfaceName ?????????????????????????????????"eui.IAssetAdapter","eui.Theme"
         * @param instance ???????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.registerImplementation = function (interfaceName, instance) {
            this.implMap[interfaceName] = instance;
        };
        /**
         * @language en_US
         * Returns the singleton instance of the implementation class that was registered for the specified interface.
         * This method is usually called by egret framework.
         * @param interfaceName The interface name to identify. For example???"eui.IAssetAdapter","eui.Theme"
         * @returns the singleton instance of the implementation class
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * @param interfaceName ????????????????????????????????????"eui.IAssetAdapter","eui.Theme"
         * @returns ?????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.getImplementation = function (interfaceName) {
            return this.implMap[interfaceName];
        };
        d(p, "scaleMode"
            /**
             * @language en_US
             * A StageScaleMode class that specifies which scale mode to use. The following are valid values:<br/>
             * <ul>
             * <li>StageScaleMode.EXACT_FIT -- The entire application be visible in the specified area without trying to preserve the original aspect ratio. Distortion can occur, the application may be stretched or compressed.</li>
             * <li>StageScaleMode.SHOW_ALL -- The entire application is visible in the specified area without distortion while maintaining the application of the original aspect ratio. Applications may display border.</li>
             * <li>StageScaleMode.NO_SCALE -- The size of the entire application is fixed, so that even if the size of the player window changes, it remains unchanged. If the player window is smaller than the content, it may do some trimming.</li>
             * <li>StageScaleMode.NO_BORDER -- Keep the original aspect ratio scaling application content, after scaling a narrow direction of application content to fill the viewport players on both sides in the other direction may exceed the viewport and the player is cut.</li>
             * <li>StageScaleMode.FIXED_WIDTH -- Keep the original aspect ratio scaling application content, after scaling application content in the horizontal and vertical directions to fill the viewport player, but only to keep the contents of the original application constant width, height may change.</li>
             * <li>StageScaleMode.FIXED_HEIGHT -- Keep the original aspect ratio scaling application content, after scaling application content in the horizontal and vertical directions to fill the viewport player, but only to keep the contents of the original application constant height, width may change.</li>
             * </ul>
             * @default egret.StageScaleMode.SHOW_ALL
             */
            /**
             * @language zh_CN
             * ?????? StageScaleMode ?????????????????????????????????????????????????????????????????????<br/>
             * <ul>
             * <li>StageScaleMode.EXACT_FIT -- ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</li>
             * <li>StageScaleMode.SHOW_ALL -- ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</li>
             * <li>StageScaleMode.NO_SCALE -- ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</li>
             * <li>StageScaleMode.NO_BORDER -- ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</li>
             * <li>StageScaleMode.FIXED_WIDTH -- ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</li>
             * <li>StageScaleMode.FIXED_HEIGHT -- ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</li>
             * </ul>
             * @default egret.StageScaleMode.SHOW_ALL
             */
            ,function () {
                return this.$scaleMode;
            }
            ,function (value) {
                if (this.$scaleMode == value) {
                    return;
                }
                this.$scaleMode = value;
                this.$screen.updateScreenSize();
            }
        );
        d(p, "orientation"
            /**
             * @language en_US
             * Horizontal and vertical screen display screen, can only be set under the current Native in the configuration file. A egret.OrientationMode class that specifies which display mode to use. The following are valid values:<br/>
             * <ul>
             * <li>egret.OrientationMode.AUTO -- Always follow the direction of application display screen, always guaranteed by the look down.</li>
             * <li>egret.OrientationMode.PORTRAIT -- Applications remain portrait mode, namely horizontal screen look, the screen from left to right.</li>
             * <li>egret.OrientationMode.LANDSCAPE -- Applications remain horizontal screen mode, namely vertical screen, the screen from right to left.</li>
             * <li>egret.OrientationMode.LANDSCAPE_FLIPPED -- Applications remain horizontal screen mode, namely vertical screen, the screen from left to right.</li>
             * </ul>
             * @platform Web
             * @version 2.4
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????? Native ?????????????????????????????????????????? egret.OrientationMode ???????????????????????????????????????????????????????????????<br/>
             * <ul>
             * <li>egret.OrientationMode.AUTO -- ????????????????????????????????????????????????????????????????????????</li>
             * <li>egret.OrientationMode.PORTRAIT -- ???????????????????????????????????????????????????????????????????????????</li>
             * <li>egret.OrientationMode.LANDSCAPE -- ??????????????????????????????????????????????????????????????????????????????</li>
             * <li>egret.OrientationMode.LANDSCAPE_FLIPPED -- ??????????????????????????????????????????????????????????????????????????????</li>
             * </ul>
             * @platform Web
             * @version 2.4
             */
            ,function () {
                return this.$orientation;
            }
            ,function (value) {
                if (this.$orientation == value) {
                    return;
                }
                this.$orientation = value;
                this.$screen.updateScreenSize();
            }
        );
        d(p, "textureScaleFactor"
            /**
             * @language en_US
             * Draw texture zoom ratio
             * @default 1
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????1
             * @default 1
             */
            ,function () {
                return egret.$TextureScaleFactor;
            }
            ,function (value) {
                egret.$TextureScaleFactor = value;
            }
        );
        d(p, "maxTouches"
            /**
             * @language en_US
             * Set the number of screens can simultaneously touch. Above this amount will not be triggered in response.
             * @default 99
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????????????????????????????????????????????????????????
             * @default 99
             */
            ,function () {
                return this.$maxTouches;
            }
            ,function (value) {
                if (this.$maxTouches == value) {
                    return;
                }
                this.$maxTouches = value;
                this.$screen.updateMaxTouches();
            }
        );
        return Stage;
    })(egret.DisplayObjectContainer);
    egret.Stage = Stage;
    egret.registerClass(Stage,"egret.Stage");
    if (DEBUG) {
        egret.$markCannotUse(Stage, "alpha", 1);
        egret.$markCannotUse(Stage, "visible", true);
        egret.$markCannotUse(Stage, "x", 0);
        egret.$markCannotUse(Stage, "y", 0);
        egret.$markCannotUse(Stage, "scaleX", 1);
        egret.$markCannotUse(Stage, "scaleY", 1);
        egret.$markCannotUse(Stage, "rotation", 0);
        egret.$markCannotUse(Stage, "cacheAsBitmap", false);
        egret.$markCannotUse(Stage, "scrollRect", null);
        egret.$markCannotUse(Stage, "filters", null);
        egret.$markCannotUse(Stage, "blendMode", null);
        egret.$markCannotUse(Stage, "touchEnabled", true);
        egret.$markCannotUse(Stage, "matrix", null);
    }
    if (DEBUG) {
        egret.$markReadOnly(Stage, "stageWidth");
        egret.$markReadOnly(Stage, "stageHeight");
    }
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * The Event class is used as the base class for the creation of Event objects, which are passed as parameters to event
     * listeners when an event occurs.The properties of the Event class carry basic information about an event, such as
     * the event's type or whether the event's default behavior can be canceled. For many events, such as the events represented
     * by the Event class constants, this basic information is sufficient. Other events, however, may require more detailed
     * information. Events associated with a touch tap, for example, need to include additional information about the
     * location of the touch event. You can pass such additional information to event listeners by extending the Event class,
     * which is what the TouchEvent class does. Egret API defines several Event subclasses for common events that require
     * additional information. Events associated with each of the Event subclasses are described in the documentation for
     * each class.The methods of the Event class can be used in event listener functions to affect the behavior of the event
     * object. Some events have an associated default behavior. Your event listener can cancel this behavior by calling the
     * preventDefault() method. You can also make the current event listener the last one to process an event by calling
     * the stopPropagation() or stopImmediatePropagation() method.
     * @see egret.EventDispatcher
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/events/Event.ts
     */
    /**
     * @language zh_CN
     * Event ????????????????????????????????????????????????????????????Event ????????????????????????????????????????????????Event ????????????????????????????????????????????????????????????
     * ???????????????????????????????????????????????????????????????????????????????????? Event ????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * ?????????????????????????????????????????????????????????????????????????????????????????????????????? Event ??????TouchEvent ?????????????????????????????????????????????????????????????????????
     * Egret API ???????????????????????????????????????????????? Event ?????????????????? Event ???????????????????????????????????????????????????????????????Event ?????????????????????
     * ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????? preventDefault() ??????????????????????????????????????????????????????
     * ?????????????????? stopPropagation() ??? stopImmediatePropagation() ????????????????????????????????????????????????????????????????????????????????????
     * @see egret.EventDispatcher
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/events/Event.ts
     */
    var Event = (function (_super) {
        __extends(Event, _super);
        /**
         * @language en_US
         * Creates an Event object to pass as a parameter to event listeners.
         * @param type  The type of the event, accessible as Event.type.
         * @param bubbles  Determines whether the Event object participates in the bubbling stage of the event flow. The default value is false.
         * @param cancelable Determines whether the Event object can be canceled. The default values is false.
         * @param data the optional data associated with this event
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????? Event ?????????
         * @param type  ?????????????????????????????? Event.type ?????????
         * @param bubbles  ?????? Event ????????????????????????????????????????????????????????? false???
         * @param cancelable ???????????????????????? Event ????????????????????? false???
         * @param data ??????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        function Event(type, bubbles, cancelable, data) {
            _super.call(this);
            /**
             * @private
             */
            this.$eventPhase = 2;
            /**
             * @private
             */
            this.$currentTarget = null;
            /**
             * @private
             */
            this.$target = null;
            /**
             * @private
             */
            this.$isDefaultPrevented = false;
            /**
             * @private
             */
            this.$isPropagationStopped = false;
            /**
             * @private
             */
            this.$isPropagationImmediateStopped = false;
            this.$type = type;
            this.$bubbles = !!bubbles;
            this.$cancelable = !!cancelable;
            this.data = data;
        }
        var d = __define,c=Event;p=c.prototype;
        d(p, "type"
            /**
             * @language en_US
             * The type of event. The type is case-sensitive.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$type;
            }
        );
        d(p, "bubbles"
            /**
             * @language en_US
             * Indicates whether an event is a bubbling event.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????????????????????????? true???????????? false???
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$bubbles;
            }
        );
        d(p, "cancelable"
            /**
             * @language en_US
             * Indicates whether the behavior associated with the event can be prevented. If the behavior can be
             * canceled, this value is true; otherwise it is false.
             * @see #preventDefault()
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????????????????????????????????????????????????????????????????? true???????????? false???
             * @see #preventDefault()
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$cancelable;
            }
        );
        d(p, "eventPhase"
            /**
             * @language en_US
             * The current phase in the event flow. This property can contain the following numeric values:
             * The capture phase (EventPhase.CAPTURING_PHASE).
             * The target phase (EventPhase.AT_TARGET)
             * The bubbling phase (EventPhase.BUBBLING_PHASE).
             * @see egret.EventPhase
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????????????????
             * ???????????? (EventPhase.CAPTURING_PHASE)???
             * ???????????? (EventPhase.AT_TARGET)???
             * ???????????? (EventPhase.BUBBLING_PHASE)???
             * @see egret.EventPhase
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$eventPhase;
            }
        );
        d(p, "currentTarget"
            /**
             * @language en_US
             * The object that is actively processing the Event object with an event listener. For example, if a
             * user clicks an OK button, the current target could be the node containing that button or one of its ancestors
             * that has registered an event listener for that event.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????????????? Event ??????????????????????????????????????????????????????????????????
             * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$currentTarget;
            }
        );
        d(p, "target"
            /**
             * @language en_US
             * The event target. This property contains the target node. For example, if a user clicks an OK button,
             * the target node is the display list node containing that button.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$target;
            }
        );
        p.$setTarget = function (target) {
            this.$target = target;
            return true;
        };
        /**
         * @language en_US
         * Checks whether the preventDefault() method has been called on the event. If the preventDefault() method has been
         * called, returns true; otherwise, returns false.
         * @returns If preventDefault() has been called, returns true; otherwise, returns false.
         * @see #preventDefault()
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????? preventDefault() ?????????
         * @returns ??????????????? preventDefault() ?????????????????? true??????????????? false???
         * @see #preventDefault()
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.isDefaultPrevented = function () {
            return this.$isDefaultPrevented;
        };
        /**
         * @language en_US
         * Cancels an event's default behavior if that behavior can be canceled.Many events have associated behaviors that
         * are carried out by default. For example, if a user types a character into a text input, the default behavior
         * is that the character is displayed in the text input. Because the TextEvent.TEXT_INPUT event's default behavior
         * can be canceled, you can use the preventDefault() method to prevent the character from appearing.
         * You can use the Event.cancelable property to check whether you can prevent the default behavior associated with
         * a particular event. If the value of Event.cancelable is true, then preventDefault() can be used to cancel the event;
         * otherwise, preventDefault() has no effect.
         * @see #cancelable
         * @see #isDefaultPrevented
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????
         * ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * ?????????????????? TextEvent.TEXT_INPUT ????????????????????????????????????????????? preventDefault() ?????????????????????????????????
         * ??????????????? Event.cancelable ?????????????????????????????????????????????????????????????????????????????? Event.cancelable ????????? true???
         * ??????????????? preventDefault() ???????????????????????????preventDefault() ?????????
         * @see #cancelable
         * @see #isDefaultPrevented
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.preventDefault = function () {
            if (this.$cancelable)
                this.$isDefaultPrevented = true;
        };
        /**
         * @language en_US
         * Prevents processing of any event listeners in nodes subsequent to the current node in the event flow. This method
         * does not affect any event listeners in the current node (currentTarget). In contrast, the stopImmediatePropagation()
         * method prevents processing of event listeners in both the current node and subsequent nodes. Additional calls to this
         * method have no effect. This method can be called in any phase of the event flow.<br/>
         * Note: This method does not cancel the behavior associated with this event; see preventDefault() for that functionality.
         * @see #stopImmediatePropagation()
         * @see #preventDefault()
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? currentTarget ??????????????????????????????
         * ???????????????stopImmediatePropagation() ???????????????????????????????????????????????????????????????????????????????????????
         * ??????????????????????????????????????????????????????????????????????????????????????????????????????<br/>
         * ??????????????????????????????????????????????????????????????????????????????????????????????????? preventDefault()???
         * @see #stopImmediatePropagation()
         * @see #preventDefault()
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.stopPropagation = function () {
            if (this.$bubbles)
                this.$isPropagationStopped = true;
        };
        /**
         * @language en_US
         * Prevents processing of any event listeners in the current node and any subsequent nodes in the event flow.
         * This method takes effect immediately, and it affects event listeners in the current node. In contrast, the
         * stopPropagation() method doesn't take effect until all the event listeners in the current node finish processing.<br/>
         * Note: This method does not cancel the behavior associated with this event; see preventDefault() for that functionality.
         * @see #stopPropagation()
         * @see #preventDefault()
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * ?????????????????????????????????????????????????????????????????????????????????stopPropagation() ?????????????????????<br/>
         * ??????????????????????????????????????????????????????????????????????????????????????????????????? preventDefault()???
         * @see #stopPropagation()
         * @see #preventDefault()
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.stopImmediatePropagation = function () {
            if (this.$bubbles)
                this.$isPropagationImmediateStopped = true;
        };
        /**
         * @language en_US
         * This method will be called automatically when you pass the event object as the parameters to the Event.release() method.
         * If your custom event is designed for reusable,you should override this method to make sure all the references to external
         * objects are cleaned. if not,it may cause memory leaking.
         * @see egret.Event.create()
         * @see egret.Event.release()
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????Event.release()??????????????????????????????clean()??????????????????????????????
         * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * @see egret.Event.create()
         * @see egret.Event.release()
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.clean = function () {
            this.data = this.$currentTarget = null;
            this.$setTarget(null);
        };
        /**
         * @language en_US
         * EventDispatcher object using the specified event object thrown Event. Objects thrown objects will be cached in the pool for the next round robin.
         * @param target the event target
         * @param type The type of the event. Event listeners can access this information through the inherited type property.
         * @param bubbles Determines whether the Event object bubbles. Event listeners can access this information through
         * the inherited bubbles property.
         * @param data {any} data
         * @method egret.Event.dispatchEvent
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????? EventDispatcher ??????????????? Event ????????????????????????????????????????????????????????????????????????????????????
         * @param target {egret.IEventDispatcher} ??????????????????
         * @param type {string} ????????????
         * @param bubbles {boolean} ?????? Event ????????????????????????????????????????????????????????? false???
         * @param data {any} ??????data
         * @method egret.Event.dispatchEvent
         * @version Egret 2.4
         * @platform Web,Native
         */
        Event.dispatchEvent = function (target, type, bubbles, data) {
            if (bubbles === void 0) { bubbles = false; }
            var event = Event.create(Event, type, bubbles);
            var props = Event._getPropertyData(Event);
            if (data != undefined) {
                props.data = data;
            }
            var result = target.dispatchEvent(event);
            Event.release(event);
            return result;
        };
        /**
         * @private
         *
         * @param EventClass
         * @returns
         */
        Event._getPropertyData = function (EventClass) {
            var props = EventClass._props;
            if (!props)
                props = EventClass._props = {};
            return props;
        };
        /**
         * @language en_US
         * Gets one event instance from the object pool or create a new one. We highly recommend using the Event.create()
         * and Event.release() methods to create and release an event object,it can reduce the number of reallocate objects,
         * which allows you to get better code execution performance.<br/>
         * Note: If you want to use this method to initialize your custom event object,you must make sure the constructor
         * of your custom event is the same as the constructor of egret.Event.
         * @param EventClass Event Class???
         * @param type  The type of the event, accessible as Event.type.
         * @param bubbles  Determines whether the Event object participates in the bubbling stage of the event flow. The default value is false.
         * @param cancelable Determines whether the Event object can be canceled. The default values is false.
         * @example
         * <pre>
         *    var event = Event.create(Event,type, bubbles);
         *    event.data = data;    //optional,initializes custom data here
         *    this.dispatchEvent(event);
         *    Event.release(event);
         * </pre>
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????????????????????????????Event.create()???Event.release() ????????????????????????????????????????????????
         * ?????????????????????????????????????????????????????????????????????????????????????????????????????????,??????????????????????????????????????????<br/>
         * ????????????????????????????????????????????????????????????????????????????????????????????????????????????Event????????????
         * @param EventClass Event?????????
         * @param type  ?????????????????????????????? Event.type ?????????
         * @param bubbles  ?????? Event ????????????????????????????????????????????????????????? false???
         * @param cancelable ???????????????????????? Event ????????????????????? false???
         * @example
         * <pre>
         *    var event = Event.create(Event,type, bubbles);
         *    event.data = data;  //???????????????????????????????????????????????????????????????????????????????????????????????????
         *    this.dispatchEvent(event);
         *    Event.release(event);
         * </pre>
         * @see #clean()
         * @version Egret 2.4
         * @platform Web,Native
         */
        Event.create = function (EventClass, type, bubbles, cancelable) {
            var eventPool = EventClass.eventPool;
            if (!eventPool) {
                eventPool = EventClass.eventPool = [];
            }
            if (eventPool.length) {
                var event = eventPool.pop();
                event.$type = type;
                event.$bubbles = !!bubbles;
                event.$cancelable = !!cancelable;
                event.$isDefaultPrevented = false;
                event.$isPropagationStopped = false;
                event.$isPropagationImmediateStopped = false;
                event.$eventPhase = 2 /* AT_TARGET */;
                return event;
            }
            return new EventClass(type, bubbles, cancelable);
        };
        /**
         * @language en_US
         * Releases an event object and cache it into the object pool.We highly recommend using the Event.create()
         * and Event.release() methods to create and release an event object,it can reduce the number of reallocate objects,
         * which allows you to get better code execution performance.<br/>
         * Note: The parameters of this method only accepts an instance created by the Event.create() method.
         * if not,it may throw an error.
         * @example
         * <pre>
         *    var event = Event.create(Event,type, bubbles);
         *    event.data = data; //optional,initializes custom data here
         *    this.dispatchEvent(event);
         *    Event.release(event);
         * </pre>
         * @see #clean()
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????????????????????????????????????????????????????Event.create()???Event.release() ????????????????????????????????????????????????
         * ?????????????????????????????????????????????????????????????????????????????????????????????????????????,??????????????????????????????????????????<br/>
         * ?????????????????????????????????Event.create()????????????????????????????????????????????????????????????????????????
         * @example
         * <pre>
         *    var event = Event.create(Event,type, bubbles);
         *    event.data = data;   //???????????????????????????????????????????????????????????????????????????????????????????????????
         *    this.dispatchEvent(event);
         *    Event.release(event);
         * </pre>
         * @see #clean()
         * @version Egret 2.4
         * @platform Web,Native
         */
        Event.release = function (event) {
            event.clean();
            var EventClass = Object.getPrototypeOf(event).constructor;
            EventClass.eventPool.push(event);
        };
        /**
         * @language en_US
         * Dispatched when a display object is added to the on stage display list, either directly or through the addition
         * of a sub tree in which the display object is contained.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Event.ADDED_TO_STAGE = "addedToStage";
        /**
         * @language en_US
         * Dispatched when a display object is about to be removed from the display list, either directly or through the removal
         * of a sub tree in which the display object is contained.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Event.REMOVED_FROM_STAGE = "removedFromStage";
        /**
         * @language en_US
         * Dispatched when a display object is added to the display list.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Event.ADDED = "added";
        /**
         * @language en_US
         * Dispatched when a display object is about to be removed from the display list.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Event.REMOVED = "removed";
        /**
         * @language en_US
         * [broadcast event] Dispatched when the playhead is entering a new frame.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * [????????????] ??????????????????,???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Event.ENTER_FRAME = "enterFrame";
        /**
         * @language en_US
         * Dispatched when the display list is about to be updated and rendered.
         * Note: Every time you want to receive a render event,you must call the stage.invalidate() method.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * ???????????????????????? Egret ?????? Event.RENDER ??????????????????????????? stage.invalidate() ??????????????????????????????????????????????????????
         * ?????? Event.RENDER ????????????????????????????????????stage.invalidate()?????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Event.RENDER = "render";
        /**
         * @language en_US
         * Dispatched when the size of stage or UIComponent is changed.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????UI????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Event.RESIZE = "resize";
        /**
         * @language en_US
         * Dispatched when the value or selection of a property is chaned.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????????????????????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Event.CHANGE = "change";
        /**
         * @language en_US
         * Dispatched when the value or selection of a property is going to change.you can cancel this by calling the
         * preventDefault() method.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????,?????????????????????????????????????????????????????????????????????????????????????????? preventDefault() ?????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Event.CHANGING = "changing";
        /**
         * @language en_US
         * Dispatched when the net request is complete.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Event.COMPLETE = "complete";
        /**
         * @language en_US
         * Dispatched when loop completed.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Event.LOOP_COMPLETE = "loopComplete";
        /**
         * @language en_US
         * Dispatched when the TextInput instance gets focus.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * TextInput??????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Event.FOCUS_IN = "focusIn";
        /**
         * @language en_US
         * Dispatched when the TextInput instance loses focus.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * TextInput??????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Event.FOCUS_OUT = "focusOut";
        /**
         * @language en_US
         * Dispatched when the playback is ended.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Event.ENDED = "ended";
        /**
         * ????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Event.ACTIVATE = "activate";
        /**
         * ????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Event.DEACTIVATE = "deactivate";
        /**
         * Event.CLOSE ???????????? close ??????????????? type ???????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Event.CLOSE = "close";
        /**
         * Event.CONNECT ???????????? connect ??????????????? type ???????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Event.CONNECT = "connect";
        /**
         * Event.LEAVE_STAGE ???????????? leaveStage ??????????????? type ???????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Event.LEAVE_STAGE = "leaveStage";
        /**
         * Event.SOUND_COMPLETE ???????????? ?????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Event.SOUND_COMPLETE = "soundComplete";
        return Event;
    })(egret.HashObject);
    egret.Event = Event;
    egret.registerClass(Event,"egret.Event");
    if (DEBUG) {
        egret.$markReadOnly(Event, "type");
        egret.$markReadOnly(Event, "bubbles");
        egret.$markReadOnly(Event, "cancelable");
        egret.$markReadOnly(Event, "eventPhase");
        egret.$markReadOnly(Event, "currentTarget");
        egret.$markReadOnly(Event, "target");
    }
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * When the user changes the focus from one object in the display list to another object, the object dispatches a FocusEvent object. Currently only supports input text.
     * Focus events: FocusEvent.FOCUS_IN FocusEvent.FOCUS_OUT
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ????????????????????????????????????????????????????????????????????????????????????????????? FocusEvent ???????????????????????????????????????
     * ???????????????FocusEvent.FOCUS_IN FocusEvent.FOCUS_OUT
     * @version Egret 2.4
     * @platform Web,Native
     */
    var FocusEvent = (function (_super) {
        __extends(FocusEvent, _super);
        /**
         * @language en_US
         * Create a egret.FocusEvent objects
         * @param type  The type of the event, accessible as Event.type.
         * @param bubbles  Determines whether the Event object participates in the bubbling stage of the event flow. The default value is false.
         * @param cancelable Determines whether the Event object can be canceled. The default values is false.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????? egret.FocusEvent ??????
         * @param type  ?????????????????????????????? Event.type ?????????
         * @param bubbles  ?????? Event ????????????????????????????????????????????????????????? false???
         * @param cancelable ???????????????????????? Event ????????????????????? false???
         * @version Egret 2.4
         * @platform Web,Native
         */
        function FocusEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            _super.call(this, type, bubbles, cancelable);
        }
        var d = __define,c=FocusEvent;p=c.prototype;
        /**
         * @language en_US
         * Gets focus
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        FocusEvent.FOCUS_IN = "focusIn";
        /**
         * @language en_US
         * Loses focus
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        FocusEvent.FOCUS_OUT = "focusOut";
        return FocusEvent;
    })(egret.Event);
    egret.FocusEvent = FocusEvent;
    egret.registerClass(FocusEvent,"egret.FocusEvent");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * The GeolocationEvent represents the position and altitude of the device on Earth,
     * and show errors occurred while getting the location of the device.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/sensor/Geolocation.ts
     */
    /**
     * @language zh_CN
     * GeolocationEvent ????????????????????????????????????????????????????????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/sensor/Geolocation.ts
     */
    var GeolocationEvent = (function (_super) {
        __extends(GeolocationEvent, _super);
        function GeolocationEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=GeolocationEvent;p=c.prototype;
        /**
         * @language en_US
         * The acquisition of the location information failed because of app don't have permission.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        GeolocationEvent.PERMISSION_DENIED = "permissionDenied";
        /**
         * @language en_US
         * The acquisition of the location failed because at least one internal source of position returned an internal error.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        GeolocationEvent.UNAVAILABLE = "unavailable";
        return GeolocationEvent;
    })(egret.Event);
    egret.GeolocationEvent = GeolocationEvent;
    egret.registerClass(GeolocationEvent,"egret.GeolocationEvent");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * When a network request returns an HTTP status code, the application dispatches HTTPStatusEvent objects.
     * Before error or completion events will always send HTTPStatusEvent object. HTTPStatusEvent object does not necessarily indicate an error condition; it simply reflects the HTTP status code provided by the network stack (if any).
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ????????????????????? HTTP ??????????????????????????????????????? HTTPStatusEvent ?????????
     * ???????????????????????????????????????????????? HTTPStatusEvent ?????????HTTPStatusEvent ????????????????????????????????????????????????????????????????????? HTTP ????????????????????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     */
    var HTTPStatusEvent = (function (_super) {
        __extends(HTTPStatusEvent, _super);
        /**
         * @language en_US
         * Create a egret.HTTPStatusEvent objects
         * @param type  The type of the event, accessible as Event.type.
         * @param bubbles  Determines whether the Event object participates in the bubbling stage of the event flow. The default value is false.
         * @param cancelable Determines whether the Event object can be canceled. The default values is false.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????? egret.HTTPStatusEvent ??????
         * @param type  ?????????????????????????????? Event.type ?????????
         * @param bubbles  ?????? Event ????????????????????????????????????????????????????????? false???
         * @param cancelable ???????????????????????? Event ????????????????????? false???
         * @version Egret 2.4
         * @platform Web,Native
         */
        function HTTPStatusEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            _super.call(this, type, bubbles, cancelable);
            /**
             * @private
             */
            this._status = 0;
        }
        var d = __define,c=HTTPStatusEvent;p=c.prototype;
        d(p, "status"
            /**
             * @language en_US
             * he server returns the HTTP status code.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????? HTTP ???????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this._status;
            }
        );
        /**
         * @language en_US
         * EventDispatcher object using the specified event object thrown Event. The objects will be thrown in the object cache pool for the next round robin.
         * @param target {egret.IEventDispatcher} Distribute event target
         * @param status {number} The server returns the HTTP status code
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????EventDispatcher???????????????Event????????????????????????????????????????????????????????????????????????????????????
         * @param target {egret.IEventDispatcher} ??????????????????
         * @param status {number} ????????????????????? HTTP ????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        HTTPStatusEvent.dispatchHTTPStatusEvent = function (target, status) {
            var event = egret.Event.create(HTTPStatusEvent, HTTPStatusEvent.HTTP_STATUS);
            event._status = status;
            var result = target.dispatchEvent(event);
            egret.Event.release(event);
            return result;
        };
        /**
         * @language en_US
         * HTTPStatusEvent.HTTP_STATUS constant defines the value of the type property httpStatus event object.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * HTTPStatusEvent.HTTP_STATUS ???????????? httpStatus ??????????????? type ????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        HTTPStatusEvent.HTTP_STATUS = "httpStatus";
        return HTTPStatusEvent;
    })(egret.Event);
    egret.HTTPStatusEvent = HTTPStatusEvent;
    egret.registerClass(HTTPStatusEvent,"egret.HTTPStatusEvent");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * @classdesc IO??????????????????????????????????????????????????????????????? IOErrorEvent ?????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/events/IOErrorEvent.ts
     */
    /**
     * @language zh_CN
     * @classdesc IO??????????????????????????????????????????????????????????????? IOErrorEvent ?????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/events/IOErrorEvent.ts
     */
    var IOErrorEvent = (function (_super) {
        __extends(IOErrorEvent, _super);
        /**
         * @language en_US
         * Create a egret.IOErrorEvent objects
         * @param type {string} Type of event, accessible as Event.type.
         * @param bubbles {boolean} Determines whether the Event object participates in the bubbling stage of the event flow. The default value is false.
         * @param cancelable {boolean} Determine whether the Event object can be canceled. The default value is false.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????? egret.IOErrorEvent ??????
         * @param type {string} ?????????????????????????????? Event.type ?????????
         * @param bubbles {boolean} ?????? Event ????????????????????????????????????????????????????????? false???
         * @param cancelable {boolean} ???????????????????????? Event ????????????????????? false???
         * @version Egret 2.4
         * @platform Web,Native
         */
        function IOErrorEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            _super.call(this, type, bubbles, cancelable);
        }
        var d = __define,c=IOErrorEvent;p=c.prototype;
        /**
         * @language en_US
         * EventDispatcher object using the specified event object thrown Event. The objects will be thrown in the object cache pool for the next round robin.
         * @param target {egret.IEventDispatcher} Distribute event target
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????EventDispatcher???????????????Event????????????????????????????????????????????????????????????????????????????????????
         * @param target {egret.IEventDispatcher} ??????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        IOErrorEvent.dispatchIOErrorEvent = function (target) {
            var event = egret.Event.create(IOErrorEvent, IOErrorEvent.IO_ERROR);
            var result = target.dispatchEvent(event);
            egret.Event.release(event);
            return result;
        };
        /**
         * @language en_US
         * io error
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * io????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        IOErrorEvent.IO_ERROR = "ioError";
        return IOErrorEvent;
    })(egret.Event);
    egret.IOErrorEvent = IOErrorEvent;
    egret.registerClass(IOErrorEvent,"egret.IOErrorEvent");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * MotionEvent represents the device's movement
     * Acceleration and accelerationIncludingGravity to represents the device's acceleration
     * RotationRate to represents the device's rotation
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/sensor/Motion.ts
     */
    /**
     * @language zh_CN
     * MotionEvent ????????????????????????????????????
     * Acceleration ??? accelerationIncludingGravity ??????????????????????????????????????????
     * RotationRate ?????????????????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/sensor/Motion.ts
     */
    var MotionEvent = (function (_super) {
        __extends(MotionEvent, _super);
        function MotionEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=MotionEvent;p=c.prototype;
        return MotionEvent;
    })(egret.Event);
    egret.MotionEvent = MotionEvent;
    egret.registerClass(MotionEvent,"egret.MotionEvent");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * The OrientationEvent provides information from the physical orientation of the device.
     * Note: Currently, Browsers on the iOS and Android does not handle the coordinates the same way.
     * Take care about this while using them.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/sensor/DeviceOrientation.ts
     */
    /**
     * @language zh_CN
     * OrientationEvent ???????????????????????????
     * ??????: ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * ????????????????????????????????????????????????????????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/sensor/DeviceOrientation.ts
     */
    var OrientationEvent = (function (_super) {
        __extends(OrientationEvent, _super);
        function OrientationEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OrientationEvent;p=c.prototype;
        return OrientationEvent;
    })(egret.Event);
    egret.OrientationEvent = OrientationEvent;
    egret.registerClass(OrientationEvent,"egret.OrientationEvent");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * When a load operation has begun or a socket has received data, ProgressEvent object is dispatched.
     * There are two types of progress events: ProgressEvent.PROGRESS and ProgressEvent.SOCKET_DATA.
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ????????????????????????????????????????????????????????????????????? ProgressEvent ?????????
     * ?????????????????????????????????ProgressEvent.PROGRESS ??? ProgressEvent.SOCKET_DATA???
     * @version Egret 2.4
     * @platform Web,Native
     */
    var ProgressEvent = (function (_super) {
        __extends(ProgressEvent, _super);
        /**
         * @language en_US
         * ???????????? egret.ProgressEvent ??????
         * @param type  The type of the event, accessible as Event.type.
         * @param bubbles  Determines whether the Event object participates in the bubbling stage of the event flow. The default value is false.
         * @param cancelable Determines whether the Event object can be canceled. The default values is false.
         * @param bytesLoaded {number} Number of items or bytes loaded
         * @param bytesTotal {number} The total number of items or bytes loaded
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????? egret.ProgressEvent ??????
         * @param type  ?????????????????????????????? Event.type ?????????
         * @param bubbles  ?????? Event ????????????????????????????????????????????????????????? false???
         * @param cancelable ???????????????????????? Event ????????????????????? false???
         * @param bytesLoaded {number} ???????????????????????????
         * @param bytesTotal {number} ?????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        function ProgressEvent(type, bubbles, cancelable, bytesLoaded, bytesTotal) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            if (bytesLoaded === void 0) { bytesLoaded = 0; }
            if (bytesTotal === void 0) { bytesTotal = 0; }
            _super.call(this, type, bubbles, cancelable);
            /**
             * @language en_US
             * Number of items or bytes when the listener processes the event???
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            this.bytesLoaded = 0;
            /**
             * @language en_US
             * If the loading process succeeds, the total number or the total number of bytes that will be loaded term.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            this.bytesTotal = 0;
            this.bytesLoaded = bytesLoaded;
            this.bytesTotal = bytesTotal;
        }
        var d = __define,c=ProgressEvent;p=c.prototype;
        /**
         * @language en_US
         * EventDispatcher object using the specified event object thrown Event. The objects will be thrown in the object cache pool for the next round robin.
         * @param target {egret.IEventDispatcher} Distribute event target
         * @param type  The type of the event, accessible as Event.type.
         * @param bytesLoaded {number} Number of items or bytes loaded
         * @param bytesTotal {number} The total number of items or bytes loaded
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????EventDispatcher???????????????Event????????????????????????????????????????????????????????????????????????????????????
         * @param target {egret.IEventDispatcher} ??????????????????
         * @param type {string} ????????????
         * @param bytesLoaded {number} ???????????????????????????
         * @param bytesTotal {number} ?????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        ProgressEvent.dispatchProgressEvent = function (target, type, bytesLoaded, bytesTotal) {
            if (bytesLoaded === void 0) { bytesLoaded = 0; }
            if (bytesTotal === void 0) { bytesTotal = 0; }
            var event = egret.Event.create(ProgressEvent, type);
            event.bytesLoaded = bytesLoaded;
            event.bytesTotal = bytesTotal;
            var result = target.dispatchEvent(event);
            egret.Event.release(event);
            return result;
        };
        /**
         * @language en_US
         * Changes in the loading progress
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        ProgressEvent.PROGRESS = "progress";
        /**
         * @language en_US
         * Get the data
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        ProgressEvent.SOCKET_DATA = "socketData";
        return ProgressEvent;
    })(egret.Event);
    egret.ProgressEvent = ProgressEvent;
    egret.registerClass(ProgressEvent,"egret.ProgressEvent");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * When the direction of the stage of change, Stage object dispatches StageOrientationEvent object.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/events/StageOrientationEvent.ts
     */
    /**
     * @language zh_CN
     * ??????????????????????????????Stage ??????????????? StageOrientationEvent ?????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/events/StageOrientationEvent.ts
     */
    var StageOrientationEvent = (function (_super) {
        __extends(StageOrientationEvent, _super);
        /**
         * @language en_US
         * Creating contains specific information related to the event and the stage direction of StageOrientationEvent object.
         * @param type Event types:StageOrientationEvent.ORIENTATION_CHANGE
         * @param bubbles It indicates whether the Event object participates in the bubbling stage of the event flow.
         * @param cancelable It indicates whether the Event object can be canceled.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????????????????? StageOrientationEvent ?????????
         * @param type ??????????????????StageOrientationEvent.ORIENTATION_CHANGE
         * @param bubbles ?????? Event ?????????????????????????????????????????????
         * @param cancelable ???????????????????????? Event ?????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        function StageOrientationEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            _super.call(this, type, bubbles, cancelable);
        }
        var d = __define,c=StageOrientationEvent;p=c.prototype;
        /**
         * @language en_US
         * ????????????????????????????????????
         * @param target {egret.IEventDispatcher} ??????????????????
         * @param type {egret.IEventDispatcher} ??????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????
         * @param target {egret.IEventDispatcher} Distribute event target
         * @param type {egret.IEventDispatcher} Distribute event type
         * @version Egret 2.4
         * @platform Web,Native
         */
        StageOrientationEvent.dispatchStageOrientationEvent = function (target, type) {
            var event = egret.Event.create(StageOrientationEvent, type);
            var result = target.dispatchEvent(event);
            egret.Event.release(event);
            return result;
        };
        /**
         * @language en_US
         * After screen rotation distribute events.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        StageOrientationEvent.ORIENTATION_CHANGE = "orientationChange";
        return StageOrientationEvent;
    })(egret.Event);
    egret.StageOrientationEvent = StageOrientationEvent;
    egret.registerClass(StageOrientationEvent,"egret.StageOrientationEvent");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * When a user clicks a hyperlink rich text object dispatches TextEvent object. Text Event Type: TextEvent.LINK.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/events/TextEvent.ts
     */
    /**
     * @language zh_CN
     * ????????????????????????????????????????????????????????? TextEvent ??????????????????????????????TextEvent.LINK???
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/events/TextEvent.ts
     */
    var TextEvent = (function (_super) {
        __extends(TextEvent, _super);
        /**
         * @language en_US
         * TextEvent create an object that contains information about text events.
         * @param type Type of event, you can access the TextEvent.type.
         * @param bubbles Determines whether the Event object participates in the bubbling stage of the event flow. The default value is false.
         * @param cancelable Determine whether the Event object can be canceled. The default value is false.
         * @param text One or more characters of text entered by the user. Event listeners can access this information through the text property.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????? TextEvent ???????????????????????????????????????????????????
         * @param type ?????????????????????????????? TextEvent.type ?????????
         * @param bubbles ?????? Event ????????????????????????????????????????????????????????? false???
         * @param cancelable ???????????????????????? Event ????????????????????? false???
         * @param text ???????????????????????????????????????????????????????????????????????? text ????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        function TextEvent(type, bubbles, cancelable, text) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            if (text === void 0) { text = ""; }
            _super.call(this, type, bubbles, cancelable);
            this.text = text;
        }
        var d = __define,c=TextEvent;p=c.prototype;
        /**
         * @language en_US
         * EventDispatcher object using the specified event object thrown TextEvent. The objects will be thrown in the object cache pool for the next round robin.
         * @param type  The type of the event, accessible as Event.type.
         * @param bubbles  Determines whether the Event object participates in the bubbling stage of the event flow. The default value is false.
         * @param text  Text TextEvent object assignment
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????EventDispatcher???????????????TextEvent????????????????????????????????????????????????????????????????????????????????????
         * @param target ??????????????????
         * @param type  ????????????
         * @param text  TextEvent?????????text??????
         * @version Egret 2.4
         * @platform Web,Native
         */
        TextEvent.dispatchTextEvent = function (target, type, text) {
            var event = egret.Event.create(TextEvent, type);
            event.text = text;
            var result = target.dispatchEvent(event);
            egret.Event.release(event);
            return result;
        };
        /**
         * @language en_US
         * It defines the value of the type property of a link event object.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????? link ??????????????? type ????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        TextEvent.LINK = "link";
        return TextEvent;
    })(egret.Event);
    egret.TextEvent = TextEvent;
    egret.registerClass(TextEvent,"egret.TextEvent");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * A Timer object dispatches a TimerEvent objects whenever the Timer object reaches the interval specified by the Timer.delay property.
     * @see egret.Timer
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/events/TimerEvent.ts
     */
    /**
     * @language zh_CN
     * ?????? Timer ??????????????? Timer.delay ???????????????????????????Timer ?????????????????? TimerEvent ?????????
     * @see egret.Timer
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/events/TimerEvent.ts
     */
    var TimerEvent = (function (_super) {
        __extends(TimerEvent, _super);
        /**
         * @language en_US
         * Creates an Event object with specific information relevant to timer events.
         * @param type The type of the event. Event listeners can access this information through the inherited type property.
         * @param bubbles Determines whether the Event object bubbles. Event listeners can access this information through
         * the inherited bubbles property.
         * @param cancelable Determines whether the Event object can be canceled. Event listeners can access this information
         * through the inherited cancelable property.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????? Event ??????????????????????????? timer ????????????????????????
         * @param type ?????????????????????????????????????????????????????? type ????????????????????????
         * @param bubbles ?????? Event ????????????????????????????????????????????????????????? bubbles ????????????????????????
         * @param cancelable ???????????????????????? Event ????????????????????????????????????????????? cancelable ????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        function TimerEvent(type, bubbles, cancelable) {
            _super.call(this, type, bubbles, cancelable);
        }
        var d = __define,c=TimerEvent;p=c.prototype;
        /**
         * @language en_US
         * Instructs Egret runtime to render after processing of this event completes, if the display list has been modified.
         * @example
         * <pre>
         *    function onTimer(event:TimerEvent):void {
         *        if (40 < mySp.x && mySp.x < 375) {
         *            mySp.x-= 50;
         *        } else {
         *            mySp.x=374;
         *        }
         *        event.updateAfterEvent();
         *    }
         *
         *    var moveTimer:Timer=new Timer(50,250);
         *    moveTimer.addEventListener(TimerEvent.TIMER,onTimer);
         *    moveTimer.start();
         * </pre>
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * @example
         * <pre>
         *    function onTimer(event:TimerEvent):void {
         *        if (40 < mySp.x && mySp.x < 375) {
         *            mySp.x-= 50;
         *        } else {
         *            mySp.x=374;
         *        }
         *        event.updateAfterEvent();
         *    }
         *
         *    var moveTimer:Timer=new Timer(50,250);
         *    moveTimer.addEventListener(TimerEvent.TIMER,onTimer);
         *    moveTimer.start();
         * </pre>
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.updateAfterEvent = function () {
            egret.sys.$requestRenderingFlag = true;
        };
        /**
         * @language en_US
         * uses a specified target to dispatchEvent an event. Using this method can reduce the number of
         * reallocate event objects, which allows you to get better code execution performance.
         * @param target the event target
         * @param type The type of the event. Event listeners can access this information through the inherited type property.
         * @param bubbles Determines whether the Event object bubbles. Event listeners can access this information through
         * the inherited bubbles property.
         * @param cancelable Determines whether the Event object can be canceled. Event listeners can access this information
         * through the inherited cancelable property.
         * @see egret.Event.create()
         * @see egret.Event.release()
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????EventDispatcher???????????????????????????????????????????????????????????????????????????????????????????????????
         * @param target ??????????????????
         * @param type ?????????????????????????????????????????????????????? type ????????????????????????
         * @param bubbles ?????? Event ????????????????????????????????????????????????????????? bubbles ????????????????????????
         * @param cancelable ???????????????????????? Event ????????????????????????????????????????????? cancelable ????????????????????????
         * @see egret.Event.create()
         * @see egret.Event.release()
         * @version Egret 2.4
         * @platform Web,Native
         */
        TimerEvent.dispatchTimerEvent = function (target, type, bubbles, cancelable) {
            var event = egret.Event.create(TimerEvent, type, bubbles, cancelable);
            var result = target.dispatchEvent(event);
            egret.Event.release(event);
            return result;
        };
        /**
         * @language en_US
         * Dispatched whenever a Timer object reaches an interval specified according to the Timer.delay property.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????? Timer ?????????????????? Timer.delay ?????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        TimerEvent.TIMER = "timer";
        /**
         * @language en_US
         * Dispatched whenever it has completed the number of requests set by Timer.repeatCount.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????? Timer.repeatCount ??????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        TimerEvent.TIMER_COMPLETE = "timerComplete";
        return TimerEvent;
    })(egret.Event);
    egret.TimerEvent = TimerEvent;
    egret.registerClass(TimerEvent,"egret.TimerEvent");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    var pointPool = [];
    var DEG_TO_RAD = Math.PI / 180;
    /**
     * @language en_US
     * The Point object represents a location in a two-dimensional coordinate system, where x represents the horizontal
     * axis and y represents the vertical axis.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/geom/Point.ts
     */
    /**
     * @language zh_CN
     * Point ????????????????????????????????????????????????????????? x ??????????????????y ??????????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/geom/Point.ts
     */
    var Point = (function (_super) {
        __extends(Point, _super);
        /**
         * @language en_US
         * Creates a new point. If you pass no parameters to this method, a point is created at (0,0).
         * @param x The horizontal coordinate.
         * @param y The vertical coordinate.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????? egret.Point ??????.??????????????????????????????????????????????????????0???0??????????????????
         * @param x ????????????x?????????????????????0
         * @param y ????????????y?????????????????????0
         * @version Egret 2.4
         * @platform Web,Native
         */
        function Point(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            _super.call(this);
            this.x = x;
            this.y = y;
        }
        var d = __define,c=Point;p=c.prototype;
        /**
         * @language en_US
         * Releases a point instance to the object pool
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????Point??????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Point.release = function (point) {
            if (!point) {
                return;
            }
            pointPool.push(point);
        };
        /**
         * @language en_US
         * get a point instance from the object pool or create a new one.
         * @param x The horizontal coordinate.
         * @param y The vertical coordinate.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????Point?????????
         * @param x ????????????x?????????????????????0
         * @param y ????????????y?????????????????????0
         * @version Egret 2.4
         * @platform Web,Native
         */
        Point.create = function (x, y) {
            var point = pointPool.pop();
            if (!point) {
                point = new Point();
            }
            return point.setTo(x, y);
        };
        d(p, "length"
            /**
             * @language en_US
             * The length of the line segment from (0,0) to this point.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??? (0,0) ???????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            }
        );
        /**
         * @language en_US
         * Sets the members of Point to the specified values
         * @param x The horizontal coordinate.
         * @param y The vertical coordinate.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??? Point ???????????????????????????
         * @param x ????????????x?????????
         * @param y ????????????y?????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.setTo = function (x, y) {
            this.x = x;
            this.y = y;
            return this;
        };
        /**
         * @language en_US
         * Creates a copy of this Point object.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.clone = function () {
            return new Point(this.x, this.y);
        };
        /**
         * @language en_US
         * Determines whether two points are equal. Two points are equal if they have the same x and y values.
         * @param toCompare The point to be compared.
         * @returns A value of true if the object is equal to this Point object; false if it is not equal.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????? x ??? y ?????????????????????????????????
         * @param toCompare ??????????????????
         * @returns ????????????????????? Point ????????????????????? true ?????????????????????????????? false???
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.equals = function (toCompare) {
            return this.x == toCompare.x && this.y == toCompare.y;
        };
        /**
         * @language en_US
         * Returns the distance between pt1 and pt2.
         * @param p1 The first point.
         * @param p2 The second point.
         * @returns The distance between the first and second points.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????? pt1 ??? pt2 ??????????????????
         * @param p1 ????????????
         * @param p2 ????????????
         * @returns ?????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Point.distance = function (p1, p2) {
            return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
        };
        /**
         * @language en_US
         * Copies all of the point data from the source Point object into the calling Point object.
         * @param sourcePoint The Point object from which to copy the data.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????? Point ????????????????????????????????????????????? Point ????????????
         * @param sourcePoint ???????????????????????? Point ?????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.copyFrom = function (sourcePoint) {
            this.x = sourcePoint.x;
            this.y = sourcePoint.y;
        };
        /**
         * @language en_US
         * Adds the coordinates of another point to the coordinates of this point to create a new point.
         * @param v The point to be added.
         * @returns The new point.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????????????????????????????????
         * @param v ??????????????????
         * @returns ?????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.add = function (v) {
            return new Point(this.x + v.x, this.y + v.y);
        };
        /**
         * @language en_US
         * Determines a point between two specified points.
         * The parameter f determines where the new interpolated point is located relative to the two end points specified by parameters pt1 and pt2. The closer the value of the parameter f is to 1.0, the closer the interpolated point is to the first point (parameter pt1). The closer the value of the parameter f is to 0, the closer the interpolated point is to the second point (parameter pt2).
         * @param pt1 The first point.
         * @param pt2 The second point.
         * @param f The level of interpolation between the two points. Indicates where the new point will be, along the line between pt1 and pt2. If f=1, pt1 is returned; if f=0, pt2 is returned.
         * @returns The new interpolated point.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????
         * ?????? f ???????????????????????????????????? pt1 ??? pt2 ????????????????????????????????????????????? f ??????????????? 1.0???????????????????????????????????????????????? pt1???????????? f ??????????????? 0???????????????????????????????????????????????? pt2??????
         * @param pt1 ???????????????
         * @param pt2 ???????????????
         * @param f ?????????????????????????????????????????????????????? pt1 ??? pt2 ?????????????????????????????????????????? f=1???????????? pt1????????? f=0???????????? pt2???
         * @returns ??????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Point.interpolate = function (pt1, pt2, f) {
            var f1 = 1 - f;
            return new Point(pt1.x * f + pt2.x * f1, pt1.y * f + pt2.y * f1);
        };
        /**
         * @language en_US
         * Scales the line segment between (0,0) and the current point to a set length.
         * @param thickness The scaling value. For example, if the current point is (0,5), and you normalize it to 1, the point returned is at (0,1).
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??? (0,0) ??????????????????????????????????????????????????????
         * @param thickness ??????????????????????????????????????? (0,5) ??????????????????????????? 1???????????????????????? (0,1) ??????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.normalize = function (thickness) {
            if (this.x != 0 || this.y != 0) {
                var relativeThickness = thickness / this.length;
                this.x *= relativeThickness;
                this.y *= relativeThickness;
            }
        };
        /**
         * @language en_US
         * Offsets the Point object by the specified amount. The value of dx is added to the original value of x to create the new x value. The value of dy is added to the original value of y to create the new y value.
         * @param dx The amount by which to offset the horizontal coordinate, x.
         * @param dy The amount by which to offset the vertical coordinate, y.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????? Point ?????????dx ?????????????????? x ?????????????????????????????? x ??????dy ?????????????????? y ?????????????????????????????? y ??????
         * @param dx ???????????? x ???????????????
         * @param dy ???????????? y ???????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.offset = function (dx, dy) {
            this.x += dx;
            this.y += dy;
        };
        /**
         * @language en_US
         * Converts a pair of polar coordinates to a Cartesian point coordinate.
         * @param len The length coordinate of the polar pair.
         * @param angle The angle, in radians, of the polar pair.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????????
         * @param len ????????????????????????
         * @param angle ?????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Point.polar = function (len, angle) {
            return new Point(len * egret.NumberUtils.cos(angle / DEG_TO_RAD), len * egret.NumberUtils.sin(angle / DEG_TO_RAD));
        };
        /**
         * @language en_US
         * Subtracts the coordinates of another point from the coordinates of this point to create a new point.
         * @param v The point to be subtracted.
         * @returns The new point.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????????????????????????????????
         * @param v ??????????????????
         * @returns ?????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.subtract = function (v) {
            return new Point(this.x - v.x, this.y - v.y);
        };
        /**
         * @language en_US
         * Returns a string that contains the values of the x and y coordinates. The string has the form "(x=x, y=y)", so calling the toString() method for a point at 23,17 would return "(x=23, y=17)".
         * @returns The string representation of the coordinates.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????? x ??? y ??????????????????????????????????????????????????? "(x=x, y=y)"??????????????? 23,17 ?????? toString() ??????????????? "(x=23, y=17)"???
         * @returns ?????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.toString = function () {
            return "(x=" + this.x + ", y=" + this.y + ")";
        };
        return Point;
    })(egret.HashObject);
    egret.Point = Point;
    egret.registerClass(Point,"egret.Point");
    if (DEBUG) {
        egret.$markReadOnly(Point, "length");
    }
    /**
     * @private
     * ?????????????????????????????????????????????????????????
     */
    egret.$TempPoint = new Point();
})(egret || (egret = {}));
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
/// <reference path="../geom/point.ts" />
var egret;
(function (egret) {
    var localPoint = new egret.Point();
    /**
     * @language en_US
     * The TouchEvent class lets you handle events on devices that detect user contact with the device (such as a finger
     * on a touch screen).When a user interacts with a device such as a mobile phone or tablet with a touch screen, the
     * user typically touches the screen with his or her fingers or a pointing device. You can develop applications that
     * respond to basic touch events (such as a single finger tap) with the TouchEvent class. Create event listeners using
     * the event types defined in this class.
     * Note: When objects are nested on the display list, touch events target the deepest possible nested object that is
     * visible in the display list. This object is called the target node. To have a target node's ancestor (an object
     * containing the target node in the display list) receive notification of a touch event, use EventDispatcher.addEventListener()
     * on the ancestor node with the type parameter set to the specific touch event you want to detect.
     *
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/events/TouchEvent.ts
     */
    /**
     * @language zh_CN
     * ?????? TouchEvent ????????????????????????????????????????????????????????????????????????????????????
     * ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? TouchEvent
     * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * ?????????????????????????????????????????????????????? EventDispatcher.on() ?????? type ????????????????????????????????????????????????
     *
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/events/TouchEvent.ts
     */
    var TouchEvent = (function (_super) {
        __extends(TouchEvent, _super);
        /**
         * @language en_US
         * Creates an Event object that contains information about touch events.
         * @param type  The type of the event, accessible as Event.type.
         * @param bubbles  Determines whether the Event object participates in the bubbling stage of the event flow. The default value is false.
         * @param cancelable Determines whether the Event object can be canceled. The default values is false.
         * @param stageX The horizontal coordinate at which the event occurred in global Stage coordinates.
         * @param stageY The vertical coordinate at which the event occurred in global Stage coordinates.
         * @param touchPointID A unique identification number assigned to the touch point.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????? TouchEvent ???????????????????????????Touch???????????????
         * @param type ?????????????????????????????? Event.type ?????????
         * @param bubbles ?????? Event ????????????????????????????????????????????????????????? false???
         * @param cancelable ???????????????????????? Event ????????????????????? false???
         * @param stageX ?????????????????????????????????????????????????????????
         * @param stageY ?????????????????????????????????????????????????????????
         * @param touchPointID ????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        function TouchEvent(type, bubbles, cancelable, stageX, stageY, touchPointID) {
            _super.call(this, type, bubbles, cancelable);
            this.targetChanged = true;
            /**
             * @language en_US
             * Whether the touch is pressed (true) or not pressed (false).
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????? (true) ??????????????? (false)???
             * @version Egret 2.4
             * @platform Web,Native
             */
            this.touchDown = false;
            this.$initTo(stageX, stageY, touchPointID);
        }
        var d = __define,c=TouchEvent;p=c.prototype;
        /**
         * @private
         */
        p.$initTo = function (stageX, stageY, touchPointID) {
            this.touchPointID = +touchPointID || 0;
            this.$stageX = +stageX || 0;
            this.$stageY = +stageY || 0;
        };
        d(p, "stageX"
            /**
             * @language en_US
             * The horizontal coordinate at which the event occurred in global Stage coordinates.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$stageX;
            }
        );
        d(p, "stageY"
            /**
             * @language en_US
             * The vertical coordinate at which the event occurred in global Stage coordinates.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$stageY;
            }
        );
        d(p, "localX"
            /**
             * @language en_US
             * The horizontal coordinate at which the event occurred relative to the display object.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                if (this.targetChanged) {
                    this.getLocalXY();
                }
                return this._localX;
            }
        );
        d(p, "localY"
            /**
             * @language en_US
             * The vertical coordinate at which the event occurred relative to the display object.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                if (this.targetChanged) {
                    this.getLocalXY();
                }
                return this._localY;
            }
        );
        /**
         * @private
         */
        p.getLocalXY = function () {
            this.targetChanged = false;
            var m = this.$target.$getInvertedConcatenatedMatrix();
            m.transformPoint(this.$stageX, this.$stageY, localPoint);
            this._localX = localPoint.x;
            this._localY = localPoint.y;
        };
        p.$setTarget = function (target) {
            this.$target = target;
            this.targetChanged = !!target;
            return true;
        };
        /**
         * @language en_US
         * Instructs Egret runtime to render after processing of this event completes, if the display list has been modified.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.updateAfterEvent = function () {
            egret.sys.$requestRenderingFlag = true;
        };
        /**
         * @language en_US
         * uses a specified target to dispatchEvent an event. Using this method can reduce the number of
         * reallocate event objects, which allows you to get better code execution performance.
         * @param target the event target
         * @param type  The type of the event, accessible as Event.type.
         * @param bubbles  Determines whether the Event object participates in the bubbling stage of the event flow. The default value is false.
         * @param cancelable Determines whether the Event object can be canceled. The default values is false.
         * @param stageX The horizontal coordinate at which the event occurred in global Stage coordinates.
         * @param stageY The vertical coordinate at which the event occurred in global Stage coordinates.
         * @param touchPointID A unique identification number (as an int) assigned to the touch point.
         *
         * @see egret.Event.create()
         * @see egret.Event.release()
         *
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????EventDispatcher???????????????Event????????????????????????????????????????????????????????????????????????????????????
         * @param target ??????????????????
         * @param type ?????????????????????????????? Event.type ?????????
         * @param bubbles ?????? Event ????????????????????????????????????????????????????????? false???
         * @param cancelable ???????????????????????? Event ????????????????????? false???
         * @param stageX ?????????????????????????????????????????????????????????
         * @param stageY ?????????????????????????????????????????????????????????
         * @param touchPointID ????????????????????????????????????
         *
         * @see egret.Event.create()
         * @see egret.Event.release()
         *
         * @version Egret 2.4
         * @platform Web,Native
         */
        TouchEvent.dispatchTouchEvent = function (target, type, bubbles, cancelable, stageX, stageY, touchPointID, touchDown) {
            if (touchDown === void 0) { touchDown = false; }
            if (!bubbles && !target.hasEventListener(type)) {
                return true;
            }
            var event = egret.Event.create(TouchEvent, type, bubbles, cancelable);
            event.$initTo(stageX, stageY, touchPointID);
            event.touchDown = touchDown;
            var result = target.dispatchEvent(event);
            egret.Event.release(event);
            return result;
        };
        /**
         * @language en_US
         * Dispatched when the user touches the device, and is continuously dispatched until the point of contact is removed.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        TouchEvent.TOUCH_MOVE = "touchMove";
        /**
         * @language en_US
         * Dispatched when the user first contacts a touch-enabled device (such as touches a finger to a mobile phone or tablet with a touch screen).
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        TouchEvent.TOUCH_BEGIN = "touchBegin";
        /**
         * @language en_US
         * Dispatched when the user removes contact with a touch-enabled device (such as lifts a finger off a mobile phone
         * or tablet with a touch screen).
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        TouchEvent.TOUCH_END = "touchEnd";
        /**
         * @language en_US
         * Dispatched when the user lifts the point of contact over the same DisplayObject instance on which the contact
         * was initiated on a touch-enabled device.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????? DisplayObject ????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        TouchEvent.TOUCH_TAP = "touchTap";
        /**
         * @language en_US
         * Dispatched when the user lifts the point of contact over the different DisplayObject instance on which the contact
         * was initiated on a touch-enabled device (such as presses and releases a finger from a single point over a display
         * object on a mobile phone or tablet with a touch screen).
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????? DisplayObject ????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        TouchEvent.TOUCH_RELEASE_OUTSIDE = "touchReleaseOutside";
        /**
         * @deprecated
         * @version Egret 2.4
         * @platform Web,Native
         */
        TouchEvent.TOUCH_ROLL_OUT = "touchRollOut";
        /**
         * @deprecated
         * @version Egret 2.4
         * @platform Web,Native
         */
        TouchEvent.TOUCH_ROLL_OVER = "touchRollOver";
        return TouchEvent;
    })(egret.Event);
    egret.TouchEvent = TouchEvent;
    egret.registerClass(TouchEvent,"egret.TouchEvent");
    if (DEBUG) {
        egret.$markReadOnly(TouchEvent, "stageX");
        egret.$markReadOnly(TouchEvent, "stageY");
        egret.$markReadOnly(TouchEvent, "localX");
        egret.$markReadOnly(TouchEvent, "localY");
    }
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    egret.ExternalInterface;
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @private
     * @version Egret 2.4
     * @platform Web,Native
     */
    var Filter = (function (_super) {
        __extends(Filter, _super);
        function Filter() {
            _super.apply(this, arguments);
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            this.type = null;
        }
        var d = __define,c=Filter;p=c.prototype;
        return Filter;
    })(egret.HashObject);
    egret.Filter = Filter;
    egret.registerClass(Filter,"egret.Filter");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @private
     * @version Egret 2.4
     * @platform Web,Native
     */
    var BlurFilter = (function (_super) {
        __extends(BlurFilter, _super);
        /**
         * @version Egret 2.4
         * @platform Web,Native
         */
        function BlurFilter(blurX, blurY) {
            _super.call(this);
            this.blurX = blurX;
            this.blurY = blurY;
            this.type = "blur";
        }
        var d = __define,c=BlurFilter;p=c.prototype;
        return BlurFilter;
    })(egret.Filter);
    egret.BlurFilter = BlurFilter;
    egret.registerClass(BlurFilter,"egret.BlurFilter");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @private
     * @version Egret 2.4
     * @platform Web,Native
     */
    var ColorMatrixFilter = (function (_super) {
        __extends(ColorMatrixFilter, _super);
        /**
         * @version Egret 2.4
         * @platform Web,Native
         */
        function ColorMatrixFilter(matrix) {
            if (matrix === void 0) { matrix = null; }
            _super.call(this);
            /**
             * @private
             */
            this.$matrix = [];
            /**
             * @private
             */
            this.matrix2 = [];
            this.type = "colorTransform";
            this.setMatrix(matrix);
        }
        var d = __define,c=ColorMatrixFilter;p=c.prototype;
        d(p, "matrix"
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                for (var i = 0; i < 20; i++) {
                    this.matrix2[i] = this.$matrix[i];
                }
                return this.matrix2;
            }
            ,function (value) {
                this.setMatrix(value);
            }
        );
        /**
         * @private
         *
         * @param value
         */
        p.setMatrix = function (value) {
            for (var i = 0; i < 20; i++) {
                this.$matrix[i] = (value && value[i]) || 0;
            }
        };
        return ColorMatrixFilter;
    })(egret.Filter);
    egret.ColorMatrixFilter = ColorMatrixFilter;
    egret.registerClass(ColorMatrixFilter,"egret.ColorMatrixFilter");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @class egret.GlowFilter
     * @classdesc
     * ?????? GlowFilter ??????????????????????????????????????????????????????????????? distance ??? angle ??????????????? 0 ????????????????????????????????????????????????
     * @extends egret.Filter
     * @private
     * @version Egret 2.4
     * @platform Web,Native
     */
    var GlowFilter = (function (_super) {
        __extends(GlowFilter, _super);
        /**
         * ????????? GlowFilter ??????
         * @method egret.GlowFilter#constructor
         * @param color {number} ??????????????????????????????????????? 0xRRGGBB??????????????? 0xFF0000???
         * @param alpha {number} ????????? Alpha ??????????????????????????? 0 ??? 1????????????0.25 ????????????????????? 25%???
         * @param blurX {number} ?????????????????????????????? 0 ??? 255???????????????
         * @param blurY {number} ?????????????????????????????? 0 ??? 255???????????????
         * @param strength {number} ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? 0 ??? 255???
         * @param quality {number} ????????????????????????
         * @param inner {boolean} ??????????????????????????????????????? true ????????????????????????????????? false ??????????????????????????????????????????????????????????????????????????????
         * @param knockout {number} ????????????????????????????????????????????? true ????????????????????????????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        function GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout) {
            if (color === void 0) { color = 0xFF0000; }
            if (alpha === void 0) { alpha = 1.0; }
            if (blurX === void 0) { blurX = 6.0; }
            if (blurY === void 0) { blurY = 6.0; }
            if (strength === void 0) { strength = 2; }
            if (quality === void 0) { quality = 1; }
            if (inner === void 0) { inner = false; }
            if (knockout === void 0) { knockout = false; }
            _super.call(this);
            this.color = color;
            this.alpha = alpha;
            this.blurX = blurX;
            this.blurY = blurY;
            this.strength = strength;
            this.quality = quality;
            this.inner = inner;
            this.knockout = knockout;
            this.type = "glow";
            this.$blue = color & 0x0000FF;
            this.$green = (color & 0x00ff00) >> 8;
            this.$red = color >> 16;
        }
        var d = __define,c=GlowFilter;p=c.prototype;
        return GlowFilter;
    })(egret.Filter);
    egret.GlowFilter = GlowFilter;
    egret.registerClass(GlowFilter,"egret.GlowFilter");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @class egret.DropShadowFilter
     * @classdesc
     * ????????? DropShadowFilter ?????????????????????????????????
     * @extends egret.GlowFilter
     * @private
     * @version Egret 2.4
     * @platform Web,Native
     */
    var DropShadowFilter = (function (_super) {
        __extends(DropShadowFilter, _super);
        /**
         * ????????? DropShadowFilter ??????
         * @method egret.GlowFilter#constructor
         * @param distance {number} ?????????????????????????????????????????????
         * @param angle {number} ??????????????????0 ??? 360 ??????????????????
         * @param color {number} ??????????????????????????????????????? 0xRRGGBB??????????????? 0xFF0000???
         * @param alpha {number} ????????? Alpha ??????????????????????????? 0 ??? 1????????????0.25 ????????????????????? 25%???
         * @param blurX {number} ?????????????????????????????? 0 ??? 255???????????????
         * @param blurY {number} ?????????????????????????????? 0 ??? 255???????????????
         * @param strength {number} ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? 0 ??? 255??????????????????
         * @param quality {number} ????????????????????????
         * @param inner {boolean} ??????????????????????????????????????? true ????????????????????????????????? false ??????????????????????????????????????????????????????????????????????????????
         * @param knockout {number} ????????????????????????????????????????????? true ????????????????????????????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        function DropShadowFilter(distance, angle, color, alpha, blurX, blurY, strength, quality, inner, knockout, hideObject) {
            if (distance === void 0) { distance = 4.0; }
            if (angle === void 0) { angle = 45; }
            if (color === void 0) { color = 0; }
            if (alpha === void 0) { alpha = 1.0; }
            if (blurX === void 0) { blurX = 4.0; }
            if (blurY === void 0) { blurY = 4.0; }
            if (strength === void 0) { strength = 1.0; }
            if (quality === void 0) { quality = 1; }
            if (inner === void 0) { inner = false; }
            if (knockout === void 0) { knockout = false; }
            if (hideObject === void 0) { hideObject = false; }
            _super.call(this, color, alpha, blurX, blurY, strength, quality, inner, knockout);
            this.distance = distance;
            this.angle = angle;
        }
        var d = __define,c=DropShadowFilter;p=c.prototype;
        return DropShadowFilter;
    })(egret.GlowFilter);
    egret.DropShadowFilter = DropShadowFilter;
    egret.registerClass(DropShadowFilter,"egret.DropShadowFilter");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    var rectanglePool = [];
    /**
     * @language en_US
     * A Rectangle object is an area defined by its position, as indicated by its top-left corner point (x, y) and by its
     * width and its height.<br/>
     * The x, y, width, and height properties of the Rectangle class are independent of each other; changing the value of
     * one property has no effect on the others. However, the right and bottom properties are integrally related to those
     * four properties. For example, if you change the value of the right property, the value of the width property changes;
     * if you change the bottom property, the value of the height property changes.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/geom/Rectangle.ts
     */
    /**
     * @language zh_CN
     * Rectangle ????????????????????????????????????????????? (x, y) ????????????????????????????????????????????????<br/>
     * Rectangle ?????? x???y???width ??? height ????????????????????????????????????????????????????????????????????????
     * ?????????right ??? bottom ?????????????????????????????????????????????????????????????????? right ?????????????????? width
     * ?????????????????????????????????????????? bottom ???????????? height ??????????????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/geom/Rectangle.ts
     */
    var Rectangle = (function (_super) {
        __extends(Rectangle, _super);
        /**
         * @language en_US
         * Creates a new Rectangle object with the top-left corner specified by the x and y parameters and with the specified
         * width and height parameters.
         * @param x The x coordinate of the top-left corner of the rectangle.
         * @param y The y coordinate of the top-left corner of the rectangle.
         * @param width The width of the rectangle, in pixels.
         * @param height The height of the rectangle, in pixels.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????? Rectangle ???????????????????????? x ??? y ????????????????????????????????? width ??? height ?????????
         * @param x ?????????????????? x ?????????
         * @param y ?????????????????? y ?????????
         * @param width ??????????????????????????????????????????
         * @param height ??????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        function Rectangle(x, y, width, height) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            _super.call(this);
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        var d = __define,c=Rectangle;p=c.prototype;
        /**
         * @language en_US
         * Releases a rectangle instance to the object pool.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????Rectangle??????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Rectangle.release = function (rect) {
            if (!rect) {
                return;
            }
            rectanglePool.push(rect);
        };
        /**
         * @language en_US
         * get a rectangle instance from the object pool or create a new one.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????Rectangle?????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Rectangle.create = function () {
            var rect = rectanglePool.pop();
            if (!rect) {
                rect = new Rectangle();
            }
            return rect;
        };
        d(p, "right"
            /**
             * @language en_US
             * The sum of the x and width properties.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * x ??? width ???????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.x + this.width;
            }
            ,function (value) {
                this.width = value - this.x;
            }
        );
        d(p, "bottom"
            /**
             * @language en_US
             * The sum of the y and height properties.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * y ??? height ???????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.y + this.height;
            }
            ,function (value) {
                this.height = value - this.y;
            }
        );
        d(p, "left"
            /**
             * @language en_US
             * The x coordinate of the top-left corner of the rectangle. Changing the left property of a Rectangle object has
             * no effect on the y and height properties. However it does affect the width property, whereas changing the x value
             * does not affect the width property.
             * The value of the left property is equal to the value of the x property.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????? x ??????????????? Rectangle ????????? left ????????? y ??? height ?????????????????????????????????????????? width ?????????????????? x ??????????????? width ?????????
             * left ?????????????????? x ???????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.x;
            }
            ,function (value) {
                this.width += this.x - value;
                this.x = value;
            }
        );
        d(p, "top"
            /**
             * @language en_US
             * The y coordinate of the top-left corner of the rectangle. Changing the top property of a Rectangle object has
             * no effect on the x and width properties. However it does affect the height property, whereas changing the y
             * value does not affect the height property.<br/>
             * The value of the top property is equal to the value of the y property.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????? y ??????????????? Rectangle ????????? top ????????? x ??? width ?????????????????????????????????????????? height ?????????????????? y ??????????????? height ?????????<br/>
             * top ?????????????????? y ???????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.y;
            }
            ,function (value) {
                this.height += this.y - value;
                this.y = value;
            }
        );
        d(p, "topLeft"
            /**
             * @language en_US
             * The location of the Rectangle object's top-left corner, determined by the x and y coordinates of the point.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????? x ??? y ??????????????? Rectangle ???????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return new egret.Point(this.left, this.top);
            }
            ,function (value) {
                this.top = value.y;
                this.left = value.x;
            }
        );
        d(p, "bottomRight"
            /**
             * @language en_US
             * The location of the Rectangle object's bottom-right corner, determined by the values of the right and bottom properties.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??? right ??? bottom ????????????????????? Rectangle ??????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return new egret.Point(this.right, this.bottom);
            }
            ,function (value) {
                this.bottom = value.y;
                this.right = value.x;
            }
        );
        /**
         * @language en_US
         * Copies all of rectangle data from the source Rectangle object into the calling Rectangle object.
         * @param sourceRect The Rectangle object from which to copy the data.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????? Rectangle ???????????????????????????????????????????????? Rectangle ????????????
         * @param sourceRect ???????????????????????? Rectangle ?????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.copyFrom = function (sourceRect) {
            this.x = sourceRect.x;
            this.y = sourceRect.y;
            this.width = sourceRect.width;
            this.height = sourceRect.height;
            return this;
        };
        /**
         * @language en_US
         * Sets the members of Rectangle to the specified values
         * @param x The x coordinate of the top-left corner of the rectangle.
         * @param y The y coordinate of the top-left corner of the rectangle.
         * @param width The width of the rectangle, in pixels.
         * @param height The height of the rectangle, in pixels.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??? Rectangle ???????????????????????????
         * @param x ?????????????????? x ?????????
         * @param y ?????????????????? y ?????????
         * @param width ??????????????????????????????????????????
         * @param height ??????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.setTo = function (x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            return this;
        };
        /**
         * @language en_US
         * Determines whether the specified point is contained within the rectangular region defined by this Rectangle object.
         * @param x The x coordinate (horizontal position) of the point.
         * @param y The y coordinate (vertical position) of the point.
         * @returns A value of true if the Rectangle object contains the specified point; otherwise false.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????? Rectangle ?????????????????????????????????????????????????????????
         * @param x ????????????x???
         * @param y ????????????y???
         * @returns ???????????????????????????????????????true??????????????????false
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.contains = function (x, y) {
            return this.x <= x && this.x + this.width >= x && this.y <= y && this.y + this.height >= y;
        };
        /**
         * @language en_US
         * If the Rectangle object specified in the toIntersect parameter intersects with this Rectangle object, returns
         * the area of intersection as a Rectangle object. If the rectangles do not intersect, this method returns an empty
         * Rectangle object with its properties set to 0.
         * @param toIntersect The Rectangle object to compare against to see if it intersects with this Rectangle object.
         * @returns A Rectangle object that equals the area of intersection. If the rectangles do not intersect, this method
         * returns an empty Rectangle object; that is, a rectangle with its x, y, width, and height properties set to 0.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????? toIntersect ?????????????????? Rectangle ???????????? Rectangle ?????????????????????????????????????????? Rectangle ?????????????????????????????????
         * ?????????????????????????????? Rectangle ??????????????????????????? 0???
         * @param toIntersect ??????????????????????????????????????? Rectangle ??????????????? Rectangle ?????????
         * @returns ????????????????????? Rectangle ?????????????????????????????????????????????????????????????????? Rectangle ?????????????????? x???y???width ???
         * height ?????????????????? 0 ????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.intersection = function (toIntersect) {
            return this.clone().$intersectInPlace(toIntersect);
        };
        /**
         * @language en_US
         * Increases the size of the Rectangle object by the specified amounts, in pixels.
         * The center point of the Rectangle object stays the same, and its size increases to the left and right by the dx value, and to the top and the bottom by the dy value.
         * @param dx The value to be added to the left and the right of the Rectangle object.
         * @param dy The value to be added to the top and the bottom of the Rectangle.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????? Rectangle ???????????????????????????????????????
         * ?????? Rectangle ????????????????????????????????? dx ???????????????????????????????????? dy ??????????????????????????????
         * @param dx Rectangle ???????????????????????????
         * @param dy Rectangle ???????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.inflate = function (dx, dy) {
            this.x -= dx;
            this.width += 2 * dx;
            this.y -= dy;
            this.height += 2 * dy;
        };
        /**
         * @private
         */
        p.$intersectInPlace = function (clipRect) {
            var x0 = this.x;
            var y0 = this.y;
            var x1 = clipRect.x;
            var y1 = clipRect.y;
            var l = Math.max(x0, x1);
            var r = Math.min(x0 + this.width, x1 + clipRect.width);
            if (l <= r) {
                var t = Math.max(y0, y1);
                var b = Math.min(y0 + this.height, y1 + clipRect.height);
                if (t <= b) {
                    this.setTo(l, t, r - l, b - t);
                    return this;
                }
            }
            this.setEmpty();
            return this;
        };
        /**
         * @language en_US
         * Determines whether the object specified in the toIntersect parameter intersects with this Rectangle object.
         * This method checks the x, y, width, and height properties of the specified Rectangle object to see if it
         * intersects with this Rectangle object.
         * @param toIntersect The Rectangle object to compare against this Rectangle object.
         * @returns A value of true if the specified object intersects with this Rectangle object; otherwise false.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????? toIntersect ???????????????????????????????????? Rectangle ??????????????????????????????????????? Rectangle
         * ????????? x???y???width ??? height ????????????????????????????????? Rectangle ???????????????
         * @param toIntersect ????????? Rectangle ??????????????? Rectangle ?????????
         * @returns ?????????????????????????????????true???????????????false
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.intersects = function (toIntersect) {
            return Math.max(this.x, toIntersect.x) <= Math.min(this.right, toIntersect.right) && Math.max(this.y, toIntersect.y) <= Math.min(this.bottom, toIntersect.bottom);
        };
        /**
         * @language en_US
         * Determines whether or not this Rectangle object is empty.
         * @returns A value of true if the Rectangle object's width or height is less than or equal to 0; otherwise false.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????? Rectangle ?????????????????????
         * @returns ?????? Rectangle ???????????????????????????????????? 0???????????? true ?????????????????? false???
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.isEmpty = function () {
            return this.width <= 0 || this.height <= 0;
        };
        /**
         * @language en_US
         * Sets all of the Rectangle object's properties to 0. A Rectangle object is empty if its width or height is less than or equal to 0.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??? Rectangle ?????????????????????????????? 0???
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.setEmpty = function () {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
        };
        /**
         * @language en_US
         * Returns a new Rectangle object with the same values for the x, y, width, and height properties as the original Rectangle object.
         * @returns A new Rectangle object with the same values for the x, y, width, and height properties as the original Rectangle object.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????? Rectangle ???????????? x???y???width ??? height ????????????????????? Rectangle ???????????????????????????
         * @returns ?????? Rectangle ???????????? x???y???width ??? height ????????????????????? Rectangle ???????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.clone = function () {
            return new Rectangle(this.x, this.y, this.width, this.height);
        };
        /**
         * @language en_US
         * Determines whether the specified point is contained within the rectangular region defined by this Rectangle object.
         * This method is similar to the Rectangle.contains() method, except that it takes a Point object as a parameter.
         * @param point The point, as represented by its x and y coordinates.
         * @returns A value of true if the Rectangle object contains the specified point; otherwise false.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????? Rectangle ?????????????????????????????????????????????????????????
         * ???????????? Rectangle.contains() ????????????????????????????????? Point ?????????????????????
         * @param point ???????????????
         * @returns ?????????????????????true???????????????false
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.containsPoint = function (point) {
            if (this.x < point.x && this.x + this.width > point.x && this.y < point.y && this.y + this.height > point.y) {
                return true;
            }
            return false;
        };
        /**
         * @language en_US
         * Determines whether the Rectangle object specified by the rect parameter is contained within this Rectangle object.
         * A Rectangle object is said to contain another if the second Rectangle object falls entirely within the boundaries of the first.
         * @param rect The Rectangle object being checked.
         * @returns A value of true if the Rectangle object that you specify is contained by this Rectangle object; otherwise false.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????? Rectangle ???????????????????????? rect ??????????????? Rectangle ?????????
         * ???????????? Rectangle ???????????????????????? Rectangle ????????????????????????????????? Rectangle ??????????????? Rectangle???
         * @param rect ???????????? Rectangle ??????
         * @returns ????????? Rectangle ???????????????????????? Rectangle ?????????????????? true ?????????????????? false???
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.containsRect = function (rect) {
            var r1 = rect.x + rect.width;
            var b1 = rect.y + rect.height;
            var r2 = this.x + this.width;
            var b2 = this.y + this.height;
            return (rect.x >= this.x) && (rect.x < r2) && (rect.y >= this.y) && (rect.y < b2) && (r1 > this.x) && (r1 <= r2) && (b1 > this.y) && (b1 <= b2);
        };
        /**
         * @language en_US
         * Determines whether the object specified in the toCompare parameter is equal to this Rectangle object.
         * This method compares the x, y, width, and height properties of an object against the same properties of this Rectangle object.
         * @param The rectangle to compare to this Rectangle object.
         * @returns A value of true if the object has exactly the same values for the x, y, width, and height properties as this Rectangle object; otherwise false.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????? toCompare ??????????????????????????????????????? Rectangle ?????????
         * ??????????????????????????? x???y???width ??? height ???????????? Rectangle ?????????????????????????????????????????????
         * @param toCompare ????????? Rectangle ??????????????????????????????
         * @returns ???????????????????????? Rectangle ????????????????????? x???y???width ??? height ????????????????????? true ?????????????????? false???
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.equals = function (toCompare) {
            if (this === toCompare) {
                return true;
            }
            return this.x === toCompare.x && this.y === toCompare.y && this.width === toCompare.width && this.height === toCompare.height;
        };
        /**
         * @language en_US
         * Increases the size of the Rectangle object. This method is similar to the Rectangle.inflate() method except it takes a Point object as a parameter.
         * @param point ??? Point ????????? x ?????????????????? Rectangle ????????????????????????y ?????????????????? Rectangle ????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????? Rectangle ?????????????????????????????? Rectangle.inflate() ????????????????????????????????? Point ?????????????????????
         * @param point The x property of this Point object is used to increase the horizontal dimension of the Rectangle object. The y property is used to increase the vertical dimension of the Rectangle object.
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.inflatePoint = function (point) {
            this.inflate(point.x, point.y);
        };
        /**
         * @language en_US
         * Adjusts the location of the Rectangle object, as determined by its top-left corner, by the specified amounts.
         * @param dx Moves the x value of the Rectangle object by this amount.
         * @param dy Moves the y value of the Rectangle object by this amount.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????? Rectangle ?????????????????????????????????????????????
         * @param dx ??? Rectangle ????????? x ?????????????????????
         * @param dy ??? Rectangle ????????? t ?????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.offset = function (dx, dy) {
            this.x += dx;
            this.y += dy;
        };
        /**
         * @language en_US
         * Adjusts the location of the Rectangle object using a Point object as a parameter. This method is similar to the Rectangle.offset() method, except that it takes a Point object as a parameter.
         * @param point A Point object to use to offset this Rectangle object.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??? Point ??????????????????????????? Rectangle ?????????????????????????????? Rectangle.offset() ????????????????????????????????? Point ?????????????????????
         * @param point ?????????????????? Rectangle ????????? Point ?????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.offsetPoint = function (point) {
            this.offset(point.x, point.y);
        };
        /**
         * @language en_US
         * Builds and returns a string that lists the horizontal and vertical positions and the width and height of the Rectangle object.
         * @returns A string listing the value of each of the following properties of the Rectangle object: x, y, width, and height.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????? Rectangle ????????????????????????????????????????????????????????????
         * @returns ?????????????????????????????? Rectangle ????????????????????????????????????x???y???width ??? height???
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.toString = function () {
            return "(x=" + this.x + ", y=" + this.y + ", width=" + this.width + ", height=" + this.height + ")";
        };
        /**
         * @language en_US
         * Adds two rectangles together to create a new Rectangle object, by filling in the horizontal and vertical space between the two rectangles.
         * @param toUnion A Rectangle object to add to this Rectangle object.
         * @returns A new Rectangle object that is the union of the two rectangles.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????? Rectangle ?????????
         * @param toUnion ??????????????? Rectangle ????????? Rectangle ?????????
         * @returns ????????????????????????????????? Rectangle ?????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.union = function (toUnion) {
            var result = this.clone();
            if (toUnion.isEmpty()) {
                return result;
            }
            if (result.isEmpty()) {
                result.copyFrom(toUnion);
                return result;
            }
            var l = Math.min(result.x, toUnion.x);
            var t = Math.min(result.y, toUnion.y);
            result.setTo(l, t, Math.max(result.right, toUnion.right) - l, Math.max(result.bottom, toUnion.bottom) - t);
            return result;
        };
        /**
         * @private
         */
        p.$getBaseWidth = function (angle) {
            var u = Math.abs(Math.cos(angle));
            var v = Math.abs(Math.sin(angle));
            return u * this.width + v * this.height;
        };
        /**
         * @private
         */
        p.$getBaseHeight = function (angle) {
            var u = Math.abs(Math.cos(angle));
            var v = Math.abs(Math.sin(angle));
            return v * this.width + u * this.height;
        };
        return Rectangle;
    })(egret.HashObject);
    egret.Rectangle = Rectangle;
    egret.registerClass(Rectangle,"egret.Rectangle");
    /**
     * @private
     * ?????????????????????????????????????????????????????????
     */
    egret.$TempRectangle = new Rectangle();
})(egret || (egret = {}));
var egret;
(function (egret) {
    egret.$locale_strings = egret.$locale_strings || {};
    egret.$locale_strings["en_US"] = egret.$locale_strings["en_US"] || {};
    var locale_strings = egret.$locale_strings["en_US"];
    //core
    locale_strings[1001] = "Could not find Egret entry class: {0}???";
    locale_strings[1002] = "Egret entry class '{0}' must inherit from egret.DisplayObject.";
    locale_strings[1003] = "Parameter {0} must be non-null.";
    locale_strings[1004] = "An object cannot be added as a child to one of it's children (or children's children, etc.).";
    locale_strings[1005] = "An object cannot be added as a child of itself.";
    locale_strings[1006] = "The supplied DisplayObject must be a child of the caller.";
    locale_strings[1007] = "An index specified for a parameter was out of range.";
    locale_strings[1008] = "Instantiate singleton error???singleton class {0} can not create multiple instances.";
    locale_strings[1009] = "the Class {0} cannot use the property \"{1}\"";
    locale_strings[1010] = "the property \"{1}\" of the Class \"{0}\" is readonly";
    locale_strings[1011] = "Stream Error. URL: {0}";
    locale_strings[1012] = "The type of parameter {0} must be Class.";
    locale_strings[1013] = "Variable assignment is NaN, please see the code!";
    locale_strings[1014] = "the constant \"{1}\" of the Class \"{0}\" is read-only";
    locale_strings[1022] = "{0} ArgumentError";
    locale_strings[1023] = "This method is not available in the ScrollView!";
    locale_strings[1025] = "end of the file";
    locale_strings[1026] = "! EncodingError The code point {0} could not be encoded.";
    locale_strings[1027] = "DecodingError";
    locale_strings[1028] = ". called injection is not configured rule: {0}, please specify configuration during its initial years of injection rule, and then call the corresponding single case.";
    locale_strings[1029] = "Function.prototype.bind - what is trying to be bound is not callable";
    locale_strings[1033] = "Photos can not be used across domains toDataURL to convert base64";
    locale_strings[1034] = "Music file decoding failed: \"{0}\", please use the standard conversion tool reconversion under mp3.";
    locale_strings[1035] = "Native does not support this feature!";
    locale_strings[1036] = "Sound has stopped, please recall Sound.play () to play the sound!";
    locale_strings[1037] = "Non-load the correct blob!";
    //gui
    locale_strings[3000] = "Theme configuration file failed to load: {0}";
    locale_strings[3001] = "Cannot find the skin name which is configured in Theme: {0}";
    locale_strings[3002] = "Index:\"{0}\" is out of the collection element index range";
    locale_strings[3003] = "Cannot be available in this component. If this component is container, please continue to use";
    locale_strings[3004] = "addChild(){0}addElement() replace";
    locale_strings[3005] = "addChildAt(){0}addElementAt() replace";
    locale_strings[3006] = "removeChild(){0}removeElement() replace";
    locale_strings[3007] = "removeChildAt(){0}removeElementAt() replace";
    locale_strings[3008] = "setChildIndex(){0}setElementIndex() replace";
    locale_strings[3009] = "swapChildren(){0}swapElements() replace";
    locale_strings[3010] = "swapChildrenAt(){0}swapElementsAt() replace";
    locale_strings[3011] = "Index:\"{0}\" is out of the visual element index range";
    locale_strings[3012] = "This method is not available in Scroller component!";
    locale_strings[3013] = "UIStage is GUI root container, and only one such instant is in the display list???";
    //socket
    locale_strings[3100] = "Current browser does not support WebSocket";
    locale_strings[3101] = "Please connect Socket firstly";
    locale_strings[3102] = "Please set the type of binary type";
    //db
    locale_strings[4000] = "An Bone cannot be added as a child to itself or one of its children (or children's children, etc.)";
    locale_strings[4001] = "Abstract class can not be instantiated!";
    locale_strings[4002] = "Unnamed data!";
    locale_strings[4003] = "Nonsupport version!";
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @private
     */
    egret.$locale_strings = egret.$locale_strings || {};
    /**
     * @private
     */
    egret.$language = "en_US";
})(egret || (egret = {}));
var egret;
(function (egret) {
    var sys;
    (function (sys) {
        /**
         * @private
         * ???????????????????????????
         * @param code ???????????????????????????
         * @param args ??????????????????{0}?????????????????????
         * @returns ???????????????????????????
         */
        function tr(code) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var text = egret.$locale_strings[egret.$language][code];
            if (!text) {
                return "{" + code + "}";
            }
            var length = args.length;
            for (var i = 0; i < length; i++) {
                text = text.replace("{" + i + "}", args[i]);
            }
            return text;
        }
        sys.tr = tr;
    })(sys = egret.sys || (egret.sys = {}));
})(egret || (egret = {}));
var egret;
(function (egret) {
    egret.$locale_strings = egret.$locale_strings || {};
    egret.$locale_strings["zh_CN"] = egret.$locale_strings["zh_CN"] || {};
    var locale_strings = egret.$locale_strings["zh_CN"];
    //core
    locale_strings[1001] = "?????????Egret?????????: {0}???";
    locale_strings[1002] = "Egret????????? {0} ???????????????egret.DisplayObject???";
    locale_strings[1003] = "?????? {0} ????????? null???";
    locale_strings[1004] = "?????????????????????????????????????????????????????????????????????????????????????????????";
    locale_strings[1005] = "????????????????????????????????????????????????";
    locale_strings[1006] = "????????? DisplayObject ??????????????????????????????";
    locale_strings[1007] = "??????????????????????????????????????????";
    locale_strings[1008] = "???????????????????????????????????????????????? {0} ?????????";
    locale_strings[1009] = "??? {0} ????????????????????? {1}";
    locale_strings[1010] = "??? {0} ?????? {1} ????????????";
    locale_strings[1011] = "????????????URL: {0}";
    locale_strings[1012] = "?????? {0} ?????????????????? Class???";
    locale_strings[1013] = "???????????????NaN?????????????????????";
    locale_strings[1014] = "??? {0} ?????? {1} ????????????";
    locale_strings[1022] = "{0} ArgumentError";
    locale_strings[1023] = "????????????ScrollView????????????!";
    locale_strings[1025] = "???????????????";
    locale_strings[1026] = "EncodingError! The code point {0} could not be encoded.";
    locale_strings[1027] = "DecodingError";
    locale_strings[1028] = "?????????????????????????????????:{0}??? ?????????????????????????????????????????????????????????????????????????????????";
    locale_strings[1029] = "Function.prototype.bind - what is trying to be bound is not callable";
    locale_strings[1033] = "???????????????????????????toDataURL????????????base64";
    locale_strings[1034] = "???????????????????????????\"{0}\"????????????????????????????????????????????????mp3???";
    locale_strings[1035] = "Native ???????????????????????????";
    locale_strings[1036] = "????????????????????????????????? Sound.play() ??????????????????";
    locale_strings[1037] = "????????????blob?????????";
    //RES 2000-2999
    //gui
    locale_strings[3000] = "??????????????????????????????: {0}";
    locale_strings[3001] = "??????????????????????????????????????????: {0}";
    locale_strings[3002] = "??????:\"{0}\"??????????????????????????????";
    locale_strings[3003] = "???????????????????????????????????????????????????????????????";
    locale_strings[3004] = "addChild(){0}addElement()??????";
    locale_strings[3005] = "addChildAt(){0}addElementAt()??????";
    locale_strings[3006] = "removeChild(){0}removeElement()??????";
    locale_strings[3007] = "removeChildAt(){0}removeElementAt()??????";
    locale_strings[3008] = "setChildIndex(){0}setElementIndex()??????";
    locale_strings[3009] = "swapChildren(){0}swapElements()??????";
    locale_strings[3010] = "swapChildrenAt(){0}swapElementsAt()??????";
    locale_strings[3011] = "??????:\"{0}\"??????????????????????????????";
    locale_strings[3012] = "????????????Scroller??????????????????!";
    locale_strings[3013] = "UIStage???GUI?????????????????????????????????????????????????????????";
    //socket
    locale_strings[3100] = "????????????????????????WebSocket";
    locale_strings[3101] = "????????????WebSocket";
    locale_strings[3102] = "????????????type??????????????????";
    //db
    locale_strings[4000] = "An Bone cannot be added as a child to itself or one of its children (or children's children, etc.)";
    locale_strings[4001] = "Abstract class can not be instantiated!";
    locale_strings[4002] = "Unnamed data!";
    locale_strings[4003] = "Nonsupport version!";
})(egret || (egret = {}));
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
/**
 * @version Egret 2.4
 * @platform Web,Native
 * @includeExample egret/localStorage/localStorage.ts
 */
var egret;
(function (egret) {
    var localStorage;
    (function (localStorage) {
        /**
         * @language en_US
         * Read data
         * @param key {string} Name of the key to be read
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????
         * @param key {string} ?????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        localStorage.getItem;
        /**
         * @language en_US
         * Save data
         * @param key {string} Name of the key to be saved
         * @param value {string} Value to be saved
         * @returns {boolean} Whether data is saved successfully
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????
         * @param key {string} ?????????????????????
         * @param value {string} ???????????????
         * @returns {boolean} ????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        localStorage.setItem;
        /**
         * @language en_US
         * Delete data
         * @param key {string} Name of the key to be deleted
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????
         * @param key {string} ?????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        localStorage.removeItem;
        /**
         * @language en_US
         * Clear all data
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        localStorage.clear;
    })(localStorage = egret.localStorage || (egret.localStorage = {}));
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @copy egret.Sound
     */
    egret.Sound;
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @copy egret.Video
     */
    egret.Video;
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    var native;
    (function (native) {
        var className = "egret.BitmapData";
        /**
         * @private
         * ?????? Image???Canvas???Video ??? Egret ?????????????????? BitmapData ?????????
         */
        function toBitmapData(data) {
            data["hashCode"] = data["$hashCode"] = egret.$hashCount++;
            return data;
        }
        native.toBitmapData = toBitmapData;
    })(native = egret.native || (egret.native = {}));
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @private
     * @version Egret 2.4
     * @platform Web,Native
     */
    var PromiseObject = (function () {
        /**
         * @version Egret 2.4
         * @platform Web,Native
         */
        function PromiseObject() {
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            this.onSuccessFunc = null;
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            this.onSuccessThisObject = null;
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            this.onErrorFunc = null;
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            this.onErrorThisObject = null;
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            this.downloadingSizeFunc = null;
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            this.downloadingSizeThisObject = null;
        }
        var d = __define,c=PromiseObject;p=c.prototype;
        /**
         *
         * @version Egret 2.4
         * @platform Web,Native
         */
        PromiseObject.create = function () {
            if (PromiseObject.promiseObjectList.length) {
                return PromiseObject.promiseObjectList.pop();
            }
            else {
                return new egret.PromiseObject();
            }
        };
        /**
         * @private
         *
         * @param args
         */
        p.onSuccess = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (this.onSuccessFunc) {
                this.onSuccessFunc.apply(this.onSuccessThisObject, args);
            }
            this.destroy();
        };
        /**
         * @private
         *
         * @param args
         */
        p.onError = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (this.onErrorFunc) {
                this.onErrorFunc.apply(this.onErrorThisObject, args);
            }
            this.destroy();
        };
        /**
         * @private
         *
         * @param args
         */
        p.downloadingSize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (this.downloadingSizeFunc) {
                this.downloadingSizeFunc.apply(this.downloadingSizeThisObject, args);
            }
        };
        /**
         * @private
         *
         */
        p.destroy = function () {
            this.onSuccessFunc = undefined;
            this.onSuccessThisObject = undefined;
            this.onErrorFunc = undefined;
            this.onErrorThisObject = undefined;
            this.downloadingSizeFunc = undefined;
            this.downloadingSizeThisObject = undefined;
            PromiseObject.promiseObjectList.push(this);
        };
        /**
         * @private
         */
        PromiseObject.promiseObjectList = [];
        return PromiseObject;
    })();
    egret.PromiseObject = PromiseObject;
    egret.registerClass(PromiseObject,"egret.PromiseObject");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * The HttpMethod class provides values that specify whether the HttpRequest object should use the POST method
     * or the GET method when sending data to a server.
     * @see egret.HttpRequest
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * HttpRequestMethod ??????????????????????????????????????????????????????????????????????????????
     * HttpRequest ??????????????? POST ???????????? GET ?????????
     * @see egret.HttpRequest
     * @version Egret 2.4
     * @platform Web,Native
     */
    var HttpMethod = (function () {
        function HttpMethod() {
        }
        var d = __define,c=HttpMethod;p=c.prototype;
        /**
         * @language en_US
         * Specifies that the HttpRequest object is a GET.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????? HttpRequest ??????????????? GET???
         * @version Egret 2.4
         * @platform Web,Native
         */
        HttpMethod.GET = "GET";
        /**
         * @language en_US
         * Specifies that the HttpRequest object is a POST.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????? HttpRequest ??????????????? POST???
         * @version Egret 2.4
         * @platform Web,Native
         */
        HttpMethod.POST = "POST";
        return HttpMethod;
    })();
    egret.HttpMethod = HttpMethod;
    egret.registerClass(HttpMethod,"egret.HttpMethod");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * Creates a HttpRequest object.
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ???????????? HttpRequest ?????????
     * @version Egret 2.4
     * @platform Web,Native
     */
    egret.HttpRequest;
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * The HttpResponseType class provides values that specify how downloaded data is received.
     * @see egret.HttpRequest
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * URLLoaderDataFormat ??????????????????????????????????????????????????????????????????
     * @see egret.HttpRequest
     * @version Egret 2.4
     * @platform Web,Native
     */
    var HttpResponseType = (function () {
        function HttpResponseType() {
        }
        var d = __define,c=HttpResponseType;p=c.prototype;
        /**
         * @language en_US
         * Specifies that downloaded data is received as text. This is the default value of HttpRequest.responseType
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????HttpRequest.responseType?????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        HttpResponseType.TEXT = "text";
        /**
         * @language en_US
         * Specifies that downloaded data is received as raw binary data.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????ArrayBuffer?????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        HttpResponseType.ARRAY_BUFFER = "arraybuffer";
        return HttpResponseType;
    })();
    egret.HttpResponseType = HttpResponseType;
    egret.registerClass(HttpResponseType,"egret.HttpResponseType");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * Creates a ImageLoader object
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ???????????? ImageLoader ??????
     * @version Egret 2.4
     * @platform Web,Native
     */
    egret.ImageLoader;
})(egret || (egret = {}));
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
var egret;
(function (egret) {
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    var sys;
    (function (sys) {
        /**
         * @private
         * @param value
         * @returns
         * @version Egret 2.4
         * @platform Web,Native
         */
        function isUndefined(value) {
            return typeof value === "undefined";
        }
        sys.isUndefined = isUndefined;
        /**
         * @private
         * @param value
         * @returns
         * @version Egret 2.4
         * @platform Web,Native
         */
        function getNumber(value) {
            if (DEBUG) {
                if (isNaN(value)) {
                    egret.sys.tr(1013);
                }
            }
            return +value || 0;
            ;
        }
        sys.getNumber = getNumber;
    })(sys = egret.sys || (egret.sys = {}));
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @private
     * OrientationMode ??????????????????????????????????????????
     */
    var OrientationMode = (function () {
        function OrientationMode() {
        }
        var d = __define,c=OrientationMode;p=c.prototype;
        /**
         * @private
         * ????????????
         */
        OrientationMode.AUTO = "auto";
        /**
         * @private
         * ????????????
         */
        OrientationMode.PORTRAIT = "portrait";
        /**
         * @private
         * ????????????????????????????????????90???
         */
        OrientationMode.LANDSCAPE = "landscape";
        /**
         * @private
         * ????????????????????????????????????90???
         */
        OrientationMode.LANDSCAPE_FLIPPED = "landscapeFlipped";
        return OrientationMode;
    })();
    egret.OrientationMode = OrientationMode;
    egret.registerClass(OrientationMode,"egret.OrientationMode");
})(egret || (egret = {}));
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
/// <reference path="../display/Sprite.ts" />
var egret;
(function (egret) {
    var sys;
    (function (sys) {
        sys.$TempStage;
        /**
         * @private
         * Egret?????????
         */
        var Player = (function (_super) {
            __extends(Player, _super);
            /**
             * @private
             * ?????????????????????????????????
             */
            function Player(context, stage, entryClassName) {
                _super.call(this);
                /**
                 * @private
                 */
                this.isPlaying = false;
                if (DEBUG && !context) {
                    egret.$error(1003, "context");
                }
                this.entryClassName = entryClassName;
                this.stage = stage;
                this.screenDisplayList = this.createDisplayList(stage, context);
                if (DEBUG) {
                    this.showFPS = false;
                    this.showLog = false;
                    this._showPaintRect = false;
                    this.stageDisplayList = null;
                    this.paintList = [];
                    this.displayFPS = displayFPS;
                    this.showPaintRect = showPaintRect;
                    this.drawPaintRect = drawPaintRect;
                    this.drawDirtyRect = drawDirtyRect;
                }
            }
            var d = __define,c=Player;p=c.prototype;
            /**
             * @private
             */
            p.createDisplayList = function (stage, context) {
                var displayList = new sys.DisplayList(stage);
                displayList.renderContext = context;
                stage.$displayList = displayList;
                displayList.setClipRect(stage.$stageWidth, stage.$stageHeight);
                return displayList;
            };
            /**
             * @private
             * ???????????????
             */
            p.start = function () {
                if (this.isPlaying || !this.stage) {
                    return;
                }
                sys.$TempStage = sys.$TempStage || this.stage;
                this.isPlaying = true;
                if (!this.root) {
                    this.initialize();
                }
                sys.$ticker.$addPlayer(this);
            };
            /**
             * @private
             *
             */
            p.initialize = function () {
                var rootClass;
                if (this.entryClassName) {
                    rootClass = egret.getDefinitionByName(this.entryClassName);
                }
                if (rootClass) {
                    var rootContainer = new rootClass();
                    this.root = rootContainer;
                    if (rootContainer instanceof egret.DisplayObject) {
                        this.stage.addChild(rootContainer);
                    }
                    else {
                        DEBUG && egret.$error(1002, this.entryClassName);
                    }
                }
                else {
                    DEBUG && egret.$error(1001, this.entryClassName);
                }
            };
            /**
             * @private
             * ???????????????????????????????????????????????????
             */
            p.stop = function () {
                this.pause();
                this.stage = null;
            };
            /**
             * @private
             * ??????????????????????????????????????????start()????????????????????????
             */
            p.pause = function () {
                if (!this.isPlaying) {
                    return;
                }
                this.isPlaying = false;
                sys.$ticker.$removePlayer(this);
            };
            /**
             * @private
             * ????????????
             */
            p.$render = function (triggerByFrame) {
                if (DEBUG && (this.showFPS || this.showLog)) {
                    this.stage.addChild(this.fpsDisplay);
                }
                this.callLaters();
                this.callLaterAsyncs();
                var stage = this.stage;
                var t = egret.getTimer();
                var dirtyList = stage.$displayList.updateDirtyRegions();
                var t1 = egret.getTimer();
                var drawCalls = 0;
                if (dirtyList.length > 0) {
                    dirtyList = dirtyList.concat();
                    drawCalls = stage.$displayList.drawToSurface();
                }
                if (DEBUG) {
                    if (this._showPaintRect) {
                        this.drawPaintRect(dirtyList);
                    }
                    var t2 = egret.getTimer();
                    if (triggerByFrame && this.showFPS) {
                        var dirtyRatio = 0;
                        if (drawCalls > 0) {
                            var length = dirtyList.length;
                            var dirtyArea = 0;
                            for (var i = 0; i < length; i++) {
                                dirtyArea += dirtyList[i].area;
                            }
                            dirtyRatio = Math.ceil(dirtyArea * 1000 / (stage.stageWidth * stage.stageHeight)) / 10;
                        }
                        this.fpsDisplay.update(drawCalls, dirtyRatio, t1 - t, t2 - t1);
                    }
                }
            };
            /**
             * @private
             *
             */
            p.callLaters = function () {
                if (egret.$callLaterFunctionList.length > 0) {
                    var functionList = egret.$callLaterFunctionList;
                    egret.$callLaterFunctionList = [];
                    var thisList = egret.$callLaterThisList;
                    egret.$callLaterThisList = [];
                    var argsList = egret.$callLaterArgsList;
                    egret.$callLaterArgsList = [];
                }
                if (functionList) {
                    var length = functionList.length;
                    for (var i = 0; i < length; i++) {
                        var func = functionList[i];
                        if (func != null) {
                            func.apply(thisList[i], argsList[i]);
                        }
                    }
                }
            };
            /**
             * @private
             *
             */
            p.callLaterAsyncs = function () {
                if (egret.$callAsyncFunctionList.length > 0) {
                    var locCallAsyncFunctionList = egret.$callAsyncFunctionList;
                    var locCallAsyncThisList = egret.$callAsyncThisList;
                    var locCallAsyncArgsList = egret.$callAsyncArgsList;
                    egret.$callAsyncFunctionList = [];
                    egret.$callAsyncThisList = [];
                    egret.$callAsyncArgsList = [];
                    for (var i = 0; i < locCallAsyncFunctionList.length; i++) {
                        var func = locCallAsyncFunctionList[i];
                        if (func != null) {
                            func.apply(locCallAsyncThisList[i], locCallAsyncArgsList[i]);
                        }
                    }
                }
            };
            /**
             * @private
             * ??????????????????
             * @param stageWidth ????????????????????????????????????
             * @param stageHeight ????????????????????????????????????
             */
            p.updateStageSize = function (stageWidth, stageHeight, pixelRatio) {
                if (pixelRatio === void 0) { pixelRatio = 1; }
                var stage = this.stage;
                if (stageWidth !== stage.$stageWidth || stageHeight !== stage.$stageHeight || this.screenDisplayList.$pixelRatio !== pixelRatio) {
                    stage.$stageWidth = stageWidth;
                    stage.$stageHeight = stageHeight;
                    this.screenDisplayList.setDevicePixelRatio(pixelRatio);
                    this.screenDisplayList.setClipRect(stageWidth, stageHeight);
                    if (DEBUG && this.stageDisplayList) {
                        this.stageDisplayList.setDevicePixelRatio(pixelRatio);
                        this.stageDisplayList.setClipRect(stageWidth, stageHeight);
                    }
                    stage.dispatchEventWith(egret.Event.RESIZE);
                    stage.$invalidate(true);
                }
            };
            return Player;
        })(egret.HashObject);
        sys.Player = Player;
        egret.registerClass(Player,"egret.sys.Player");
        /**
         * @private
         */
        sys.$logToFPS;
        if (DEBUG) {
            var infoLines = [];
            var fpsDisplay;
            var fpsStyle;
            sys.$logToFPS = function (info) {
                if (!fpsDisplay) {
                    infoLines.push(info);
                    return;
                }
                fpsDisplay.updateInfo(info);
            };
            function displayFPS(showFPS, showLog, logFilter, styles) {
                fpsStyle = sys.isUndefined(styles) ? {} : styles;
                showLog = !!showLog;
                this.showFPS = !!showFPS;
                this.showLog = showLog;
                if (!this.fpsDisplay) {
                    var x = sys.isUndefined(styles["x"]) ? 0 : styles["x"];
                    var y = sys.isUndefined(styles["y"]) ? 0 : styles["y"];
                    fpsDisplay = this.fpsDisplay = new FPS(this.stage, showFPS, showLog, logFilter, styles);
                    fpsDisplay.x = x;
                    fpsDisplay.y = y;
                    var length = infoLines.length;
                    for (var i = 0; i < length; i++) {
                        fpsDisplay.updateInfo(infoLines[i]);
                    }
                    infoLines = null;
                }
            }
            function showPaintRect(value) {
                value = !!value;
                if (this._showPaintRect == value) {
                    return;
                }
                this._showPaintRect = value;
                if (value) {
                    if (!this.stageDisplayList) {
                        this.stageDisplayList = sys.DisplayList.create(this.stage);
                    }
                    this.stage.$displayList = this.stageDisplayList;
                }
                else {
                    this.stage.$displayList = this.screenDisplayList;
                }
            }
            function drawPaintRect(dirtyList) {
                var length = dirtyList.length;
                var list = [];
                for (var i = 0; i < length; i++) {
                    var region = dirtyList[i];
                    list[i] = [region.minX, region.minY, region.width, region.height];
                    region.width -= 1;
                    region.height -= 1;
                }
                var repaintList = this.paintList;
                repaintList.push(list);
                if (repaintList.length > 1) {
                    repaintList.shift();
                }
                var context = this.screenDisplayList.renderContext;
                context.setTransform(1, 0, 0, 1, 0, 0);
                context.clearRect(0, 0, context.surface.width, context.surface.height);
                context.drawImage(this.stageDisplayList.surface, 0, 0);
                length = repaintList.length;
                for (i = 0; i < length; i++) {
                    list = repaintList[i];
                    for (var j = list.length - 1; j >= 0; j--) {
                        var r = list[j];
                        this.drawDirtyRect(r[0], r[1], r[2], r[3], context);
                    }
                }
                context.save();
                context.beginPath();
                var length = dirtyList.length;
                for (var i = 0; i < length; i++) {
                    var region = dirtyList[i];
                    context.clearRect(region.minX, region.minY, region.width, region.height);
                    context.rect(region.minX, region.minY, region.width, region.height);
                }
                context.clip();
                context.drawImage(this.stageDisplayList.surface, 0, 0);
                context.restore();
            }
            /**
             * ??????????????????????????????????????????????????????????????????????????????
             */
            function drawDirtyRect(x, y, width, height, context) {
                context.strokeStyle = 'rgb(255,0,0)';
                context.lineWidth = 5;
                context.strokeRect(x - 0.5, y - 0.5, width, height);
            }
            /**
             * FPS????????????
             */
            FPS = (function (_super) {
                __extends(FPSImpl, _super);
                function FPSImpl(stage, showFPS, showLog, logFilter, styles) {
                    _super.call(this);
                    this["isFPS"] = true;
                    this.infoLines = [];
                    this.totalTime = 0;
                    this.totalTick = 0;
                    this.lastTime = 0;
                    this.drawCalls = 0;
                    this._stage = stage;
                    this.showFPS = showFPS;
                    this.showLog = showLog;
                    this.logFilter = logFilter;
                    this.touchChildren = false;
                    this.touchEnabled = false;
                    this.styles = styles;
                    this.createDisplay();
                    try {
                        var logFilterRegExp = logFilter ? new RegExp(logFilter) : null;
                    }
                    catch (e) {
                        egret.log(e);
                    }
                    this.filter = function (message) {
                        if (logFilterRegExp)
                            return logFilterRegExp.test(message);
                        return !logFilter || message.indexOf(logFilter) == 0;
                    };
                }
                FPSImpl.prototype.createDisplay = function () {
                    this.shape = new egret.Shape();
                    this.addChild(this.shape);
                    var textField = new egret.TextField();
                    textField.size = egret.sys.isUndefined(this.styles["size"]) ? 24 : parseInt(this.styles["size"]);
                    this.addChild(textField);
                    this.textField = textField;
                    textField.textColor = egret.sys.isUndefined(this.styles["textColor"]) ? 0x00c200 : parseInt(this.styles["textColor"]);
                    textField.fontFamily = "monospace";
                    textField.x = 10;
                    textField.y = 10;
                    var textField = new egret.TextField();
                    this.infoText = textField;
                    this.addChild(textField);
                    textField.textColor = egret.sys.isUndefined(this.styles["textColor"]) ? 0xb0b0b0 : parseInt(this.styles["textColor"]);
                    textField.fontFamily = "monospace";
                    textField.x = 10;
                    textField.size = egret.sys.isUndefined(this.styles["size"]) ? 12 : this.styles["size"] / 2;
                    textField.y = 10;
                };
                FPSImpl.prototype.update = function (drawCalls, dirtyRatio) {
                    var args = [];
                    for (var _i = 2; _i < arguments.length; _i++) {
                        args[_i - 2] = arguments[_i];
                    }
                    var current = egret.getTimer();
                    this.totalTime += current - this.lastTime;
                    this.lastTime = current;
                    this.totalTick++;
                    this.drawCalls = Math.max(drawCalls, this.drawCalls);
                    if (this.totalTime > 500) {
                        var lastFPS = Math.round(this.totalTick * 1000 / this.totalTime);
                        this.totalTick = 0;
                        this.totalTime = 0;
                        var text = "FPS: " + lastFPS + "\nDraw: " + this.drawCalls + "," + dirtyRatio + "%\nCost: " + args.join(",");
                        if (this.textField.text != text) {
                            this.textField.text = text;
                            this.updateLayout();
                        }
                        this.drawCalls = 0;
                    }
                };
                /**
                 * ????????????????????????
                 */
                FPSImpl.prototype.updateInfo = function (info) {
                    if (!this.showLog) {
                        return;
                    }
                    if (!this.filter(info)) {
                        return;
                    }
                    var lines = this.infoLines;
                    if (info) {
                        lines.push(info);
                    }
                    this.infoText.width = NaN;
                    this.infoText.text = lines.join("\n");
                    if (this._stage.stageHeight > 0) {
                        if (this.infoText.textWidth > this._stage.stageWidth - 20) {
                            this.infoText.width = this._stage.stageWidth - 20;
                        }
                        while (this.infoText.textHeight > this._stage.stageHeight - 20) {
                            lines.shift();
                            this.infoText.text = lines.join("\n");
                        }
                    }
                    this.updateLayout();
                };
                FPSImpl.prototype.updateLayout = function () {
                    if (this.showFPS) {
                        this.infoText.y = this.textField.height + 20;
                    }
                    if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                        return;
                    }
                    var g = this.shape.$graphics.$renderContext;
                    g.clear();
                    g.fillStyle = "rgba(68,68,68,1)";
                    g.fillRect(0, 0, Math.max(160, this.width + 20), this.height + 20);
                };
                return FPSImpl;
            })(egret.Sprite);
        }
    })(sys = egret.sys || (egret.sys = {}));
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    var sys;
    (function (sys) {
        /**
         * @private
         * ???????????????????????????????????????????????????????????????????????????IScreenAdapter????????????????????????????????????????????????????????????
         */
        sys.screenAdapter;
        /**
         * @private
         * ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????egret.sys.screenAdapter???????????????????????????????????????
         */
        var ScreenAdapter = (function (_super) {
            __extends(ScreenAdapter, _super);
            /**
             * @private
             */
            function ScreenAdapter() {
                _super.call(this);
            }
            var d = __define,c=ScreenAdapter;p=c.prototype;
            /**
             * @private
             * ????????????????????????
             * @param scaleMode ?????????????????????
             * @param screenWidth ?????????????????????
             * @param screenHeight ?????????????????????
             * @param contentWidth ?????????????????????
             * @param contentHeight ?????????????????????
             */
            p.calculateStageSize = function (scaleMode, screenWidth, screenHeight, contentWidth, contentHeight) {
                var displayWidth = screenWidth;
                var displayHeight = screenHeight;
                var stageWidth = contentWidth;
                var stageHeight = contentHeight;
                var scaleX = (screenWidth / stageWidth) || 0;
                var scaleY = (screenHeight / stageHeight) || 0;
                switch (scaleMode) {
                    case egret.StageScaleMode.EXACT_FIT:
                        break;
                    case egret.StageScaleMode.FIXED_HEIGHT:
                        stageWidth = Math.round(screenWidth / scaleY);
                        break;
                    case egret.StageScaleMode.FIXED_WIDTH:
                        stageHeight = Math.round(screenHeight / scaleX);
                        break;
                    case egret.StageScaleMode.NO_BORDER:
                        if (scaleX > scaleY) {
                            displayHeight = Math.round(stageHeight * scaleX);
                        }
                        else {
                            displayWidth = Math.round(stageWidth * scaleY);
                        }
                        break;
                    case egret.StageScaleMode.SHOW_ALL:
                        if (scaleX > scaleY) {
                            displayWidth = Math.round(stageWidth * scaleY);
                        }
                        else {
                            displayHeight = Math.round(stageHeight * scaleX);
                        }
                        break;
                    default:
                        stageWidth = screenWidth;
                        stageHeight = screenHeight;
                        break;
                }
                return {
                    stageWidth: stageWidth,
                    stageHeight: stageHeight,
                    displayWidth: displayWidth,
                    displayHeight: displayHeight
                };
            };
            return ScreenAdapter;
        })(egret.HashObject);
        sys.ScreenAdapter = ScreenAdapter;
        egret.registerClass(ScreenAdapter,"egret.sys.ScreenAdapter",["egret.sys.IScreenAdapter"]);
    })(sys = egret.sys || (egret.sys = {}));
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * StageScaleMode class provides values for the stage zoom mode.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/player/StageScaleMode.ts
     */
    /**
     * @language zh_CN
     * StageScaleMode ????????????????????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/player/StageScaleMode.ts
     */
    var StageScaleMode = (function () {
        function StageScaleMode() {
        }
        var d = __define,c=StageScaleMode;p=c.prototype;
        /**
         * @language en_US
         * Do not scale application content. Even when you change the player viewport size, it remains unchanged. If the player is smaller than the viewport content, possibly with some cropping.<br/>
         * In this mode, the stage size (Stage.stageWidth, Stage.stageHeight) always with the player viewport size consistent.
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????<br/>
         * ?????????????????????????????????Stage.stageWidth,Stage.stageHeight????????????????????????????????????????????????
         */
        StageScaleMode.NO_SCALE = "noScale";
        /**
         * @language en_US
         * Keep the original aspect ratio scaling application content, after scaling a wide directions application content to fill the viewport players on both sides in the other direction may not be wide enough and left black bars.<br/>
         * In this mode, the stage size (Stage.stageWidth, Stage.stageHeight) is always equal to the initialization incoming external application content size.
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????<br/>
         * ??????????????????????????????(Stage.stageWidth,Stage.stageHeight)??????????????????????????????????????????????????????????????????
         */
        StageScaleMode.SHOW_ALL = "showAll";
        /**
         * @language en_US
         * Keep the original aspect ratio scaling application content, after scaling a narrow direction of application content to fill the viewport players on both sides in the other direction may exceed the viewport and the player is cut.<br/>
         * In this mode, the stage size (Stage.stageWidth, Stage.stageHeight) is always equal to the initialization incoming external application content size.
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????<br/>
         * ??????????????????????????????(Stage.stageWidth,Stage.stageHeight)??????????????????????????????????????????????????????????????????
         */
        StageScaleMode.NO_BORDER = "noBorder";
        /**
         * @language en_US
         * Do not keep the original aspect ratio scaling application content, after scaling application content just fill the player viewport.<br/>
         * In this mode, the stage size (Stage.stageWidth, Stage.stageHeight) is always equal to the initialization incoming external application content size.
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????????????????????????????????????????????????????????????????????<br/>
         * ??????????????????????????????(Stage.stageWidth,Stage.stageHeight)??????????????????????????????????????????????????????????????????
         */
        StageScaleMode.EXACT_FIT = "exactFit";
        /**
         * @language en_US
         * Keep the original aspect ratio scaling application content, after scaling application content in the horizontal and vertical directions to fill the viewport player, but only to keep the contents of the original application constant width, height may change.<br/>
         * In this mode, the stage width (Stage.stageWidth) is always equal to initialize external incoming application content width. Stage height (Stage.stageHeight) by the current scale with the player viewport height decision.
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????<br/>
         * ??????????????????????????????(Stage.stageWidth)??????????????????????????????????????????????????????????????????????????????(Stage.stageHeight)?????????????????????????????????????????????????????????
         */
        StageScaleMode.FIXED_WIDTH = "fixedWidth";
        /**
         * @language en_US
         * Keep the original aspect ratio scaling application content, after scaling application content in the horizontal and vertical directions to fill the viewport player, but only to keep the contents of the original application constant height, width may change.<br/>
         * In this mode, the stage height (Stage.stageHeight) is always equal to initialize external incoming application content height. Stage width (Stage.stageWidth) by the current scale with the player viewport width decision.
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????<br/>
         * ??????????????????????????????(Stage.stageHeight)??????????????????????????????????????????????????????????????????????????????(Stage.stageWidth)?????????????????????????????????????????????????????????
         */
        StageScaleMode.FIXED_HEIGHT = "fixedHeight";
        return StageScaleMode;
    })();
    egret.StageScaleMode = StageScaleMode;
    egret.registerClass(StageScaleMode,"egret.StageScaleMode");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    var sys;
    (function (sys) {
        /**
         * @private
         * ???????????????RenderContext??????????????????????????????????????????????????????????????????
         */
        sys.sharedRenderContext;
        /**
         * @private
         * surfaceFactory??????
         */
        sys.surfaceFactory;
    })(sys = egret.sys || (egret.sys = {}));
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    var sys;
    (function (sys) {
        /**
         * @private
         */
        sys.$START_TIME = 0;
        /**
         * @private
         * ???????????????Event.RENDER??????????????????
         */
        sys.$invalidateRenderFlag = false;
        /**
         * @private
         * ?????????????????????????????????
         */
        sys.$requestRenderingFlag = false;
        /**
         * @private
         * Egret???????????????
         */
        var SystemTicker = (function () {
            /**
             * @private
             */
            function SystemTicker() {
                /**
                 * @private
                 */
                this.playerList = [];
                /**
                 * @private
                 */
                this.callBackList = [];
                /**
                 * @private
                 */
                this.thisObjectList = [];
                /**
                 * @private
                 * ????????????
                 */
                this.$frameRate = 30;
                /**
                 * @private
                 */
                this.frameInterval = 2000;
                /**
                 * @private
                 */
                this.lastCount = 2000;
                if (DEBUG && sys.$ticker) {
                    egret.$error(1008, "egret.sys.SystemTicker");
                }
                sys.$START_TIME = Date.now();
            }
            var d = __define,c=SystemTicker;p=c.prototype;
            /**
             * @private
             * ????????????????????????????????????
             */
            p.$addPlayer = function (player) {
                if (this.playerList.indexOf(player) != -1) {
                    return;
                }
                if (DEBUG) {
                    egret_stages.push(player.stage);
                }
                this.playerList = this.playerList.concat();
                this.playerList.push(player);
            };
            /**
             * @private
             * ???????????????????????????????????????
             */
            p.$removePlayer = function (player) {
                var index = this.playerList.indexOf(player);
                if (index !== -1) {
                    if (DEBUG) {
                        var i = egret_stages.indexOf(player.stage);
                        egret_stages.splice(i, 1);
                    }
                    this.playerList = this.playerList.concat();
                    this.playerList.splice(index, 1);
                }
            };
            /**
             * @private
             */
            p.$startTick = function (callBack, thisObject) {
                var index = this.getTickIndex(callBack, thisObject);
                if (index != -1) {
                    return;
                }
                this.concatTick();
                this.callBackList.push(callBack);
                this.thisObjectList.push(thisObject);
            };
            /**
             * @private
             */
            p.$stopTick = function (callBack, thisObject) {
                var index = this.getTickIndex(callBack, thisObject);
                if (index == -1) {
                    return;
                }
                this.concatTick();
                this.callBackList.splice(index, 1);
                this.thisObjectList.splice(index, 1);
            };
            /**
             * @private
             */
            p.getTickIndex = function (callBack, thisObject) {
                var callBackList = this.callBackList;
                var thisObjectList = this.thisObjectList;
                for (var i = callBackList.length - 1; i >= 0; i--) {
                    if (callBackList[i] == callBack && thisObjectList[i] == thisObject) {
                        return i;
                    }
                }
                return -1;
            };
            /**
             * @private
             *
             */
            p.concatTick = function () {
                this.callBackList = this.callBackList.concat();
                this.thisObjectList = this.thisObjectList.concat();
            };
            /**
             * @private
             * ??????????????????
             */
            p.$setFrameRate = function (value) {
                value = +value || 0;
                if (value <= 0) {
                    return false;
                }
                if (this.$frameRate == value) {
                    return false;
                }
                this.$frameRate = value;
                if (value > 60) {
                    value = 60;
                }
                //?????????60*1000?????????????????????????????????????????????
                this.lastCount = this.frameInterval = Math.round(60000 / value);
                return true;
            };
            /**
             * @private
             * ??????????????????
             */
            p.update = function () {
                var callBackList = this.callBackList;
                var thisObjectList = this.thisObjectList;
                var length = callBackList.length;
                var requestRenderingFlag = sys.$requestRenderingFlag;
                var timeStamp = egret.getTimer();
                for (var i = 0; i < length; i++) {
                    if (callBackList[i].call(thisObjectList[i], timeStamp)) {
                        requestRenderingFlag = true;
                    }
                }
                this.lastCount -= 1000;
                if (this.lastCount > 0) {
                    if (requestRenderingFlag) {
                        this.render(false);
                    }
                    return;
                }
                this.lastCount += this.frameInterval;
                this.render(true);
                this.broadcastEnterFrame();
            };
            /**
             * @private
             * ????????????????????????
             */
            p.render = function (triggerByFrame) {
                var playerList = this.playerList;
                var length = playerList.length;
                if (length == 0) {
                    return;
                }
                if (sys.$invalidateRenderFlag) {
                    this.broadcastRender();
                    sys.$invalidateRenderFlag = false;
                }
                for (var i = 0; i < length; i++) {
                    playerList[i].$render(triggerByFrame);
                }
                sys.$requestRenderingFlag = false;
            };
            /**
             * @private
             * ??????EnterFrame?????????
             */
            p.broadcastEnterFrame = function () {
                var list = egret.DisplayObject.$enterFrameCallBackList;
                var length = list.length;
                if (length == 0) {
                    return;
                }
                list = list.concat();
                for (var i = 0; i < length; i++) {
                    list[i].dispatchEventWith(egret.Event.ENTER_FRAME);
                }
            };
            /**
             * @private
             * ??????Render?????????
             */
            p.broadcastRender = function () {
                var list = egret.DisplayObject.$renderCallBackList;
                var length = list.length;
                if (length == 0) {
                    return;
                }
                list = list.concat();
                for (var i = 0; i < length; i++) {
                    list[i].dispatchEventWith(egret.Event.RENDER);
                }
            };
            return SystemTicker;
        })();
        sys.SystemTicker = SystemTicker;
        egret.registerClass(SystemTicker,"egret.sys.SystemTicker");
        /**
         * @private
         * ?????????????????????
         */
        sys.$ticker = new sys.SystemTicker();
    })(sys = egret.sys || (egret.sys = {}));
})(egret || (egret = {}));
if (DEBUG) {
    var egret_stages = [];
}
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
var egret;
(function (egret) {
    var sys;
    (function (sys) {
        /**
         * @private
         * ???????????????????????????
         */
        var TouchHandler = (function (_super) {
            __extends(TouchHandler, _super);
            /**
             * @private
             */
            function TouchHandler(stage) {
                _super.call(this);
                this.maxTouches = 0;
                this.useTouchesCount = 0;
                /**
                 * @private
                 */
                this.touchDownTarget = {};
                /**
                 * @private
                 */
                this.lastTouchX = -1;
                /**
                 * @private
                 */
                this.lastTouchY = -1;
                this.stage = stage;
            }
            var d = __define,c=TouchHandler;p=c.prototype;
            /**
             * @private
             * ????????????????????????
             */
            p.$initMaxTouches = function () {
                this.maxTouches = this.stage.$maxTouches;
            };
            /**
             * @private
             * ????????????????????????
             * @param x ???????????????????????????????????????x
             * @param y ???????????????????????????????????????y
             * @param touchPointID ????????????????????????????????????
             */
            p.onTouchBegin = function (x, y, touchPointID) {
                if (this.useTouchesCount >= this.maxTouches) {
                    return;
                }
                this.lastTouchX = x;
                this.lastTouchY = y;
                var target = this.findTarget(x, y);
                if (this.touchDownTarget[touchPointID] == null) {
                    this.touchDownTarget[touchPointID] = target;
                    this.useTouchesCount++;
                }
                egret.TouchEvent.dispatchTouchEvent(target, egret.TouchEvent.TOUCH_BEGIN, true, true, x, y, touchPointID, true);
            };
            /**
             * @private
             * ????????????
             * @param x ???????????????????????????????????????x
             * @param y ???????????????????????????????????????y
             * @param touchPointID ????????????????????????????????????
             */
            p.onTouchMove = function (x, y, touchPointID) {
                if (this.touchDownTarget[touchPointID] == null) {
                    return;
                }
                if (this.lastTouchX == x && this.lastTouchY == y) {
                    return;
                }
                this.lastTouchX = x;
                this.lastTouchY = y;
                var target = this.findTarget(x, y);
                egret.TouchEvent.dispatchTouchEvent(target, egret.TouchEvent.TOUCH_MOVE, true, true, x, y, touchPointID, true);
            };
            /**
             * @private
             * ????????????????????????
             * @param x ???????????????????????????????????????x
             * @param y ???????????????????????????????????????y
             * @param touchPointID ????????????????????????????????????
             */
            p.onTouchEnd = function (x, y, touchPointID) {
                if (this.touchDownTarget[touchPointID] == null) {
                    return;
                }
                var target = this.findTarget(x, y);
                var oldTarget = this.touchDownTarget[touchPointID];
                delete this.touchDownTarget[touchPointID];
                this.useTouchesCount--;
                egret.TouchEvent.dispatchTouchEvent(target, egret.TouchEvent.TOUCH_END, true, true, x, y, touchPointID, false);
                if (oldTarget == target) {
                    egret.TouchEvent.dispatchTouchEvent(target, egret.TouchEvent.TOUCH_TAP, true, true, x, y, touchPointID, false);
                }
                else {
                    egret.TouchEvent.dispatchTouchEvent(oldTarget, egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, true, true, x, y, touchPointID, false);
                }
            };
            /**
             * @private
             * ????????????????????????????????????
             */
            p.findTarget = function (stageX, stageY) {
                var target = this.stage.$hitTest(stageX, stageY);
                if (!target) {
                    target = this.stage;
                }
                return target;
            };
            return TouchHandler;
        })(egret.HashObject);
        sys.TouchHandler = TouchHandler;
        egret.registerClass(TouchHandler,"egret.sys.TouchHandler");
    })(sys = egret.sys || (egret.sys = {}));
})(egret || (egret = {}));
var egret;
(function (egret) {
    /**
     * @copy egret.Orientation
     */
    egret.DeviceOrientation = null;
})(egret || (egret = {}));
var egret;
(function (egret) {
    /**
     * @copy egret.Geolocation
     */
    egret.Geolocation;
})(egret || (egret = {}));
var egret;
(function (egret) {
    /**
     * @copy egret.Motion
     */
    egret.Motion;
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * Type of operation.
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ????????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     */
    var RuntimeType = (function () {
        function RuntimeType() {
        }
        var d = __define,c=RuntimeType;p=c.prototype;
        /**
         * @language en_US
         * Running on Web
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????Web???
         * @version Egret 2.4
         * @platform Web,Native
         */
        RuntimeType.WEB = "web";
        /**
         * @language en_US
         * Running on NATIVE
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????NATIVE???
         * @version Egret 2.4
         * @platform Web,Native
         */
        RuntimeType.NATIVE = "native";
        return RuntimeType;
    })();
    egret.RuntimeType = RuntimeType;
    egret.registerClass(RuntimeType,"egret.RuntimeType");
    /**
     * @language en_US
     * The Capabilities class provides properties that describe the system and runtime that are hosting the application.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/system/Capabilities.ts
     */
    /**
     * @language zh_CN
     * Capabilities ???????????????????????????????????????????????????????????????????????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/system/Capabilities.ts
     */
    var Capabilities = (function () {
        function Capabilities() {
        }
        var d = __define,c=Capabilities;p=c.prototype;
        d(Capabilities, "language"
            /**
             * @language en_US
             * Specifies the language code of the system on which the content is running. The language is specified as a lowercase
             * two-letter language code from ISO 639-1. For Chinese, an additional uppercase two-letter country code from ISO 3166
             * distinguishes between Simplified and Traditional Chinese.<br/>
             * The following table lists the possible values,but not limited to them:
             * <ul>
             * <li>Simplified    Chinese  zh-CN</li>
             * <li>Traditional   Chinese  zh-TW</li>
             * <li>English       en</li>
             * <li>Japanese      ja</li>
             * <li>Korean        ko</li>
             * </ul>
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????????????????????????????? ISO 639-1 ????????????????????????????????????
             * ??????????????????????????? ISO 3166 ???????????????????????????/??????????????????????????????????????????????????????<br/>
             * ?????????????????????????????????????????????
             * <ul>
             * <li>????????????  zh-CN</li>
             * <li>????????????  zh-TW</li>
             * <li>??????      en</li>
             * <li>??????      ja</li>
             * <li>??????      ko</li>
             * </ul>
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return Capabilities.$language;
            }
        );
        d(Capabilities, "isMobile"
            /**
             * @language en_US
             * Specifies whether the system is running in a mobile device.(such as a mobile phone or tablet)
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return Capabilities.$isMobile;
            }
        );
        d(Capabilities, "os"
            /**
             * @language en_US
             * Specifies the current operating system. The os property can return the following strings:
             * <ul>
             * <li>iPhone            "iOS"</li>
             * <li>Android Phone     "Android"</li>
             * <li>Windows Phone     "Windows Phone"</li>
             * <li>Windows Desktop   "Windows PC"</li>
             * <li>Mac Desktop       "Mac OS"</li>
             * <li>Unknown OS        "Unknown"</li>
             * </ul>
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????os ??????????????????????????????
             * <ul>
             * <li>????????????????????????     "iOS"</li>
             * <li>????????????????????????     "Android"</li>
             * <li>????????????????????????     "Windows Phone"</li>
             * <li>????????????????????????     "Windows PC"</li>
             * <li>????????????????????????     "Mac OS"</li>
             * <li>??????????????????        "Unknown"</li>
             * </ul>
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return Capabilities.$os;
            }
        );
        d(Capabilities, "runtimeType"
            /**
             * @language en_US
             * It indicates the current type of operation. runtimeType property returns the following string:
             * <ul>
             * <li>Run on Web     egret.RuntimeType.WEB</li>
             * <li>Run on Native     egret.RuntimeType.NATIVE</li>
             * </ul>
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????runtimeType ??????????????????????????????
             * <ul>
             * <li>?????????Web???     egret.RuntimeType.WEB</li>
             * <li>?????????Native???     egret.RuntimeType.NATIVE</li>
             * </ul>
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return Capabilities.$runtimeType;
            }
        );
        /**
         * @private
         */
        Capabilities.$language = "zh-CN";
        /**
         * @private
         */
        Capabilities.$os = "Unknown";
        /**
         * @private
         */
        Capabilities.$runtimeType = "Unknown";
        return Capabilities;
    })();
    egret.Capabilities = Capabilities;
    egret.registerClass(Capabilities,"egret.Capabilities");
    if (DEBUG) {
        egret.$markReadOnly(Capabilities, "language", false);
        egret.$markReadOnly(Capabilities, "isMobile", false);
        egret.$markReadOnly(Capabilities, "os", false);
    }
})(egret || (egret = {}));
var testDeviceType = function () {
    if (!this["navigator"]) {
        return true;
    }
    var ua = navigator.userAgent.toLowerCase();
    return (ua.indexOf('mobile') != -1 || ua.indexOf('android') != -1);
};
var testRuntimeType = function () {
    if (this["navigator"]) {
        return true;
    }
    return false;
};
egret.Capabilities.$isMobile = testDeviceType();
egret.Capabilities.$runtimeType = testRuntimeType() ? egret.RuntimeType.WEB : egret.RuntimeType.NATIVE;
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * Bitmap font, texture set of a font. It is generally used as the value of the BitmapText.font attribute.
     * @see http://bbs.egret-labs.org/thread-918-1-1.html TextureMerger
     * @see http://bbs.egret-labs.org/forum.php?mod=viewthread&tid=251 Text(Containing the specific usage of the bitmap font )
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/text/BitmapFont.ts
     */
    /**
     * @language zh_CN
     * ????????????,??????????????????????????????????????????BitmapText.font???????????????
     * @see http://bbs.egret-labs.org/thread-918-1-1.html TextureMerger
     * @see http://bbs.egret-labs.org/forum.php?mod=viewthread&tid=251 ??????(???????????????????????????)
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/text/BitmapFont.ts
     */
    var BitmapFont = (function (_super) {
        __extends(BitmapFont, _super);
        /**
         * @language en_US
         * Create an egret.BitmapFont object
         * @param texture {egret.Texture} Texture set that use TextureMerger create
         * @param config {any} Configure data that use TextureMerger create
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????? egret.BitmapFont ??????
         * @param texture {egret.Texture} ??????TextureMerger??????????????????
         * @param config {any} ??????TextureMerger?????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        function BitmapFont(texture, config) {
            _super.call(this, texture);
            /**
             * @private
             */
            this.firstCharHeight = 0;
            if (typeof (config) == "string") {
                this.charList = this.parseConfig(config);
            }
            else if (config && config.hasOwnProperty("frames")) {
                this.charList = config.frames;
            }
            else {
                this.charList = {};
            }
        }
        var d = __define,c=BitmapFont;p=c.prototype;
        /**
         * @language en_US
         * Obtain corresponding texture through the name attribute
         * @param name {string} name Attribute
         * @returns {egret.Texture}
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????? name ????????????????????????
         * @param name {string} name??????
         * @returns {egret.Texture}
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.getTexture = function (name) {
            var texture = this._textureMap[name];
            if (!texture) {
                var c = this.charList[name];
                if (!c) {
                    return null;
                }
                texture = this.createTexture(name, c.x, c.y, c.w, c.h, c.offX, c.offY, c.sourceW, c.sourceH);
                this._textureMap[name] = texture;
            }
            return texture;
        };
        /**
         * @private
         *
         * @returns
         */
        p._getFirstCharHeight = function () {
            if (this.firstCharHeight == 0) {
                for (var str in this.charList) {
                    var c = this.charList[str];
                    if (c) {
                        var sourceH = c.sourceH;
                        if (egret.sys.isUndefined(sourceH)) {
                            var h = c.h;
                            if (h === undefined) {
                                h = 0;
                            }
                            var offY = c.offY;
                            if (egret.sys.isUndefined(offY)) {
                                offY = 0;
                            }
                            sourceH = h + offY;
                        }
                        if (sourceH <= 0) {
                            continue;
                        }
                        this.firstCharHeight = sourceH;
                        break;
                    }
                }
            }
            return this.firstCharHeight;
        };
        /**
         * @private
         *
         * @param fntText
         * @returns
         */
        p.parseConfig = function (fntText) {
            fntText = fntText.split("\r\n").join("\n");
            var lines = fntText.split("\n");
            var charsCount = this.getConfigByKey(lines[3], "count");
            var chars = {};
            for (var i = 4; i < 4 + charsCount; i++) {
                var charText = lines[i];
                var letter = String.fromCharCode(this.getConfigByKey(charText, "id"));
                var c = {};
                chars[letter] = c;
                c["x"] = this.getConfigByKey(charText, "x");
                c["y"] = this.getConfigByKey(charText, "y");
                c["w"] = this.getConfigByKey(charText, "width");
                c["h"] = this.getConfigByKey(charText, "height");
                c["offX"] = this.getConfigByKey(charText, "xoffset");
                c["offY"] = this.getConfigByKey(charText, "yoffset");
            }
            return chars;
        };
        /**
         * @private
         *
         * @param configText
         * @param key
         * @returns
         */
        p.getConfigByKey = function (configText, key) {
            var itemConfigTextList = configText.split(" ");
            for (var i = 0, length = itemConfigTextList.length; i < length; i++) {
                var itemConfigText = itemConfigTextList[i];
                if (key == itemConfigText.substring(0, key.length)) {
                    var value = itemConfigText.substring(key.length + 1);
                    return parseInt(value);
                }
            }
            return 0;
        };
        return BitmapFont;
    })(egret.SpriteSheet);
    egret.BitmapFont = BitmapFont;
    egret.registerClass(BitmapFont,"egret.BitmapFont");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * Bitmap font adopts the Bitmap+SpriteSheet mode to render text.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/text/BitmapText.ts
     */
    /**
     * @language zh_CN
     * ?????????????????????Bitmap+SpriteSheet???????????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/text/BitmapText.ts
     */
    var BitmapText = (function (_super) {
        __extends(BitmapText, _super);
        /**
         * @language en_US
         * Create an egret.BitmapText object
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????? egret.BitmapText ??????
         * @version Egret 2.4
         * @platform Web,Native
         */
        function BitmapText() {
            _super.call(this);
            /**
             * @private
             */
            this.textWidth = 0;
            /**
             * @private
             */
            this.textHeight = 0;
            /**
             * @private
             */
            this.textOffsetX = 0;
            /**
             * @private
             */
            this.textOffsetY = 0;
            /**
             * @private
             */
            this.$lineHeights = [];
            //this.cacheAsBitmap = true;
            this.$renderRegion = new egret.sys.Region();
            this.$BitmapText = {
                0: NaN,
                1: NaN,
                2: "",
                3: 0,
                4: 0,
                5: null,
                6: false,
                7: false //textLinesChanged,
            };
        }
        var d = __define,c=BitmapText;p=c.prototype;
        d(p, "text"
            /**
             * @language en_US
             * A string to display in the text field.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$BitmapText[2 /* text */];
            }
            ,function (value) {
                this.$setText(value);
            }
        );
        /**
         * @private
         */
        p.$setText = function (value) {
            var values = this.$BitmapText;
            if (value == values[2 /* text */])
                return false;
            values[2 /* text */] = value;
            this.$invalidateContentBounds();
            return true;
        };
        /**
         * @private
         */
        p.$getWidth = function () {
            var w = this.$BitmapText[0 /* textFieldWidth */];
            return isNaN(w) ? this.$getContentBounds().width : w;
        };
        /**
         * @private
         */
        p.$setWidth = function (value) {
            //value = +value || 0;
            var values = this.$BitmapText;
            if (value < 0 || value == values[0 /* textFieldWidth */]) {
                return false;
            }
            values[0 /* textFieldWidth */] = value;
            this.$invalidateContentBounds();
            return true;
        };
        /**
         * @private
         */
        p.$invalidateContentBounds = function () {
            _super.prototype.$invalidateContentBounds.call(this);
            this.$BitmapText[7 /* textLinesChanged */] = true;
        };
        /**
         * @private
         */
        p.$getHeight = function () {
            var h = this.$BitmapText[1 /* textFieldHeight */];
            return isNaN(h) ? this.$getContentBounds().height : h;
        };
        /**
         * @private
         */
        p.$setHeight = function (value) {
            //value = +value || 0;
            var values = this.$BitmapText;
            if (value < 0 || value == values[1 /* textFieldHeight */]) {
                return false;
            }
            values[1 /* textFieldHeight */] = value;
            this.$invalidateContentBounds();
            return true;
        };
        d(p, "font"
            /**
             * @language en_US
             * The name of the font to use, or a comma-separated list of font names.
             * @default null
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????????????????????????????????????????????????????????
             * @default null
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$BitmapText[5 /* font */];
            }
            ,function (value) {
                this.$setFont(value);
            }
        );
        p.$setFont = function (value) {
            var values = this.$BitmapText;
            if (values[5 /* font */] == value) {
                return false;
            }
            values[5 /* font */] = value;
            this.$BitmapText[6 /* fontStringChanged */] = true;
            this.$invalidateContentBounds();
            return true;
        };
        d(p, "lineSpacing"
            /**
            /**
             * @language en_US
             * An integer representing the amount of vertical space between lines.
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$BitmapText[3 /* lineSpacing */];
            }
            ,function (value) {
                this.$setLineSpacing(value);
            }
        );
        p.$setLineSpacing = function (value) {
            value = +value || 0;
            var values = this.$BitmapText;
            if (values[3 /* lineSpacing */] == value)
                return false;
            values[3 /* lineSpacing */] = value;
            this.$invalidateContentBounds();
            return true;
        };
        d(p, "letterSpacing"
            /**
             * @language en_US
             * An integer representing the amount of distance between characters.
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????????????????????????????????
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$BitmapText[4 /* letterSpacing */];
            }
            ,function (value) {
                this.$setLetterSpacing(value);
            }
        );
        p.$setLetterSpacing = function (value) {
            value = +value || 0;
            var values = this.$BitmapText;
            if (values[4 /* letterSpacing */] == value)
                return false;
            values[4 /* letterSpacing */] = value;
            this.$invalidateContentBounds();
            return true;
        };
        /**
         * @private
         */
        p.$render = function (context) {
            var self = this;
            var textLines = self.$getTextLines();
            var length = textLines.length;
            if (length == 0) {
                return;
            }
            var bitmapFont = self.$BitmapText[5 /* font */];
            var emptyHeight = bitmapFont._getFirstCharHeight();
            var emptyWidth = Math.ceil(emptyHeight * BitmapText.EMPTY_FACTOR);
            var yPos = 0;
            var hasSetHeight = !isNaN(self.$BitmapText[1 /* textFieldHeight */]);
            var textFieldHeight = self.$BitmapText[1 /* textFieldHeight */];
            var lineHeights = self.$lineHeights;
            for (var i = 0; i < length; i++) {
                var lineHeight = lineHeights[i];
                if (hasSetHeight && i > 0 && yPos + lineHeight > textFieldHeight) {
                    break;
                }
                var line = textLines[i];
                var len = line.length;
                var xPos = 0;
                for (var j = 0; j < len; j++) {
                    var character = line.charAt(j);
                    var texture = bitmapFont.getTexture(character);
                    if (!texture) {
                        if (character == " ") {
                            xPos += emptyWidth;
                        }
                        else {
                            egret.$warn(1011, character);
                        }
                        continue;
                    }
                    var bitmapWidth = texture._bitmapWidth;
                    var bitmapHeight = texture._bitmapHeight;
                    context.drawImage(texture._bitmapData, texture._bitmapX, texture._bitmapY, bitmapWidth, bitmapHeight, xPos + texture._offsetX, yPos + texture._offsetY, texture.$getScaleBitmapWidth(), texture.$getScaleBitmapHeight());
                    xPos += texture.$getTextureWidth() + self.$BitmapText[4 /* letterSpacing */];
                }
                yPos += lineHeight + self.$BitmapText[3 /* lineSpacing */];
            }
        };
        /**
         * @private
         */
        p.$measureContentBounds = function (bounds) {
            var lines = this.$getTextLines();
            if (lines.length == 0) {
                bounds.setEmpty();
            }
            else {
                bounds.setTo(this.textOffsetX, this.textOffsetY, this.textWidth - this.textOffsetX, this.textHeight - this.textOffsetY + (lines.length - 1) * this.$BitmapText[3 /* lineSpacing */]);
            }
        };
        /**
         * @private
         *
         * @returns
         */
        p.$getTextLines = function () {
            var self = this;
            if (!this.$BitmapText[7 /* textLinesChanged */]) {
                return self.textLines;
            }
            var textLines = [];
            self.textLines = textLines;
            this.$BitmapText[7 /* textLinesChanged */] = false;
            var lineHeights = [];
            self.$lineHeights = lineHeights;
            if (!self.$BitmapText[2 /* text */] || !self.$BitmapText[5 /* font */]) {
                return textLines;
            }
            var textWidth = 0;
            var textHeight = 0;
            var textStartX = 0;
            var textStartY = 0;
            var hasWidthSet = !isNaN(self.$BitmapText[0 /* textFieldWidth */]);
            var textFieldWidth = self.$BitmapText[0 /* textFieldWidth */];
            var bitmapFont = self.$BitmapText[5 /* font */];
            var emptyHeight = bitmapFont._getFirstCharHeight();
            var emptyWidth = Math.ceil(emptyHeight * BitmapText.EMPTY_FACTOR);
            var text = self.$BitmapText[2 /* text */];
            var textArr = text.split(/(?:\r\n|\r|\n)/);
            var length = textArr.length;
            var isFirstLine = true;
            for (var i = 0; i < length; i++) {
                var line = textArr[i];
                var len = line.length;
                var lineHeight = 0;
                var xPos = 0;
                var isFirstChar = true;
                for (var j = 0; j < len; j++) {
                    if (!isFirstChar) {
                        xPos += self.$BitmapText[4 /* letterSpacing */];
                    }
                    var character = line.charAt(j);
                    var texureWidth;
                    var textureHeight;
                    var offsetX = 0;
                    var offsetY = 0;
                    var texture = bitmapFont.getTexture(character);
                    if (!texture) {
                        if (character == " ") {
                            texureWidth = emptyWidth;
                            textureHeight = emptyHeight;
                        }
                        else {
                            egret.$warn(1011, character);
                            if (isFirstChar) {
                                isFirstChar = false;
                            }
                            continue;
                        }
                    }
                    else {
                        texureWidth = texture.$getTextureWidth();
                        textureHeight = texture.$getTextureHeight();
                        offsetX = texture._offsetX;
                        offsetY = texture._offsetY;
                    }
                    if (isFirstChar) {
                        isFirstChar = false;
                        textStartX = Math.min(offsetX, textStartX);
                    }
                    if (isFirstLine) {
                        textStartY = Math.min(offsetY, textStartY);
                    }
                    if (hasWidthSet && j > 0 && xPos + texureWidth > textFieldWidth) {
                        textLines.push(line.substring(0, j));
                        lineHeights.push(lineHeight);
                        textHeight += lineHeight;
                        textWidth = Math.max(xPos, textWidth);
                        line = line.substring(j);
                        len = line.length;
                        j = 0;
                        xPos = texureWidth;
                        lineHeight = textureHeight;
                        continue;
                    }
                    xPos += texureWidth;
                    lineHeight = Math.max(textureHeight, lineHeight);
                }
                if (isFirstLine) {
                    isFirstLine = false;
                }
                textLines.push(line);
                lineHeights.push(lineHeight);
                textHeight += lineHeight;
                textWidth = Math.max(xPos, textWidth);
            }
            self.textWidth = textWidth;
            self.textHeight = textHeight;
            self.textOffsetX = textStartX;
            self.textOffsetY = textStartY;
            return textLines;
        };
        /**
         * @language en_US
         * A ratio of the width of the space character. This value is multiplied by the height of the first character is the space character width.
         * @default 0.33
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????????????????????????????????????????????????????????????????????????????
         * @default 0.33
         * @version Egret 2.4
         * @platform Web,Native
         */
        BitmapText.EMPTY_FACTOR = 0.33;
        return BitmapText;
    })(egret.DisplayObject);
    egret.BitmapText = BitmapText;
    egret.registerClass(BitmapText,"egret.BitmapText");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * The HorizontalAlign class defines the possible values for the horizontal alignment.
     * @see egret.TextField#textAlign
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * HorizontalAlign ?????????????????????????????????????????????
     * @see egret.TextField#textAlign
     * @version Egret 2.4
     * @platform Web,Native
     */
    var HorizontalAlign = (function () {
        function HorizontalAlign() {
        }
        var d = __define,c=HorizontalAlign;p=c.prototype;
        /**
         * @language en_US
         * Horizontally align content to the left of the container.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        HorizontalAlign.LEFT = "left";
        /**
         * @language en_US
         * Horizontally align content to the right of the container.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        HorizontalAlign.RIGHT = "right";
        /**
         * @language en_US
         * Horizontally align content in the center of the container.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        HorizontalAlign.CENTER = "center";
        /**
         * @language en_US
         * Horizontal alignment with both edges
         * Note: TextFiled does not support this alignment method.
         * @constant egret.HorizontalAlign.JUSTIFY
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????
         * ?????????TextFiled???????????????????????????
         * @constant egret.HorizontalAlign.JUSTIFY
         * @version Egret 2.4
         * @platform Web,Native
         */
        HorizontalAlign.JUSTIFY = "justify";
        /**
         * @language en_US
         * Align the content of the child items, relative to the container. This operation will adjust uniformly the size of all the child items to be the Content Width \" of the container \".
         * The Content Width \" of the container \" is the size of the max. child item. If the size of all child items are less than the width of the container, they will be adjusted to the width of the container.
         * Note: TextFiled does not support this alignment method.
         * @constant egret.HorizontalAlign.CONTENT_JUSTIFY
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????????????????????????????????????????"????????????"???
         * ?????????"????????????"????????????????????????,??????????????????????????????????????????????????????????????????????????????????????????????????????
         * ?????????TextFiled???????????????????????????
         * @constant egret.HorizontalAlign.CONTENT_JUSTIFY
         * @version Egret 2.4
         * @platform Web,Native
         */
        HorizontalAlign.CONTENT_JUSTIFY = "contentJustify";
        return HorizontalAlign;
    })();
    egret.HorizontalAlign = HorizontalAlign;
    egret.registerClass(HorizontalAlign,"egret.HorizontalAlign");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * Convert the text in html format to the object that can be assigned to the egret.TextField#textFlow property
     * @see http://docs.egret-labs.org/jkdoc/manual-text-multiformat.html Text mixed in a variety of style
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/text/HtmlTextParser.ts
     */
    /**
     * @language zh_CN
     * ???html????????????????????????????????? egret.TextField#textFlow ???????????????
     * @see http://docs.egret-labs.org/jkdoc/manual-text-multiformat.html ????????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/text/HtmlTextParser.ts
     */
    var HtmlTextParser = (function () {
        /**
         * @version Egret 2.4
         * @platform Web,Native
         */
        function HtmlTextParser() {
            this.replaceArr = [];
            /**
             * @private
             */
            this.resutlArr = [];
            this.initReplaceArr();
        }
        var d = __define,c=HtmlTextParser;p=c.prototype;
        p.initReplaceArr = function () {
            this.replaceArr = [];
            this.replaceArr.push([/&lt;/g, "<"]);
            this.replaceArr.push([/&gt;/g, ">"]);
            this.replaceArr.push([/&amp;/g, "&"]);
            this.replaceArr.push([/&quot;/g, "\""]);
            this.replaceArr.push([/&apos;/g, "\'"]);
        };
        /**
         * @private
         *
         * @param value
         * @returns
         */
        p.replaceSpecial = function (value) {
            for (var i = 0; i < this.replaceArr.length; i++) {
                var k = this.replaceArr[i][0];
                var v = this.replaceArr[i][1];
                value = value.replace(k, v);
            }
            return value;
        };
        /**
         * @language en_US
         * Convert the text in html format to the object that can be assigned to the egret.TextField#textFlow property
         * @param htmltext {string} Text in html
         * @returns {Array<egret.ITextElement>} ???????????? egret.TextField#textFlow Object that can be assigned to the egret.TextField#textFlow property
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???html????????????????????????????????? egret.TextField#textFlow ???????????????
         * @param htmltext {string} html??????
         * @returns {Array<egret.ITextElement>} ???????????? egret.TextField#textFlow ???????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.parser = function (htmltext) {
            this.stackArray = [];
            this.resutlArr = [];
            var firstIdx = 0; //?????????????????????
            var length = htmltext.length;
            while (firstIdx < length) {
                var starIdx = htmltext.indexOf("<", firstIdx);
                if (starIdx < 0) {
                    this.addToResultArr(htmltext.substring(firstIdx));
                    firstIdx = length;
                }
                else {
                    this.addToResultArr(htmltext.substring(firstIdx, starIdx));
                    var fontEnd = htmltext.indexOf(">", starIdx);
                    if (htmltext.charAt(starIdx + 1) == "\/") {
                        this.stackArray.pop();
                    }
                    else {
                        this.addToArray(htmltext.substring(starIdx + 1, fontEnd));
                    }
                    firstIdx = fontEnd + 1;
                }
            }
            return this.resutlArr;
        };
        /**
         * @private
         *
         * @param value
         */
        p.addToResultArr = function (value) {
            if (value == "") {
                return;
            }
            value = this.replaceSpecial(value);
            if (this.stackArray.length > 0) {
                this.resutlArr.push({ text: value, style: this.stackArray[this.stackArray.length - 1] });
            }
            else {
                this.resutlArr.push({ text: value });
            }
        };
        //?????????????????????Json??????
        p.changeStringToObject = function (str) {
            str = str.trim();
            var info = {};
            var header = [];
            if (str.charAt(0) == "i" || str.charAt(0) == "b" || str.charAt(0) == "u") {
                this.addProperty(info, str, "true");
            }
            else if (header = str.match(/^(font|a)\s/)) {
                str = str.substring(header[0].length).trim();
                var next = 0;
                var titles;
                while (titles = str.match(this.getHeadReg())) {
                    var title = titles[0];
                    var value = "";
                    var str = str.substring(title.length).trim();
                    if (str.charAt(0) == "\"") {
                        var next = str.indexOf("\"", 1);
                        value = str.substring(1, next);
                        next += 1;
                    }
                    else if (str.charAt(0) == "\'") {
                        var next = str.indexOf("\'", 1);
                        value = str.substring(1, next);
                        next += 1;
                    }
                    else {
                        value = str.match(/(\S)+/)[0];
                        next = value.length;
                    }
                    this.addProperty(info, title.substring(0, title.length - 1).trim(), value.trim());
                    str = str.substring(next).trim();
                }
            }
            return info;
        };
        /**
         * @private
         *
         * @returns
         */
        p.getHeadReg = function () {
            return /^(color|textcolor|strokecolor|stroke|b|bold|i|italic|u|size|fontfamily|href|target)(\s)*=/;
        };
        /**
         * @private
         *
         * @param info
         * @param head
         * @param value
         */
        p.addProperty = function (info, head, value) {
            switch (head.toLowerCase()) {
                case "color":
                case "textcolor":
                    value = value.replace(/#/, "0x");
                    info.textColor = parseInt(value);
                    break;
                case "strokecolor":
                    value = value.replace(/#/, "0x");
                    info.strokeColor = parseInt(value);
                    break;
                case "stroke":
                    info.stroke = parseInt(value);
                    break;
                case "b":
                case "bold":
                    info.bold = value == "true";
                    break;
                case "u":
                    info.underline = value == "true";
                    break;
                case "i":
                case "italic":
                    info.italic = value == "true";
                    break;
                case "size":
                    info.size = parseInt(value);
                    break;
                case "fontfamily":
                    info.fontFamily = value;
                    break;
                case "href":
                    info.href = this.replaceSpecial(value);
                    break;
                case "target":
                    info.target = this.replaceSpecial(value);
                    break;
            }
        };
        /**
         * @private
         *
         * @param infoStr
         */
        p.addToArray = function (infoStr) {
            var info = this.changeStringToObject(infoStr);
            if (this.stackArray.length == 0) {
                this.stackArray.push(info);
            }
            else {
                var lastInfo = this.stackArray[this.stackArray.length - 1];
                for (var key in lastInfo) {
                    if (info[key] == null) {
                        info[key] = lastInfo[key];
                    }
                }
                this.stackArray.push(info);
            }
        };
        return HtmlTextParser;
    })();
    egret.HtmlTextParser = HtmlTextParser;
    egret.registerClass(HtmlTextParser,"egret.HtmlTextParser");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @private
     * @version Egret 2.4
     * @platform Web,Native
     */
    var InputController = (function (_super) {
        __extends(InputController, _super);
        /**
         * @version Egret 2.4
         * @platform Web,Native
         */
        function InputController() {
            _super.call(this);
            /**
             * @private
             */
            this._text = null;
            /**
             * @private
             */
            this._isFocus = false;
        }
        var d = __define,c=InputController;p=c.prototype;
        /**
         *
         * @param text
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.init = function (text) {
            this._text = text;
            this.stageText = new egret.StageText();
            this.stageText.$setTextField(this._text);
        };
        /**
         * @private
         *
         */
        p._addStageText = function () {
            if (!this._text.$inputEnabled) {
                this._text.$touchEnabled = true;
            }
            this.stageText.$addToStage();
            this.stageText.addEventListener("updateText", this.updateTextHandler, this);
            this._text.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this);
            this._text.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStageDownHandler, this);
            this.stageText.addEventListener("blur", this.blurHandler, this);
            this.stageText.addEventListener("focus", this.focusHandler, this);
        };
        /**
         * @private
         *
         */
        p._removeStageText = function () {
            if (!this._text.$inputEnabled) {
                this._text.$touchEnabled = false;
            }
            this.stageText.$removeFromStage();
            this.stageText.removeEventListener("updateText", this.updateTextHandler, this);
            this._text.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this);
            this._text.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStageDownHandler, this);
            this.stageText.removeEventListener("blur", this.blurHandler, this);
            this.stageText.removeEventListener("focus", this.focusHandler, this);
        };
        /**
         * @private
         *
         * @returns
         */
        p._getText = function () {
            return this.stageText.$getText();
        };
        /**
         * @private
         *
         * @param value
         */
        p._setText = function (value) {
            this.stageText.$setText(value);
        };
        /**
         * @private
         *
         * @param event
         */
        p.focusHandler = function (event) {
            //???????????????????????????????????????????????????
            if (!this._isFocus) {
                this._isFocus = true;
                if (!event["showing"]) {
                    this._text.$isTyping = true;
                }
                this._text.$invalidateContentBounds();
                this._text.dispatchEvent(new egret.FocusEvent(egret.FocusEvent.FOCUS_IN, true));
            }
        };
        /**
         * @private
         *
         * @param event
         */
        p.blurHandler = function (event) {
            if (this._isFocus) {
                //???????????????????????????????????????????????????
                this._isFocus = false;
                this._text.$isTyping = false;
                this._text.$invalidateContentBounds();
                //?????????????????????
                this.stageText.$onBlur();
                this._text.dispatchEvent(new egret.FocusEvent(egret.FocusEvent.FOCUS_OUT, true));
            }
        };
        //????????????
        p.onMouseDownHandler = function (event) {
            event.stopPropagation();
            var self = this;
            if (!this._text.visible) {
                return;
            }
            if (this._isFocus) {
                return;
            }
            //???????????????????????????
            this.stageText.$show();
        };
        //???????????????
        p.onStageDownHandler = function (event) {
            this.stageText.$hide();
        };
        /**
         * @private
         *
         * @param event
         */
        p.updateTextHandler = function (event) {
            var values = this._text.$TextField;
            var textValue = this.stageText.$getText();
            var isChanged = false;
            if (values[35 /* restrictAnd */] != null) {
                var reg = new RegExp("[" + values[35 /* restrictAnd */] + "]", "g");
                var result = textValue.match(reg);
                if (result) {
                    textValue = result.join("");
                }
                else {
                    textValue = "";
                }
                isChanged = true;
            }
            if (values[36 /* restrictNot */] != null) {
                reg = new RegExp("[^" + values[36 /* restrictNot */] + "]", "g");
                result = textValue.match(reg);
                if (result) {
                    textValue = result.join("");
                }
                else {
                    textValue = "";
                }
                isChanged = true;
            }
            if (isChanged && this.stageText.$getText() != textValue) {
                this.stageText.$setText(textValue);
            }
            this.resetText();
            //??????change??????
            this._text.dispatchEvent(new egret.Event(egret.Event.CHANGE, true));
        };
        /**
         * @private
         *
         */
        p.resetText = function () {
            this._text.$setBaseText(this.stageText.$getText());
        };
        /**
         * @private
         *
         */
        p._hideInput = function () {
            this.stageText.$removeFromStage();
        };
        /**
         * @private
         *
         */
        p.updateInput = function () {
            if (!this._text.$visible && this.stageText) {
                this._hideInput();
            }
        };
        /**
         * @private
         *
         */
        p._updateProperties = function () {
            if (this._isFocus) {
                //????????????
                this.stageText.$resetStageText();
                this.updateInput();
                return;
            }
            var stage = this._text.$stage;
            if (stage == null) {
            }
            else {
                var item = this._text;
                var visible = item.$visible;
                while (true) {
                    if (!visible) {
                        break;
                    }
                    item = item.parent;
                    if (item == stage) {
                        break;
                    }
                    visible = item.$visible;
                }
            }
            this.stageText.$setText(this._text.$TextField[13 /* text */]);
            //????????????
            this.stageText.$resetStageText();
            this.updateInput();
        };
        return InputController;
    })(egret.HashObject);
    egret.InputController = InputController;
    egret.registerClass(InputController,"egret.InputController");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @version Egret 2.4
     * @platform Web,Native
     */
    egret.StageText;
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    var SplitRegex = new RegExp("(?=[\\u00BF-\\u1FFF\\u2C00-\\uD7FF]|\\b|\\s)(?![?????????????????????)}??????\\.\\,\\!\\?\\]\\:])");
    /**
     * @language en_US
     * TextField is the text rendering class of egret. It conducts rendering by using the browser / device API. Due to different ways of font rendering in different browsers / devices, there may be differences in the rendering
     * If developers expect  no differences among all platforms, please use BitmapText
     * @see http://docs.egret-labs.org/post/manual/text/createtext.html Create Text
     *
     * @event egret.Event.CHANGE Dispatched when entering text user input???
     * @event egret.FocusEvent.FOCUS_IN Dispatched after the focus to enter text.
     * @event egret.FocusEvent.FOCUS_OUT Enter the text loses focus after dispatch.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/text/TextField.ts
     */
    /**
     * @language zh_CN
     * TextField???egret????????????????????????????????????/?????????API????????????????????????????????????/??????????????????????????????????????????????????????????????????
     * ????????????????????????????????????????????????????????????BitmapText
     * @see http://docs.egret-labs.org/post/manual/text/createtext.html ????????????
     *
     * @event egret.Event.CHANGE ???????????????????????????????????????
     * @event egret.FocusEvent.FOCUS_IN ??????????????????????????????
     * @event egret.FocusEvent.FOCUS_OUT ????????????????????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/text/TextField.ts
     */
    var TextField = (function (_super) {
        __extends(TextField, _super);
        /**
         * @version Egret 2.4
         * @platform Web,Native
         */
        function TextField() {
            _super.call(this);
            this.$inputEnabled = false;
            /**
             * @private
             */
            this.inputUtils = null;
            /**
             * @private
             */
            this.bgGraphics = null;
            /**
             * @private
             */
            this.isFlow = false;
            /**
             * @private
             */
            this.textArr = [];
            /**
             * @private
             */
            this.linesArr = [];
            /**
             * @private
             */
            this.$isTyping = false;
            this.drawTempArray = [];
            this.$renderRegion = new egret.sys.Region();
            this.$TextField = {
                0: 30,
                1: 0,
                2: 0xffffff,
                3: NaN,
                4: NaN,
                5: 0,
                6: 0,
                7: 0,
                8: "sans-serif",
                9: "left",
                10: "top",
                11: "#ffffff",
                12: "",
                13: "",
                14: [],
                15: false,
                16: false,
                17: true,
                18: false,
                19: false,
                20: false,
                21: 0,
                22: 0,
                23: 0,
                24: egret.TextFieldType.DYNAMIC,
                25: 0x000000,
                26: "#000000",
                27: 0,
                28: -1,
                29: 0,
                30: false,
                31: false,
                32: 0x000000,
                33: false,
                34: 0xffffff,
                35: null,
                36: null //restrictNot
            };
        }
        var d = __define,c=TextField;p=c.prototype;
        /**
         * @private
         *
         * @returns
         */
        p.isInput = function () {
            return this.$TextField[24 /* type */] == egret.TextFieldType.INPUT;
        };
        p.$setTouchEnabled = function (value) {
            var result = _super.prototype.$setTouchEnabled.call(this, value);
            if (this.isInput()) {
                this.$inputEnabled = true;
            }
            return result;
        };
        d(p, "fontFamily"
            /**
             * @language en_US
             * The name of the font to use, or a comma-separated list of font names.
             * @default "sans-serif"
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????????????????????????????????????????????????????????
             * @default "sans-serif"
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[8 /* fontFamily */];
            }
            ,function (value) {
                this.$setFontFamily(value);
            }
        );
        p.$setFontFamily = function (value) {
            var values = this.$TextField;
            if (values[8 /* fontFamily */] == value) {
                return false;
            }
            values[8 /* fontFamily */] = value;
            this.invalidateFontString();
            return true;
        };
        d(p, "size"
            /**
             * @language en_US
             * The size in pixels of text
             * @default 30
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????
             * @default 30
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[0 /* fontSize */];
            }
            ,function (value) {
                this.$setSize(value);
            }
        );
        p.$setSize = function (value) {
            value = egret.sys.getNumber(value);
            var values = this.$TextField;
            if (values[0 /* fontSize */] == value) {
                return false;
            }
            values[0 /* fontSize */] = value;
            this.invalidateFontString();
            return true;
        };
        d(p, "bold"
            ///**
            // * @private
            // * @version Egret 2.4
            // * @platform Web,Native
            // */
            //public get fontSize():number {
            //    return this.$TextField[sys.TextKeys.fontSize];
            //}
            //
            ///**
            // * @private
            // */
            //public set fontSize(value:number) {
            //    value = egret.sys.getNumber(value);
            //
            //    var values = this.$TextField;
            //    if (values[sys.TextKeys.fontSize] == value) {
            //        return;
            //    }
            //    values[sys.TextKeys.fontSize] = value;
            //    this.invalidateFontString();
            //}
            /**
             * @language en_US
             * Specifies whether the text is boldface.
             * @default false
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????
             * @default false
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[15 /* bold */];
            }
            ,function (value) {
                this.$setBold(value);
            }
        );
        p.$setBold = function (value) {
            value = !!value;
            var values = this.$TextField;
            if (value == values[15 /* bold */]) {
                return false;
            }
            values[15 /* bold */] = value;
            this.invalidateFontString();
            return true;
        };
        d(p, "italic"
            /**
             * @language en_US
             * Determines whether the text is italic font.
             * @default false
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????
             * @default false
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[16 /* italic */];
            }
            ,function (value) {
                this.$setItalic(value);
            }
        );
        p.$setItalic = function (value) {
            value = !!value;
            var values = this.$TextField;
            if (value == values[16 /* italic */]) {
                return false;
            }
            values[16 /* italic */] = value;
            this.invalidateFontString();
            return true;
        };
        /**
         * @private
         *
         */
        p.invalidateFontString = function () {
            this.$TextField[17 /* fontStringChanged */] = true;
            this.$invalidateTextField();
        };
        /**
         * @private
         * ???????????????????????????????????????
         */
        p.getFontString = function () {
            var values = this.$TextField;
            if (values[17 /* fontStringChanged */]) {
                values[17 /* fontStringChanged */] = false;
                values[12 /* fontString */] = egret.sys.toFontString(this);
            }
            return values[12 /* fontString */];
        };
        d(p, "textAlign"
            /**
             * @language en_US
             * Horizontal alignment of text.
             * @default???egret.HorizontalAlign.LEFT
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????
             * @default???egret.HorizontalAlign.LEFT
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[9 /* textAlign */];
            }
            ,function (value) {
                this.$setTextAlign(value);
            }
        );
        p.$setTextAlign = function (value) {
            var values = this.$TextField;
            if (values[9 /* textAlign */] == value) {
                return false;
            }
            values[9 /* textAlign */] = value;
            this.$invalidateTextField();
            return true;
        };
        d(p, "verticalAlign"
            /**
             * @language en_US
             * Vertical alignment of text.
             * @default???egret.VerticalAlign.TOP
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????
             * @default???egret.VerticalAlign.TOP
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[10 /* verticalAlign */];
            }
            ,function (value) {
                this.$setVerticalAlign(value);
            }
        );
        p.$setVerticalAlign = function (value) {
            var values = this.$TextField;
            if (values[10 /* verticalAlign */] == value) {
                return false;
            }
            values[10 /* verticalAlign */] = value;
            this.$invalidateTextField();
            return true;
        };
        d(p, "lineSpacing"
            /**
             * @language en_US
             * An integer representing the amount of vertical space between lines.
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[1 /* lineSpacing */];
            }
            ,function (value) {
                this.$setLineSpacing(value);
            }
        );
        p.$setLineSpacing = function (value) {
            value = egret.sys.getNumber(value);
            var values = this.$TextField;
            if (values[1 /* lineSpacing */] == value)
                return false;
            values[1 /* lineSpacing */] = value;
            this.$invalidateTextField();
            return true;
        };
        d(p, "textColor"
            /**
             * @language en_US
             * Color of the text.
             * @default 0x000000
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????
             * @default 0x000000
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[2 /* textColor */];
            }
            ,function (value) {
                this.$setTextColor(value);
            }
        );
        p.$setTextColor = function (value) {
            value = +value | 0;
            var values = this.$TextField;
            if (values[2 /* textColor */] == value) {
                return false;
            }
            values[2 /* textColor */] = value;
            values[11 /* textColorString */] = egret.toColorString(value);
            this.$invalidate();
            return true;
        };
        d(p, "wordWrap"
            /**
             * @language en_US
             * A Boolean value that indicates whether the text field has word wrap. If the value of wordWrap is true, the text
             * field has word wrap; if the value is false, the text field does not have word wrap.
             * @default true
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????????????? wordWrap ????????? true????????????????????????????????????
             * ???????????? false????????????????????????????????????,????????????????????????????????????????????????????????????????????????
             * @default true
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[19 /* wordWrap */];
            }
            ,function (value) {
                value = !!value;
                var values = this.$TextField;
                if (value == values[19 /* wordWrap */]) {
                    return;
                }
                if (values[20 /* displayAsPassword */]) {
                    return;
                }
                values[19 /* wordWrap */] = value;
                this.$invalidateTextField();
            }
        );
        d(p, "type"
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[24 /* type */];
            }
            /**
             * @language en_US
             * Type of the text field.
             * Any one of the following TextFieldType constants: TextFieldType.DYNAMIC (specifies the dynamic text field that users can not edit), or TextFieldType.INPUT (specifies the dynamic text field that users can edit).
             * @default egret.TextFieldType.DYNAMIC
             */
            /**
             * @language zh_CN
             * ????????????????????????
             * ?????? TextFieldType ????????????????????????TextFieldType.DYNAMIC????????????????????????????????????????????????????????? TextFieldType.INPUT??????????????????????????????????????????????????????
             * @default egret.TextFieldType.DYNAMIC
             */
            ,function (value) {
                this.$setType(value);
            }
        );
        /**
         * @private
         *
         * @param value
         */
        p.$setType = function (value) {
            if (this.$TextField[24 /* type */] != value) {
                this.$TextField[24 /* type */] = value;
                if (value == egret.TextFieldType.INPUT) {
                    if (isNaN(this.$TextField[3 /* textFieldWidth */])) {
                        this.$setWidth(100);
                    }
                    if (isNaN(this.$TextField[4 /* textFieldHeight */])) {
                        this.$setHeight(30);
                    }
                    this.$setTouchEnabled(true);
                    //??????stageText
                    if (this.inputUtils == null) {
                        this.inputUtils = new egret.InputController();
                    }
                    this.inputUtils.init(this);
                    this.$invalidateTextField();
                    if (this.$stage) {
                        this.inputUtils._addStageText();
                    }
                }
                else {
                    if (this.inputUtils) {
                        this.inputUtils._removeStageText();
                        this.inputUtils = null;
                    }
                    this.$setTouchEnabled(false);
                }
                return true;
            }
            return false;
        };
        d(p, "text"
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$getText();
            }
            /**
             * @language en_US
             * Serve as a string of the current text field in the text
             */
            /**
             * @language zh_CN
             * ?????????????????????????????????????????????
             */
            ,function (value) {
                this.$setText(value);
            }
        );
        /**
         * @private
         *
         * @returns
         */
        p.$getText = function () {
            if (this.$TextField[24 /* type */] == egret.TextFieldType.INPUT) {
                return this.inputUtils._getText();
            }
            return this.$TextField[13 /* text */];
        };
        /**
         * @private
         *
         * @param value
         */
        p.$setBaseText = function (value) {
            if (value == null) {
                value = "";
            }
            value = value.toString();
            this.isFlow = false;
            if (this.$TextField[13 /* text */] != value) {
                this.$invalidateTextField();
                this.$TextField[13 /* text */] = value;
                var text = "";
                if (this.$TextField[20 /* displayAsPassword */]) {
                    text = this.changeToPassText(value);
                }
                else {
                    text = value;
                }
                this.setMiddleStyle([{ text: text }]);
                return true;
            }
            return false;
        };
        /**
         * @private
         *
         * @param value
         */
        p.$setText = function (value) {
            if (value == null) {
                value = "";
            }
            var result = this.$setBaseText(value);
            if (this.inputUtils) {
                this.inputUtils._setText(this.$TextField[13 /* text */]);
            }
            return result;
        };
        d(p, "displayAsPassword"
            /**
             * @language en_US
             * Specify whether the text field is a password text field.
             * If the value of this property is true, the text field is treated as a password text field and hides the input characters using asterisks instead of the actual characters. If false, the text field is not treated as a password text field.
             * @default false
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????????????????
             * ???????????????????????? true???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? false??????????????????????????????????????????????????????
             * @default false
             */
            ,function () {
                return this.$TextField[20 /* displayAsPassword */];
            }
            ,function (value) {
                this.$setDisplayAsPassword(value);
            }
        );
        /**
         * @private
         *
         * @param value
         */
        p.$setDisplayAsPassword = function (value) {
            var self = this;
            if (this.$TextField[20 /* displayAsPassword */] != value) {
                this.$TextField[20 /* displayAsPassword */] = value;
                this.$invalidateTextField();
                var text = "";
                if (value) {
                    text = this.changeToPassText(this.$TextField[13 /* text */]);
                }
                else {
                    text = this.$TextField[13 /* text */];
                }
                this.setMiddleStyle([{ text: text }]);
                return true;
            }
            return false;
        };
        d(p, "strokeColor"
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[25 /* strokeColor */];
            }
            /**
             * @language en_US
             * Represent the stroke color of the text.
             * Contain three 8-bit numbers with RGB color components; for example, 0xFF0000 is red, 0x00FF00 is green.
             * @default 0x000000
             */
            /**
             * @language zh_CN
             * ??????????????????????????????
             * ???????????? 8 ??? RGB ?????????????????????????????????0xFF0000 ????????????0x00FF00 ????????????
             * @default 0x000000
             */
            ,function (value) {
                this.$setStrokeColor(value);
            }
        );
        /**
         * @private
         *
         * @param value
         */
        p.$setStrokeColor = function (value) {
            if (this.$TextField[25 /* strokeColor */] != value) {
                this.$invalidateTextField();
                this.$TextField[25 /* strokeColor */] = value;
                this.$TextField[26 /* strokeColorString */] = egret.toColorString(value);
                return true;
            }
            return false;
        };
        d(p, "stroke"
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[27 /* stroke */];
            }
            /**
             * @language en_US
             * Indicate the stroke width.
             * 0 means no stroke.
             * @default 0
             */
            /**
             * @language zh_CN
             * ?????????????????????
             * 0??????????????????
             * @default 0
             */
            ,function (value) {
                this.$setStroke(value);
            }
        );
        /**
         * @private
         *
         * @param value
         */
        p.$setStroke = function (value) {
            if (this.$TextField[27 /* stroke */] != value) {
                this.$invalidateTextField();
                this.$TextField[27 /* stroke */] = value;
                return true;
            }
            return false;
        };
        d(p, "maxChars"
            /**
             * @language en_US
             * The maximum number of characters that the text field can contain, as entered by a user. \n A script can insert more text than maxChars allows; the maxChars property indicates only how much text a user can enter. If the value of this property is 0, a user can enter an unlimited amount of text.
             * The default value is 0.
             * @default 0
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????????????????????????????
             * ????????????????????? maxChars ????????????????????????????????????maxChars ???????????????????????????????????????????????????????????????????????? 0????????????????????????????????????????????????
             * @default 0
             */
            ,function () {
                return this.$TextField[21 /* maxChars */];
            }
            ,function (value) {
                this.$setMaxChars(value);
            }
        );
        /**
         * @private
         *
         * @param value
         */
        p.$setMaxChars = function (value) {
            if (this.$TextField[21 /* maxChars */] != value) {
                this.$TextField[21 /* maxChars */] = value;
                return true;
            }
            return false;
        };
        d(p, "scrollV"
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return Math.min(Math.max(this.$TextField[28 /* scrollV */], 1), this.maxScrollV);
            }
            /**
             * @language en_US
             * Vertical position of text in a text field. scrollV property helps users locate specific passages in a long article, and create scrolling text fields.
             * Vertically scrolling units are lines, and horizontal scrolling unit is pixels.
             * If the first displayed line is the first line in the text field, scrollV is set to 1 (instead of 0).
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????scrollV ???????????????????????????????????????????????????????????????????????????????????????????????????
             * ??????????????????????????????????????????????????????????????????
             * ???????????????????????????????????????????????????????????? scrollV ????????? 1????????? 0??????
             */
            ,function (value) {
                this.$TextField[28 /* scrollV */] = Math.max(value, 1);
                this.$invalidateTextField();
            }
        );
        d(p, "maxScrollV"
            /**
             * @language en_US
             * The maximum value of scrollV
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * scrollV ????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                this.$getLinesArr();
                return Math.max(this.$TextField[29 /* numLines */] - egret.TextFieldUtils.$getScrollNum(this) + 1, 1);
            }
        );
        d(p, "selectionBeginIndex"
            /**
             * @private
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return 0;
            }
        );
        d(p, "selectionEndIndex"
            /**
             * @private
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return 0;
            }
        );
        d(p, "caretIndex"
            /**
             * @private
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return 0;
            }
        );
        /**
         * @private
         *
         * @param beginIndex
         * @param endIndex
         */
        p.$setSelection = function (beginIndex, endIndex) {
            return false;
        };
        /**
         * @private
         *
         * @returns
         */
        p.$getLineHeight = function () {
            return this.$TextField[1 /* lineSpacing */] + this.$TextField[0 /* fontSize */];
        };
        d(p, "numLines"
            /**
             * @language en_US
             * Number of lines of text.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                this.$getLinesArr();
                return this.$TextField[29 /* numLines */];
            }
        );
        d(p, "multiline"
            ,function () {
                return this.$TextField[30 /* multiline */];
            }
            /**
             * @language en_US
             * Indicate whether field is a multiline text field. Note that this property is valid only when the type is TextFieldType.INPUT.
             * If the value is true, the text field is multiline; if the value is false, the text field is a single-line text field. In a field of type TextFieldType.INPUT, the multiline value determines whether the Enter key creates a new line (a value of false, and the Enter key is ignored).
             * @default false
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????????????????type???TextFieldType.INPUT???????????????
             * ???????????? true?????????????????????????????????????????????????????? false?????????????????????????????????????????????????????? TextFieldType.INPUT ???????????????multiline ???????????? Enter ???????????????????????????????????? false??????????????? Enter ?????????
             * @default false
             */
            ,function (value) {
                this.$setMultiline(value);
            }
        );
        /**
         * @private
         *
         * @param value
         */
        p.$setMultiline = function (value) {
            this.$TextField[30 /* multiline */] = value;
            this.$invalidateTextField();
            return true;
        };
        d(p, "restrict"
            ,function () {
                var values = this.$TextField;
                var str = null;
                if (values[35 /* restrictAnd */] != null) {
                    str = values[35 /* restrictAnd */];
                }
                if (values[36 /* restrictNot */] != null) {
                    if (str == null) {
                        str = "";
                    }
                    str += "^" + values[36 /* restrictNot */];
                }
                return str;
            }
            /**
             * @language en_US
             * Indicates a user can enter into the text field character set. If you restrict property is null, you can enter any character. If you restrict property is an empty string, you can not enter any character. If you restrict property is a string of characters, you can enter only characters in the string in the text field. The string is scanned from left to right. You can use a hyphen (-) to specify a range. Only restricts user interaction; a script may put any text into the text field. <br/>
             * If the string of characters caret (^) at the beginning, all characters are initially accepted, then the string are excluded from receiving ^ character. If the string does not begin with a caret (^) to, any characters are initially accepted and then a string of characters included in the set of accepted characters. <br/>
             * The following example allows only uppercase characters, spaces, and numbers in the text field: <br/>
             * My_txt.restrict = "A-Z 0-9"; <br/>
             * The following example includes all characters except lowercase letters: <br/>
             * My_txt.restrict = "^ a-z"; <br/>
             * If you need to enter characters \ ^, use two backslash "\\ -" "\\ ^": <br/>
             * Can be used anywhere in the string ^ to rule out including characters and switch between characters, but can only be used to exclude a ^. The following code includes only uppercase letters except uppercase Q: <br/>
             * My_txt.restrict = "A-Z ^ Q"; <br/>
             * @version Egret 2.4
             * @platform Web,Native
             * @default null
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????????????????????????????? restrict ??????????????? null??????????????????????????????????????? restrict ?????????????????????????????????????????????????????????????????? restrict ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? (-) ?????????????????????????????????????????????????????????????????????????????????????????????<br/>
             * ???????????????????????? (^) ????????????????????????????????????????????????????????????????????????????????? ^ ????????????????????????????????????????????? (^) ??????????????????????????????????????????????????????????????????????????????????????????????????????<br/>
             * ????????????????????????????????????????????????????????????????????????<br/>
             * my_txt.restrict = "A-Z 0-9";<br/>
             * ???????????????????????????????????????????????????<br/>
             * my_txt.restrict = "^a-z";<br/>
             * ???????????????????????? \ ^????????????2???????????? "\\-" "\\^" ???<br/>
             * ??????????????????????????????????????? ^???????????????????????????????????????????????????????????????????????????????????? ^ ?????????????????????????????????????????????????????? Q ????????????????????????<br/>
             * my_txt.restrict = "A-Z^Q";<br/>
             * @version Egret 2.4
             * @platform Web,Native
             * @default null
             */
            ,function (value) {
                var values = this.$TextField;
                if (value == null) {
                    values[35 /* restrictAnd */] = null;
                    values[36 /* restrictNot */] = null;
                }
                else {
                    var index = -1;
                    while (index < value.length) {
                        index = value.indexOf("^", index);
                        if (index == 0) {
                            break;
                        }
                        else if (index > 0) {
                            if (value.charAt(index - 1) != "\\") {
                                break;
                            }
                            index++;
                        }
                        else {
                            break;
                        }
                    }
                    if (index == 0) {
                        values[35 /* restrictAnd */] = null;
                        values[36 /* restrictNot */] = value.substring(index + 1);
                    }
                    else if (index > 0) {
                        values[35 /* restrictAnd */] = value.substring(0, index);
                        values[36 /* restrictNot */] = value.substring(index + 1);
                    }
                    else {
                        values[35 /* restrictAnd */] = value;
                        values[36 /* restrictNot */] = null;
                    }
                }
            }
        );
        /**
         * @private
         *
         * @param value
         */
        p.$setWidth = function (value) {
            var values = this.$TextField;
            if (isNaN(value)) {
                if (isNaN(values[3 /* textFieldWidth */])) {
                    return false;
                }
                values[3 /* textFieldWidth */] = NaN;
            }
            else {
                if (values[3 /* textFieldWidth */] == value) {
                    return false;
                }
                values[3 /* textFieldWidth */] = value;
            }
            value = +value;
            if (value < 0) {
                return false;
            }
            this.$invalidateTextField();
            return true;
        };
        /**
         * @private
         *
         * @param value
         */
        p.$setHeight = function (value) {
            var values = this.$TextField;
            if (isNaN(value)) {
                if (isNaN(values[4 /* textFieldHeight */])) {
                    return false;
                }
                values[4 /* textFieldHeight */] = NaN;
            }
            else {
                if (values[4 /* textFieldHeight */] == value) {
                    return false;
                }
                values[4 /* textFieldHeight */] = value;
            }
            value = +value;
            if (value < 0) {
                return false;
            }
            this.$invalidateTextField();
            return true;
        };
        /**
         * @private
         * ??????????????????
         */
        p.$getWidth = function () {
            var values = this.$TextField;
            return isNaN(values[3 /* textFieldWidth */]) ? this.$getContentBounds().width : values[3 /* textFieldWidth */];
        };
        /**
         * @private
         * ??????????????????
         */
        p.$getHeight = function () {
            var values = this.$TextField;
            return isNaN(values[4 /* textFieldHeight */]) ? this.$getContentBounds().height : values[4 /* textFieldHeight */];
        };
        d(p, "border"
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[31 /* border */];
            }
            /**
             * @language en_US
             * Specifies whether the text field has a border.
             * If true, the text field has a border. If false, the text field has no border.
             * Use borderColor property to set the border color.
             * @default false
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????????
             * ????????? true?????????????????????????????????????????? false?????????????????????????????????
             * ?????? borderColor ??????????????????????????????
             * @default false
             */
            ,function (value) {
                this.$TextField[31 /* border */] = value;
                this.fillBackground();
            }
        );
        d(p, "borderColor"
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[32 /* borderColor */];
            }
            /**
             * @language en_US
             * The color of the text field border.
             * Even currently is no border can be retrieved or set this property, but only if the text field has the border property is set to true, the color is visible.
             * @default 0x000000
             */
            /**
             * @language zh_CN
             * ??????????????????????????????
             * ?????????????????????????????????????????????????????????????????????????????????????????? border ??????????????? true ??????????????????????????????
             * @default 0x000000
             */
            ,function (value) {
                this.$TextField[32 /* borderColor */] = value;
                this.fillBackground();
            }
        );
        d(p, "background"
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[33 /* background */];
            }
            /**
             * @language en_US
             * Specifies whether the text field has a background fill.
             * If true, the text field has a background fill. If false, the text field has no background fill.
             * Use the backgroundColor property to set the background color of the text field.
             * @default false
             */
            /**
             * @language zh_CN
             * ?????????????????????????????????????????????
             * ????????? true???????????????????????????????????????????????? false???????????????????????????????????????
             * ?????? backgroundColor ?????????????????????????????????????????????
             * @default false
             */
            ,function (value) {
                this.$TextField[33 /* background */] = value;
                this.fillBackground();
            }
        );
        d(p, "backgroundColor"
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[34 /* backgroundColor */];
            }
            /**
             * @language en_US
             * Color of the text field background.
             * Even currently is no background, can be retrieved or set this property, but only if the text field has the background property set to true, the color is visible.
             * @default 0xFFFFFF
             */
            /**
             * @language zh_CN
             * ??????????????????????????????
             * ?????????????????????????????????????????????????????????????????????????????????????????? background ??????????????? true ??????????????????????????????
             * @default 0xFFFFFF
             */
            ,function (value) {
                this.$TextField[34 /* backgroundColor */] = value;
                this.fillBackground();
            }
        );
        /**
         * @private
         *
         */
        p.fillBackground = function () {
            var self = this;
            var graphics = self.bgGraphics;
            if (graphics) {
                graphics.clear();
            }
            if (this.$TextField[33 /* background */] || this.$TextField[31 /* border */]) {
                if (graphics == null) {
                    graphics = self.bgGraphics = new egret.Graphics();
                    this.bgGraphics.$renderContext.$targetDisplay = this;
                }
                if (this.$TextField[33 /* background */]) {
                    graphics.beginFill(this.$TextField[34 /* backgroundColor */], 1);
                }
                if (this.$TextField[31 /* border */]) {
                    graphics.lineStyle(1, this.$TextField[32 /* borderColor */]);
                }
                graphics.drawRect(0, 0, self.$getWidth(), self.$getHeight());
                graphics.endFill();
            }
        };
        /**
         * @private
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.setFocus = function () {
            //todo:
            egret.$warn(1013);
        };
        /**
         * @private
         *
         */
        p.$onRemoveFromStage = function () {
            _super.prototype.$onRemoveFromStage.call(this);
            this.removeEvent();
            if (this.$TextField[24 /* type */] == egret.TextFieldType.INPUT) {
                this.inputUtils._removeStageText();
            }
        };
        /**
         * @private
         *
         * @param stage
         * @param nestLevel
         */
        p.$onAddToStage = function (stage, nestLevel) {
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            this.addEvent();
            if (this.$TextField[24 /* type */] == egret.TextFieldType.INPUT) {
                this.inputUtils._addStageText();
            }
        };
        /**
         * ????????????$invalidateContentBounds???????????????graphics??????clear????????????$invalidateContentBounds???????????????????????????????????????
         */
        p.$invalidateTextField = function () {
            this.$invalidateContentBounds();
            this.$TextField[18 /* textLinesChanged */] = true;
        };
        /**
         * @private
         */
        p.$measureContentBounds = function (bounds) {
            var self = this;
            this.$getLinesArr();
            var w = !isNaN(this.$TextField[3 /* textFieldWidth */]) ? this.$TextField[3 /* textFieldWidth */] : this.$TextField[5 /* textWidth */];
            var h = !isNaN(this.$TextField[4 /* textFieldHeight */]) ? this.$TextField[4 /* textFieldHeight */] : egret.TextFieldUtils.$getTextHeight(self);
            if (self.border) {
                w += 2;
                h += 2;
            }
            bounds.setTo(0, 0, w, h);
        };
        /**
         * @private
         * @see egret.DisplayObject._render
         * @param renderContext
         */
        p.$render = function (renderContext) {
            if (this.bgGraphics)
                this.bgGraphics.$render(renderContext);
            if (this.$TextField[24 /* type */] == egret.TextFieldType.INPUT) {
                this.inputUtils._updateProperties();
                if (this.$isTyping) {
                    return;
                }
            }
            else if (this.$TextField[3 /* textFieldWidth */] == 0) {
                return;
            }
            this.drawText(renderContext);
        };
        d(p, "textFlow"
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.textArr;
            }
            /**
             * @language en_US
             * Set rich text
             */
            /**
             * @language zh_CN
             * ???????????????
             * @see http://edn.egret.com/cn/index.php/article/index/id/146
             */
            ,function (textArr) {
                this.isFlow = true;
                var text = "";
                if (textArr == null)
                    textArr = [];
                for (var i = 0; i < textArr.length; i++) {
                    var element = textArr[i];
                    text += element.text;
                }
                if (this.$TextField[20 /* displayAsPassword */]) {
                    this.$setBaseText(text);
                }
                else {
                    this.$TextField[13 /* text */] = text;
                    this.setMiddleStyle(textArr);
                }
            }
        );
        /**
         * @private
         *
         * @param text
         * @returns
         */
        p.changeToPassText = function (text) {
            if (this.$TextField[20 /* displayAsPassword */]) {
                var passText = "";
                for (var i = 0, num = text.length; i < num; i++) {
                    switch (text.charAt(i)) {
                        case '\n':
                            passText += "\n";
                            break;
                        case '\r':
                            break;
                        default:
                            passText += '*';
                    }
                }
                return passText;
            }
            return text;
        };
        /**
         * @private
         *
         * @param textArr
         */
        p.setMiddleStyle = function (textArr) {
            this.$TextField[18 /* textLinesChanged */] = true;
            this.textArr = textArr;
            this.$invalidateTextField();
        };
        d(p, "textWidth"
            /**
             * @language en_US
             * Get the text measured width
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                this.$getLinesArr();
                return this.$TextField[5 /* textWidth */];
            }
        );
        d(p, "textHeight"
            /**
             * @language en_US
             * Get Text measuring height
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                this.$getLinesArr();
                return egret.TextFieldUtils.$getTextHeight(this);
            }
        );
        /**
         * @private
         * @param text
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.appendText = function (text) {
            this.appendElement({ text: text });
        };
        /**
         * @private
         * @param element
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.appendElement = function (element) {
            var text = this.$TextField[13 /* text */] + element.text;
            if (this.$TextField[20 /* displayAsPassword */]) {
                this.$setBaseText(text);
            }
            else {
                this.$TextField[13 /* text */] = text;
                this.textArr.push(element);
                this.setMiddleStyle(this.textArr);
            }
        };
        /**
         * @private
         *
         * @returns
         */
        p.$getLinesArr = function () {
            var self = this;
            if (!self.$TextField[18 /* textLinesChanged */]) {
                return self.linesArr;
            }
            self.$TextField[18 /* textLinesChanged */] = false;
            var text2Arr = self.textArr;
            var renderContext = egret.sys.sharedRenderContext;
            self.linesArr.length = 0;
            this.$TextField[6 /* textHeight */] = 0;
            this.$TextField[5 /* textWidth */] = 0;
            var textFieldWidth = this.$TextField[3 /* textFieldWidth */];
            //??????????????????0
            if (!isNaN(textFieldWidth) && textFieldWidth == 0) {
                this.$TextField[29 /* numLines */] = 0;
                return [{ width: 0, height: 0, charNum: 0, elements: [], hasNextLine: false }];
            }
            if (!self.isFlow) {
                setupFont(renderContext, self);
            }
            var linesArr = self.linesArr;
            var lineW = 0;
            var lineCharNum = 0;
            var lineH = 0;
            var lineCount = 0;
            var lineElement;
            for (var i = 0, text2ArrLength = text2Arr.length; i < text2ArrLength; i++) {
                var element = text2Arr[i];
                element.style = element.style || {};
                var text = element.text.toString();
                var textArr = text.split(/(?:\r\n|\r|\n)/);
                for (var j = 0, textArrLength = textArr.length; j < textArrLength; j++) {
                    if (linesArr[lineCount] == null) {
                        lineElement = { width: 0, height: 0, elements: [], charNum: 0, hasNextLine: false };
                        linesArr[lineCount] = lineElement;
                        lineW = 0;
                        lineH = 0;
                        lineCharNum = 0;
                    }
                    if (this.$TextField[24 /* type */] == egret.TextFieldType.INPUT) {
                        lineH = this.$TextField[0 /* fontSize */];
                    }
                    else {
                        lineH = Math.max(lineH, element.style.size || this.$TextField[0 /* fontSize */]);
                    }
                    var isNextLine = true;
                    if (textArr[j] == "") {
                        if (j == textArrLength - 1) {
                            isNextLine = false;
                        }
                    }
                    else {
                        if (self.isFlow) {
                            setupFont(renderContext, self, element.style);
                        }
                        var w = renderContext.measureText(textArr[j]).width;
                        if (isNaN(textFieldWidth)) {
                            lineW += w;
                            lineCharNum += textArr[j].length;
                            lineElement.elements.push({
                                width: w,
                                text: textArr[j],
                                style: element.style
                            });
                            if (j == textArrLength - 1) {
                                isNextLine = false;
                            }
                        }
                        else {
                            if (lineW + w <= textFieldWidth) {
                                lineElement.elements.push({
                                    width: w,
                                    text: textArr[j],
                                    style: element.style
                                });
                                lineW += w;
                                lineCharNum += textArr[j].length;
                                if (j == textArrLength - 1) {
                                    isNextLine = false;
                                }
                            }
                            else {
                                var k = 0;
                                var ww = 0;
                                var word = textArr[j];
                                if (this.$TextField[19 /* wordWrap */]) {
                                    var words = word.split(SplitRegex);
                                }
                                else {
                                    words = word.match(/./g);
                                }
                                var wl = words.length;
                                var charNum = 0;
                                for (; k < wl; k++) {
                                    w = renderContext.measureText(words[k]).width;
                                    if (lineW != 0 && lineW + w > textFieldWidth && lineW + k != 0) {
                                        break;
                                    }
                                    charNum += words[k].length;
                                    ww += w;
                                    lineW += w;
                                    lineCharNum += charNum;
                                }
                                if (k > 0) {
                                    lineElement.elements.push({
                                        width: ww,
                                        text: word.substring(0, charNum),
                                        style: element.style
                                    });
                                    var leftWord = word.substring(charNum);
                                    for (var m = 0, lwleng = leftWord.length; m < lwleng; m++) {
                                        if (leftWord.charAt(m) != " ") {
                                            break;
                                        }
                                    }
                                    textArr[j] = leftWord.substring(m);
                                }
                                if (textArr[j] != "") {
                                    j--;
                                    isNextLine = false;
                                }
                            }
                        }
                    }
                    if (isNextLine) {
                        lineCharNum++;
                        lineElement.hasNextLine = true;
                    }
                    if (j < textArr.length - 1) {
                        lineElement.width = lineW;
                        lineElement.height = lineH;
                        lineElement.charNum = lineCharNum;
                        this.$TextField[5 /* textWidth */] = Math.max(this.$TextField[5 /* textWidth */], lineW);
                        this.$TextField[6 /* textHeight */] += lineH;
                        //if (self._type == TextFieldType.INPUT && !self._multiline) {
                        //    self._numLines = linesArr.length;
                        //    return linesArr;
                        //}
                        lineCount++;
                    }
                }
                if (i == text2Arr.length - 1 && lineElement) {
                    lineElement.width = lineW;
                    lineElement.height = lineH;
                    lineElement.charNum = lineCharNum;
                    this.$TextField[5 /* textWidth */] = Math.max(this.$TextField[5 /* textWidth */], lineW);
                    this.$TextField[6 /* textHeight */] += lineH;
                }
            }
            this.$TextField[29 /* numLines */] = linesArr.length;
            this.fillBackground();
            return linesArr;
        };
        /**
         * @private
         * @param renderContext
         * @returns {Rectangle}
         */
        p.drawText = function (renderContext) {
            var self = this;
            var values = this.$TextField;
            //????????????????????????
            var lines = self.$getLinesArr();
            if (values[5 /* textWidth */] == 0) {
                return;
            }
            var maxWidth = !isNaN(values[3 /* textFieldWidth */]) ? values[3 /* textFieldWidth */] : values[5 /* textWidth */];
            var textHeight = egret.TextFieldUtils.$getTextHeight(self);
            var drawY = 0;
            var startLine = egret.TextFieldUtils.$getStartLine(self);
            var textFieldHeight = values[4 /* textFieldHeight */];
            if (!isNaN(textFieldHeight) && textFieldHeight > textHeight) {
                var valign = egret.TextFieldUtils.$getValign(self);
                drawY += valign * (textFieldHeight - textHeight);
            }
            drawY = Math.round(drawY);
            var halign = egret.TextFieldUtils.$getHalign(self);
            var drawX = 0;
            for (var i = startLine, numLinesLength = values[29 /* numLines */]; i < numLinesLength; i++) {
                var line = lines[i];
                var h = line.height;
                drawY += h / 2;
                if (i != startLine) {
                    if (values[24 /* type */] == egret.TextFieldType.INPUT && !values[30 /* multiline */]) {
                        break;
                    }
                    if (!isNaN(textFieldHeight) && drawY > textFieldHeight) {
                        break;
                    }
                }
                drawX = Math.round((maxWidth - line.width) * halign);
                for (var j = 0, elementsLength = line.elements.length; j < elementsLength; j++) {
                    var element = line.elements[j];
                    var size = element.style.size || values[0 /* fontSize */];
                    drawText(renderContext, self, element.text, drawX, drawY + (h - size) / 2, element.width, element.style);
                    if (element.style.underline) {
                        this.drawTempArray.push({ "x": drawX, "y": drawY + (h) / 2, "w": element.width, "c": element.style.textColor });
                    }
                    drawX += element.width;
                }
                drawY += h / 2 + values[1 /* lineSpacing */];
            }
            //???????????????
            if (this.drawTempArray.length > 0) {
                renderContext.save();
                renderContext.lineWidth = 2; //?????????2???1????????????????????????????????????????????????
                for (var i1 = 0; i1 < this.drawTempArray.length; i1++) {
                    var underInfo = this.drawTempArray[i1];
                    var textColor;
                    if (underInfo["c"] != null) {
                        textColor = egret.toColorString(underInfo["c"]);
                    }
                    else {
                        textColor = values[11 /* textColorString */];
                    }
                    renderContext.beginPath(); //??????????????????????????????
                    renderContext.strokeStyle = textColor;
                    renderContext.moveTo(underInfo["x"], underInfo["y"]);
                    renderContext.lineTo(underInfo["x"] + underInfo["w"], underInfo["y"]);
                    renderContext.closePath();
                    renderContext.stroke();
                }
                renderContext.restore();
                this.drawTempArray.length = 0;
            }
        };
        //??????????????????
        p.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);
        };
        //??????????????????
        p.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);
        };
        //?????????????????????href???
        p.onTapHandler = function (e) {
            if (this.$TextField[24 /* type */] == egret.TextFieldType.INPUT) {
                return;
            }
            var ele = egret.TextFieldUtils.$getTextElement(this, e.localX, e.localY);
            if (ele == null) {
                return;
            }
            var style = ele.style;
            if (style && style.href) {
                if (style.href.match(/^event:/)) {
                    var type = style.href.match(/^event:/)[0];
                    egret.TextEvent.dispatchTextEvent(this, egret.TextEvent.LINK, style.href.substring(type.length));
                }
                else {
                    open(style.href, style.target || "_blank");
                }
            }
        };
        /**
         * @language en_US
         * default fontFamily
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        TextField.default_fontFamily = "Arial";
        return TextField;
    })(egret.DisplayObject);
    egret.TextField = TextField;
    egret.registerClass(TextField,"egret.TextField");
    /**
     * @private
     *
     * @param renderContext
     * @param textfield
     * @param text
     * @param x
     * @param y
     * @param maxWidth
     * @param style
     */
    function drawText(renderContext, textfield, text, x, y, maxWidth, style) {
        if (style === void 0) { style = null; }
        setupFont(renderContext, textfield, style);
        style = style || {};
        var textColor;
        if (style.textColor != null) {
            textColor = egret.toColorString(style.textColor);
        }
        else {
            textColor = textfield.$TextField[11 /* textColorString */];
        }
        var strokeColor;
        if (style.strokeColor != null) {
            strokeColor = egret.toColorString(style.strokeColor);
        }
        else {
            strokeColor = textfield.$TextField[26 /* strokeColorString */];
        }
        var outline;
        if (style.stroke != null) {
            outline = style.stroke;
        }
        else {
            outline = textfield.$TextField[27 /* stroke */];
        }
        renderContext.fillStyle = textColor;
        renderContext.strokeStyle = strokeColor;
        if (outline) {
            renderContext.lineWidth = outline * 2;
            renderContext.strokeText(text, x, y, maxWidth || 0xFFFF);
        }
        renderContext.fillText(text, x, y, maxWidth || 0xFFFF);
    }
    /**
     * @private
     *
     * @param renderContext
     * @param textField
     * @param style
     */
    function setupFont(renderContext, textField, style) {
        if (style === void 0) { style = null; }
        style = style || {};
        var italic = style.italic == null ? textField.$TextField[16 /* italic */] : style.italic;
        var bold = style.bold == null ? textField.$TextField[15 /* bold */] : style.bold;
        var size = style.size == null ? textField.$TextField[0 /* fontSize */] : style.size;
        var fontFamily = style.fontFamily == null ? textField.$TextField[8 /* fontFamily */] : style.fontFamily;
        var font = italic ? "italic " : "normal ";
        font += bold ? "bold " : "normal ";
        font += size + "px " + fontFamily;
        renderContext.font = font;
        renderContext.textAlign = "left";
        renderContext.textBaseline = "middle";
    }
})(egret || (egret = {}));
var egret;
(function (egret) {
    var sys;
    (function (sys) {
        /**
         * @private
         * ????????????????????????????????????
         */
        function toFontString(style) {
            var font = "";
            if (style.italic)
                font += "italic ";
            if (style.bold)
                font += "bold ";
            font += (style.fontSize || 12) + "px ";
            font += (style.fontFamily || "sans-serif");
            return font;
        }
        sys.toFontString = toFontString;
        if (DEBUG) {
            egret.$markReadOnly(egret.TextField, "numLines");
            egret.$markReadOnly(egret.TextField, "textWidth");
            egret.$markReadOnly(egret.TextField, "textHeight");
        }
    })(sys = egret.sys || (egret.sys = {}));
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * TextFieldType class is an enumeration of constant value used in setting the type property of the TextField class.
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * TextFieldType ??????????????? TextField ?????? type ???????????????????????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     */
    var TextFieldType = (function () {
        function TextFieldType() {
        }
        var d = __define,c=TextFieldType;p=c.prototype;
        /**
         * @language en_US
         * Used to specify dynamic text
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        TextFieldType.DYNAMIC = "dynamic";
        /**
         * @language en_US
         * Used to specify the input text
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        TextFieldType.INPUT = "input";
        return TextFieldType;
    })();
    egret.TextFieldType = TextFieldType;
    egret.registerClass(TextFieldType,"egret.TextFieldType");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @private
     * @version Egret 2.4
     * @platform Web,Native
     */
    var TextFieldUtils = (function () {
        function TextFieldUtils() {
        }
        var d = __define,c=TextFieldUtils;p=c.prototype;
        /**
         * ??????????????????????????????
         * @param textfield ??????
         * @returns {number} ????????????0??????
         * @private
         */
        TextFieldUtils.$getStartLine = function (textfield) {
            var values = textfield.$TextField;
            var textHeight = TextFieldUtils.$getTextHeight(textfield);
            var startLine = 0;
            var textFieldHeight = values[4 /* textFieldHeight */];
            if (!isNaN(textFieldHeight)) {
                if (textHeight < textFieldHeight) {
                }
                else if (textHeight > textFieldHeight) {
                    startLine = Math.max(values[28 /* scrollV */] - 1, 0);
                    startLine = Math.min(values[29 /* numLines */] - 1, startLine);
                }
                if (!values[30 /* multiline */]) {
                    startLine = Math.max(values[28 /* scrollV */] - 1, 0);
                    if (values[29 /* numLines */] > 0) {
                        startLine = Math.min(values[29 /* numLines */] - 1, startLine);
                    }
                }
            }
            return startLine;
        };
        /**
         * ??????????????????
         * @param textfield ??????
         * @returns {number} ????????????
         * @private
         */
        TextFieldUtils.$getHalign = function (textfield) {
            var lineArr = textfield.$getLinesArr();
            var halign = 0;
            if (textfield.$TextField[9 /* textAlign */] == egret.HorizontalAlign.CENTER) {
                halign = 0.5;
            }
            else if (textfield.$TextField[9 /* textAlign */] == egret.HorizontalAlign.RIGHT) {
                halign = 1;
            }
            if (textfield.$TextField[24 /* type */] == egret.TextFieldType.INPUT && !textfield.$TextField[30 /* multiline */] && lineArr.length > 1) {
                halign = 0;
            }
            return halign;
        };
        /**
         * @private
         *
         * @param textfield
         * @returns
         */
        TextFieldUtils.$getTextHeight = function (textfield) {
            var textHeight = (egret.TextFieldType.INPUT == textfield.$TextField[24 /* type */] && !textfield.$TextField[30 /* multiline */]) ? textfield.$TextField[0 /* fontSize */] : (textfield.$TextField[6 /* textHeight */] + (textfield.$TextField[29 /* numLines */] - 1) * textfield.$TextField[1 /* lineSpacing */]);
            return textHeight;
        };
        /**
         * ??????????????????
         * @param textfield ??????
         * @returns {number} ????????????
         * @private
         */
        TextFieldUtils.$getValign = function (textfield) {
            var textHeight = TextFieldUtils.$getTextHeight(textfield);
            //if (textfield.$TextField[sys.TextKeys.type] == egret.TextFieldType.INPUT) {
            //    if (textfield.$TextField[sys.TextKeys.multiline]) {
            //return 0;
            //}
            //return 0.5;
            //}
            var textFieldHeight = textfield.$TextField[4 /* textFieldHeight */];
            if (!isNaN(textFieldHeight)) {
                if (textHeight < textFieldHeight) {
                    var valign = 0;
                    if (textfield.$TextField[10 /* verticalAlign */] == egret.VerticalAlign.MIDDLE)
                        valign = 0.5;
                    else if (textfield.$TextField[10 /* verticalAlign */] == egret.VerticalAlign.BOTTOM)
                        valign = 1;
                    return valign;
                }
            }
            return 0;
        };
        /**
         * ??????x???y???????????????
         * @param textfield ??????
         * @param x x?????????
         * @param y y?????????
         * @returns ????????????
         * @private
         */
        TextFieldUtils.$getTextElement = function (textfield, x, y) {
            var hitTextEle = TextFieldUtils.$getHit(textfield, x, y);
            var lineArr = textfield.$getLinesArr();
            if (hitTextEle && lineArr[hitTextEle.lineIndex] && lineArr[hitTextEle.lineIndex].elements[hitTextEle.textElementIndex]) {
                return lineArr[hitTextEle.lineIndex].elements[hitTextEle.textElementIndex];
            }
            return null;
        };
        /**
         * ?????????????????????
         * @param textfield ??????
         * @param x x?????????
         * @param y y?????????
         * @returns ???????????????
         * @private
         */
        TextFieldUtils.$getHit = function (textfield, x, y) {
            var lineArr = textfield.$getLinesArr();
            if (textfield.$TextField[3 /* textFieldWidth */] == 0) {
                return null;
            }
            var line = 0;
            var textHeight = TextFieldUtils.$getTextHeight(textfield);
            var startY = 0;
            var textFieldHeight = textfield.$TextField[4 /* textFieldHeight */];
            if (!isNaN(textFieldHeight) && textFieldHeight > textHeight) {
                var valign = TextFieldUtils.$getValign(textfield);
                startY = valign * (textFieldHeight - textHeight);
                if (startY != 0) {
                    y -= startY;
                }
            }
            var startLine = TextFieldUtils.$getStartLine(textfield);
            var lineH = 0;
            for (var i = startLine; i < lineArr.length; i++) {
                var lineEle = lineArr[i];
                if (lineH + lineEle.height >= y) {
                    line = i + 1;
                    break;
                }
                else {
                    lineH += lineEle.height;
                }
                if (lineH + textfield.$TextField[1 /* lineSpacing */] > y) {
                    return null;
                }
                lineH += textfield.$TextField[1 /* lineSpacing */];
            }
            if (line == 0) {
                return null;
            }
            var lineElement = lineArr[line - 1];
            var lineW = 0;
            for (i = 0; i < lineElement.elements.length; i++) {
                var iwTE = lineElement.elements[i];
                if (lineW + iwTE.width < x) {
                    lineW += iwTE.width;
                }
                else {
                    return { "lineIndex": line - 1, "textElementIndex": i };
                }
            }
            return null;
        };
        /**
         * ???????????????????????????
         * @param textfield ??????
         * @returns {number} ???????????????
         * @private
         */
        TextFieldUtils.$getScrollNum = function (textfield) {
            var scrollNum = 1;
            if (textfield.$TextField[30 /* multiline */]) {
                var height = textfield.height;
                var size = textfield.size;
                var lineSpacing = textfield.lineSpacing;
                scrollNum = Math.floor(height / (size + lineSpacing));
                var leftH = height - (size + lineSpacing) * scrollNum;
                if (leftH > size / 2) {
                    scrollNum++;
                }
            }
            return scrollNum;
        };
        return TextFieldUtils;
    })();
    egret.TextFieldUtils = TextFieldUtils;
    egret.registerClass(TextFieldUtils,"egret.TextFieldUtils");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * The VerticalAlign class defines the possible values for the vertical alignment.
     * @see egret.TextField#verticalAlign
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * VerticalAlign ?????????????????????????????????????????????
     * @see egret.TextField#verticalAlign
     * @version Egret 2.4
     * @platform Web,Native
     */
    var VerticalAlign = (function () {
        function VerticalAlign() {
        }
        var d = __define,c=VerticalAlign;p=c.prototype;
        /**
         * @language en_US
         * Vertically align content to the top of the container.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        VerticalAlign.TOP = "top";
        /**
         * @language en_US
         * Vertically align content to the bottom of the container.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        VerticalAlign.BOTTOM = "bottom";
        /**
         * @language en_US
         * Vertically align content in the middle of the container.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        VerticalAlign.MIDDLE = "middle";
        /**
         * @language en_US
         * Vertical alignment with both edges
         * Note: TextFiled does not support this alignment method."
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????
         * ?????????TextFiled???????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        VerticalAlign.JUSTIFY = "justify";
        /**
         * @language en_US
         * Align the content of the child items, relative to the container. This operation will adjust uniformly the size of all the child items to be the Content Height \" of the container \".
         * The Content Height \" of the container \" is the size of the max. child item. If the size of all child items are less than the height of the container, they will be adjusted to the height of the container.
         * Note: TextFiled does not support this alignment method.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????????????????????????????????????????"????????????"???
         * ?????????"????????????"????????????????????????,??????????????????????????????????????????????????????????????????????????????????????????????????????
         * ?????????TextFiled???????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        VerticalAlign.CONTENT_JUSTIFY = "contentJustify";
        return VerticalAlign;
    })();
    egret.VerticalAlign = VerticalAlign;
    egret.registerClass(VerticalAlign,"egret.VerticalAlign");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * The Endian class contains values that denote the byte order used to represent multibyte numbers.
     * The byte order is either bigEndian (most significant byte first) or littleEndian (least significant byte first).
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Endian ?????????????????????????????????????????????????????????????????????????????????
     * ??????????????? bigEndian??????????????????????????????????????? littleEndian???????????????????????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     */
    var Endian = (function () {
        function Endian() {
        }
        var d = __define,c=Endian;p=c.prototype;
        /**
         * @language en_US
         * Indicates the least significant byte of the multibyte number appears first in the sequence of bytes.
         * The hexadecimal number 0x12345678 has 4 bytes (2 hexadecimal digits per byte). The most significant byte is 0x12. The least significant byte is 0x78. (For the equivalent decimal number, 305419896, the most significant digit is 3, and the least significant digit is 6).
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????????????????
         * ?????????????????? 0x12345678 ?????? 4 ?????????????????????????????? 2 ???????????????????????????????????????????????? 0x12???????????????????????? 0x78???????????????????????????????????? 305419896???????????????????????? 3???????????????????????? 6??????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Endian.LITTLE_ENDIAN = "littleEndian";
        /**
         * @language en_US
         * Indicates the most significant byte of the multibyte number appears first in the sequence of bytes.
         * The hexadecimal number 0x12345678 has 4 bytes (2 hexadecimal digits per byte).  The most significant byte is 0x12. The least significant byte is 0x78. (For the equivalent decimal number, 305419896, the most significant digit is 3, and the least significant digit is 6).
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????????????????
         * ?????????????????? 0x12345678 ?????? 4 ?????????????????????????????? 2 ???????????????????????????????????????????????? 0x12???????????????????????? 0x78???????????????????????????????????? 305419896???????????????????????? 3???????????????????????? 6??????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Endian.BIG_ENDIAN = "bigEndian";
        return Endian;
    })();
    egret.Endian = Endian;
    egret.registerClass(Endian,"egret.Endian");
    /**
     * @language en_US
     * The ByteArray class provides methods and attributes for optimized reading and writing as well as dealing with binary data.
     * Note: The ByteArray class is applied to the advanced developers who need to access data at the byte layer.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/ByteArray.ts
     */
    /**
     * @language zh_CN
     * ByteArray ????????????????????????????????????????????????????????????????????????????????????
     * ?????????ByteArray ??????????????????????????????????????????????????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/ByteArray.ts
     */
    var ByteArray = (function () {
        /**
         * @version Egret 2.4
         * @platform Web,Native
         */
        function ByteArray(buffer) {
            /**
             * @private
             */
            this.BUFFER_EXT_SIZE = 0; //Buffer expansion size
            /**
             * @private
             */
            this.EOF_byte = -1;
            /**
             * @private
             */
            this.EOF_code_point = -1;
            this._setArrayBuffer(buffer || new ArrayBuffer(this.BUFFER_EXT_SIZE));
            this.endian = Endian.BIG_ENDIAN;
        }
        var d = __define,c=ByteArray;p=c.prototype;
        /**
         * @private
         * @param buffer
         */
        p._setArrayBuffer = function (buffer) {
            this.write_position = buffer.byteLength;
            this.data = new DataView(buffer);
            this._position = 0;
        };
        /**
         * @deprecated
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.setArrayBuffer = function (buffer) {
        };
        d(p, "buffer"
            ,function () {
                return this.data.buffer;
            }
            /**
             * @private
             */
            ,function (value) {
                this.data = new DataView(value);
            }
        );
        d(p, "dataView"
            /**
             * @private
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.data;
            }
            /**
             * @private
             */
            ,function (value) {
                this.data = value;
                this.write_position = value.byteLength;
            }
        );
        d(p, "bufferOffset"
            /**
             * @private
             */
            ,function () {
                return this.data.byteOffset;
            }
        );
        d(p, "position"
            /**
             * @language en_US
             * The current position of the file pointer (in bytes) to move or return to the ByteArray object. The next time you start reading reading method call in this position, or will start writing in this position next time call a write method.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????????????????????????????????????????? ByteArray ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this._position;
            }
            ,function (value) {
                //if (this._position < value) {
                //    if (!this.validate(value - this._position)) {
                //        return;
                //    }
                //}
                this._position = value;
                this.write_position = value > this.write_position ? value : this.write_position;
            }
        );
        d(p, "length"
            /**
             * @language en_US
             * The length of the ByteArray object (in bytes).
             * If the length is set to be larger than the current length, the right-side zero padding byte array.
             * If the length is set smaller than the current length, the byte array is truncated.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ByteArray ??????????????????????????????????????????
             * ??????????????????????????????????????????????????????????????????????????????????????????
             * ?????????????????????????????????????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.write_position;
            }
            ,function (value) {
                this.write_position = value;
                var tmp = new Uint8Array(new ArrayBuffer(value));
                var byteLength = this.data.buffer.byteLength;
                if (byteLength > value) {
                    this._position = value;
                }
                var length = Math.min(byteLength, value);
                tmp.set(new Uint8Array(this.data.buffer, 0, length));
                this.buffer = tmp.buffer;
            }
        );
        d(p, "bytesAvailable"
            /**
             * @language en_US
             * The number of bytes that can be read from the current position of the byte array to the end of the array data.
             * When you access a ByteArray object, the bytesAvailable property in conjunction with the read methods each use to make sure you are reading valid data.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????????????????????????????
             * ???????????? ByteArray ??????????????? bytesAvailable ?????????????????????????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.data.byteLength - this._position;
            }
        );
        /**
         * @language en_US
         * Clears the contents of the byte array and resets the length and position properties to 0.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????? length ??? position ??????????????? 0???

         * @version Egret 2.4
         * @platform Web,Native
         */
        p.clear = function () {
            this._setArrayBuffer(new ArrayBuffer(this.BUFFER_EXT_SIZE));
        };
        /**
         * @language en_US
         * Read a Boolean value from the byte stream. Read a simple byte. If the byte is non-zero, it returns true; otherwise, it returns false.
         * @return If the byte is non-zero, it returns true; otherwise, it returns false.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????????????????????????? true??????????????? false
         * @return ????????????????????????????????? true??????????????? false
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.readBoolean = function () {
            if (!this.validate(ByteArray.SIZE_OF_BOOLEAN))
                return null;
            return this.data.getUint8(this.position++) != 0;
        };
        /**
         * @language en_US
         * Read signed bytes from the byte stream.
         * @return An integer ranging from -128 to 127
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????
         * @return ?????? -128 ??? 127 ???????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.readByte = function () {
            if (!this.validate(ByteArray.SIZE_OF_INT8))
                return null;
            return this.data.getInt8(this.position++);
        };
        /**
         * @language en_US
         * Read data byte number specified by the length parameter from the byte stream. Starting from the position specified by offset, read bytes into the ByteArray object specified by the bytes parameter, and write bytes into the target ByteArray
         * @param bytes ByteArray object that data is read into
         * @param offset Offset (position) in bytes. Read data should be written from this position
         * @param length Byte number to be read Default value 0 indicates reading all available data
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????? length ???????????????????????????????????? offset ??????????????????????????????????????? bytes ??????????????? ByteArray ???????????????????????????????????? ByteArray ???
         * @param bytes ????????????????????? ByteArray ??????
         * @param offset bytes ???????????????????????????????????????????????????????????????
         * @param length ????????????????????????????????? 0 ?????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.readBytes = function (bytes, offset, length) {
            if (offset === void 0) { offset = 0; }
            if (length === void 0) { length = 0; }
            if (length == 0) {
                length = this.bytesAvailable;
            }
            else if (!this.validate(length)) {
                return null;
            }
            if (bytes) {
                bytes.validateBuffer(length);
            }
            else {
                bytes = new ByteArray(new ArrayBuffer(length));
            }
            for (var i = 0; i < length; i++) {
                bytes.data.setUint8(i + offset, this.data.getUint8(this.position++));
            }
        };
        /**
         * @language en_US
         * Read an IEEE 754 double-precision (64 bit) floating point number from the byte stream
         * @return Double-precision (64 bit) floating point number
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????? IEEE 754 ????????????64 ???????????????
         * @return ????????????64 ???????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.readDouble = function () {
            if (!this.validate(ByteArray.SIZE_OF_FLOAT64))
                return null;
            var value = this.data.getFloat64(this.position, this.endian == Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_FLOAT64;
            return value;
        };
        /**
         * @language en_US
         * Read an IEEE 754 single-precision (32 bit) floating point number from the byte stream
         * @return Single-precision (32 bit) floating point number
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????? IEEE 754 ????????????32 ???????????????
         * @return ????????????32 ???????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.readFloat = function () {
            if (!this.validate(ByteArray.SIZE_OF_FLOAT32))
                return null;
            var value = this.data.getFloat32(this.position, this.endian == Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_FLOAT32;
            return value;
        };
        /**
         * @language en_US
         * Read a 32-bit signed integer from the byte stream.
         * @return A 32-bit signed integer ranging from -2147483648 to 2147483647
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????? 32 ?????????
         * @return ?????? -2147483648 ??? 2147483647 ????????? 32 ??????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.readInt = function () {
            if (!this.validate(ByteArray.SIZE_OF_INT32))
                return null;
            var value = this.data.getInt32(this.position, this.endian == Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_INT32;
            return value;
        };
        ///**
        // * ??????????????????????????????????????????????????????????????????????????????
        // * @param length ????????????????????????????????????
        // * @param charSet ???????????????????????????????????????????????????????????????????????????????????? "shift-jis"???"cn-gb"???"iso-8859-1"??????
        // * @return UTF-8 ??????????????????
        // * @method egret.ByteArray#readMultiByte
        // */
        //public readMultiByte(length:number, charSet?:string):string {
        //    if (!this.validate(length)) return null;
        //
        //    return "";
        //}
        /**
         * @language en_US
         * Read a 16-bit signed integer from the byte stream.
         * @return A 16-bit signed integer ranging from -32768 to 32767
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????? 16 ?????????
         * @return ?????? -32768 ??? 32767 ????????? 16 ??????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.readShort = function () {
            if (!this.validate(ByteArray.SIZE_OF_INT16))
                return null;
            var value = this.data.getInt16(this.position, this.endian == Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_INT16;
            return value;
        };
        /**
         * @language en_US
         * Read unsigned bytes from the byte stream.
         * @return A 32-bit unsigned integer ranging from 0 to 255
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????
         * @return ?????? 0 ??? 255 ????????? 32 ??????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.readUnsignedByte = function () {
            if (!this.validate(ByteArray.SIZE_OF_UINT8))
                return null;
            return this.data.getUint8(this.position++);
        };
        /**
         * @language en_US
         * Read a 32-bit unsigned integer from the byte stream.
         * @return A 32-bit unsigned integer ranging from 0 to 4294967295
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????? 32 ?????????
         * @return ?????? 0 ??? 4294967295 ????????? 32 ??????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.readUnsignedInt = function () {
            if (!this.validate(ByteArray.SIZE_OF_UINT32))
                return null;
            var value = this.data.getUint32(this.position, this.endian == Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_UINT32;
            return value;
        };
        /**
         * @language en_US
         * Read a 16-bit unsigned integer from the byte stream.
         * @return A 16-bit unsigned integer ranging from 0 to 65535
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????? 16 ?????????
         * @return ?????? 0 ??? 65535 ????????? 16 ??????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.readUnsignedShort = function () {
            if (!this.validate(ByteArray.SIZE_OF_UINT16))
                return null;
            var value = this.data.getUint16(this.position, this.endian == Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_UINT16;
            return value;
        };
        /**
         * @language en_US
         * Read a UTF-8 character string from the byte stream Assume that the prefix of the character string is a short unsigned integer (use byte to express length)
         * @return UTF-8 character string
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????? UTF-8 ???????????????????????????????????????????????????????????????????????????????????????
         * @return UTF-8 ??????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.readUTF = function () {
            if (!this.validate(ByteArray.SIZE_OF_UINT16))
                return null;
            var length = this.data.getUint16(this.position, this.endian == Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_UINT16;
            if (length > 0) {
                return this.readUTFBytes(length);
            }
            else {
                return "";
            }
        };
        /**
         * @language en_US
         * Read a UTF-8 byte sequence specified by the length parameter from the byte stream, and then return a character string
         * @param Specify a short unsigned integer of the UTF-8 byte length
         * @return A character string consists of UTF-8 bytes of the specified length
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????? length ??????????????? UTF-8 ???????????????????????????????????????
         * @param length ?????? UTF-8 ????????????????????????????????????
         * @return ?????????????????? UTF-8 ????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.readUTFBytes = function (length) {
            if (!this.validate(length))
                return null;
            var bytes = new Uint8Array(this.buffer, this.bufferOffset + this.position, length);
            this.position += length;
            /*var bytes: Uint8Array = new Uint8Array(new ArrayBuffer(length));
             for (var i = 0; i < length; i++) {
             bytes[i] = this.data.getUint8(this.position++);
             }*/
            return this.decodeUTF8(bytes);
        };
        /**
         * @language en_US
         * Write a Boolean value. A single byte is written according to the value parameter. If the value is true, write 1; if the value is false, write 0.
         * @param value A Boolean value determining which byte is written. If the value is true, write 1; if the value is false, write 0.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????? value ???????????????????????????????????? true???????????? 1???????????? false???????????? 0
         * @param value ????????????????????????????????????????????????????????? true????????????????????? 1????????????????????? false????????????????????? 0
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.writeBoolean = function (value) {
            this.validateBuffer(ByteArray.SIZE_OF_BOOLEAN);
            this.data.setUint8(this.position++, value ? 1 : 0);
        };
        /**
         * @language en_US
         * Write a byte into the byte stream
         * The low 8 bits of the parameter are used. The high 24 bits are ignored.
         * @param value A 32-bit integer. The low 8 bits will be written into the byte stream
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????
         * ?????????????????? 8 ??????????????? 24 ???
         * @param value ?????? 32 ??????????????? 8 ????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.writeByte = function (value) {
            this.validateBuffer(ByteArray.SIZE_OF_INT8);
            this.data.setInt8(this.position++, value);
        };
        /**
         * @language en_US
         * Write the byte sequence that includes length bytes in the specified byte array, bytes, (starting at the byte specified by offset, using a zero-based index), into the byte stream
         * If the length parameter is omitted, the default length value 0 is used and the entire buffer starting at offset is written. If the offset parameter is also omitted, the entire buffer is written
         * If the offset or length parameter is out of range, they are clamped to the beginning and end of the bytes array.
         * @param bytes ByteArray Object
         * @param offset A zero-based index specifying the position into the array to begin writing
         * @param length An unsigned integer specifying how far into the buffer to write
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????? bytes????????????????????? offset???????????????????????????????????? length ???????????????????????????????????????
         * ???????????? length ?????????????????????????????? 0?????????????????? offset ???????????????????????????????????????????????? offset ?????????????????????????????????
         * ?????? offset ??? length ???????????????????????????????????? bytes ????????????????????????
         * @param bytes ByteArray ??????
         * @param offset ??? 0 ?????????????????????????????????????????????????????????
         * @param length ????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.writeBytes = function (bytes, offset, length) {
            if (offset === void 0) { offset = 0; }
            if (length === void 0) { length = 0; }
            var writeLength;
            if (offset < 0) {
                return;
            }
            if (length < 0) {
                return;
            }
            else if (length == 0) {
                writeLength = bytes.length - offset;
            }
            else {
                writeLength = Math.min(bytes.length - offset, length);
            }
            if (writeLength > 0) {
                this.validateBuffer(writeLength);
                var tmp_data = new DataView(bytes.buffer);
                for (var i = offset; i < writeLength + offset; i++) {
                    this.data.setUint8(this.position++, tmp_data.getUint8(i));
                }
            }
        };
        /**
         * @language en_US
         * Write an IEEE 754 double-precision (64 bit) floating point number into the byte stream
         * @param value Double-precision (64 bit) floating point number
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????? IEEE 754 ????????????64 ???????????????
         * @param value ????????????64 ???????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.writeDouble = function (value) {
            this.validateBuffer(ByteArray.SIZE_OF_FLOAT64);
            this.data.setFloat64(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_FLOAT64;
        };
        /**
         * @language en_US
         * Write an IEEE 754 single-precision (32 bit) floating point number into the byte stream
         * @param value Single-precision (32 bit) floating point number
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????? IEEE 754 ????????????32 ???????????????
         * @param value ????????????32 ???????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.writeFloat = function (value) {
            this.validateBuffer(ByteArray.SIZE_OF_FLOAT32);
            this.data.setFloat32(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_FLOAT32;
        };
        /**
         * @language en_US
         * Write a 32-bit signed integer into the byte stream
         * @param value An integer to be written into the byte stream
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????? 32 ?????????
         * @param value ???????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.writeInt = function (value) {
            this.validateBuffer(ByteArray.SIZE_OF_INT32);
            this.data.setInt32(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_INT32;
        };
        /**
         * @language en_US
         * Write a 16-bit integer into the byte stream. The low 16 bits of the parameter are used. The high 16 bits are ignored.
         * @param value A 32-bit integer. Its low 16 bits will be written into the byte stream
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????? 16 ?????????????????????????????? 16 ??????????????? 16 ???
         * @param value 32 ??????????????????????????? 16 ????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.writeShort = function (value) {
            this.validateBuffer(ByteArray.SIZE_OF_INT16);
            this.data.setInt16(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_INT16;
        };
        /**
         * @language en_US
         * Write a 32-bit unsigned integer into the byte stream
         * @param value An unsigned integer to be written into the byte stream
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????? 32 ?????????
         * @param value ????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.writeUnsignedInt = function (value) {
            this.validateBuffer(ByteArray.SIZE_OF_UINT32);
            this.data.setUint32(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_UINT32;
        };
        /**
         * @language en_US
         * Write a UTF-8 string into the byte stream. The length of the UTF-8 string in bytes is written first, as a 16-bit integer, followed by the bytes representing the characters of the string
         * @param value Character string value to be written
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??? UTF-8 ?????????????????????????????????????????????????????? UTF-8 ???????????????????????? 16 ?????????????????????????????????????????????????????????
         * @param value ????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.writeUTF = function (value) {
            var utf8bytes = this.encodeUTF8(value);
            var length = utf8bytes.length;
            this.validateBuffer(ByteArray.SIZE_OF_UINT16 + length);
            this.data.setUint16(this.position, length, this.endian == Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_UINT16;
            this._writeUint8Array(utf8bytes, false);
        };
        /**
         * @language en_US
         * Write a UTF-8 string into the byte stream. Similar to the writeUTF() method, but the writeUTFBytes() method does not prefix the string with a 16-bit length word
         * @param value Character string value to be written
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??? UTF-8 ???????????????????????????????????? writeUTF() ???????????? writeUTFBytes() ????????? 16 ???????????????????????????????????????
         * @param value ????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.writeUTFBytes = function (value) {
            this._writeUint8Array(this.encodeUTF8(value));
        };
        /**
         *
         * @returns
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.toString = function () {
            return "[ByteArray] length:" + this.length + ", bytesAvailable:" + this.bytesAvailable;
        };
        /**
         * @private
         * ??? Uint8Array ???????????????
         * @param bytes ????????????Uint8Array
         * @param validateBuffer
         */
        p._writeUint8Array = function (bytes, validateBuffer) {
            if (validateBuffer === void 0) { validateBuffer = true; }
            if (validateBuffer) {
                this.validateBuffer(this.position + bytes.length);
            }
            for (var i = 0; i < bytes.length; i++) {
                this.data.setUint8(this.position++, bytes[i]);
            }
        };
        /**
         * @param len
         * @returns
         * @version Egret 2.4
         * @platform Web,Native
         * @private
         */
        p.validate = function (len) {
            //len += this.data.byteOffset;
            if (this.data.byteLength > 0 && this._position + len <= this.data.byteLength) {
                return true;
            }
            else {
                egret.$error(1025);
            }
        };
        /**********************/
        /*  PRIVATE METHODS   */
        /**********************/
        /**
         * @private
         * @param len
         * @param needReplace
         */
        p.validateBuffer = function (len, needReplace) {
            if (needReplace === void 0) { needReplace = false; }
            this.write_position = len > this.write_position ? len : this.write_position;
            len += this._position;
            if (this.data.byteLength < len || needReplace) {
                var tmp = new Uint8Array(new ArrayBuffer(len + this.BUFFER_EXT_SIZE));
                var length = Math.min(this.data.buffer.byteLength, len + this.BUFFER_EXT_SIZE);
                tmp.set(new Uint8Array(this.data.buffer, 0, length));
                this.buffer = tmp.buffer;
            }
        };
        /**
         * @private
         * UTF-8 Encoding/Decoding
         */
        p.encodeUTF8 = function (str) {
            var pos = 0;
            var codePoints = this.stringToCodePoints(str);
            var outputBytes = [];
            while (codePoints.length > pos) {
                var code_point = codePoints[pos++];
                if (this.inRange(code_point, 0xD800, 0xDFFF)) {
                    this.encoderError(code_point);
                }
                else if (this.inRange(code_point, 0x0000, 0x007f)) {
                    outputBytes.push(code_point);
                }
                else {
                    var count, offset;
                    if (this.inRange(code_point, 0x0080, 0x07FF)) {
                        count = 1;
                        offset = 0xC0;
                    }
                    else if (this.inRange(code_point, 0x0800, 0xFFFF)) {
                        count = 2;
                        offset = 0xE0;
                    }
                    else if (this.inRange(code_point, 0x10000, 0x10FFFF)) {
                        count = 3;
                        offset = 0xF0;
                    }
                    outputBytes.push(this.div(code_point, Math.pow(64, count)) + offset);
                    while (count > 0) {
                        var temp = this.div(code_point, Math.pow(64, count - 1));
                        outputBytes.push(0x80 + (temp % 64));
                        count -= 1;
                    }
                }
            }
            return new Uint8Array(outputBytes);
        };
        /**
         * @private
         *
         * @param data
         * @returns
         */
        p.decodeUTF8 = function (data) {
            var fatal = false;
            var pos = 0;
            var result = "";
            var code_point;
            var utf8_code_point = 0;
            var utf8_bytes_needed = 0;
            var utf8_bytes_seen = 0;
            var utf8_lower_boundary = 0;
            while (data.length > pos) {
                var _byte = data[pos++];
                if (_byte == this.EOF_byte) {
                    if (utf8_bytes_needed != 0) {
                        code_point = this.decoderError(fatal);
                    }
                    else {
                        code_point = this.EOF_code_point;
                    }
                }
                else {
                    if (utf8_bytes_needed == 0) {
                        if (this.inRange(_byte, 0x00, 0x7F)) {
                            code_point = _byte;
                        }
                        else {
                            if (this.inRange(_byte, 0xC2, 0xDF)) {
                                utf8_bytes_needed = 1;
                                utf8_lower_boundary = 0x80;
                                utf8_code_point = _byte - 0xC0;
                            }
                            else if (this.inRange(_byte, 0xE0, 0xEF)) {
                                utf8_bytes_needed = 2;
                                utf8_lower_boundary = 0x800;
                                utf8_code_point = _byte - 0xE0;
                            }
                            else if (this.inRange(_byte, 0xF0, 0xF4)) {
                                utf8_bytes_needed = 3;
                                utf8_lower_boundary = 0x10000;
                                utf8_code_point = _byte - 0xF0;
                            }
                            else {
                                this.decoderError(fatal);
                            }
                            utf8_code_point = utf8_code_point * Math.pow(64, utf8_bytes_needed);
                            code_point = null;
                        }
                    }
                    else if (!this.inRange(_byte, 0x80, 0xBF)) {
                        utf8_code_point = 0;
                        utf8_bytes_needed = 0;
                        utf8_bytes_seen = 0;
                        utf8_lower_boundary = 0;
                        pos--;
                        code_point = this.decoderError(fatal, _byte);
                    }
                    else {
                        utf8_bytes_seen += 1;
                        utf8_code_point = utf8_code_point + (_byte - 0x80) * Math.pow(64, utf8_bytes_needed - utf8_bytes_seen);
                        if (utf8_bytes_seen !== utf8_bytes_needed) {
                            code_point = null;
                        }
                        else {
                            var cp = utf8_code_point;
                            var lower_boundary = utf8_lower_boundary;
                            utf8_code_point = 0;
                            utf8_bytes_needed = 0;
                            utf8_bytes_seen = 0;
                            utf8_lower_boundary = 0;
                            if (this.inRange(cp, lower_boundary, 0x10FFFF) && !this.inRange(cp, 0xD800, 0xDFFF)) {
                                code_point = cp;
                            }
                            else {
                                code_point = this.decoderError(fatal, _byte);
                            }
                        }
                    }
                }
                //Decode string
                if (code_point !== null && code_point !== this.EOF_code_point) {
                    if (code_point <= 0xFFFF) {
                        if (code_point > 0)
                            result += String.fromCharCode(code_point);
                    }
                    else {
                        code_point -= 0x10000;
                        result += String.fromCharCode(0xD800 + ((code_point >> 10) & 0x3ff));
                        result += String.fromCharCode(0xDC00 + (code_point & 0x3ff));
                    }
                }
            }
            return result;
        };
        /**
         * @private
         *
         * @param code_point
         */
        p.encoderError = function (code_point) {
            egret.$error(1026, code_point);
        };
        /**
         * @private
         *
         * @param fatal
         * @param opt_code_point
         * @returns
         */
        p.decoderError = function (fatal, opt_code_point) {
            if (fatal) {
                egret.$error(1027);
            }
            return opt_code_point || 0xFFFD;
        };
        /**
         * @private
         *
         * @param a
         * @param min
         * @param max
         */
        p.inRange = function (a, min, max) {
            return min <= a && a <= max;
        };
        /**
         * @private
         *
         * @param n
         * @param d
         */
        p.div = function (n, d) {
            return Math.floor(n / d);
        };
        /**
         * @private
         *
         * @param string
         */
        p.stringToCodePoints = function (string) {
            /** @type {Array.<number>} */
            var cps = [];
            // Based on http://www.w3.org/TR/WebIDL/#idl-DOMString
            var i = 0, n = string.length;
            while (i < string.length) {
                var c = string.charCodeAt(i);
                if (!this.inRange(c, 0xD800, 0xDFFF)) {
                    cps.push(c);
                }
                else if (this.inRange(c, 0xDC00, 0xDFFF)) {
                    cps.push(0xFFFD);
                }
                else {
                    if (i == n - 1) {
                        cps.push(0xFFFD);
                    }
                    else {
                        var d = string.charCodeAt(i + 1);
                        if (this.inRange(d, 0xDC00, 0xDFFF)) {
                            var a = c & 0x3FF;
                            var b = d & 0x3FF;
                            i += 1;
                            cps.push(0x10000 + (a << 10) + b);
                        }
                        else {
                            cps.push(0xFFFD);
                        }
                    }
                }
                i += 1;
            }
            return cps;
        };
        /**
         * @private
         */
        ByteArray.SIZE_OF_BOOLEAN = 1;
        /**
         * @private
         */
        ByteArray.SIZE_OF_INT8 = 1;
        /**
         * @private
         */
        ByteArray.SIZE_OF_INT16 = 2;
        /**
         * @private
         */
        ByteArray.SIZE_OF_INT32 = 4;
        /**
         * @private
         */
        ByteArray.SIZE_OF_UINT8 = 1;
        /**
         * @private
         */
        ByteArray.SIZE_OF_UINT16 = 2;
        /**
         * @private
         */
        ByteArray.SIZE_OF_UINT32 = 4;
        /**
         * @private
         */
        ByteArray.SIZE_OF_FLOAT32 = 4;
        /**
         * @private
         */
        ByteArray.SIZE_OF_FLOAT64 = 8;
        return ByteArray;
    })();
    egret.ByteArray = ByteArray;
    egret.registerClass(ByteArray,"egret.ByteArray");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * Logger is an entrance for the log processing module of the engine
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Logger????????????????????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     */
    var Logger = (function () {
        function Logger() {
        }
        var d = __define,c=Logger;p=c.prototype;
        d(Logger, "logLevel",undefined
            /**
             * @language en_US
             * Set the current need to open the log level. Grade level are: ALL <DEBUG <INFO <WARN <ERROR <OFF<br/>
             * This feature is only in DEBUG mode to take effect. <br/>
             * <Ul>
             * <Li> Logger.ALL - all levels of log can be printed out. </ li>
             * <Li> Logger.DEBUG - print debug, info, log, warn, error. </ li>
             * <Li> Logger.INFO - print info, log, warn, error. </ li>
             * <Li> Logger.WARN - can print warn, error. </ li>
             * <Li> Logger.ERROR - You can print error. </ li>
             * <Li> Logger.OFF - all closed. </ li>
             * </ Ul>
             *param LogType from this level to start printing.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????log?????????????????????????????????ALL < DEBUG < INFO < WARN < ERROR < OFF<br/>
             * ??????????????? DEBUG ?????????????????????<br/>
             * <ul>
             * <li>Logger.ALL -- ???????????????log????????????????????????</li>
             * <li>Logger.DEBUG -- ????????????debug???info???log???warn???error???</li>
             * <li>Logger.INFO -- ????????????info???log???warn???error???</li>
             * <li>Logger.WARN -- ????????????warn???error???</li>
             * <li>Logger.ERROR -- ????????????error???</li>
             * <li>Logger.OFF -- ???????????????</li>
             * </ul>
             * @param logType ??????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function (logType) {
            }
        );
        /**
         * @language en_US
         * open all
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Logger.ALL = "all";
        /**
         * @language en_US
         * level: DEBUG
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????? DEBUG
         * @version Egret 2.4
         * @platform Web,Native
         */
        Logger.DEBUG = "debug";
        /**
         * @language en_US
         * level: INFO
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????? INFO
         * @version Egret 2.4
         * @platform Web,Native
         */
        Logger.INFO = "info";
        /**
         * @language en_US
         * level: WARN
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????? WARN
         * @version Egret 2.4
         * @platform Web,Native
         */
        Logger.WARN = "warn";
        /**
         * @language en_US
         * level: ERROR
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????? ERROR
         * @version Egret 2.4
         * @platform Web,Native
         */
        Logger.ERROR = "error";
        /**
         * @language en_US
         * close all
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????
         * @version Egret 2.4
         * @platform Web,Native
         */
        Logger.OFF = "off";
        return Logger;
    })();
    egret.Logger = Logger;
    egret.registerClass(Logger,"egret.Logger");
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @version Egret 2.4
     * @platform Web,Native
     */
    var NumberUtils = (function () {
        function NumberUtils() {
        }
        var d = __define,c=NumberUtils;p=c.prototype;
        /**
         * @language en_US
         * Judge whether it is a numerical value
         * @param value Parameter that needs to be judged
         * @returns
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????
         * @param value ?????????????????????
         * @returns
         * @version Egret 2.4
         * @platform Web,Native
         */
        NumberUtils.isNumber = function (value) {
            return typeof (value) === "number" && !isNaN(value);
        };
        /**
         * @language en_US
         * Obtain the approximate sin value of the corresponding angle value
         * @param value {number} Angle value
         * @returns {number} sin value
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????sin?????????
         * @param value {number} ?????????
         * @returns {number} sin???
         * @version Egret 2.4
         * @platform Web,Native
         */
        NumberUtils.sin = function (value) {
            var valueFloor = Math.floor(value);
            var valueCeil = valueFloor + 1;
            var resultFloor = NumberUtils.sinInt(valueFloor);
            var resultCeil = NumberUtils.sinInt(valueCeil);
            return (value - valueFloor) * resultCeil + (valueCeil - value) * resultFloor;
        };
        /**
         * @private
         *
         * @param value
         * @returns
         */
        NumberUtils.sinInt = function (value) {
            value = value % 360;
            if (value < 0) {
                value += 360;
            }
            if (value < 90) {
                return egret_sin_map[value];
            }
            if (value < 180) {
                return egret_cos_map[value - 90];
            }
            if (value < 270) {
                return -egret_sin_map[value - 180];
            }
            return -egret_cos_map[value - 270];
        };
        /**
         * @language en_US
         * Obtain the approximate cos value of the corresponding angle value
         * @param value {number} Angle value
         * @returns {number} cos value
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????cos?????????
         * @param value {number} ?????????
         * @returns {number} cos???
         * @version Egret 2.4
         * @platform Web,Native
         */
        NumberUtils.cos = function (value) {
            var valueFloor = Math.floor(value);
            var valueCeil = valueFloor + 1;
            var resultFloor = NumberUtils.cosInt(valueFloor);
            var resultCeil = NumberUtils.cosInt(valueCeil);
            return (value - valueFloor) * resultCeil + (valueCeil - value) * resultFloor;
        };
        /**
         * @private
         *
         * @param value
         * @returns
         */
        NumberUtils.cosInt = function (value) {
            value = value % 360;
            if (value < 0) {
                value += 360;
            }
            if (value < 90) {
                return egret_cos_map[value];
            }
            if (value < 180) {
                return -egret_sin_map[value - 90];
            }
            if (value < 270) {
                return -egret_cos_map[value - 180];
            }
            return egret_sin_map[value - 270];
        };
        return NumberUtils;
    })();
    egret.NumberUtils = NumberUtils;
    egret.registerClass(NumberUtils,"egret.NumberUtils");
})(egret || (egret = {}));
var egret_sin_map = {};
var egret_cos_map = {};
var DEG_TO_RAD = Math.PI / 180;
for (var NumberUtils_i = 0; NumberUtils_i <= 90; NumberUtils_i++) {
    egret_sin_map[NumberUtils_i] = Math.sin(NumberUtils_i * DEG_TO_RAD);
    egret_cos_map[NumberUtils_i] = Math.cos(NumberUtils_i * DEG_TO_RAD);
}
//????????????bind??????????????????bind??????
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            egret.$error(1029);
        }
        var aArgs = Array.prototype.slice.call(arguments, 1), fToBind = this, fNOP = function () {
        }, fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
        };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    };
}
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * The Timer class is the interface to timers, which let you run code on a specified time sequence. Use the start()
     * method to start a timer. Add an event listener for the timer event to set up code to be run on the timer interval.<br/>
     * You can create Timer objects to run once or repeat at specified intervals to execute code on a schedule. Depending
     * on the framerate or the runtime environment (available memory and other factors), the runtime may dispatchEvent events at
     * slightly offset intervals.
     * @see egret.TimerEvent
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/Timer.ts
     */
    /**
     * @language zh_CN
     * Timer ??????????????????????????????????????????????????????????????????????????????
     * ?????? start() ?????????????????????????????? timer ?????????????????????????????????????????????????????????????????????????????????
     * ???????????? Timer ????????????????????????????????????????????????????????????????????????????????????
     * ?????? Egret ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * @see egret.TimerEvent
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/Timer.ts
     */
    var Timer = (function (_super) {
        __extends(Timer, _super);
        /**
         * @language en_US
         * Constructs a new Timer object with the specified delay and repeatCount states.
         * @param delay The delay between timer events, in milliseconds. A delay lower than 20 milliseconds is not recommended.
         * Timer frequency is limited to 60 frames per second, meaning a delay lower than 16.6 milliseconds causes runtime problems.
         * @param repeatCount Specifies the number of repetitions. If zero, the timer repeats indefinitely.If nonzero,
         * the timer runs the specified number of times and then stops.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????? delay ??? repeatCount ?????????????????? Timer ?????????
         * @param delay ???????????????????????????????????????????????????????????? delay ???????????? 20 ???????????????????????????????????? 60 ???/???????????????????????? 16.6 ????????????????????????????????????????????????
         * @param repeatCount ?????????????????????????????????????????????????????????????????????????????????????????? 0???????????????????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        function Timer(delay, repeatCount) {
            if (repeatCount === void 0) { repeatCount = 0; }
            _super.call(this);
            /**
             * @private
             */
            this._delay = 0;
            /**
             * @private
             */
            this._currentCount = 0;
            /**
             * @private
             */
            this._running = false;
            /**
             * @private
             */
            this.updateInterval = 1000;
            /**
             * @private
             */
            this.lastCount = 1000;
            this.delay = delay;
            this.repeatCount = +repeatCount | 0;
        }
        var d = __define,c=Timer;p=c.prototype;
        d(p, "delay"
            /**
             * @language en_US
             * The delay between timer events, in milliseconds. A delay lower than 20 milliseconds is not recommended.<br/>
             * Note: Timer frequency is limited to 60 frames per second, meaning a delay lower than 16.6 milliseconds causes runtime problems.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? repeatCount ?????????????????????<br/>
             * ??????????????? delay ???????????? 20 ???????????????????????????????????? 60 ???/???????????????????????? 16.6 ????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this._delay;
            }
            ,function (value) {
                //value = +value||0;
                if (value < 1) {
                    value = 1;
                }
                if (this._delay == value) {
                    return;
                }
                this._delay = value;
                this.lastCount = this.updateInterval = Math.round(60 * value);
            }
        );
        d(p, "currentCount"
            /**
             * @language en_US
             * The total number of times the timer has fired since it started at zero. If the timer has been reset, only the fires since the reset are counted.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????? 0 ??????????????????????????????????????????????????????????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this._currentCount;
            }
        );
        d(p, "running"
            /**
             * @language en_US
             * The timer's current state; true if the timer is running, otherwise false.
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????????????? true???????????? false???
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this._running;
            }
        );
        /**
         * @language en_US
         * Stops the timer, if it is running, and sets the currentCount property back to 0, like the reset button of a stopwatch.
         * Then, when start() is called, the timer instance runs for the specified number of repetitions, as set by the repeatCount value.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????????????????? currentCount ??????????????? 0????????????????????????????????????????????????????????? start() ??????????????????????????????????????????????????????????????????????????? repeatCount ???????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.reset = function () {
            this.stop();
            this._currentCount = 0;
        };
        /**
         * @language en_US
         * Starts the timer, if it is not already running.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.start = function () {
            if (this._running)
                return;
            egret.sys.$ticker.$startTick(this.$update, this);
            this._running = true;
        };
        /**
         * @language en_US
         * Stops the timer. When start() is called after stop(), the timer instance runs for the remaining number of
         * repetitions, as set by the repeatCount property.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????? stop() ????????? start()??????????????????????????????????????????????????????????????? ?????????????????? repeatCount ??????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.stop = function () {
            if (!this._running)
                return;
            egret.stopTick(this.$update, this);
            this._running = false;
        };
        /**
         * @private
         * Ticker???60FPS?????????????????????
         */
        p.$update = function (timeStamp) {
            this.lastCount -= 1000;
            if (this.lastCount > 0) {
                return false;
            }
            this.lastCount += this.updateInterval;
            this._currentCount++;
            var complete = (this.repeatCount > 0 && this._currentCount >= this.repeatCount);
            egret.TimerEvent.dispatchTimerEvent(this, egret.TimerEvent.TIMER);
            if (complete) {
                this.stop();
                egret.TimerEvent.dispatchTimerEvent(this, egret.TimerEvent.TIMER_COMPLETE);
            }
            return false;
        };
        return Timer;
    })(egret.EventDispatcher);
    egret.Timer = Timer;
    egret.registerClass(Timer,"egret.Timer");
    if (DEBUG) {
        egret.$markReadOnly(Timer, "currentCount");
        egret.$markReadOnly(Timer, "running");
    }
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * The XML class contains properties for working with XML objects.
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * XML ????????????????????? XML ??????????????????
     * @version Egret 2.4
     * @platform Web,Native
     */
    egret.XML;
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @private
     */
    egret.$callLaterFunctionList = [];
    /**
     * @private
     */
    egret.$callLaterThisList = [];
    /**
     * @private
     */
    egret.$callLaterArgsList = [];
    /**
     * @language en_US
     * Delay the function to run unless screen is redrawn.
     * @param method {Function} The function to be delayed to run
     * @param thisObject {any} this reference of callback function
     * @param ...args {any} Function parameter list
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/callLater.ts
     */
    /**
     * @language zh_CN
     * ???????????????????????????????????????
     * @param method {Function} ????????????????????????
     * @param thisObject {any} ???????????????this??????
     * @param ...args {any} ??????????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/callLater.ts
     */
    function callLater(method, thisObject) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        egret.$callLaterFunctionList.push(method);
        egret.$callLaterThisList.push(thisObject);
        egret.$callLaterArgsList.push(args);
    }
    egret.callLater = callLater;
    /**
     * @private
     */
    egret.$callAsyncFunctionList = [];
    /**
     * @private
     */
    egret.$callAsyncThisList = [];
    /**
     * @private
     */
    egret.$callAsyncArgsList = [];
    /**
     * ??????????????????
     * @param method {Function} ????????????????????????
     * @param thisObject {any} ?????????this??????
     * @param ...args {any} ??????????????????
     * @private
     */
    function $callAsync(method, thisObject) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        egret.$callAsyncFunctionList.push(method);
        egret.$callAsyncThisList.push(thisObject);
        egret.$callAsyncArgsList.push(args);
    }
    egret.$callAsync = $callAsync;
})(egret || (egret = {}));
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
function __extends(d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var egret;
(function (egret) {
    /**
     * @language en_US
     * Call setter properties of the parent class, instead of the other writing languages, such as super.alpha = 1;
     * @param currentClass The current class class name, non-string
     * @param thisObj The current object. Always this
     * @param type Setter property names need to call
     * @param values Value passed to the parent class
     *
     * @exmaple egret.superSetter(this, "alpha", 1);
     */
    /**
     * @language zh_CN
     * ???????????????setter?????????????????????????????????????????? super.alpha = 1;
     * @param thisObj ????????????????????????this
     * @param currentClass ?????? class ?????????????????????
     * @param type ???????????????setter????????????
     * @param values ??????????????????
     *
     * @exmaple egret.superSetter(this, "alpha", 1);
     */
    function superSetter(currentClass, thisObj, type) {
        var values = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            values[_i - 3] = arguments[_i];
        }
        var cla = currentClass.prototype;
        var seters = cla["__sets__"];
        if (seters == null) {
            seters = cla["__sets__"] = {};
        }
        var setF = seters[type];
        if (setF) {
            return setF.apply(thisObj, values);
        }
        var d = Object.getPrototypeOf(cla);
        if (d == null) {
            return;
        }
        while (!d.hasOwnProperty(type)) {
            d = Object.getPrototypeOf(d);
            if (d == null) {
                return;
            }
        }
        setF = Object.getOwnPropertyDescriptor(d, type).set;
        seters[type] = setF;
        setF.apply(thisObj, values);
    }
    egret.superSetter = superSetter;
    /**
     * @language en_US
     * Get getter property value of the parent class. Instead of writing in other languages, such as super.alpha;
     * @param currentClass The current class class name, non-string
     * @param thisObj The current object. Always this
     * @param type Setter property names need to call
     * @returns {any} The value returned by the parent
     *
     * @exmaple egret.superGetter(this, "alpha");
     */
    /**
     * @language zh_CN
     * ???????????????getter????????????????????????????????????????????? super.alpha;
     * @param thisObj ????????????????????????this
     * @param currentClass ?????? class ?????????????????????
     * @param type ???????????????setter????????????
     * @returns {any} ??????????????????
     *
     * @exmaple egret.superGetter(this, "alpha");
     */
    function superGetter(currentClass, thisObj, type) {
        var cla = currentClass.prototype;
        var geters = cla["__gets__"];
        if (geters == null) {
            geters = cla["__gets__"] = {};
        }
        var getF = geters[type];
        if (getF) {
            return getF.call(thisObj);
        }
        var d = Object.getPrototypeOf(cla);
        if (d == null) {
            return;
        }
        while (!d.hasOwnProperty(type)) {
            d = Object.getPrototypeOf(d);
            if (d == null) {
                return;
            }
        }
        getF = Object.getOwnPropertyDescriptor(d, type).get;
        geters[type] = getF;
        return getF.call(thisObj);
    }
    egret.superGetter = superGetter;
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @private
     */
    var getDefinitionByNameCache = {};
    /**
     * @language en_US
     * Returns a reference to the class object of the class specified by the name parameter.
     * @param name The name of a class.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/getDefinitionByName.ts
     */
    /**
     * @language zh_CN
     * ?????? name ???????????????????????????????????????
     * @param name ???????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/getDefinitionByName.ts
     */
    function getDefinitionByName(name) {
        if (!name)
            return null;
        var definition = getDefinitionByNameCache[name];
        if (definition) {
            return definition;
        }
        var paths = name.split(".");
        var length = paths.length;
        definition = __global;
        for (var i = 0; i < length; i++) {
            var path = paths[i];
            definition = definition[path];
            if (!definition) {
                return null;
            }
        }
        getDefinitionByNameCache[name] = definition;
        return definition;
    }
    egret.getDefinitionByName = getDefinitionByName;
    if (DEBUG) {
        egret["cleanCache"] = function () {
            getDefinitionByNameCache = {};
        };
    }
})(egret || (egret = {}));
var __global = __global || this;
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * Get browser or Runtime parameters, returns an empty string if not set
     * Get the url parameter corresponds to the browser, access to the corresponding parameter in the Runtime setOption
     * @method egret.getOption
     * @param key {string} Parameters key
     * @private
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ?????????????????????Runtime?????????????????????????????????????????????
     * ??????????????????????????????url???????????????Runtime????????????setOption??????
     * @method egret.getOption
     * @param key {string} ??????key
     * @private
     * @version Egret 2.4
     * @platform Web,Native
     */
    egret.getOption;
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * Return the fully qualified class name of an object
     * @param value The object for which a fully qualified class name is desired. Any JavaScript value may be passed to
     * this method including all available JavaScript types, object instances, primitive types such as number, and class objects.
     * @returns A string containing the fully qualified class name.
     * @example
     * <pre>
     *  egret.getQualifiedClassName(egret.DisplayObject) //return "egret.DisplayObject"
     * </pre>
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/getQualifiedClassName.ts
     */
    /**
     * @language zh_CN
     * ????????????????????????????????????
     * @param value ?????????????????????????????????????????????????????? JavaScript ????????????????????????????????????????????? JavaScript ????????????????????????????????????
     * ??????number)????????????
     * @returns ??????????????????????????????????????????
     * @example
     * <pre>
     *  egret.getQualifiedClassName(egret.DisplayObject) //?????? "egret.DisplayObject"
     * </pre>
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/getQualifiedClassName.ts
     */
    function getQualifiedClassName(value) {
        var type = typeof value;
        if (!value || (type != "object" && !value.prototype)) {
            return type;
        }
        var prototype = value.prototype ? value.prototype : Object.getPrototypeOf(value);
        if (prototype.hasOwnProperty("__class__")) {
            return prototype["__class__"];
        }
        var constructorString = prototype.constructor.toString();
        var index = constructorString.indexOf("(");
        var className = constructorString.substring(9, index);
        Object.defineProperty(prototype, "__class__", {
            value: className,
            enumerable: false,
            writable: true
        });
        return className;
    }
    egret.getQualifiedClassName = getQualifiedClassName;
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /** @language en_US
     * Returns the fully qualified class name of the base class of the object specified by the value parameter.
     * @param value The object for which a parent class is desired. Any JavaScript value may be passed to this method including
     * all available JavaScript types, object instances, primitive types such as number, and class objects.
     * @returns  A fully qualified base class name, or null if none exists.
     * @example
     * <pre>
     *  egret.getQualifiedSuperclassName(egret.Bitmap) //return "egret.DisplayObject"
     * </pre>
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/getQualifiedSuperclassName.ts
     */
    /**
     * @language zh_CN
     * ?????? value ??????????????????????????????????????????????????????
     * @param value ????????????????????????????????????????????? JavaScript ????????????????????????????????????????????? JavaScript ??????????????????????????????????????????number???????????????
     * @returns ????????????????????????????????? null????????????????????????????????????
     * @example
     * <pre>
     *  egret.getQualifiedSuperclassName(egret.Sprite) //?????? "egret.DisplayObject"
     * </pre>
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/getQualifiedSuperclassName.ts
     */
    function getQualifiedSuperclassName(value) {
        if (!value || typeof value != "object") {
            return null;
        }
        var prototype = value.prototype ? value.prototype : Object.getPrototypeOf(value);
        var superProto = Object.getPrototypeOf(prototype);
        if (!superProto) {
            return null;
        }
        var superClass = egret.getQualifiedClassName(superProto.constructor);
        if (!superClass) {
            return null;
        }
        return superClass;
    }
    egret.getQualifiedSuperclassName = getQualifiedSuperclassName;
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * Used to compute relative time.this method returns the number of milliseconds since the Egret framework was initialized
     * @returns The number of milliseconds since the Egret framework was initialized
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/getTimer.ts
     */
    /**
     * @language zh_CN
     * ??????????????????????????????????????????????????? Egret ?????????????????????????????????
     * @returns ?????? Egret ?????????????????????????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/getTimer.ts
     */
    function getTimer() {
        return Date.now() - egret.sys.$START_TIME;
    }
    egret.getTimer = getTimer;
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * Check whether a public definition exists in the specified application domain. The definition can be that of a class, a naming space or a function.
     * @param name {string} Name of the definition.
     * @returns {boolean} Whether the public definition exists
     * @example
     * egret.hasDefinition("egret.DisplayObject") //return true
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/hasDefinition.ts
     */
    /**
     * @language zh_CN
     * ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * @param name {string} ??????????????????
     * @returns {boolean} ????????????????????????
     * @example
     * egret.hasDefinition("egret.DisplayObject") //?????? true
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/hasDefinition.ts
     */
    function hasDefinition(name) {
        var definition = egret.getDefinitionByName(name);
        return definition ? true : false;
    }
    egret.hasDefinition = hasDefinition;
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * Indicates whether an object is a instance of the class or interface specified as the parameter.This method has better performance
     * compared width the instanceOf operator,and it can indicate whether an object is a instance of the specific interface.
     * @param instance the instance to be checked.
     * @param typeName the string value representing a specific class or interface.
     * @returns A value of true if the object is a instance of the class or interface specified as the parameter.
     * @example
     * <pre>
     *     var instance = new egret.Sprite();
     *     egret.log(egret.is(instance,egret.Types.Sprite))  //true
     *     egret.log(egret.is(instance,egret.Types.DisplayObjectContainer))  //true
     *     egret.log(egret.is(instance,egret.Types.Bitmap))  //false
     * </pre>
     * @see egret.registerClass()
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ??????????????????????????? Egret ????????????????????????????????????????????????????????????????????? instanceOf ????????????????????????????????????????????????????????????????????????
     * @param instance ?????????????????????
     * @param typeName ???????????????????????????.
     * @returns ??????true???????????????????????????????????????????????????
     * @example
     * <pre>
     *     var instance = new egret.Sprite();
     *     egret.log(egret.is(instance,egret.Types.Sprite))  //true
     *     egret.log(egret.is(instance,egret.Types.DisplayObjectContainer))  //true
     *     egret.log(egret.is(instance,egret.Types.Bitmap))  //false
     * </pre>
     * @see egret.registerClass()
     * @version Egret 2.4
     * @platform Web,Native
     */
    function is(instance, typeName) {
        if (!instance || typeof instance != "object") {
            return false;
        }
        var prototype = Object.getPrototypeOf(instance);
        var types = prototype ? prototype.__types__ : null;
        if (!types) {
            return false;
        }
        return (types.indexOf(typeName) !== -1);
    }
    egret.is = is;
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * Register and start a timer,which will notify the callback method at a rate of 60 FPS ,and pass the current time stamp as parameters.<br/>
     * Note: After the registration,it will notify the callback method continuously,you can call the stopTick () method to stop it.
     * @param callBack the call back method. the timeStamp parameter of this method represents the number of milliseconds
     * since the Egret framework was initialized. If the return value of this method is true, it will force Egret runtime
     * to render after processing of this method completes.
     * @param thisObject the call back method's "this"
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ?????????????????????????????????????????????60FPS???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????stopTick()?????????
     * @param callBack ????????????????????????????????? timeStamp ???????????????Egret???????????????????????????(??????)???
     * ???????????????????????????true???????????????TimerEvent.updateAfterEvent()????????????????????????????????????????????????????????????????????????????????????
     * @param thisObject ???????????????this???????????????
     * @version Egret 2.4
     * @platform Web,Native
     */
    function startTick(callBack, thisObject) {
        if (DEBUG && !callBack) {
            egret.$error(1003, "callBack");
        }
        egret.sys.$ticker.$startTick(callBack, thisObject);
    }
    egret.startTick = startTick;
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * Stops the timer started by the egret.startTick() method.
     * @param callBack the call back method. the timeStamp parameter of this method represents the number of milliseconds
     * since the Egret framework was initialized. If the return value of this method is true, it will force Egret runtime
     * to render after processing of this method completes.
     * @param thisObject the call back method's "this"
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ??????????????? startTick() ???????????????????????????
     * @param callBack ????????????????????????????????? timeStamp ???????????????Egret???????????????????????????(??????)???
     * ???????????????????????????true???????????????TimerEvent.updateAfterEvent()????????????????????????????????????????????????????????????????????????????????????
     * @param thisObject ???????????????this???????????????
     * @version Egret 2.4
     * @platform Web,Native
     */
    function stopTick(callBack, thisObject) {
        if (DEBUG && !callBack) {
            egret.$error(1003, "callBack");
        }
        egret.sys.$ticker.$stopTick(callBack, thisObject);
    }
    egret.stopTick = stopTick;
})(egret || (egret = {}));
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
var egret;
(function (egret) {
    /**
     * @language en_US
     * Transfer number to color character string
     * @param value {number} color value ,such as 0xffffff
     * @returns {string} Color character string, for example, #ffffff.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/toColorString.ts
     */
    /**
     * @language zh_CN
     * ??????????????????????????????
     * @param value {number} ?????????????????? 0xffffff
     * @returns {string} ????????????????????????"#ffffff"???
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/toColorString.ts
     */
    function toColorString(value) {
        if (value < 0)
            value = 0;
        if (value > 16777215)
            value = 16777215;
        var color = value.toString(16).toUpperCase();
        while (color.length > 6) {
            color = color.slice(1, color.length);
        }
        while (color.length < 6) {
            color = "0" + color;
        }
        return "#" + color;
    }
    egret.toColorString = toColorString;
})(egret || (egret = {}));
