const readYamlFile = require('read-yaml-file');
const { color, log, red, green, cyan, cyanBright } = require('console-log-colors');
const fs = require('fs');

switch(process.argv[2]) {
    case "list":
        listServices(process.argv[3] == "-v");
        break;
    default:
        console.log("No command supplied.");
}

function listServices(verbose = false) {

    const servicesMasterDirectory = "./data";
    let dirFiles = fs.readdirSync(servicesMasterDirectory);

    dirFiles.forEach(dir => {
        let isDirectory = fs.lstatSync(servicesMasterDirectory+"/"+dir).isDirectory();
        if(isDirectory) {

            if(fs.existsSync(servicesMasterDirectory+"/"+dir+"/docker-compose.yml")) {
                readYamlFile(servicesMasterDirectory+"/"+dir+"/docker-compose.yml").then(data => {
                    console.log(green(dir));
                
                    Object.keys(data.services).forEach(service => {
                        console.log(cyan("\t"+service));
                        
                        if(verbose) {
                            if(typeof data.services[service].image != "undefined") {
                                console.log("\t\timage: "+data.services[service].image);
                            }
                            /*
                            if(typeof data.services[service].build != "undefined") {
                                console.log("\t\tbuild: "+data.services[service].build);
                            }
                            */
                            if(typeof data.services[service].ports != "undefined") {
                                console.log("\t\tports: "+data.services[service].ports);
                            }
                            
                        }
                    });
                    console.log("");
                });
                
            }
        }
    });
}

