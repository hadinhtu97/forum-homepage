import styles from '../styles/Home.module.css'
import Head from 'next/head'
import fetch from 'node-fetch'
import React, { useState, useEffect } from 'react'

const RenderUsers = ({ users }) => {
    return (
        <div>
            {users.map((user, i) =>
                <a key={i} href={user.url} target='_blank'><img src={user.avatarURL} title={user.username} /></a>
            )}
        </div>
    )
}

const Rows = ({ topics }) => {
    return (
        <>
            {topics.map((topic, i) =>
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                        <a href={topic.url} title={topic.title} target='_blank'>{topic.title}</a>
                    </td>
                    <td>
                        <RenderUsers users={topic.users} />
                    </td>
                    <td>{topic.likes}</td>
                    <td>{topic.replies}</td>
                    <td>{topic.views}</td>
                    <td>{topic.activity}</td>
                </tr>
            )}
        </>
    )
}

const Table = ({ topics }) => {
    return (
        <table>
            <tbody>
                <tr>
                    <th>#</th>
                    <th>topics</th>
                    <th></th>
                    <th>likes</th>
                    <th>replies</th>
                    <th>views</th>
                    <th>activity</th>
                </tr>
                {topics == null ? <></> : <Rows topics={topics} />}
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