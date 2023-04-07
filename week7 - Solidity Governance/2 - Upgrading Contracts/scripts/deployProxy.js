const { ethers, upgrades } = require('hardhat');

async function main() {
    const VendingMachineV1 = await ethers.getContractFactory('VendingMachineV1');
    const proxy = await upgrades.deployProxy(VendingMachineV1, [100]);
    await proxy.deployed();

    const implementationAddress = await upgrades.erc1967.getImplementationAddress(
        proxy.address
    );

    console.log('Proxy contract address: ' + proxy.address);

    console.log('Implementation contract address: ' + implementationAddress);
}

main();