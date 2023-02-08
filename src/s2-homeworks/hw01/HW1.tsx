import React from 'react'
import Message from './message/Message'
import MessageSender from './message-sender/MessageSender'
import s2 from '../../s1-main/App.module.css'
import FriendMessage from './friend-message/FriendMessage'


/*
* 1 - описать тип MessageType
* 2 - описать тип MessagePropsType в файле Message.tsx
* 3 - в файле Message.tsx отобразить приходящие данные
* 4 - выполнить пункты 2, 3 в файле FriendMessage.tsx
* 5 - сделать стили в соответствии с дизайном
* */

// нужно создать правильный тип вместо any
type UserType = {
    avatar:string
    name:string
}
type TextType = {
    text:string
    time:string
}

export type MessageType = {
    id:number
    user:UserType
    message:TextType
}

// структуру объекта не менять
export const message0: MessageType = {
    id: 0,
    user: {
        avatar: 'https://abrakadabra.fun/uploads/posts/2021-12/1640722082_1-abrakadabra-fun-p-pank-eskizi-1.png', // можно менять
        name: 'Тётя-Мотя',  // можно менять
    },
    message: {
        text: 'some text some textsome textsome text some textsome text some ',
        time: '22:00', // можно менять
    },
}
export const friendMessage0: MessageType = {
    id: 100,
    user: {
        avatar: 'https://fb.ru/misc/i/gallery/31654/3061574.jpg', // можно менять
        name: 'Супер-Дед', // можно менять
    },
    message: {
        text: 'зеркальное сообщение для тренировки', // можно менять
        time: '22:05', // можно менять
    },
}

const HW1 = () => {
    return (
        <div id={'hw1'}>
            <div className={s2.hwTitle}>Homework #1</div>
            <div className={s2.hw}>
                {/*проверка отображения (не менять)*/}
                <div>
                    <Message message={message0} />
                    <FriendMessage message={friendMessage0} />
                </div>

                {/*для автоматической проверки дз (не менять)*/}
                <MessageSender M={Message} />
            </div>
        </div>
    )
}

export default HW1
