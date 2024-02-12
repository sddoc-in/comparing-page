import Papa from "papaparse";
import path from 'path'
import { fileURLToPath } from 'url';
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url));


export async function getFeatures(req, res) {
    const { id } = req.query;

    let features = path.join(__dirname, '../features.csv')
    let platform = path.join(__dirname, '../platforms.csv')
    let featuresData;
    let platformData;

    try {

        features = await fs
            .readFileSync(features)
            .toString()
            .split("\n")
            .map((e) => e.trim())
            .join("\n");

        platform = await fs
            .readFileSync(platform)
            .toString()
            .split("\n")
            .map((e) => e.trim())
            .join("\n");


        Papa.parse(features, {
            header: true,
            delimiter: ",",
            complete: function (results) {
                featuresData = results.data;
            }
        });

        Papa.parse(platform, {
            header: true,
            delimiter: ",",
            complete: function (results) {
                platformData = results.data;
            }
        });

        featuresData = featuresData.filter((platform) => {
            return platform.platform_id == id;
        })

        platformData = featuresData.filter((platform) => {
            return platform.Platform_id == id;
        })[0]

        let data = {
            platform: platformData,
            features: featuresData
        }

        res.status(201).json({ data: data, message: "" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
