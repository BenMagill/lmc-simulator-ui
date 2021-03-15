var Machine = require("lmc-simulator/lib/index")

var machine = new Machine({
    onInput: function(text){return prompt(text)}, 
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
    }

})

document.getElementById("load").addEventListener("click", function(e){
    machine.loadToRAM(document.getElementById("code").value)
    console.log(machine.memory)
    console.log(machine)
    machine.run()
})

function updateMemory(data) {
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