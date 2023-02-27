import React, {useState} from 'react'
import SuperSelect from '../../../hw07/common/c5-SuperSelect/SuperSelect'
import {Pagination} from '@mui/material'
import s from './SuperPagination.module.css'

export type SuperPaginationPropsType = {
    id?: string
    page: number /* первоначально useState(1)*/
    itemsCountForPage: number /* itemsCountForPage={count} первоначально useState(4) это выпадающий список */
    totalCount: number /* первоначально  useState(100)*/
    onChange: (page: number, count: number) => void
}

const SuperPagination: React.FC<SuperPaginationPropsType> = (
    {
        page, itemsCountForPage, totalCount, onChange, id = 'hw15',
    }
) => {
    const lastPage = Math.ceil(totalCount / itemsCountForPage) // пишет студент // вычислить количество страниц

    const onChangeCallback = (event: any, page: number) => {
        onChange(page, itemsCountForPage)
        // пишет студент
    }

    const onChangeSelect = (event: any) => {
       onChange(page, +event.currentTarget.value)
        // пишет студент   это выпадающий список и его выбраное пользователем значение
    }

    return (
        <div className={s.pagination}>
            <Pagination
                /*это из библиотеки МАТЕРИАЛЮАЙ и представляет из себя
                строку с номерами страницы */
                id={id + '-pagination'}
                sx={{
                    // стили для Pagination // пишет студент
                }}
                page={page}/* он примет и отобразит ТО ЧТО ОТПРАВИЛ onChange-тот номер в списке подсветится*/
                count={lastPage} /*это максимальное число в строке ОТОБРАЖАЮЩЕЙ НОМЕРА СТАНИЦЫ*/
                onChange={onChangeCallback} /*выкинет наверх номер страницы на которую я нажал*/

                hideNextButton /*если ТРУЕ то не показывать угловые кнопки с краю списка---нажимая на эту угловую кнопку можно пошагово переходить на следующую страницу*/
                hidePrevButton
            />

            <span className={s.text1}>
                показать
            </span>

            <SuperSelect
                id={id + '-pagination-select'}
                value={itemsCountForPage}
                options={[
                    {id: 4, value: 4},
                    {id: 7, value: 7},
                    {id: 10, value: 10},
                ]}
                onChange={onChangeSelect}
            />

            <span className={s.text2}>
                строк в таблице
            </span>
        </div>
    )
}

export default SuperPagination
