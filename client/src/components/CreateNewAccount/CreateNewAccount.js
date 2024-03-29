import { makeStyles, Typography } from '@material-ui/core';
import logoNoBackgroundWithSlogan from '../assets/logo-no-background-with-slogan.svg'
import { FormControlLabel, Radio } from '@material-ui/core';
import clsx from 'clsx';
import { useState } from 'react';
import { UGBIconInput, UGBPasswordInput } from '../Global/UGBInput';
import { UGBRadioButtonsGroup } from '../Global/UGBRadioButtonsGroup';
import { postData } from '../utils/FetchUtils';
import { useHistory } from 'react-router-dom';
import { UGBButton } from '../Global/UGBButton';
import { UGBCheckbox } from '../Global/UGBCheckbox';
import { useEffect } from 'react';
import { UGBMenuItem, UGBSelect } from '../Global/UGBSelect';
import UGBHr from '../Global/UGBHr';
import UGBLabel from '../Global/UGBLabel';
import UGBModal from '../Global/UGBModal';
import UGBLink from '../Global/UGBLink';
import { BrandAlert } from '../Global/BrandAlert';
import { UGBLoaderDots } from '../Global/UGBLoader';
import { textContainsEmptySpaces, textIsEmail, textIsPassword } from '../utils/ValidationUtils';

const useStyles = makeStyles((theme) => ({
    createNewAccountContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    createNewAccountFormAndLogo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        '@media (max-width: 880px)': {
            gap: theme.spacing(2),
            flexDirection: 'column',
            alignItems: 'center',
        }
    },
    image: {
        width: '100%',
        height: 'auto',
        maxHeight: theme.spacing(40)
    },
    logo: {
        '@media (max-width: 880px)': {
            width: '370px'
        },
        '@media (max-width: 430px)': {
            width: '340px'
        },
        '@media (max-width: 380px)': {
            width: '310px'
        },
        '@media (max-width: 350px)': {
            width: '280px'
        }
    },
    icon: {
        fontSize: theme.spacing(2.5),
    },
    requestSentTitle: {
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'column',
        gap: theme.spacing(1),
        width: '100%',
    },
    form: {
        maxWidth: '420px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
        padding: theme.spacing(2),
        '@media (max-width: 880px)': {
            boxShadow: 'none',
        },
        '@media (max-width: 455px)': {
            maxWidth: '410px',
        },
        '@media (max-width: 442px)': {
            maxWidth: '400px',
        },
        '@media (max-width: 432px)': {
            maxWidth: '390px',
        },
        '@media (max-width: 422px)': {
            maxWidth: '380px',
        },
        '@media (max-width: 412px)': {
            maxWidth: '370px',
        },
        '@media (max-width: 402px)': {
            maxWidth: '360px',
        },
        '@media (max-width: 392px)': {
            maxWidth: '350px',
        },
        '@media (max-width: 382px)': {
            maxWidth: '340px',
        },
        '@media (max-width: 372px)': {
            maxWidth: '330px',
        },
        '@media (max-width: 362px)': {
            maxWidth: '320px',
        },
        '@media (max-width: 352px)': {
            maxWidth: '310px',
        },
        '@media (max-width: 342px)': {
            maxWidth: '300px',
        }
    },
    actions: {
        width: '100%',
        display: 'flex',
        justifyContent: "center",
        marginTop: theme.spacing(2),
        "& button": {
            width: theme.spacing(23.5),
        }
    },
    inputs: {
        width: '100%',
        display: 'flex',
        gap: theme.spacing(2)
    },
    radioIcon: {
        color: '#757575'
    },
    formTitle: {
        display: 'flex',
        alignItems: 'start',
        width: '100%',
        flexDirection: 'column',
        gap: theme.spacing(1)
    },
    termsAndConditions: {
        '& .MuiButtonBase-root': {
            color: '#007BFF'
        },
        '& a': {
            marginLeft: '-13px'
        }
    },
    closeBtnContainer: {
        display: 'flex',
        justifyContent: 'end',
        width: '100%',
        marginTop: theme.spacing(2)
    }
}));

const customStyles = {
    birthDate: {
        width: '100%',
        marginBottom: 5,
    }
};

const monthsLabel = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
};

