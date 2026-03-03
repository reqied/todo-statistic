const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();
const comments = [];

for (const file of files) {
    let line = "";
    let comm = false;
    for (let i = 0; i < file.length - 1; i++) {
        if (file[i] === '/' && file[i+1] === '/') {
            comm = true;
        }
        if (comm === true) {
            line = line + file[i];
        }

        if (file[i] === '\n' && line !== "") {

            comments.push(line);
            line = "";
            comm = false;
        }
    }
    if (comm === true) {
        comments.push(line);
    }
}

console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function processCommand(command) {
    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            for (const line of comments) {
                console.log(line)
            }
            break;
        case 'important':
            for (const line of comments) {
                if (line.includes("!")) {
                    console.log(line)
                }
            }
            break;
        case 'sort importance':
            let com_s = comments.slice()
            com_s.sort((a, b) => -(a.split("!").length) + (b.split("!").length))
            for (const line of com_s) {
                console.log(line)
            }
            break;
        case 'sort user':
            let com_n = comments.slice()
            com_n.sort((a, b) => (a.split(';')[0].localeCompare(b.split(';')[0])))
            for (const line of com_n) {
                console.log(line)
            }
            break;

        default:
            if (command.startsWith('user')) {
                const name = command.split(' ')[1]
                for (const line of comments) {
                    const nameExpected = line.split(';')[0].split(' ').at(-1);
                    if (nameExpected.toLowerCase() === name.toLowerCase()) {
                        console.log(line)
                    }
                }
                break;
            }
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!
