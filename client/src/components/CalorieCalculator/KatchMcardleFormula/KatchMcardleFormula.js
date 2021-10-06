import { useState } from 'react';
import KnowsLbmTrue from './knowsLbmTrue/KnowsLbmTrue'
import KnowsLbmFalse from './knowsLbmFalse/KnowsLbmFalse'
import disable from '../../Global/disableUrl';

const KatchMcardleFormula = () => {

    const [knowsLbmLayout, setLbmLayout] = useState(<KnowsLbmTrue />);

    function onChangeKnowsLbmTrue() {
        setLbmLayout(<KnowsLbmTrue />);
    }

    function onChangeKnowsLbmFalse() {
        setLbmLayout(<KnowsLbmFalse />);
    }


    return (
        <div id="katch-mcardle-form">
            <div className="row">
                <form onSubmit={disable} className="col">
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" className="custom-control-input" id="knows-lbm-true" name="example" value="customEx"
                            defaultChecked onChange={onChangeKnowsLbmTrue}></input>
                        <label className="custom-control-label" htmlFor="knows-lbm-true">I know my lean<br></br>body mass</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" className="custom-control-input" id="knows-lbm-false" name="example"
                            value="customEx" onChange={onChangeKnowsLbmFalse}></input>
                        <label className="custom-control-label" htmlFor="knows-lbm-false">I don't know my<br></br>lean body
                            mass</label>
                    </div>
                </form>
                {knowsLbmLayout}
            </div>
        </div>
    );
}

export default KatchMcardleFormula;