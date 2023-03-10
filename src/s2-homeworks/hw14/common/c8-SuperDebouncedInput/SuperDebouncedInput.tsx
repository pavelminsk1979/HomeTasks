import React, {DetailedHTMLProps, InputHTMLAttributes, ReactNode, useState} from 'react'
import SuperInputText from '../../../hw04/common/c1-SuperInputText/SuperInputText'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута, кроме type
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
export type SuperDebouncedInputPropsType = Omit<DefaultInputPropsType, 'type'> & {
    // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void  /* это то что в инпут ввели*/
    onEnter?: () => void
    error?: ReactNode
    spanClassName?: string
} // илм экспортировать тип SuperInputTextPropsType
    & { // плюс специальный пропс SuperPagination
    onDebouncedChange?: (value: string) => void
}

const SuperDebouncedInput: React.FC<SuperDebouncedInputPropsType> = (
    {
        onChangeText,
        onDebouncedChange,

        ...restProps // все остальные пропсы попадут в объект restProps
    }
) => {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)

    const onChangeTextCallback = (value: string) => {
        onChangeText && onChangeText(value) /* если есть пропс onChangeText, то передать ему value ибо   onChangeText  не обязателен*/

        if (onDebouncedChange) {
            timerId && clearInterval(timerId) /*если timerId имеется в useState тогда
            сделать сброс выполнения всего кода который внутри setTimeout*/


            const id = +setTimeout(() => {
              /*  букву одну в инпут ввел и через полторы секундв запустится onDebouncedChange(value), НО ЕСЛИ Я РАНЕЕ ЧЕМ ЧЕРЕЗ ПОЛТОРЫ СЕКУНДЫ ВВОЖУ ЕЩЕ ОДНУ БУКВУ тогда  обнуляется clearInterval(timerId) и готова запустится onDebouncedChange(value) вновь через полторы но уже с двумя буквами*/
                onDebouncedChange(value)
                setTimerId(undefined)
            }, 1500)


            setTimerId(id)
            // делает студент

            // остановить предыдущий таймер
            // запустить новый на 1500ms, в котором вызовется функция

            //
        }
    }

    return (
        <SuperInputText onChangeText={onChangeTextCallback} {...restProps}/>
    )
}

export default SuperDebouncedInput
