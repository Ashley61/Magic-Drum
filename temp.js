const improvCheckpoint = 'https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/chord_pitches_improv'
 const improvRNN = new mm.MusicRNN(improvCheckpoint)
 TWINKLE_TWINKLE = {
	notes: [
	  {pitch: 60, startTime: 0.0, endTime: 0.5},
	  {pitch: 60, startTime: 0.5, endTime: 1.0},
	  {pitch: 67, startTime: 1.0, endTime: 1.5},
	  {pitch: 67, startTime: 1.5, endTime: 2.0},
	  {pitch: 69, startTime: 2.0, endTime: 2.5},
	  {pitch: 69, startTime: 2.5, endTime: 3.0},
	  {pitch: 67, startTime: 3.0, endTime: 4.0},
	  {pitch: 65, startTime: 4.0, endTime: 4.5},
	  {pitch: 65, startTime: 4.5, endTime: 5.0},
	  {pitch: 64, startTime: 5.0, endTime: 5.5},
	  {pitch: 64, startTime: 5.5, endTime: 6.0},
	  {pitch: 62, startTime: 6.0, endTime: 6.5},
	  {pitch: 62, startTime: 6.5, endTime: 7.0},
	  {pitch: 60, startTime: 7.0, endTime: 8.0},  
	],
	totalTime: 8
      };

      DRUMS = {
	notes: [
	  { pitch: 36, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
	//   { pitch: 38, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
	//   { pitch: 42, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
	//   { pitch: 46, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
	//   { pitch: 42, quantizedStartStep: 2, quantizedEndStep: 3, isDrum: true },
	//   { pitch: 42, quantizedStartStep: 3, quantizedEndStep: 4, isDrum: true },
	//   { pitch: 42, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
	//   { pitch: 50, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
	//   { pitch: 36, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
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

    radiobutton.on('change', function (v) {
	if (v == 0) {
	player.start(DRUMS);
	//     Tone.Transport.start()
	//     $('#playState').text('Pause')
	} else if (v == -1) {  
		player.stop();
	//     Tone.Transport.stop()
	//     $('#playState').text('Play')
	}
    })

    config = {
	noteHeight: 6,
	pixelsPerTimeStep: 30,  // like a note width
	noteSpacing: 1,
	noteRGB: '8, 41, 64',
	activeNoteRGB: '240, 84, 119',
      }
      // Don't edit this line unless you want to break things. :)
      visualizer = new mm.Visualizer(TWINKLE_TWINKLE, document.getElementById('canvas'), config);



      
//  music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
//  improvRNN.initialize();
// // ​
// // // Create a player to play the sequence we'll get from the model.
//  rnnPlayer = new mm.Player();
// // ​rnn_steps = 20;
//  //rnn_temperature = 1.5;
// // function play() {
// //   if (rnnPlayer.isPlaying()) {
// //     rnnPlayer.stop();
// //     return;
// //   }
      
// //   // The model expects a quantized sequence, and ours was unquantized:
//   const qns = mm.sequences.quantizeNoteSequence(DRUMS, 4);
//   improvRNN
//   .continueSequence(qns, 20, 1.5)
//   .then((sample) => rnnPlayer.start(sample));


   