import { useState } from 'react';
import KnowsLbmTrue from './knowsLbmTrue/KnowsLbmTrue'
import KnowsLbmFalse from './knowsLbmFalse/KnowsLbmFalse'

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
                <form onSubmit={(e) => { e.preventDefault() }} className="col">
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" className="custom-control-input" id="knows-lbm-true" name="example" value="customEx"
                            defaultChecked onChange={onChangeKnowsLbmTrue}></input>
                        <label className="custom-control-label" htmlFor="knows-lbm-true">I know my LBM</label>
                    </div>
                    <br></br>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" className="custom-control-input" id="knows-lbm-false" name="example"
                            value="customEx" onChange={onChangeKnowsLbmFalse}></input>
                        <label className="custom-control-label" htmlFor="knows-lbm-false">I don't know my LBM</label>
                    </div>
                </form>
                {knowsLbmLayout}
            </div>
        </div>
    );
}

export default KatchMcardleFormula;