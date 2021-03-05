import fetch from 'node-fetch'

const API = 'https://forum-proxy.freecodecamp.rocks/latest'
const FORUM_URL = 'https://forum.freecodecamp.org'
const AVATAR_SIZE = 135

const getTopicURL = (slug) => FORUM_URL + '/t/' + slug

const getUserURL = (username) => FORUM_URL + '/u/' + username

const getUser = (id, users) => users.filter(user => user.id == id)[0]

const isURL = (template) => /https/.test(template)

const converAvatarTemplateToURL = (template) => {
    let sizeRegex = /{size}/
    let templateSize135 = template.replace(sizeRegex, AVATAR_SIZE)
    return isURL(templateSize135) == true ? templateSize135 : FORUM_URL + templateSize135
}

const getUsers = (posters, users) => posters.map(poster => {
    return {
        username: getUser(poster.user_id, users).username,
        avatarURL: converAvatarTemplateToURL(getUser(poster.user_id, users).avatar_template),
        url: getUserURL(getUser(poster.user_id, users).username)
    }
})

const getActivity = (bumped) => {
    let date = new Date(bumped)
    let now = new Date()
    let minute = Math.round((now - date) / 60000)
    let activity = 0

    if (minute < 60) {
        activity = minute + 'm'
    } else {
        let hour = Math.round(minute / 60)
        activity = hour < 24 ? hour + 'h' : 'old'
    }
    return activity
}

const getReturn = (data) => data.topic_list.topics.map((topic) => {
    return {
        title: topic.title,
        url: getTopicURL(topic.slug),
        replies: topic.reply_count,
        views: topic.views,
        likes: topic.like_count,
        activity: getActivity(topic.bumped_at),
        users: getUsers(topic.posters, data.users)
    }
})

export default async () => {
    let res = await fetch(API)
    let data = await res.json()
    return getReturn(data)
}