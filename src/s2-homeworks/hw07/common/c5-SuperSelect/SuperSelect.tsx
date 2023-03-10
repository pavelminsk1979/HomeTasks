import React, {
    SelectHTMLAttributes,
    DetailedHTMLProps,
    ChangeEvent,
} from 'react'
import s from './SuperSelect.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = ({
    options,
    className,
    onChange,
    onChangeOption,
    ...restProps
}) => {
    const mappedOptions: any[] = options
        ? options.map((o) => (
              <option
                  id={'hw7-option-' + o.id}
                  className={s.option}
                  key={o.id}
                  value={o.id}
              >
                  {o.value}
              </option>
          ))
        : [] // map options with key

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        onChangeOption && onChangeOption(+(e.currentTarget.value))
        /* без плюса будет передаватся значение СТРОКА ЕДЕНИЦА ИЛИ ДВОЙКА  и так как это строка то не будет работать отображение точки---потомучто надо получать для отображения ЗНАЧЕНИЕ ТРУ из выражения checked={o.id===value}
       а строка сравниватся с  числом  всегда будет  ФАЛСЕ*/
        // делают студенты
        onChange&&onChange(e)
       /* ИЗ ДРУГОЙ КОМПОНЕНТЫ НАДО ПЕРЕДОВАТЬ ИМЕННО onChangeOption  А НЕ onChange---ТАК СФОРМУЛИРОВАНА ЛОГИКА ВНУТРИ ЭТОЙ УНИВЕРСАЛЬНОЙ КОМПОНЕТЫ ---ИМЕННО ОБРАБАТЫВАЕТСЯ ТО ЧТО ПРИШЛО В onChangeOption ИЗ ДРУГИХ КОМПОНЕНТ...ЕСЛИ ИЗ ДРУГИХ КОМПОНЕНТ ПЕРЕДАВАТЬ onChange  -ТО И ЛОГИКУ НАДО ДОПИСЫВАТЬ ---onChange={onChangeCallback} ЭТО ПРОПИСАНО НО ВНУТРИ ФУНКЦИИ onChangeCallback НА ДО ПРОПИСАТЬ ЛОГИКУ ТОГО onChange КОТОРЫЙ В ПРОПСАХ ПРИХОДИТ ИЗ ДРУГОЙ КОМПОНЕНТЫ И ТОГДА БУДЕТ РАБОТАТЬ*/
    }

    const finalSelectClassName = s.select + (className ? ' ' + className : '')

    return (
        <select
            className={finalSelectClassName}
            onChange={onChangeCallback}
            {...restProps}
        >
            {mappedOptions}
        </select>
    )
}

export default SuperSelect
