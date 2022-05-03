const improvCheckpoint = 'https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/drum_kit_rnn';
const improvRNN = new mm.MusicRNN(improvCheckpoint)
improvRNN.initialize();

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
var predictSeq={};
var notes_array = [];
 var notesStore=[];

const activeSynths = {};



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
 
        
// const startProgram = async () => {
//     try {
//         await improvRNN.initialize()
//        // let improvisedMelody = await improvRNN.continueSequence(quantizedSequence, 60, 1.1, ['Bm', 'Bbm', 'Gb7', 'F7', 'Ab', 'Ab7', 'G7', 'Gb7', 'F7', 'Bb7', 'Eb7', 'AM7'])
    
//         const playOriginalMelody = () => {
//           // sequence.notes.forEach(note => {
//           // //  Note.fromMidi(note.pitch)
//           //   synth.triggerAttackRelease(Note.fromMidi(note.pitch), note.endTime - note.startTime, note.startTime)
//           // })
//           player.start(sequence);

//         }
    
//         const playGeneratedMelody = () => {
//           // improvisedMelody.notes.forEach(note => {
//           //   synth.triggerAttackRelease(Note.fromMidi(note.pitch), note.quantizedEndStep - note.quantizedStartStep, note.quantizedStartStep)
//           // })
//           const qns = mm.sequences.quantizeNoteSequence(sequence, 4);
//  generateSequence= improvRNN
//  .continueSequence(qns, 20, 1.5);
//   //         improvRNN
//   // .continueSequence(qns, 20, 1.5)

//   generateSequence
//   .then((sample) => rnnPlayer.start(sample));
//         }
    
//     //  autoButton.on('change', function (v){
//     //     // playOriginalMelody();
//     //        playGeneratedMelody();
//     //     })
//       } catch (error) {
//         console.error(error)
//       }
// }



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


//startProgram()

console.clear()
        var radiobutton = new Nexus.RadioButton('#switch', {
            'size': [70, 70],
            'numberOfButtons': 1,
            'active': -1
        })

        var exampleButton = new Nexus.RadioButton('#examplePredict', {
            'size': [70, 70],
            'numberOfButtons': 1,
            'active': -1
        })
        var select = new Nexus.Select('#example',{
            'size': [250,40],
            'options': ['Choose the example','TWINKLE_TWINKLE','MerryChristmas']
          })
        
          var clean = new Nexus.RadioButton('#clean', {
            'size': [70, 70],
            'numberOfButtons': 1,
            'active': -1
        })
        


        var slider = new Nexus.Slider('#tempo',{
            'size': [45,120],
            'mode': 'relative',  // 'relative' or 'absolute'
            'min': 70,
            'max': 250,
            'step': 1,
            'value': 128
        })

        var seqVolume = new Nexus.Dial('#seqVolume',{
          'size': [75,75],
          'interaction': 'radial', // "radial", "vertical", or "horizontal"
          'mode': 'relative', // "absolute" or "relative"
          'min': -10,
          'max': 30,
          'step': 0,
          'value': 10
          
        })

        var noteNames1 = ["Eb1", "F#1", "Bb1", "C1"];
        var keys1 = new Tone.Players({
            "Eb1": "toolkit/clap.mp3",
            "F#1": "toolkit/hihat-closed.mp3",
            "Bb1": "toolkit/hihat-open.mp3",
            "C1": "toolkit/C4.mp3",

        }, {
            "volume": -10,
    //        "fadeOut": "64n",
        })
        keys1.toMaster();
 
        
        var lowNote=72;
        var highNote=84;

        var pianoW=window.screen.width *0.85*0.55;
        var pianoH=window.screen.height *0.8*0.38;
        var piano = new Nexus.Piano('#pinao',{
            'size': [pianoW,pianoH],
            'mode': 'button',  // 'button', 'toggle', or 'impulse'
            'lowNote': lowNote,
            'highNote': highNote
        })

        const keyMapper = {
            a: 0,
            w: 1,
            s: 2,
            e: 3,
            d: 4,
            f: 5,
            t: 6,
            g: 7,
            y: 8,
            h: 9,
            u: 10,
            j: 11,
            k: 12,
          }


          document.addEventListener('keydown', (event) => {
            const keyIndex = keyMapper[event.key];
            keyIndex !== undefined && !piano.keys[keyIndex]._state.state ? 
            piano.toggleIndex(keyIndex, true) : null;
          });
          
          document.addEventListener('keyup', (event) => {
            const keyIndex = keyMapper[event.key];
            keyIndex !== undefined && piano.keys[keyIndex]._state.state ? 
            piano.toggleIndex(keyIndex, false) : null;
          });

        //   const synth = new Tone.Synth().toMaster();

        
      //     const midi = new Midi()
  
            //  var meter = new Nexus.Meter('#visual', {
            //   size: [120,200]
            // })


            // var oscilloscope = new Nexus.Oscilloscope('#visual',{
            //   'size': [300,150]
            // })
           

        piano.on('change', (k) => {
            if (k.state) {
                
               if (!(activeSynths[k.note] in activeSynths) ) {
                 activeSynths[k.note] = new Tone.Synth().toMaster();
          
               }
               activeSynths[k.note].volume.value=-10;
             activeSynths[k.note].triggerAttack(piano_MIDI_MAP[k.note]);  
          // meter.connect(Tone.master,2);
            //  document.write(Tone.time.toMilliseconds ( ) )
            }
            else {
              activeSynths[k.note].triggerRelease();
            }})



            
 
            
            
