var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var _this = this;
var Albums = require("../Schemes/Albums");
var Users = require("../Schemes/User");
var set_step = require("./user").set_step;
exports.show = function (msg) { return __awaiter(_this, void 0, void 0, function () {
    var albums;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Albums.find({ owner: msg.author })]; // Вытягиваем из базы плейлист по ID
            case 1:
                albums = _a.sent() // Вытягиваем из базы плейлист по ID
                ;
                msg.author.send("\u0412\u043E\u0442 \u0441\u043F\u0438\u0441\u043E\u043A \u0442\u0432\u043E\u0438\u0445 \u043F\u043B\u0435\u0439\u043B\u0438\u0441\u0442\u043E\u0432:\n_".concat(albums.map(function (x) { return x.name; }).join('\n'), "_")); // Формируем и отправляем ответ
                return [2 /*return*/];
        }
    });
}); };
exports.explore = function (msg, name) { return __awaiter(_this, void 0, void 0, function () {
    var album;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Albums.findOne({ owner: msg.author, name: name })]; // Ищем один плейлист, по полям: владелец, название
            case 1:
                album = _a.sent() // Ищем один плейлист, по полям: владелец, название
                ;
                msg.author.send("\u0421\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435 \u043F\u043B\u0435\u0439\u043B\u0438\u0441\u0442\u0430 **".concat(name, "**:\n").concat(album.songs.map(function (x) { return x.singer + " - " + x.song; }).join('\n'))); // Формирование и отправка ответа
                return [2 /*return*/];
        }
    });
}); };
exports.create = function (msg, name) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!name) return [3 /*break*/, 2];
                return [4 /*yield*/, Albums.create({ owner: msg.author, name: name, songs: [] }).then(function () {
                        msg.author.send("\uD83C\uDF89 \u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u043D \u043F\u043B\u0435\u0439\u043B\u0438\u0441\u0442 \u0441 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435\u043C **".concat(name, "**"));
                    })];
            case 1: // Если имя плейлиста передано, то создаем его и завершаем работу функции
            return [2 /*return*/, _a.sent()];
            case 2:
                msg.author.send("Не может быть плейлиста с пустым именем!");
                return [2 /*return*/];
        }
    });
}); };
exports.remove = function (msg, name) { return __awaiter(_this, void 0, void 0, function () {
    var deletedCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Albums.deleteOne({ owner: msg.author, name: name })]; // Удаляем плейлист
            case 1:
                deletedCount = (_a.sent()) // Удаляем плейлист
                .deletedCount;
                if (deletedCount != 0) { // Если плейлист был найден и удален - пишем положительный вариант
                    msg.author.send("\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0435\u043D \u0430\u043B\u044C\u0431\u043E\u043C \u0441 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435\u043C **".concat(name, "**"));
                }
                else {
                    msg.author.send("\u0410\u043B\u044C\u0431\u043E\u043C\u0430 \u0441 \u0438\u043C\u0435\u043D\u0435\u043C **".concat(name, "** \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"));
                }
                return [2 /*return*/];
        }
    });
}); };
exports.edit = function (msg, name) { return __awaiter(_this, void 0, void 0, function () {
    var album;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Albums.findOne({ owner: msg.author, name: name })];
            case 1:
                album = _a.sent();
                if (!album) return [3 /*break*/, 3];
                return [4 /*yield*/, set_step(msg, name)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                msg.author.send("\u0410\u043B\u044C\u0431\u043E\u043C\u0430 \u0441 \u0438\u043C\u0435\u043D\u0435\u043C **".concat(name, "** \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"));
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.save = function (msg) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, set_step(msg, "default")];
            case 1:
                _a.sent();
                msg.author.send("Вы в главном меню!");
                return [2 /*return*/];
        }
    });
}); };
