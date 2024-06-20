import moment from "moment";
import logger from "../logger";

export const generateRewardsData = (purchaseData) => {
    const today = moment();
    const rewardsData = purchaseData.reduce((acm, txn) => {
        // no need to process txn if the amount is less than 100
        if (txn.price < 100) {
            return acm
        }
        const reward = (txn.price - 100) * 2 + 50;
        // check if txn is older than three months
        const purchaseDate = moment(txn.purchased_date).format('YYYYMMDD');
        const diff = today.diff(purchaseDate, 'months');
        if (diff > 3) {
            return acm;
        }

        const purchaseMonth = moment(txn.purchased_date).format('MMMM')

        const monthlyRewardIndex = acm.monthlyUserRewards.findIndex(data => data.customer_name === txn.customer_name && data.month === purchaseMonth)

        // if reward details already exist for a given month
        if (monthlyRewardIndex !== -1) {
            acm.monthlyUserRewards[monthlyRewardIndex].reward += reward;
        } else {
            const userMonthlyReward = {
                customer_name: txn.customer_name,
                month: purchaseMonth,

                reward: reward
            }
            acm.monthlyUserRewards.push(userMonthlyReward)
        }

        const totalRewardsIndex = acm.totalUserRewards.findIndex(data => data.customer_name === txn.customer_name)

        // if reward details already exist for current user
        if (totalRewardsIndex !== -1) {
            acm.totalUserRewards[totalRewardsIndex].reward += reward;
        } else {
            const userTotalReward = {
                customer_name: txn.customer_name,
                reward: reward
            }
            acm.totalUserRewards.push(userTotalReward)
        }


        return acm;
    }, { totalUserRewards: [], monthlyUserRewards: [] })
    logger.log('Generated rewards data: ', rewardsData);
    return rewardsData;
}