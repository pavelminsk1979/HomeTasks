import React, {useEffect, useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW14.module.css'
import axios from 'axios'
import SuperDebouncedInput from './common/c8-SuperDebouncedInput/SuperDebouncedInput'
import {useSearchParams} from 'react-router-dom'

/*
* 1 - дописать функцию onChangeTextCallback в SuperDebouncedInput
* 2 - дописать функцию sendQuery в HW14
* 3 - дописать функцию onChangeText в HW14
* 4 - сделать стили в соответствии с дизайном
* 5 - добавить HW14 в HW5/pages/JuniorPlus
* */

const getTechs = (find: string) => {
    return axios
        .get<{ techs: string[] }>(
            'https://incubator-personal-page-back.herokuapp.com/api/3.0/homework/test2',
            {params: {find}}  /* params: {find} -ЭТО НЕ payload,  get запрос не может передавать payload
             это именно КВЕРИ ПАРАМЕТР  ...можно дописать кверипараметры именно в СТРОКУ с URL адресом
               А МОЖНО ИМЕННО ТАКИМ ОБРАЗОМ  {params: {find}} ----ИМЕННО КЛЮЧ params и ИМЕННО В ОБЬЕКТЕ
               ЧЕРЕЗ ЗАПЯТУЮ МОЖНО НЕСКОЛЬКО КВЕРИ ПАРАМЕТРОВ {params: {find,name,age}} */
        )
        .catch((e) => {
            alert(e.response?.data?.errorText || e.message)
        })
}

const HW14 = () => {
    const [find, setFind] = useState('') /*это то что в инпут ввел пользователь*/
   /* при запуске приложения пустая строка- это значение отображающее  value  в инпуте  */
    const [isLoading, setLoading] = useState(false)


    const [searchParams, setSearchParams] = useSearchParams() /*этот хук добавит в URL
    квери параметры, но на сервер передача параметров происходит
    за счет другого механизма в данном случае -за счет функции getTechs...а передача
    параметров в УРЛ ЧИСТО ЧТОБ МОЖНО БЫЛО СКОПИРОВАТЬ УРЛ И ПЕРЕДАТЬ
    ДРУЖБАНУ ЧТОБ ТОТ УВИДЕЛ СРАЗУ РЕЗУЛЬТАТ от работы приложения а не получил
    приложение стартовое и там вбивал чтото в инпут чтоб увидеть результат*/

    /*
    я сам формирую обьект с ключом и значением далее с помощью функции setSearchParams  этот сформировный обьект попадет
    в переменную searchParams--и это равносильно ИЛИ В ИТОГЕ В УРЛ ДОБАВИТСЯ КВЕРИ
     ПАРАМЕТР  http://localhost:3000/HomeTasks#/juniorPlus?find=nnn----вот так и
     работает хук useSearchParams()..........внутри searchParams обьект будет */

    const [techs, setTechs] = useState<string[]>([])



    const sendQuery = (value: string) => { /*из ЮЗЭВЕКТА идет вызов этой
    функции при запуске приложения и в значении передается пустая строка
    ----ИЛИ вызывается функция после полторы секунды как пользователь ввел в инпут чтото и это ЧТОТО передается в value--И ЭТО value ДОБАВИТСЯ В УРЛ КАК КВЕРИ ПАРАМЕТР
    */
        setLoading(true) /*это покажет надпись -ЗАГРУЗКА*/
        getTechs(value)
            .then((res) => {
                if (res) {
                    /*   список с сервера приходит и тут я его закидываю чтоб он на экране отобразился */
                    setTechs(res.data.techs)
                }
                setLoading(false)
            })
    }


    const onChangeText = (value: string) => {/* это то что в инпут ввели*/
        setFind(value)

        const findQuery: { find?: string } = value ? {find: value} : {}


        const params = Object.fromEntries(searchParams)
       /* Метод Object. fromEntries() преобразует список пар ключ-значение в ДЖАВАСКРИПТОВЫЙ объект*/
        setSearchParams({...params, ...findQuery}) /*к тем параметрам что уже были дописываю новые которые пришли в (value: string)----если прописать {findQuery}--тогда сотрет
        те что могли быть или были --тоесть вот эти-- const params = Object.fromEntries(searchParams)*/

       /*  setSearchParams это наподобии ФУНКЦИИ SET  у useState---setSearchParams изменит или поместит внутрь searchParams новые данные И ЭТИ ДАННЫЕ ПОПАДУТ В URL их туда закинет хук useSearchParams()
       *
       * --можно по нажатию кнопки закидывать в URL новые КВЕРИ ПАРАМЕТРЫ или удалять прошлые
       * */
    }

    useEffect(() => {
        const params = Object.fromEntries(searchParams) /*ЭТО надо ибо если введу в инпут
        чтото и обновлю станицу ТОГДА В ИНПУТЕ ОСТАНЕТСЯ ТО ЧТО Я ВВЕЛ и будет обработано сразуже это значение*/

        /* при запуске приложения в params пустой обьект
        Метод Object. fromEntries() преобразует список пар ключ-значение в объект*/
        sendQuery(params.find || '')
        setFind(params.find || '')
    }, [])

    const mappedTechs = techs.map(t => (
        <div key={t} id={'hw14-tech-' + t} className={s.tech}>
            {t}
        </div>
    ))

    return (
        <div id={'hw14'}>
            <div className={s2.hwTitle}>Homework #14</div>

            <div className={s2.hw}>
                <SuperDebouncedInput
                    id={'hw14-super-debounced-input'}
                    value={find}
                    onChangeText={onChangeText}  /* это то что в инпут ввели*/
                    onDebouncedChange={sendQuery} /*функция вызовется через полторы секунды  когда перествну вводить буквы в инпут -внутри  SuperDebouncedInput прописана логика */
                />

                <div id={'hw14-loading'} className={s.loading}>
                    {isLoading ? '...ищем' : <br/>}
                </div>

                {mappedTechs}
            </div>
        </div>
    )
}

export default HW14
