const improvCheckpoint = 'https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn';
 const improvRNN = new mm.MusicRNN(improvCheckpoint)

 //improvRNN.initialize();
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
player = new mm.Player();
var generateSequence;
var predictSeq=[];
 var notes_array = [];
/**
 * perhaps:
 * 1.midiDrums=[,,,]
 * 2.temperature and patternLength
 * 3.reverseMIDIMap??
 * 4.fromNoteSequence()
 * 5.toNoteSequence()
 * 6.playPattern()
 * 
 */


//  const DRUM_CLASSES = [
//     'Kick',
//     'Snare',
//     'Hi-hat closed',
//     'Hi-hat open',
//     'Tom low',
//     'Tom mid',
//     'Tom high',
//     'Clap',
//     'Rim'];


  
//     function getStepVelocity(step) {
//         if (step % 4 === 0) {
//           return 'high';
//         } else if (step % 2 === 0) {
//           return 'med';
//         } else {
//           return 'low';
//         }
//       }
      
      
// //small draft to try the drumRNN
// const { midi, Note } = Tonal  
// const synth = new Tone.Synth().toMaster()
const sequence = {
 
  notes: [
    {pitch: 60, startTime: 0.0, endTime: 0.5, isDrum:true},
	  {pitch: 60, startTime: 0.5, endTime: 1.0, isDrum:true},
	  {pitch: 67, startTime: 1.0, endTime: 1.5, isDrum:true},
	  {pitch: 67, startTime: 1.5, endTime: 2.0, isDrum:true},
	  {pitch: 69, startTime: 2.0, endTime: 2.5, isDrum:true},
	  {pitch: 69, startTime: 2.5, endTime: 3.0, isDrum:true},
	  {pitch: 67, startTime: 3.0, endTime: 4.0, isDrum:true},
	  {pitch: 65, startTime: 4.0, endTime: 4.5, isDrum:true},
  ],
 totalTime:8
};

//const quantizedSequence = mm.sequences.quantizeNoteSequence(sequence, 4);

        var autoButton = new Nexus.RadioButton('#auto', {
            'size': [70, 70],
            'numberOfButtons': 1,
            'active': -1
        }) 
 
        
const startProgram = async () => {
    try {
        await improvRNN.initialize()
       // let improvisedMelody = await improvRNN.continueSequence(quantizedSequence, 60, 1.1, ['Bm', 'Bbm', 'Gb7', 'F7', 'Ab', 'Ab7', 'G7', 'Gb7', 'F7', 'Bb7', 'Eb7', 'AM7'])
    
        const playOriginalMelody = () => {
          // sequence.notes.forEach(note => {
          // //  Note.fromMidi(note.pitch)
          //   synth.triggerAttackRelease(Note.fromMidi(note.pitch), note.endTime - note.startTime, note.startTime)
          // })
          player.start(sequence);

        }
    
        const playGeneratedMelody = () => {
          // improvisedMelody.notes.forEach(note => {
          //   synth.triggerAttackRelease(Note.fromMidi(note.pitch), note.quantizedEndStep - note.quantizedStartStep, note.quantizedStartStep)
          // })
          const qns = mm.sequences.quantizeNoteSequence(sequence, 4);
 generateSequence= improvRNN
 .continueSequence(qns, 20, 1.5);
  //         improvRNN
  // .continueSequence(qns, 20, 1.5)

  generateSequence
  .then((sample) => rnnPlayer.start(sample));
        }
    
     autoButton.on('change', function (v){
        // playOriginalMelody();
           playGeneratedMelody();
        })
      } catch (error) {
        console.error(error)
      }
}



// function drum_to_note_sequence(quantize_tensor) {
// 	var notes_array = [];
// 	var note_index = 0;
// 	//for (var i = 0; i < quantize_tensor.length; i++) {
// 		var notes = quantize_tensor.notes;
// 		if(notes.length > 0) {
// 			for (var j = 0; j < notes.length; j++) {
// 				notes_array[note_index] = {};
// 				notes_array[note_index]["pitch"] = quantize_tensor.notes[j].pitch;
// 				notes_array[note_index]["startTime"] = quantize_tensor.notes[j].startTime;
// 				notes_array[note_index]["endTime"] = quantize_tensor.notes[j].endTime;
//         notes_array[note_index]["isDrum"]=true;
// 				note_index = note_index + 1;
// 			}
// 		}
// //	}
//   return notes_array;
// }


