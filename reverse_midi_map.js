var midiDrums = [39,42,46,36,51,38,50,45,48];

// nums = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71]
// assert.equal(nums.map(note).join(' '), 'C4 Db4 D4 Eb4 E4 F4 Gb4 G4 Ab4 A4 Bb4 B4')

var piano_MIDI_MAP={
	"72" : "C5 ",
	"73" : " Db5",
	"74" : "D5",
	"75" : "Eb5",
	"76" : "E5",
	"77" : "F5",
	"78" : "Gb5",
	"79" : "G5",
	"80" : "Ab5",
	"81" : "A5",
	"82" : "Bb5",
	"83" : "B5",
	"84" : "C6",


}

var synthMap = {
	
	"66" : "C1",
	// "37" : "C#4",
	 "68" : "D1",
	"69" : "Eb1",
	// "40" : "E4",
	// "41" : "F4",
	"72" : "F#1",
	// "43" : "G4",
	// "44" : "G#4",
	"75" : "A1",
	"76" : "Bb1",
	//"47" : "B4",
	"78" : "C2",
	//"49" : "C#5",
	"80" : "D2",
//	"51" : "D#5",
	
}

var strToMidi={


	"C1":"66" ,
	// "37" : "C#4",
	  "D1":"68", 
	 "Eb1":"69" ,
	// "40" : "E4",
	// "41" : "F4",
	 "F#1":"72" ,
	// "43" : "G4",
	// "44" : "G#4",
	 "A1":"75" ,
	"Bb1":"76" ,
	//"47" : "B4",
	 "C2":"78" ,
	//"49" : "C#5",
	 "D2":"80" 

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
        {pitch: 64, startTime: 5.0, endTime: 5.5, isDrum:true},
        {pitch: 64, startTime: 5.5, endTime: 6.0, isDrum:true},
        {pitch: 62, startTime: 6.0, endTime: 6.5, isDrum:true},
        {pitch: 62, startTime: 6.5, endTime: 7.0, isDrum:true},
        {pitch: 60, startTime: 7.0, endTime: 8.0, isDrum:true},  
  
	],
	totalTime: 8
      };
