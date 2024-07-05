import { useContext } from "react";
import { CriteriaContext } from "../App";
import './Configuration.css'

function Configuration() {
    const criteria = useContext(CriteriaContext)
    console.log('ccc', criteria)
    const changeCriteria = (val) => {
        console.log(criteria,val)
        // criteria.setRewardCriteria({
        //     onePointThreshold: val,
        //     twoPointThreshold: criteria.twoPointThreshold
        // })
    }
    return <div>
        <h3 className="table-header">Configure</h3>


        <form method="get" action="javascript: void(0);" id="config-form" className="login-form" autoComplete="off" role="main">
            <div>
                <label className="label-one-point">
                    <input type="one-point" className="text" value={criteria.onePointThreshold} onChange={(e) => changeCriteria(e.target.value)} name="one-point" placeholder="One Point Threshold" tabIndex="1" required />
                    <span className="required">One Point Threshold</span>
                </label>
            </div>

            <div>
                <label className="label-two-point">
                    <input type="text" className="text" value={criteria.twoPointThreshold} onChange={() => changeCriteria()} name="two-point" placeholder="Two Point Threshold" tabIndex="2" required />
                    <span className="required">Two Point Threshold</span>
                </label>
            </div>
            <input type="submit" value="Submit" />

        </form>

    </div>
}

export default Configuration;