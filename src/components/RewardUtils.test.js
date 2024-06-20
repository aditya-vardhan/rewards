import moment from "moment";
import { generateRewardsData } from "./RewardUtils";

test('Adds reward if txn amount is more than 100', () => {
    const purchaseData = [
        {
            "transaction_id": "TXN085",
            "customer_name": "Michael Brown",
            "purchased_product": "Slippers",
            "price": 120,
            "purchased_date": moment().format('YYYYMMDD')
        }]
    const rewardsData = generateRewardsData(purchaseData)
    // as txn amount is 120
    // amount above hundred dollars is applicable for 2 reward points, which is 2*20 = 40 points
    // amount between 50 to 100 is applicable for 1 reward point, which is 50 points
    // total reward points is 40 + 50 = 90 points
    expect(rewardsData.totalUserRewards[0].reward).toBe(90);
    expect(rewardsData.monthlyUserRewards[0].reward).toBe(90);
});

test('Reward is not generated if txn amount is less than 100', () => {
    const purchaseData = [
        {
            "transaction_id": "TXN085",
            "customer_name": "Michael Brown",
            "purchased_product": "Slippers",
            "price": 99,
            "purchased_date": moment().format('YYYYMMDD')
        }]
    const rewardsData = generateRewardsData(purchaseData)
    expect(rewardsData.totalUserRewards.length).toBe(0);
    expect(rewardsData.monthlyUserRewards.length).toBe(0);
})

test('Reward generated is 50 if txn amount is equals 100', () => {
    const purchaseData = [
        {
            "transaction_id": "TXN085",
            "customer_name": "Michael Brown",
            "purchased_product": "Slippers",
            "price": 100,
            "purchased_date": moment().format('YYYYMMDD')
        }]
    const rewardsData = generateRewardsData(purchaseData)
    expect(rewardsData.totalUserRewards[0].reward).toBe(50);
    expect(rewardsData.monthlyUserRewards[0].reward).toBe(50);
})


test('Reward generated within same month for a user is added', () => {
    const purchaseData = [
        {
            "transaction_id": "TXN085",
            "customer_name": "Michael Brown",
            "purchased_product": "Slippers",
            "price": 100,
            "purchased_date": moment().format('YYYYMMDD')
        },{
            "transaction_id": "TXN086",
            "customer_name": "Michael Brown",
            "purchased_product": "Slippers",
            "price": 100,
            "purchased_date": moment().format('YYYYMMDD')
        }]
    const rewardsData = generateRewardsData(purchaseData)
    expect(rewardsData.totalUserRewards[0].reward).toBe(100);
    expect(rewardsData.monthlyUserRewards[0].reward).toBe(100);
})


test('Seperate reward records are created for a user for txns done in different months', () => {
    const purchaseData = [
        {
            "transaction_id": "TXN085",
            "customer_name": "Michael Brown",
            "purchased_product": "Slippers",
            "price": 100,
            "purchased_date": moment().format('YYYYMMDD')
        },{
            "transaction_id": "TXN086",
            "customer_name": "Michael Brown",
            "purchased_product": "Slippers",
            "price": 100,
            "purchased_date": moment().subtract(1, 'months').format('YYYYMMDD')
        }]
    const rewardsData = generateRewardsData(purchaseData)
    expect(rewardsData.totalUserRewards[0].reward).toBe(100);
    expect(rewardsData.monthlyUserRewards[0].reward).toBe(50);
    expect(rewardsData.monthlyUserRewards[1].reward).toBe(50);
    expect(rewardsData.monthlyUserRewards.length).toBe(2);
})

test('Seperate reward records are created for every user', () => {
    const purchaseData = [
        {
            "transaction_id": "TXN085",
            "customer_name": "Michael Brown",
            "purchased_product": "Slippers",
            "price": 100,
            "purchased_date": moment().format('YYYYMMDD')
        },{
            "transaction_id": "TXN086",
            "customer_name": "Jade Smith",
            "purchased_product": "Slippers",
            "price": 100,
            "purchased_date": moment().format('YYYYMMDD')
        },{
            "transaction_id": "TXN087",
            "customer_name": "John de Brayn",
            "purchased_product": "Slippers",
            "price": 100,
            "purchased_date": moment().format('YYYYMMDD')
        }]
    const rewardsData = generateRewardsData(purchaseData)
    expect(rewardsData.totalUserRewards.length).toBe(3);
    expect(rewardsData.monthlyUserRewards.length).toBe(3);
    expect(rewardsData.totalUserRewards[0].reward).toBe(50);
    expect(rewardsData.totalUserRewards[1].reward).toBe(50);
    expect(rewardsData.totalUserRewards[2].reward).toBe(50);
    expect(rewardsData.monthlyUserRewards[0].reward).toBe(50);
    expect(rewardsData.monthlyUserRewards[1].reward).toBe(50);
    expect(rewardsData.monthlyUserRewards[2].reward).toBe(50);
})
