import { useEffect, useState } from "react";
import PurchaseDataService from "../services/PurchaseDataService";
import './Rewards.css';
import { generateRewardsData } from "./RewardUtils";
import logger from "../logger";

function Rewards() {

    const [rewardsData, setRewardsData] = useState({})

    const getPurchaseData = async () => {
        try {
            const purchaseDataResponse = await PurchaseDataService('mock');
            const rewardsInfo = generateRewardsData(purchaseDataResponse.result.data);
            setRewardsData(rewardsInfo);
        } catch (error) {
            logger.error(error)
        }
    }

    const sortByName = (a, b) => {
        if (a.customer_name < b.customer_name) { return -1; }
        if (a.customer_name > b.customer_name) { return 1; }
        return 0;
    }

    useEffect(() => {
        getPurchaseData()
    }, [])
    return <>
        <div className="floatLeft">
            <div className="table-header">User Monthly rewards data</div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Month</th>
                        <th>Reward Points</th>
                    </tr>
                </thead>
                <tbody>
                    {rewardsData.monthlyUserRewards?.sort(sortByName)
                        .map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td>{val.customer_name}</td>
                                    <td>{val.month}</td>
                                    <td>{val.reward}</td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
        <div className="floatLeft">
            <div className="table-header">User total purchase data</div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Reward Points</th>
                    </tr>
                </thead>
                <tbody>
                    {rewardsData.totalUserRewards?.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.customer_name}</td>
                                <td>{val.reward}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </>
}

export default Rewards;