const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const {exec,spawn} = require('child_process');
const {stdin, stdout} = require('process')

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

function generate()  {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result='';


    for(let i=0;i<12;i++){
        const randomIndex = Math.floor(Math.random()*characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

app.post('/cpp',async (req,res) => {
    try{
        var filename = generate();
        await fs.writeFile(`./outputs/${filename}.cpp`,req.body.code,(err) => {
            if(err) {
                console.log('Error while writing code');
                res.status(500).json({message: 'Error while Writing code'});
                return;
            }
        })

        const compile = spawn('g++',[`./outputs/${filename}.cpp`,'-o',`./outputs/${filename}`]);
        compile.stderr.on('data',(data) => {
            res.send(data).status(200);
        });

        compile.on('close',(compile) => {
            if(compile === 0) {
                const runprc = spawn(`./outputs/${filename}`,{stdio:['pipe','pipe','pipe']});

                // const useInput = req.body.input;

                // runprc.stdin.write(useInput);
                // runprc.stdin.end();

                let output = '';
                let erroutput = '';

                runprc.stdout.on('data',(data) => {
                    output+=data;
                });

                runprc.stderr.on('data',(data) => {
                    erroutput+=data;
                });

                runprc.on('close',() => {
                    console.log(output)
                    res.send(`${output},${erroutput}`).status(200);
                })
            }
        })

    }catch(err) {
        res.status(500).json({message: 'Error while running ur code'});
    }
})


app.listen(port,() => {
    console.log(`Server running on ${port}`);
})