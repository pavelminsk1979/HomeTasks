import React, {
    ChangeEvent,
    InputHTMLAttributes,
    DetailedHTMLProps,
    HTMLAttributes,
} from 'react'
import s from './SuperRadio.module.css'

type DefaultRadioPropsType = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>
// тип пропсов обычного спана
type DefaultSpanPropsType = DetailedHTMLProps<
    HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
>

type SuperRadioPropsType = Omit<DefaultRadioPropsType, 'type'> & {
    options?: any[]
    onChangeOption?: (option: any) => void

    spanProps?: DefaultSpanPropsType // пропсы для спана
}

const SuperRadio: React.FC<SuperRadioPropsType> = ({
    id,
    name,
    className,
    options,
    value,
    onChange,
    onChangeOption,
    spanProps,
    ...restProps
}) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeOption&& onChangeOption(+(e.currentTarget.value))
       /* без плюса будет передаватся значение СТРОКА ЕДЕНИЦА ИЛИ ДВОЙКА  и так как это строка то не будет работать отображение точки---потомучто надо получать для отображения ЗНАЧЕНИЕ ТРУ из выражения checked={o.id===value}
        а строка сравниватся с  числом  всегда будет  ФАЛСЕ*/
        // делают студенты
    }

    const finalRadioClassName = s.radio + (className ? ' ' + className : '')
    const spanClassName = s.span + (spanProps?.className ? ' ' + spanProps.className : '')

    const mappedOptions: any[] = options
        ? options.map((o) => (
              <label key={name + '-' + o.id} className={s.label}>
                  <input
                      id={id + '-input-' + o.id}
                      className={finalRadioClassName}
                      type={'radio'}
                      name={name} /*чтобы из группы с одинаковым именем АКТИВНЫМ был только один элемент*/
                      value={o.id} /*когда делаю клик и это значение попадает в ВЭЛЬЮ и далее буду использовать его
                        в  e.currentTarget.value*/
                      checked={o.id===value}/*один из группы активный-с точкой отображенной внутри---тот который будет ТРУЕ в фигурных скобках----в стартовом стэйте стартовое значение ЦИФРА ОДИН  и при перезагрузке приложения отобразится точка внутри кружка для первого элемента из списка*/
                      // name, checked, value делают студенты

                      onChange={onChangeCallback}
                      {...restProps}
                  />
                  <span
                      id={id + '-span-' + o.id}
                      {...spanProps}
                      className={spanClassName}
                  >
                      {o.value}
                  </span>
              </label>
          ))
        : []

    return <div className={s.options}>{mappedOptions}</div>
}

export default SuperRadio
