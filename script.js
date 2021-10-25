const improvCheckpoint = 'https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/chord_pitches_improv'
const improvRNN = new mm.MusicRNN(improvCheckpoint)

//small draft to try the drumRNN
const { midi, Note } = Tonal  
const synth = new Tone.Synth().toMaster()
const sequence = {
  ticksPerQuarter: 220,
  totalTime: 58,
  timeSignatures: [
    {
      time: 0,
      numerator: 4,
      denominator: 4
    }
  ],
  tempos: [
    {
      time: 0,
      qpm: 120
    }
  ],
  notes: [
    { pitch: midi('F4'), startTime: 0, endTime: 2},
    { pitch: midi('Ab4'), startTime: 2, endTime: 4 },
    { pitch: midi('C5'), startTime: 1, endTime: 3 },
    { pitch: midi('Eb5'), startTime: 1.5, endTime: 4},
    { pitch: midi('Gb5'), startTime: 2.5, endTime: 3.5 }

  
  ]
}

const quantizedSequence = mm.sequences.quantizeNoteSequence(sequence, 1)

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
                    }
                });
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

       

        