startProgram()

console.clear()
        var radiobutton = new Nexus.RadioButton('#switch', {
            'size': [70, 70],
            'numberOfButtons': 1,
            'active': -1
        })


        var slider = new Nexus.Slider('#tempo',{
            'size': [120,20],
            'mode': 'relative',  // 'relative' or 'absolute'
            'min': 70,
            'max': 250,
            'step': 1,
            'value': 128
        })

        var noteNames1 = ["Eb1", "F#2", "Bb1", "C1"];
        var keys1 = new Tone.Players({
            "Eb1": "toolkit/clap.mp3",
            "F#2": "toolkit/hihat-closed.mp3",
            "Bb1": "toolkit/hihat-open.mp3",
            "C1": "toolkit/C4.mp3",

        }, {
            "volume": -10,
    //        "fadeOut": "64n",
        })
        keys1.toMaster();
        

        
        var loop1 = new Tone.Sequence(
            function (time, col) {
              	var note_index = 0;  
               
                var column = document.getElementById("seq1").currentColumn;
                column.forEach(function (val, i) {
                    if (val) {
                        var vel = 127;
                        keys1.get(noteNames1[i]).start(time, 0, "16n", 0, vel);
                        //i: have clicked, need to store
                      
	
				notes_array[note_index] = {};
				notes_array[note_index]["pitch"] = strToMidi[noteNames1[i]];
        // TODO use i to caculate time?
				notes_array[note_index]["startTime"] = i * 0.5;
				notes_array[note_index]["endTime"] = (i+1) * 0.5;

				note_index = note_index + 1;
                    }
                });

                //versiualize
                Tone.Draw.schedule(function () {
                    document.getElementById("seq1").setAttribute("highlight",
                        col);
                }, time);
            }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n").start(0);
   
predictSeq.push(notes_array);





        var keys2 = new Tone.Players({
            "Eb2": "toolKit/ride.mp3",
            "D1": "toolKit/snare.mp3",
            "D2": "toolKit/tom-high.mp3",
            "A1": "toolKit/tom-low.mp3",
        }, {
            "volume": -10,
            "fadeOut": "64n",
        })
        keys2.toMaster();
        var noteNames2 = ["Eb2", "D1", "D2", "A1"];
        var loop2 = new Tone.Sequence(
            function (time, col) {
                var column = document.getElementById("seq2").currentColumn;
                column.forEach(function (val, i) {
                    if (val) {
                        var vel = 127;
                        keys2.get(noteNames2[i]).start(time, 0, "16n", 0, vel);
                    }
                });
                Tone.Draw.schedule(function () {
                    document.getElementById("seq2").setAttribute("highlight",
                        col);
                }, time);
            }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n").start(0);





        var keys3 = new Tone.Players({
            "C2": "toolKit/tom-mid.mp3",
            "C#3": "https://res.cloudinary.com/degnified/video/upload/v1567497318/drum_o6byub.[mp3|ogg]",
            "E3": "https://res.cloudinary.com/degnified/video/upload/v1567497318/bass_snjpzv.[mp3|ogg]",
            "A2": "https://res.cloudinary.com/degnified/video/upload/v1567497317/kick_wew9fm.[mp3|ogg]",
        }, {
            "volume": -10,
            "fadeOut": "64n",
        })
        keys3.toMaster();;
        var noteNames3 = ["F#3", "E3", "C#3", "A2"];
        var loop3 = new Tone.Sequence(
            function (time, col) {
                var column = document.getElementById("seq3").currentColumn;
                column.forEach(function (val, i) {
                    if (val) {
                        var vel = 127;
                        keys3.get(noteNames3[i]).start(time, 0, "16n", 0, vel);
                    }
                });
                Tone.Draw.schedule(function () {
                    document.getElementById("seq3").setAttribute("highlight",
                        col);
                }, time);
            }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n").start(0);




        radiobutton.on('change', function (v) {
            if (v == 0) {
                Tone.Transport.start()
                $('#playState').text('Pause')
            } else if (v == -1) {
                Tone.Transport.stop()
                $('#playState').text('Play')
            }
        })



        slider.on('change', function (v) {
            Tone.Transport.bpm.value = v;
            $('#bpmValue').text('BPM : ' + v)
        })

       

        