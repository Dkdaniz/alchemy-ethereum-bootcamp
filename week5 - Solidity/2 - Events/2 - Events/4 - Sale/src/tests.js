const chai = require('chai');
const { parseEther } = ethers.utils;
const { assert, expect } = chai;

describe('Collectible', function () {
    let collectible, oneEther, halfEther, owner, a2, a3;
    before(async () => {
        const Collectible = await ethers.getContractFactory("Collectible");
        collectible = await Collectible.deploy();

        [owner, a2, a3] = await ethers.provider.listAccounts();
        oneEther = parseEther("1.0");
        halfEther = parseEther("0.5");
    });

    it('should revert if a purchase is attempted before the item is marked for sale', async () => {
        const signer = await ethers.provider.getSigner(a2);
        await expect(collectible.connect(signer).purchase()).to.be.reverted;
    });

    describe('after marking a price', () => {
        before(async () => {
            await collectible.markPrice(oneEther);
        });

        it('should revert if a purchase is attempted with less money than the price', async () => {
            const signer = await ethers.provider.getSigner(a2);
            await expect(collectible.connect(signer).purchase({ value: halfEther })).to.be.reverted;
        });
    });

    describe('after purchasing', () => {
        let response, initialBalance, purchaseEvent;
        before(async () => {
            initialBalance = await ethers.provider.getBalance(owner);

            const signer = await ethers.provider.getSigner(a2);
            response = await collectible.connect(signer).purchase({ value: oneEther });

            const receipt = await response.wait();
            purchaseEvent = receipt.events.find(x => x.event === "Purchase");
        });

        it('should emit a Purchase event', async () => {
            assert(purchaseEvent, "Expected a Purchase event to be emitted!");
            assert.equal(purchaseEvent.args.length, 2, "Expected 2 event values to be emitted!");
            assert.equal(purchaseEvent.args[0].toString(), parseEther("1").toString(), "Expected the first return value to be the price.");
            assert.equal(purchaseEvent.args[1], a2, "Expected the second return value to be the new owner address.");
        });

        it('should pay the owner', async () => {
            const balanceAfter = await ethers.provider.getBalance(owner);
            assert.equal(balanceAfter.sub(initialBalance).toString(), parseEther("1").toString());
        });

        it('should fail on the next purchase attempt', async () => {
            const signer = await ethers.provider.getSigner(a3);
            await expect(collectible.connect(signer).purchase({ value: parseEther("1") })).to.be.reverted;
        });

        describe('after marking a new price', () => {
            before(async () => {
                const signer = await ethers.provider.getSigner(a2);
                await collectible.connect(signer).markPrice(parseEther("1"));
            });

            it('should allow a purchase', async () => {
                const signer = await ethers.provider.getSigner(a3);
                const response = await collectible.connect(signer).purchase({ value: parseEther("1") });
                const receipt = await response.wait();
                const purchaseEvent = receipt.events.find(x => x.event === "Purchase");
                assert(purchaseEvent, "Expected a Purchase event to be emitted!");
            });
        });
    });
});