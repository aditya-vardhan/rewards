import moment from "moment";

export const generateRewardsData = (purchaseData) => {
    const today = moment();
    return purchaseData.reduce((acm, record) => {
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
}