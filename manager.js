class Manager {
    settings(){
        const maxOfPredators = (number) => document.querySelector('.maxOfPredators').textContent = number;
        const minOfPredators = (number) => document.querySelector('.minOfPredators').textContent = number;
        const maxOfPreys = (number) => document.querySelector('.maxOfPreys').textContent = number;
        const minOfPreys = (number) => document.querySelector('.minOfPreys').textContent = number;

        document.getElementById('settings').addEventListener('click', listener);
        document.querySelector('.info').addEventListener('click', listener);
        document.querySelector('.samotyzhki').addEventListener('click', () => {
            numbOfPredators = prompt("numbOfPredators"), numbOfPreys = prompt("numbOfPreys");
            predatorSpeedLimit = prompt("predatorSpeedLimit"), preySpeedLimit = prompt("preySpeedLimit");
            predatorsBirthTime = prompt("predatorsBirthTime"), preyBirthTime = prompt("preyBirthTime");
            predatorsHungerTime = prompt("predatorsHungerTime"), preysHungerTime = prompt("preysHungerTime");
            predatorPopCap = prompt("predatorPopCap"), preyPopCap = prompt("preyPopCap");
            killPreyRadius = prompt("killPreyRadius");
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