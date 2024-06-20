import { useEffect, useState } from "react";
import moment from 'moment';
import PurchaseDataService from "../services/PurchaseDataService";
import './Rewards.css';

function Rewards() {

    const [rewardsData, setRewardsData] = useState({})

    const getPurchaseData = async () => {
        try {

            const today = moment();
            const purchaseDataResponse = await PurchaseDataService('mock')

            const processedData = purchaseDataResponse.result.data.reduce((acm, record) => {
                // no need to process record if the amount is less than 100
                if (record.price < 100) {
                    return acm
                }
                const reward = (record.price - 100) * 2 + 50;
                // check if record is older than three months
                const purchaseDate = moment(record.purchased_date).format('YYYYMMDD');
                const diff = today.diff(purchaseDate, 'months');
                if (diff > 3) {
                    return acm;
                }

                const purchaseMonth = moment(record.purchased_date).format('MMMM')

                const monthlyRewardIndex = acm.monthlyUserRewards.findIndex(data => data.customer_name === record.customer_name && data.month === purchaseMonth)

                // if reward details already exist for given month
                if (monthlyRewardIndex !== -1) {
                    acm.monthlyUserRewards[monthlyRewardIndex].reward += reward;
                } else {
                    const userMonthlyReward = {
                        customer_name: record.customer_name,
                        month: purchaseMonth,

                        reward: reward
                    }
                    acm.monthlyUserRewards.push(userMonthlyReward)
                }

                const totalRewardsIndex = acm.totalUserRewards.findIndex(data => data.customer_name === record.customer_name)

                // if reward details already exist for user
                if (totalRewardsIndex !== -1) {
                    acm.totalUserRewards[totalRewardsIndex].reward += reward;
                } else {
                    const userTotalReward = {
                        customer_name: record.customer_name,
                        reward: reward
                    }
                    acm.totalUserRewards.push(userTotalReward)
                }

                return acm;
            }, { totalUserRewards: [], monthlyUserRewards: [] })
            setRewardsData(processedData);
        } catch (error) {
            console.log('error: ', error)
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
    return <div className="rewards-container">
        <div className="floatLeft">
            <div className="table-header">User Monthly rewards data</div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Month</th>
                        <th>Reward</th>
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
                        <th>Reward</th>
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
    </div>
}

export default Rewards;