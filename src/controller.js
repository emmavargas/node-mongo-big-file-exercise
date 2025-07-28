const Records = require('./records.model');
const xlsx = require('xlsx');

const upload = async (req, res) => {

    const {file} = req;

    /* Acá va tu código! Recordá que podés acceder al archivo desde la constante file */


    //verificamos la direccion del archivo
     console.log(file.path);

    const workbook = xlsx.readFile(file.path);

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];   
    const rowsData = xlsx.utils.sheet_to_json(worksheet);
    //verificamos si roms tiene los datos en json.
    console.log(rowsData);

    
    //await Records.deleteMany({});

    await saveRecords(rowsData);
    return res.status(200).json({ message: 'some response' });
};

const list = async (_, res) => {
    try {
        const data = await Records
            .find({})
            .limit(10)
            .lean();
        
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports = {
    upload,
    list,
};


const saveRecords = async (records) => {
    try {
        await Records.insertMany(records);
        console.log('datos guardados');
    } catch (error) {
        console.error('Error:', error);
    }
}