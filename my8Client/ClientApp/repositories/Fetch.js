"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Fetch = (function () {
    function Fetch() {
    }
    Fetch.CallAction = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var xhr;
            return __generator(this, function (_a) {
                xhr = new XMLHttpRequest();
                xhr.open('get', url, true);
                xhr.send();
                return [2];
            });
        });
    };
    Fetch.Get = function (url, hasShowWait, callback_success, callback_fail) {
        if (hasShowWait === void 0) { hasShowWait = true; }
        if (callback_success === void 0) { callback_success = null; }
        if (callback_fail === void 0) { callback_fail = null; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (hasShowWait) {
                    this.showWait(true);
                }
                return [2, fetch(url, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }).then(function (response) {
                        if (hasShowWait) {
                            _this.showWait(false);
                        }
                        if (response.status == 200) {
                            var result = response.json();
                            if (callback_success || callback_fail) {
                                result.then(function (data) {
                                    if (!data.error) {
                                        if (callback_success) {
                                            callback_success(data);
                                            return data;
                                        }
                                    }
                                    else {
                                        if (callback_fail) {
                                            _this.context.ShowMessage('error', data.error.message, data.error.code);
                                            callback_fail(data);
                                            return data;
                                        }
                                    }
                                });
                            }
                            else
                                return result;
                        }
                        else {
                        }
                    })];
            });
        });
    };
    Fetch.Post = function (url, data, hasShowWait, callback_success, callback_fail) {
        if (hasShowWait === void 0) { hasShowWait = true; }
        if (callback_success === void 0) { callback_success = null; }
        if (callback_fail === void 0) { callback_fail = null; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (hasShowWait) {
                    this.showWait(true);
                }
                return [2, fetch(url, {
                        method: 'POST',
                        credentials: 'include',
                        body: JSON.stringify(data),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }).then(function (response) {
                        if (hasShowWait) {
                            _this.showWait(false);
                        }
                        if (response.status == 200) {
                            var result = response.json();
                            if (callback_success || callback_fail) {
                                result.then(function (data) {
                                    if (!data.error) {
                                        if (callback_success) {
                                            callback_success(data);
                                            return data;
                                        }
                                    }
                                    else {
                                        if (callback_fail) {
                                            _this.context.ShowMessage('error', data.error.message, data.error.code);
                                            callback_fail(data);
                                            return data;
                                        }
                                    }
                                });
                            }
                            else
                                return result;
                        }
                        else {
                        }
                    })];
            });
        });
    };
    Fetch.Delete = function (url, data, hasShowWait) {
        if (hasShowWait === void 0) { hasShowWait = true; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (hasShowWait) {
                    this.showWait(true);
                }
                return [2, fetch(url, {
                        method: 'DELETE',
                        credentials: 'include',
                        body: JSON.stringify(data),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }).then(function (response) {
                        if (hasShowWait) {
                            _this.showWait(false);
                        }
                        return response.json();
                    })];
            });
        });
    };
    Fetch.showWait = function (hasShowWait, delayTime) {
        if (hasShowWait) {
            this.WaitCount++;
            if (this.ProcessBarPercent < 100) {
                this.ProcessBarPercent += 5;
            }
            this.HasShowWait = true;
        }
        else {
            this.WaitCount--;
            if (this.WaitCount < 1) {
                this.WaitCount = 0;
                var timeout = 0;
                if (delayTime != null && delayTime > 0) {
                    timeout = delayTime;
                }
                this.ProcessBarPercent = 20;
                setTimeout(function () {
                    this.HasShowWait = false;
                }, timeout);
            }
        }
    };
    Fetch.WaitCount = 0;
    Fetch.ProcessBarPercent = 0;
    Fetch.HasShowWait = false;
    return Fetch;
}());
exports.Fetch = Fetch;
//# sourceMappingURL=Fetch.js.map