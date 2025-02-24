import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import fs from 'fs';
import { exec, spawn } from 'child_process';

const port = 2000;

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ["GET", "POST"],
        credentials: true
    },
});

function reqinpt(code) {
    const inpt = /\b(cin)\b/;
    return inpt.test(code);
}

// Updated runwithinput to use spawn for input handling
function runwithinput(code, input) {
    return new Promise((resolve, reject) => {
        fs.writeFileSync('temp.cpp', code);

        exec('g++ temp.cpp -o temp.out', (compileErr, stdout, stderr) => {
            if (compileErr) {
                reject(stderr);
                return;
            }

            const prc = spawn('./temp.out');
            
            // Write input to the process
            prc.stdin.write(input + '\n');
            prc.stdin.end();

            let output = '';
            let error = '';

            // Capture stdout and stderr from the process
            prc.stdout.on('data', (data) => {
                output += data.toString();
            });

            prc.stderr.on('data', (data) => {
                error += data.toString();
            });

            prc.on('close', (code) => {
                if (code === 0) {
                    resolve(output);
                } else {
                    reject(error || `Process exited with code ${code}`);
                }
            });
        });
    });
}

function runwithoutinpt(code) {
    return new Promise((resolve, reject) => {
        fs.writeFileSync('temp.cpp', code);

        exec('g++ temp.cpp -o temp.out', (compileErr, stdout, stderr) => {
            if (compileErr) {
                reject(stderr);
                return;
            }

            const prc = spawn('./temp.out');

            let output = '';
            let error = '';

            // Capture stdout and stderr from the process
            prc.stdout.on('data', (data) => {
                output += data.toString();
            });

            prc.stderr.on('data', (data) => {
                error += data.toString();
            });

            prc.on('close', (code) => {
                if (code === 0) {
                    resolve(output);
                } else {
                    reject(error || `Process exited with code ${code}`);
                }
            });
        });
    });
}

app.get('/', (req, res) => {
    res.send("Assalamualaikum");
});

io.on('connection', (socket) => {
    let requiresInput = false;
    let cachedCode = '';

    socket.on('code', async (codeData) => {
        try {
            const codeObj = typeof codeData === 'string' ? JSON.parse(codeData) : codeData;
            cachedCode = codeObj.code;
            requiresInput = reqinpt(cachedCode);

            if (requiresInput) {
                socket.emit('input');
            } else {
                const output = await runwithoutinpt(cachedCode);
                socket.emit('output', { output });
            }
        } catch (error) {
            socket.emit('output', { output: `Error: ${error}` });
        }
    });

    socket.on('takeinput', async (input) => {
        if (requiresInput) {
            try {
                const output = await runwithinput(cachedCode, input);
                socket.emit('output', { output });
                requiresInput = false;
            } catch (error) {
                socket.emit('output', { output: `Error: ${error}` });
            }
        }
    });
});

server.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
