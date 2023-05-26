class Manager {
    settings(){
        const maxOfPredators = (number) => document.querySelector('.maxOfPredators').textContent = number;
        const minOfPredators = (number) => document.querySelector('.minOfPredators').textContent = number;
        const maxOfPreys = (number) => document.querySelector('.maxOfPreys').textContent = number;
        const minOfPreys = (number) => document.querySelector('.minOfPreys').textContent = number;

        document.getElementById('settings').addEventListener('click', listener);
        document.querySelector('.info').addEventListener('click', listener);
        document.querySelector('.samotyzhki').addEventListener('click', () => {
            numbOfPredators = prompt("numb of them"), numbOfPreys = prompt("numb of them");
            predatorSpeedLimit = prompt("numb of them"), preySpeedLimit = prompt("numb of them");
            predatorsBirthTime = prompt("numb of them"), preyBirthTime = prompt("numb of them");
            predatorsHungerTime = prompt("numb of them"), preysHungerTime = prompt("numb of them");
            predatorPopCap = prompt("numb of them"), preyPopCap = prompt("numb of them");
            killPreyRadius = prompt("numb of them");
        });
        
        document.querySelector('.start').addEventListener('click', () => running = true);
        document.querySelector('.pause').addEventListener('click', ()=>{
            running = false;
            document.querySelector('.start').textContent = 'Continue'; 
            maxOfPredators(Math.max(...predatorArray));
            minOfPredators(Math.min(...predatorArray));
            maxOfPreys(Math.max(...preyArray));
            minOfPreys(Math.min(...preyArray));
        });
        
        document.querySelector('.clear').addEventListener('click', () => location.reload());
    }
}