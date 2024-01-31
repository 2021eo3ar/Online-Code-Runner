const express = require("express");
const { generateFile } = require('./generateFile');
const { executeCpp } = require('./executeCpp');
const cors = require('cors');
const { executePy } = require("./executePy");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.json({ Hello: "world!" });
});

app.post('/run', async (req, res) => {

    const { language = "cpp", code } = req.body;


    if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty code body" });
    }
    try {
        const filepath = await generateFile(language, code);
        let output;
        if (language === "cpp") {
            output = await executeCpp(filepath);
        }
        else {
            output = await executePy(filepath);
        }
        return res.json({ filepath, output });
    } catch (err) {
        res.status(500).json({ err });
    }

});

app.listen(5000, () => {
    console.log('Listening on port: 5000');
});
