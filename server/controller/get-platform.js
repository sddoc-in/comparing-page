import Papa from "papaparse";
import path from 'path'
import { fileURLToPath } from 'url';
import fs from 'fs'


const __dirname = path.dirname(fileURLToPath(import.meta.url));


export async function getPlatforms(req, res) {

    let file = path.join(__dirname, '../platforms.csv')

    try {

        const filedata = await fs
            .readFileSync(file)
            .toString()
            .split("\n")
            .map((e) => e.trim())
            .join("\n");


        // get file data
        let data;
        Papa.parse(filedata, {
            header: true,
            delimiter: ",",
            complete: function (results) {
                data = results.data;
            }
        });

        let allPlatforms = data.map((platform) => {
            return { platform: platform.platform_name, id: platform.Platform_id };
        })


        res.status(200).json({ data: allPlatforms, message: "" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
