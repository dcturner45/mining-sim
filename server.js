const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs')
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const port = 80;
const miningRate = 0.001;

const group = {
    txQueue: [],
    amount: 0
};
const single = {
    id: null,
    txQueue: [],
    amount: 0
}


var problemIdCounter = 0;

const ops = ['+', '-', '*'];

function answer(problem) {
    return eval('' + problem.first + problem.op + problem.second);
}

function solvedProblemCorrectly(problem, answer) {
    return problem.first >= 0 
        && problem.first < 10 
        && problem.second >= 0 
        && problem.second < 10 
        && ops.indexOf(problem.op) >= 0
        && answer == eval('' + problem.first + problem.op + problem.second);
}

function getNewProblem() {
    const problem = {};
    problem.id = problemIdCounter++;
    problem.first = Math.floor(Math.random() * 10);
    problem.second = Math.floor(Math.random() * 10);
    problem.op = ops[Math.floor(Math.random() * ops.length)];
    return problem;
}

app.get('/stats', function(req, res) {
    res.send({'group': groupBtc, 'single': singleBtc});
});

app.get('/getnewproblem', function(req, res) {
    const response = {};
    response.problem = getNewProblem();
    res.send(response);
});

app.get('/mine', function(req, res) {
    fs.readFile('html/user.html', function(err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.contentType('text/html');
            res.send(data);
        }
    });
})

app.post('/solveproblem', function(req, res) {
    const body = JSON.parse(req.body.content);
    console.log('the response was', body);
    if (!/^(\d|\w|\s)+$/.exec(body.userId)) {
        res.send({err: 'username'});
        return;
    }
    if (solvedProblemCorrectly(body.problem, body.answer)) {
        res.send({err: null});
        account = body.userId == single.id ? single : group;
        account.amount += miningRate;
        account.txQueue.push('User ' + body.userId + ' solved ' + body.problem.first + ' ' + body.problem.op + ' ' + body.problem.second + ' and was awarded ' + miningRate + ' coins.');
    }
    else {
        res.send({err: "answer"});
    }
});

app.listen(port, () => console.log('listening on port', port));