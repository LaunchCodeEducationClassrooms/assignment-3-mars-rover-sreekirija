const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
   it("constructor sets position and default values for mode and generatorWatts", function() {
     let rover=new Rover(87382098);
     expect(rover.position).toEqual(87382098);
     expect(rover.mode).toEqual('NORMAL');
     expect(rover.generatorWatts).toEqual(110);
    });

    it("response returned by receiveMessage contains name of message", function() {
     let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
     let message = new Message('message name check', commands);
     let rover = new Rover(98382);    // Passes 98382 as the rover's position.
     let response = rover.receiveMessage(message);
     expect(response.message).toEqual('message name check');
     });


  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
     let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
     let message = new Message('Test message with two commands', commands);
     let rover = new Rover(98382);    // Passes 98382 as the rover's position.
     let response = rover.receiveMessage(message);
     expect(response.results.length).toEqual(2);
     });

     it("responds correctly to status check command", function() {
        let commands = [new Command('STATUS_CHECK')];
        let message = new Message('Status Check message', commands);
        let rover = new Rover(98382);    // Passes 98382 as the rover's position.
        let response = rover.receiveMessage(message);
         expect(response.results[0].roverStatus.position).toEqual(98382);
         expect(response.results[0].roverStatus.mode).toEqual('NORMAL');
         expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
     });

      it("responds correctly to mode change command", function() {
        let commands1 = [new Command('MODE_CHANGE', 'LOW_POWER')];
        let commands2 = [new Command('MODE_CHANGE', 'NORMAL')];
        let message1 = new Message('Mode change check', commands1);
        let message2 = new Message('Mode change check', commands2);
        let rover = new Rover(98382);    // Passes 98382 as the rover's position.
        let response1 = rover.receiveMessage(message1);
        expect(response1.results[0].completed).toEqual(true); // to check 'LOW_POWER' mode
        let response2 = rover.receiveMessage(message2);
        expect(response2.results[0].completed).toEqual(true);//// to check 'NORMAL' mode  
      });

      it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
        let commands2 = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 123456)];
        let message2 = new Message('move in low power mode', commands2);
        let rover2 = new Rover(98382);      // Passes 98382 as the rover's position.
        let response2 = rover2.receiveMessage(message2);
        expect(response2.results[1].completed).toEqual(false); 
      });


      it("responds with position for move command", function(){
        let commands2 = [new Command('MOVE', 12345)];
        let message2 = new Message('rover position to move', commands2);
        let rover2 = new Rover(12345);      // Passes 98382 as the rover's position.
        let response2 = rover2.receiveMessage(message2);
        expect(rover2.position).toEqual(12345);
      });
      
});




