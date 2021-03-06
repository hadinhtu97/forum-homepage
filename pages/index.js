import styles from '../styles/Home.module.css'
import Head from 'next/head'
import fetch from 'node-fetch'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faReply, faEye, faHistory } from '@fortawesome/free-solid-svg-icons'

const RenderUsers = ({ users }) => {
    return (
        <div className={styles.listUser}>
            {users.map((user, i) =>
                <a key={i} href={user.url} target='_blank'>
                    <img className={styles.avatar} src={user.avatarURL} title={user.username} />
                </a>
            )}
        </div>
    )
}

const Rows = ({ topics }) => {
    return (
        <>
            {topics.map((topic, i) =>
                <tr key={i} className={styles.rows}>
                    <td><span className={styles.rows}>{i + 1}</span></td>
                    <td className={styles.title}>
                        <a className={styles.link} href={topic.url} title={topic.title} target='_blank'>{topic.title}</a>
                    </td>
                    <td>
                        <RenderUsers users={topic.users} />
                    </td>
                    <td><span className={styles.like}>{topic.likes}</span></td>
                    <td><span className={styles.reply}>{topic.replies}</span></td>
                    <td><span className={styles.view}>{topic.views}</span></td>
                    <td><span className={styles.activity}>{topic.activity}</span></td>
                </tr>
            )}
        </>
    )
}

const Loading = () => {
    return (
        <tr className={styles.rows}>
            <td>#</td>
            <td>Loading ...</td>
            <td>Loading ...</td>
            <td>Loading ...</td>
            <td>Loading ...</td>
            <td>Loading ...</td>
            <td>Loading ...</td>
        </tr>
    )
}

const Table = ({ topics }) => {
    return (
        <table className={styles.table}>
            <tbody>
                <tr className={styles.rows}>
                    <th>
                        <a href='https://forum.freecodecamp.org/' target='_blank'>
                            <img className={styles.logo} src='https://aws1.discourse-cdn.com/freecodecamp/original/3X/3/b/3b515098283215730b65c76a721de0ab9c894fc8.png' title='FCC' />
                        </a>
                    </th>
                    <th></th>
                    <th></th>
                    <th><FontAwesomeIcon icon={faThumbsUp} title='likes' /></th>
                    <th><FontAwesomeIcon icon={faReply} title='replies' /></th>
                    <th><FontAwesomeIcon icon={faEye} title='views' /></th>
                    <th><FontAwesomeIcon icon={faHistory} title='activity' /></th>
                </tr>
                {topics == null ? <Loading /> : <Rows topics={topics} />}
            </tbody>
        </table>
    )
}

const Home = () => {

    const [topics, setTopics] = useState(null)

    const getTopicsThenSetTopics = async () => {
        let res = await fetch('/api/forum')
        let data = await res.json()
        data.hasOwnProperty('error') == true ? setTopics(null) : setTopics(data)
    }

    useEffect(() => {
        getTopicsThenSetTopics()
    }, [])

    return (
        <>
            <Head>
                <title>Forum Hompage</title>
            </Head>
            <main className={styles.main}>
                <Table topics={topics} />
            </main>
        </>
    )
}

export default Home