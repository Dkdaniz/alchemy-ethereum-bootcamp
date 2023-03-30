require("dotenv").config();

async function run() {
    const { create } = await import('ipfs-http-client');
    const ipfs = await create(create({ host: 'localhost', port: '8080', protocol: 'http' }));
    
    const metadata = {
        path: '/',
        content: JSON.stringify({
            name: "My Skills",
            attributes: [
            {
                "trait_type": "Javascript",
                "value": "95" 
            },
            {
                "trait_type": "Node",
                "value": "90"
            },
            {
                "trait_type": "ReactJs",
                "value": "80"
            },
            {
                "trait_type": "Blockchain",
                "value": "70"
            }
            ],
            // update the IPFS CID to be your image CID
            image: `https://ipfs.io/ipfs/${process.env.IPFS_CID}`,
            description: "So much PLW3!"
        })
    };

    const result = await ipfs.add(metadata);
    console.log(result);

    process.exit(0);
}

run();