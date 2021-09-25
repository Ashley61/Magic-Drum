
var synth = new Nexus.Rack("#synth")
synth.s.on('change',function(v) {
		// v is the value of the button
		const synth = new Tone.Synth().toMaster();
	synth.triggerAttackRelease('C4', '8n');
	Tone.Transport.start();
	      })


var cols=synth.seq.columns;


   synth.seq.size=[400, 200];
   synth.seq.mode='toggle';
   synth.seq.rows=6;
   synth.seq.columns=12;
   synth.seq.resize(1000, 600)


// synth.seq.on('step', (col) => {
//   console.log(col) // [0, 1, 0, 1, 1]
// });

Tone.Transport.scheduleRepeat((time) => {
	synth.seq.next();
// 	const synthsArr = [];

//   for (let i = 0; i < synth.seq.rows; i++) {
  
//     let syn = new Tone.Synth({
//       oscillator: {
//         type: "square8"
//       }
//     }).toDestination();
   
   
//     synthsArr.push(syn);
//   }


	// synth.seq.columns.forEach((state, i) => {
		 
	//   if (state) { 0
	//     this.synths[i].triggerAttackRelease(this.notes[i], '8n', time);
	//   }
	// });
      }, '0.5');




console.clear()




var keys1 = new Tone.Players({
    "A0": "https://res.cloudinary.com/degnified/video/upload/v1567497320/guitarC4_skynoz.[mp3|ogg]",
    "C#": "https://res.cloudinary.com/degnified/video/upload/v1567497320/guitarC3_wg8daf.[mp3|ogg]",
    "E": "https://res.cloudinary.com/degnified/video/upload/v1567497320/pianoC6_xppqwu.[mp3|ogg]",
    "F#": "https://res.cloudinary.com/degnified/video/upload/v1567497319/pianoC4_ns8e2d.[mp3|ogg]",

}, {
    "volume": -10,
    "fadeOut": "64n",
})

keys1.toDestination();
var noteNames1 = ["F#", "E", "C#", "A0"];
var loop1 =  new Tone.Sequence(
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

 

// synth.s.on('change', function (v) {
//     if (v == 0) {
// 	Tone.Transport.start()
// 	//$('#playState').text('Pause')
//     } else if (v == -1) {
// 	Tone.Transport.stop()
// 	$('#playState').text('Play')
//     }
// })
