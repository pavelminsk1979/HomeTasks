import React, {useState} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    // for autotests // не менять // можно подсунуть в локалСторэдж нужную дату, чтоб увидеть как она отображается
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)


    const start = () => {
        console.log(date)
        setShow(true)
        const intervalId = setInterval(() => {
            setDate(new Date())
        }, 1000);

        setTimerId(Number(intervalId))

        if (show === false) {
            return () => {
                clearInterval(timerId)
            }
        }

        // пишут студенты // запустить часы (должно отображаться реальное время, а не +1)
        // сохранить ид таймера (https://learn.javascript.ru/settimeout-setinterval#setinterval)

    }

    const stop = () => {
        clearInterval(timerId)
        setShow(false)
        setTimerId(undefined)

        // пишут студенты // поставить часы на паузу, обнулить ид таймера (timerId <- undefined)
    }

    const onMouseEnter = () => { // пишут студенты // показать дату если наведена мышка

    }
    const onMouseLeave = () => { // пишут студенты // спрятать дату если мышка не наведена

    }
const time = new Intl.DateTimeFormat('ru',{
    hour:'numeric',
    minute:'numeric',
    second:'numeric'
})
    const year = new Intl.DateTimeFormat('ru',{
        year: "numeric",
        month: "numeric",
        day: "numeric"
    })
    const stringTime = time.format(date)/*date?.toLocaleTimeString()*//*new Intl.DateTimeFormat([String(date), ("ru")])*/ || <br/> // часы24:минуты:секунды (01:02:03)/(23:02:03)/(24:00:00)/(00:00:01) // пишут студенты
    const stringDate = year.format(date) || <br/> // день.месяц.год (01.02.2022) // пишут студенты, варианты 01.02.0123/01.02.-123/01.02.12345 не рассматриваем

    // день недели на английском, месяц на английском (https://learn.javascript.ru/intl#intl-datetimeformat)
    const mondayTuesday = new Intl.DateTimeFormat('en-US',{
        weekday: "long",
    })
    const month = new Intl.DateTimeFormat('en-US',{
        month: "long",
    })
    const stringDay = mondayTuesday.format(date) || <br/> // пишут студенты
    const stringMonth = month.format(date) || <br/> // пишут студенты

    const [moveMouse,setMoveMouse]=useState(false)
   const onMouseEnterH=()=>{setMoveMouse(true)}
   const onMouseOutH=()=>{setMoveMouse(false)}


    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnterH}
                onMouseLeave={onMouseOutH}
            >
                <span id={'hw9-day'}>{stringDay}</span>,{' '}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {moveMouse ? (
                        <>
                            <span id={'hw9-date'}>{stringDate}</span>,{' '}
                            <span id={'hw9-month'}>{stringMonth}</span>
                        </>
                    ) : (
                        <>
                            <br/>
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={show} // пишут студенты // задизэйблить если таймер запущен
                    onClick={start}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={!show} // пишут студенты // задизэйблить если таймер не запущен
                    onClick={stop}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock


/*
import React, {useEffect, useState} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
    const [timerId, setTimerId] = useState<any>(undefined)
    // for autotests // не менять // можно подсунуть в локалСторэдж нужную дату, чтоб увидеть как она отображается
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [goWatch, setGoWatch] = useState<boolean>(false)
    const [showData,setShowData]=useState(false)

    useEffect(() => {
        if(goWatch){
            const intervalId=setInterval(() => {
                setDate(new Date())
            }, 1000);
            setTimerId(intervalId)
        }

        return()=>{clearInterval(timerId)}
    }, [goWatch])

    const start = () => {
        setGoWatch(true)
        // (https://learn.javascript.ru/settimeout-setinterval#setinterval)
    }

    const stop = () => {
        clearInterval(timerId)
        setGoWatch(false)
    }

    const onMouseMove = () => {setShowData(true)}
    const onMouseOut = () => {setShowData(false)}

    //  (https://learn.javascript.ru/intl#intl-datetimeformat)

    let weekDay = 'Monday'
    if (date.getDay() === 2) {
        weekDay = 'Thuesday'
    }
    if (date.getDay() === 3) {
        weekDay = 'Wednesday'
    }
    if (date.getDay() === 4) {
        weekDay = 'Thursday'
    }
    if (date.getDay() === 5) {
        weekDay = 'Friday'
    }
    if (date.getDay() === 6) {
        weekDay = 'Saturday'
    }
    if (date.getDay() === 7) {
        weekDay = 'Sanday'
    }




    const housre = date.getHours()<10
    ?'0'+date.getHours()
        :date.getHours()

    const minuts = date.getMinutes()<10
    ?'0'+date.getMinutes()
        :date.getMinutes()

    const seconds = date.getSeconds()<10
    ?'0'+date.getSeconds()
        :date.getSeconds()



    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}>

                <span id={'hw9-day'}>{weekDay}</span>,{' '}
                <span id={'hw9-time'}>
                    <strong
                        onMouseMove={onMouseMove}
                             onMouseOut={onMouseOut}>
                           <span>{housre}</span>
                                    : <span>{minuts}</span>
                                    : <span>{seconds}</span>
                    </strong>
                </span>
            </div>
            <div>
                {showData
                ? <div>
                        <span>{date.getDate()}</span>
                        .<span>{date.getMonth()+1}</span>
                        .<span>{date.getFullYear()}</span>

                        <span></span>
                    </div>

                    : <br/>
                }
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={goWatch}
                    onClick={start}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={!goWatch}
                    onClick={stop}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock*/
