var midiDrums = [39,42,46,36,51,38,50,45,48];

// convert the midi value to the note name (for pinao)
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

//convert the midi value to note name
var synthMap = {
	
	"66" : "C1",
	 "38" : "D1",
	"39" : "Eb1",
	"42" : "F#1",
	"47" : "B1",
	"46" : "Bb1",
	"48" : "C2",
	"51": "Eb2",
	"43":"G1",	
}


// convert the note name to the midi value
var strToMidi={

	"G1":"43",
	"C1":"66" ,
	  "D1":"38", 
	 "Eb1":"39" ,
	 "F#1":"42" ,
	 "A1":"75" ,
	"Bb1":"46" ,
	 "C2":"48" ,
	 "D2":"80", 
	 "Eb2": "51",
	 "B1":"47",
}

//an example notesequence
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
