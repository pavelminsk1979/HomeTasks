import React, {ButtonHTMLAttributes, DetailedHTMLProps, MouseEventHandler} from 'react'
import s from './SuperButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    xType?: string
}

const SuperButton: React.FC<SuperButtonPropsType> = (
props
) => {
    const {xType, className, disabled, ...restProps} = props
    const finalClassName = s.button + (disabled
                 ? ' ' +s.disabled
               : xType === 'red'
                   ? ' '+s.red
                :xType ==='secondary'
            ? ' '+s.secondary
               : ' ' +s.default)
        + (className ? ' ' + className : '') // задачка на смешивание классов

    return (
        <button
            disabled={disabled}
            className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
}

export default SuperButton
