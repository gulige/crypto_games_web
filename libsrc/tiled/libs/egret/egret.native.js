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
var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var egret;
(function (egret) {
    var web;
    (function (web) {
        /**
         * @private
         * @inheritDoc
         */
        var NativeSound = (function (_super) {
            __extends(NativeSound, _super);
            /**
             * @private
             * @inheritDoc
             */
            function NativeSound() {
                _super.call(this);
                /**
                 * @private
                 */
                this.loaded = false;
            }
            var d = __define,c=NativeSound;p=c.prototype;
            /**
             * @inheritDoc
             */
            p.load = function (url) {
                var self = this;
                this.url = url;
                if (DEBUG && !url) {
                    egret.$error(3002);
                }
                var promise = egret.PromiseObject.create();
                promise.onSuccessFunc = onAudioLoaded;
                promise.onErrorFunc = onAudioError;
                egret_native.download(url, url, promise);
                var audio = new Audio(url);
                audio.addEventListener("canplaythrough", onCanPlay);
                audio.addEventListener("error", onAudioError);
                this.originAudio = audio;
                function onAudioLoaded() {
                    audio.load();
                    NativeSound.$recycle(this.url, audio);
                }
                function onCanPlay() {
                    removeListeners();
                    self.loaded = true;
                    self.dispatchEventWith(egret.Event.COMPLETE);
                }
                function onAudioError() {
                    removeListeners();
                    self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
                }
                function removeListeners() {
                    audio.removeEventListener("canplaythrough", onAudioLoaded);
                    audio.removeEventListener("error", onAudioError);
                }
            };
            /**
             * @inheritDoc
             */
            p.play = function (startTime, loops) {
                startTime = +startTime || 0;
                loops = +loops || 0;
                if (DEBUG && this.loaded == false) {
                    egret.$error(3001);
                }
                var audio = NativeSound.$pop(this.url);
                if (audio == null) {
                    audio = new Audio(this.url);
                }
                else {
                    audio.load();
                }
                audio.autoplay = true;
                var channel = new web.NativeSoundChannel(audio);
                channel.$url = this.url;
                channel.$loops = loops;
                channel.$startTime = startTime;
                channel.$play();
                return channel;
            };
            /**
             * @inheritDoc
             */
            p.close = function () {
                if (this.loaded == false && this.originAudio)
                    this.originAudio.src = "";
                if (this.originAudio)
                    this.originAudio = null;
                NativeSound.$clear(this.url);
            };
            NativeSound.$clear = function (url) {
                var array = NativeSound.audios[url];
                if (array) {
                    array.length = 0;
                }
            };
            NativeSound.$pop = function (url) {
                var array = NativeSound.audios[url];
                if (array && array.length > 0) {
                    return array.pop();
                }
                return null;
            };
            NativeSound.$recycle = function (url, audio) {
                var array = NativeSound.audios[url];
                if (NativeSound.audios[url] == null) {
                    array = NativeSound.audios[url] = [];
                }
                array.push(audio);
            };
            /**
             * @language en_US
             * Background music
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeSound.MUSIC = "music";
            /**
             * @language en_US
             * EFFECT
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeSound.EFFECT = "effect";
            /**
             * @private
             */
            NativeSound.audios = {};
            return NativeSound;
        })(egret.EventDispatcher);
        web.NativeSound = NativeSound;
        egret.registerClass(NativeSound,"egret.web.NativeSound",["egret.Sound"]);
    })(web = egret.web || (egret.web = {}));
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
        var blendModesForGL = {
            "source-over": [1, 771],
            "lighter": [770, 1],
            "destination-out": [0, 771],
            "destination-in": [0, 770]
        };
        /**
         * @version Egret 2.4
         * @platform Web,Native
         * @private
         */
        var NativeRenderContext = (function (_super) {
            __extends(NativeRenderContext, _super);
            function NativeRenderContext() {
                _super.apply(this, arguments);
                this.$matrix = new egret.Matrix();
                this.$nativeContext = egret_native.Graphics;
                this.$nativeGraphicsContext = egret_native.rastergl;
                this.$globalCompositeOperation = "source-over";
                this.$globalAlpha = 1;
                this.$lineWidth = 0;
                this.$strokeStyle = "#000000";
                this.$fillStyle = "#000000";
                this.$font = "10px sans-serif";
                this.$fontSize = 10;
                this.$saveList = [];
                this.$clipRect = new egret.Rectangle();
                this.$saveCount = 0;
                this.$clipList = [];
                this.$hasStrokeText = false;
            }
            var d = __define,c=NativeRenderContext;p=c.prototype;
            d(p, "globalCompositeOperation"
                /**
                 * @private
                 * ?????????????????????????????????????????????????????????
                 * @version Egret 2.4
                 * @platform Web,Native
                 */
                ,function () {
                    return this.$globalCompositeOperation;
                }
                ,function (value) {
                    this.$globalCompositeOperation = value;
                    var arr = blendModesForGL[value];
                    if (arr) {
                        this.checkSurface();
                        this.$nativeContext.setBlendArg(arr[0], arr[1]);
                    }
                }
            );
            d(p, "globalAlpha"
                /**
                 * @private
                 * ?????????????????????????????????????????????
                 * @version Egret 2.4
                 * @platform Web,Native
                 */
                ,function () {
                    return this.$globalAlpha;
                }
                ,function (value) {
                    this.$globalAlpha = value;
                    this.checkSurface();
                    this.$nativeContext.setGlobalAlpha(value);
                }
            );
            d(p, "lineWidth"
                /**
                 * @private
                 * ???????????????????????????????????????????????????0????????????Infinity ??? NaN ??????????????????
                 * @default 1
                 * @version Egret 2.4
                 * @platform Web,Native
                 */
                ,function () {
                    return this.$lineWidth;
                }
                ,function (value) {
                    //console.log("set lineWidth" + value);
                    this.$lineWidth = value;
                    this.checkSurface();
                    this.$nativeGraphicsContext.lineWidth = value;
                }
            );
            d(p, "strokeStyle"
                /**
                 * @private
                 * ????????????????????????????????????????????????
                 * @default "#000000"
                 * @version Egret 2.4
                 * @platform Web,Native
                 */
                ,function () {
                    return this.$strokeStyle;
                }
                ,function (value) {
                    if (value.indexOf("rgba") != -1) {
                        value = this.$parseRGBA(value);
                    }
                    else if (value.indexOf("rgb") != -1) {
                        value = this.$parseRGB(value);
                    }
                    //console.log("strokeStyle::" + value);
                    this.$strokeStyle = value;
                    egret_native.Label.setStrokeColor(parseInt(value.replace("#", "0x")));
                    this.checkSurface();
                    this.$nativeGraphicsContext.strokeStyle = value;
                }
            );
            d(p, "fillStyle"
                /**
                 * @private
                 * ????????????????????????????????????????????????
                 * @default "#000000"
                 * @version Egret 2.4
                 * @platform Web,Native
                 */
                ,function () {
                    return this.$fillStyle;
                }
                ,function (value) {
                    if (value.indexOf("rgba") != -1) {
                        value = this.$parseRGBA(value);
                    }
                    else if (value.indexOf("rgb") != -1) {
                        value = this.$parseRGB(value);
                    }
                    //console.log("fillStyle::" + value);
                    this.$fillStyle = value;
                    egret_native.Label.setTextColor(parseInt(value.replace("#", "0x")));
                    this.checkSurface();
                    this.$nativeGraphicsContext.fillStyle = value;
                }
            );
            p.$fillColorStr = function (s) {
                if (s.length < 2) {
                    s = "0" + s;
                }
                return s;
            };
            p.$parseRGBA = function (str) {
                var index = str.indexOf("(");
                str = str.slice(index + 1, str.length - 1);
                var arr = str.split(",");
                var a = parseInt((parseFloat(arr[3]) * 255)).toString(16);
                var r = parseInt(arr[0]).toString(16);
                var g = parseInt(arr[1]).toString(16);
                var b = parseInt(arr[2]).toString(16);
                str = "#" + this.$fillColorStr(a) + this.$fillColorStr(r) + this.$fillColorStr(g) + this.$fillColorStr(b);
                return str;
            };
            p.$parseRGB = function (str) {
                var index = str.indexOf("(");
                str = str.slice(index + 1, str.length - 1);
                var arr = str.split(",");
                var r = parseInt(arr[0]).toString(16);
                var g = parseInt(arr[1]).toString(16);
                var b = parseInt(arr[2]).toString(16);
                str = "#" + this.$fillColorStr(r) + this.$fillColorStr(g) + this.$fillColorStr(b);
                return str;
            };
            d(p, "font"
                /**
                 * @private
                 * ?????????????????????
                 * @version Egret 2.4
                 * @platform Web,Native
                 */
                ,function () {
                    return this.$font;
                }
                ,function (value) {
                    this.$font = value;
                    var arr = value.split(" ");
                    var length = arr.length;
                    for (var i = 0; i < length; i++) {
                        var txt = arr[i];
                        if (txt.indexOf("px") != -1) {
                            this.$fontSize = parseInt(txt.replace("px", ""));
                            //console.log("set font" + this.$lineWidth);
                            return;
                        }
                    }
                }
            );
            /**
             * @private
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
                this.checkSurface();
                this.$nativeGraphicsContext.arc(x, y, radius, startAngle, endAngle, anticlockwise);
            };
            /**
             * @private
             * ???????????????????????????????????????????????????2????????? ??????????????????????????????????????????????????? ?????????????????????????????????????????????????????????????????????????????????????????? moveTo() ?????????????????????
             * @param cpx ???????????? x ????????????
             * @param cpy ???????????? y ????????????
             * @param x ????????? x ????????????
             * @param y ????????? y ????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.quadraticCurveTo = function (cpx, cpy, x, y) {
                this.checkSurface();
                this.$nativeGraphicsContext.quadraticCurveTo(cpx, cpy, x, y);
            };
            /**
             * @private
             * ???????????????????????????????????????x???y?????????
             * @param x ??????????????? x ????????????
             * @param y ??????????????? y ????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.lineTo = function (x, y) {
                this.checkSurface();
                this.$nativeGraphicsContext.lineTo(x, y);
            };
            /**
             * @private
             * ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
             * @param fillRule ???????????????????????????????????????????????????????????????????????????
             * "nonzero": ????????????????????? ??????????????????
             * "evenodd": ?????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.fill = function (fillRule) {
                this.checkSurface();
                this.$nativeGraphicsContext.fill(fillRule);
            };
            /**
             * @private
             * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.closePath = function () {
                this.checkSurface();
                this.$nativeGraphicsContext.closePath();
            };
            /**
             * @private
             * ??????????????????????????????????????????????????? (x, y) ???????????? width ??? height????????????4??????????????????????????????????????????????????????????????????????????????????????????????????????
             * @param x ??????????????? x ????????????
             * @param y ??????????????? y ????????????
             * @param width ??????????????????
             * @param height ??????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.rect = function (x, y, w, h) {
                this.checkSurface();
                this.$nativeGraphicsContext.rect(x, y, w, h);
                this.$clipRect.setTo(x, y, w, h);
            };
            /**
             * @private
             * ?????????????????????????????????????????????(x???y)??????
             * @param x ?????? x ???
             * @param y ?????? y ???
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.moveTo = function (x, y) {
                this.checkSurface();
                this.$nativeGraphicsContext.moveTo(x, y);
            };
            /**
             * @private
             * ????????????????????????????????????????????? (x, y) ??????????????????????????? width ??? height ???fillStyle ??????????????????????????????
             * @param x ?????????????????? x ????????????
             * @param y ?????????????????? y ????????????
             * @param width ??????????????????
             * @param height ??????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.fillRect = function (x, y, w, h) {
                this.checkSurface();
                this.$nativeGraphicsContext.fillRect(x, y, w, h);
            };
            /**
             * @private
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
                this.checkSurface();
                this.$nativeGraphicsContext.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
            };
            /**
             * @private
             * ??????????????????????????????????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.stroke = function () {
                this.checkSurface();
                this.$nativeGraphicsContext.stroke();
            };
            /**
             * @private
             * ??????????????????????????????????????????????????? (x, y) ???????????? w ???????????? h ?????????????????????
             * @param x ??????????????? x ????????????
             * @param y ??????????????? y ????????????
             * @param width ??????????????????
             * @param height ??????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.strokeRect = function (x, y, w, h) {
                //console.log("strokeRect");
                this.checkSurface();
                this.$nativeGraphicsContext.strokeRect(x, y, w, h);
            };
            /**
             * @private
             * ????????????????????????????????????????????? ?????????????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.beginPath = function () {
                this.checkSurface();
                this.$nativeGraphicsContext.beginPath();
            };
            /**
             * @private
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
                this.checkSurface();
                this.$nativeGraphicsContext.arcTo(x1, y1, x2, y2, radius);
            };
            /**
             * @private
             * ?????????????????????????????????????????????????????????????????????
             * @param a ???????????????
             * @param b ???????????????
             * @param c ???????????????
             * @param d ???????????????
             * @param tx ???????????????
             * @param ty ???????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.transform = function (a, b, c, d, tx, ty) {
                this.$matrix.append(a, b, c, d, tx, ty);
                this.setTransformToNative();
            };
            /**
             * @private
             * ???????????????????????? surface ??? surface ?????? x ????????????????????? y ?????????????????????????????????
             * @param x ???????????????
             * @param y ???????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.translate = function (x, y) {
                this.$matrix.translate(x, y);
                this.setTransformToNative();
            };
            /**
             * @private
             * ?????? x ??????????????? y ?????????????????? surface ???????????????????????????
             * @param x ??????????????????????????????
             * @param y ??????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.scale = function (x, y) {
                this.$matrix.scale(x, y);
                this.setTransformToNative();
            };
            /**
             * @private
             * ??????????????????????????????????????????????????????????????????????????????????????????????????????
             * @param angle ???????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.rotate = function (angle) {
                this.$matrix.rotate(angle);
                this.setTransformToNative();
            };
            /**
             * @private
             * ????????????????????????????????????????????????????????? save() ?????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.restore = function () {
                //console.log("restore");
                if (this.$saveCount > 0) {
                    if (this.$saveList.length) {
                        var data = this.$saveList.pop();
                        for (var key in data) {
                            this[key] = data[key];
                        }
                        this.setTransformToNative();
                    }
                    //console.log("pop clip");
                    var index = this.$clipList.indexOf(this.$saveCount);
                    if (index != -1) {
                        var length = this.$clipList.length;
                        this.$clipList.splice(index, length - index);
                        for (; index < length; index++) {
                            this.checkSurface();
                            this.$nativeContext.popClip();
                        }
                    }
                    this.$saveCount--;
                }
            };
            /**
             * @private
             * ???????????????????????????????????????????????????????????? restore() ?????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.save = function () {
                //console.log("save");
                var transformMatrix = new egret.Matrix();
                transformMatrix.copyFrom(this.$matrix);
                this.$saveList.push({
                    lineWidth: this.$lineWidth,
                    globalCompositeOperation: this.$globalCompositeOperation,
                    globalAlpha: this.$globalAlpha,
                    strokeStyle: this.$strokeStyle,
                    fillStyle: this.$fillStyle,
                    font: this.$font,
                    $matrix: transformMatrix
                });
                this.$saveCount++;
            };
            /**
             * @private
             * ????????????????????????????????????????????? clip() ????????????????????????????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.clip = function (fillRule) {
                if (this.$clipRect.width > 0 && this.$clipRect.height > 0) {
                    //console.log("push clip" + this.$clipRect.x);
                    this.checkSurface();
                    this.$nativeContext.pushClip(this.$clipRect.x, this.$clipRect.y, this.$clipRect.width, this.$clipRect.height);
                    this.$clipRect.setEmpty();
                    this.$clipList.push(this.$saveCount);
                }
            };
            /**
             * @private
             * ????????????????????????????????? ??? (x, y) ?????????????????????(width, height) ?????????????????????????????????????????????????????????????????????
             * @param x ??????????????? x ????????????
             * @param y ??????????????? y ????????????
             * @param width ??????????????????
             * @param height ??????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.clearRect = function (x, y, width, height) {
                //console.log("clearScreen");
                this.checkSurface();
                this.$nativeContext.clearScreen(0, 0, 0);
            };
            /**
             * @private
             * ??????????????????????????????????????????????????????????????????????????? transform() ?????????
             * @param a ???????????????
             * @param b ???????????????
             * @param c ???????????????
             * @param d ???????????????
             * @param tx ???????????????
             * @param ty ???????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.setTransform = function (a, b, c, d, tx, ty) {
                this.$matrix.setTo(a, b, c, d, tx, ty);
                this.setTransformToNative();
            };
            p.setTransformToNative = function () {
                var m = this.$matrix;
                //console.log("setTransformToNative::a=" + m.a + " b=" + m.b + " c=" + m.c + " d=" + m.d + " tx=" + m.tx + " ty=" + m.ty);
                this.checkSurface();
                this.$nativeContext.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
            };
            /**
             * @private
             * ???????????????????????????????????????????????????????????????????????????????????? GraphicsGradient ?????????
             * @param x0 ????????? x ????????????
             * @param y0 ????????? y ????????????
             * @param x1 ????????? x ????????????
             * @param y1 ????????? y ????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.createLinearGradient = function (x0, y0, x1, y1) {
                this.checkSurface();
                return this.$nativeGraphicsContext.createLinearGradient(x0, y0, x1, y1);
            };
            /**
             * @private
             * ????????????????????????????????????????????????????????????????????????????????????????????????????????? GraphicsGradient???
             * @param x0 ??????????????? x ????????????
             * @param y0 ??????????????? y ????????????
             * @param r0 ????????????????????????
             * @param x1 ??????????????? x ????????????
             * @param y1 ??????????????? y ????????????
             * @param r1 ????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.createRadialGradient = function (x0, y0, r0, x1, y1, r1) {
                this.checkSurface();
                return this.$nativeGraphicsContext.createRadialGradient(x0, y0, r0, x1, y1, r1);
            };
            /**
             * @private
             * ???(x,y)?????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.fillText = function (text, x, y, maxWidth) {
                //console.log("drawText" + text);
                var font = egret.TextField.default_fontFamily;
                egret_native.Label.createLabel(font, this.$fontSize, "", this.$hasStrokeText ? this.$lineWidth : 0);
                this.$hasStrokeText = false;
                egret_native.Label.drawText(text, x, y);
            };
            p.strokeText = function (text, x, y, maxWidth) {
                this.$hasStrokeText = true;
            };
            /**
             * @private
             * ????????????????????????????????? TextMetrics ?????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.measureText = function (text) {
                var font = egret.TextField.default_fontFamily;
                egret_native.Label.createLabel(font, this.$fontSize, "", this.$hasStrokeText ? this.$lineWidth : 0);
                return { width: egret_native.Label.getTextSize(text)[0] };
            };
            /**
             * @private
             * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????imageSmoothingEnabled???????????????????????????drawImage()??????????????????
             * ?????? imageSmoothingEnabled ????????????????????????????????????????????????????????????????????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.drawImage = function (image, offsetX, offsetY, width, height, surfaceOffsetX, surfaceOffsetY, surfaceImageWidth, surfaceImageHeight) {
                var bitmapData;
                if (image.$nativeRenderTexture) {
                    bitmapData = image.$nativeRenderTexture;
                }
                else {
                    bitmapData = image;
                }
                if (!bitmapData) {
                    return;
                }
                if (arguments.length == 3) {
                    surfaceOffsetX = offsetX;
                    surfaceOffsetY = offsetY;
                    offsetX = 0;
                    offsetY = 0;
                    width = surfaceImageWidth = image.width;
                    height = surfaceImageHeight = image.height;
                }
                else {
                    if (!width) {
                        width = image.width;
                    }
                    if (!height) {
                        height = image.height;
                    }
                    if (!surfaceOffsetX) {
                        surfaceOffsetX = 0;
                    }
                    if (!surfaceOffsetY) {
                        surfaceOffsetY = 0;
                    }
                    if (!surfaceImageWidth) {
                        surfaceImageWidth = width;
                    }
                    if (!surfaceImageHeight) {
                        surfaceImageHeight = height;
                    }
                }
                //console.log("drawImage::" + offsetX + " " + offsetY + " " + width + " " + height + " " + surfaceOffsetX + " " + surfaceOffsetY + " " + surfaceImageWidth + " " + surfaceImageHeight);
                this.checkSurface();
                this.$nativeContext.drawImage(bitmapData, offsetX, offsetY, width, height, surfaceOffsetX, surfaceOffsetY, surfaceImageWidth, surfaceImageHeight);
            };
            /**
             * @private
             * ????????????????????????(BitmapData)???????????????????????????repetition??????????????????????????????????????????????????????????????????GraphicsPattern?????????
             * @param bitmapData ???????????????????????? BitmapData ?????????
             * @param repetition ???????????????????????????
             * ??????????????????"repeat" (??????????????????),"repeat-x" (?????????????????????),"repeat-y" (?????????????????????),"no-repeat" (?????????).
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.createPattern = function (image, repetition) {
                return null;
            };
            /**
             * @private
             * ???????????? ImageData ?????????????????????canvas???????????????????????????????????????????????????????????????????????????(sx, sy)?????????sw?????????sh???
             * @version Egret 2.4
             * @platform Web,Native
             */
            p.getImageData = function (sx, sy, sw, sh) {
                return { width: sw, height: sh, data: null };
            };
            p.checkSurface = function () {
                //todo ??????????????????
                if (native.$currentSurface != this.surface) {
                    if (native.$currentSurface != null) {
                        native.$currentSurface.end();
                    }
                    if (this.surface) {
                        this.surface.begin();
                    }
                }
            };
            return NativeRenderContext;
        })(egret.HashObject);
        native.NativeRenderContext = NativeRenderContext;
        egret.registerClass(NativeRenderContext,"egret.native.NativeRenderContext",["egret.sys.RenderContext"]);
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
var egret;
(function (egret) {
    var native;
    (function (native) {
        native.$currentSurface;
        /**
         * @private
         * ?????????????????????????????????
         */
        var NativeSurface = (function (_super) {
            __extends(NativeSurface, _super);
            /**
             * @private
             */
            function NativeSurface() {
                _super.call(this);
                //private id;
                //private static id = 0;
                /**
                 * @private
                 * @inheritDoc
                 */
                this.renderContext = new native.NativeRenderContext();
                this.$widthReadySet = false;
                this.$heightReadySet = false;
                this.$isRoot = false;
                this.$isDispose = false;
                //this.id = NativeSurface.id++;
            }
            var d = __define,c=NativeSurface;p=c.prototype;
            p.toDataURL = function (type) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                if (this.$nativeRenderTexture) {
                    return this.$nativeRenderTexture.toDataURL.apply(this, arguments);
                }
                return null;
            };
            p.saveToFile = function (type, filePath) {
                if (this.$nativeRenderTexture) {
                    this.$nativeRenderTexture.saveToFile(type, filePath);
                }
            };
            d(p, "width"
                /**
                 * @private
                 * @inheritDoc
                 */
                ,function () {
                    return this.$width;
                }
                ,function (value) {
                    this.$width = value;
                    if (!this.$isDispose) {
                        this.$widthReadySet = true;
                        this.createRenderTexture();
                    }
                }
            );
            d(p, "height"
                /**
                 * @private
                 * @inheritDoc
                 */
                ,function () {
                    return this.$height;
                }
                ,function (value) {
                    this.$height = value;
                    if (!this.$isDispose) {
                        this.$heightReadySet = true;
                        this.createRenderTexture();
                    }
                }
            );
            p.createRenderTexture = function () {
                if (this.$isRoot) {
                    return;
                }
                if (this.$widthReadySet && this.$heightReadySet) {
                    if (this.$nativeRenderTexture) {
                        this.$nativeRenderTexture.dispose();
                    }
                    //console.log("new RenderTexture" + this.id);
                    this.$nativeRenderTexture = new egret_native.RenderTexture(this.$width, this.$height);
                    this.renderContext.globalAlpha = 1;
                    this.renderContext.globalCompositeOperation = "source-over";
                    this.$widthReadySet = false;
                    this.$heightReadySet = false;
                }
            };
            p.begin = function () {
                if (this.$nativeRenderTexture) {
                    //console.log("begin" + this.id);
                    native.$currentSurface = this;
                    //this.$nativeRenderTexture.begin();
                    this.$nativeRenderTexture.getIn();
                }
            };
            p.end = function () {
                if (this.$nativeRenderTexture) {
                    //console.log("end" + this.id);
                    native.$currentSurface = null;
                    //this.$nativeRenderTexture.end();
                    this.$nativeRenderTexture.getOut();
                }
            };
            p.$dispose = function () {
                if (this.$nativeRenderTexture) {
                    if (native.$currentSurface == this) {
                        native.$currentSurface.end();
                    }
                    //console.log("dispose" + this.id);
                    this.$nativeRenderTexture.dispose();
                    this.$nativeRenderTexture = null;
                }
                this.$isDispose = true;
            };
            p.$reload = function () {
                this.$isDispose = false;
            };
            return NativeSurface;
        })(egret.HashObject);
        native.NativeSurface = NativeSurface;
        egret.registerClass(NativeSurface,"egret.native.NativeSurface",["egret.sys.Surface","egret.BitmapData"]);
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
var egret;
(function (egret) {
    var native;
    (function (native) {
        /**
         * @private
         */
        function convertImageToRenderTexture(texture, rect) {
            var surface = egret.sys.surfaceFactory.create(true);
            if (!surface) {
                return null;
            }
            var w = texture.$getTextureWidth();
            var h = texture.$getTextureHeight();
            if (rect == null) {
                rect = egret.$TempRectangle;
                rect.x = 0;
                rect.y = 0;
                rect.width = w;
                rect.height = h;
            }
            rect.x = Math.min(rect.x, w - 1);
            rect.y = Math.min(rect.y, h - 1);
            rect.width = Math.min(rect.width, w - rect.x);
            rect.height = Math.min(rect.height, h - rect.y);
            var iWidth = rect.width;
            var iHeight = rect.height;
            surface.width = iWidth;
            surface.height = iHeight;
            //surface["style"]["width"]= iWidth + "px";
            //surface["style"]["height"] = iHeight + "px";
            var bitmapData = texture;
            var renderContext = surface.renderContext;
            renderContext.imageSmoothingEnabled = false;
            var offsetX = Math.round(bitmapData._offsetX);
            var offsetY = Math.round(bitmapData._offsetY);
            var bitmapWidth = bitmapData._bitmapWidth;
            var bitmapHeight = bitmapData._bitmapHeight;
            renderContext.globalAlpha = 1;
            renderContext.globalCompositeOperation = "source-over";
            renderContext.setTransform(1, 0, 0, 1, 0, 0);
            renderContext.drawImage(bitmapData._bitmapData, bitmapData._bitmapX + rect.x / egret.$TextureScaleFactor, bitmapData._bitmapY + rect.y / egret.$TextureScaleFactor, bitmapWidth * rect.width / w, bitmapHeight * rect.height / h, offsetX, offsetY, rect.width, rect.height);
            return surface;
        }
        /**
         * @private
         */
        function toDataURL(type, rect) {
            try {
                var renderTexture = convertImageToRenderTexture(this, rect);
                var base64 = renderTexture.toDataURL(type);
                renderTexture.$dispose();
                return base64;
            }
            catch (e) {
                egret.$error(1033);
                return null;
            }
        }
        function saveToFile(type, filePath, rect) {
            try {
                var renderTexture = convertImageToRenderTexture(this, rect);
                renderTexture.saveToFile(type, filePath);
                renderTexture.$dispose();
            }
            catch (e) {
                egret.$error(1033);
            }
        }
        function getPixel32(x, y) {
            egret.$error(1035);
            return null;
        }
        egret.Texture.prototype.toDataURL = toDataURL;
        egret.Texture.prototype.saveToFile = saveToFile;
        egret.Texture.prototype.getPixel32 = getPixel32;
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
var egret;
(function (egret) {
    var native;
    (function (native) {
        var surfacePool = [];
        /**
         * @private
         */
        var OpenGLFactory = (function () {
            /**
             * @private
             */
            function OpenGLFactory() {
                egret.sys.sharedRenderContext = this.create().renderContext;
                for (var i = 0; i < 3; i++) {
                    surfacePool.push(this.create());
                }
            }
            var d = __define,c=OpenGLFactory;p=c.prototype;
            /**
             * @private
             * ???????????????????????????????????????Surface??????
             * @param useOnce ???????????????????????????????????????????????????????????????????????????
             */
            p.create = function (useOnce) {
                var surface = (useOnce || surfacePool.length > 3) ? surfacePool.pop() : null;
                if (!surface) {
                    surface = this.createSurface(new native.NativeSurface());
                }
                surface.$reload();
                return surface;
            };
            /**
             * @private
             * ????????????Surface??????
             * @param surface ????????????Surface??????
             */
            p.release = function (surface) {
                if (!surface) {
                    return;
                }
                surface.$dispose();
                surface.width = surface.height = 1;
                surfacePool.push(surface);
            };
            /**
             * @private
             */
            p.createSurface = function (canvas) {
                var context = canvas.renderContext;
                context.surface = canvas;
                return canvas;
            };
            return OpenGLFactory;
        })();
        native.OpenGLFactory = OpenGLFactory;
        egret.registerClass(OpenGLFactory,"egret.native.OpenGLFactory",["egret.sys.SurfaceFactory"]);
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
var egret;
(function (egret) {
    var native;
    (function (native) {
        /**
         * @private
         */
        var NativePlayer = (function (_super) {
            __extends(NativePlayer, _super);
            function NativePlayer() {
                _super.call(this);
                this.init(NativePlayer.option);
            }
            var d = __define,c=NativePlayer;p=c.prototype;
            p.init = function (option) {
                //??????????????????????????????
                option.showPaintRect = false;
                var stage = new egret.Stage();
                stage.$screen = this;
                stage.$scaleMode = option.scaleMode;
                stage.$maxTouches = option.maxTouches;
                stage.frameRate = option.frameRate;
                stage.textureScaleFactor = option.textureScaleFactor;
                stage.addEventListener(egret.Event.ENTER_FRAME, function () {
                    if (native.$currentSurface) {
                        native.$currentSurface.end();
                    }
                }, this);
                var surface = egret.sys.surfaceFactory.create();
                surface.$isRoot = true;
                var touch = new native.NativeTouchHandler(stage);
                var player = new egret.sys.Player(surface.renderContext, stage, option.entryClassName);
                new native.NativeHideHandler(stage);
                //var nativeInput = new NativeInput();
                if (DEBUG) {
                    player.showPaintRect(option.showPaintRect);
                    if (option.showFPS || option.showLog) {
                        var styleStr = option.fpsStyles || "";
                        var stylesArr = styleStr.split(",");
                        var styles = {};
                        for (var i = 0; i < stylesArr.length; i++) {
                            var tempStyleArr = stylesArr[i].split(":");
                            styles[tempStyleArr[0]] = tempStyleArr[1];
                        }
                        option.fpsStyles = styles;
                        player.displayFPS(option.showFPS, option.showLog, option.logFilter, option.fpsStyles);
                    }
                }
                this.playerOption = option;
                this.stage = stage;
                this.player = player;
                this.nativeTouch = touch;
                //this.nativeInput = nativeInput;
                this.updateScreenSize();
                this.updateMaxTouches();
                player.start();
            };
            p.updateScreenSize = function () {
                var option = this.playerOption;
                var screenWidth = egret_native.EGTView.getFrameWidth();
                var screenHeight = egret_native.EGTView.getFrameHeight();
                var stageSize = egret.sys.screenAdapter.calculateStageSize(this.stage.$scaleMode, screenWidth, screenHeight, option.contentWidth, option.contentHeight);
                var stageWidth = stageSize.stageWidth;
                var stageHeight = stageSize.stageHeight;
                var displayWidth = stageSize.displayWidth;
                var displayHeight = stageSize.displayHeight;
                var top = (screenHeight - displayHeight) / 2;
                var left = (screenWidth - displayWidth) / 2;
                egret_native.EGTView.setVisibleRect(left, top, displayWidth, displayHeight);
                egret_native.EGTView.setDesignSize(stageWidth, stageHeight);
                this.player.updateStageSize(stageWidth, stageHeight);
                //var scalex = displayWidth / stageWidth,
                //    scaley = displayHeight / stageHeight;
                //this.webTouchHandler.updateScaleMode(scalex, scaley, rotation);
                //this.webInput.$updateSize();
            };
            /**
             * @private
             * ??????????????????
             */
            p.updateMaxTouches = function () {
                this.nativeTouch.$updateMaxTouches();
            };
            return NativePlayer;
        })(egret.HashObject);
        native.NativePlayer = NativePlayer;
        egret.registerClass(NativePlayer,"egret.native.NativePlayer",["egret.sys.Screen"]);
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
var egret;
(function (egret) {
    var native;
    (function (native) {
        function runEgret() {
            var ticker = egret.sys.$ticker;
            var mainLoop = function () {
                ticker.update();
            };
            egret_native.executeMainLoop(mainLoop, ticker);
            egret.sys.surfaceFactory = new native.OpenGLFactory();
            if (!egret.sys.screenAdapter) {
                egret.sys.screenAdapter = new egret.sys.ScreenAdapter();
            }
            new native.NativePlayer();
        }
        function toArray(argument) {
            var args = [];
            for (var i = 0; i < argument.length; i++) {
                args.push(argument[i]);
            }
            return args;
        }
        egret.warn = function () {
            console.warn.apply(console, toArray(arguments));
        };
        egret.error = function () {
            console.error.apply(console, toArray(arguments));
        };
        egret.assert = function () {
            console.assert.apply(console, toArray(arguments));
        };
        if (DEBUG) {
            egret.log = function () {
                if (DEBUG) {
                    var length = arguments.length;
                    var info = "";
                    for (var i = 0; i < length; i++) {
                        info += arguments[i] + " ";
                    }
                    egret.sys.$logToFPS(info);
                }
                console.log.apply(console, toArray(arguments));
            };
        }
        else {
            egret.log = function () {
                console.log.apply(console, toArray(arguments));
            };
        }
        egret.runEgret = runEgret;
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
var egret;
(function (egret) {
    var native;
    (function (native) {
        /**
         * @private
         */
        function getOption(key) {
            return egret_native.getOption(key);
        }
        native.getOption = getOption;
        egret.getOption = getOption;
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
var egret;
(function (egret) {
    var native;
    (function (native) {
        var callBackDic = {};
        /**
         * @private
         */
        var NativeExternalInterface = (function () {
            function NativeExternalInterface() {
            }
            var d = __define,c=NativeExternalInterface;p=c.prototype;
            NativeExternalInterface.call = function (functionName, value) {
                var data = {};
                data.functionName = functionName;
                data.value = value;
                egret_native.sendInfoToPlugin(JSON.stringify(data));
            };
            NativeExternalInterface.addCallback = function (functionName, listener) {
                callBackDic[functionName] = listener;
            };
            return NativeExternalInterface;
        })();
        native.NativeExternalInterface = NativeExternalInterface;
        egret.registerClass(NativeExternalInterface,"egret.native.NativeExternalInterface",["egret.ExternalInterface"]);
        /**
         * @private
         * @param info
         */
        function onReceivedPluginInfo(info) {
            var data = JSON.parse(info);
            var functionName = data.functionName;
            var listener = callBackDic[functionName];
            if (listener) {
                var value = data.value;
                listener.call(null, value);
            }
            else {
                egret.$warn(1004, functionName);
            }
        }
        egret.ExternalInterface = NativeExternalInterface;
        egret_native.receivedPluginInfo = onReceivedPluginInfo;
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
var egret;
(function (egret) {
    var localStorage;
    (function (localStorage) {
        var native;
        (function (native) {
            var filePath = "LocalStorage.local";
            var localStorageData = {};
            /**
             * @private
             *
             * @param key
             * @returns
             */
            function getItem(key) {
                return localStorageData[key];
            }
            /**
             * @private
             *
             * @param key
             * @param value
             * @returns
             */
            function setItem(key, value) {
                localStorageData[key] = value;
                try {
                    this.save();
                    return true;
                }
                catch (e) {
                    egret.$warn(1018, key, value);
                    return false;
                }
            }
            /**
             * @private
             *
             * @param key
             */
            function removeItem(key) {
                delete localStorageData[key];
                save();
            }
            /**
             * @private
             *
             */
            function clear() {
                for (var key in localStorageData) {
                    delete localStorageData[key];
                }
                save();
            }
            /**
             * @private
             *
             */
            function save() {
                egret_native.saveRecord(filePath, JSON.stringify(localStorageData));
            }
            if (egret_native.isRecordExists(filePath)) {
                var str = egret_native.loadRecord(filePath);
                localStorageData = JSON.parse(str);
            }
            else {
                localStorageData = {};
            }
            localStorage.getItem = getItem;
            localStorage.setItem = setItem;
            localStorage.removeItem = removeItem;
            localStorage.clear = clear;
        })(native = localStorage.native || (localStorage.native = {}));
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
    var web;
    (function (web) {
        /**
         * @private
         * @inheritDoc
         */
        var NativeSoundChannel = (function (_super) {
            __extends(NativeSoundChannel, _super);
            /**
             * @private
             */
            function NativeSoundChannel(audio) {
                var _this = this;
                _super.call(this);
                /**
                 * @private
                 */
                this.$startTime = 0;
                /**
                 * @private
                 */
                this.audio = null;
                //??????????????????????????????
                this.isStopped = false;
                /**
                 * @private
                 */
                this.onPlayEnd = function () {
                    if (_this.$loops == 1) {
                        _this.stop();
                        _this.dispatchEventWith(egret.Event.SOUND_COMPLETE);
                        return;
                    }
                    if (_this.$loops > 0) {
                        _this.$loops--;
                    }
                    /////////////
                    _this.audio.load();
                    _this.$play();
                };
                audio.addEventListener("ended", this.onPlayEnd);
                this.audio = audio;
            }
            var d = __define,c=NativeSoundChannel;p=c.prototype;
            p.$play = function () {
                if (this.isStopped) {
                    egret.$error(1036);
                    return;
                }
                try {
                    this.audio.currentTime = this.$startTime;
                }
                catch (e) {
                }
                finally {
                    this.audio.play();
                }
            };
            /**
             * @private
             * @inheritDoc
             */
            p.stop = function () {
                if (!this.audio)
                    return;
                var audio = this.audio;
                audio.pause();
                audio.removeEventListener("ended", this.onPlayEnd);
                this.audio = null;
                web.NativeSound.$recycle(this.$url, audio);
            };
            d(p, "volume"
                /**
                 * @private
                 * @inheritDoc
                 */
                ,function () {
                    if (!this.audio)
                        return 1;
                    return this.audio.volume;
                }
                /**
                 * @inheritDoc
                 */
                ,function (value) {
                    if (this.isStopped) {
                        egret.$error(1036);
                        return;
                    }
                    if (!this.audio)
                        return;
                    this.audio.volume = value;
                }
            );
            d(p, "position"
                /**
                 * @private
                 * @inheritDoc
                 */
                ,function () {
                    if (!this.audio)
                        return 0;
                    return this.audio.currentTime;
                }
            );
            return NativeSoundChannel;
        })(egret.EventDispatcher);
        web.NativeSoundChannel = NativeSoundChannel;
        egret.registerClass(NativeSoundChannel,"egret.web.NativeSoundChannel",["egret.SoundChannel","egret.IEventDispatcher"]);
    })(web = egret.web || (egret.web = {}));
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
        /**
         * @private
         */
        var NativeHideHandler = (function (_super) {
            __extends(NativeHideHandler, _super);
            function NativeHideHandler(stage) {
                _super.call(this);
                egret_native.pauseApp = function () {
                    //console.log("pauseApp");
                    stage.dispatchEvent(new egret.Event(egret.Event.DEACTIVATE));
                    egret_native.Audio.pauseBackgroundMusic();
                    egret_native.Audio.pauseAllEffects();
                };
                egret_native.resumeApp = function () {
                    //console.log("resumeApp");
                    stage.dispatchEvent(new egret.Event(egret.Event.ACTIVATE));
                    egret_native.Audio.resumeBackgroundMusic();
                    egret_native.Audio.resumeAllEffects();
                };
            }
            var d = __define,c=NativeHideHandler;p=c.prototype;
            return NativeHideHandler;
        })(egret.HashObject);
        native.NativeHideHandler = NativeHideHandler;
        egret.registerClass(NativeHideHandler,"egret.native.NativeHideHandler");
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
var egret;
(function (egret) {
    /**
     * @private
     * @version Egret 2.4
     * @platform Web,Native
     */
    var NativeResourceLoader = (function (_super) {
        __extends(NativeResourceLoader, _super);
        function NativeResourceLoader() {
            _super.apply(this, arguments);
            /**
             * @private
             */
            this._downCount = 0;
            /**
             * @private
             */
            this._path = null;
            /**
             * @private
             */
            this._bytesTotal = 0;
        }
        var d = __define,c=NativeResourceLoader;p=c.prototype;
        /**
         *
         * @param path
         * @param bytesTotal
         * @version Egret 2.4
         * @platform Web,Native
         */
        p.load = function (path, bytesTotal) {
            this._downCount = 0;
            this._path = path;
            this._bytesTotal = bytesTotal;
            this.reload();
        };
        /**
         * @private
         *
         */
        p.reload = function () {
            if (this._downCount >= 3) {
                this.downloadFileError();
                return;
            }
            //if (egret_native.isRecordExists(this._path)) {//??????
            //    this.loadOver();
            //    return;
            //}
            //else if (egret_native.isFileExists(this._path)){
            //    this.loadOver();
            //    return;
            //}
            //else {
            this._downCount++;
            var promise = egret.PromiseObject.create();
            var self = this;
            promise.onSuccessFunc = function () {
                self.loadOver();
            };
            promise.onErrorFunc = function () {
                self.reload();
            };
            promise.downloadingSizeFunc = function (bytesLoaded) {
                self.downloadingProgress(bytesLoaded);
            };
            egret_native.download(this._path, this._path, promise);
            //}
        };
        /**
         * @private
         *
         * @param bytesLoaded
         */
        p.downloadingProgress = function (bytesLoaded) {
            egret.ProgressEvent.dispatchProgressEvent(this, egret.ProgressEvent.PROGRESS, bytesLoaded, this._bytesTotal);
        };
        /**
         * @private
         *
         */
        p.downloadFileError = function () {
            this.dispatchEvent(new egret.Event(egret.IOErrorEvent.IO_ERROR));
        };
        /**
         * @private
         *
         */
        p.loadOver = function () {
            this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
        };
        return NativeResourceLoader;
    })(egret.EventDispatcher);
    egret.NativeResourceLoader = NativeResourceLoader;
    egret.registerClass(NativeResourceLoader,"egret.NativeResourceLoader");
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided this the following conditions are met:
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
        /**
         * @private
         */
        var NativeTouchHandler = (function (_super) {
            __extends(NativeTouchHandler, _super);
            function NativeTouchHandler(stage) {
                _super.call(this);
                this.$touch = new egret.sys.TouchHandler(stage);
                var self = this;
                egret_native.onTouchesBegin = function (num, ids, xs_array, ys_array) {
                    self.$executeTouchCallback(num, ids, xs_array, ys_array, self.$touch.onTouchBegin);
                };
                egret_native.onTouchesMove = function (num, ids, xs_array, ys_array) {
                    self.$executeTouchCallback(num, ids, xs_array, ys_array, self.$touch.onTouchMove);
                };
                egret_native.onTouchesEnd = function (num, ids, xs_array, ys_array) {
                    self.$executeTouchCallback(num, ids, xs_array, ys_array, self.$touch.onTouchEnd);
                };
                egret_native.onTouchesCancel = function (num, ids, xs_array, ys_array) {
                };
            }
            var d = __define,c=NativeTouchHandler;p=c.prototype;
            p.$executeTouchCallback = function (num, ids, xs_array, ys_array, callback) {
                for (var i = 0; i < num; i++) {
                    var id = ids[i];
                    var x = xs_array[i];
                    var y = ys_array[i];
                    callback.call(this.$touch, x, y, id);
                }
            };
            /**
             * @private
             * ??????????????????????????????
             */
            p.$updateMaxTouches = function () {
                this.$touch.$initMaxTouches();
            };
            return NativeTouchHandler;
        })(egret.HashObject);
        native.NativeTouchHandler = NativeTouchHandler;
        egret.registerClass(NativeTouchHandler,"egret.native.NativeTouchHandler");
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
var egret;
(function (egret) {
    var native;
    (function (native) {
        /**
         * @private
         */
        var NativeHttpRequest = (function (_super) {
            __extends(NativeHttpRequest, _super);
            /**
             * @private
             */
            function NativeHttpRequest() {
                _super.call(this);
                /**
                 * @private
                 */
                this._url = "";
                this._method = "";
            }
            var d = __define,c=NativeHttpRequest;p=c.prototype;
            d(p, "response"
                /**
                 * @private
                 * ????????????????????????????????????????????????responseType?????????????????????
                 */
                ,function () {
                    return this._response;
                }
            );
            d(p, "responseType"
                /**
                 * @private
                 * ??????????????????????????????????????? HttpResponseType ?????????????????????????????????????????????????????????????????????HttpResponseType.TEXT???
                 */
                ,function () {
                    return this._responseType;
                }
                ,function (value) {
                    this._responseType = value;
                }
            );
            d(p, "withCredentials"
                /**
                 * @private
                 * ?????????????????????(cross-site)???????????????(Access-Control)????????????????????????????????????(??????cookie????????????header)??? ????????? false???(???????????????????????????????????????)
                 */
                ,function () {
                    return this._withCredentials;
                }
                ,function (value) {
                    this._withCredentials = value;
                }
            );
            /**
             * @private
             * ?????????????????????.????????????????????????????????????????????????????????????????????????????????????abort().
             * @param url ????????????????????????URL????????????????????????URL
             * @param method ??????????????????HTTP????????? ????????? HttpMethod ??????????????????.
             */
            p.open = function (url, method) {
                if (method === void 0) { method = "GET"; }
                this._url = url;
                this._method = method;
            };
            /**
             * @private
             * ????????????.
             * @param data ?????????????????????
             */
            p.send = function (data) {
                var self = this;
                if (!egret_native.isFileExists(self._url)) {
                    download();
                }
                else {
                    readFileAsync();
                }
                function readFileAsync() {
                    var promise = new egret.PromiseObject();
                    promise.onSuccessFunc = function (content) {
                        self._response = content;
                        egret.Event.dispatchEvent(self, egret.Event.COMPLETE);
                    };
                    egret_native.readFileAsync(self._url, promise);
                }
                function download() {
                    var promise = egret.PromiseObject.create();
                    promise.onSuccessFunc = onLoadComplete;
                    promise.onErrorFunc = function () {
                        egret.Event.dispatchEvent(self, egret.IOErrorEvent.IO_ERROR);
                    };
                    egret_native.download(self._url, self._url, promise);
                }
                function onLoadComplete() {
                    var content = egret_native.readFileSync(self._url);
                    self._response = content;
                    egret.Event.dispatchEvent(self, egret.Event.COMPLETE);
                }
            };
            /**
             * @private
             * ???????????????????????????,?????????????????????.
             */
            p.abort = function () {
            };
            /**
             * @private
             * ???????????????????????????(??????????????????), ???????????????????????????,?????????"".
             */
            p.getAllResponseHeaders = function () {
                return "";
            };
            /**
             * @private
             * ????????????HTTP???????????????.????????????,??????????????????????????? open() ?????????????????????url.
             * @param header ?????????????????????????????????.
             * @param value ??????????????????????????????.
             */
            p.setRequestHeader = function (header, value) {
                this.header = header;
                this.headerValue = value;
            };
            /**
             * @private
             * ??????????????????????????????, ??????????????????????????????,????????????????????????,?????????"".
             * @param header ???????????????????????????
             */
            p.getResponseHeader = function (header) {
                return "";
            };
            return NativeHttpRequest;
        })(egret.EventDispatcher);
        native.NativeHttpRequest = NativeHttpRequest;
        egret.registerClass(NativeHttpRequest,"egret.native.NativeHttpRequest",["egret.HttpRequest"]);
        egret.HttpRequest = NativeHttpRequest;
        if (DEBUG) {
            egret.$markReadOnly(NativeHttpRequest, "response");
        }
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
var egret;
(function (egret) {
    var native;
    (function (native) {
        /**
         * @private
         * ImageLoader ???????????????????????????JPG???PNG ??? GIF?????????????????? load() ?????????????????????????????????????????????????????????????????? ImageLoader.data ????????? ???
         */
        var NativeImageLoader = (function (_super) {
            __extends(NativeImageLoader, _super);
            function NativeImageLoader() {
                _super.apply(this, arguments);
                /**
                 * @private
                 * ?????? load() ????????????????????? BitmapData ???????????????
                 */
                this.data = null;
                /**
                 * @private
                 * ??????????????????????????????????????????????????????????????????????????????(CORS)???????????????null???
                 * ???????????????"anonymous","use-credentials"???null,??????????????????????????????"anonymous"???
                 */
                this.crossOrigin = null;
            }
            var d = __define,c=NativeImageLoader;p=c.prototype;
            /**
             * @private
             *
             * @param url
             * @param callback
             */
            p.load = function (url) {
                this.check(url);
            };
            p.check = function (url) {
                var self = this;
                if (self.isNetUrl(url)) {
                    self.download(url);
                }
                else if (!egret_native.isFileExists(url)) {
                    self.download(url);
                }
                else {
                    self.loadTexture(url);
                }
            };
            p.download = function (url) {
                var self = this;
                var promise = egret.PromiseObject.create();
                promise.onSuccessFunc = function () {
                    self.loadTexture(url);
                };
                promise.onErrorFunc = function () {
                    self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
                };
                egret_native.download(url, url, promise);
            };
            p.loadTexture = function (url) {
                var self = this;
                var promise = new egret.PromiseObject();
                promise.onSuccessFunc = function (bitmapData) {
                    self.data = native.toBitmapData(bitmapData);
                    self.dispatchEventWith(egret.Event.COMPLETE);
                };
                promise.onErrorFunc = function () {
                    self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
                };
                egret_native.Texture.addTextureAsyn(url, promise);
            };
            /**
             * ?????????????????????
             * @param url
             * @returns {boolean}
             */
            p.isNetUrl = function (url) {
                return url.indexOf("http://") != -1;
            };
            return NativeImageLoader;
        })(egret.EventDispatcher);
        native.NativeImageLoader = NativeImageLoader;
        egret.registerClass(NativeImageLoader,"egret.native.NativeImageLoader",["egret.ImageLoader"]);
        egret.ImageLoader = NativeImageLoader;
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
var egret;
(function (egret) {
    /**
     * @classdesc
     * @implements egret.StageText
     * @private
     * @version Egret 2.4
     * @platform Web,Native
     */
    var NativeStageText = (function (_super) {
        __extends(NativeStageText, _super);
        /**
         * @version Egret 2.4
         * @platform Web,Native
         */
        function NativeStageText() {
            _super.call(this);
            /**
             * @private
             */
            this.textValue = "";
            /**
             * @private
             */
            this.isFinishDown = false;
            this.textValue = "";
        }
        var d = __define,c=NativeStageText;p=c.prototype;
        /**
         * @private
         *
         * @returns
         */
        p.$getText = function () {
            if (!this.textValue) {
                this.textValue = "";
            }
            return this.textValue;
        };
        /**
         * @private
         *
         * @param value
         */
        p.$setText = function (value) {
            this.textValue = value;
            return true;
        };
        /**
         * @private
         *
         */
        p.$onBlur = function () {
        };
        //????????????
        p.showScreenKeyboard = function () {
            var self = this;
            self.dispatchEvent(new egret.Event("focus"));
            egret.Event.dispatchEvent(self, "focus", false, { "showing": true });
            egret_native.EGT_TextInput = function (appendText) {
                if (self.$textfield.multiline) {
                    if (self.isFinishDown) {
                        self.isFinishDown = false;
                        self.textValue = appendText;
                        self.dispatchEvent(new egret.Event("updateText"));
                    }
                }
                else {
                    self.textValue = appendText.replace(/[\n|\r]/, "");
                    //???????????????
                    egret_native.TextInputOp.setKeybordOpen(false);
                    self.dispatchEvent(new egret.Event("updateText"));
                    self.dispatchEvent(new egret.Event("blur"));
                }
            };
            //????????????
            egret_native.EGT_keyboardFinish = function () {
                if (self.$textfield.multiline) {
                    self.isFinishDown = true;
                }
                self.dispatchEvent(new egret.Event("blur"));
            };
        };
        /**
         * @private
         *
         */
        p.$show = function () {
            var self = this;
            egret_native.EGT_getTextEditerContentText = function () {
                return self.$getText();
            };
            egret_native.EGT_keyboardDidShow = function () {
                //if (egret_native.TextInputOp.isFullScreenKeyBoard()) {//??????
                //}
                self.showScreenKeyboard();
                egret_native.EGT_keyboardDidShow = function () {
                };
            };
            var textfield = this.$textfield;
            var inputMode = textfield.multiline ? 0 : 6;
            var inputFlag = -1; //textfield.displayAsPassword ? 0 : -1;
            var returnType = 1;
            var maxLength = textfield.maxChars <= 0 ? -1 : textfield.maxChars;
            egret_native.TextInputOp.setKeybordOpen(true, JSON.stringify({ "inputMode": inputMode, "inputFlag": inputFlag, "returnType": returnType, "maxLength": maxLength }));
        };
        /**
         * @private
         *
         */
        p.$hide = function () {
            this.dispatchEvent(new egret.Event("blur"));
            egret_native.TextInputOp.setKeybordOpen(false);
        };
        p.$resetStageText = function () {
        };
        p.$addToStage = function () {
        };
        p.$removeFromStage = function () {
        };
        p.$setTextField = function (value) {
            this.$textfield = value;
            return true;
        };
        return NativeStageText;
    })(egret.EventDispatcher);
    egret.NativeStageText = NativeStageText;
    egret.registerClass(NativeStageText,"egret.NativeStageText",["egret.StageText"]);
    egret.StageText = NativeStageText;
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
        if (DEBUG) {
            function setLogLevel(logType) {
                egret_native.loglevel(logType);
            }
            Object.defineProperty(egret.Logger, "logLevel", {
                set: setLogLevel,
                enumerable: true,
                configurable: true
            });
        }
    })(native = egret.native || (egret.native = {}));
})(egret || (egret = {}));
