import { expect } from 'chai'
import { getSigners } from '@/utils/signers'
import {
  FullEnvironment,
  createFullEnvironment
} from '@/test/fixtures/utils/loadEnvironment'

describe('UseCase: set min destination gas', function () {
  let environment: FullEnvironment

  before(async function () {
    environment = await createFullEnvironment()
  })

  it('should set min destination gas', async function () {
    await environment.proxyONFT721.setMinDstGas(
      environment.destinationChainId,
      environment.packetType,
      environment.minGasToTransferAndStoreRemote
    )

    const minDestinationGasStored =
      await environment.proxyONFT721.minDstGasLookup(
        environment.destinationChainId,
        environment.packetType
      )

    expect(minDestinationGasStored).to.be.equal(
      environment.minGasToTransferAndStoreRemote
    )
  })

  describe('Checks', () => {
    it('should revert if caller is not owner', async function () {
      const [, hacker] = await getSigners()

      await expect(
        environment.proxyONFT721
          .connect(hacker)
          .setMinDstGas(
            environment.destinationChainId,
            environment.packetType,
            260_000n
          )
      ).to.be.revertedWith('Ownable: caller is not the owner')
    })
  })
})
