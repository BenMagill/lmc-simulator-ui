(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var Machine = require("lmc-simulator")

var machine = new Machine({
    onInput: function(text){
        var result =  prompt(text)
        var textElem = document.createElement("p")
        textElem.innerText = result
        document.getElementById("input").appendChild(textElem)
        return result
    }, 
    timeout: 1,
    onOutput: function(text){
        var node = document.createElement("p")
        node.innerText = text
        document.getElementById("output").appendChild(node)
    },
    logOutput: function(text){
        var node = document.createElement("p")
        node.innerText = text
        document.getElementById("logs").appendChild(node)
    },
    onMemoryChange: function(){
        updateMemory(machine.memory)
    },
    onRegisterChange: function(i){
        var register = document.getElementById(i.register)
        console.log({register, value: i.value})

        register.getElementsByClassName("registerValue")[0].innerText = i.value
    }

})

document.getElementById("load").addEventListener("click", function(e){
    machine.loadToRAM(document.getElementById("code").value)
    console.log(machine.memory)
    console.log(machine)
})

document.getElementById("run").addEventListener("click", function(){
    machine.run()
})

function updateMemory(data) {
    console.log(data)
    var mem = document.getElementById("memory")
    mem.innerHTML = ""
    for (let i = 0; i < 100; i++) {
        var value = data[i];
        if (value === undefined) value = "000"
        var memLocation = document.createElement("div")
        memLocation.className = "memoryItem"
        var location = document.createElement("p")
        location.innerText = i
        location.className = "memoryLocation"
        var memVal = document.createElement("p")
        memVal.className = "memoryValue"
        memVal.innerText = value
        memLocation.appendChild(location)
        memLocation.appendChild(memVal)
        mem.appendChild(memLocation)
    }
}

// Initialise
updateMemory([])

var registers = document.getElementsByClassName("register")
for (let i = 0; i < registers.length; i++) {
    const registerElem = registers[i];
    var registerName = document.createElement("p")
    registerName.className = "registerName"
    registerName.innerText = registerElem.id.toUpperCase()
    var value = document.createElement("p")
    value.className = "registerValue"
    value.innerText = 0
    registerElem.appendChild(registerName)
    registerElem.appendChild(value)
}
// var testInp = `
//         INP
// loop    OUT   
//         STA count
//         SUB # 2
// 	    STA count
//         BRP loop ; This is a comment
//         HLT
// one     DAT 1
// count   DAT   
// `

// // TODO: when parsing if using immediate check if operand is a valid number

// // Example using an array to store log outputs
// var log = []
// var getLogs = (str) => {
//     log.push(str)
// }

// var a = new Machine({logOutput: console.log, timeout: 1, onInput: (text)=>{return prompt(text)}})
// a.loadToRAM(testInp)
// async function b() {  
//     await a.run()
//     console.log(log)
    
// }

// b()
},{"lmc-simulator":2}],2:[function(require,module,exports){
"use strict";
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
var Machine = /** @class */ (function () {
    /**
     *
     * @param options
     */
    function Machine(options) {
        var _this = this;
        this.registers = {
            alu: {
                add: function () {
                    _this.registers.acc.set(_this.registers.acc.value + Number(_this.registers.mdr.value));
                },
                sub: function () {
                    _this.registers.acc.set(_this.registers.acc.value - Number(_this.registers.mdr.value));
                }
            },
            acc: {
                value: 0,
                set: function (inp) {
                    _this.onRegisterChange({ register: "acc", value: inp });
                    _this.registers.acc.value = inp;
                }
            },
            pc: {
                value: 0,
                set: function (inp) {
                    _this.onRegisterChange({ register: "pc", value: inp });
                    _this.registers.pc.value = inp;
                },
                incrememnt: function () {
                    _this.onRegisterChange({ register: "pc", value: _this.registers.pc.value + 1 });
                    _this.registers.pc.value = _this.registers.pc.value + 1;
                }
            },
            mar: {
                value: 0,
                getFromRAM: function () {
                    // Store the data at value in mdr
                    // this.registers.mdr.set(this.memory[this.registers.mar.value])
                    return _this.memory[_this.registers.mar.value];
                },
                storeInRAM: function () {
                    _this.onMemoryChange();
                    // store the value of the mdr in the memory at values location
                    _this.memory[_this.registers.mar.value] = _this.registers.mdr.value;
                },
                set: function (inp) {
                    _this.onRegisterChange({ register: "mar", value: inp });
                    _this.registers.mar.value = inp;
                }
            },
            mdr: {
                value: "",
                set: function (inp) {
                    _this.onRegisterChange({ register: "mdr", value: inp });
                    _this.registers.mdr.value = inp;
                }
            },
            cir: {
                value: "",
                set: function (inp) {
                    _this.onRegisterChange({ register: "cir", value: inp });
                    _this.registers.cir.value = inp;
                },
                decoded: {
                    opcode: 0,
                    mode: 0,
                    operand: 0
                }
            }
        };
        this.opcodes = ["HLT", "ADD", "SUB", "STA", "LDA", "BRA", "BRZ", "BRP", "INP", "OUT", "DAT"];
        this.memory = ["000"];
        this.output = [];
        this.end = false;
        this.error = false;
        this.onInput = options.onInput;
        this.onOutput = console.log;
        this.timeout = 500;
        this.log = function () { };
        this.onRegisterChange = function () { };
        this.onMemoryChange = function () { };
        if (options === null || options === void 0 ? void 0 : options.timeout)
            this.timeout = options.timeout;
        if (options === null || options === void 0 ? void 0 : options.onOutput)
            this.onOutput = options.onOutput;
        if (options === null || options === void 0 ? void 0 : options.logOutput)
            this.log = options.logOutput;
        if (options === null || options === void 0 ? void 0 : options.onRegisterChange)
            this.onRegisterChange = options.onRegisterChange;
        if (options === null || options === void 0 ? void 0 : options.onMemoryChange)
            this.onMemoryChange = options.onMemoryChange;
    }
    Machine.prototype.loadToRAM = function (code) {
        var _this = this;
        this.end = false;
        this.error = false;
        this.registers.pc.set(0);
        this.log("Compiling code");
        // Convert code to an array
        var codeA = code.split("\n");
        // Cleaning code
        this.log("Removing unneeded text");
        var cleaned = [];
        for (var _i = 0, codeA_1 = codeA; _i < codeA_1.length; _i++) {
            var line = codeA_1[_i];
            // Remove comments
            line = line.split(";")[0];
            // Replace /t with single space
            // line = line.replace(/\t+/g, " ")
            // Replace each block of spaces with a single one
            line = line.replace(/\s\s+/g, " ");
            // Remove spaces from start of line
            line = line.trim();
            // If line not blank add to cleaned code
            if (line !== "") {
                cleaned.push(line);
            }
        }
        // Find location of each label
        var labels = {};
        this.log("Finding labels");
        cleaned = cleaned.map(function (line, lineLocation) {
            // Split instruction into parts
            var parts = line.split(" ");
            // console.log(parts)
            // Find location of INSTRUCTION
            var index = null;
            for (var i = 0; i < parts.length; i++) {
                var part = parts[i];
                if (_this.opcodes.indexOf(part.toUpperCase()) !== -1) {
                    index = i;
                    break;
                }
            }
            // console.log(index)
            if (index === 1) {
                // Includes a label
                var label = parts[0];
                labels[label] = lineLocation;
                parts.splice(0, 1);
            }
            else if (index === null) {
                // No instruction on line
                _this.error = true;
                _this.log("Syntax error: invalid instruction");
            }
            else if (index > 1) {
                // Instruction should be first or second item
                _this.error = true;
                _this.log("Syntax error: unexpected identifier ");
            }
            return parts;
        });
        if (this.error)
            return;
        // console.log({labels, cleaned})
        // Now each instruction has the opcode at [0] and operand at [1] or [2] (depending on addressing mode) so just need to combine
        // Instruction is abcc
        // a = opcode
        // b = addressing mode (0 for direct, 1 for immediate)
        // c = location / data to use
        this.log("Converting to instructions");
        var output = cleaned.map(function (item) {
            var instruction = item[0].toUpperCase();
            var mode = 0;
            var data = item[1];
            // Determine addressing mode
            if (item[1] === "#") {
                mode = 1;
                data = item[2];
            }
            // Determine if data references a label or not
            if (isNaN(Number(data))) {
                // Does the label exist
                if (labels[data] !== undefined) {
                    data = labels[data];
                }
                else if (data !== undefined) {
                    _this.error = true;
                    _this.log("Syntax error: label \"" + data + "\" does not exist");
                }
                else {
                    data = 0;
                }
            }
            if (instruction === "DAT") {
                return data.toString();
            }
            else {
                return _this.opcodes.indexOf(instruction).toString() + mode.toString() + data.toString();
            }
        });
        // console.log(output)
        if (this.error === false) {
            this.memory = output;
            this.onMemoryChange();
            this.log("Loaded to memory");
        }
    };
    Machine.prototype.fetch = function () {
        this.log("\n------Fetching------");
        // Copy PC value to MAR
        this.registers.mar.set(this.registers.pc.value);
        this.log("Copying PC to MAR");
        // Load data in memory to MDR
        this.registers.mdr.set(this.registers.mar.getFromRAM());
        this.log("Copy memory at MAR address to MDR");
        // Copy MDR to CIR
        this.registers.cir.set(this.registers.mdr.value);
        this.log("Copy MDR to CIR");
        // Inrement PC
        this.registers.pc.incrememnt();
        this.log("Incrememnt PC");
    };
    Machine.prototype.decode = function () {
        this.log("\n------Decoding------");
        // Get CIR value
        var instruction = this.registers.cir.value;
        this.log("Splitting CIR into opcode, mode and operand");
        // split into its parts
        var opcode = Number(instruction[0]);
        var mode = Number(instruction[1]);
        var operand = Number(instruction.substring(2));
        this.registers.cir.decoded.opcode = opcode;
        this.registers.cir.decoded.mode = mode;
        this.registers.cir.decoded.operand = operand;
        this.log("Opcode: " + opcode + ", Mode: " + mode + ", Operand: " + operand);
    };
    Machine.prototype.execute = function () {
        this.log("\n------Executing------");
        // Get decoded values
        var _a = this.registers.cir.decoded, opcode = _a.opcode, mode = _a.mode, operand = _a.operand;
        // console.log(this.registers.cir.decoded)
        // Decide what to do
        this.log("Determing command");
        switch (opcode) {
            case 0:
                this.log("Halting program");
                this.end = true;
                break;
            case 1:
                // Add data to ACC
                this.log("Command: Add");
                // Decide based on addressing mode
                if (mode === 0) {
                    this.log("Using direct address mode");
                    // Load value from memory using operand as address
                    // Set mar to address
                    this.registers.mar.set(operand);
                    this.log("Settings MAR to address " + operand);
                    // Get data in memory
                    this.registers.mdr.set(this.registers.mar.getFromRAM());
                    this.log("Copying value at MAR address to MDR");
                }
                else {
                    this.log("Using immediate address mode");
                    // Set mdr to value to use
                    this.registers.mdr.set(operand.toString());
                    this.log("Setting MDR to operand value");
                }
                this.log("Adding MDR to ACC");
                this.registers.alu.add();
                break;
            case 2:
                // Sub data from ACC
                this.log("Command: Subtract");
                // Decide based on addressing mode
                if (mode === 0) {
                    // Load value from memory using operand as address
                    this.log("Using direct address mode");
                    // Set mar to address
                    this.registers.mar.set(operand);
                    this.log("Settings MAR to address " + operand);
                    // Get data in memory
                    this.registers.mdr.set(this.registers.mar.getFromRAM());
                    this.log("Copying value at MAR address to MDR");
                }
                else {
                    this.log("Using immediate address mode");
                    // Set mdr to value to use
                    this.registers.mdr.set(operand.toString());
                }
                this.log("Subtracting MDR from ACC");
                this.registers.alu.sub();
                break;
            case 3:
                this.log("Command: Store");
                // Store ACC in Memory at address given
                var acc = this.registers.acc.value;
                // Set MDR to data to store
                this.registers.mdr.set(acc.toString());
                this.log("Settings MDR to data to store");
                // Set MAR to operand
                this.registers.mar.set(operand);
                this.log("Setting MAR to " + operand);
                // Store
                this.registers.mar.storeInRAM();
                this.log("Copying MDR into Memory");
                // console.log(this.memory)
                break;
            case 4:
                this.log("Command: Load");
                // Load data into acc
                // Decide based on mode
                if (mode === 0) {
                    this.log("Using direct address mode");
                    // Load value from memory using operand as address
                    // Set mar to address
                    this.registers.mar.set(operand);
                    this.log("Setting MAR to " + operand);
                    // Get data in memory
                    this.registers.mdr.set(this.registers.mar.getFromRAM());
                    this.log("Copying memory at MAR address to MDR");
                    // Copy mdr to acc
                    this.registers.acc.set(Number(this.registers.mdr.value));
                    this.log("Copying MDR to ACC");
                }
                else {
                    this.log("Using immediate address mode");
                    // Set acc to value to use
                    this.registers.acc.set(operand);
                    this.log("Copying operand to ACC");
                }
                break;
            case 5:
                this.log("Command: Branch always");
                // Set PC to operand
                this.registers.pc.set(operand);
                this.log("Setting PC to operand");
                break;
            case 6:
                this.log("Command: Branch if 0");
                // Set PC to operand if ACC is 0
                if (this.registers.acc.value === 0) {
                    this.registers.pc.set(operand);
                    this.log("Setting PC to operand");
                }
                break;
            case 7:
                this.log("Command: Branch if positive");
                // Set PC to operand if ACC is > 0
                if (this.registers.acc.value > 0) {
                    this.log("Settings PC to operand");
                    this.registers.pc.set(operand);
                }
                break;
            case 8:
                this.log("Command: Input");
                // Get user input and store in ACC
                // TODO add checks to if it is a number or not
                var validInput = false;
                var input = "";
                while (validInput === false) {
                    input = this.onInput("Input a number");
                    if (isNaN(Number(input)) === false)
                        validInput = true;
                }
                this.registers.acc.set(Number(input));
                this.log("Settings ACC to " + input);
                break;
            case 9:
                this.log("Command: Output");
                // output acc
                this.onOutput(this.registers.acc.value);
                this.log("Outputting ACC");
                break;
            default:
                break;
        }
    };
    Machine.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.registers.pc.set(0);
                        this.end = false;
                        if (!(this.error === false)) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        if (!!this.end) return [3 /*break*/, 5];
                        this.fetch();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, _this.timeout); })];
                    case 2:
                        _a.sent();
                        this.decode();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, _this.timeout); })];
                    case 3:
                        _a.sent();
                        this.execute();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, _this.timeout); })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return Machine;
}());
module.exports = Machine;
// TODO: when parsing if using immediate check if operand is a valid number

},{}]},{},[1]);
