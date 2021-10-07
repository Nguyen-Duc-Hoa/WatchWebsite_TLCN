import React from 'react'
import { Steps } from 'antd';

const { Step } = Steps;
const state = [
    {
        key: 0,
        value: 'Waiting'
    },
    {
        key: 1,
        value: 'Confirmed'
    },
    {
        key: 2,
        value: 'Delivering'
    },
    {
        key: 3,
        value: 'WaitCompleteding'
    },
    {
        key: 4,
        value: 'Cancelled'
    },
]
function OrderState({ currentStep, setCurrentStep }) {
    return (
        <Steps current={currentStep} direction='vertical'>
            {
                state.map(({ key, value }) => (
                    <Step title={value} key={key} onClick={() => setCurrentStep && setCurrentStep(key)} />
                ))
            }
        </Steps>
    )
}

export default OrderState
