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
    txQueue: [],
    amount: 0
}
const accounts = {group: group, single: single};

article = {
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

function answer(problem) {
    if (problem.first >= 0 
        && problem.first < 10 
        && problem.second >= 0 
        && problem.second < 10 
        && ops.indexOf(problem.op) >= 0) {
        return eval('' + problem.first + problem.op + problem.second);    
    }
    else {
        return null;
    };
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
    res.send(accounts);
    group.txQueue = [];
    single.txQueue = [];
    group.amount = 0;
    single.amount = 0;
});

app.get('/statspage', function(req, res) {
    fs.readFile('html/statspage.html', function(err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.contentType('text/html');
            res.send(data);
        }
    });
});

app.get('/getnewproblem', function(req, res) {
    const response = {};
    response.problem = getNewProblem();
    res.send(response);
});

app.get('/', function(req, res) {
    fs.readFile('html/user.html', function(err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.contentType('text/html');
            dataStr = data.toString('utf8');
            dataStr = dataStr.replace('<<<ACCOUNT>>>', 'single' in req.query ? 'single' : 'group');
            res.send(dataStr);
        }
    });
})

app.post('/solveproblem', function(req, res) {
    const body = JSON.parse(req.body.content);
    if (!/^(\d|\w|\s)+$/.exec(body.userId)) {
        res.send({err: 'username'});
        return;
    }
    if (solvedProblemCorrectly(body.problem, body.answer)) {
        res.send({err: null});
        account = accounts[body.account];
        account.amount += miningRate;
        tx = {}
        tx.userId = body.userId;
        tx.problem = body.problem;
        tx.miningRate = miningRate;
        tx.answer = answer(body.problem);
        account.txQueue.push(tx);
        console.log('Problem solved correctly.\nStats are now:');
        console.log(group);
        console.log(single);
        console.log('\n');
    }
    else {
        res.send({err: "answer"});
    }
});

app.get('/article', function(req, res) {
    fs.readFile('html/article.html', function(err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.contentType('text/html');
            res.send(data);
        }
    });
});

app.get('/articlecontent.html', function(req, res) {
    fs.readFile('html/articlecontent.html', function(err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.contentType('text/html');
            res.send(data);
        }
    });
});

app.post('/articlemine', function(req, res) {
    var userId = req.body.userId;
    if (!/^(\w|\d|\s)+$/.exec(userId)) {
        res.send({err: 'username'});
        return;
    }
    article.txQueue.push({userId: userId});
    article.amount += miningRate;
    res.send({err: null});
});

app.get('/articlestats', function(req, res) {
    res.send({stats:article, miningRate: miningRate});
    article.txQueue = [];
    article.amount = 0;
});

app.get('/articlestatspage', function(req, res) {
    fs.readFile('html/articlestatspage.html', function(err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.contentType('text/html');
            res.send(data);
        }
    });
});

app.listen(port, () => console.log('listening on port', port));