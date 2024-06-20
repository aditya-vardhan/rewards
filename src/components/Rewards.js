import { useEffect } from "react"

function Rewards() {

    const getPurchaseData = async () => {
        try {
            
        const purchaseData = await fetch('./purchaseData.json')
        console.log(purchaseData)
        console.log(await purchaseData.json())
        } catch (error) {
            console.log('ee',error)
        }
    }

    useEffect(() => {
        getPurchaseData()
    },[])
    return <div>hello</div>
}

export default Rewards;