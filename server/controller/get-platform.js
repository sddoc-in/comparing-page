import Papa from "papaparse";
import path from 'path'
import { fileURLToPath } from 'url';


const __dirname = path.dirname(fileURLToPath(import.meta.url));


export async function getPlatforms(req, res) {

    let file = path.join(__dirname, '../Features.csv')
    console.log(file);

    try {

        // get file data
        let data;
        Papa.parse(file, {
            header: true,
            delimiter: ",",
            complete: function (results) {
                data = results.data;
                console.log(results);
            } 
        });

        console.log(data);

        res.status(200).json({ data: data, message: "" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
