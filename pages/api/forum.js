import getLatestTopics from '../../lib/forum'

export default async (req, res) => {
    if (req.method == 'GET') {
        try {
            let data = await getLatestTopics()
            res.json(data)
        } catch (err) {
            console.log(err);
            res.json({ error: 'Can not get latest topics from FCC forum' })
        }
    } else {
        res.status(404).end()
    }
}