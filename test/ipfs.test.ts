import ipfs, { IPFS } from "ipfs-core"
import { expect } from "chai"

describe("IPFS", async () => {
    const data = 'Hello, <YOUR NAME HERE>'
    let node: IPFS

    before("connect ot IPFS", async () => {
        node = await ipfs.create()
    })
    it("can add data to IPFS", async () => {
        const { cid } = await node.add(data)
        // console.info(cid)
        expect(cid).is.not.empty
    })
    it("can get data from IPFS", async () => {
        let cid = "QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A"
        let data = ''
        const stream = node.cat(cid)
        for await (const chunk of stream) {
            data += chunk.toString()
        }
        // console.log(data)
        expect(data).is.not.empty
    })
})