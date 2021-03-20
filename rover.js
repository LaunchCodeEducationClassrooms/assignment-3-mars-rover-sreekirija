class Rover {
   // Write code here!
  constructor(position){
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = 110;
  }
    
  receiveMessage(message) {
  
    let commands = message.commands;
    let response = {
    message: message.name,
    results: []
    };

    for(let i=0;i<commands.length;i++){
      if(commands[i].commandType === 'MOVE') {
        if(this.mode === 'LOW_POWER'){
          response.results.push({completed: false});
        } else {
            this.position=commands[i].value;
            response.results.push({completed: true});
          }
      } else if(commands[i].commandType === 'STATUS_CHECK') {
          response.results.push({
            completed: true, 
            roverStatus: { 
            mode: this.mode, 
            generatorWatts: this.generatorWatts, 
            position: this.position
            }
          });
        } else if (commands[i].commandType === 'MODE_CHANGE') {
            this.mode = commands[i].value;
            response.results.push({completed: true});
          }
    } 

  return response;
  }
  
}




module.exports = Rover;

 