function yearIsLeap(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

const GetTermsAndConditionsDialog = ({ onClose }) => {
    return (
        <div className="termsAndCondtionsDialog">
            <Typography variant='h5' component='div'>
                Terms and Conditions
            </Typography>
            <TermsAndConditions />
            <UGBButton
                btnType='secondary'
                onClick={onClose}
            >
                Cancel
            </UGBButton>
        </div>
    );
}

const dataValidators = {
    validatePassword: (value) => {
        const errors = []
        const res = textIsPassword(value);
        if (res !== true) {
            errors.push(res)
        }
        return errors;
    },
    validateEmail: (value) => {
        const errors = []
        if (!textIsEmail(value)) {
            errors.push('Invalid mail.')
        }
        if (textContainsEmptySpaces(value)) {
            errors.push('Value must not contain empty spaces.')
        }
        return errors;
    },
    validateNames: (value) => {
        const errors = []
        if (textContainsEmptySpaces(value)) {
            errors.push('Value must not contain empty spaces.')
        }
        return errors;
    },
}

const Register = () => {
    const history = useHistory();
    const styles = useStyles();
    const email = useState('');
    const secretUgbPassword = useState('');
    const password = useState('');
    const repeatPassword = useState('');
    const firstName = useState('');
    const lastName = useState('');
    const sex = useState('male')
    const [daysOfMonths, setDaysOfMonths] = useState([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
    const [days, setDays] = useState([]);
    const day = useState(new Date().getDate());
    const [months] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [minYear] = useState(new Date().getFullYear() - 125);
    const [maxYear] = useState(new Date().getFullYear()-19);
    const [years, setYears] = useState([]);
    const termsRead = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [userRegistered, setUserRegistered] = useState(false);

    const [loading, setLoading] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const emailPassed = useState(false);
    const passwordPassed = useState(true);
    const firstNamePassed = useState(true);
    const lastNamePassed = useState(true);
    const repeatPasswordPassed = useState(true);
    const [alert, setAlert] = useState('');

    useEffect(() => {
        const daysOfMonthCount = daysOfMonths[month - 1];
        const daysArr = [];
        for (let i = 1; i <= daysOfMonthCount; i++) {
            daysArr.push(i);
        }
        setDays(daysArr)

        const years = [];
        for (let i = minYear; i <= maxYear; i++) {
            years.push(i);
        }
        setYears(years);
    }, [])

    function changeMonth(selectedMonth) {
        setMonth(selectedMonth);
        const daysOfMonthCount = daysOfMonths[selectedMonth - 1];
        const daysArr = [];
        for (let i = 1; i <= daysOfMonthCount; i++) {
            daysArr.push(i);
        }
        setDays(daysArr)
    }

    function onChangeMonth(e) {
        changeMonth(e.target.value);
    }

    function changeYear(e) {
        setYear(e.target.value);
        if (yearIsLeap(e.target.value)) {
            const tempDaysOfMonths = daysOfMonths;
            tempDaysOfMonths[1] = 29;
            setDaysOfMonths(tempDaysOfMonths);
            changeMonth(month);
        } else {
            if (daysOfMonths[1] !== 28) {
                const tempDaysOfMonths = daysOfMonths;
                tempDaysOfMonths[1] = 28;
                setDaysOfMonths(tempDaysOfMonths);
                changeMonth(month);
            }
        }
    }

    function register(e) {
        e.preventDefault();
        try {
            setLoading(true);

            if (!termsRead[0]) {
                throw Error('Please accept the terms and conditions.')
            }

            if (password[0] !== repeatPassword[0]) {
                throw Error("Passwords don't match")
            }

            if (!days.includes(day[0])) {
                throw Error('Invalid date')
            }

            const birthDate = `${year}-${month}-${day[0]}`;
            postData(process.env.REACT_APP_HOST + '/api/user/register', {
                email: email[0],
                password: password[0],
                firstName: firstName[0],
                lastName: lastName[0],
                sex: sex[0],
                secretUgbPassword: secretUgbPassword[0],
                birthDate: birthDate,
            }).then(data => {
                if (data.success) {
                    setUserRegistered(true);
                    setLoading(false);
                } else {
                    setAlert('Register Error');
                    setLoading(false);
                }
            }, err => {
                setAlert(err.message);
                setLoading(false);
            })
        } catch (err) {
            setAlert(err.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (loading) {
            setSubmitDisabled(true);
            return;
        }

        if (!passwordPassed[0] || !repeatPasswordPassed[0] || !emailPassed[0] || !firstNamePassed[0] || !lastNamePassed[0]) {
            setSubmitDisabled(true);
        } else {
            if (!password[0] || !repeatPassword[0] || !email[0] || !firstName[0] || !lastName[0] || !secretUgbPassword[0] || !days.includes(day[0]) || !termsRead[0]) {
                setSubmitDisabled(true);
                return;
            }
            setSubmitDisabled(false);
        }
    }, [password[0], passwordPassed[0], repeatPassword[0], repeatPasswordPassed[0], email[0], emailPassed[0], firstName[0], firstNamePassed[0], lastName[0], lastNamePassed[0], loading, secretUgbPassword[0], days, day[0], termsRead[0]])

    useEffect(() => {
        setAlert('');
    }, [password[0], repeatPassword[0], email[0], firstName[0], lastName[0], secretUgbPassword[0]]);

    return (
        <form className={styles.form} onSubmit={register}>
            <UGBModal
                open={userRegistered}
                maxWidth='xs'
            >
                <>
                    <div className={styles.requestSentTitle}>
                        <UGBLabel variant='h4'>
                            User registered successfully.
                        </UGBLabel>
                        <UGBLabel variant='subtitle1'>
                            Please check your email in order to verify registration.
                        </UGBLabel>
                    </div>
                    <div className={styles.closeBtnContainer}>
                        <UGBButton
                            btnType='secondary'
                            onClick={() => history.push('/home')}
                        >
                            Close
                        </UGBButton>
                    </div>
                </>
            </UGBModal>
            <UGBModal
                open={showModal}
                onClose={() => setShowModal(false)}
            >
                <GetTermsAndConditionsDialog onClose={() => setShowModal(false)} />
            </UGBModal>
            <div className={styles.formTitle}>
                <UGBLabel variant='h5'>
                    Sign Up
                </UGBLabel>
                <UGBLabel variant='subtitle2'>
                    It's quick and easy.
                </UGBLabel>
            </div>

            <UGBHr type='horizontal' />
            <div className={styles.inputs}>
                <UGBIconInput
                    $value={firstName}
                    validator={dataValidators.validateNames}
                    validatorPassed={firstNamePassed}
                    required
                    label='First name'
                    startIcon='fa-solid fa-file-signature'
                />
                <UGBIconInput
                    $value={lastName}
                    validator={dataValidators.validateNames}
                    validatorPassed={lastNamePassed}
                    required
                    label='Last name'
                    startIcon='fa-solid fa-file-signature'
                />
            </div>
            <UGBIconInput
                $value={email}
                required
                label='Email'
                startIcon='fas fa-envelope'
                validator={dataValidators.validateEmail}
                validatorPassed={emailPassed}
            />
            <UGBPasswordInput
                $value={secretUgbPassword}
                required
                label='Secret UGB password'
                startIcon='fas fa-lock'
            />
            <div className={styles.inputs}>
                <UGBPasswordInput
                    $value={password}
                    required
                    label='Password'
                    startIcon='fas fa-lock'
                    validator={dataValidators.validatePassword}
                    validatorPassed={passwordPassed}
                />
                <UGBPasswordInput
                    $value={repeatPassword}
                    required
                    label='Repeat password'
                    startIcon='fas fa-lock'
                    validator={dataValidators.validatePassword}
                    validatorPassed={repeatPasswordPassed}
                />
            </div>
            <UGBLabel
                variant='subtitle1'
                style={customStyles.birthDate}
            >
                Birthday
            </UGBLabel>
            <div className={styles.inputs}>
                <UGBSelect label='' value={month} onChange={onChangeMonth}>
                    {months.map(x => {
                        return (
                            <UGBMenuItem key={x} value={x}>
                                {monthsLabel[x]}
                            </UGBMenuItem>
                        )
                    })}
                </UGBSelect>
                <UGBSelect label='' $value={day}>
                    {days.map(x => {
                        return (
                            <UGBMenuItem key={x} value={x}>
                                {x}
                            </UGBMenuItem>
                        )
                    })}
                </UGBSelect>
                <UGBSelect label='' value={year} onChange={changeYear}>
                    {years.map(x => {
                        return (
                            <UGBMenuItem key={x} value={x}>
                                {x}
                            </UGBMenuItem>
                        )
                    })}
                </UGBSelect>
            </div>
            <UGBRadioButtonsGroup
                label="Sex:"
                display='inline'
                $checkedValue={sex}
                customMap={() => {
                    return (
                        <>
                            <FormControlLabel key={'male'} value={'male'} control={<Radio />} label={<i className={clsx("fas fa-mars", styles.icon, styles.radioIcon)} />} />
                            <FormControlLabel key={'female'} value={'female'} control={<Radio />} label={<i className={clsx("fas fa-venus", styles.icon, styles.radioIcon)} />} />
                        </>
                    );
                }}
            />
            <div className={styles.termsAndConditions}>
                <UGBCheckbox
                    $value={termsRead}
                    label='I accept the'
                />
                <UGBLink
                    label='Terms and conditions'
                    color='blue'
                    onClick={(e) => {
                        e.preventDefault();
                        setShowModal(true);
                    }}
                />
            </div>
            <div>
                <UGBLink
                    label='Return to login page'
                    color='blue'
                    onClick={(e) => {
                        e.preventDefault();
                        history.push('/sign-in');
                    }}
                />
            </div>
            <BrandAlert minHeight={20}>{alert}</BrandAlert>
            <div className={styles.actions}>
                <UGBButton
                    type='submit'
                    btnType='primary'
                    disabled={submitDisabled}
                >
                    {loading ? <UGBLoaderDots /> : 'Sign Up'}
                </UGBButton>
            </div>
        </form>
    );
};

const CreateNewAccount = () => {
    const styles = useStyles();
    return (
        <div
            style={{
                backgroundImage: `url(./indoorBike.svg)`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '50% 90%'
            }}
            className={styles.createNewAccountContainer}
        >
            <div className={styles.createNewAccountFormAndLogo}>
                <div className={styles.logo}>
                    <img src={logoNoBackgroundWithSlogan} alt="Logo" className={styles.image} />
                </div>
                <Register />


            </div>
        </div>
    );
};

export default CreateNewAccount;

const TermsAndConditions = () => {
    return (
        <div>
            <br />WEBSITE TERMS AND CONDITIONS TEMPLATE
            <br />Last updated [month day, year]
            <br />________________________________________
            <br />
            <br />AGREEMENT TO TERMS
            <br />
            <br />These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and [business entity name] (“we,” “us” or “our”), concerning your access to and use of the [website name.com] website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).
            <br />
            <br />You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms and Conditions. If you do not agree with all of these Terms and Conditions, then you are expressly prohibited from using the Site and you must discontinue use immediately.
            <br />
            <br />Supplemental terms and conditions or documents that may be posted on the Site from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms and Conditions at any time and for any reason.
            <br />
            <br />	We will alert you about any changes by updating the “Last updated” date of these Terms and Conditions, and you waive any right to receive specific notice of each such change.
            <br />
            <br />
            <br />
            <br />
            <br />It is your responsibility to periodically review these Terms and Conditions to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms and Conditions by your continued use of the Site after the date such revised Terms and Conditions are posted.
            <br />
            <br />The information provided on the Site is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country.
            <br />
            <br />Accordingly, those persons who choose to access the Site from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
            <br />
            <br />These terms and conditions were created using Termly.
            <br />
            <br />Option 1: The Site is intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to register for the Site.
            <br />
            <br />Option 2: [The Site is intended for users who are at least 13 years of age.] All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly supervised by, their parent or guardian to use the Site. If you are a minor, you must have your parent or guardian read and agree to these Terms and Conditions prior to you using the Site.
            <br />
            <br />INTELLECTUAL PROPERTY RIGHTS
            <br />
            <br />Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, foreign jurisdictions, and international conventions.
            <br />
            <br />The Content and the Marks are provided on the Site “AS IS” for your information and personal use only. Except as expressly provided in these Terms and Conditions, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
            <br />
            <br />Provided that you are eligible to use the Site, you are granted a limited license to access and use the Site and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you in and to the Site, the Content and the Marks.
            <br />
            <br />USER REPRESENTATIONS
            <br />
            <br />By using the Site, you represent and warrant that:
            <br />
            <br />[(1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary;]
            <br />
            <br />(3) you have the legal capacity and you agree to comply with these Terms and Conditions;
            <br />
            <br />[(4) you are not under the age of 13;]
            <br />
            <br />(5) not a minor in the jurisdiction in which you reside[, or if a minor, you have received parental permission to use the Site];
            <br />
            <br />(6) you will not access the Site through automated or non-human means, whether through a bot, script, or otherwise;
            <br />
            <br />(7) you will not use the Site for any illegal or unauthorized purpose;
            <br />
            <br />(8) your use of the Site will not violate any applicable law or regulation.
            <br />
            <br />If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Site (or any portion thereof).
            <br />
            <br />USER REGISTRATION
            <br />
            <br />You may be required to register with the Site. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
            <br />
            <br />PROHIBITED ACTIVITIES
            <br />
            <br />You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
            <br />
            <br />As a user of the Site, you agree not to:
            <br />
            <br />1.	systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.
            <br />2.	make any unauthorized use of the Site, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.
            <br />3.	use a buying agent or purchasing agent to make purchases on the Site.
            <br />4.	use the Site to advertise or offer to sell goods and services.
            <br />5.	circumvent, disable, or otherwise interfere with security-related features of the Site, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Site and/or the Content contained therein.
            <br />6.	engage in unauthorized framing of or linking to the Site.
            <br />7.	trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords;
            <br />8.	make improper use of our support services or submit false reports of abuse or misconduct.
            <br />9.	engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.
            <br />10.	interfere with, disrupt, or create an undue burden on the Site or the networks or services connected to the Site.
            <br />11.	attempt to impersonate another user or person or use the username of another user.
            <br />12.	sell or otherwise transfer your profile.
            <br />13.	use any information obtained from the Site in order to harass, abuse, or harm another person.
            <br />14.	use the Site as part of any effort to compete with us or otherwise use the Site and/or the Content for any revenue-generating endeavor or commercial enterprise.
            <br />15.	decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Site.
            <br />16.	attempt to bypass any measures of the Site designed to prevent or restrict access to the Site, or any portion of the Site.
            <br />17.	harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Site to you.
            <br />18.	delete the copyright or other proprietary rights notice from any Content.
            <br />19.	copy or adapt the Site’s software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.
            <br />20.	upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party’s uninterrupted use and enjoyment of the Site or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Site.
            <br />21.	upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats (“gifs”), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as “spyware” or “passive collection mechanisms” or “pcms”).
            <br />22.	except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Site, or using or launching any unauthorized script or other software.
            <br />23.	disparage, tarnish, or otherwise harm, in our opinion, us and/or the Site.
            <br />24.	use the Site in a manner inconsistent with any applicable laws or regulations.
            <br />25.	[other]
            <br />
            <br />USER GENERATED CONTRIBUTIONS
            <br />
            <br />The Site may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Site, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions").
            <br />
            <br />Contributions may be viewable by other users of the Site and through third-party websites. As such, any Contributions you transmit may be treated as non-confidential and non-proprietary. When you create or make available any Contributions, you thereby represent and warrant that:
            <br />
            <br />1.	the creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.
            <br />2.	you are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Site, and other users of the Site to use your Contributions in any manner contemplated by the Site and these Terms and Conditions.
            <br />3.	you have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness of each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Site and these Terms and Conditions.
            <br />4.	your Contributions are not false, inaccurate, or misleading.
            <br />5.	your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.
            <br />6.	your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable (as determined by us).
            <br />7.	your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.
            <br />8.	your Contributions do not advocate the violent overthrow of any government or incite, encourage, or threaten physical harm against another.
            <br />9.	your Contributions do not violate any applicable law, regulation, or rule.
            <br />10.	your Contributions do not violate the privacy or publicity rights of any third party.
            <br />11.	your Contributions do not contain any material that solicits personal information from anyone under the age of 18 or exploits people under the age of 18 in a sexual or violent manner.
            <br />12.	your Contributions do not violate any federal or state law concerning child pornography, or otherwise intended to protect the health or well-being of minors;
            <br />13.	your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.
            <br />14.	your Contributions do not otherwise violate, or link to material that violates, any provision of these Terms and Conditions, or any applicable law or regulation.
            <br />
            <br />Any use of the Site in violation of the foregoing violates these Terms and Conditions and may result in, among other things, termination or suspension of your rights to use the Site.
            <br />
            <br />CONTRIBUTION LICENSE
            <br />
            <br />By posting your Contributions to any part of the Site [or making Contributions accessible to the Site by linking your account from the Site to any of your social networking accounts], you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions (including, without limitation, your image and voice) for any purpose, commercial, advertising, or otherwise, and to prepare derivative works of, or incorporate into other works, such Contributions, and grant and authorize sublicenses of the foregoing. The use and distribution may occur in any media formats and through any media channels.
            <br />
            <br />This license will apply to any form, media, or technology now known or hereafter developed, and includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide. You waive all moral rights in your Contributions, and you warrant that moral rights have not otherwise been asserted in your Contributions.
            <br />
            <br />We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area on the Site.
            <br />
            <br />You are solely responsible for your Contributions to the Site and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.
            <br />
            <br />We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise change any Contributions; (2) to re-categorize any Contributions to place them in more appropriate locations on the Site; and (3) to pre-screen or delete any Contributions at any time and for any reason, without notice. We have no obligation to monitor your Contributions.
            <br />
            <br />GUIDELINES FOR REVIEWS
            <br />
            <br />We may provide you areas on the Site to leave reviews or ratings. When posting a review, you must comply with the following criteria:
            <br />
            <br />(1) you should have firsthand experience with the person/entity being reviewed;
            <br />
            <br />(2) your reviews should not contain offensive profanity, or abusive, racist, offensive, or hate language;
            <br />
            <br />(3) your reviews should not contain discriminatory references based on religion, race, gender, national origin, age, marital status, sexual orientation, or disability;
            <br />
            <br />(4) your reviews should not contain references to illegal activity;
            <br />
            <br />(5) you should not be affiliated with competitors if posting negative reviews;
            <br />
            <br />(6) you should not make any conclusions as to the legality of conduct;
            <br />
            <br />(7) you may not post any false or misleading statements;
            <br />
            <br />(8) you may not organize a campaign encouraging others to post reviews, whether positive or negative.
            <br />
            <br />We may accept, reject, or remove reviews in our sole discretion. We have absolutely no obligation to screen reviews or to delete reviews, even if anyone considers reviews objectionable or inaccurate. Reviews are not endorsed by us, and do not necessarily represent our opinions or the views of any of our affiliates or partners.
            <br />
            <br />We do not assume liability for any review or for any claims, liabilities, or losses resulting from any review. By posting a review, you hereby grant to us a perpetual, non-exclusive, worldwide, royalty-free, fully-paid, assignable, and sublicensable right and license to reproduce, modify, translate, transmit by any means, display, perform, and/or distribute all content relating to reviews.
            <br />
            <br />MOBILE APPLICATION LICENSE
            <br />
            <br />Use License
            <br />If you access the Site via a mobile application, then we grant you a revocable, non-exclusive, non-transferable, limited right to install and use the mobile application on wireless electronic devices owned or controlled by you, and to access and use the mobile application on such devices strictly in accordance with the terms and conditions of this mobile application license contained in these Terms and Conditions.
            <br />
            <br />You shall not:
            <br />
            <br />(1) decompile, reverse engineer, disassemble, attempt to derive the source code of, or decrypt the application;
            <br />
            <br />(2) make any modification, adaptation, improvement, enhancement, translation, or derivative work from the application;
            <br />
            <br />(3) violate any applicable laws, rules, or regulations in connection with your access or use of the application;
            <br />
            <br />(4) remove, alter, or obscure any proprietary notice (including any notice of copyright or trademark) posted by us or the licensors of the application;
            <br />
            <br />(5) use the application for any revenue generating endeavor, commercial enterprise, or other purpose for which it is not designed or intended;
            <br />
            <br />(6) make the application available over a network or other environment permitting access or use by multiple devices or users at the same time;
            <br />
            <br />(7) use the application for creating a product, service, or software that is, directly or indirectly, competitive with or in any way a substitute for the application;
            <br />
            <br />(8) use the application to send automated queries to any website or to send any unsolicited commercial e-mail;
            <br />
            <br />(9) use any proprietary information or any of our interfaces or our other intellectual property in the design, development, manufacture, licensing, or distribution of any applications, accessories, or devices for use with the application.
            <br />
            <br />Apple and Android Devices
            <br />The following terms apply when you use a mobile application obtained from either the Apple Store or Google Play (each an “App Distributor”) to access the Site:
            <br />
            <br />(1) the license granted to you for our mobile application is limited to a non-transferable license to use the application on a device that utilizes the Apple iOS or Android operating systems, as applicable, and in accordance with the usage rules set forth in the applicable App Distributor’s terms of service;
            <br />
            <br />(2) we are responsible for providing any maintenance and support services with respect to the mobile application as specified in the terms and conditions of this mobile application license contained in these Terms and Conditions or as otherwise required under applicable law, and you acknowledge that each App Distributor has no obligation whatsoever to furnish any maintenance and support services with respect to the mobile application;
            <br />
            <br />(3) in the event of any failure of the mobile application to conform to any applicable warranty, you may notify the applicable App Distributor, and the App Distributor, in accordance with its terms and policies, may refund the purchase price, if any, paid for the mobile application, and to the maximum extent permitted by applicable law, the App Distributor will have no other warranty obligation whatsoever with respect to the mobile application;
            <br />
            <br />(4) you represent and warrant that (i) you are not located in a country that is subject to a U.S. government embargo, or that has been designated by the U.S. government as a “terrorist supporting” country and (ii) you are not listed on any U.S. government list of prohibited or restricted parties;
            <br />
            <br />(5) you must comply with applicable third-party terms of agreement when using the mobile application, e.g., if you have a VoIP application, then you must not be in violation of their wireless data service agreement when using the mobile application;
            <br />
            <br />(6) you acknowledge and agree that the App Distributors are third-party beneficiaries of the terms and conditions in this mobile application license contained in these Terms and Conditions, and that each App Distributor will have the right (and will be deemed to have accepted the right) to enforce the terms and conditions in this mobile application license contained in these Terms and Conditions against you as a third-party beneficiary thereof.
            <br />
            <br />SOCIAL MEDIA
            <br />
            <br />As part of the functionality of the Site, you may link your account with online accounts you have with third-party service providers (each such account, a “Third-Party Account”) by either: (1) providing your Third-Party Account login information through the Site; or (2) allowing us to access your Third-Party Account, as is permitted under the applicable terms and conditions that govern your use of each Third-Party Account.
            <br />
            <br />You represent and warrant that you are entitled to disclose your Third-Party Account login information to us and/or grant us access to your Third-Party Account, without breach by you of any of the terms and conditions that govern your use of the applicable Third-Party Account, and without obligating us to pay any fees or making us subject to any usage limitations imposed by the third-party service provider of the Third-Party Account.
            <br />
            <br />By granting us access to any Third-Party Accounts, you understand that (1) we may access, make available, and store (if applicable) any content that you have provided to and stored in your Third-Party Account (the “Social Network Content”) so that it is available on and through the Site via your account, including without limitation any friend lists and (2) we may submit to and receive from your Third-Party Account additional information to the extent you are notified when you link your account with the Third-Party Account.
            <br />
            <br />Depending on the Third-Party Accounts you choose and subject to the privacy settings that you have set in such Third-Party Accounts, personally identifiable information that you post to your Third-Party Accounts may be available on and through your account on the Site.
            <br />
            <br />Please note that if a Third-Party Account or associated service becomes unavailable or our access to such Third-Party Account is terminated by the third-party service provider, then Social Network Content may no longer be available on and through the Site. You will have the ability to disable the connection between your account on the Site and your Third-Party Accounts at any time.
            <br />
            <br />PLEASE NOTE THAT YOUR RELATIONSHIP WITH THE THIRD-PARTY SERVICE PROVIDERS ASSOCIATED WITH YOUR THIRD-PARTY ACCOUNTS IS GOVERNED SOLELY BY YOUR AGREEMENT(S) WITH SUCH THIRD-PARTY SERVICE PROVIDERS.
            <br />We make no effort to review any Social Network Content for any purpose, including but not limited to, for accuracy, legality, or non-infringement, and we are not responsible for any Social Network Content.
            <br />
            <br />You acknowledge and agree that we may access your email address book associated with a Third-Party Account and your contacts list stored on your mobile device or tablet computer solely for purposes of identifying and informing you of those contacts who have also registered to use the Site.
            <br />
            <br />You can deactivate the connection between the Site and your Third-Party Account by contacting us using the contact information below or through your account settings (if applicable). We will attempt to delete any information stored on our servers that was obtained through such Third-Party Account, except the username and profile picture that become associated with your account.
            <br />
            <br />SUBMISSIONS
            <br />
            <br />You acknowledge and agree that any questions, comments, suggestions, ideas, feedback, or other information regarding the Site ("Submissions") provided by you to us are non-confidential and shall become our sole property. We shall own exclusive rights, including all intellectual property rights, and shall be entitled to the unrestricted use and dissemination of these Submissions for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.
            <br />
            <br />You hereby waive all moral rights to any such Submissions, and you hereby warrant that any such Submissions are original with you or that you have the right to submit such Submissions. You agree there shall be no recourse against us for any alleged or actual infringement or misappropriation of any proprietary right in your Submissions.
            <br />
            <br />
            <br />THIRD-PARTY WEBSITES AND CONTENT
            <br />
            <br />The Site may contain (or you may be sent via the Site) links to other websites ("Third-Party Websites") as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties ("Third-Party Content").
            <br />
            <br />Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Site or any Third-Party Content posted on, available through, or installed from the Site, including the content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or contained in the Third-Party Websites or the Third-Party Content.
            <br />
            <br />Inclusion of, linking to, or permitting the use or installation of any Third-Party Websites or any Third-Party Content does not imply approval or endorsement thereof by us. If you decide to leave the Site and access the Third-Party Websites or to use or install any Third-Party Content, you do so at your own risk, and you should be aware these Terms and Conditions no longer govern.
            <br />
            <br />You should review the applicable terms and policies, including privacy and data gathering practices, of any website to which you navigate from the Site or relating to any applications you use or install from the Site. Any purchases you make through Third-Party Websites will be through other websites and from other companies, and we take no responsibility whatsoever in relation to such purchases which are exclusively between you and the applicable third party.
            <br />
            <br />You agree and acknowledge that we do not endorse the products or services offered on Third-Party Websites and you shall hold us harmless from any harm caused by your purchase of such products or services. Additionally, you shall hold us harmless from any losses sustained by you or harm caused to you relating to or resulting in any way from any Third-Party Content or any contact with Third-Party Websites.
            <br />
            <br />ADVERTISERS
            <br />
            <br />We allow advertisers to display their advertisements and other information in certain areas of the Site, such as sidebar advertisements or banner advertisements. If you are an advertiser, you shall take full responsibility for any advertisements you place on the Site and any services provided on the Site or products sold through those advertisements.
            <br />
            <br />Further, as an advertiser, you warrant and represent that you possess all rights and authority to place advertisements on the Site, including, but not limited to, intellectual property rights, publicity rights, and contractual rights.
            <br />
            <br />[As an advertiser, you agree that such advertisements are subject to our Digital Millennium Copyright Act (“DMCA”) Notice and Policy provisions as described below, and you understand and agree there will be no refund or other compensation for DMCA takedown-related issues.] We simply provide the space to place such advertisements, and we have no other relationship with advertisers.
            <br />
            <br />SITE MANAGEMENT
            <br />
            <br />We reserve the right, but not the obligation, to:
            <br />
            <br />(1) monitor the Site for violations of these Terms and Conditions;
            <br />
            <br />(2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms and Conditions, including without limitation, reporting such user to law enforcement authorities;
            <br />
            <br />(3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof;
            <br />
            <br />(4) in our sole discretion and without limitation, notice, or liability, to remove from the Site or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems;
            <br />
            <br />(5) otherwise manage the Site in a manner designed to protect our rights and property and to facilitate the proper functioning of the Site.
            <br />
            <br />PRIVACY POLICY
            <br />
            <br />We care about data privacy and security. Please review our Privacy Policy [CLICK HERE]/posted on the Site]. By using the Site, you agree to be bound by our Privacy Policy, which is incorporated into these Terms and Conditions. Please be advised the Site is hosted in the United States.
            <br />
            <br />If you access the Site from the European Union, Asia, or any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in the United States, then through your continued use of the Site, you are transferring your data to the United States, and you expressly consent to have your data transferred to and processed in the United States.
            <br />
            <br />[Further, we do not knowingly accept, request, or solicit information from children or knowingly market to children. Therefore, in accordance with the U.S. Children’s Online Privacy Protection Act, if we receive actual knowledge that anyone under the age of 13 has provided personal information to us without the requisite and verifiable parental consent, we will delete that information from the Site as quickly as is reasonably practical.]
            <br />
            <br />DIGITAL MILLENNIUM COPYRIGHT ACT (DMCA) NOTICE AND POLICY
            <br />
            <br />Notifications
            <br />
            <br />We respect the intellectual property rights of others. If you believe that any material available on or through the Site infringes upon any copyright you own or control, please immediately notify our Designated Copyright Agent using the contact information provided below (a “Notification”).
            <br />
            <br />A copy of your Notification will be sent to the person who posted or stored the material addressed in the Notification. Please be advised that pursuant to federal law you may be held liable for damages if you make material misrepresentations in a Notification. Thus, if you are not sure that material located on or linked to by the Site infringes your copyright, you should consider first contacting an attorney.
            <br />
            <br />All Notifications should meet the requirements of DMCA 17 U.S.C. § 512(c)(3) and include the following information:
            <br />
            <br />(1) A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed;
            <br />
            <br />(2) identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works on the Site are covered by the Notification, a representative list of such works on the Site;
            <br />
            <br />(3) identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the material;
            <br />
            <br />(4) information reasonably sufficient to permit us to contact the complaining party, such as an address, telephone number, and, if available, an email address at which the complaining party may be contacted;
            <br />
            <br />(5) a statement that the complaining party has a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law;
            <br />
            <br />(6) a statement that the information in the notification is accurate, and under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed upon.
            <br />
            <br />Counter Notification
            <br />
            <br />If you believe your own copyrighted material has been removed from the Site as a result of a mistake or misidentification, you may submit a written counter notification to [us/our Designated Copyright Agent] using the contact information provided below (a “Counter Notification”).
            <br />
            <br />To be an effective Counter Notification under the DMCA, your Counter Notification must include substantially the following:
            <br />
            <br />(1) identification of the material that has been removed or disabled and the location at which the material appeared before it was removed or disabled;
            <br />
            <br />(2) a statement that you consent to the jurisdiction of the Federal District Court in which your address is located, or if your address is outside the United States, for any judicial district in which we are located;
            <br />
            <br />(3) a statement that you will accept service of process from the party that filed the Notification or the party's agent;
            <br />
            <br />(4) your name, address, and telephone number;
            <br />
            <br />(5) a statement under penalty of perjury that you have a good faith belief that the material in question was removed or disabled as a result of a mistake or misidentification of the material to be removed or disabled;
            <br />
            <br />(6) your physical or electronic signature.
            <br />
            <br />If you send us a valid, written Counter Notification meeting the requirements described above, we will restore your removed or disabled material, unless we first receive notice from the party filing the Notification informing us that such party has filed a court action to restrain you from engaging in infringing activity related to the material in question.
            <br />
            <br />Please note that if you materially misrepresent that the disabled or removed content was removed by mistake or misidentification, you may be liable for damages, including costs and attorney's fees. Filing a false Counter Notification constitutes perjury.
            <br />
            <br />Designated Copyright Agent
            <br />[Name]
            <br />Attn: Copyright Agent
            <br />[Address]
            <br />[City, State Zip]
            <br />[email]
            <br />
            <br />COPYRIGHT INFRINGEMENTS
            <br />
            <br />We respect the intellectual property rights of others. If you believe that any material available on or through the Site infringes upon any copyright you own or control, please immediately notify us using the contact information provided below (a “Notification”). A copy of your Notification will be sent to the person who posted or stored the material addressed in the Notification.
            <br />
            <br />Please be advised that pursuant to federal law you may be held liable for damages if you make material misrepresentations in a Notification. Thus, if you are not sure that material located on or linked to by the Site infringes your copyright, you should consider first contacting an attorney.]
            <br />
            <br />TERM AND TERMINATION
            <br />
            <br />These Terms and Conditions shall remain in full force and effect while you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS AND CONDITIONS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS AND CONDITIONS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SITE OR DELETE [YOUR ACCOUNT AND] ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
            <br />
            <br />If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party.
            <br />
            <br />In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.
            <br />
            <br />MODIFICATIONS AND INTERRUPTIONS
            <br />
            <br />We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site. We also reserve the right to modify or discontinue all or part of the Site without notice at any time.
            <br />
            <br />We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site.
            <br />
            <br />We cannot guarantee the Site will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Site, resulting in interruptions, delays, or errors.
            <br />
            <br />We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Site at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Site during any downtime or discontinuance of the Site.
            <br />
            <br />Nothing in these Terms and Conditions will be construed to obligate us to maintain and support the Site or to supply any corrections, updates, or releases in connection therewith.
            <br />
            <br />GOVERNING LAW
            <br />
            <br />These Terms and Conditions and your use of the Site are governed by and construed in accordance with the laws of the State of [name of state] applicable to agreements made and to be entirely performed within the State/Commonwealth of [name of state], without regard to its conflict of law principles.
            <br />
            <br />DISPUTE RESOLUTION
            <br />
            <br />Option 1: Any legal action of whatever nature brought by either you or us (collectively, the “Parties” and individually, a “Party”) shall be commenced or prosecuted in the state and federal courts located in [name of county] County, [name of state], and the Parties hereby consent to, and waive all defenses of lack of personal jurisdiction and forum non conveniens with respect to venue and jurisdiction in such state and federal courts.
            <br />
            <br />
            <br />Application of the United Nations Convention on Contracts for the International Sale of Goods and the Uniform Computer Information Transaction Act (UCITA) are excluded from these Terms and Conditions. In no event shall any claim, action, or proceeding brought by either Party related in any way to the Site be commenced more than ______ years after the cause of action arose.
            <br />
            <br />Option 2: Informal Negotiations
            <br />To expedite resolution and control the cost of any dispute, controversy, or claim related to these Terms and Conditions (each a "Dispute" and collectively, the “Disputes”) brought by either you or us (individually, a “Party” and collectively, the “Parties”), the Parties agree to first attempt to negotiate any Dispute (except those Disputes expressly provided below) informally for at least ______ days before initiating arbitration. Such informal negotiations commence upon written notice from one Party to the other Party.
            <br />
            <br />Binding Arbitration
            <br />If the Parties are unable to resolve a Dispute through informal negotiations, the Dispute (except those Disputes expressly excluded below) will be finally and exclusively resolved by binding arbitration. YOU UNDERSTAND THAT WITHOUT THIS PROVISION, YOU WOULD HAVE THE RIGHT TO SUE IN COURT AND HAVE A JURY TRIAL.
            <br />
            <br />The arbitration shall be commenced and conducted under the Commercial Arbitration Rules of the American Arbitration Association ("AAA") and, where appropriate, the AAA’s Supplementary Procedures for Consumer Related Disputes ("AAA Consumer Rules"), both of which are available at the AAA website www.adr.org.
            <br />
            <br />Your arbitration fees and your share of arbitrator compensation shall be governed by the AAA Consumer Rules and, where appropriate, limited by the AAA Consumer Rules. [If such costs are determined to by the arbitrator to be excessive, we will pay all arbitration fees and expenses.]
            <br />
            <br />The arbitration may be conducted in person, through the submission of documents, by phone, or online. The arbitrator will make a decision in writing, but need not provide a statement of reasons unless requested by either Party.
            <br />
            <br />The arbitrator must follow applicable law, and any award may be challenged if the arbitrator fails to do so. Except where otherwise required by the applicable AAA rules or applicable law, the arbitration will take place in [name of county] County, [name of state].
            <br />
            <br />Except as otherwise provided herein, the Parties may litigate in court to compel arbitration, stay proceedings pending arbitration, or to confirm, modify, vacate, or enter judgment on the award entered by the arbitrator.
            <br />
            <br />If for any reason, a Dispute proceeds in court rather than arbitration, the Dispute shall be commenced or prosecuted in the state and federal courts located in [name of county] County, [name of state], and the Parties hereby consent to, and waive all defenses of lack of personal jurisdiction, and forum non conveniens with respect to venue and jurisdiction in such state and federal courts.
            <br />
            <br />Application of the United Nations Convention on Contracts for the International Sale of Goods and the the Uniform Computer Information Transaction Act (UCITA) are excluded from these Terms and Conditions.
            <br />
            <br />In no event shall any Dispute brought by either Party related in any way to the Site be commenced more than _____ years after the cause of action arose. If this provision is found to be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute falling within that portion of this provision found to be illegal or unenforceable and such Dispute shall be decided by a court of competent jurisdiction within the courts listed for jurisdiction above, and the Parties agree to submit to the personal jurisdiction of that court.
            <br />
            <br />
            <br />Option 3: Binding Arbitration
            <br />To expedite resolution and control the cost of any dispute, controversy or claim related to these Terms and Conditions (each a "Dispute" and collectively, “Disputes”), any Dispute brought by either you or us (individually, a “Party” and collectively, the “Parties”) shall be finally and exclusively resolved by binding arbitration.
            <br />
            <br />YOU UNDERSTAND THAT WITHOUT THIS PROVISION, YOU WOULD HAVE THE RIGHT TO SUE IN COURT AND HAVE A JURY TRIAL. The arbitration shall be commenced and conducted under the Commercial Arbitration Rules of the American Arbitration Association ("AAA") and, where appropriate, the AAA’s Supplementary Procedures for Consumer Related Disputes ("AAA Consumer Rules"), both of which are available at the AAA website www.adr.org.
            <br />
            <br />Your arbitration fees and your share of arbitrator compensation shall be governed by the AAA Consumer Rules and, where appropriate, limited by the AAA Consumer Rules. [If such costs are determined to by the arbitrator to be excessive, we will pay all arbitration fees and expenses.]
            <br />
            <br />The arbitration may be conducted in person, through the submission of documents, by phone, or online. The arbitrator will make a decision in writing, but need not provide a statement of reasons unless requested by either Party. The arbitrator must follow applicable law, and any award may be challenged if the arbitrator fails to do so.
            <br />
            <br />Except where otherwise required by the applicable AAA rules or applicable law, the arbitration will take place in [name of county] County, [name of state]. Except as otherwise provided herein, the Parties may litigate in court to compel arbitration, stay proceedings pending arbitration, or to confirm, modify, vacate, or enter judgment on the award entered by the arbitrator.
            <br />
            <br />If for any reason, a Dispute proceeds in court rather than arbitration, the Dispute shall be commenced or prosecuted in the state and federal courts located in [name of county] County, [name of state], and the Parties hereby consent to, and waive all defenses of lack of, personal jurisdiction, and forum non conveniens with respect to venue and jurisdiction in such state and federal courts.
            <br />
            <br />Application of the United Nations Convention on Contracts for the International Sale of Goods and the Uniform Computer Information Transaction Act (UCITA) are excluded from these Terms and Conditions. In no event shall any Dispute brought by either Party related in any way to the Site or Services be commenced more than ______ years after the cause of action arose.
            <br />
            <br />If this provision is found to be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute falling within that portion of this provision found to be illegal or unenforceable and such Dispute shall be decided by a court of competent jurisdiction within the courts listed for jurisdiction above, and the Parties agree to submit to the personal jurisdiction of that court.
            <br />
            <br />Option 2/Option 3: Restrictions
            <br />The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the full extent permitted by law, (a) no arbitration shall be joined with any other proceeding; (b) there is no right or authority for any Dispute to be arbitrated on a class-action basis or to utilize class action procedures; and (c) there is no right or authority for any Dispute to be brought in a purported representative capacity on behalf of the general public or any other persons.
            <br />
            <br />Option 2/Option 3: Exceptions to [Informal Negotiations and] Arbitration
            <br />The Parties agree that the following Disputes are not subject to the above provisions concerning [informal negotiations and] binding arbitration: (a) any Disputes seeking to enforce or protect, or concerning the validity of, any of the intellectual property rights of a Party; (b) any Dispute related to, or arising from, allegations of theft, piracy, invasion of privacy, or unauthorized use; and (c) any claim for injunctive relief.
            <br />
            <br />If this provision is found to be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute falling within that portion of this provision found to be illegal or unenforceable and such Dispute shall be decided by a court of competent jurisdiction within the courts listed for jurisdiction above, and the Parties agree to submit to the personal jurisdiction of that court.
            <br />
            <br />CORRECTIONS
            <br />
            <br />There may be information on the Site that contains typographical errors, inaccuracies, or omissions that may relate to the Site, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Site at any time, without prior notice.
            <br />
            <br />DISCLAIMER
            <br />
            <br />THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SITE’S CONTENT OR THE CONTENT OF ANY WEBSITES LINKED TO THE SITE AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SITE, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SITE, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SITE BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SITE. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SITE, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.
            <br />
            <br />AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
            <br />
            <br />LIMITATIONS OF LIABILITY
            <br />
            <br />IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            <br />
            <br />[NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO [THE LESSER OF] [THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE [_________] MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING [OR] [$_________]. CERTAIN STATE LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES.
            <br />
            <br />IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.]
            <br />
            <br />INDEMNIFICATION
            <br />
            <br />You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of: (1) [your Contributions]; (2) use of the Site; (3) breach of these Terms and Conditions; (4) any breach of your representations and warranties set forth in these Terms and Conditions; (5) your violation of the rights of a third party, including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of the Site with whom you connected via the Site.
            <br />
            <br />Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.
            <br />
            <br />USER DATA
            <br />
            <br />We will maintain certain data that you transmit to the Site for the purpose of managing the Site, as well as data relating to your use of the Site. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Site.
            <br />
            <br />You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.
            <br />
            <br />ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
            <br />
            <br />Visiting the Site, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Site, satisfy any legal requirement that such communication be in writing.
            <br />
            <br />YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SITE.
            <br />
            <br />You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.
            <br />
            <br />CALIFORNIA USERS AND RESIDENTS
            <br />
            <br />If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.
            <br />
            <br />
            <br />MISCELLANEOUS
            <br />
            <br />These Terms and Conditions and any policies or operating rules posted by us on the Site constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Terms and Conditions shall not operate as a waiver of such right or provision.
            <br />
            <br />These Terms and Conditions operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control.
            <br />
            <br />If any provision or part of a provision of these Terms and Conditions is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Terms and Conditions and does not affect the validity and enforceability of any remaining provisions.
            <br />
            <br />There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Terms and Conditions or use of the Site. You agree that these Terms and Conditions will not be construed against us by virtue of having drafted them.
            <br />
            <br />You hereby waive any and all defenses you may have based on the electronic form of these Terms and Conditions and the lack of signing by the parties hereto to execute these Terms and Conditions.
            <br />
            <br />
            <br />
            <br />
            <br />CONTACT US
            <br />
            <br />In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
            <br />
            <br />[Corporate Name]
            <br />[Corporate Address]
            <br />[Corporate Phone Number]
            <br />[Corporate Fax Number]
            <br />[Email Address]
        </div>
    );
}
