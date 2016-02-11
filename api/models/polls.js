var mongoose = require('mongoose');

var choiceSchema = new mongoose.Schema ({
	answer:String,
	votes:Number

})

var pollSchema = new mongoose.Schema ({
	question:{
		type:String,
		required:true
	},
	choices:[choiceSchema],
	uid:String
});

mongoose.model('Poll',pollSchema);