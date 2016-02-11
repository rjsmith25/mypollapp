var mongoose = require('mongoose');
var Poll = mongoose.model('Poll');
var User = mongoose.model('User');

function sendJsonResponse(res,status,content){
	res.status(status);
	res.json(content);
}

function getUser(req,res,callback){
	if (req.payload.email) {
    User
      .findOne({ email : req.payload.email })
      .exec(function(err, user) {
        if (!user) {
          sendJsonResponse(res, 404, {
            "message": "User not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJsonResponse(res, 404, err);
          return;
        }
        console.log(user);
        callback(req, res, user._id);
      });

  } else {
    sendJsonResponse(res, 404, {
      "message": "User not found"
    });
    return;
  }

}


// get list of polls
function getPolls(req,res){
	Poll.find({},function(err,poll){
		if(err){
			sendJsonResponse(res,404,err);
		} else {
			sendJsonResponse(res,200,poll);
		}
	})
}

//get polls by user id
function getPollsByUserId(req,res){
	if(req.params && req.params.userid){
		Poll.find({uid:req.params.userid},function(err,poll){
		if(err){
			sendJsonResponse(res,404,err);
		} else {
			sendJsonResponse(res,200,poll);
		}
		})
	} else {
		sendJsonResponse(res,404,{
			"message":"Not found, userid require"
		 })
	}
}

// get a specific poll
function getOnePoll(req,res){
	if(req.params && req.params.pollid){
		Poll
			.findById(req.params.pollid)
			.exec(function(err,poll){
				if(err){
					sendJsonResponse(res,400,err);
					return;
				} else if(!poll){
					sendJsonResponse(res,404,{
						"message":"pollid not found"
					})
					return;
				}else{
					sendJsonResponse(res,200,poll);
				}
			})
	} else {
		sendJsonResponse(res,404,{
			"message":"Not found, pollid require"
		 })
	}
}

// create a new poll
function createPoll(req,res){
	getUser(req,res,function(req,res,userid){
		Poll.create({
			question : req.body.question,
			choices : req.body.choices,
			uid : userid
		},function(err,poll){
			if(err){
				sendJsonResponse(res,400,err);
			}else{
				sendJsonResponse(res,201,poll);
			}
		})
	})
}

// delete a specific poll
function deletePoll(req,res){
	if(req.params && req.params.pollid){
		Poll
			.findByIdAndRemove(req.params.pollid)
			.exec(function(err,poll){
				if(err){
					sendJsonResponse(res,404,err);
				}else {
					sendJsonResponse(res,204,null);
				}
			})
	}else{
		sendJsonResponse(res,404,{
			"message" : "Not found, pollid required"
		});
	}
}

// create new poll choice
function createPollChoice(req,res){
	if(req.params && req.params.pollid){
		Poll
			.findById(req.params.pollid)
			.select('choices')
			.exec(function(err,poll){
				var newChoice;
				if(err){
					sendJsonResponse(res,400,err);
					return;
				}else if(!poll){
					sendJsonResponse(res,404,{
						"message" : "pollid not found"
					})
					return;
				}else{
					poll.choices.push({
						answer:req.body.answer,
						votes:req.body.votes
					})

					poll.save(function(err,poll){
						if(err){
							sendJsonResponse(res,400,err);
						}else{
							newChoice = poll.choices[poll.choices.length - 1];
							sendJsonResponse(res,201,newChoice);
						}
					})
				}
			})
	}else{
		sendJsonResponse(res,404,{
			"message" : "Not found, pollid required"
		})
	}
}


function deletePollChoice(req,res){
	if(req.params && req.params.pollid && req.params.choiceid){
		Poll
			.findById(req.params.pollid)
			.select('choices')
			.exec(function(err,poll){
				if(err){
					sendJsonResponse(res,404,err);
					return;
				}else if(!poll){
					sendJsonResponse(res,404,{
						"message" : "Not found, pollid"
					});
					return;
				}

				if(poll.choices && poll.choices.length > 0){
					if(!poll.choices.id(req.params.choiceid)){
						sendJsonResponse(res,404,{
							"message" : "choiceid not found"
						})
					}else{
						poll.choices.id(req.params.choiceid).remove();
						poll.save(function(err,poll){
							if(err){
								sendJsonResponse(res,404,err);
							}else{
								sendJsonResponse(res,204,null);
							}
						})
					}
				}
			})
	}else{
		sendJsonResponse(res,404,{
			"message" : "Not found, pollid and choiceid required"
		})
	}
}

function updatePollVote(req, res) {
  if (!req.params.pollid || !req.params.choiceid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, pollid and choiceid are both required"
    });
    return;
  }
  Poll
    .findById(req.params.pollid)
    .select('choices')
    .exec(
      function(err, poll) {
        var choice;
        if (!poll) {
          sendJsonResponse(res, 404, {
            "message": "pollid not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        if (poll.choices && poll.choices.length > 0) {
          choice = poll.choices.id(req.params.choiceid);
          if (!choice) {
            sendJsonResponse(res, 404, {
              "message": "choiceid not found"
            });
          } else {
            choice.votes = choice.votes + 1;
            poll.save(function(err, poll) {
              if (err) {
                sendJsonResponse(res, 404, err);
              } else {
                sendJsonResponse(res, 200, choice);
              }
            });
          }
        } else {
          sendJsonResponse(res, 404, {
            "message": "No choice to update"
          });
        }
      }
  );
};

module.exports = {
	getPolls:getPolls,
	getOnePoll:getOnePoll,
	getPollsByUserId:getPollsByUserId,
	createPoll:createPoll,
	deletePoll:deletePoll,
	createPollChoice:createPollChoice,
	deletePollChoice:deletePollChoice,
	updatePollVote:updatePollVote
}
