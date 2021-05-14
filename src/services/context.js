let stack = [];

function Push(router){
    stack.push(router);
};

function Pull(){
    return (stack.pop());
}

exports.Push = Push;
exports.Pull = Pull;
