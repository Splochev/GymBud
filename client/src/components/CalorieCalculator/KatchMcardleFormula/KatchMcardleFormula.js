import { useState } from 'react';
import KnowsLbmTrue from './knowsLbmTrue/KnowsLbmTrue'
import KnowsLbmFalse from './knowsLbmFalse/KnowsLbmFalse'
import { UGBRadioButtonsGroup } from '../../Global/UGBRadioButtonsGroup';
import { FormControlLabel, Radio } from '@material-ui/core';
import useStyles from '../styles'

const KatchMcardleFormula = ({ bmr }) => {
    const styles = useStyles();
    const knowsLbmLayout = useState('KnowsLbmTrue');

    return (
        <div className={styles.katchFormulaLayout}>
            <div>
                <UGBRadioButtonsGroup
                    label=""
                    $checkedValue={knowsLbmLayout}
                    customMap={() => {
                        return (
                            <>
                                <FormControlLabel key={'KnowsLbmTrue'} value={'KnowsLbmTrue'} control={<Radio />} label='I know my LBM' />
                                <FormControlLabel key={'KnowsLbmFalse'} value={'KnowsLbmFalse'} control={<Radio />} label="I don't know my LBM" />
                            </>
                        );
                    }}
                />
            </div>
            {knowsLbmLayout[0] === 'KnowsLbmTrue' ? < KnowsLbmTrue bmr={bmr} /> : null}
            {knowsLbmLayout[0] === 'KnowsLbmFalse' ? < KnowsLbmFalse bmr={bmr} /> : null}
        </div>
    );
}

export default KatchMcardleFormula;