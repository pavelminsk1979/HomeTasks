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

export default Clock
