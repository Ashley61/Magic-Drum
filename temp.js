const improvCheckpoint = 'https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn';
//const improvCheckpoint = 'https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/chord_pitches_improv'
 const improvRNN = new mm.MusicRNN(improvCheckpoint)
 improvRNN.initialize();
// ​
// // Create a player to play the sequence we'll get from the model.
 rnnPlayer = new mm.Player();
// ​rnn_steps = 20;
 //rnn_temperature = 1.5;
function play() {
  if (rnnPlayer.isPlaying()) {
    rnnPlayer.stop();
    return;
  }
}
 TWINKLE_TWINKLE = {
	notes: [
	  {pitch:66, startTime: 0.0, endTime: 0.5, isDrum:true},
	  {pitch: 69, startTime: 0.5, endTime: 1.0, isDrum:true},
	  {pitch: 72, startTime: 1.0, endTime: 1.5, isDrum:true},
	  {pitch: 76, startTime: 1.5, endTime: 2.0, isDrum:true},
	  {pitch: 81, startTime: 2.0, endTime: 2.5, isDrum:true},
	  {pitch: 68, startTime: 2.5, endTime: 3.0, isDrum:true},
	  {pitch: 75, startTime: 3.0, endTime: 4.0, isDrum:true},
	  {pitch: 80, startTime: 4.0, endTime: 4.5, isDrum:true},
	  {pitch: 78, startTime: 4.5, endTime: 5.0, isDrum:true},
	//   {pitch: 64, startTime: 5.0, endTime: 5.5, isDrum:true},
	//   {pitch: 64, startTime: 5.5, endTime: 6.0, isDrum:true},
	//   {pitch: 62, startTime: 6.0, endTime: 6.5, isDrum:true},
	//   {pitch: 62, startTime: 6.5, endTime: 7.0, isDrum:true},
	//   {pitch: 60, startTime: 7.0, endTime: 8.0, isDrum:true},  
	],
	totalTime: 8
      };

      DRUMS = {
	notes: [
		//39,42,46,36,51,38,50,45,48
	  { pitch: 36, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
	   { pitch: 39, quantizedStartStep: 1, quantizedEndStep: 2, isDrum: true },
	   { pitch: 42, quantizedStartStep: 2, quantizedEndStep: 3, isDrum: true },
	   { pitch: 46, quantizedStartStep: 3, quantizedEndStep: 4, isDrum: true },
	   { pitch: 51, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
	   { pitch: 38, quantizedStartStep: 5, quantizedEndStep: 6, isDrum: true },
	   { pitch: 45, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
	   { pitch: 50, quantizedStartStep: 7, quantizedEndStep: 8, isDrum: true },
	   { pitch: 48, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true }
	//   { pitch: 38, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
	//   { pitch: 42, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
	//   { pitch: 45, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
	//   { pitch: 36, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
	//   { pitch: 42, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
	//   { pitch: 46, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
	//   { pitch: 42, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
	//   { pitch: 48, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
	//   { pitch: 50, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
	],
	quantizationInfo: {stepsPerQuarter: 4},
	tempos: [{time: 0, qpm: 120}],
	totalQuantizedSteps: 11
      };
  


 player = new mm.Player();
 
      var radiobutton = new Nexus.RadioButton('#switch', {
	'size': [70, 70],
	'numberOfButtons': 1,
	'active': -1
    })


var autoButton = new Nexus.RadioButton('#auto', {
	'size': [70, 70],
	'numberOfButtons': 1,
	'active': -1
    })

    var test = new Nexus.RadioButton('#test', {
	'size': [70, 70],
	'numberOfButtons': 1,
	'active': -1
    })


    radiobutton.on('change', function (v) {
	if (v == 0) {
	player.start(TWINKLE_TWINKLE);
	//     Tone.Transport.start()
	//     $('#playState').text('Pause')
	} else if (v == -1) {  
		player.stop();
	//     Tone.Transport.stop()
	//     $('#playState').text('Play')
	}
    })
var curNotes;
var continueSeq;
var temp;
    autoButton.on('change', function (v) {
	if (v == 0) {
//	player.start(TWINKLE_TWINKLE);
  const qns = mm.sequences.quantizeNoteSequence(TWINKLE_TWINKLE, 4);
  continueSeq=improvRNN
  .continueSequence(qns, 20, 1.5);
 //continueSequence返回的到底是什么？
  //sample是最后返回的sequence。怎样获取sample？
  continueSeq.then((sample) => rnnPlayer.start(sample));

  //continueSeq.then((sample) =>document.write(sample.notes[0].pitch));

  	//document.write(continueSeq);
	  continueSeq.then((sample)=> {
	//   for(var t=0;t<sample.notes.length;t++){
		
	//   } 
	curNotes=sample;
})

} 
	else if (v == -1) {  
		player.stop();
	
	}
    })


//let the predict sound to drum sound
    test.on('change', function (v) {
	if (v == 0) {
	//	document.write(continueSeq);
      var testPlayer=new mm.Player();
      var cur={};
	//cur.notes=predictSeq.notes;
      cur.notes=curNotes.notes;
      cur.totalTime=8;
      for(var t=0;t<curNotes.notes.length;t++)
{
	cur.notes[t].isDrum=true;
}
      //document.write(cur.notes[0].isDrum);
      testPlayer.start(curNotes);
	}})







   