//record the melody------------------------------------------------------------------
        // var countTimeNum=0;
        var note_index = notes_array.length; 
        var loop1 = new Tone.Sequence(
            function (time, col) {
           
                var column = document.getElementById("seq1").currentColumn;
                

                column.forEach(function (val, i) {
                    if (val) {
                      
                        var vel = 127;
                        keys1.get(noteNames1[i]).volume.value=seqVolume.value;
                        keys1.get(noteNames1[i]).start(time, 0, "16n", 0, vel);
                        
                        
                        //i: have clicked, need to store
                      
	
				notes_array[note_index] = {};
				notes_array[note_index]["pitch"] = strToMidi[noteNames1[i]];
       
     //   TODO use i to caculate time? i is the row but we need column

        if(col==0)
        {
        notes_array[note_index]["startTime"] =0;
        notes_array[note_index]["endTime"] = 0.5;  
    }
    else if(col<16){
				notes_array[note_index]["startTime"] = col*0.5;
        
				notes_array[note_index]["endTime"] = notes_array[note_index]["startTime"]+0.5;
                ;}
   notes_array[note_index]["isDrum"] = true
				note_index = note_index + 1;
      
                    }
             
                });
                Tone.Draw.schedule(function () {
                    document.getElementById("seq1").setAttribute("highlight",
                        col);
                }, time);
            }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n").start(0);

                // countTimeNum=countTimeNum+0.5;
              
                predictSeq["notes"]=notes_array;
                predictSeq["totalTime"]=8;
 


//------------------------------------------------------------------------------

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



                        notes_array[note_index] = {};
                        notes_array[note_index]["pitch"] = strToMidi[noteNames2[i]];
                       
                     //   TODO use i to caculate time? i is the row but we need column
                
                        if(col==0)
                        {
                        notes_array[note_index]["startTime"] =0;
                        notes_array[note_index]["endTime"] = 0.5;  
                    }
                    else if(col<16){
                        notes_array[note_index]["startTime"] = col*0.5;
                        
                        notes_array[note_index]["endTime"] = notes_array[note_index]["startTime"]+0.5;
                                ;}
                   notes_array[note_index]["isDrum"] = true
                        note_index = note_index + 1;
                      
                                    }
                             
                                });
                Tone.Draw.schedule(function () {
                    document.getElementById("seq2").setAttribute("highlight",
                        col);
                }, time);
            }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n").start(0);

            // countTimeNum=countTimeNum+0.5;
              
            predictSeq["notes"]=notes_array;
            predictSeq["totalTime"]=8;

//--------------------------------------------------------------------------------------------------------------------


