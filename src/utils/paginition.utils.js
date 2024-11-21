// OM NANASIVAYA

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

function paginationUtils(req, data){
    const page = Number(req.query.page) || DEFAULT_PAGE;
    const limit = Number(req.query.limit) || DEFAULT_LIMIT;

    let startIndex = (page - 1) * limit;
    const datasWithLimit = data.slice(startIndex, startIndex + limit);
    
    return {
        data : datasWithLimit,
        totaldata : data.length,
        currentPage : Number(page),
        totalPage : Math.ceil(data.length / limit)
    }
}

const postpaginationUtils =(req, posts)=>{
    let  paginationData = paginationUtils(req, posts);
    return {
        posts : paginationData.data,
        totalPosts : paginationData.totaldata,
        currentPage : paginationData.currentPage,
        totalPage : paginationData.totalPage
    }
}

const commentsPaginationUtils =(req, comments)=>{
    let  paginationData = paginationUtils(req, comments);
    return {
        comments : paginationData.data,
        totalComments : paginationData.totaldata,
        currentPage : paginationData.currentPage,
        totalPage : paginationData.totalPage
    }
}

const draftsPaginationUtils =(req, drafts)=>{
    let  paginationData = paginationUtils(req, drafts);
    return {
        draftitems : paginationData.data,
        totalDraftItems : paginationData.totaldata,
        currentPage : paginationData.currentPage,
        totalPage : paginationData.totalPage
    }
}


export { postpaginationUtils, commentsPaginationUtils, draftsPaginationUtils};