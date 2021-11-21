const improvCheckpoint = 'https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/chord_pitches_improv'
 const improvRNN = new mm.MusicRNN(improvCheckpoint)



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


 const DRUM_CLASSES = [
    'Kick',
    'Snare',
    'Hi-hat closed',
    'Hi-hat open',
    'Tom low',
    'Tom mid',
    'Tom high',
    'Clap',
    'Rim'];

let midiDrums = [36, 38, 42, 46, 41, 43, 45, 49, 51];

let reverseMidiMapping = new Map([
    [36, 0],
    [35, 0],
    [38, 1],
    [27, 1],
    [28, 1],
    [31, 1],
    [32, 1],
    [33, 1],
    [34, 1],
    [37, 1],
    [39, 1],
    [40, 1],
    [56, 1],
    [65, 1],
    [66, 1],
    [75, 1],
    [85, 1],
    [42, 2],
    [44, 2],
    [54, 2],
    [68, 2],
    [69, 2],
    [70, 2],
    [71, 2],
    [73, 2],
    [78, 2],
    [80, 2],
    [46, 3],
    [67, 3],
    [72, 3],
    [74, 3],
    [79, 3],
    [81, 3],
    [45, 4],
    [29, 4],
    [41, 4],
    [61, 4],
    [64, 4],
    [84, 4],
    [48, 5],
    [47, 5],
    [60, 5],
    [63, 5],
    [77, 5],
    [86, 5],
    [87, 5],
    [50, 6],
    [30, 6],
    [43, 6],
    [62, 6],
    [76, 6],
    [83, 6],
    [49, 7],
    [55, 7],
    [57, 7],
    [58, 7],
    [51, 8],
    [52, 8],
    [53, 8],
    [59, 8],
    [82, 8]]);

  
    function getStepVelocity(step) {
        if (step % 4 === 0) {
          return 'high';
        } else if (step % 2 === 0) {
          return 'med';
        } else {
          return 'low';
        }
      }
      
      
//small draft to try the drumRNN
const { midi, Note } = Tonal  
const synth = new Tone.Synth().toMaster()
const sequence = {
  // ticksPerQuarter: 220,
  // totalTime: 58,
  // timeSignatures: [
  //   {
  //     time: 0,
  //     numerator: 4,
  //     denominator: 4
  //   }
  // ],
  // tempos: [
  //   {
  //     time: 0,
  //     qpm: 120
  //   }
  // ],
  notes: [
  //{ pitch: 74, startTime: 0, endTime: 1 }
  { pitch: 36, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
  { pitch: 38, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
  { pitch: 42, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
  { pitch: 46, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
  { pitch: 42, quantizedStartStep: 2, quantizedEndStep: 3, isDrum: true },
  { pitch: 42, quantizedStartStep: 3, quantizedEndStep: 4, isDrum: true },
  { pitch: 42, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
  
  ],
  quantizationInfo: {stepsPerQuarter: 4},
  tempos: [{time: 0, qpm: 120}],
  totalQuantizedSteps: 11
}

const quantizedSequence = mm.sequences.quantizeNoteSequence(sequence, 4);

        var autoButton = new Nexus.RadioButton('#auto', {
            'size': [70, 70],
            'numberOfButtons': 1,
            'active': -1
        }) 
        
const startProgram = async () => {
    try {
        await improvRNN.initialize()
        let improvisedMelody = await improvRNN.continueSequence(quantizedSequence, 60, 1.1, ['Bm', 'Bbm', 'Gb7', 'F7', 'Ab', 'Ab7', 'G7', 'Gb7', 'F7', 'Bb7', 'Eb7', 'AM7'])
    
        const playOriginalMelody = () => {
          sequence.notes.forEach(note => {
            synth.triggerAttackRelease(Note.fromMidi(note.pitch), note.endTime - note.startTime, note.startTime)
          })
        }
    
        const playGeneratedMelody = () => {
          improvisedMelody.notes.forEach(note => {
            synth.triggerAttackRelease(Note.fromMidi(note.pitch), note.quantizedEndStep - note.quantizedStartStep, note.quantizedStartStep)
          })
        }
    
     autoButton.on('change', function (v){
         playOriginalMelody();
        //   playGeneratedMelody();
        })
      } catch (error) {
        console.error(error)
      }
}


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

        var noteNames1 = ["C#3", "F#2", "A#2", "C2"];
        var keys1 = new Tone.Players({
            "C#3": "toolkit/clap.mp3",
            "F#2": "toolkit/hihat-closed.mp3",
            "A#2": "toolkit/hihat-open.mp3",
            "C2": "toolkit/kick.mp3",

        }, {
            "volume": -10,
    //        "fadeOut": "64n",
        })
        keys1.toMaster();
        

        
        var loop1 = new Tone.Sequence(
            function (time, col) {
              
                var column = document.getElementById("seq1").currentColumn;
                column.forEach(function (val, i) {
                    if (val) {
                        var vel = 127;
                        keys1.get(noteNames1[i]).start(time, 0, "16n", 0, vel);
                        //i: have clicked, need to store
                    }
                });

                //versiualize
                Tone.Draw.schedule(function () {
                    document.getElementById("seq1").setAttribute("highlight",
                        col);
                }, time);
            }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n").start(0);
   


        var keys2 = new Tone.Players({
            "A1": "toolKit/ride.mp3",
            "C#4": "toolKit/snare.mp3",
            "E2": "toolKit/tom-high.mp3",
            "F#2": "toolKit/tom-low.mp3",
        }, {
            "volume": -10,
            "fadeOut": "64n",
        })
        keys2.toMaster();
        var noteNames2 = ["F#2", "E2", "C#4", "A1"];
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
            "F#3": "toolKit/tom-mid.mp3",
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

       

        