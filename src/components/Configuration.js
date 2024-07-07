import { useState } from 'react';
import './Configuration.css'

function Configuration(props) {
    const {rewardCriteria, setRewardCriteria} = props;

    const [onePointThreshold, setOnePointThreshold] = useState(rewardCriteria.onePointReward)
    const [twoPointThreshold, setTwoPointThreshold] = useState(rewardCriteria.twoPointReward)

    const changeCriteria = () => {
        setRewardCriteria({
            onePointReward: onePointThreshold,
            twoPointReward: twoPointThreshold
        })
    }

    return <div>
        <h3 className="table-header">Configure</h3>


        <form method="get" action="javascript: void(0);" id="config-form" className="login-form" autoComplete="off" role="main">
            <div>
                <label className="label-one-point">
                    <input type="one-point" className="text" value={onePointThreshold} onChange={(e) => setOnePointThreshold(e.target.value)} name="one-point" placeholder="One Point Threshold" tabIndex="1" required />
                    <span className="required">One Point Threshold</span>
                </label>
            </div>

            <div>
                <label className="label-two-point">
                    <input type="text" className="text" value={twoPointThreshold} onChange={(e) => setTwoPointThreshold(e.target.value)} name="two-point" placeholder="Two Point Threshold" tabIndex="2" required />
                    <span className="required">Two Point Threshold</span>
                </label>
            </div>
            <input type="submit" value="Submit" onClick={changeCriteria} />

        </form>

    </div>
}

export default Configuration;