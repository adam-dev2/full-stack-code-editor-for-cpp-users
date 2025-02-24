const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const port = 3000;

const app = express();
app.use(express.json());

app.get('/',(req,res) => {
    res.send("get req")
})

app.post('/cpp', (req, res) => {
    const { code, input } = req.body;

    // Write the code to a temporary .cpp file
    fs.writeFileSync('temp.cpp', code);

    // Compile the C++ code
    exec('g++ temp.cpp -o temp.out', (compileErr, stdout, stderr) => {
        if (compileErr) {
            return res.json({ output: `Compilation error: ${stderr}` });
        }

        // Execute the compiled file with the user input
        const process = exec('./temp.out', (runErr, stdout, stderr) => {
            if (runErr) {
                return res.json({ output: `Execution error: ${stderr}` });
            }
            res.json({ output: stdout });
        });

        // Pass the user input to the executable
        process.stdin.write(input + '\n');
        process.stdin.end();
    });
});

app.listen(port,() => {
    console.log(`Server running on ${port}`);
})
