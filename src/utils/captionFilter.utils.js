// OM NAMASIVAYA

export default function filterByCaption(req , posts){
    const { search } = req.query;

    const regex = new RegExp(`\\b${search}\\b`, 'i');

    return posts.filter(post => regex.test(post.caption));
}