//The predict melody parameters setting
predict_stepsPerQuarter=4
predict_stepsNumber=60

//predict the record melody-----------------------------------------------------------------
            var test = new Nexus.RadioButton('#test', {
              'size': [70, 70],
              'numberOfButtons': 1,
              'active': -1
                })


                var curNotes;
                var continueSeq;
                var temp;

                //TODO: the predict function. maybe sth wrong with the predictSeq (time is wrong)
                    autoButton.on('change', function (v) {
                  if (v == 0) {
                                   

                  const qns = mm.sequences.quantizeNoteSequence(predictSeq, predict_stepsPerQuarter);
                  continueSeq=improvRNN
                  .continueSequence(qns, predict_stepsNumber, 1.5);
                 //continueSequence返回的到底是什么？
                  //sample是最后返回的sequence。怎样获取sample？
                  
                  // continueSeq.then((sample) => rnnPlayer.start(sample));
                
                  //continueSeq.then((sample) =>document.write(sample.notes[0].pitch));
                
                //    document.write(continueSeq);
                    continueSeq.then((sample)=> {
                  //   for(var t=0;t<sample.notes.length;t++){
                    
                  //   } 
                  curNotes=sample;
                  rnnPlayer.start(curNotes)
                })
                
                } 
                  else if (v == -1) {  
                    rnnPlayer.stop();
                  
                  }
                    })

                    
                test.on('change', function (v) {
                 
                  if (v == 0 ) {
           
                       var testPlayer=new mm.Player();
     
                       const osc = new Tone.Oscillator().toDestination();
                       // repeated event every 8th note
                       Tone.Transport.scheduleRepeat((time) => {
                         // use the callback time to schedule events
                         osc.start(time).stop(time + 0.1);
                       }, "8n");
                       // transport must be started before it starts invoking events
                       Tone.Transport.start();
          //TODO: How to loop?
                      //testPlayer.setTempo(80);
                      testPlayer.start(curNotes);
                      
             
                       
                    
                  }
                  else{
                    testPlayer.stop(); 
                  }
                })





//---------------------------------------------------------------------------

/**
 * 
 * test the model is ok. The test sequence is the given example------------------------------------------------------
 */
                var example=TWINKLE_TWINKLE;
                select.on('change',function(v) {
                    if(v.value=="TWINKLE_TWINKLE"){

              
                        player.start(TWINKLE_TWINKLE);
                        example=TWINKLE_TWINKLE
                    };
                           
                  })
                     
                  var curNotesEg;
                  var continueSeqEg;
                  var cur={};
                      exampleButton.on('change', function (v) {
                      if (v == 0) {
                  
                    const qns = mm.sequences.quantizeNoteSequence(example, 4);
                    continueSeqEg=improvRNN
                    .continueSequence(qns, 20, 1.5);
            
                    
                
                      continueSeqEg.then((sample)=> { 
                      curNotesEg=sample; 
                      cur.notes=curNotesEg.notes;
                      cur.totalTime=8;
                      for(var t=0;t<curNotesEg.notes.length;t++)
                {
                    cur.notes[t].isDrum=true;
                }
                  })

                  continueSeqEg.then((curNotesEg) => rnnPlayer.start(curNotesEg));
                  } 
                      else if (v == -1) {  
                          player.stop();
                      
                      }
                    
                      })

                      
//------------------------------------------------------------------------------------------------------------






        radiobutton.on('change', function (v) {
            if (v == 0) {
                Tone.Transport.start();
                $('#playState').text('Pause') ;
               
            } else if (v == -1) {
                Tone.Transport.stop()
                $('#playState').text('Play')
            }
        })



        slider.on('change', function (v) {
            Tone.Transport.bpm.value = v;
            $('#bpmValue').text('BPM:' + v)
        })




//------------------------------------------------------------------------------------------
//clean the sequence
clean.on('change', function (v) {
  if (v == 0) {

predictSeq={};
//document.getElementById("seq1").setAttribute("style", "background-color:blue;");
//Tone.Transport.clear()   
  }
else
{}})
//-----------------------------------------------------------------------------------------------

        