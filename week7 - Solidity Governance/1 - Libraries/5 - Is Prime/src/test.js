const { assert } = require('chai');
describe('Prime', function () {
    let library;
    before(async () => {
        const Prime = await ethers.getContractFactory("Prime");
        library = await Prime.deploy();
        await library.deployed();
    });

    it('should detect prime numbers', async () => {
        const primes = [5, 17, 47];
        for (let i = 0; i < primes.length; i++) {
            const prime = primes[i];
            const isPrime = await library.callStatic.isPrime(prime);
            assert(isPrime, `Expected isPrime to return true for ${prime}!`);
        }
    });

    it('should detect non-prime numbers', async () => {
        const nonPrimes = [4, 18, 51];
        for (let i = 0; i < nonPrimes.length; i++) {
            const nonPrime = nonPrimes[i];
            const isPrime = await library.callStatic.isPrime(nonPrime);
            assert(!isPrime, `Did not expect isPrime to return true for ${nonPrime}!`);
        }
    });
});